describe("AbilityAppraiser", function() {

  it('Appraises weapon and item abilities at 0', function() {
    expect(BaseMonster.lookup('kobold-runt').findAbility('Attack').getEssence()).to.equal(0);
  });

  describe.only('attackEssence()', function() {

    it('appraises a normal attack', function() {
      const essence = AbilityAppraiser.attackEssence({ damage:[10,20], speed:1000 });
      console.log("Essence:",essence);
    });


  })

  describe('spellEssence()', function() {
    it('appraises burst damage spells', function() {
      expect(AbilityAppraiser.spellEssence({ spell:'ember', powerLevel:1 })).to.equal(11);
    });

    it('appraises higher damage single turn spells', function() {
      expect(AbilityAppraiser.spellEssence({ spell:'ember', powerLevel:8, cooldown:3000 })).to.equal(95);
    });

    it('appraises higher damage spells with a damage over time effect', function() {
      expect(AbilityAppraiser.spellEssence({ spell:'incinerate', powerLevel:4, cooldown:10 })).to.equal(283);
    });
  });

});
