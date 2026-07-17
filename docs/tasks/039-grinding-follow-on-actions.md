---
id: 039
title: Grinding Follow on Actions
priority: 5
created: 2026-07-03
points: 3
tags: [training]
---
---
Lap grinding should have a few 'lap dance' specific follow on actions, like a lap dance frottage that can only be done while grinding. The "availableWhen" property therefor needs to test for specific persisted actions and not just the slot connectivity.

---
**Notes (Claude):** Largely already unblocked — `availableWhen.persistedAction` is supported in `matchesPersistedAction()` (`sex-action.js`). So this is mostly content: author lap-dance-specific follow-ons (e.g. a lap-dance frottage) keyed off the grinding persisted action. Small. It's also the prerequisite pattern for [[029-dances]].
