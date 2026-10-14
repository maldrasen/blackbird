
Ammunition.register('elm-arrow',{
  name: 'Elm Arrow',
  description: `Simple arrows made from elm wood, with a small iron head.`,
  category: InventoryCategory.ammo,
  rarity: Rarity.common,

  damageTypes: {
    [DamageType.pierce]:{ low:1, high:6 },
  },

  sources:[
    { withWeapon:'bow', rarity:Rarity.common, quantity:[15,30]},
    { group:'supplies', rarity:Rarity.common, quantity:[15,30]},
  ]
});

Ammunition.register('razerfang-arrow',{
  name: 'Razerfang Arrow',
  description: `These arrows have long serrated arrowheads that make removing them more painful than getting shot
    with them in the first place.`,
  category: InventoryCategory.ammo,
  rarity: Rarity.common,

  damageTypes: {
    [DamageType.pierce]:{ low:4, high:10 },
  },

  sources:[
    { group:'supplies', rarity:Rarity.unusual, quantity:[10,20]},
  ]
});

Ammunition.register('blackflame-arrow',{
  name: 'Blackflame Arrow',
  description: `These arrows have a long black shaft, with blackened steel tip. When drawn the arrowhead glows with a
    dull red light, and leaves a burning trail when it's fired.`,
  category: InventoryCategory.ammo,
  rarity: Rarity.unusual,

  damageTypes: {
    [DamageType.pierce]:{ low:2, high:8 },
    [DamageType.fire]:{ low:2, high:8 },
  },

  sources:[
    { group:'supplies', rarity:Rarity.rare, quantity:[5,10]},
  ]
});

/*
TODO: The appraiser has no value for a poison effect yet. The appraiser will need to take the strength and damage
      into account.

Ammunition.register('poison-arrow',{
  name: 'Poison Arrow',
  description: `The long steel tips of these arrows have been liberally coated with a poisonous resin.`,
  category: InventoryCategory.ammo,
  rarity: Rarity.unusual,

  damageTypes: {
    [DamageType.pierce]:{ low:1, high:8 },
  },
  effects:[
    Effect.poison({ strength:20, damage:{ x:2, d:6, p:2 }})
  ],

  sources:[
    { group:'supplies', rarity:Rarity.unusual, quantity:[10,20]},
  ]
});
*/