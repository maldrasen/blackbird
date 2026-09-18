Ability.WeaponAttack = function(options={}) {
  const ability = Ability(`Attack`);
  ability.setEssence(0);
  ability.setTargetingMode(TargetingMode.enemyInWeaponRange);
  ability.setPossibleFunction(isPossible);
  ability.setExecuteFunction(() => { executeAttacks(ability); });

  if (options.priority != null) { ability.setPriority(options.priority); }

  return ability;
}

function isPossible() {
  return BattleSystem.getRound().isActingMonster() ? canMonsterAttack() : canCharacterAttack();
}

// A weapon attack always uses a real equipped weapon. An entity with empty hands can't make one - they fight with
// natural attack abilities (punch, bite) instead. A monster has already picked its target, so its reach is checked
// against that target. A character picks a target after choosing the command, so any monster in reach will do.
function canMonsterAttack() {
  const round = BattleSystem.getRound();
  const weapon = round.getPrimaryWeapon();

  if (weapon == null) { return false; }
  if (isHidden()) { return false; }

  return BattleHelper.isAttackWithinRange(weapon.getBase().getReach(), round.getActingPosition(), round.getTargetPosition());
}

function canCharacterAttack() {
  if (BattleSystem.getRound().getPrimaryWeapon() == null) { return false; }
  if (isHidden()) { return false; }

  return TargetingController.getMonstersInRange().length > 0;
}

function isHidden() {
  return StatusEffects(BattleSystem.getRound().getActing()).hasHidden();
}

// Every strike is rolled before any is resolved, so a status picked up while resolving one strike doesn't change
// the odds of the strikes after it. Strikes left after the target goes down are skipped.
function executeAttacks(ability) {
  const state = BattleSystem.getState();
  const round = BattleSystem.getRound();
  const acting = round.getActing();
  const target = round.getTarget();

  const contests = calculateAttacks().map(weaponId => {
    const contest = PhysicalAttackContest(acting, target);
          contest.setWeapon(weaponId);
          contest.setAbility(ability);
          contest.roll();

    return contest;
  });

  contests.forEach(contest => {
    if (state.isDown(target)) { return; }

    const attackRoll = contest.getAttackRoll();
    const defendRoll = contest.getDefendRoll();
    const context = contest.getContext();
    const attackText = Dialog.lookupTemplate(DialogCategory.attackText, attackRoll.getTextKey(), context);

    round.addMessage({ text:attackText }, Weaver(context));
    round.addTime(attackRoll.getBaseWeapon().getSpeed());

    contest.isHit() ?
      PhysicalAttackSystem.processHit(attackRoll, defendRoll):
      PhysicalAttackSystem.processMiss(attackRoll, defendRoll);
  });
}

// To calculate the weapon attacks we alternate between a character's equipped primary and secondary weapons, adding
// attacks to a list until we have enough attacks to fill one second. The attacks may take more than one second. If
// a character's primary weapon strike takes 900ms, they will attack twice but only every 1800ms. Alternatively, a
// character with a weapon speed of 1200ms will attack once every 1200ms, so it might seem like they attack more
// often, but really they're getting fewer hits in. It's just that they get to choose their actions more frequently.
// The attacks are the ids of the weapons making each strike, in order.
function calculateAttacks() {
  const round = BattleSystem.getRound();
  const weapons = { primary:round.getPrimaryWeapon(), secondary:round.getSecondaryWeapon() };
  const dualWielding = weapons.primary != null && weapons.secondary != null;
  const attacks = [];

  let hand = 'primary';
  let time = 0;

  while (time < 1000) {
    attacks.push(weapons[hand].getId());
    time += getStrikeTime(weapons[hand], dualWielding);
    hand = (hand === 'primary' && dualWielding) ? 'secondary' : 'primary';
  }

  return attacks;
}

// A character with a weapon in each hand swings each of them 25% faster.
function getStrikeTime(weapon, dualWielding) {
  const time = weapon.getBase().getSpeed() * BattleSystem.getRound().getSpeedFactor();
  return dualWielding ? Math.round(time * 0.75) : time;
}
