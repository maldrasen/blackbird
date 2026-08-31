describe("EffectSystem", function() {

  // The runt pack puts kobold runts at M.0.1, M.0.2, and M.0.3, and the party fixtures fill P.0.2, P.0.3, P.1.2, and
  // P.1.3. The formation targets don't care what kind of record the effect source is, so these specs hand in stub
  // sources rather than coupling to a shipped consumable or spell.
  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  function stubSource(target) {
    return { getTarget: () => { return target; } };
  }

  describe("getAffectedEntities()", function() {
    it("targets the whole enemy formation from the party side", function() {
      const state = startBattle();
      BattleSystem.specRound(state.getEntityAtPosition('P',0,2));

      const affected = EffectSystem.getAffectedEntities(stubSource(EffectTarget.enemyFormation));
      const runts = ['M.0.1','M.0.2','M.0.3'].map(position => state.getEntityAtPosition(position));

      expect(affected).to.have.members(runts);
    });

    it("targets the whole enemy formation from the monster side", function() {
      const state = startBattle();
      BattleSystem.specRound(state.getEntityAtPosition('M',0,2));

      const affected = EffectSystem.getAffectedEntities(stubSource(EffectTarget.enemyFormation));
      const party = ['P.0.2','P.0.3','P.1.2','P.1.3'].map(position => state.getEntityAtPosition(position));

      expect(affected).to.have.members(party);
    });

    it("excludes downed entities from a formation", function() {
      const state = startBattle();
      state.setCondition(state.getEntityAtPosition('M',0,2), BattleCondition.dead);
      BattleSystem.specRound(state.getEntityAtPosition('P',0,2));

      const affected = EffectSystem.getAffectedEntities(stubSource(EffectTarget.enemyFormation));
      const standing = ['M.0.1','M.0.3'].map(position => state.getEntityAtPosition(position));

      expect(affected).to.have.members(standing);
    });

    it("targets the acting entity's own side with an ally formation target", function() {
      const state = startBattle();
      BattleSystem.specRound(state.getEntityAtPosition('P',0,2));

      const affected = EffectSystem.getAffectedEntities(stubSource(EffectTarget.allyFormation));
      const party = ['P.0.2','P.0.3','P.1.2','P.1.3'].map(position => state.getEntityAtPosition(position));

      expect(affected).to.have.members(party);
    });

    it("throws for a target it doesn't know", function() {
      startBattle();
      BattleSystem.specRound(BattleSystem.getState().getEntityAtPosition('P',0,2));

      expect(() => EffectSystem.getAffectedEntities(stubSource('everyone'))).to.throw('Bad effect target');
    });
  });

});
