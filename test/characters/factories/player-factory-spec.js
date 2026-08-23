describe("PlayerFactory", function() {

  it("builds a human player with no natural mana", function() {
    const id = PlayerFactory.build({});
    const mana = ManaComponent.lookup(id);

    Object.values(Mana).forEach(color => {
      expect(mana[color]).to.deep.equal({ current:0, max:0 });
    });
  });

  it("rolls mana pools for a player of another species", function() {
    const id = PlayerFactory.build({ species:SpeciesCode.kobold, gender:Gender.male });
    const mana = ManaComponent.lookup(id);

    expect(mana.red.max).to.be.within(2,20);
    expect(mana.blue).to.deep.equal({ current:0, max:0 });
  });

});
