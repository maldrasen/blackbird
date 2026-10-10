---
name: conversation-skill-task134
description: Task 134 shipped — conversation skill contests + NegotiationInfluence moderation in negotiations
metadata: 
  node_type: memory
  type: project
  originSessionId: a8b5653e-cf68-4df5-98a9-4c26016bf592
  modified: 2026-08-03T20:32:02.552Z
---

Task 134 SHIPPED 2026-08-03. The conversation skill is wired into negotiations two ways:

- `NegotiationReaction.contest({ skill:'conversation', win, loss })` — third contest type beside random/attribute; opposed `SkillCheck(P).value >= SkillCheck(T).value`, ties to player.
- `NegotiationInfluence.moderateFeelings(feelings, context)` (application/negotiations/negotiation-influence.js) — every reaction carrying a `feelings` map gets moderated in `NegotiationSystem.answer()`: opposed conversation check, strength from margin clamped ±100 through two PiecewiseCurves (linear ±10→±0.1, win side exp 0.85, loss side exp 1.5 — asymmetric, player-favored). Helping feelings ×(1+s), hurting ×(1−s); ±100 margin doubles/zeroes.
- Join reactions default their feelings to the `love` map (user's change), overridable via `options.feelings` — so every join rolls the influence check on its way in.
- Skill improvements flow to enlightenment for free via `SkillCheck` → `BattleState.skillImproved` (characters only).

Spec gotchas: each SkillCheck consumes stubBetween(crit, value) plus a `Random.roll(150)` improve roll when level<100 (miss stub must be ≤149 — 150 trips stub bounds); level-100 contestants skip the improve roll. `Math.round` of a zeroed negative gives `-0` (chai deep-equal distinguishes) — guarded with `|| 0` in moderate(). Monsters and player all have conversation 0 (tuning deferred by user choice).

Related: [[negotiation-rewrite-plan]], [[recruitment-negotiation-system]].
