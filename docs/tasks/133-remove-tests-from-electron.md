---
id: 133
title: Remove tests from Electron
priority: 3
created: 2026-07-23
tags: []
points: 3
---
---
Having the tests run when Electron starts seemed like a good idea at first, but not really the right thing to do I think. Instead, we can change the start script to run the specs headlessly every time the app starts for the same effect. Running the specs still only takes 600ms or so, so not a big overhead cost at all, and we get to clean things up in the app.