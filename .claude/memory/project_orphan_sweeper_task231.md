---
name: orphan-sweeper-task231
description: "Task 231 SHIPPED 2026-09-21 — OrphanSweeper on save + setGameMode, loot inventory for enchanted drops, isRecruiting guard tied to recruit-after-finish ordering"
metadata: 
  node_type: memory
  type: project
  originSessionId: 5246a219-3607-4cca-b80a-aa1392218dfe
  modified: 2026-09-21T21:07:24.664Z
---

Task 231 (remove orphaned entities) shipped 2026-09-21.

- `OrphanSweeper.sweep()` (application/world) runs in `GameSystem.saveGame()` (above the HEADLESS return) and at the top of `GameSystem.setGameMode()`. Monster pass first (MonsterComponent entities not in the current BattleState, plus their carried items), then items not in any InventoryComponent. Warns with counts outside specs — a warning means a real leak.
- Anything that should survive a sweep just needs to sit in an inventory: depots, characters, and the loot inventory (`GameState.manifestLootInventory()`, lazily created, packed as `lootInventory`).
- `BattleState.cleanup(saveLoot=true)`: dead + knocked-out monsters drop enchanted items (`Item.hasEnchantment()`) into the loot inventory; every non-recruited monster and its remaining gear is deleted. Fled/active monsters drop nothing. A future run outcome should pass `false`.
- `EnlightenSystem.finishEnlightenment()` discards whatever is left in the loot inventory. The enlighten pick-up step for item loot doesn't exist yet (waits on enchanted monster gear generation).
- Gotcha: recruiting the LAST monster wins the battle inside `finishNegotiation()` → `battleWon()` → `reset()` → `setGameMode(enlighten)` sweeps while the recruit still has its MonsterComponent and no battle state. The sweeper skips it via `NegotiationSystem.isRecruiting(id)` (state monster + 'join' resolution). This relies on the negotiation state NOT being cleared in `finishNegotiation()` (only `GameSystem.reset()` clears it).

**Why:** the user rejected recruiting before `finishNegotiation()` — stripping the MonsterComponent mid-battle leaves the battle data invalid even if nothing reads it today. See [[project_negotiation_rewrite_plan]] for the recruit-after-finish ordering.

**How to apply:** prefer guards that keep battle data valid over reordering; new specs/flows that build loose items then change game mode will lose them to the sweep — put them in an inventory.
