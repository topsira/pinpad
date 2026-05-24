# pinpad Context

## Project Identity

`pinpad` is a small personal sticky-note board for TOPSIRA's repo site. It should feel like a useful desk surface: fast, tactile, private-first, and easy to return to later.

## Primary User

The primary user is TOPSIRA using this as a personal web tool for:

- Quick notes.
- Saved text snippets.
- Ideas to revisit.
- Reminders.
- Small copied content that should stay visible.

This is not intended to become a public SaaS product unless the project direction changes.

## Product Principles

- Start as a static personal tool.
- Keep the first screen as the working board, not a landing page.
- Prefer direct manipulation: create, edit, drag, color, search.
- Keep private data in the browser by default.
- Avoid backend or login until there is a real sync need.
- Keep deploy friction low for GitHub Pages.

## Current Stack

- Static HTML.
- CSS.
- Vanilla JavaScript.
- Browser `localStorage`.
- GitHub Pages deployment from `main` and `/(root)`.

## Current Live Site

- Repository: `https://github.com/topsira/pinpad`
- GitHub Pages: `https://topsira.github.io/pinpad/`

## Current Behavior

- Notes can be created, edited, moved, deleted, searched, color-coded, exported, imported, and reset.
- Notes persist locally in the user's current browser through `localStorage`.
- There is no account system and no server-side storage.

## Design Direction

- Board-like, tactile, and useful.
- Compact controls.
- Paper-note colors are allowed, but avoid making the whole UI one-note or too decorative.
- Mobile should remain usable, even if desktop is the primary layout.
- Do not add explanatory marketing copy inside the app surface.

## Non-Goals for Now

- Multi-user collaboration.
- Server sync.
- Authentication.
- Large rich text editor behavior.
- Public note sharing.
- Analytics.

## Suggested Codex Skills

Use these skills when the task matches:

- `topsira-project-memory`: update durable project memory, setup notes, decisions, logs, and next steps.
- `prototype`: explore UI or interaction ideas before making them permanent.
- `diagnose`: debug broken save, drag, import/export, or deploy behavior.
- `tdd`: add tests before risky logic changes.
- `improve-codebase-architecture`: revisit structure if `app.js` becomes hard to safely change.
- `to-issues`: convert roadmap or plans into small implementation issues.
- `github`: inspect or manage repository, Pages, Actions, issues, or pull requests.

## Portable Memory vs Local Skills

Project files such as this `CONTEXT.md`, `README.md`, `PLAN.md`, and roadmap docs are portable. They travel with the repo and help future Codex sessions understand the project.

Local Codex skills in `~/.codex/skills` are machine-specific. They guide how Codex works, but they are not installed into this repo unless intentionally copied as project documentation.

## Open Questions

- Should notes support tags, sections, or both?
- Should archived notes stay in local storage or export-only backups?
- Should markdown preview support be limited to links and code snippets?
- Should future sync use a private gist, Supabase, Firebase, or another private backend?

