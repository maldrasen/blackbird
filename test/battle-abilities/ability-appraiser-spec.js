describe.only("AbilityAppraiser", function() {

  it('Appraises weapon and item abilities at 0', function() {
    expect(BaseMonster.lookup('kobold-runt').findAbility('Attack').getEssence()).to.equal(0);
  });

  describe('spellEssence()', function() {
    it('appraises burst damage spells', function() {
      const essence = AbilityAppraiser.spellEssence('ember', 1);
      console.log("Essence:",essence)
    });
    it('appraises burst damage spells', function() {
      const essence = AbilityAppraiser.spellEssence('ember', 8, 3000);
      console.log("Essence:",essence)
    });


  });

});
