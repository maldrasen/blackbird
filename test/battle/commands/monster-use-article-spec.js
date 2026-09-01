describe("MonsterUseArticle", function() {

  // The tosser is added after the battle starts so that no initial cooldown roll is consumed, leaving its
  // monster-use-article ability ready on its first turn. Pinning the threat keeps the AI's target choice
  // deterministic; everything else runs unstubbed, so the specs assert outcomes that hold for any rolls.
  function addTosserToBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

    const tosser = MonsterFactory('kobold-tosser').build();
    BattleSystem.getState().addMonster(tosser,'M.1.2');
    return tosser;
  }

  function setHealth(id, current) {
    const health = HealthComponent.lookup(id);
    health.maxHealth = 100;
    health.currentHealth = current;
    HealthComponent.update(id, health);
  }

  function getHealth(id) {
    return HealthComponent.lookup(id).currentHealth;
  }

  it("throws its article at the highest threat character, blasting the area around them", function() {
    const tosser = addTosserToBattle();
    const state = BattleSystem.getState();
    const target = state.getEntityAtPosition('P',1,2);

    ['P.0.2','P.0.3','P.1.2','P.1.3'].forEach(position => setHealth(state.getEntityAtPosition(position), 100));

    Monster(tosser).populateThreatTable();
    Monster(tosser).updateThreat(target, 999999);

    state.setTurnOrder({ type:'monster', id:tosser, time:0 });
    state.moveToTopOfTurnOrder({ type:'monster', id:tosser });
    BattleSystem.advanceBattle();

    const round = BattleSystem.getRound();
    expect(round.getAbility()).to.equal('monster-use-article');
    expect(round.getTarget()).to.equal(target);
    expect(state.isOnCooldown(tosser,'blasto')).to.equal(true);
    expect(round.getMessages()[0].text).to.include('flash of light');

    ['P.0.2','P.1.2','P.1.3'].forEach(position => {
      expect(getHealth(state.getEntityAtPosition(position)), position).to.be.lessThan(100);
    });
    expect(getHealth(state.getEntityAtPosition('P',0,3))).to.equal(100);
  });

});
