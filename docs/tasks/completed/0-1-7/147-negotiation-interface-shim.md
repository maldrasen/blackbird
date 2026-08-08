---
id: 147
title: Negotiation Interface Shim
priority: 1
created: 2026-07-30
tags:
  - battle
  - negotiation
points: 1
---
---
`NegotiationSystem` calls `NegotiationOverlay` directly, but headless tests never load `application/views/**`, so
system-level negotiation specs would hit a ReferenceError. Mirror the existing `BattleInterface` pattern
(`application/battle/battle-interface.js`). Split from task 144; independent, but a prerequisite for task 148's specs.

### Changes
- New file `application/negotiations/negotiation-interface.js` exposing `open`, `close`, `renderQuestion`,
  `renderDialog`, `renderResolution` — each guarded with `if (Tests.running()) { return; }` and delegating to
  `NegotiationOverlay`. Regenerate the manifest (`bash bin/compile-manifest.sh`).
- `NegotiationSystem` calls only `NegotiationInterface`, never the overlay.
- Overlay cleanup in `application/views/negotiation/negotiation-overlay.js`: delete the stale `renderRequest` (it
  targets `#answers`, an element that no longer exists — the real container is `#negotiationFrame .options`). Leave a
  `// TODO: Requests return in task 105.` note.
