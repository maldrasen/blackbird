---
name: project-code-analysis-2026-07
description: Full bug-hunt analysis saved to docs/0. Code Analysis - 2026-07-01.md; key root causes found
metadata: 
  node_type: memory
  type: project
  originSessionId: 54a68003-155f-4f4e-8d4c-e3dd7c58abf9
---

On 2026-07-01 I did a full code review of blackbird, saved as `docs/0. Code Analysis - 2026-07-01.md` (~40 findings, severity-grouped, with file:line refs).

Root causes of the two known todo bugs:
- "fuck anus / masturbate anus don't interfere": `sex-action.js` getUses() line 84 pushes `partner.ass` target into `uses.player` instead of `uses.partner`.
- "breast shape kebab case": `StringHelper.titlecaseAll` doesn't split on hyphens.

Other top crashes found: PersistedAction lacks `usesSlot` (training-system.js:232), double-remove in checkPersistedActions, applyFactorScale [0.5,2] guard vs preference sensations.factor 1.5, FeelingsComponent never created outside test fixtures (real training would crash consent calc), `preferences.code = 100` cap typo in sexual-preferences-factory.

**Why:** if these areas come up in future sessions, check the analysis doc before re-deriving; fixes may or may not have landed since.

**How to apply:** read `docs/0. Code Analysis - 2026-07-01.md` when the user asks to fix bugs from the analysis; verify each finding still exists before fixing. See [[bent-corridor-bugs]] for earlier dungeon fixes.
