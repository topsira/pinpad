# Codex Working Rules for pinpad

This file is the project-level working agreement for Codex and future agents.

## Always Read First

Before making meaningful changes, read:

- `CONTEXT.md`
- `PLAN.md`
- `ISSUE_ROADMAP.md` when planning roadmap work
- `docs/project/LOG.md` when resuming previous work
- `docs/project/SETUP.md` before changing run, test, or deploy behavior

## Baseline Skills to Apply

These local Codex skills are part of TOPSIRA's preferred workflow. They are not app dependencies, but they should guide how work is done.

- `topsira-project-memory`: Use when starting, finishing, documenting, logging, deciding, handing off, or preserving project context.
- `karpathy-guidelines`: Use for all code edits and reviews. Keep changes simple, surgical, assumption-aware, and verifiable.
- `diagnose`: Use when something is broken, flaky, slow, failing, or hard to explain. Build a feedback loop before guessing.
- `tdd`: Use when the user asks for TDD, when adding risky behavior, or when logic becomes important enough to protect with tests.
- `prototype`: Use for UI/interaction exploration before committing to a direction.
- `to-issues`: Use when converting plans, PRDs, or roadmap notes into GitHub Issues.
- `to-prd`: Use when the project needs a more formal product spec.
- `triage`: Use for incoming issue cleanup, bug/feature classification, and preparing work for later implementation.
- `zoom-out`: Use when context is unclear or the local code change needs broader product/architecture framing.
- `improve-codebase-architecture`: Use when the project grows hard to test, hard to change, or tightly coupled.
- `scrutinize` from 9arm: Use for plan, PR, diff, or design review. Question whether the change should exist, trace end-to-end, and verify claims.

## Engineering Rules

- Prefer static, low-dependency implementation unless there is a real need for a framework.
- Keep the first screen as the working board, not a landing page.
- Do not introduce backend, auth, analytics, or sync without an explicit decision.
- Keep private note content local-first.
- Make small vertical changes that can be verified quickly.
- Avoid speculative abstractions.
- Match the existing style before inventing a new pattern.

## Verification Rules

For code changes, run the lightest useful checks:

```bash
node --check app.js
```

For UI behavior, manually or browser-test:

- Create a note.
- Edit title and body.
- Drag a note.
- Refresh and confirm persistence.
- Search notes.
- Export/import JSON when persistence format changes.
- Check mobile around 390px width when layout changes.

## Documentation Rules

Update project memory when work changes future context:

- `CONTEXT.md` for product direction, principles, and open questions.
- `PLAN.md` for product roadmap and scope.
- `ISSUE_ROADMAP.md` for issue-ready implementation slices.
- `docs/project/SETUP.md` for run, test, deploy, and migration instructions.
- `docs/project/LOG.md` after meaningful sessions.

Do not write secrets, tokens, private note content, or personal data into project memory.

## GitHub Pages

The deployed site is:

```text
https://topsira.github.io/pinpad/
```

Deployment source:

- Branch: `main`
- Folder: `/(root)`
