
// Bow damage is a dex based factor. Ammunition should simply add a flat value to that. Most ammo just adds a flat
// amount of pierce damage, but magic ammo could add fire damage, or a status effect.
Ammunition.register('arrows',{
  name: 'Elm Arrow',
  description: `Simple arrows made from elm wood, with a small iron head.`,
  category: InventoryCategory.ammo,
  rarity: Rarity.common,

  damageTypes: {
    [DamageType.pierce]:{ low:1, high:6 },
  },

  sources:[
    { withWeapon:'bow', rarity:Rarity.common, quantity:[10,20]},
    { group:'supplies', rarity:Rarity.common, quantity:[10,20]},
  ]
});
