EquipmentParameters.register('vermen',{

  materials: {
    leather: 120,
    wood: 100,
    bone: 80,
    flint: 40,
    stone: 40,
    iron: 20,
  },

  weapons:{
    'hatchet':           15,
    'cleaver':           15,
    'hand-axe':          10,
    'shortbow':          20,
    'knife':             50,
    'dagger':            40,
    'spear':             30,
    'scythe':            25,
    'short-sword':       20,
    'bullwhip':          25,
    'chain-whip':        10,
    'sickle-and-chain':  25,
    'ball-and-chain':    15,
    'flail':             25,
    'cat-o-nine-tails':  15,
  },

  // Vermen don't have any armor in their depot yet. This is in part to make sure that even if a depot completely runs
  // dry in one type of equipment or another they'll still work. I kind of like this from a world building perspective
  // as well. To a vermen, life is so cheap that armor is considered worthless, cowardly even. Better to always be
  // naked and screaming.
  armor:{},

  enchantments:{
    // Poison, venom and diseased weapons should be common.
  },

});
