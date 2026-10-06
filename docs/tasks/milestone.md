# October 2026 Milestone

Planned work for October, about 80 points, roughly half of the ~170 point pace of the last two releases. The rest of the month is left open for work discovered along the way, new ideas, and content.

The focus is the dungeon crawler half of the game. Training depends on what the party brings back from the dungeon, so the dungeon needs to be playable first. Each month should strengthen the weakest link in the gameplay loop:

**delve → recruit → train → delve**

This month that's mostly the dungeon side: learning spells and abilities, people to talk to, a usable inventory, and working bows. Safe rooms and the training enlighten view are the seams that connect the loop back to training.

## Items & Bows `27pt`
- [x] [246] Party inventory overlay `5pt` — [246-party-inventory-overlay.md](246-party-inventory-overlay.md)
- [x] [142] Item detail panel `8pt` — [142-item-detail-panel.md](142-item-detail-panel.md)
- [ ] [228] Effect based enchantments `3pt` — [228-effect-based-enchantments.md](228-effect-based-enchantments.md)
- [ ] [237] The character equipper should honor gender and sexual preferences `3pt` — [237-equipper-should-honor-gender.md](237-equipper-should-honor-gender.md)
- [ ] [014] Bows & arrows `5pt` — [014-bows-arrows.md](014-bows-arrows.md)
- [ ] [229] Implement ammunition `3pt` — [229-implment-ammunition.md](229-implment-ammunition.md)
- [ ] [230] Add draw weight for bows `3pt` — [230-add-draw-weight-for-bows.md](230-add-draw-weight-for-bows.md)

## Dungeon & Loop `13pt`
- [ ] [240] Safe rooms `3pt` — [240-safe-rooms.md](240-safe-rooms.md)
- [ ] [122] Training enlighten view `5pt` — [122-training-enlighten-view.md](122-training-enlighten-view.md)
- [ ] [197] Skill trainer episodes `5pt` — [197-skill-episodes.md](197-skill-episodes.md)

## Early Game Events `37pt`
- [ ] [250] Casting spells `8pt` — [250-casting-spells.md](250-casting-spells.md)
- [ ] [251] Learning spells `5pt` — [251-learning-spells.md](251-learning-spells.md) Depends on 250.
- [ ] [012] Character abilities `5pt` — [012-character-abilities.md](012-character-abilities.md)
- [ ] [252] Person record `5pt` — [252-person-record.md](252-person-record.md) Needed by 197's trainers and the 208 chain.
- [ ] [253] Conversation component `8pt` — [253-conversation-component.md](253-conversation-component.md) Depends on 173 and 252.
- [ ] [254] Return to episode after an encounter `3pt` — [254-return-to-episode-after-an-encounter.md](254-return-to-episode-after-an-encounter.md) Needed by the 208 episode chain and most person encounters.
- [ ] [173] Compile episode pages to a graph `3pt` — [173-compile-episodes-to-graph.md](173-compile-episodes-to-graph.md) Worth doing before writing a batch of new episodes.

## Deferred
- [130] Accept death in game over event — depends on the legacy vs. traditional decision in 104.
- [239] Dungeon light emitters — swapped out for 122. Could look nice, but it's an open investigation and lower priority.
