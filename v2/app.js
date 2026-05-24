const NOTES_KEY = "pinpad.v2.notes";
const SETTINGS_KEY = "pinpad.settings.v1";
const COLORS = ["butter", "mint", "sky", "peach", "lilac"];
const DEFAULT_SETTINGS = {
  boardTitle: "pinpad : TOPSIRA",
  theme: "soft-desk",
  characterMode: "corner"
};

const board = document.querySelector("#board");
const template = document.querySelector("#noteTemplate");
const addButton = document.querySelector("#addNote");
const exportButton = document.querySelector("#exportNotes");
const importInput = document.querySelector("#importNotes");
const resetButton = document.querySelector("#resetBoard");
const searchInput = document.querySelector("#searchInput");
const noteCount = document.querySelector("#noteCount");
const boardTitle = document.querySelector("#boardTitle");
const editTitle = document.querySelector("#editTitle");
const noteDialog = document.querySelector("#noteDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogBody = document.querySelector("#dialogBody");
const dialogColor = document.querySelector("#dialogColor");
const dialogDelete = document.querySelector("#dialogDelete");
const characterButton = document.querySelector("#characterButton");
const characterBubble = document.querySelector("#characterBubble");

let settings = loadSettings();
let notes = loadNotes();
let topZ = Math.max(1, ...notes.map((note) => note.z || 1));
let dragging = null;
let activeNoteId = null;
let bubbleTimer = null;

function sampleNotes() {
  const now = new Date().toISOString();
  return [
    {
      id: crypto.randomUUID(),
      title: "Inbox",
      body: "Drop quick thoughts here. Tap me on mobile for a clear view.",
      color: "butter",
      x: 70,
      y: 70,
      z: 1,
      createdAt: now,
      updatedAt: now
    },
    {
      id: crypto.randomUUID(),
      title: "Saved text",
      body: "Paste quotes, links, prompts, tiny reminders, or anything you want to keep nearby.",
      color: "mint",
      x: 350,
      y: 125,
      z: 2,
      createdAt: now,
      updatedAt: now
    },
    {
      id: crypto.randomUUID(),
      title: "Desk buddies",
      body: "Soon: your two dog characters can live in the corner as tiny companions.",
      color: "sky",
      x: 185,
      y: 330,
      z: 3,
      createdAt: now,
      updatedAt: now
    }
  ];
}

function loadSettings() {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function loadNotes() {
  try {
    const stored = JSON.parse(localStorage.getItem(NOTES_KEY) || "null");
    return Array.isArray(stored) && stored.length ? stored.map(normalizeNote) : sampleNotes();
  } catch {
    return sampleNotes();
  }
}

function saveNotes() {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  updateCount();
}

function updateCount() {
  const visible = document.querySelectorAll(".note:not(.is-hidden)").length;
  noteCount.textContent = visible === 1 ? "1 note" : `${visible} notes`;
}

function syncTitle() {
  const title = settings.boardTitle.trim() || DEFAULT_SETTINGS.boardTitle;
  boardTitle.value = title;
  document.title = `${title} - pinpad v2`;
}

function createNote(overrides = {}) {
  const logicalWidth = isMobile() ? 720 : board.getBoundingClientRect().width;
  const logicalHeight = isMobile() ? 640 : board.getBoundingClientRect().height;
  const now = new Date().toISOString();
  const note = {
    id: crypto.randomUUID(),
    title: "Untitled",
    body: "",
    color: COLORS[notes.length % COLORS.length],
    x: Math.max(22, Math.min(120 + notes.length * 24, logicalWidth - 250)),
    y: Math.max(22, Math.min(90 + notes.length * 24, logicalHeight - 210)),
    z: ++topZ,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };

  notes.push(note);
  saveNotes();
  render();

  const element = board.querySelector(`[data-note-id="${note.id}"]`);
  element.classList.add("is-new");
  if (isMobile()) {
    openNote(note.id);
  } else {
    const title = element.querySelector(".note-title");
    title.focus();
    title.select();
  }
}

function render() {
  board.querySelectorAll(".note").forEach((note) => note.remove());
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
  const open = fragment.querySelector(".open-note");
  const remove = fragment.querySelector(".delete-note");

  element.dataset.noteId = note.id;
  element.dataset.color = note.color;
  const scale = boardScale();
  element.style.left = `${note.x * scale}px`;
  element.style.top = `${note.y * scale}px`;
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
  open.addEventListener("click", () => openNote(note.id));
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
  closeNote();
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
    boardRect,
    scale: boardScale(),
    startX: event.clientX,
    startY: event.clientY,
    moved: false
  };

  noteElement.setPointerCapture(event.pointerId);
  noteElement.classList.add("is-dragging");
  const z = ++topZ;
  noteElement.style.zIndex = z;
  updateNote(id, { z });
}

function moveDrag(event) {
  if (!dragging) return;

  const { element, boardRect, offsetX, offsetY, startX, startY } = dragging;
  dragging.moved = dragging.moved || Math.abs(event.clientX - startX) > 7 || Math.abs(event.clientY - startY) > 7;
  const maxX = boardRect.width - element.offsetWidth;
  const maxY = boardRect.height - element.offsetHeight;
  const x = clamp(event.clientX - boardRect.left - offsetX, 0, maxX);
  const y = clamp(event.clientY - boardRect.top - offsetY, 0, maxY);

  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
}

function endDrag() {
  if (!dragging) return;

  const { id, element, moved, scale } = dragging;
  element.classList.remove("is-dragging");
  updateNote(id, {
    x: parseFloat(element.style.left) / scale,
    y: parseFloat(element.style.top) / scale
  });
  dragging = null;

  if (!moved && isMobile()) {
    openNote(id);
  }
}

function openNote(id) {
  const note = notes.find((item) => item.id === id);
  if (!note) return;

  activeNoteId = id;
  dialogTitle.value = note.title;
  dialogBody.value = note.body;
  dialogColor.value = note.color;
  if (!noteDialog.open) noteDialog.showModal();
  dialogTitle.focus();
}

function closeNote() {
  activeNoteId = null;
  if (noteDialog.open) noteDialog.close();
}

function syncDialogNote(patch) {
  if (!activeNoteId) return;
  updateNote(activeNoteId, patch, true);
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
  link.download = `pinpad-v2-${new Date().toISOString().slice(0, 10)}.json`;
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

function normalizeNote(note, index = 0) {
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

function showCharacterMessage() {
  const messages = [
    "อย่าลืมพักนะ",
    "เก็บไอเดียไว้ตรงนี้",
    "วันนี้มี note ใหม่ไหม",
    "จัดโต๊ะแล้วค่อยลุยต่อ",
    "ไอเดียดี ๆ ต้องปักไว้"
  ];
  characterBubble.textContent = messages[Math.floor(Math.random() * messages.length)];
  characterBubble.hidden = false;
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => {
    characterBubble.hidden = true;
  }, 2600);
}

function tiltFor(id) {
  const total = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return (total % 5) - 2;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function isMobile() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function boardScale() {
  if (!isMobile()) return 1;
  return Math.min(1, board.getBoundingClientRect().width / 720);
}

syncTitle();
render();

boardTitle.addEventListener("input", (event) => {
  settings.boardTitle = event.target.value;
  saveSettings();
  document.title = `${event.target.value.trim() || DEFAULT_SETTINGS.boardTitle} - pinpad v2`;
});
boardTitle.addEventListener("blur", () => {
  if (!boardTitle.value.trim()) {
    settings.boardTitle = DEFAULT_SETTINGS.boardTitle;
    saveSettings();
  }
  syncTitle();
});
editTitle.addEventListener("click", () => {
  boardTitle.focus();
  boardTitle.select();
});
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
dialogTitle.addEventListener("input", (event) => syncDialogNote({ title: event.target.value }));
dialogBody.addEventListener("input", (event) => syncDialogNote({ body: event.target.value }));
dialogColor.addEventListener("change", (event) => syncDialogNote({ color: event.target.value }));
dialogDelete.addEventListener("click", () => {
  if (activeNoteId) deleteNote(activeNoteId);
});
noteDialog.addEventListener("close", () => {
  activeNoteId = null;
});
characterButton.addEventListener("click", showCharacterMessage);
window.addEventListener("pointermove", moveDrag);
window.addEventListener("pointerup", endDrag);
window.addEventListener("pointercancel", endDrag);
window.addEventListener("resize", render);
