# Robert Reference Study Plan

This plan captures product lessons from the `stick it with robert.pdf` reference and translates them into possible next moves for `pinpad`.

The goal is not to copy the reference directly. The goal is to borrow the useful product thinking: make the board feel personal, keep the tool focused, and use cute details to support the note-taking experience rather than distract from it.

## What the Reference Does Well

### 1. It Starts With a Clear Emotional Problem

The reference is not only "a sticky note app." It frames the problem as productivity tools feeling cold, overwhelming, and impersonal, especially for remote workers.

For `pinpad`, this suggests a stronger direction:

- Make the app feel like a personal desk surface, not a generic dashboard.
- Keep controls compact and tactile.
- Let the board feel like "mine" through title, note style, tiny character behavior, and future assets.
- Avoid adding features that make the board feel like another task management system.

### 2. It Uses Constraints as a Product Feature

The reference uses a hidden 5x4 grid so notes snap into place and do not overlap. This keeps the board organized by design instead of asking users to manually clean it up.

For `pinpad`, this is important because our current desktop board allows free positioning, which feels expressive but can become messy.

Possible adaptation:

- Keep free drag for desktop v2 because it feels natural.
- Add optional "snap to soft grid" later.
- On mobile, treat the board as an overview instead of a full freeform canvas.
- Add collision prevention only if overlap becomes annoying in real use.

### 3. It Makes Character Personality Useful

Robert is not only decoration. The character creates companionship and mood. Users can choose Robert's mood, which gives them a small sense of control and emotional connection during work.

For `pinpad`, the dog character corner should stay small but meaningful:

- Idle animation makes the board feel alive.
- Tap/click message gives a tiny moment of reward.
- Future dog assets can have simple moods such as calm, focus, sleepy, yay, and break.
- Character should never block notes or become the main feature.

### 4. It Narrows Note Types Instead of Adding Everything

The reference explored many note types, then narrowed to four. The hard decision was resisting the urge to add more.

For `pinpad`, this is a useful warning. Tags, sections, stickers, archive, markdown, sync, timers, and dashboards could all be tempting, but they can make the app feel heavy.

Recommended principle:

- Every new note feature must answer: "Does this help capture or find notes faster?"
- If two features solve the same problem, keep the simpler one.
- Delay timers, accounts, analytics, and full task management.

### 5. It Turns Stickers Into Wayfinding

The most useful sticker lesson is that stickers became both decorative and functional. They helped distinguish notes of the same type.

For `pinpad`, stickers should not start as a full sticker pack. They should first solve a real organization problem:

- A small sticker or mark can identify a note category.
- Stickers can appear in the note corner, not as large movable clutter.
- A limited starter set is better than a large library.
- Stickers can later become a visual alternative to text tags.

### 6. It Tests With Real Users Before Expanding

The reference used a small test group first, then public feedback. Later improvements were prioritized by usability impact and effort/value, not by raw request volume.

For `pinpad`, this means:

- Test v2 personally before adding more systems.
- Track pain points separately from feature requests.
- Prefer "what caused friction?" over "what feature would be cool?"
- Do not add sync or accounts unless local-only becomes a real blocker.

## Problems the Reference Encountered

### Problem 1: Too Much Flexibility Can Overwhelm Users

The reference identified unlimited tasks and endless flexibility as a core problem in productivity tools.

Pinpad risk:

- If we add tags, sections, stickers, archive, markdown, sync, and character moods all at once, `pinpad` becomes another productivity app to manage.

Mitigation:

- Ship one clear improvement at a time.
- Keep the first screen as the board.
- Hide advanced organization until needed.

### Problem 2: Free Placement Can Become Messy

The reference solved this with a hidden grid and snap placement.

Pinpad risk:

- Desktop free drag can lead to overlapping notes.
- Mobile free drag is harder because the viewport is narrow.

Mitigation:

- Keep mobile tap-to-detail as the main mobile flow.
- Add optional snap points or soft grid later.
- Consider "tidy board" as a command before enforcing strict layout.

### Problem 3: Note Types Can Become Redundant

The reference removed schedule notes because users could already use paragraph notes for schedules.

Pinpad risk:

- Tags, sections, note types, and stickers can all become different ways to classify the same note.

Mitigation:

- Decide one primary organization model first.
- Recommended path: start with visual marks/stickers, then add text tags only if search needs them.
- Avoid separate note types until there is a clear repeated use case.

### Problem 4: More Notes Need Better Differentiation

The reference initially limited one note of each type, then users asked for more. This created a differentiation problem.

Pinpad risk:

- As users add more notes, color alone will not be enough.

Mitigation:

- Add optional note labels or tiny stickers.
- Keep colors as mood/status, not the only organization signal.
- Make search stronger before adding complex filters.

### Problem 5: Feature Requests Can Pull the Product Away From Its Core

Users asked the reference creator for timers, downloadable app, and accounts. They intentionally focused on the web experience first.

Pinpad risk:

- Sync, login, timer, dashboard, and multi-board features can pull the app away from being a quick personal board.

Mitigation:

- Keep the core philosophy visible in `CONTEXT.md`.
- Use a decision note before adding backend or account features.
- Only add features that reduce friction in capturing, keeping, and finding notes.

## Recommended Next Plan for Pinpad

### Phase 1: Stabilize v2 Preview

Purpose: make sure the new personal board is pleasant and safe before expanding.

Build:

- Keep `/v2/` isolated from root v1.
- Review desktop and mobile visuals.
- Confirm board title persistence feels right.
- Confirm mobile note detail flow is easier than inline editing.
- Add real dog assets when available.

Acceptance criteria:

- v1 root still works.
- v2 loads at `/v2/` after merge.
- Board title persists after refresh.
- Mobile tap opens detail reliably.
- Character corner does not block notes.

### Phase 2: Add Character Moods Carefully

Purpose: make the dog characters feel alive without turning them into a distraction.

Build:

- Add simple character state: `calm`, `focus`, `sleepy`, `yay`, `break`.
- Let the user toggle or randomly rotate mood.
- Keep animation subtle.
- Keep message bubble short.

Acceptance criteria:

- Character mood persists locally.
- No mood animation blocks note interactions.
- User can ignore the character and still use the board normally.

### Phase 3: Add Functional Stickers

Purpose: solve note differentiation before creating a large sticker pack.

Build:

- Add a tiny note-corner marker.
- Start with 4 to 6 categories such as idea, work, saved text, reminder, personal, later.
- Let the marker appear on the board and in the mobile detail modal.
- Store marker in note data.

Acceptance criteria:

- A note can have zero or one marker.
- Marker persists after refresh.
- Search or filter can optionally match marker name later.
- Stickers do not cover note text.

### Phase 4: Improve Board Organization

Purpose: reduce messy boards without removing the tactile feel.

Build options:

- Soft grid snap while dragging.
- "Tidy board" command to arrange notes.
- Optional section bands only if notes become hard to scan.

Recommended first experiment:

- Add a non-destructive "Tidy" button in v2 that aligns notes to a soft grid.
- Keep manual drag available.

Acceptance criteria:

- Notes do not overlap after tidy.
- Existing note content and colors remain unchanged.
- Mobile still opens detail on tap.

### Phase 5: Decide Tags vs Stickers vs Sections

Purpose: avoid building three organization systems that compete with each other.

Decision rule:

- If the user mainly wants visual scanning: choose stickers/markers.
- If the user mainly wants search and retrieval: choose tags.
- If the user mainly wants workflow lanes: choose sections.

Recommendation:

- Try stickers/markers first.
- Add tags only after markers feel insufficient.
- Delay sections because sections change the whole board layout.

## Suggested Issue Breakdown

### Issue A: Merge v2 Preview Without Promoting Root

- Merge `feature/v2-personal-pinpad` into `main`.
- Confirm `/pinpad/` still shows v1.
- Confirm `/pinpad/v2/` loads v2.

### Issue B: Add Real Dog Character Assets

- Add `v2/assets/characters/dog-1.png`.
- Add `v2/assets/characters/dog-2.png`.
- Replace CSS placeholder dogs with real image slots.
- Keep fallback placeholder if images fail.

### Issue C: Add Character Mood System

- Add mood state to settings.
- Add small mood switcher or click cycle.
- Add mood-specific animation/message.

### Issue D: Add Functional Note Markers

- Add marker field to note schema.
- Add marker picker in note toolbar and mobile modal.
- Render marker on note corner.

### Issue E: Prototype Tidy Board

- Add soft grid calculation.
- Add "Tidy" command.
- Preserve current manual drag behavior.
- Test with many notes on desktop and mobile.

## Keep Out for Now

Do not build these yet unless a real pain point appears:

- Login.
- Backend sync.
- Timer.
- Public sharing.
- Full sticker marketplace.
- Complex calendar/schedule note type.
- Full markdown editor.
- Multi-board workspace.

## Recommended Immediate Next Action

The next best action is to review the current v2 branch visually, then merge it only as a `/v2/` preview. After that, add the real dog assets and test whether the character corner feels delightful or distracting.

After the dog assets are in place, the strongest next product experiment is functional stickers/markers, because the reference shows they can be both cute and useful.
