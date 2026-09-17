global.WeaponFactory = function() {
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
    const base = BaseEquipment.lookup(code);
    const item = { type:'weapon', base:code };

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

    // if (Object.keys(options).length > 0) {
    //   customizeWeapon(id, options);
    // }

    // For now we can just pass the data from the options into the weapon component. Eventually we'll want to have
    // something else randomly building enchantments and adding them to weapons, adjusting the weapon name accordingly,
    // but for now just taking the raw values will let me build the canned weapons and let me use them.
    // function customizeWeapon(id, options) {
    //   const weaponComponent = WeaponComponent.lookup(id);
    //   if (options.name) { weaponComponent.name = options.name; }
    //   if (options.textKey) { weaponComponent.textKey = options.textKey; }
    //   if (options.enchantment) { weaponComponent.enchantment = options.enchantment; }
    //   WeaponComponent.update(id, weaponComponent);
    // }

    const id = Registry.createEntity();
    ItemComponent.create(id, item);
    WeaponAppraiser.appraise(id);
    return id;
  }

  return {
    build,
    setAvailableMaterials,
  };

};
