global.EquipmentFactory = function(availableMaterials) {

  // Options:
  //   - name         overrides the name built from the materials
  //   - nameType     'proper' for a named item, otherwise common
  //   - textKey      overrides the record's attack text key
  //   - enchantment
  function build(code, options={}) {
    const base = BaseEquipment.lookup(code);
    const item = { base:code };

    setMaterials();
    setName();
    setOverrides();

    // Two material types can land on the same material (a steel ball on a steel chain), so the amounts add up.
    function setMaterials() {
      item.materials = {};
      Object.entries(base.getMaterials()).forEach(([type,amount]) => {
        const material = pickMaterial(type);
        item.materials[material] = (item.materials[material] || 0) + amount;
      });
    }

    // When picking the material we need to filter materials that fall within the type.
    function pickMaterial(type) {
      const forType = Material.forType(type);
      if (availableMaterials == null) { return Random.from(forType); }

      const frequencies = ObjectHelper.select(availableMaterials, (material, _) => {
        return forType.includes(material);
      });

      if (Object.keys(frequencies).length === 0) { throw new Error(`No available ${type} material for [${code}]`); }
      return Random.fromFrequencyMap(frequencies);
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

  return { build }

};
