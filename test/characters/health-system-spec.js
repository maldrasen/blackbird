describe("HealthSystem", function() {

  describe("addHealth()", function() {
    it("adds to the current health and returns the amount gained", function() {
      const id = CharacterFixtures.genericMale({ health:{ currentHealth:50, maxHealth:100 } });
      expect(HealthSystem.addHealth(id, 10)).to.equal(10);
      expect(HealthComponent.lookup(id).currentHealth).to.equal(60);
    });

    it("only gains what the maximum allows", function() {
      const id = CharacterFixtures.genericMale({ health:{ currentHealth:95, maxHealth:100 } });
      expect(HealthSystem.addHealth(id, 20)).to.equal(5);
      expect(HealthComponent.lookup(id).currentHealth).to.equal(100);
    });

    it("rejects a negative amount", function() {
      const id = CharacterFixtures.genericMale({ health:{ currentHealth:50, maxHealth:100 } });
      expect(function() { HealthSystem.addHealth(id, -5); }).to.throw('HealthSystem.amount');
    });

    it("rejects an entity with no health component", function() {
      expect(function() { HealthSystem.addHealth('no-such-entity', 5); }).to.throw('no health component');
    });
  });

});
