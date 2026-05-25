# pinpad Sticker Plan

This plan defines stickers as small functional markers, not a large decorative sticker pack.

The reference lesson from Stick it with Robert is that stickers work best when they help the user tell notes apart. For `pinpad`, stickers should support scanning and retrieval while keeping the board calm.

## Product Direction

Stickers should feel like tiny paper marks on a real note:

- Small enough to avoid covering note text.
- Visually cute, but still useful.
- Limited set first, not a full sticker library.
- Stored with notes and included in export/import.
- Searchable by label.

## v2 Demo Scope

The current demo adds one optional sticker marker per note:

- `Idea`
- `Focus`
- `Saved`
- `Later`
- `Soft`

Each marker appears at the bottom corner of the sticky note. Users can change it from the desktop note toolbar or from the mobile detail modal.

## Why This Comes Before Full Sticker Packs

A full sticker pack would add more placement, drag, layer, and mobile complexity. The small-marker version tests the real product value first:

- Do stickers help scan a busy board?
- Are labels clearer than color alone?
- Does the board still feel minimal?
- Does the feature work on mobile without crowding the note?

## Suggested Next Iterations

### Phase 1: Validate The Marker Set

- Use the five current sticker labels.
- Check whether `Soft` should stay or become `Personal`.
- Check whether `Focus` and `Later` overlap with ordinary note text.
- Keep one sticker per note.

### Phase 2: Add Sticker Filtering

- Add a compact filter control near search.
- Let users filter by one sticker at a time.
- Keep search matching sticker labels.

### Phase 3: Add Custom Sticker Names

- Let users rename sticker labels in settings.
- Keep the same visual shapes/colors.
- Store sticker label settings separately from notes.

### Phase 4: Consider Decorative Stickers

Only consider this after the marker system feels useful.

Possible direction:

- Add a small, fixed sticker strip.
- Allow decorative stickers only in predefined note slots.
- Avoid free-floating decorative stickers until board layering is more mature.

## Open Decisions

- Should `Soft` become `Personal`, `Home`, or `Cute`?
- Should stickers replace tags for now?
- Should each note allow only one sticker, or one sticker plus tags later?
- Should the dog characters have matching stickers in a future pack?
- Should sticker filtering appear in v2, or wait until there are more notes?

## Recommended Next Action

Keep the current marker demo in `/v2/`, use it for a few notes, then decide whether the labels feel natural. If the answer is yes, the next small feature should be a sticker filter next to search.
