
// Each material has a cost (the price of a single unit) and a set of performance factors. Material cost drives an
// item's value: the gap between cheap materials (wool, wood) and worked metals (iron, steel) is what makes metal
// equipment expensive.
//
// A material only defines the factors that make sense for it, a weapon or armor made from a material that lacks the
// factor it needs is an invalid combination (there is no wool sword). Each factor is relative to the baseline
// material for that use, which sits at 1.0:
//   sharpness  - slash/pierce damage of a blade or point, baseline steel
//   heft       - crush damage of a mace or bashing shield, baseline steel
//   lash       - slash damage of a whip, baseline leather
//   tension    - damage of a bow, baseline wood
//   absorption - physical damage reduction of armor, baseline steel
//   potential  - how strongly the material carries an enchantment, baseline steel
//
// All the heft factors are 1.0 for now - a stone hammer crushes as hard as a steel one - but exotic dense materials
// can hit harder later. Note silver: as bare metal it absorbs less than iron, but its very high potential makes
// enchanted silver equipment both valuable and powerful. Silk is the same story in cloth - thin and weak on its own,
// but it takes an enchantment far better than wool. The absorption values here are a first pass and get tuned as the
// armor is built out.

Material.register(MaterialType.wool, {
  name: 'Wool',
  cost: 2,
  factors: {
    absorption: 0.2,
    potential: 0.9,
  },
});

Material.register(MaterialType.silk, {
  name: 'Silk',
  cost: 8,
  factors: {
    absorption: 0.12,
    potential: 1.8,
  },
});

Material.register(MaterialType.wood, {
  name: 'Wood',
  cost: 1,
  factors: {
    absorption: 0.4,
    heft: 1.0,
    potential: 1.0,
    tension: 1.0,
  },
});

Material.register(MaterialType.bone, {
  name: 'Bone',
  cost: 2,
  factors: {
    absorption: 0.5,
    heft: 1.0,
    potential: 1.2,
    sharpness: 0.65,
  },
});

Material.register(MaterialType.leather, {
  name: 'Leather',
  cost: 3,
  factors: {
    absorption: 0.35,
    lash: 1.0,
    potential: 0.7,
  },
});

Material.register(MaterialType.iron, {
  name: 'Iron',
  cost: 6,
  factors: {
    absorption: 0.75,
    heft: 1.0,
    lash: 0.9,
    potential: 0.5,
    sharpness: 0.8,
    tension: 0.9,
  },
});

Material.register(MaterialType.steel, {
  name: 'Steel',
  cost: 14,
  factors: {
    absorption: 1.0,
    heft: 1.0,
    lash: 1.0,
    potential: 1.0,
    sharpness: 1.0,
    tension: 1.0,
  },
});

Material.register(MaterialType.silver, {
  name: 'Silver',
  cost: 30,
  factors: {
    absorption: 0.6,
    heft: 1.0,
    lash: 0.85,
    potential: 2.0,
    sharpness: 0.85,
  },
});
