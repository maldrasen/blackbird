// A special attack resolves a single strike with the acting entity's equipped primary weapon, so an entity with
// empty hands can't make one. It takes the same hooks as a natural attack, with the weapon standing in for the
// attack profile:
//
//   Ability.SpecialAttack({
//     name: 'Sneak Attack',
//     targetingMode: TargetingMode.anyEnemy,   // defaults to enemyInWeaponRange
//     essence: 25,
//   });
//
// Optional keys:
//     essence           A hand-set essence value. A special attack strikes with the equipped weapon, which essence
//                       doesn't price, so it's worth nothing unless one is given.
//     cooldown          Milliseconds before the attacker can use the ability again.
//     priority          How strongly a monster prefers this ability over its others.
//     isPossible        An extra possibility check on top of holding a weapon and having a target in range.
//     hitLocation       Forces the strike to a location instead of rolling one.
//     onHit             Called with (acting, target) before the hit is processed.
//     getAttackText     Called with (weapon, context) in place of the weapon's own attack text.
//     getAccuracyBonus  Passed through to the ability.
//     getDamageBonus    Passed through to the ability.
//     effects           The status effects the attack applies when it hits. Each one rolls its own resistance.
//     messageForEntity  Called with (target, results) after the effects are applied, where results maps each effect
//                       code to whether it landed. Returns the message to add, or null for none.
Ability.SpecialAttack = function(options) {
  Validate.isString('SpecialAttack.name', options.name);

  const ability = Ability(options.name);

  ability.setTargetingMode(options.targetingMode || TargetingMode.enemyInWeaponRange);
  ability.setPossibleFunction(() => isPossible(ability, options));
  ability.setExecuteFunction(() => execute(ability, options));

  if (options.cooldown != null) { ability.setCooldown(options.cooldown); }
  if (options.essence != null) { ability.setEssence(options.essence); }
  if (options.priority != null) { ability.setPriority(options.priority); }
  if (options.getAccuracyBonus) { ability.setAccuracyBonusFunction(options.getAccuracyBonus); }
  if (options.getDamageBonus) { ability.setDamageBonusFunction(options.getDamageBonus); }

  return ability;
}

function isPossible(ability, options) {
  const weapon = BattleSystem.getRound().getPrimaryWeapon();

  if (weapon == null) { return false; }
  if (options.isPossible && options.isPossible() === false) { return false; }

  return isInRange(ability, weapon);
}

// Any-enemy targeting reaches every position. Otherwise, a monster's reach is checked against its chosen target, and
// a character's against any monster their weapon can reach, since they pick a target after choosing the command.
function isInRange(ability, weapon) {
  const round = BattleSystem.getRound();

  if (ability.getTargetingMode() === TargetingMode.anyEnemy) { return true; }
  if (round.isActingCharacter()) { return TargetingController.getMonstersInRange().length > 0; }

  return BattleHelper.isAttackWithinRange(weapon.getBaseWeapon().getReach(), round.getActingPosition(), round.getTargetPosition());
}

function execute(ability, options) {
  const round = BattleSystem.getRound();
  const weapon = round.getPrimaryWeapon();

  const contest = PhysicalAttackContest(round.getActing(), round.getTarget());
        contest.setWeapon(weapon.getId());
        contest.setAbility(ability);
        contest.setHitLocation(options.hitLocation || null);
        contest.roll();

  const attackRoll = contest.getAttackRoll();
  const defendRoll = contest.getDefendRoll();
  const context = contest.getContext();

  round.addMessage({ text:getAttackText(options, weapon, attackRoll, context) }, Weaver(context));
  round.addTime(weapon.getBaseWeapon().getSpeed());

  if (contest.isHit() === false) { return PhysicalAttackSystem.processMiss(attackRoll, defendRoll); }

  if (options.onHit) { options.onHit(context.A, context.T); }
  applyEffects(options, context.T);
  PhysicalAttackSystem.processHit(attackRoll, defendRoll);
}

function applyEffects(options, target) {
  const effects = options.effects || [];
  if (effects.length === 0) { return; }

  const results = {};
  effects.forEach(effect => { results[effect.code] = EffectSystem.applyStatus(target, effect); });

  const message = options.messageForEntity ? options.messageForEntity(target, results) : null;
  if (message) { BattleSystem.getRound().addMessage({ text:message }); }
}

function getAttackText(options, weapon, attackRoll, context) {
  return options.getAttackText ?
    options.getAttackText(weapon, context):
    Dialog.lookupTemplate(DialogCategory.attackText, attackRoll.getTextKey(), context);
}
