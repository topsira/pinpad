# pinpad v3 Demo Plan

v3 is a separate preview path. It must not change the public root version or the current `/v2/` experience while people are testing v2.

## Version Strategy

Current public paths:

- `/pinpad/` - original version.
- `/pinpad/v2/` - current personal board test version.
- `/pinpad/v3/` - next preview version.

Keep v3 separate until it is approved. If v3 should become the normal test version later, back up the current v2 folder first, then copy v3 into `/v2/`.

Recommended backup path:

- `/pinpad/v2-archive/` for the current v2.
- `/pinpad/v2/` for the promoted v3.

This keeps the tester's current v2 experience stable until the moment TOPSIRA explicitly chooses to promote v3.

## Storage Decision

Keeping Original, v2, and v3 as static versions is fine for this project right now. The code is tiny. Images are the main storage cost.

To keep the repo healthy:

- Reuse shared assets instead of duplicating them in every version.
- Keep optimized card images for the live UI.
- Keep source images only when they are useful for future edits.
- Avoid committing repeated exported copies of the same large image.

## v3 Demo Scope

### Memory Sticker Expansion

v3 adds three new memory cards after the existing set:

- `walk time` from `Spy&iPloy.png`.
- `paint day` from `TOP&IPLOY#2.png`.
- `so cute` from `iPloySoCute.png`.

The v3 page references shared assets from `v2/assets/characters/` instead of duplicating the same images under `v3/`.

### Paper Types

v3 experiments with paper types:

- `Plain` - general note.
- `Checklist` - one task per line with a compact checklist preview.
- `Quote` - stronger text treatment for saved lines or reminders.
- `Tiny` - small label-like note for short words.

The first implementation keeps each note as the same data shape and adds `type`. This is safer than introducing separate note schemas too early.

## Paper Type Ideas For Later

Good candidates:

- `Checklist` for tasks.
- `Quote` for saved words, affirmations, or snippets.
- `Tiny` for labels, one-word reminders, and board markers.
- `Link` for saved URLs with a readable domain preview.
- `Photo` for a small image card, but only after memory cards feel stable.
- `Weekly` only if checklist is not enough.

Avoid for now:

- Full schedule paper, because it overlaps with checklist.
- Calendar paper, because it pushes the app toward a productivity suite.
- Free-form rich text, because it makes editing and export more complex.

## Decisions Still Open

- Should `Soft` be renamed to `Personal`, `Home`, or `Cute`?
- Should sticker filter come before tidy board?
- Should v3 keep all six memory cards visible, or make the memory rail scroll/collapse?
- Should source images stay in the repo long term, or should only optimized derivatives be tracked?
- When v3 is approved, should it live as `/v3/` or be promoted into `/v2/` with v2 archived?

## Recommended Next Step

Review `/v3/` visually on desktop and mobile. If the checklist paper feels useful, the next implementation should be sticker filtering. If the board starts to feel messy, do tidy board first.
