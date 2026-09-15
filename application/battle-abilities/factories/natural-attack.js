// Every natural attack shares a skeleton: the attacker can't be hidden (a hidden monster strikes with a sneak attack
// instead) and the target has to be in reach. The attack then runs a physical attack contest, describes itself, adds
// its time, and resolves the hit or miss. The options carry what makes each attack different:
//
//   Ability.NaturalAttack({
//     name: 'Bite',
//     skill: 'daggers',
//     textKey: 'bite',
//     damageType: DamageType.pierce,        // or damageTypes:[{ type, percent }, ...]
//     reach: WeaponReach.short,             // defaults to short
//     damage: [10,20],
//     speed: 1000,
//   });
//
// Optional keys:
//     essence           A hand-set essence value in place of the appraised one, for an attack whose effects can't
//                       be expressed as plain data.
//     cooldown          Milliseconds before the attacker can use the ability again.
//     priority          How strongly a monster prefers this ability over its others.
//     canTarget         An extra possibility check on the target.
//     hitLocation       Forces the strike to a location instead of rolling one.
//     onHit             Called with (acting, target) before the hit is processed.
//     getAttackText     Called with the weaver context in place of the attack text template lookup.
//     getAccuracyBonus  Passed through to the ability.
//     getDamageBonus    Passed through to the ability.
//     effects           The status effects the attack applies when it hits. Each one rolls its own resistance.
//     messageForEntity  Called with (target, results) after the effects are applied, where results maps each effect
//                       code to whether it landed. Returns the message to add, or null for none.
Ability.NaturalAttack = function(options) {
  validate(options);

  const ability = Ability(options.name);

  ability.setTargetingMode(TargetingMode.enemyInWeaponRange);
  ability.setPossibleFunction(() => isPossible(options));
  ability.setExecuteFunction(() => execute(ability, options));
  ability.setAppraiseFunction(() => { ability.setEssence(AbilityAppraiser.attackEssence(options)); });

  if (options.cooldown != null) { ability.setCooldown(options.cooldown); }
  if (options.essence != null) { ability.setEssence(options.essence); }
  if (options.priority != null) { ability.setPriority(options.priority); }
  if (options.getAccuracyBonus) { ability.setAccuracyBonusFunction(options.getAccuracyBonus); }
  if (options.getDamageBonus) { ability.setDamageBonusFunction(options.getDamageBonus); }

  return ability;
}

function validate(options) {
  Validate.isString('NaturalAttack.name', options.name);
  Validate.isString('NaturalAttack.skill', options.skill);
  Validate.isString('NaturalAttack.textKey', options.textKey);
  Validate.isArray('NaturalAttack.damage', options.damage);
  Validate.isNumber('NaturalAttack.speed', options.speed);
}

function buildProfile(options) {
  const [low, high] = options.damage;

  return {
    skill: options.skill,
    textKey: options.textKey,
    damageType: options.damageType,
    damageTypes: options.damageTypes,
    reach: options.reach || WeaponReach.short,
    low,
    high,
    speed: options.speed,
  };
}

// An attack aimed at a specific hit location needs a target whose body plan has that location.
function isPossible(options) {
  const round = BattleSystem.getRound();
  const target = round.getTarget();

  if (StatusEffects(round.getActing()).hasHidden()) { return false; }
  if (options.canTarget && options.canTarget(target) === false) { return false; }
  if (options.hitLocation && BattleHelper.hasHitLocation(target, options.hitLocation) === false) { return false; }

  return BattleHelper.isAttackWithinRange(buildProfile(options).reach, round.getActingPosition(), round.getTargetPosition());
}

// TODO: Characters with natural attack abilities will need to enter targeting mode in the same way that the weapon
//       attack has different execution paths for characters and monsters.

function execute(ability, options) {
  const round = BattleSystem.getRound();
  const acting = round.getActing();
  const target = round.getTarget();
  const profile = buildProfile(options);

  const contest = PhysicalAttackContest(acting, target);
        contest.setNaturalAttack(profile);
        contest.setAbility(ability);
        contest.setHitLocation(options.hitLocation || null);
        contest.roll();

  const attackRoll = contest.getAttackRoll();
  const defendRoll = contest.getDefendRoll();
  const context = { A:acting, T:target, hitLocation:attackRoll.getHitLocation() };

  round.addMessage({ text:getAttackText(options, context) }, Weaver(context));
  round.addTime(profile.speed);

  if (contest.isHit() === false) { return PhysicalAttackSystem.processMiss(attackRoll, defendRoll); }

  if (options.onHit) { options.onHit(acting, target); }
  applyEffects(options, target);
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

function getAttackText(options, context) {
  return options.getAttackText ?
    options.getAttackText(context):
    Dialog.lookupTemplate(DialogCategory.attackText, options.textKey, context);
}
