describe("BattleDamageSystem", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });
    return BattleSystem.getState();
  }

  // The max is pinned as well, otherwise a randomly generated character can roll a max below the current health
  // we're setting and moderate() would clamp it back down.
  function setHealth(id, current) {
    const health = HealthComponent.lookup(id);
    health.maxHealth = 100;
    health.currentHealth = current;
    HealthComponent.update(id, health);
  }

  function setVitality(id, value) {
    const attributes = AttributesComponent.lookup(id);
    attributes.vitality = value;
    AttributesComponent.update(id, attributes);
  }

  it("knocks a character out at zero or below", function() {
    const state = startBattle();
    const target = state.getEntityAtPosition('P',1,2);
    setHealth(target, 5);
    setVitality(target, 15);

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:10 }});

    expect(HealthComponent.lookup(target).currentHealth).to.equal(-5);
    expect(state.isKnockedOut(target)).to.be.true;
    expect(state.isAlive(target)).to.be.true;
    expect(state.getKnockedOut()).to.deep.equal([target]);
    expect(state.getActiveCharacters().includes(target)).to.be.false;
    expect(state.getTurnOrder().map(entry => entry.id).includes(target)).to.be.false;
    expect(PartyConfiguration.getConfiguration()[target]).to.equal('P.1.2');
  });

  it("still only knocks a character out at exactly negative vitality", function() {
    const state = startBattle();
    const target = state.getEntityAtPosition('P',1,2);
    setHealth(target, 5);
    setVitality(target, 15);

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:20 }});

    expect(HealthComponent.lookup(target).currentHealth).to.equal(-15);
    expect(state.isKnockedOut(target)).to.be.true;
    expect(state.isAlive(target)).to.be.true;
  });

  it("kills a character below negative vitality", function() {
    const state = startBattle();
    const target = state.getEntityAtPosition('P',1,2);
    setHealth(target, 5);
    setVitality(target, 15);

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:21 }});

    expect(HealthComponent.lookup(target).currentHealth).to.equal(-16);
    expect(state.isKnockedOut(target)).to.be.false;
    expect(state.isAlive(target)).to.be.false;
    expect(PartyConfiguration.getConfiguration()[target]).to.be.undefined;
  });

  it("kills a monster at zero, clamping their health", function() {
    const state = startBattle();
    const target = state.getActiveMonsters()[0];

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:9999 }});

    expect(HealthComponent.lookup(target).currentHealth).to.equal(0);
    expect(state.isAlive(target)).to.be.false;
    expect(state.getDeadMonsters().includes(target)).to.be.true;
  });

  it("throws when damaging a target who is already down", function() {
    const state = startBattle();
    const target = state.getEntityAtPosition('P',1,2);
    setHealth(target, 5);
    setVitality(target, 15);

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:10 }});

    expect(() => {
      BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:10 }});
    }).to.throw('already down');
  });

});
