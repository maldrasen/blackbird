describe.only("Ability", function() {

  it("gives every ability its own id", function() {
    expect(Ability('One').getId()).to.not.equal(Ability('Two').getId());
  });

  it("is possible, untargeted, and unmodified until a factory says otherwise", function() {
    const ability = Ability('Blank');

    expect(ability.isPossible()).to.equal(true);
    expect(ability.getTargetingMode()).to.equal(null);
    expect(ability.getAccuracyBonus()).to.equal(1);
    expect(ability.getDamageBonus()).to.equal(1);
    expect(ability.getCooldown()).to.equal(0);
  });

  it("can't be executed without an execute function", function() {
    expect(() => Ability('Blank').execute()).to.throw('has no execute function');
  });

});
