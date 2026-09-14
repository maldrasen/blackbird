describe.only("Ability.UseArticle", function() {

  // The tosser joins the runt pack in the back rank, behind the blast a blasto thrown at the front of the party
  // makes. Nothing is stubbed: a blasto's fire always leaves a mark on its target.
  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

    const tosser = MonsterFactory('kobold-tosser').build();
    BattleSystem.getState().addMonster(tosser, 'M.1.2');

    return tosser;
  }

  function setHealth(id, current) {
    const health = HealthComponent.lookup(id);
    health.maxHealth = 100;
    health.currentHealth = current;
    HealthComponent.update(id, health);
  }

  it("rejects an unknown article", function() {
    expect(() => Ability.UseArticle({ article:'no-such-article' })).to.throw('Bad consumable code');
  });

  it("is named for its article and carries the monster's cooldown and priority", function() {
    const ability = Ability.UseArticle({ article:'blasto', cooldown:5000, priority:100 });

    expect(ability.getName()).to.equal('Use Blasto');
    expect(ability.getCooldown()).to.equal(5000);
    expect(ability.getPriority()).to.equal(100);
    expect(ability.getDetails()).to.deep.equal({ article:'blasto' });
    expect(ability.isPossible()).to.equal(true);
  });

  it("targets an enemy for a thrown article and nobody for one taken by the user", function() {
    expect(Ability.UseArticle({ article:'blasto' }).getTargetingMode()).to.equal(TargetingMode.anyEnemy);
    expect(Ability.UseArticle({ article:'crimson-tear' }).getTargetingMode()).to.equal(null);
  });

  it("takes a fixed time to use and applies the article around the target", function() {
    const tosser = startBattle();
    const state = BattleSystem.getState();
    const target = state.getEntityAtPosition('P.0.2');
    const ability = Ability.UseArticle({ article:'blasto' });

    setHealth(target, 100);
    BattleSystem.specRound(tosser, { target });
    ability.execute();

    const round = BattleSystem.getRound();
    expect(round.getAbility()).to.equal(ability);
    expect(round.getTime()).to.equal(Math.ceil(750 * round.getSpeedFactor()));
    expect(round.getMessages()[0].text).to.include('flash of light');
    expect(HealthComponent.lookup(target).currentHealth).to.be.lessThan(100);
  });

});
