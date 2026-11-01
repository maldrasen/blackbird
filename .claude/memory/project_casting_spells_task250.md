---
name: project_casting_spells_task250
description: "Task 250 casting spells shipped 2026-11-01 — SpellPanel is a command-panel mode, mana paid at cast start (characters only), power level raise formula, ally targeting, battle healing gap fixed, deferred items"
metadata:
  node_type: memory
  type: project
  originSessionId: 7a51bdb7-d187-4e23-9ff0-ecc15eccd914
  modified: 2026-11-01T21:54:48.992Z
---

Task 250 (branch `250-casting-spells`, implemented 2026-11-01 in nine reviewed units) made Cast Spell a character battle command.

Non-obvious decisions:
- The spell selection UI is `SpellPanel`, a `spell-mode` class on `#battleView` inside `#commandPanel` (like `target-mode`), not a separate overlay. Cast hands `{ spell, powerLevel }` to `TargetingController.startTargeting(command, data)` or `command.execute(data)`. No key bindings inside the panel (deferred); `KeyC` opens it.
- Mana is spent in `Ability.CastSpell.execute()` only when `round.isActingCharacter()`. Monsters DO have mana components (from species grades) but cast for free by design.
- `BattleSystem.startCharacterRound()` releases a pending character spell before offering commands.
- Power level raise lives in `SpellbookSystem.improvePowerLevel(id, code, guaranteed)`: only after a successful release, crit guarantees +1, else `Random.between(1,100) <= (8 - level) * 2`, cap 8. Recorded via `BattleState.spellImproved` → enlighten `.spell-improvements` panel with `TagElements.buildSpellTag`.
- `EffectTarget.ally` + `TargetingMode.anyAlly` added for Mending; allies = `state.getActiveCharacters()` (hidden allowed).
- Discovered: `EffectSystem.applyToAffected` silently ignored restore-health/restore-mana in battle (Mending never healed). Now a switch that throws on unknown effect types.
- Spec gotcha: a character releasing a spell they don't have in their spellbook throws (`doesn't know the X spell`); specs must `SpellbookComponent.setSpell` first, and the raise consumes one extra `Random.between` value after the skill check's two.

**Why:** the user chose in-panel UI, success-only raises, ally targeting in scope, and enlighten-screen reporting during planning.
**How to apply:** task 251 (learning spells) builds on `SpellbookComponent.setSpell`; stub spells (shriek, caustic-burst, uncanny-awareness) have no manaCost and would read castable at any level if ever learned. See [[project_ability_refactor_task221]] for the ability model.
