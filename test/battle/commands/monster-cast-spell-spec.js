describe("MonsterCastSpell", function() {

  // The dual caster is the regression case for keyed ability entries: two monster-cast-spell entries with different
  // spells. The spec spells never actually go off, so they only need enough shape for Spell.lookup and the casting
  // time. The caster is added after the battle starts so no initial cooldown roll is consumed, and the threat is
  // pinned to keep the AI's target choice deterministic.
  before(function() {
    Spell.register('spec-flare', { name:'Spec Flare', color:'red', manaCost:1, target:EffectTarget.enemyFormation, getEffects:() => { return []; } });
    Spell.register('spec-glimmer', { name:'Spec Glimmer', color:'red', manaCost:1, target:EffectTarget.enemyFormation, getEffects:() => { return []; } });

    BaseMonster.register('spec-dual-caster', {
      name: 'Spec Dual Caster',
      species: SpeciesCode.kobold,
      type: 'mage',
      level: 1,
      prioritizedAbilities: [
        { code:'monster-cast-spell', key:'cast-flare', priority:80, spell:'spec-flare', powerLevel:2 },
        { code:'monster-cast-spell', key:'cast-glimmer', priority:70, spell:'spec-glimmer', powerLevel:1 },
      ],
    });
  });

  function addCasterToBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

    const caster = MonsterFactory('spec-dual-caster').build();
    BattleSystem.getState().addMonster(caster,'M.1.2');
    return caster;
  }

  it("starts casting the spell from its highest priority ability entry", function() {
    const caster = addCasterToBattle();
    const state = BattleSystem.getState();
    const target = state.getEntityAtPosition('P',0,2);

    Monster(caster).populateThreatTable();
    Monster(caster).updateThreat(target, 999999);

    state.setTurnOrder({ type:'monster', id:caster, time:0 });
    state.moveToTopOfTurnOrder({ type:'monster', id:caster });
    BattleSystem.advanceBattle();

    expect(state.isCastingSpell(caster)).to.equal(true);

    const spellData = state.finishCastingSpell();
    expect(spellData.code).to.equal('spec-flare');
    expect(spellData.powerLevel).to.equal(2);
    expect(spellData.target).to.equal(target);

    const round = BattleSystem.getRound();
    expect(round.getMessages()[0].text).to.include('begins casting');
    expect(round.getTime()).to.be.greaterThan(0);
  });

});
