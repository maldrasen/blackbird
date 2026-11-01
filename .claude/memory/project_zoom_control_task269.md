---
name: project_zoom_control_task269
description: "Task 269 dungeon zoom control (2026-10-31) — ZoomControl element in left panel, wheel handler kept untouched by choice and synced to the control via zoom(step) only"
metadata:
  node_type: memory
  type: project
  originSessionId: 1bcc1915-4cf9-4485-b998-8237afe8d5d7
  modified: 2026-10-31T23:20:40.029Z
---

Task 269 (branch `269-zoom-buttons`, 2026-10-31) added a `ZoomControl` view element (−/+ buttons around a tick track) in the dungeon controls' left panel, driving `DungeonViewport.zoomToLevel(index)`. The wheel handler was deliberately left untouched: the user runs LinearMouse on their Mac and does not want the wheel tuned to any particular setup. Only the wheel's relative `zoom(step)` calls `DungeonControls.refreshZoom()`; button clicks go through `zoomToLevel` directly and don't echo back.

**Why:** Mac wheel/trackpad deltas are unreliable for discrete zoom steps; buttons are the setup-independent fix. The wheel stays as a convenience, not something to keep tuning.

**How to apply:** Don't propose further wheel-delta tuning for the dungeon zoom. New discrete-level controls can reuse `ZoomControl({ levels, level, onChange })`; `setLevel()` never fires `onChange`, so external state can be pushed in without loops. Layout was not play-tested by Claude (see [[project_grid_movement_task215]] for the same caveat pattern).
