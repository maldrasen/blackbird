describe.only('ArmorFactory', function() {

  it('builds basic armor with no options', function() {
    const id = ArmorFactory('doublet');
    const armor = Armor(id);

    console.log("Built:")
    console.log(ItemComponent.lookup(id));
    console.log(ArmorComponent.lookup(id));

    // console.log(armor.getBaseArmor());
    // console.log(armor.getName());
    // console.log(armor.getIcon());
    // console.log(armor.getReduction());
    // console.log(armor.hasEnchantment());
    // console.log(armor.getEnchantment());
    // console.log(armor.getPrimaryMaterial());
    // console.log(armor.isMetal());

  });

  it('builds basic armor with a material list', function() {

  });

});