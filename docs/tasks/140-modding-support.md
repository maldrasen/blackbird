---
id: 140
title: Modding support
priority: 4
created: 2026-07-25
tags: []
points: 3
---
---
I do like a game that has modding support. I was thinking about how to make this possible this morning. It should actually be fairly easy. First, I can add a mods directory to the user's data directory. Mods can be placed into that directory, either as zip files or as folders. (I think Node can read files within a zip?) Each mod should have a manifest.json file. The maifest should have a file list, but some mod data as well, the name of the mod at the very least. We use the loader to load each mod file, in the same way that the app does. One change that we'd need to make in the app is to get rid of all the `Object.freeze()` calls, allowing any mod to overwrite a function in a module. They could do that anyway with `global.Module = { ...Module }` so it's not like it's actually providing security. And given that this is a single player game security isn't important, at least not in the "oh no don't cheat at the game" meaning of the word. If a user installs a mod I have no control over what's in the mod, so it's kind of a "do this at your own risk" kind of feature. Having access to the development tools lets them do anything they want to anyway.