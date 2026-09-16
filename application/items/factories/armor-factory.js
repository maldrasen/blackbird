global.ArmorFactory = function(code, options={}) {
  const base = BaseArmor.lookup(code);
  const item = { type:'armor' };
  const armor = { base:code }

  console.log(`=== Build ${code} ===`);

  pickMaterials();
  pickName();

  if (Object.keys(options).length > 0) {
    customizeArmor(id, options);
  }

  // Materials can be specified in the options. If they aren't, pick them at random from the type.
  function pickMaterials() {

    // Figure out how materials can be set from an option. Probably an object with material code and amount. Need to
    // check to make sure that the passed material is within the type.
    if (options.materials) {
      return;
    }

    item.materials = {};
    Object.entries(base.getMaterials()).forEach(([type,amount]) => {
      item.materials[Random.from(Material.forType(type))] = amount;
    });
  }

  function pickName() {
    item.name = base.getName(item.materials);
  }

  // For now I'm just making the armor factory work in just like the weapon factory.
  function customizeArmor(id, options) {
    const armorComponent = ArmorComponent.lookup(id);
    if (options.name) { armorComponent.name = options.name; }
    if (options.enchantment) { armorComponent.enchantment = options.enchantment; }
    ArmorComponent.update(id, armorComponent);
  }

  const id = Registry.createEntity();
  ItemComponent.create(id, item);
  ArmorComponent.create(id, armor);
  ArmorAppraiser.appraise(id);

  return id;
}
