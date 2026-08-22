describe("ManaFactory", function() {

  afterEach(function() { CharacterFactory.endBuild(); });

  function buildMana(species) {
    const state = CharacterFactory.startBuild({ species:species, gender:Gender.female, triggers:[] });
    ManaFactory.build();
    return state.getMana();
  }

  it("only rolls pools for the colors the species has an affinity for", function() {
    const mana = buildMana(SpeciesCode.kobold);
    expect(mana.red.max).to.be.within(2,20);
    expect(mana.yellow).to.deep.equal({ current:0, max:0 });
    expect(mana.green).to.deep.equal({ current:0, max:0 });
    expect(mana.blue).to.deep.equal({ current:0, max:0 });
    expect(mana.black).to.deep.equal({ current:0, max:0 });
  });

  it("scales the pool with the grade", function() {
    const mana = buildMana(SpeciesCode.elf);
    expect(mana.red.max).to.be.within(2,20);
    expect(mana.black.max).to.be.within(1,10);
    expect(mana.yellow.max).to.equal(0);
  });

  it("starts every pool full", function() {
    const mana = buildMana(SpeciesCode.sylph);
    Object.values(Mana).forEach(color => {
      expect(mana[color].current).to.equal(mana[color].max);
    });
  });

  it("gives a human no mana at all", function() {
    const mana = buildMana(SpeciesCode.human);
    Object.values(Mana).forEach(color => {
      expect(mana[color]).to.deep.equal({ current:0, max:0 });
    });
  });

});
