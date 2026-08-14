---
id: 140
title: Modding support
priority: 4
created: 2026-07-25
tags: []
points: 3
---
---
I do like a game that has modding support. I was thinking about how to make this possible this morning. It should actually be fairly easy. First, I can add a mods directory to the user's data directory. Mods can be placed into that directory, either as zip files or as folders. (I think Node can read files within a zip?) Each mod should have a manifest.json file. The maifest should have a file list, but some mod data as well, the name of the mod at the very least. We use the loader to load each mod file, in the same way that the app does. We'll also want to have documentation for the modding support somewhere.