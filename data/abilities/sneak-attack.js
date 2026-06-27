Ability.register('sneak-attack',{
  name: 'Sneak Attack',
  category: 'basic',
  needsTarget: true,

  canBeUsed: () => { return true; },

  execute: () => {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const target = round.getTarget();
    const weapon = round.getPrimaryWeapon();
    const attackRoll = PhysicalAttackRoll(acting, target, weapon);
    const defendRoll = DefendRoll(target, acting, attackRoll);

    PhysicalAttackSystem.updateContext(attackRoll);

    round.setTime(BaseWeapon.lookup(weapon.base).getSpeed());
    round.addMessage({ text:getAttackText(weapon) });

    const actualHitValue = attackRoll.getFinalValue() * getSneakAttackAccuracyBonus(acting);
    if (actualHitValue > defendRoll.getFinalValue()) {
      PhysicalAttackSystem.processHit(attackRoll, defendRoll, { damageFactor:getSneakAttackDamageBonus(acting) });
    } else {
      PhysicalAttackSystem.processMiss(attackRoll, defendRoll);
    }
  },

});

// TODO: We'll need additional attack text some polearms, whips and fists.
function getAttackText(weapon) {
  const base = BaseWeapon.lookup(weapon.base);
  const type = base.getType();
  const damageTypes = base.getDamageTypes().map(t => t.type);

  if (type === 'bow') {
    return Random.from(Dialog.lookupTemplate(DialogCategory.attackText, 'sneak-attack-ranged'));
  }
  if (damageTypes.includes('pierce')) {
    return Random.from(Dialog.lookupTemplate(DialogCategory.attackText, 'sneak-attack-pierce'));
  }
  if (['axe','mace'].includes(type)) {
    return Random.from(Dialog.lookupTemplate(DialogCategory.attackText, 'sneak-attack-swing'));
  }

  return `[TODO: Sneak attack with ${weapon.base}]`;
}

// TODO: Sneak attacks should get a bonus to accuracy and a bonus to damage. I'll represent these as factors rather
//       than flat values so that they scale. I'm thinking a 50% accuracy and a 100% damage bonus seems reasonable.
//       These are functions though because I'd like for the characters to have feats and abilities that add to
//       these values. A high level rogue might be doing 4x damage with a sneak attack. These numbers might also
//       depend on the weapon being used. To prevent sneak attacks with a maul maybe the damage multiplier increases
//       with the weapon speed. Something to consider for the future I think.

function getSneakAttackAccuracyBonus(acting) { return 1.5; }
function getSneakAttackDamageBonus(acting) { return 2; }
