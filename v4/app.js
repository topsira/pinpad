const NOTES_KEY = "pinpad.v4.notes";
const SETTINGS_KEY = "pinpad.v4.settings";
const COLORS = ["butter", "mint", "sky", "peach", "lilac"];
const TYPES = ["plain", "checklist", "quote", "tiny"];
const TAGS = {
  none: { label: "No tag", text: "" },
  idea: { label: "Idea", text: "idea" },
  focus: { label: "Focus", text: "focus" },
  personal: { label: "Personal", text: "personal" },
  work: { label: "Work", text: "work" },
  shopping: { label: "Shopping", text: "shopping" }
};
const LEGACY_TAG_MAP = {
  saved: "personal",
  later: "work",
  soft: "personal",
  shop: "shopping"
};
const DEFAULT_SETTINGS = {
  boardTitle: "pinpad : TOPSIRA",
  theme: "soft-desk",
  characterMode: "corner"
};

const board = document.querySelector("#board");
const template = document.querySelector("#noteTemplate");
const addButton = document.querySelector("#addNote");
const addChecklistButton = document.querySelector("#addChecklist");
const exportButton = document.querySelector("#exportNotes");
const importInput = document.querySelector("#importNotes");
const resetButton = document.querySelector("#resetBoard");
const fileMenu = document.querySelector(".file-menu");
const searchInput = document.querySelector("#searchInput");
const tagFilters = document.querySelector("#tagFilters");
const noteCount = document.querySelector("#noteCount");
const boardTitle = document.querySelector("#boardTitle");
const noteDialog = document.querySelector("#noteDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogBody = document.querySelector("#dialogBody");
const dialogRichBody = document.querySelector("#dialogRichBody");
const formatToolbar = document.querySelector("#formatToolbar");
const textColor = document.querySelector("#textColor");
const highlightColor = document.querySelector("#highlightColor");
const listStyle = document.querySelector("#listStyle");
const fontSize = document.querySelector("#fontSize");
const insertVisualCheck = document.querySelector("#insertVisualCheck");
const dialogColor = document.querySelector("#dialogColor");
const dialogType = document.querySelector("#dialogType");
const dialogTag = document.querySelector("#dialogTag");
const dialogChecklist = document.querySelector("#dialogChecklist");
const dialogChecklistItems = document.querySelector("#dialogChecklistItems");
const checklistProgress = document.querySelector("#checklistProgress");
const addChecklistItem = document.querySelector("#addChecklistItem");
const bringForwardButton = document.querySelector("#bringForward");
const dialogDelete = document.querySelector("#dialogDelete");
const characterButton = document.querySelector("#characterButton");
const characterBubble = document.querySelector("#characterBubble");
const trashZone = document.querySelector("#trashZone");
const memoryDialog = document.querySelector("#memoryDialog");
const memoryTitle = document.querySelector("#memoryTitle");
const memoryImage = document.querySelector("#memoryImage");
const memoryCaption = document.querySelector("#memoryCaption");
const memoryCards = document.querySelectorAll(".memory-card");

const MEMORIES = {
  spySmile: {
    title: "Spy peek-a-note",
    image: "../v2/assets/characters/spy-smile-card.jpg",
    alt: "Spy smiling from a blanket",
    caption: "แอบโผล่มาเฝ้า note นิดนึง วันนี้มีอะไรอยากเก็บไว้ไหม"
  },
  nongfah: {
    title: "Nongfah and Spy",
    image: "../v2/assets/characters/nongfah-card.jpg",
    alt: "Nongfah with Spy",
    caption: "วันนุ่ม ๆ ที่เหมาะกับการเก็บไอเดียดี ๆ ไว้บนบอร์ด"
  },
  topIploy: {
    title: "TOP and IPLOY",
    image: "../v2/assets/characters/top-iploy-card.jpg",
    alt: "TOP and IPLOY with a dog",
    caption: "เพื่อนตัวน้อยพร้อมนั่งข้าง ๆ ระหว่างจัดความคิด"
  },
  spyIploy: {
    title: "Spy and IPLOY",
    image: "../v2/assets/characters/spy-iploy-card.jpg",
    alt: "Spy and IPLOY walking outside",
    caption: "เดินเล่นแล้วค่อยกลับมาเก็บไอเดียต่อ"
  },
  topIployPaint: {
    title: "Paint day",
    image: "../v2/assets/characters/top-iploy-2-card.jpg",
    alt: "TOP and IPLOY during painting",
    caption: "วันลงมือทำ เหมาะกับ checklist ที่ต้องค่อย ๆ ติ๊ก"
  },
  iployCute: {
    title: "IPLOY so cute",
    image: "../v2/assets/characters/iploy-socute-card.jpg",
    alt: "IPLOY sitting with toys",
    caption: "โหมดน่ารักไว้พักสายตาระหว่างจัดบอร์ด"
  }
};

let settings = loadSettings();
let notes = loadNotes();
let topZ = Math.max(1, ...notes.map((note) => note.z || 1));
let dragging = null;
let activeNoteId = null;
let bubbleTimer = null;
let activeTagFilter = "all";
let savedRichRange = null;

function sampleNotes() {
  const now = new Date().toISOString();
  const today = dateOffset(0);
  const tomorrow = dateOffset(1);
  const soon = dateOffset(3);
  const overdue = dateOffset(-1);
  return [
    {
      id: crypto.randomUUID(),
      title: "Inbox",
      body: "Drop quick thoughts here. Try <u>underline</u>, <s>strike</s>, quote blocks, and <span class=\"visual-check\" data-checked=\"true\" contenteditable=\"false\"></span> visual boxes.",
      type: "plain",
      color: "butter",
      tag: "idea",
      x: 70,
      y: 70,
      z: 1,
      createdAt: now,
      updatedAt: now
    },
    {
      id: crypto.randomUUID(),
      title: "Saved quote",
      body: "<blockquote>Keep the board calm. Let tiny things carry the personality.</blockquote>",
      type: "quote",
      color: "mint",
      tag: "personal",
      x: 360,
      y: 118,
      z: 2,
      createdAt: now,
      updatedAt: now
    },
    {
      id: crypto.randomUUID(),
      title: "Today checklist",
      body: "Review v4 tags\nTry due labels\nReorder tasks\nCheck progress",
      type: "checklist",
      color: "sky",
      tag: "focus",
      checked: [0],
      tasks: [
        { text: "Review v4 tags", done: true, due: today },
        { text: "Try due dates", done: false, due: today },
        { text: "Reorder tasks", done: false, due: tomorrow },
        { text: "Check progress", done: false, due: soon },
        { text: "Review overdue state", done: false, due: overdue }
      ],
      x: 180,
      y: 335,
      z: 3,
      createdAt: now,
      updatedAt: now
    },
    {
      id: crypto.randomUUID(),
      title: "Tiny paper",
      body: "shopping list",
      type: "tiny",
      color: "peach",
      tag: "shopping",
      x: 420,
      y: 285,
      z: 4,
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
  document.title = `${title} - pinpad v4`;
}

function createNote(overrides = {}) {
  const logicalWidth = isMobile() ? 720 : board.getBoundingClientRect().width;
  const logicalHeight = isMobile() ? 640 : board.getBoundingClientRect().height;
  const now = new Date().toISOString();
  const note = {
    id: crypto.randomUUID(),
    title: "Untitled",
    body: "",
    type: "plain",
    color: COLORS[notes.length % COLORS.length],
    tag: "none",
    checked: [],
    tasks: [],
    x: Math.max(22, Math.min(120 + notes.length * 24, logicalWidth - 250)),
    y: Math.max(22, Math.min(90 + notes.length * 24, logicalHeight - 210)),
    z: ++topZ,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };

  notes.push(note);
  searchInput.value = "";
  saveNotes();
  render();

  const element = board.querySelector(`[data-note-id="${note.id}"]`);
  element.classList.add("is-new");
  openNote(note.id);
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
  const tagBadge = fragment.querySelector(".note-tag");
  const checklistPreview = fragment.querySelector(".checklist-preview");
  const open = fragment.querySelector(".open-note");

  element.dataset.noteId = note.id;
  element.dataset.color = note.color;
  element.dataset.tag = note.tag;
  element.dataset.type = note.type;
  const scale = boardScale();
  element.style.left = `${note.x * scale}px`;
  element.style.top = `${note.y * scale}px`;
  element.style.zIndex = note.z;
  element.style.setProperty("--tilt", `${tiltFor(note.id)}deg`);
  title.value = note.title;
  title.readOnly = true;
  body.innerHTML = note.type === "checklist" ? "" : sanitizeRichText(note.body || "");
  body.dataset.placeholder = note.type === "checklist" ? "One task per line" : "Write something...";
  tagBadge.textContent = TAGS[note.tag].text;
  tagBadge.hidden = note.tag === "none";
  renderChecklistPreview(checklistPreview, note);

  element.addEventListener("pointerdown", startDrag);
  element.addEventListener("dblclick", (event) => {
    if (!event.target.closest("input, textarea, button, select, label")) openNote(note.id);
  });
  open.addEventListener("click", () => openNote(note.id));

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
  const interactive = event.target.closest("input, textarea, button, select, label, [contenteditable]");
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
    lastX: event.clientX,
    lastY: event.clientY,
    moved: false
  };

  board.classList.add("is-dragging-note");
  noteElement.classList.add("is-dragging");
  try {
    noteElement.setPointerCapture(event.pointerId);
  } catch {
    // Synthetic pointer events in automated checks may not have an active pointer capture target.
  }
  const z = ++topZ;
  noteElement.style.zIndex = z;
  updateNote(id, { z });
}

function moveDrag(event) {
  if (!dragging) return;

  const { element, boardRect, offsetX, offsetY, startX, startY } = dragging;
  dragging.lastX = event.clientX;
  dragging.lastY = event.clientY;
  dragging.moved = dragging.moved || Math.abs(event.clientX - startX) > 7 || Math.abs(event.clientY - startY) > 7;
  const maxX = boardRect.width - element.offsetWidth;
  const maxY = boardRect.height - element.offsetHeight;
  const x = clamp(event.clientX - boardRect.left - offsetX, 0, maxX);
  const y = clamp(event.clientY - boardRect.top - offsetY, 0, maxY);

  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  trashZone.classList.toggle("is-ready", isOverTrash(event.clientX, event.clientY));
}

function endDrag() {
  if (!dragging) return;

  const { id, element, moved, scale, lastX, lastY } = dragging;
  element.classList.remove("is-dragging");
  board.classList.remove("is-dragging-note");
  trashZone.classList.remove("is-ready");

  if (moved && isOverTrash(lastX, lastY)) {
    dragging = null;
    deleteNote(id);
    return;
  }

  updateNote(id, {
    x: parseFloat(element.style.left) / scale,
    y: parseFloat(element.style.top) / scale
  });
  dragging = null;

  if (!moved && isMobile()) openNote(id);
}

function isOverTrash(clientX, clientY) {
  if (!trashZone) return false;
  const rect = trashZone.getBoundingClientRect();
  return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
}

function openNote(id) {
  const note = notes.find((item) => item.id === id);
  if (!note) return;
  if (note.type === "checklist") normalizeChecklistState(note);

  activeNoteId = id;
  dialogTitle.value = note.title;
  dialogBody.value = note.body;
  dialogRichBody.innerHTML = sanitizeRichText(note.body || "");
  dialogColor.value = note.color;
  dialogType.value = note.type;
  dialogTag.value = note.tag;
  dialogBody.placeholder = note.type === "checklist" ? "One task per line" : "Write something...";
  syncDialogMode(note);
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

function activeNote() {
  return notes.find((note) => note.id === activeNoteId);
}

function saveRichSelection() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  const range = selection.getRangeAt(0);
  if (dialogRichBody.contains(range.commonAncestorContainer)) {
    savedRichRange = range.cloneRange();
  }
}

function restoreRichSelection() {
  if (!savedRichRange) return;
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(savedRichRange);
}

function applyRichCommand(command, value = null) {
  dialogRichBody.focus();
  restoreRichSelection();
  document.execCommand(command, false, value);
  saveRichSelection();
  syncDialogNote({ body: dialogRichBody.innerHTML });
}

function insertVisualCheckbox() {
  applyRichCommand("insertHTML", `<span class="visual-check" data-checked="false" contenteditable="false"></span>&nbsp;`);
}

function toggleVisualCheckbox(element) {
  const checked = element.dataset.checked === "true";
  element.dataset.checked = checked ? "false" : "true";
}

function handleVisualCheckboxClick(event) {
  const visualCheck = event.target.closest(".visual-check");
  if (!visualCheck) return;
  event.preventDefault();
  event.stopPropagation();
  toggleVisualCheckbox(visualCheck);
  if (dialogRichBody.contains(visualCheck)) {
    syncDialogNote({ body: dialogRichBody.innerHTML });
    return;
  }
  const noteElement = event.target.closest(".note");
  const noteBody = event.target.closest(".note-body");
  if (noteElement && noteBody) updateNote(noteElement.dataset.noteId, { body: noteBody.innerHTML });
}

function applySearch() {
  const query = searchInput.value.trim().toLowerCase();
  document.querySelectorAll(".note").forEach((element) => {
    const id = element.dataset.noteId;
    const note = notes.find((item) => item.id === id);
    const tag = TAGS[note.tag]?.label || "";
    const taskText = checklistTasks(note).map((task) => `${task.text} ${task.due}`).join(" ");
    const haystack = `${note.title} ${plainText(note.body)} ${tag} ${taskText} ${note.type}`.toLowerCase();
    const matchesQuery = query.length === 0 || haystack.includes(query);
    const matchesTag = activeTagFilter === "all" || note.tag === activeTagFilter;
    element.classList.toggle("is-hidden", !matchesQuery || !matchesTag);
  });
  updateCount();
}

function exportNotes() {
  const blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pinpad-v4-${new Date().toISOString().slice(0, 10)}.json`;
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
  const tag = normalizeTag(note.tag || note.sticker);
  const body = typeof note.body === "string" ? note.body : "";
  return {
    id: typeof note.id === "string" ? note.id : crypto.randomUUID(),
    title: typeof note.title === "string" ? note.title : "Untitled",
    body,
    type: TYPES.includes(note.type) ? note.type : "plain",
    color: COLORS.includes(note.color) ? note.color : COLORS[index % COLORS.length],
    tag,
    checked: Array.isArray(note.checked) ? note.checked.filter(Number.isFinite) : [],
    tasks: normalizeTasks(note.tasks, body, note.checked),
    x: Number.isFinite(note.x) ? note.x : 80 + index * 24,
    y: Number.isFinite(note.y) ? note.y : 80 + index * 24,
    z: Number.isFinite(note.z) ? note.z : index + 1,
    createdAt: typeof note.createdAt === "string" ? note.createdAt : now,
    updatedAt: now
  };
}

function normalizeTag(value) {
  const mapped = LEGACY_TAG_MAP[value] || value || "none";
  return TAGS[mapped] ? mapped : "none";
}

function showCharacterMessage() {
  const messages = [
    "อย่าลืมพักนะ",
    "เก็บไอเดียไว้ตรงนี้",
    "วันนี้มี note ใหม่ไหม",
    "จัดโต๊ะแล้วค่อยลุยต่อ",
    "ไอเดียดี ๆ ต้องปักไว้",
    "Spy & Gaga เฝ้าบอร์ดให้อยู่"
  ];
  characterBubble.textContent = messages[Math.floor(Math.random() * messages.length)];
  characterBubble.hidden = false;
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => {
    characterBubble.hidden = true;
  }, 2600);
}

function openMemory(key) {
  const memory = MEMORIES[key];
  if (!memory) return;

  memoryTitle.textContent = memory.title;
  memoryImage.src = memory.image;
  memoryImage.alt = memory.alt;
  memoryCaption.textContent = memory.caption;
  if (!memoryDialog.open) memoryDialog.showModal();
}

function checklistTasks(note) {
  if (Array.isArray(note.tasks) && note.tasks.length) return note.tasks;
  return normalizeTasks(note.tasks, note.body, note.checked);
}

function normalizeChecklistState(note) {
  const tasks = checklistTasks(note);
  note.tasks = tasks;
  note.body = syncTaskBody(tasks);
  note.checked = checkedFromTasks(tasks);
  return note;
}

function normalizeTasks(tasks, body = "", checked = []) {
  if (Array.isArray(tasks) && tasks.length) {
    return tasks.map((task, index) => ({
      text: typeof task.text === "string" ? task.text : `Task ${index + 1}`,
      done: Boolean(task.done),
      due: normalizeDueDate(task.due)
    }));
  }
  const checkedItems = new Set(Array.isArray(checked) ? checked : []);
  return body.split("\n")
    .map((text, index) => ({ text: text.trim(), done: checkedItems.has(index), due: "" }))
    .filter((task) => task.text);
}

function syncTaskBody(tasks) {
  return tasks.map((task) => task.text).join("\n");
}

function checkedFromTasks(tasks) {
  return tasks.reduce((result, task, index) => {
    if (task.done) result.push(index);
    return result;
  }, []);
}

function checklistProgressText(note) {
  const tasks = checklistTasks(note);
  if (!tasks.length) return "0/0 done";
  const done = tasks.filter((task) => task.done).length;
  return `${done}/${tasks.length} done`;
}

function dateOffset(days) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function normalizeDueDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
}

function dueState(due, done = false) {
  if (!due || done) return { key: "none", label: "", title: "" };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(`${due}T00:00:00`);
  const days = Math.round((dueDate - today) / 86400000);
  if (days < 0) return { key: "overdue", label: "!", title: "Overdue" };
  if (days === 0) return { key: "today", label: "Today", title: "Due today" };
  if (days <= 3) return { key: "soon", label: "Soon", title: "Due soon" };
  return { key: "upcoming", label: "Due", title: "Upcoming due date" };
}

function formatDueDate(due) {
  if (!due) return "";
  const date = new Date(`${due}T00:00:00`);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function renderChecklistPreview(container, note) {
  if (note.type !== "checklist") {
    container.hidden = true;
    container.replaceChildren();
    return;
  }

  const tasks = checklistTasks(note);
  container.hidden = false;
  const meter = document.createElement("div");
  meter.className = "note-progress";
  meter.innerHTML = `<span></span><strong>${checklistProgressText(note)}</strong>`;
  meter.querySelector("span").style.width = `${progressPercent(tasks)}%`;

  const rows = tasks.slice(0, 3).map((task, index) => {
    const row = document.createElement("label");
    row.className = "checklist-row";
    row.classList.toggle("is-checked", task.done);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => toggleChecklistItem(note.id, index, checkbox.checked));
    const text = document.createElement("span");
    text.className = "checklist-text";
    text.textContent = task.text;
    const due = dueState(task.due, task.done);
    const dueBadge = document.createElement("span");
    dueBadge.className = `due-chip is-${due.key}`;
    dueBadge.title = due.title;
    dueBadge.hidden = due.key === "none";
    dueBadge.textContent = due.key === "overdue" ? `! ${formatDueDate(task.due)}` : `${due.label} ${formatDueDate(task.due)}`;
    row.append(checkbox, text, dueBadge);
    return row;
  });
  if (tasks.length > 3) {
    const more = document.createElement("div");
    more.className = "checklist-more";
    more.textContent = `+${tasks.length - 3} more`;
    rows.push(more);
  }
  container.replaceChildren(meter, ...rows);
}

function toggleChecklistItem(noteId, index, checked) {
  const note = notes.find((item) => item.id === noteId);
  if (!note) return;
  const tasks = checklistTasks(note).map((task, taskIndex) => taskIndex === index ? { ...task, done: checked } : task);
  updateNote(noteId, { tasks, body: syncTaskBody(tasks), checked: checkedFromTasks(tasks) }, true);
  if (activeNoteId === noteId) renderDialogChecklist(activeNote());
}

function progressPercent(tasks) {
  if (!tasks.length) return 0;
  return Math.round((tasks.filter((task) => task.done).length / tasks.length) * 100);
}

function renderTagFilters() {
  const filters = [
    ["all", "All"],
    ...Object.entries(TAGS).filter(([key]) => key !== "none").map(([key, tag]) => [key, tag.label])
  ];
  tagFilters.replaceChildren(...filters.map(([key, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-chip";
    button.dataset.filter = key;
    button.textContent = label;
    button.setAttribute("aria-pressed", String(activeTagFilter === key));
    button.addEventListener("click", () => {
      activeTagFilter = key;
      renderTagFilters();
      applySearch();
    });
    return button;
  }));
}

function syncDialogMode(note = activeNote()) {
  if (!note) return;
  const checklist = note.type === "checklist";
  formatToolbar.hidden = checklist;
  dialogRichBody.hidden = checklist;
  dialogBody.hidden = true;
  dialogChecklist.hidden = !checklist;
  if (checklist) renderDialogChecklist(note);
}

function renderDialogChecklist(note = activeNote()) {
  if (!note) return;
  const tasks = checklistTasks(note);
  const visibleTasks = tasks.length ? tasks : [{ text: "", done: false, due: "" }];
  checklistProgress.innerHTML = `<span class="progress-track"><span style="width: ${progressPercent(tasks)}%"></span></span><strong>${checklistProgressText(note)}</strong>`;

  dialogChecklistItems.replaceChildren(...visibleTasks.map((task, index) => {
    const row = document.createElement("label");
    row.className = "dialog-checklist-row";

    const moveUp = document.createElement("button");
    moveUp.type = "button";
    moveUp.className = "move-task";
    moveUp.title = "Move task up";
    moveUp.textContent = "↑";
    moveUp.disabled = index === 0;
    moveUp.addEventListener("click", (event) => {
      event.preventDefault();
      moveChecklistItem(note.id, index, -1);
    });

    const moveDown = document.createElement("button");
    moveDown.type = "button";
    moveDown.className = "move-task";
    moveDown.title = "Move task down";
    moveDown.textContent = "↓";
    moveDown.disabled = index === visibleTasks.length - 1;
    moveDown.addEventListener("click", (event) => {
      event.preventDefault();
      moveChecklistItem(note.id, index, 1);
    });

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => toggleChecklistItem(note.id, index, checkbox.checked));

    const input = document.createElement("input");
    input.type = "text";
    input.value = task.text;
    input.placeholder = "Task";
    input.addEventListener("input", () => {
      const current = activeNote();
      if (!current) return;
      const nextTasks = checklistTasks(current);
      nextTasks[index] = { ...(nextTasks[index] || { done: false, due: "" }), text: input.value };
      updateNote(current.id, { tasks: nextTasks, body: syncTaskBody(nextTasks), checked: checkedFromTasks(nextTasks) }, true);
    });

    const due = document.createElement("input");
    due.type = "date";
    due.className = "task-due";
    due.value = task.due;
    due.setAttribute("aria-label", "Due label");
    due.addEventListener("change", () => {
      const current = activeNote();
      if (!current) return;
      const nextTasks = checklistTasks(current);
      nextTasks[index] = { ...(nextTasks[index] || { text: "", done: false }), due: due.value };
      updateNote(current.id, { tasks: nextTasks, body: syncTaskBody(nextTasks), checked: checkedFromTasks(nextTasks) }, true);
    });

    const status = dueState(task.due, task.done);
    const dueSignal = document.createElement("span");
    dueSignal.className = `due-signal is-${status.key}`;
    dueSignal.title = status.title;
    dueSignal.hidden = status.key === "none";
    dueSignal.textContent = status.key === "overdue" ? "!" : status.label;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-task";
    remove.title = "Delete task";
    remove.textContent = "×";
    remove.addEventListener("click", (event) => {
      event.preventDefault();
      removeChecklistItem(note.id, index);
    });

    row.append(moveUp, moveDown, checkbox, input, due, dueSignal, remove);
    return row;
  }));
}

function removeChecklistItem(noteId, index) {
  const note = notes.find((item) => item.id === noteId);
  if (!note) return;
  const tasks = checklistTasks(note);
  tasks.splice(index, 1);
  updateNote(noteId, { tasks, body: syncTaskBody(tasks), checked: checkedFromTasks(tasks) }, true);
  renderDialogChecklist(activeNote());
}

function moveChecklistItem(noteId, index, direction) {
  const note = notes.find((item) => item.id === noteId);
  if (!note) return;
  const tasks = checklistTasks(note);
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= tasks.length) return;
  const [task] = tasks.splice(index, 1);
  tasks.splice(nextIndex, 0, task);
  updateNote(noteId, { tasks, body: syncTaskBody(tasks), checked: checkedFromTasks(tasks) }, true);
  renderDialogChecklist(activeNote());
}

function sanitizeRichText(value) {
  if (!value) return "";
  if (!/[<>]/.test(value)) return escapeHTML(value).replace(/\n/g, "<br>");
  const template = document.createElement("template");
  template.innerHTML = value;
  template.content.querySelectorAll("script, iframe, object, embed, link, meta, style").forEach((node) => node.remove());
  template.content.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const val = attribute.value.toLowerCase();
      if (name.startsWith("on") || val.includes("javascript:")) node.removeAttribute(attribute.name);
      if (name === "style") {
        node.setAttribute("style", node.getAttribute("style").replace(/url\\([^)]*\\)/gi, ""));
      }
    });
  });
  return template.innerHTML;
}

function plainText(value) {
  const template = document.createElement("template");
  template.innerHTML = value || "";
  return template.content.textContent || value || "";
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
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
renderTagFilters();
render();

boardTitle.addEventListener("input", (event) => {
  settings.boardTitle = event.target.value;
  saveSettings();
  document.title = `${event.target.value.trim() || DEFAULT_SETTINGS.boardTitle} - pinpad v4`;
});
boardTitle.addEventListener("blur", () => {
  if (!boardTitle.value.trim()) {
    settings.boardTitle = DEFAULT_SETTINGS.boardTitle;
    saveSettings();
  }
  syncTitle();
});
addButton.addEventListener("click", () => createNote());
addChecklistButton.addEventListener("click", () => createNote({
  title: "Checklist",
  body: "First thing\nSecond thing\nTiny win",
  type: "checklist",
  tag: "focus",
  tasks: [
    { text: "First thing", done: false, due: dateOffset(0) },
    { text: "Second thing", done: false, due: "" },
    { text: "Tiny win", done: false, due: "" }
  ]
}));
exportButton.addEventListener("click", exportNotes);
importInput.addEventListener("change", importNotes);
fileMenu.addEventListener("click", (event) => {
  if (event.target === exportButton) fileMenu.open = false;
});
resetButton.addEventListener("click", () => {
  const confirmed = confirm("Reset all notes on this v4 board? This cannot be undone.");
  if (!confirmed) return;

  notes = sampleNotes();
  topZ = Math.max(1, ...notes.map((note) => note.z || 1));
  saveNotes();
  render();
});
searchInput.addEventListener("input", applySearch);
dialogTitle.addEventListener("input", (event) => syncDialogNote({ title: event.target.value }));
dialogBody.addEventListener("input", (event) => syncDialogNote({ body: event.target.value }));
dialogRichBody.addEventListener("input", () => {
  saveRichSelection();
  syncDialogNote({ body: dialogRichBody.innerHTML });
});
dialogRichBody.addEventListener("click", handleVisualCheckboxClick);
dialogRichBody.addEventListener("keyup", saveRichSelection);
dialogRichBody.addEventListener("mouseup", saveRichSelection);
dialogRichBody.addEventListener("blur", saveRichSelection);
formatToolbar.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-command]");
  if (!button) return;
  event.preventDefault();
  applyRichCommand(button.dataset.command, button.dataset.value || null);
});
textColor.addEventListener("change", (event) => {
  if (!event.target.value) return;
  applyRichCommand("foreColor", event.target.value);
  event.target.value = "";
});
highlightColor.addEventListener("change", (event) => {
  if (!event.target.value) return;
  applyRichCommand("backColor", event.target.value);
  event.target.value = "";
});
listStyle.addEventListener("change", (event) => {
  if (!event.target.value) return;
  applyRichCommand(event.target.value);
  event.target.value = "";
});
fontSize.addEventListener("change", (event) => {
  if (!event.target.value) return;
  applyRichCommand("fontSize", event.target.value);
  event.target.value = "";
});
insertVisualCheck.addEventListener("click", insertVisualCheckbox);
board.addEventListener("click", handleVisualCheckboxClick);
dialogColor.addEventListener("change", (event) => syncDialogNote({ color: event.target.value }));
dialogType.addEventListener("change", (event) => {
  dialogBody.placeholder = event.target.value === "checklist" ? "One task per line" : "Write something...";
  const patch = { type: event.target.value };
  if (event.target.value === "checklist" && !dialogBody.value.trim()) {
    patch.body = "First task";
    patch.tasks = [{ text: "First task", done: false, due: "" }];
    dialogBody.value = patch.body;
  } else if (event.target.value === "checklist") {
    patch.tasks = normalizeTasks([], dialogRichBody.textContent || dialogBody.value, []);
  } else if (event.target.value !== "checklist") {
    patch.body = dialogRichBody.innerHTML || dialogBody.value;
  }
  syncDialogNote(patch);
  syncDialogMode();
});
dialogTag.addEventListener("change", (event) => syncDialogNote({ tag: event.target.value }));
addChecklistItem.addEventListener("click", () => {
  const note = activeNote();
  if (!note) return;
  const tasks = [...checklistTasks(note), { text: "New task", done: false, due: "" }];
  updateNote(note.id, { tasks, body: syncTaskBody(tasks), checked: checkedFromTasks(tasks) }, true);
  renderDialogChecklist(activeNote());
});
bringForwardButton.addEventListener("click", () => {
  if (activeNoteId) bringForward(activeNoteId);
});
dialogDelete.addEventListener("click", () => {
  if (activeNoteId) deleteNote(activeNoteId);
});
noteDialog.addEventListener("close", () => {
  activeNoteId = null;
});
characterButton.addEventListener("click", showCharacterMessage);
memoryCards.forEach((card) => {
  card.addEventListener("click", () => openMemory(card.dataset.memory));
});
window.addEventListener("pointermove", moveDrag);
window.addEventListener("pointerup", endDrag);
window.addEventListener("pointercancel", endDrag);
window.addEventListener("resize", render);
