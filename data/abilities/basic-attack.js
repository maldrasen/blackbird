Ability.register('basic-attack',{
  name: 'Attack',
  category: 'basic',
  targetingMode: TargetingMode.enemyInWeaponRange,
  essence: 10,

  canBeUsed: acting => {
    return BattleSystem.getRound().isActingMonster() ? canMonsterAttack() : canCharacterAttack();
  },

  execute: () => { executeBasicAttack(); },
});

// A basic attack always uses a real equipped weapon. An entity with empty hands can't make one - they fight with
// natural attack abilities (punch, bite) instead.
function canMonsterAttack() {
  const round = BattleSystem.getRound();
  const weapon = round.getPrimaryWeapon();

  if (weapon == null) { return false; }
  if (isHidden()) { return false; }

  const p1 = round.getActingPosition();
  const p2 = round.getTargetPosition();

  return BattleHelper.isAttackWithinRange(weapon.reach, p1, p2);
}

function canCharacterAttack() {
  if (BattleSystem.getRound().getPrimaryWeapon() == null) { return false; }

  const inRange = TargetingController.getMonstersInRange().length > 0;
  return inRange && !isHidden();
}

function isHidden() {
  const acting = BattleSystem.getRound().getActing();
  return StatusEffects(acting).has('hidden');
}

function executeBasicAttack() {
  const state = BattleSystem.getState();
  const round = BattleSystem.getRound();
  const acting = round.getActing();
  const target = round.getTarget();
  const attacks = calculateAttacks();

  const contests = attacks.map(attack => {
    const contest = PhysicalAttackContest(acting, target);
          contest.setWeaponData(attack);
          contest.setAbility('basic-attack');
          contest.roll();

    return contest;
  });

  contests.forEach(contest => {
    const attackRoll = contest.getAttackRoll();
    const context = buildAttackContext(contest);
    const attackText = Dialog.lookupTemplate(DialogCategory.attackText, attackRoll.getTextKey(), context);

    if (state.isDown(context.T) === false) {
      round.addMessage({ text:attackText }, Weaver(context));
      round.addTime(attackRoll.getBaseWeapon().getSpeed());

      contest.isHit() ?
        PhysicalAttackSystem.processHit(attackRoll, contest.getDefendRoll()):
        PhysicalAttackSystem.processMiss(attackRoll, contest.getDefendRoll());
    }
  });
}

// To calculate the weapon attacks we alternate between a character's equipped primary and secondary weapons, adding
// attacks to a list until we have enough attacks to fill one second. The attacks may take more than one second. If
// a character's primary weapon strike takes 900ms, they will attack twice but only every 1800ms. Alternatively, a
// character with a weapon speed of 1200ms will attack once every 1200ms, so it might seem like they attack more
// often, but really they're getting fewer hits in. It's just that they get to choose their actions more frequently.
// A character that has both a primary and a secondary weapon equipped will use them each 75% faster.
function calculateAttacks() {
  const round = BattleSystem.getRound();
  const speedFactor = round.getSpeedFactor();

  const attacks = [];
  const weapons = {
    primary: round.getPrimaryWeapon(),
    secondary: round.getSecondaryWeapon(),
  }

  let hand = 'primary';
  let time = 0;

  while(time < 1000) {
    const weapon = weapons[hand];
    const baseWeapon = BaseWeapon.lookup(weapon.base);

    let strikeTime = baseWeapon.getSpeed() * speedFactor;
    if (weapons.primary && weapons.secondary) {
      strikeTime = Math.round(strikeTime * 0.75);
    }

    attacks.push({
      id: weapon.id,
      base: weapon.base,
      name: weapon.name,
      textKey: weapon.textKey,
      hand: hand,
    });

    time += strikeTime;
    hand = (hand === 'primary' && weapons.secondary) ? 'secondary' : 'primary';
  }

  return attacks;
}

function buildAttackContext(contest) {
  const round = BattleSystem.getRound();
  const attackRoll = contest.getAttackRoll();
  const defendRoll = contest.getDefendRoll();

  const context = {
    A: round.getActing(),
    T: round.getTarget(),
    hitLocation: attackRoll.getHitLocation(),
    weaponName: attackRoll.getWeaponName(),
    baseWeapon: attackRoll.getBaseWeaponCode(),
    weapon: attackRoll.getWeaponId(),
  };

  if (attackRoll.isCrit()) { context.attack = 'crit'; }
  if (attackRoll.isFumble()) { context.attack = 'fumble'; }
  if (context.attack == null) { context.attack = 'normal'; }
  if (defendRoll.isCrit()) { context.defend = 'crit'; }
  if (defendRoll.isFumble()) { context.defend = 'fumble'; }
  if (context.defend == null) { context.defend = 'normal'; }
  return context;
}
