global.ArmorFactory = function() {
  let availableMaterials;

  // TODO: We're currently using Random.from() to pick a random material, given a list of available materials. We
  //       should actually be using a frequency map here because some materials should be more rare then others when
  //       randomly generating equipment. Once we implement the item depots, different depots should have different
  //       material ranges. When generating higher level monsters better quality materials should be more common in the
  //       depot used to equip them. I think the factory must always receive a material rarity map. In the actual game,
  //       I think we'd always want to specify the material range somehow, for random monsters, for the player
  //       character's randomly selected equipment or generating the stock for an item store.

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
