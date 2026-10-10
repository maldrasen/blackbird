---
name: task166-scrollbar-migration
description: Task 166 native-scrollbar migration — global ::-webkit-scrollbar + ScrollKeys; training-view flex follow-up done 2026-08-07
metadata: 
  node_type: memory
  type: project
  originSessionId: 7e1ff1e3-a982-4503-a99b-2f804337ecda
  modified: 2026-08-08T00:14:12.983Z
---

Task 166 (branch `166-remove-scrolling-element`) replaced the hand-rolled ScrollingPanel with native `overflow-y:auto` panels. Global scrollbar look lives in `styles/elements/scrollbar.scss` (reuses `$*-scrolling-panel-*` variables, which must stay — slider.scss shares them). PageUp/PageDown/Home/End on the hovered panel handled by `application/views/interactions/scroll-keys.js` (`ScrollKeys`), wired in views.js.

**Follow-up done 2026-08-07:** the training view's JS height hack (`calculatePersistedHeight()` + resize listener + `build()`) is deleted. `#trainingView` is a full-screen absolute flex column (via `.root-element`), so `#persistedRow` now has `flex-grow:1; min-height:0; display:flex; flex-direction:column`, mirrored on `.persisted-actions-panel`, with `#persistedActionScroll` as `flex-grow:1; min-height:0; overflow-y:auto` — the classic min-height:0 chain the old comment said "couldn't be made to work". The panel now always fills remaining vertical space and scrolls natively. Dead `#outputRow` rule (flex-grow:1, no matching HTML) still lingers in training-view.scss.
