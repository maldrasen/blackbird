---
id: 034
title: Character Portraits
priority: 4
created: 2026-07-03
tags: [character]
---
---
Character portraits are important to have, but something that can wait for a while. We need to finally actually use Electron for something, sending an IPC command to open a file dialog and copy the selected file into the user data directory. If we're copying the portrait, we might as well have an application wide portrait library so that portraits can be reused. We should also include some default portraits in the application assets. When uploading a new portrait (or from the portrait library) we should be able to zoom and crop the selected portrait into the correct aspect ratio. This would be a simple set size and position within a correctly sized frame, rather than an actual crop or file resize. We could also allow portraits to be labeled, deleted, and such from the library as well.