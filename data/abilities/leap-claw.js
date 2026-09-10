
NaturalAttackAbility.register('leap-claw', {
  attack: {
    skill: 'daggers',
    textKey: 'leap-claw',
    damageType: DamageType.slash,
    reach: WeaponReach.short,
  },
});

const text = WeaverPackage('attack-text.leap-claw');
text.add(`{A:ActingName} leaps into the air, slashing at {targetsHitLocation(T)}.`);
text.add(`{A:ActingName} launches itself into the air, clawing at {targetsHitLocation(T)}.`);

Dialog.register(DialogCategory.attackText, 'leap-claw', text);
