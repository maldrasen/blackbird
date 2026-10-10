---
name: project_postbattle_overlap
description: Post-battle progression is described by both Victory Mode (017) and Enlighten View (045); code routes victory->enlighten
metadata: 
  node_type: memory
  type: project
  originSessionId: ac37c346-8c0c-408c-9165-415b079a6802
---

Task [017] "Battle Victory Mode" (created 07-03) and task [045] "Enlighten View" (created 07-04) both claim ownership of post-battle loot, XP, level-ups, and quirk unlocks — the same work described twice.

The code already picks a direction: `battle-interface.js` `showVictory()` calls `EnlightenSystem.startEnlightenment('battle', {...})`, and `EnlightenState` carries skillImprovements/anima/animus/anger. So victory→enlighten is wired; progression appears to have moved into the enlighten system, leaving 017's "victory mode owns loot/XP/levels" description stale. Likely resolution: narrow 017 to the game-over reset + victory transition and let 045 own progression, or merge them.

Related tangle: four post-battle flows overlap with no defined nesting — victory (017), enlighten (045), the after-battle knocked-out episode ([114]), and capture ([116]). 114/116 are internally consistent (116 defers to 114) but the sequence (battle end → KO episode → victory/enlighten) isn't defined anywhere. Decide the pipeline before building any of them.

Also: `EnlightenSystem`/`EnlightenState` are still stubs (system just console.logs). See [[project_task_scoring_pass]].
