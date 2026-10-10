---
name: project-death-mechanics-task114
description: "Task 114 KO/death model — BattleCondition map replaced dead/fled piles; KO at 0 HP, dead below -vitality, revive via enlighten"
metadata: 
  node_type: memory
  type: project
  originSessionId: 37c6a889-0c08-4e7c-ab0d-a5a61ce43449
  modified: 2026-07-21T17:25:31.640Z
---

Task 114 (implemented 2026-07-21 on branch `114-rework-death-mechanics`): characters at ≤0 HP are knocked out; killed only when currentHealth < -vitality (monsters still die at 0, clamped). Health component allows negative currentHealth (ceiling clamp only); BarDisplay clamps display to minValue.

Key model: BattleState `combatantConditions` map (id → BattleCondition enum: active/dead/knocked-out/fled) replaced deadPile/fledPile/conditions — mutually exclusive by construction. `monsterIds` roster survives formation removal so getDeadMonsters/getFledMonsters work after death. KO never touches PartyConfiguration (revive position is automatic); `FormationManager.moveForwardOnKnockOut` is transient-only. Game over = player killed OR party formation empty. `BattleDeathSystem.reviveKnockedOut()` (called from showVictory) revives at 1 HP; revived ids flow through `startEnlightenment({ revived })` → `EnlightenState.getRevived()` → `.revived-summary` in enlighten view. KO'd characters get full essence/level-up rewards.

Related: [[project-postbattle-overlap]] — 114's slice of the victory pipeline is now defined.
