# Milestone 0.1.8 — Battle Completeness
Everything finished by September 1st ships as 0.1.8. This file names the theme that release should be able to claim: **battle is mechanically complete and measurable**. The version number is a timestamp; this milestone is the goal. Anything unfinished on September 1st rolls into 0.1.9 without ceremony.

## Theme
The last six tasks written (186–191) are all battle and character math — the momentum is already pointed here. The cut closes the battle loop end to end: status effects actually tick, ability damage and essence are tunable, the essence economy accounts for health factors, encounters are built intelligently instead of hand-picked, and the testbed exists to measure whether any of it is balanced.

## Committed (~56pt against a ~60pt planning budget)
Planning budget assumes the observed throughput of roughly 35–45pt/week over two weeks, planned under capacity on purpose.

- [186] Put status effects in the turn order `8pt` — the P1, already has a full implementation plan in the task file
- [189] Attribute must be read from wrapper `5pt` — the other P1; makes status-effect buffs/debuffs sane before 186 needs them
- [190] Adjustable damage and essence of abilities `3pt`
- [187] Beasts need a different map of hit locations `3pt`
- [188] Separate CharacterMath `2pt`
- [127] Add a Health factor to the EssenceSystem `2pt`
- [162] Battle enlightenment variation for no essence `2pt`
- [155] Encounter Builder `8pt` — also what the testbed uses to build its fights
- [191] Create a battle testbed `13pt` — **first slice only, timeboxed**: build a party, build an encounter via 155, run one full automated battle headlessly, produce a report. The thousand-battle balance harness is a later milestone.

Suggested order: 189 → 186 → 190/187/188/127/162 in any order → 155 → 191. The small wiring tasks are good palate cleansers between the big three.

## Stretch (only if the committed list is done)

- [172] Nightgaunt Episode `8pt`
- [105] Add Negotiation Requests `8pt` + [158] Question pool fixture `3pt` — 158 explicitly waits on 105

Pick one thread, not both.

## Explicitly out of 0.1.8

- The entire P3 training cluster (019–044) — a different thread; splitting focus is how two-week windows evaporate
- All flagged scope expansions: 025 Sex Fluids, 026 Sanity, 028 Orders, 029 Dances, 030 Drugs, 033 Fantasies, 034 Portraits, 104 Lineage, 140 Modding, 154 Website
- Content streams (009 Descriptions, 151 More Questions) — pick up freely as breaks, but they don't count toward the milestone

## Carried concerns for 0.1.9+

- [104] Lineage and Meta-Progression should get a design pass soon — it replaces the character as the save-file root, and every release that versions saves without it makes the eventual migration worse. Candidate theme for 0.1.9 or 0.1.10.
- Save versioning should be decoupled from the calendar version: a separate save-format integer that bumps only when the save shape breaks, not every month.
