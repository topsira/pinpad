const STORAGE_KEY = "pinpad.notes.v1";
const COLORS = ["yellow", "mint", "sky", "rose", "lilac"];

const board = document.querySelector("#board");
const template = document.querySelector("#noteTemplate");
const addButton = document.querySelector("#addNote");
const exportButton = document.querySelector("#exportNotes");
const importInput = document.querySelector("#importNotes");
const resetButton = document.querySelector("#resetBoard");
const searchInput = document.querySelector("#searchInput");
const noteCount = document.querySelector("#noteCount");

let notes = loadNotes();
let topZ = Math.max(1, ...notes.map((note) => note.z || 1));
let dragging = null;

function sampleNotes() {
  return [
    {
      id: crypto.randomUUID(),
      title: "Inbox",
      body: "Drop quick thoughts here. Drag me around.",
      color: "yellow",
      x: 70,
      y: 70,
      z: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      title: "Saved text",
      body: "Paste quotes, links, prompts, tiny reminders, or anything you want to keep nearby.",
      color: "mint",
      x: 360,
      y: 120,
      z: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      title: "Next idea",
      body: "Later: tags, archive, markdown preview, and optional sync.",
      color: "sky",
      x: 190,
      y: 340,
      z: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
}

function loadNotes() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return Array.isArray(stored) && stored.length ? stored : sampleNotes();
  } catch {
    return sampleNotes();
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  updateCount();
}

function updateCount() {
  const visible = document.querySelectorAll(".note:not(.is-hidden)").length;
  const label = visible === 1 ? "1 note" : `${visible} notes`;
  noteCount.textContent = label;
}

function createNote(overrides = {}) {
  const boardRect = board.getBoundingClientRect();
  const now = new Date().toISOString();
  const note = {
    id: crypto.randomUUID(),
    title: "Untitled",
    body: "",
    color: COLORS[notes.length % COLORS.length],
    x: Math.max(24, Math.min(120 + notes.length * 22, boardRect.width - 260)),
    y: Math.max(24, Math.min(90 + notes.length * 22, boardRect.height - 220)),
    z: ++topZ,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };

  notes.push(note);
  saveNotes();
  render();

  const title = board.querySelector(`[data-note-id="${note.id}"] .note-title`);
  title.focus();
  title.select();
}

function render() {
  board.innerHTML = "";
  notes.forEach(renderNote);
  applySearch();
  updateCount();
}

function renderNote(note) {
  const fragment = template.content.cloneNode(true);
  const element = fragment.querySelector(".note");
  const title = fragment.querySelector(".note-title");
  const body = fragment.querySelector(".note-body");
  const color = fragment.querySelector(".color-note");
  const pin = fragment.querySelector(".pin-note");
  const remove = fragment.querySelector(".delete-note");

  element.dataset.noteId = note.id;
  element.dataset.color = note.color;
  element.style.left = `${note.x}px`;
  element.style.top = `${note.y}px`;
  element.style.zIndex = note.z;
  element.style.setProperty("--tilt", `${tiltFor(note.id)}deg`);
  title.value = note.title;
  body.value = note.body;
  color.value = note.color;

  element.addEventListener("pointerdown", startDrag);
  title.addEventListener("input", (event) => updateNote(note.id, { title: event.target.value }));
  body.addEventListener("input", (event) => updateNote(note.id, { body: event.target.value }));
  color.addEventListener("change", (event) => updateNote(note.id, { color: event.target.value }, true));
  pin.addEventListener("click", () => bringForward(note.id));
  remove.addEventListener("click", () => deleteNote(note.id));

  board.appendChild(fragment);
}

function updateNote(id, patch, rerender = false) {
  notes = notes.map((note) => {
    if (note.id !== id) return note;
    return { ...note, ...patch, updatedAt: new Date().toISOString() };
  });
  saveNotes();
  if (rerender) render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

function bringForward(id) {
  updateNote(id, { z: ++topZ }, true);
}

function startDrag(event) {
  const noteElement = event.currentTarget;
  const interactive = event.target.closest("input, textarea, button, select");
  if (interactive) return;

  const id = noteElement.dataset.noteId;
  const note = notes.find((item) => item.id === id);
  if (!note) return;

  const boardRect = board.getBoundingClientRect();
  const noteRect = noteElement.getBoundingClientRect();
  dragging = {
    id,
    element: noteElement,
    offsetX: event.clientX - noteRect.left,
    offsetY: event.clientY - noteRect.top,
    boardRect
  };

  noteElement.setPointerCapture(event.pointerId);
  noteElement.classList.add("is-dragging");
  const z = ++topZ;
  noteElement.style.zIndex = z;
  updateNote(id, { z });
}

function moveDrag(event) {
  if (!dragging) return;

  const { element, boardRect, offsetX, offsetY } = dragging;
  const maxX = boardRect.width - element.offsetWidth;
  const maxY = boardRect.height - element.offsetHeight;
  const x = clamp(event.clientX - boardRect.left - offsetX, 0, maxX);
  const y = clamp(event.clientY - boardRect.top - offsetY, 0, maxY);

  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
}

function endDrag() {
  if (!dragging) return;

  const { id, element } = dragging;
  element.classList.remove("is-dragging");
  updateNote(id, {
    x: parseFloat(element.style.left),
    y: parseFloat(element.style.top)
  });
  dragging = null;
}

function applySearch() {
  const query = searchInput.value.trim().toLowerCase();
  document.querySelectorAll(".note").forEach((element) => {
    const id = element.dataset.noteId;
    const note = notes.find((item) => item.id === id);
    const haystack = `${note.title} ${note.body}`.toLowerCase();
    element.classList.toggle("is-hidden", query.length > 0 && !haystack.includes(query));
  });
  updateCount();
}

function exportNotes() {
  const blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pinpad-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importNotes(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!Array.isArray(imported)) throw new Error("Expected an array of notes.");
      notes = imported.map(normalizeNote);
      topZ = Math.max(1, ...notes.map((note) => note.z || 1));
      saveNotes();
      render();
    } catch (error) {
      alert(`Import failed: ${error.message}`);
    } finally {
      importInput.value = "";
    }
  });
  reader.readAsText(file);
}

function normalizeNote(note, index) {
  const now = new Date().toISOString();
  return {
    id: typeof note.id === "string" ? note.id : crypto.randomUUID(),
    title: typeof note.title === "string" ? note.title : "Untitled",
    body: typeof note.body === "string" ? note.body : "",
    color: COLORS.includes(note.color) ? note.color : COLORS[index % COLORS.length],
    x: Number.isFinite(note.x) ? note.x : 80 + index * 24,
    y: Number.isFinite(note.y) ? note.y : 80 + index * 24,
    z: Number.isFinite(note.z) ? note.z : index + 1,
    createdAt: typeof note.createdAt === "string" ? note.createdAt : now,
    updatedAt: now
  };
}

function tiltFor(id) {
  const total = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return (total % 7) - 3;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

addButton.addEventListener("click", () => createNote());
exportButton.addEventListener("click", exportNotes);
importInput.addEventListener("change", importNotes);
resetButton.addEventListener("click", () => {
  notes = sampleNotes();
  topZ = Math.max(1, ...notes.map((note) => note.z || 1));
  saveNotes();
  render();
});
searchInput.addEventListener("input", applySearch);
window.addEventListener("pointermove", moveDrag);
window.addEventListener("pointerup", endDrag);
window.addEventListener("pointercancel", endDrag);

render();
