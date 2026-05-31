describe("WeaponFactory", function() {

  it("builds simple base weapons", function() {
    const id = WeaponFactory.build('goosewing');
    const axe = WeaponComponent.lookup(id);
    expect(axe.base).to.equal('goosewing');
  });

});