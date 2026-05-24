# pinpad Setup

## Prerequisites

- A modern browser.
- Git for local version control.

No package installation is required for the current static version.

## Run Locally

Open `index.html` directly in a browser, or run a tiny static server from the project root:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Test

Current lightweight check:

```bash
node --check app.js
```

Manual checks:

- Create a note.
- Edit title and body.
- Drag the note.
- Refresh and confirm the note remains.
- Export JSON.
- Import JSON.
- Check mobile width around 390px.

## Deploy

GitHub Pages is enabled from:

- Branch: `main`
- Folder: `/(root)`

Live URL:

```text
https://topsira.github.io/pinpad/
```

## Machine Migration Notes

Synced project files are portable through the repo.

Local Codex skills are installed under:

```text
~/.codex/skills
```

Those skills are machine-specific and should be installed separately on a new machine. They guide Codex behavior but are not app dependencies.

