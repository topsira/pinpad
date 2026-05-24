# pinpad Issue Roadmap

This roadmap is written as GitHub-issue-ready vertical slices. Each item should be independently demoable after completion.

## Issue 1: Add Note Metadata and Tags

Type: AFK

Blocked by: None

### What to build

Add lightweight tags to notes so a user can classify snippets without changing the board metaphor. Tags should save with notes, restore after refresh, and work with search.

### Acceptance criteria

- [ ] A note can have zero or more text tags.
- [ ] Tags are saved in `localStorage` and included in JSON export/import.
- [ ] Search matches tag names as well as note title and body.
- [ ] Existing notes without tags continue to load correctly.

## Issue 2: Add Board Sections

Type: HITL

Blocked by: None

### What to build

Add optional visual sections for board organization, such as Inbox, Ideas, Saved Text, and Later. Confirm the section model before implementation because it affects the feel of the whole board.

### Acceptance criteria

- [ ] A user can see clear board sections without losing the open-board feeling.
- [ ] Notes can be assigned to a section.
- [ ] Section assignment persists after refresh.
- [ ] The design works on desktop and mobile widths.

## Issue 3: Add Archive Mode

Type: AFK

Blocked by: Issue 1 or Issue 2 if either changes the note schema first

### What to build

Allow users to archive notes instead of deleting them permanently. Archived notes should leave the main board but remain recoverable.

### Acceptance criteria

- [ ] A note can be archived from the board.
- [ ] Archived notes are hidden from the default board view.
- [ ] Archived notes can be restored.
- [ ] Archived state is saved in `localStorage` and included in export/import.

## Issue 4: Add Markdown Preview for Snippets

Type: AFK

Blocked by: None

### What to build

Add a small preview mode for notes that contain links, code snippets, or markdown-like text. Keep editing simple and avoid turning the app into a full document editor.

### Acceptance criteria

- [ ] A note can toggle between edit and preview mode.
- [ ] Links render as clickable links in preview mode.
- [ ] Code fences render in a readable monospace block.
- [ ] Plain text notes remain easy to edit.

## Issue 5: Improve Mobile Drag and Layout

Type: AFK

Blocked by: None

### What to build

Tune the board for mobile use so notes remain reachable, controls fit cleanly, and dragging feels predictable on narrow screens.

### Acceptance criteria

- [ ] Notes cannot be dragged outside the visible board.
- [ ] Toolbar controls fit within note width on a 390px viewport.
- [ ] Adding a note places it in a visible reachable area.
- [ ] Existing desktop layout remains unchanged or improved.

## Issue 6: Add Local Backup Reminders

Type: AFK

Blocked by: None

### What to build

Add a small local-only backup prompt that reminds the user to export notes after meaningful changes or after enough time has passed.

### Acceptance criteria

- [ ] The app can detect when notes have changed since the last export.
- [ ] A subtle reminder appears without blocking note-taking.
- [ ] Export clears or updates the backup reminder state.
- [ ] The reminder state is local to the browser.

## Issue 7: Add Optional Sync Decision

Type: HITL

Blocked by: Issues 1 and 3 if note schema changes are already underway

### What to build

Decide whether `pinpad` should stay local-only or add sync. Compare private gist, Supabase, Firebase, and no-sync options before implementing anything.

### Acceptance criteria

- [ ] A short decision note documents the chosen sync direction.
- [ ] Risks around private text storage are called out.
- [ ] No backend code is added before the decision is accepted.

## Suggested Order

1. Issue 5: Improve Mobile Drag and Layout.
2. Issue 1: Add Note Metadata and Tags.
3. Issue 3: Add Archive Mode.
4. Issue 4: Add Markdown Preview for Snippets.
5. Issue 6: Add Local Backup Reminders.
6. Issue 2: Add Board Sections.
7. Issue 7: Add Optional Sync Decision.

