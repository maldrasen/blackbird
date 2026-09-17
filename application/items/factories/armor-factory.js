global.ArmorFactory = function() {
  let availableMaterials;

  function setAvailableMaterials(list) {
    availableMaterials = (list == null) ? null : new Set(list);
  }

  function pickMaterial(type) {
    const all = Material.forType(type);
    const availableForType = (availableMaterials == null) ? all : [...(new Set(all).intersection(availableMaterials))];
    return Random.from(availableForType);
  }

  // Options:
  //   - name
  //   - nameType
  function build(code, options={}) {
    console.log(`=== Build ${code} ===`);

    const base = BaseArmor.lookup(code);
    const item = { type:'armor' };
    const armor = { base:code }

    setMaterials();
    setName();

    // Materials can be specified in the options. If they aren't, pick them at random from the type.
    function setMaterials() {
      item.materials = {};
      Object.entries(base.getMaterials()).forEach(([type,amount]) => {
        item.materials[pickMaterial(type)] = amount;
      });
    }

    function setName() {
      item.name = options.name || base.getName(item.materials);
      item.nameType = (options.nameType === 'proper') ? 'proper' : 'common';
    }

    // For now I'm just making the armor factory work in just like the weapon factory.
    // function customizeArmor(id, options) {
    //   const armorComponent = ArmorComponent.lookup(id);
    //   if (options.enchantment) { armorComponent.enchantment = options.enchantment; }
    // }

    const id = Registry.createEntity();
    ItemComponent.create(id, item);
    ArmorComponent.create(id, armor);
    ArmorAppraiser.appraise(id);

    return id;
  }

  return {
    build,
    setAvailableMaterials,
  }

}
