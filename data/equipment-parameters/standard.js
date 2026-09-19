EquipmentParameters.register('standard',{

  materials: {
    wool: 100,
    silk: 20,
    wood: 100,
    leather: 120,
    iron: 80,
    steel: 50,
    silver: 10,
  },

  // Armor and weapons are combined in the same map as they're all equipment. Armor should be 6 times more common
  // than weapons. A character equipping themselves will get 1 or 2 weapons, but get 5-7 armor pieces.
  equipment:{

    'hatchet':       30,
    'cleaver':       35,
    'hand-axe':      40,
    'broad-axe':     50,
    'war-axe':       50,
    'goosewing':     5,
    'battle-axe':    15,
    'labrys':        5,
    // Axes:         230

    'shortbow':      40,
    'longbow':       60,
    'recursive-bow': 40,
    'crossbow':      30,
    'arbalest':      20,
    // Bows:         190

    'doublet':       600,
    'hauberk':       500,
    'cuirass':       400,
    'breastplate':   300,
    'plate':         100,
    // Chests:       1900,

  },

  enchantments:{},

});
