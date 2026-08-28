describe('ConsumableEffect', function() {

  describe('addHealth()', function() {
    it('heals the entity and returns the amount healed', function() {
      const horse = CharacterFixtures.genericMale({ health:{ currentHealth:50, maxHealth:100 } });

      const result = ConsumableEffect.addHealth(10,10)(horse);

      expect(result.type).to.equal('add-health');
      expect(result.value).to.equal(10);
      expect(HealthComponent.lookup(horse).currentHealth).to.equal(60);
    });

    it('clamps healing at max health and reports only the amount gained', function() {
      const horse = CharacterFixtures.genericMale({ health:{ currentHealth:95, maxHealth:100 } });

      const result = ConsumableEffect.addHealth(10,10)(horse);

      expect(result.value).to.equal(5);
      expect(HealthComponent.lookup(horse).currentHealth).to.equal(100);
    });
  });

  describe('restoreMana()', function() {
    it('adds mana to the pool and returns the amount gained', function() {
      const horse = CharacterFixtures.genericMale({ mana:{ red:{ current:2, max:20 } } });

      const result = ConsumableEffect.restoreMana(Mana.red,5,5)(horse);

      expect(result.type).to.equal('add-mana');
      expect(result.color).to.equal(Mana.red);
      expect(result.value).to.equal(5);
      expect(ManaSystem.getPool(horse,Mana.red).current).to.equal(7);
    });

    it('clamps mana at the pool maximum and reports only the amount gained', function() {
      const horse = CharacterFixtures.genericMale({ mana:{ red:{ current:18, max:20 } } });

      const result = ConsumableEffect.restoreMana(Mana.red,5,5)(horse);

      expect(result.value).to.equal(2);
      expect(ManaSystem.getPool(horse,Mana.red).current).to.equal(20);
    });
  });

  describe('Consumable.consume()', function() {
    it('applies the effects and returns the results with a story', function() {
      const horse = CharacterFixtures.genericMale({ health:{ currentHealth:50, maxHealth:100 } });

      const response = Consumable.lookup('dungeon-tripe').consume(horse);

      expect(response.story).to.be.a('string');
      expect(response.results.length).to.equal(1);
      expect(response.results[0].type).to.equal('add-health');
      expect(response.results[0].value).to.be.within(5,15);
      expect(HealthComponent.lookup(horse).currentHealth).to.equal(50 + response.results[0].value);
    });
  });

});
