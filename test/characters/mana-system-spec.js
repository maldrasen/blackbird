describe("ManaSystem", function() {

  function elfWithRed(current, max) {
    return CharacterFixtures.genericMale({ mana:{ red:{ current:current, max:max } }});
  }

  describe("getPool()", function() {
    it("returns the pool for a color", function() {
      const id = elfWithRed(3, 10);
      expect(ManaSystem.getPool(id, Mana.red)).to.deep.equal({ current:3, max:10 });
      expect(ManaSystem.getPool(id, Mana.blue)).to.deep.equal({ current:0, max:0 });
    });

    it("rejects a color that doesn't exist", function() {
      const id = elfWithRed(3, 10);
      expect(function() { ManaSystem.getPool(id, 'purple'); }).to.throw('ManaSystem.color');
    });

    it("rejects an entity with no mana component", function() {
      const id = MonsterFactory('lesser-daggermaw').build();
      expect(function() { ManaSystem.getPool(id, Mana.red); }).to.throw('no mana component');
    });
  });

  describe("deepenPool()", function() {
    it("raises the maximum and fills the new depth", function() {
      const id = CharacterFixtures.genericMale({ actor:{ species:'human' }});
      ManaSystem.deepenPool(id, Mana.red, 10);
      expect(ManaSystem.getPool(id, Mana.red)).to.deep.equal({ current:10, max:10 });
    });

    it("keeps the mana already spent from the pool", function() {
      const id = elfWithRed(3, 10);
      ManaSystem.deepenPool(id, Mana.red, 5);
      expect(ManaSystem.getPool(id, Mana.red)).to.deep.equal({ current:8, max:15 });
    });

    it("rejects a negative amount", function() {
      const id = elfWithRed(3, 10);
      expect(function() { ManaSystem.deepenPool(id, Mana.red, -5); }).to.throw('ManaSystem.amount');
    });
  });

  describe("addMana()", function() {
    it("adds to the current mana and returns the amount gained", function() {
      const id = elfWithRed(3, 10);
      expect(ManaSystem.addMana(id, Mana.red, 4)).to.equal(4);
      expect(ManaSystem.getPool(id, Mana.red).current).to.equal(7);
    });

    it("only gains what the pool can hold", function() {
      const id = elfWithRed(3, 10);
      expect(ManaSystem.addMana(id, Mana.red, 20)).to.equal(7);
      expect(ManaSystem.getPool(id, Mana.red).current).to.equal(10);
    });

    it("gains nothing into an empty pool", function() {
      const id = elfWithRed(3, 10);
      expect(ManaSystem.addMana(id, Mana.blue, 20)).to.equal(0);
    });
  });

  describe("hasMana()", function() {
    it("checks the current mana against the amount", function() {
      const id = elfWithRed(3, 10);
      expect(ManaSystem.hasMana(id, Mana.red, 3)).to.equal(true);
      expect(ManaSystem.hasMana(id, Mana.red, 4)).to.equal(false);
    });
  });

  describe("spendMana()", function() {
    it("takes the mana from the pool", function() {
      const id = elfWithRed(8, 10);
      ManaSystem.spendMana(id, Mana.red, 5);
      expect(ManaSystem.getPool(id, Mana.red)).to.deep.equal({ current:3, max:10 });
    });

    it("throws when there isn't enough", function() {
      const id = elfWithRed(3, 10);
      expect(function() { ManaSystem.spendMana(id, Mana.red, 5); }).to.throw(`Greg doesn't have 5 red mana`);
      expect(ManaSystem.getPool(id, Mana.red).current).to.equal(3);
    });
  });

  describe("restoreAll()", function() {
    it("fills every pool", function() {
      const id = CharacterFixtures.genericMale({ mana:{ red:{ current:1, max:10 }, green:{ current:0, max:6 } }});
      ManaSystem.restoreAll(id);
      expect(ManaSystem.getPool(id, Mana.red)).to.deep.equal({ current:10, max:10 });
      expect(ManaSystem.getPool(id, Mana.green)).to.deep.equal({ current:6, max:6 });
      expect(ManaSystem.getPool(id, Mana.blue)).to.deep.equal({ current:0, max:0 });
    });
  });

});
