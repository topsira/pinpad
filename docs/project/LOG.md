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
