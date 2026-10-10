---
name: roster-and-name-pool
description: "Roster capped ~50 by bedrooms, so small name pool is fine; archetype report covers all species since kobold/vermen archetype removal"
metadata: 
  node_type: memory
  type: project
  originSessionId: 20e14cf8-c803-45ab-bdf6-2756cd7751de
  modified: 2026-07-28T15:41:31.991Z
---

Recruited characters join the house roster, which will be capped by the number of bedrooms — around 50 at most (stated 2026-07-24). Names only matter for recruited characters, so the ~627-name feminine pool exhausting under bulk builds is a report-only artifact, not a game bug to fix. bin/reports/archetype-report.js handles it by clearing the registry and retrying. It used to exclude kobold and vermen because their archetypes were gender-fixed, but those species archetypes were removed 2026-07-28 (see [[archetype-priority-model]]) and the report now covers every species. See [[headless-test-runner]] for the headless bootstrap.
