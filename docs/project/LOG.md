# pinpad Project Log

## 2026-05-24 - Initial Static Demo and Pages Deploy

### Done

- Created the first static `pinpad` demo.
- Added sticky note creation, editing, dragging, color changes, search, export/import, reset, and `localStorage` persistence.
- Initialized a local Git repo.
- Published repo to GitHub as `topsira/pinpad`.
- Changed the repo to public so GitHub Pages could be used on GitHub Free.
- Enabled GitHub Pages from `main` and `/(root)`.

### Decisions

- Keep the first version static: HTML, CSS, vanilla JavaScript.
- Store notes locally in the browser by default.
- Avoid backend, auth, and sync until there is a real need.

### Pending

- Decide whether organization should use tags, board sections, or both.
- Decide whether sync should ever be added.

### Next

- Improve mobile drag and layout.
- Add note tags.
- Add archive mode.

### Verification

- `node --check app.js` passed.
- Desktop render was checked with Chrome headless.
- Mobile add/search flow was checked with Chrome headless.
- GitHub Pages returned `HTTP 200` for `index.html`, `styles.css`, and `app.js`.

## 2026-05-25 - Project Memory and Roadmap

### Done

- Added `CONTEXT.md` for project direction and Codex working context.
- Added `ISSUE_ROADMAP.md` with issue-ready vertical slices.
- Added this project log.
- Added setup and deployment notes in `docs/project/SETUP.md`.
- Added `AGENTS.md` as the project-level Codex working agreement.

### Decisions

- Treat project memory files as portable repo context.
- Treat local Codex skills as machine-specific workflow tools, not app dependencies.
- Use `AGENTS.md` to preserve TOPSIRA's baseline agent rules inside this repo.

### Pending

- Choose whether to publish the roadmap items as GitHub Issues.

### Next

- If approved, create GitHub Issues from `ISSUE_ROADMAP.md`.

### Verification

- Documentation-only change; no app runtime check required.

## 2026-05-25 - v2 Personal Pinpad Branch

### Done

- Created `feature/v2-personal-pinpad` for safe v2 work.
- Added the isolated `v2/` demo path so the public root v1 can stay unchanged.
- Added editable board title settings with `localStorage` persistence.
- Added a mobile focused-note dialog for clearer reading and editing.
- Added a lightweight two-character corner placeholder for the future dog assets.
- Refreshed the v2 visual direction toward a softer personal desk board.

### Decisions

- Keep dog character assets as replaceable files under `v2/assets/characters/`.
- Keep export/import note-only for this first v2 pass to reduce format risk.
- Treat mobile as a board overview first, with detail editing through the dialog.

### Pending

- Add real dog cutout assets when the source images are available.
- Decide whether to merge this branch so GitHub Pages exposes `/pinpad/v2/`.
- Decide later whether v2 should replace the root page.

### Verification

- `node --check app.js` passed.
- `node --check v2/app.js` passed.
- Desktop render checked at `http://127.0.0.1:4173/v2/`.
- Mobile 390px render checked with note detail open/edit/close flow.

## 2026-05-25 - Robert Reference Study

### Done

- Reviewed the exported `stick it with robert.pdf` reference.
- Added `docs/project/ROBERT_REFERENCE_PLAN.md` with lessons, risks, and suggested next phases for `pinpad`.

### Decisions

- Treat the reference as product inspiration, not a visual copy target.
- Prioritize constraints, mobile detail flow, functional stickers, and small character personality over large feature expansion.

### Pending

- Decide whether to convert the new reference plan into GitHub Issues.
- Review whether v2 should merge as `/pinpad/v2/` before adding dog assets.

### Verification

- Documentation-only change; no app runtime check required.

## 2026-05-25 - Character Asset Demo

### Done

- Added optimized web demo assets for the dog cutout and memory cards.
- Replaced the placeholder dog shapes with the transparent Spy and Gaga cutout.
- Added a small memory card rail using the personal images, including people.
- Added a memory modal so each card can be previewed larger without crowding the board.

### Decisions

- Use optimized derivative assets in the app so public v2 loads faster.
- Keep the character corner small and keep memory photos as optional card interactions.

### Pending

- Decide whether to keep all three memory cards, reduce to dog-only, or rotate cards randomly.
- Decide whether the original large source images should stay tracked long term or only optimized web assets should be kept.

### Verification

- `node --check app.js` passed.
- `node --check v2/app.js` passed.
- Desktop and mobile Chrome headless checks passed with no console errors.
- Mobile 390px render checked with notes inside the board and memory modal opening correctly.

## 2026-05-25 - Sticker Marker Demo

### Done

- Added `docs/project/STICKER_PLAN.md`.
- Added a first sticker marker system for v2 notes.
- Added one optional marker per note: Idea, Focus, Saved, Later, or Soft.
- Added sticker editing from desktop note controls and the mobile detail modal.
- Included sticker data in note persistence, export/import compatibility, and search matching.

### Decisions

- Treat stickers as functional note markers first.
- Delay free-floating decorative stickers until the marker model is validated.

### Pending

- Decide whether `Soft` should be renamed to `Personal`, `Home`, or another label.
- Decide whether to add sticker filtering next to search.

### Verification

- `node --check app.js` passed.
- `node --check v2/app.js` passed.
- Desktop Chrome headless check passed with no note or toolbar overflow.
- Mobile Chrome headless check passed with sticker editing through the detail modal.
