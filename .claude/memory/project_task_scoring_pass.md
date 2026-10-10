---
name: project_task_scoring_pass
description: All 50 docs/tasks were given agile points + Claude notes; split recs and post-battle overlap flagged
metadata: 
  node_type: memory
  type: project
  originSessionId: ac37c346-8c0c-408c-9165-415b079a6802
---

On 2026-07-17 all 50 files in `docs/tasks/` were scored (agile points [1,2,3,5,8,13,21] in front matter under `points:`) with a `**Notes (Claude):**` block appended after a `---` separator. `bin/compile-task-index.js` now emits `` `Npt` `` per line; re-run it after editing task front matter.

Recommended splits (flagged in the notes, not yet done — user splits them):
- **21s:** [112] room-graphics (extrusion/doors/floor-width/textures/fade), [104] lineage (container/accept-death/unlocks), [043] additional-actions (a backlog *bucket* — convert lines to tasks).
- **13s:** [009] descriptions (per body part), [025] sex-fluids (volume/per-orifice/impregnation), [028] orders (movement/clothing-UI/punish-reward), [030] drugs (arbitrary-action-consent/items/status), [045] enlighten (battle vs training), [047] species (cheap batch vs Caprien gender-rework).

Missing prerequisite tasks (referenced by other tasks but no task file builds them): a **marks system** (needed by 035, 037, 006), a **bondage system** (038, 044), and **home upgrades / prison** (116, 104). Worth their own task files.

See [[project_postbattle_overlap]] for the biggest planning contradiction surfaced during this pass.
