describe.only("AbilityAppraiser", function() {

  it('Appraises weapon and item abilities at 0', function() {
    expect(BaseMonster.lookup('kobold-runt').findAbility('Attack').getEssence()).to.equal(0);
  });

});
