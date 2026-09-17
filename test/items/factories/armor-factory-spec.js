describe.only('ArmorFactory', function() {

  it('builds basic armor with no options', function() {
    const armor = Armor(ArmorFactory().build('doublet'));
    expect(armor.getBaseArmor().getCode()).to.equal('doublet');
  });

  it('builds basic armor with a material list', function() {
    const factory = ArmorFactory();
    factory.setAvailableMaterials(['silk']);

    const armor = Armor(factory.build('doublet'));
    expect(armor.getName()).to.equal('Silk Doublet');
    expect(armor.getPrimaryMaterial()).to.equal('silk');
    expect(armor.isMetal()).to.be.false;
  });

});