global.ItemConstants = {
  effortCost: 20,

  damageValue: 1,
  healthValue: 1,
  manaValue: 3,
  potencyValue: 20,
  statusEffectValues: {
    blind: 4,
    stun: 15,
    poison: 0,
  },

  chestChallengePercent: 0.3,
  lootValueScale: 30,
  lootChallengeScale: 20,
  lootCeilingLow: 60,
  lootFloorPercent: 0.25,

  allArmorTypes: [ItemType.chest, ItemType.feet, ItemType.hands, ItemType.head, ItemType.legs, ItemType.shield],
  allWeaponTypes: [ItemType.axe, ItemType.bow, ItemType.dagger, ItemType.mace, ItemType.polearm, ItemType.sword, ItemType.whip],

  // TODO: Quiver capacity can be a constant for now, but we could also add aspects that increase this.
  quiverCapacity: 20,

  // Monsters with bows are given random number of arrows. Monsters can never run out of arrows in a battle, because we
  // don't want to deal with what they should do if they run out, but the arrows in their quiver are used to calculate
  // the bow damage, and they'll still have them if they get recruited. We can't give a monster more arrows than the
  // quiver capacity.
  monsterArrows: [10,20],
};
