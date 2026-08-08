---
id: 166
title: Remove the Scrolling Panel Element
priority: 1
created: 2026-08-07
tags: []
points: 5
---
---
The ScrollingPanel element (`application/views/elements/scrolling-panel.js`) is ancient and fights every view that uses it. It reimplements scrolling by hand — thumb drag, track paging, wheel stepping, and a content offset driven by `top` — which means it can't know when its size or content changes.

The app is Electron-only, so Chromium's `::-webkit-scrollbar` pseudo-elements can fully style a native scrollbar: track and thumb colors, borders, shadows, hover state, width, and thumb `min-height`. A plain `overflow-y: auto` element with those rules looks the same as the hand-rolled panel but scrolls natively — wheel, thumb drag, track paging, and show-only-when-needed all come for free, and native scrolling never needs to be told it was resized. The JS element shrinks to a thin wrapper: add a class, expose a couple of scroll conveniences over `scrollTop`.

An audit of the consumers (console, battle-text, inventory-panel, general-overlay, casement, both training panels, party-overlay) shows the only externally used API is `resize()` and `setHeight()` — `scrollToTop/Bottom`, `stepUp/stepDown`, `isActive`, `getPageDistance`, and `setContentHeight` are all internal-only and can be dropped or kept as trivial one-liners over native scroll properties.

Given that everything this element does can be replaced with native styling, the plan is to completely remove the old element and style the native panels to look the same. 

## Open questions

- `MouseMonitor` may only exist to support the keyboard handler's hover detection — worth checking whether it can go too, or whether `document.querySelectorAll(':hover')` is enough.
