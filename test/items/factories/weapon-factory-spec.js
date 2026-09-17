describe("WeaponFactory", function() {

  it("builds simple base weapons", function() {
    const axe = Weapon(WeaponFactory().build('goosewing'));
    expect(axe.getBaseWeapon().getCode()).to.equal('goosewing');
  });

  it.only('builds basic weapon with a material list', function() {
    const factory = WeaponFactory();
    factory.setAvailableMaterials(['silver']);

    const weapon = Weapon(factory.build('labrys'));
    expect(weapon.getName()).to.equal('Silver Labrys');
    expect(weapon.getPrimaryMaterial()).to.equal('silver');
  });

});
