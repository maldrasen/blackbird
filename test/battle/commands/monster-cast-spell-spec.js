describe.only("MonsterCastSpell", function() {

  // The dual caster is the regression case for a monster with two abilities of the same kind: two cast spells with
  // different spells. The spec spells never actually go off, so they only need enough shape for Spell.lookup and the
  // casting time, and they're registered before the caster builds its abilities. The caster is added after the
  // battle starts so no initial cooldown roll is consumed, and the threat is pinned to keep the AI's target choice
  // deterministic.
  before(function() {
    Spell.register('spec-flare', { name:'Spec Flare', color:'red', manaCost:1, target:EffectTarget.enemyFormation, getEffects:() => { return []; } });
    Spell.register('spec-glimmer', { name:'Spec Glimmer', color:'red', manaCost:1, target:EffectTarget.enemyFormation, getEffects:() => { return []; } });

    BaseMonster.register('spec-dual-caster', {
      name: 'Spec Dual Caster',
      species: SpeciesCode.kobold,
      type: 'mage',
      level: 1,
      abilities: [
        Ability.CastSpell({ spell:'spec-flare', powerLevel:2, priority:80, cooldown:30000 }),
        Ability.CastSpell({ spell:'spec-glimmer', powerLevel:1, priority:70, cooldown:30000 }),
      ],
    });
  });

  function addCasterToBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

    const caster = MonsterFactory('spec-dual-caster').build();
    const state = BattleSystem.getState();

    state.addMonster(caster,'M.1.2');
    Monster(caster).populateThreatTable();
    Monster(caster).updateThreat(state.getEntityAtPosition('P',0,2), 999999);

    return caster;
  }

  function takeTurn(caster) {
    const state = BattleSystem.getState();
    state.setTurnOrder({ type:'monster', id:caster, time:0 });
    state.moveToTopOfTurnOrder({ type:'monster', id:caster });
    BattleSystem.advanceBattle();
  }

  it("starts casting the spell of its highest priority ability", function() {
    const caster = addCasterToBattle();
    const state = BattleSystem.getState();
    const target = state.getEntityAtPosition('P',0,2);

    takeTurn(caster);

    expect(state.isCastingSpell(caster)).to.equal(true);

    const spellData = state.finishCastingSpell();
    expect(spellData.code).to.equal('spec-flare');
    expect(spellData.powerLevel).to.equal(2);
    expect(spellData.target).to.equal(target);

    const round = BattleSystem.getRound();
    expect(round.getMessages()[0].text).to.include('begins casting');
    expect(round.getTime()).to.be.greaterThan(0);
  });

  it("puts only the cast ability on cooldown", function() {
    const caster = addCasterToBattle();
    const state = BattleSystem.getState();

    takeTurn(caster);

    expect(state.isOnCooldown(caster, Monster(caster).findAbility('Cast Spec Flare').getId())).to.equal(true);
    expect(state.isOnCooldown(caster, Monster(caster).findAbility('Cast Spec Glimmer').getId())).to.equal(false);
  });

  it("picks the other spell while the first is on cooldown", function() {
    const caster = addCasterToBattle();
    const state = BattleSystem.getState();

    state.setCooldown(caster, Monster(caster).findAbility('Cast Spec Flare').getId(), 99999);
    takeTurn(caster);

    expect(state.finishCastingSpell().code).to.equal('spec-glimmer');
  });

});
