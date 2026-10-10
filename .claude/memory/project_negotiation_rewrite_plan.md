---
name: negotiation-rewrite-plan
description: "Negotiation rewrite (tasks 144-149) SHIPPED 2026-07-30; remaining work is content/follow-on tasks (105, 107, 134); key spec-boot gotchas recorded"
metadata: 
  node_type: memory
  type: project
  originSessionId: 35417de2-d58f-4924-ae87-2e47190ac109
  modified: 2026-07-30T22:10:39.417Z
---

The negotiation rewrite (task 144, split into 145-149) is fully shipped as of 2026-07-30 — all five tasks are in
docs/tasks/completed. Final shape:

- Unified resolution data `{type}` — join/attack/ability/run/stalemate — stored once in NegotiationState;
  `getResolution()` returns `{type:'unresolved'}` sentinel; `hasResolution()` (the 145 `isResolved` alias was
  renamed, not kept). First resolution set wins, so forced reactions beat feelings thresholds.
- Two-click ending: answer renders reply + records resolution, next click shows resolution text, next executes.
  Implemented as a `resolutionShown` boolean ON NegotiationState (markResolutionShown/hasShownResolution), NOT the
  planned module-level stage var in the system — user preferred state-owned flag (resets for free per negotiation).
- NegotiationSystem: advance() is 4 early returns (shown → execute; hasResolution → show; MAX_INTERACTIONS=5 →
  forceResolution; else renderQuestion). executeResolution dispatches to resolveJoin/resolveAbility/resolveRun;
  attack = resolveAbility('basic-attack'); stalemate = finishNegotiation only. All view calls go through
  NegotiationInterface (Tests.running()-guarded shim mirroring BattleInterface).
- finishNegotiation ordering (fixes updateTime crash): close → addTime(NEGOTIATION_TIME=1200) →
  BattleSystem.finishRound() while player still first in turn order → scheduleMonsterResponse (0 active →
  battleState.battleWon() interrupt; monster inactive → nothing; else moveToTopOfTurnOrder(monster, 500)) →
  advanceBattle().
- resolveJoin recruits AFTER finishNegotiation so MonsterComponent survives the victory path; negotiated control
  passes through RecruitmentSystem.recruit into ControlledComponent (149).
- BattleState.removeFromBattle(id) = removeFromTurnOrder + removeFromFormation; BattleSystem exports finishRound.

Spec gotchas (test/negotiations/negotiation-system-spec.js): boot must moveToTopOfTurnOrder the player before
specRound or finishRound's updateTime acting check throws; Random.stubRoll(fear,respect) before
NegotiationSystem.start(), stubReset after or the queue starves pickQuestion. After join/run the battle state is
null and fled entities are deleted by cleanup — assert on components/roster/game mode, not battle condition.
Monster-action specs (acting===monster, messages>0) soak-tested 30x clean.

Out of scope, kept as TODOs: requests (105), resolution text from monsters/archetypes (107), conversation skill
(134), monster-initiated negotiation, answer-level requirements, run-as-ability, follow-on-question reactions.
Related: [[recruitment-negotiation-system]], [[stepwise-collaborative-implementation]].
