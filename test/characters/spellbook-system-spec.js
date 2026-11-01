describe("SpellbookSystem", function() {

  // The player factory gives the player an empty spellbook and empty mana pools, so each spec fills in what it needs.
  function playerWithMana(pools) {
    const player = CharacterSupport.player();
    const mana = ManaComponent.lookup(player);
    Object.entries(pools).forEach(([color, amount]) => { mana[color] = { current:amount, max:amount }; });
    ManaComponent.update(player, mana);
    return player;
  }

  // Ember costs 2 red a level, mending 3 green, and incinerate 12 red.
  describe("getCastableSpells()", function() {
    it("lists the spells the character can pay for, at the level the mana and the spellbook allow", function() {
      const player = playerWithMana({ red:5, green:9 });
      SpellbookComponent.update(player, { ember:3, mending:2, incinerate:1 });

      expect(SpellbookSystem.getCastableSpells(player)).to.deep.equal([
        { code:'ember', color:Mana.red, maxPowerLevel:2 },
        { code:'mending', color:Mana.green, maxPowerLevel:2 },
      ]);
    });

    it("lists nothing for an empty spellbook", function() {
      const player = playerWithMana({ red:50 });
      expect(SpellbookSystem.getCastableSpells(player)).to.deep.equal([]);
    });
  });

  describe("getMaxCastablePowerLevel()", function() {
    it("holds the level to the spellbook when the mana would pay for more", function() {
      const player = playerWithMana({ red:50 });
      SpellbookComponent.setSpell(player, 'ember', 3);
      expect(SpellbookSystem.getMaxCastablePowerLevel(player, 'ember')).to.equal(3);
    });

    it("reads zero for a spell the character doesn't know", function() {
      const player = playerWithMana({ red:50 });
      expect(SpellbookSystem.getMaxCastablePowerLevel(player, 'ember')).to.equal(0);
    });

    it("throws for an entity without a spellbook", function() {
      const id = CharacterSupport.genericMale({});
      expect(() => SpellbookSystem.getMaxCastablePowerLevel(id, 'ember')).to.throw('no spellbook');
    });
  });

});
