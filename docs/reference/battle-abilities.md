# Battle Abilities
An ability is anything a combatant does with their action in battle: a weapon attack, a bite, a spell, a thrown grenade, hiding, or passing. Abilities are models rather than records, because most of them carry state chosen when they're built (the spell and its power level, the article, a monster's damage range) and the old code kept that state in a separate entry keyed by code. Everything lives under `application/battle-abilities`.

### The Ability model
`Ability(name)` builds a bare model with a unique id and defaults: always possible, no targeting mode, accuracy and damage bonuses of 1, no cooldown, priority 50, no essence, and empty details. A factory fills it in through setters and the model is treated as immutable from then on. The accessors that matter to the rest of the battle:
- `isPossible()` - whether the acting entity can use it right now, read from the round. A factory sets the closure.
- `getTargetingMode()` - `null` when nothing needs picking, otherwise a `TargetingMode` that tells the targeting controller which positions to offer. Attacks use `enemyInWeaponRange`, sneak attacks and single target spells use `anyEnemy`.
- `getAccuracyBonus()` and `getDamageBonus()` - factors the attack contest and damage roll multiply by. Either a fixed factor or a closure, so a bonus can depend on the target.
- `getCooldown()` and `getPriority()` - only monsters use these. The cooldown is applied when the ability runs, and the priority is how strongly a monster prefers it over its others.
- `getEssence()` - hand-set by a factory option, or left for the appraiser. `getDetails()` is a plain object a factory publishes for the appraiser and anything else that needs to know what was built: a cast spell carries `{ spell, powerLevel }` and a used article carries `{ article }`.

`execute()` sets the ability on the round, applies the monster's cooldown, and runs the factory's closure. It never ends the round: a monster's round is finished by `BattleSystem` after the `MonsterSystem` turn, and a character's by the command that built the ability.

### Factories
Every factory is a function on `Ability` in `application/battle-abilities/factories`, and every factory that a monster can hold takes an options object with `priority`, `cooldown`, and `essence`.
- `Ability.Pass()` is only possible while stunned or paralysed, and takes one unscaled second.
- `Ability.Defend()` clears the target, takes a second, and applies poised. It's also the monster system's fallback.
- `Ability.Hide()` needs the stealth skill, the back rank, and not being hidden. The first observer whose intelligence check beats the stealth roll spots the hider.
- `Ability.WeaponAttack()` strikes with the equipped weapons until a second is filled, alternating hands when both hold a weapon. A monster checks its reach against its chosen target; a character checks for any monster in reach, since they pick a target after choosing the command.
- `Ability.NaturalAttack(options)` is a single strike from a profile: `skill`, `textKey`, `damageType` or `damageTypes`, `reach`, `damage:[low,high]`, and `speed`, with optional `canTarget`, `hitLocation`, `onHit`, `getAttackText`, `getAccuracyBonus`, `getDamageBonus`, `effects`, and `messageForEntity`. The header comment in `natural-attack.js` documents every key. `Ability.Bite()`, `Ability.Punch()`, and `Ability.LeapClaw()` are presets that spread their options over a profile, and `Ability.VenomousBite()` adds a poison built from `poisonStrength` and `poisonDamage`. `Ability.DickPunch()` is a fully authored natural attack with a hand-set essence.
- `Ability.SpecialAttack(options)` is the natural attack's sibling for a single strike with the equipped weapon, taking the same hooks plus `targetingMode` and an `isPossible` check of its own. `Ability.SneakAttack()` chains into it: hidden only, any enemy, 1.5 accuracy and 2 damage, essence 25.
- `Ability.CastSpell({ spell, powerLevel })` spends the action starting the cast and stores the spell, power level, and target on the battle state. `BattleSpellSystem.castSpell()` releases it on the caster's next action.
- `Ability.UseArticle({ article })` applies a consumable around the round's target through the `EffectSystem` after a fixed 750ms. A monster's articles are conjured, not carried.

### Monster abilities
A base monster or monster type lists its abilities in a `buildAbilities` closure that returns an array of models. The closures run in `Application.init()`, after every data file has loaded, so a monster can build a cast spell or a use article without caring that spells and articles register after monsters. `MonsterType.compile()` and `BaseMonster.compile()` store the results, `BaseMonster.getAbilities()` returns the type's abilities followed by the monster's own, and every monster of that kind shares the same models. Defend is left out of the lists so it's never picked over a real ability, counted for essence, or given an initial cooldown.

`Monster(id).getAbilities()` reads the compiled list and `findAbility(name)` returns the highest priority ability with that name, which is how a negotiation forces an ability: a reaction's `ability` is a name (`'Attack'`, `'Dick Punch'`). `MonsterSystem.executeBattleTurn()` releases a pending spell if there is one, otherwise honours a forced ability against the player if it's possible, otherwise picks the highest priority ability that's possible against the highest threat target and isn't on cooldown, and otherwise defends.

Cooldowns live in `BattleState` keyed by monster entity and ability id. The round applies an ability's cooldown when a monster uses it, `BattleInitializer.rollInitialCooldowns()` starts every ability with a cooldown at a random point in it so monsters of one kind don't all open with the same attack, and a forced ability ignores its cooldown.

### Character commands
A character never touches an ability directly. `BattleCommand` records in `data/battle-commands` are what the command panel shows, keyed by `BattleCommandCode`. A command has a `name`, a `category` (`basic` or `utility`, which decides the panel area), and usually a `buildAbility(data)` that returns the ability to run, where `data` is whatever the command's overlay chose. A command is possible when the ability it would build is, unless it has an `isPossible` of its own, and `getTargetingMode(data)` says whether a target has to be picked first. Negotiate has an `overlay` instead of an ability. Change equipment and use item still run a placeholder body until their overlays exist, and cast spell waits on a spellbook.

`CharacterAbilitySystem.getCommands()` returns the codes a character can use this round, and a character who can pass must pass. The command panel opens a command's overlay, hands it to `TargetingController.startTargeting(command, data)` when it needs a target, or executes it at once. `BattleCommand.execute(data)` builds and runs the ability, then ends the character's round. Auto battle goes through the same commands: pass, then attack the closest monster in reach, then defend.

### Essence
Abilities aren't priced when they're built. `AbilityAppraiser.run()` is called from `Application.init()` after the monsters have compiled, and is meant to price every compiled ability that has no essence from what its factory published. Until it does, an unappraised ability reads `undefined` and counts as zero in a monster's ability factor. A factory's `essence` option is for abilities whose effects can't be priced from plain data, like the dick punch.

### Specs
The factory specs build abilities directly and run them in a spec round; the ones that assert end-of-round effects call `BattleSystem.finishCharacterRound()` themselves. A spec that registers its own monster sets `abilities` on the record inline rather than `buildAbilities`, because the compile pass ran before the specs did.
