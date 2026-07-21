describe("HealthComponent", function() {

  it("allows negative health", function() {
    const id = CharacterFixtures.genericMale({ actor: { species:'human' }});
    HealthComponent.update(id, { currentHealth:-10 });
    expect(HealthComponent.lookup(id).currentHealth).to.equal(-10);
  });

  it("clamps health to the maximum", function() {
    const id = CharacterFixtures.genericMale({ actor: { species:'human' }});
    HealthComponent.update(id, { currentHealth:150, maxHealth:100 });
    expect(HealthComponent.lookup(id).currentHealth).to.equal(100);
  });

  it("clamps stamina to zero", function() {
    const id = CharacterFixtures.genericMale({ actor: { species:'human' }});
    HealthComponent.update(id, { currentStamina:-5 });
    expect(HealthComponent.lookup(id).currentStamina).to.equal(0);
  });

  it("clamps stamina to the maximum", function() {
    const id = CharacterFixtures.genericMale({ actor: { species:'human' }});
    HealthComponent.update(id, { currentStamina:999999 });
    expect(HealthComponent.lookup(id).currentStamina).to.equal(Math.floor(Attributes(id).getMaxStamina()));
  });

});
