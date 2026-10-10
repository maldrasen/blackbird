---
name: position-text-conventions
description: Conventions for writing sex-position change text (task 008) in data/sex-positions
metadata: 
  node_type: memory
  type: project
  originSessionId: 63e01326-6753-46b9-b8b0-30ca62ebc692
---

Conventions for task 008 position-change text, established July 2026:

- Aim for ~4 options per attitude (loving, lustful, accepting, fearful, resistant, violent) per player key per move package; body-part variant lines count toward the 4.
- Entries must never start with a bare pronoun token like `{A:His}` — always lead with `{A:name's}`/`{A:name}` so the name renders; demote a later `{A:name}` in the same entry to `{A:he}` to avoid the name twice.
- Never write `hard {X:cock.bigCock}` (wrong adjective order after weaving) — use `{X:cock.bigHardCock}`; for nipples use `{X:breasts.hardThickNipples}` (both in application/looms).
- Move packages use DESTINATION-position keys: for `swap:true` moves the swap is already applied when the text weaves (confirmed by centipede.js kneeling-service comment and stub labels). Add a key-orientation comment above each move package.
- For moves into SYMMETRIC positions (standing), destination keys can't distinguish roles — use `WeaverRequirements.playerWas('A'/'B')`, which reads `context.previousPosition` (added to move contexts in position-controller.js). Tokens still assume the non-swapped edge.
- In symmetric positions (apart, standing) the player is ALWAYS key A (changePosition's player-first branch matches first), so their rearrange packages only need player-A entries — no playerB branch.
- Attitude/feelings belong only to the non-player partner; the player gets physical description only.
- Exclusion precedent: no player-B options where the player voluntarily bends over / lies face-down before a fearful, resistant, or violent partner (centipede, straddle). Forcing an unwilling partner ON TOP of the player is allowed (cowgirl, face-sitting).
- Fearful `{X:cock.sixInch} long {cock} trembles`, resistant "with a huff", accepting "without complaint/protest", violent "thrashes/struggles, but you ... anyway" are the recurring attitude motifs.
- Verify with `node bin/run-tests.js`; syntax-check with `node --check`.

STATUS: task 008 base text COMPLETE (July 2026) — all 18 position files, zero `[Shift/Rearrange to]` stubs, ~2500 entries. Remaining per the task file (docs/tasks/008-position-change-text.md): a tails pass (variants for tails pushed aside / in the way) and a lactation pass (depends on lactation flag/task). Enby pronouns switched from singular they to ze/zem/zir/zirs in pronoun-helper.js (user's decision) so all woven third-person-singular verbs conjugate correctly — never reintroduce "they" there, and write all future entries with singular verbs.
