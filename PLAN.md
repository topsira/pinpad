# pinpad Project Plan

## Product Idea

Pinpad is a personal web board for quick notes, saved snippets, reminders, tiny ideas, and copied text. It should feel like a desk surface rather than a document editor.

## Name Options

- `pinpad` - recommended; short, clear, and board-like.
- `notepeg` - playful, but less obvious.
- `sticklet` - cute, but sounds more like a widget.
- `boardly` - friendly, but more generic.

## MVP Scope

1. Create, edit, move, and delete notes.
2. Save board state locally in the browser.
3. Search/filter notes.
4. Color-code notes.
5. Export/import JSON for backup.
6. Make it deployable as a static site.

## Information Architecture

- `index.html` - app shell and controls.
- `styles.css` - board, notes, responsive layout, interaction states.
- `app.js` - board state, persistence, drag behavior, import/export.
- `README.md` - setup, usage, deployment.
- `PLAN.md` - product direction and roadmap.

## UX Direction

The first screen should be the working board, not a landing page. Controls stay compact at the top. Notes should feel tactile with paper colors, small shadows, slight rotation, and a visible pin control.

## Data Model

```json
{
  "id": "note_001",
  "title": "Idea",
  "body": "Paste something here.",
  "color": "yellow",
  "x": 120,
  "y": 160,
  "z": 3,
  "createdAt": "2026-05-24T00:00:00.000Z",
  "updatedAt": "2026-05-24T00:00:00.000Z"
}
```

## Roadmap

### Phase 1: Static Personal Tool

- Finish local board demo.
- Tune mobile layout.
- Add keyboard shortcuts only if they feel natural.
- Deploy to personal repo site.

### Phase 2: Better Organization

- Add tags or small labels.
- Add board sections such as Inbox, Ideas, Saved Text, Later.
- Add archive mode.
- Add markdown preview for code snippets and links.

### Phase 3: Optional Sync

- Add sign-in only if needed.
- Sync with a private backend.
- Add daily backup export.

## Acceptance Criteria

- The app opens from a single HTML file.
- A note can be created, edited, moved, deleted, and restored from local storage after refresh.
- Board data can be exported and imported.
- The UI works on desktop and mobile widths.

