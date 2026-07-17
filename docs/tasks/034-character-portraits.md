---
id: 034
title: Character Portraits
priority: 4
created: 2026-07-03
points: 8
tags: [character]
---
---
Character portraits are important to have, but something that can wait for a while. We need to finally actually use Electron for something, sending an IPC command to open a file dialog and copy the selected file into the user data directory. If we're copying the portrait, we might as well have an application wide portrait library so that portraits can be reused. We should also include some default portraits in the application assets. When uploading a new portrait (or from the portrait library) we should be able to zoom and crop the selected portrait into the correct aspect ratio. This would be a simple set size and position within a correctly sized frame, rather than an actual crop or file resize. We could also allow portraits to be labeled, deleted, and such from the library as well.

---
**Notes (Claude):** The first real Electron feature — recommend splitting into: (a) IPC file dialog + copy the selected image into the user-data dir + wire a portrait onto the character; (b) an app-wide portrait library (reuse, default portraits shipped in assets, label/delete); (c) a zoom/crop-to-frame UI that stores position + scale (not an actual resize). Each is a chunk, and (a) — the first IPC round-trip — unlocks the rest. Only task in the backlog that leaves the DOM-decoupled architecture and touches the Electron main process.