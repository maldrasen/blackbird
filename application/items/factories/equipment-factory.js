
// Builds a piece of equipment from a BaseEquipment record. The record lists its materials by type; the factory picks a
// concrete material for each, restricted to the available list when one has been set, and names the item from what
// it was made of.

global.EquipmentFactory = function() {
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

  function pickMaterial(type, code) {
    const all = Material.forType(type);
    const availableForType = (availableMaterials == null) ? all : all.filter(material => availableMaterials.has(material));
    if (availableForType.length === 0) { throw new Error(`No available ${type} material for [${code}]`); }
    return Random.from(availableForType);
  }

  // Options:
  //   - name         overrides the name built from the materials
  //   - nameType     'proper' for a named item, otherwise common
  //   - textKey      overrides the record's attack text key
  //   - enchantment
  function build(code, options={}) {
    const base = BaseEquipment.lookup(code);
    const item = { type:(base.isWeapon() ? 'weapon' : 'armor'), base:code };

    setMaterials();
    setName();
    setOverrides();

    // Two material types can land on the same material (a steel ball on a steel chain), so the amounts add up.
    function setMaterials() {
      item.materials = {};
      Object.entries(base.getMaterials()).forEach(([type,amount]) => {
        const material = pickMaterial(type, code);
        item.materials[material] = (item.materials[material] || 0) + amount;
      });
    }

    function setName() {
      item.name = options.name || base.getName(item.materials);
      item.nameType = (options.nameType === 'proper') ? 'proper' : 'common';
    }

    function setOverrides() {
      if (options.textKey) { item.textKey = options.textKey; }
      if (options.enchantment) { item.enchantment = options.enchantment; }
    }

    item.value = EquipmentAppraiser.appraise(item);

    const id = Registry.createEntity();
    ItemComponent.create(id, item);
    return id;
  }

  return {
    build,
    setAvailableMaterials,
  };

};
