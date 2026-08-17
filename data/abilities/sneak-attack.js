Ability.register('sneak-attack',{
  name: 'Sneak Attack',
  category: 'basic',
  targetingMode: TargetingMode.anyEnemy,
  essence: 25,

  canBeUsed: () => {
    return StatusEffects(BattleSystem.getRound().getActing()).has('hidden');
  },

  execute: () => {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const target = round.getTarget();
    const weapon = round.getPrimaryWeapon();

    const contest = PhysicalAttackContest(acting, target);
          contest.setWeaponData(weapon);
          contest.setAbility('sneak-attack');
          contest.roll();

    const attackRoll = contest.getAttackRoll();
    const defendRoll = contest.getDefendRoll();

    PhysicalAttackSystem.updateContext(attackRoll);

    round.addTime(BaseWeapon.lookup(weapon.base).getSpeed());
    round.addMessage({ text:getAttackText(weapon) });

    if (contest.isHit()) {
      PhysicalAttackSystem.processHit(attackRoll, defendRoll);
    } else {
      PhysicalAttackSystem.processMiss(attackRoll, defendRoll);
    }
  },

  // TODO: Sneak attacks should get a bonus to accuracy and a bonus to damage. I'll represent these as factors rather
  //       than flat values so that they scale. I'm thinking a 50% accuracy and a 100% damage bonus seems reasonable.
  //       These are functions though because I'd like for the characters to have feats and abilities that add to
  //       these values. A high level rogue might be doing 4x damage with a sneak attack. These numbers might also
  //       depend on the weapon being used. To prevent sneak attacks with a maul maybe the damage multiplier increases
  //       with the weapon speed. Something to consider for the future I think.

  getAccuracyBonus: acting => { return 1.5; },
  getDamageBonus: acting =>  { return 2; },
});

// TODO: We'll need a lot more attack text for this ability.
function getAttackText(weapon) {
  const base = BaseWeapon.lookup(weapon.base);
  const type = base.getType();
  const damageTypes = base.getDamageTypes().map(t => t.type);

  if (type === 'bow') {
    return Dialog.lookupTemplate(DialogCategory.attackText, 'sneak-attack-ranged');
  }
  if (damageTypes.includes('pierce')) {
    return Dialog.lookupTemplate(DialogCategory.attackText, 'sneak-attack-pierce');
  }
  if (['axe','mace'].includes(type)) {
    return Dialog.lookupTemplate(DialogCategory.attackText, 'sneak-attack-swing');
  }

  return `[TODO: Sneak attack with ${weapon.base}]`;
}
