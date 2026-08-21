describe("EncounterBuilder", function() {

  describe("buildFromRecord()", function() {
    it("builds the record's monsters into the battle state", function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-2', ambushState:'normal' });

      const state = BattleSystem.getState();
      expect(state.getActiveMonsters().length).to.equal(7);

      const center = state.getEntityAtPosition('M',0,2);
      expect(MonsterComponent.lookup(center).code).to.equal('kobold-dick-puncher');

      expect(MonsterComponent.lookup(state.getEntityAtPosition('M',1,1)).code).to.equal('kobold-tosser');
      expect(state.getEntityAtPosition('M',1,0)).to.be.null;
    });
  });

  describe("buildFromMonster()", function() {
    it("centers a front preferring monster in the front rank", function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ monster:'kobold-runt', ambushState:'normal' });

      const state = BattleSystem.getState();
      expect(state.getActiveMonsters().length).to.equal(1);
      expect(MonsterComponent.lookup(state.getEntityAtPosition('M',0,2)).code).to.equal('kobold-runt');
    });

    it("centers a back preferring monster in the back rank", function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ monster:'kobold-tosser', ambushState:'normal' });

      const state = BattleSystem.getState();
      expect(state.getActiveMonsters().length).to.equal(1);
      expect(state.getEntityAtPosition('M',0,2)).to.be.null;
      expect(MonsterComponent.lookup(state.getEntityAtPosition('M',1,2)).code).to.equal('kobold-tosser');
    });
  });

  describe("buildFromRecordData()", function() {
    it("resolves the formation grid and builds the monsters at their positions", function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'negotiation-fixture-1', ambushState:'normal' });

      EncounterBuilder.buildFromRecordData([
        [0,0,0,0,0],
        [1,0,2,0,1],
      ],{
        1: { code:'kobold-runt' },
        2: { code:'kobold-tosser' },
      });

      const state = BattleSystem.getState();
      expect(state.getActiveMonsters().length).to.equal(4);
      expect(MonsterComponent.lookup(state.getEntityAtPosition('M',1,0)).code).to.equal('kobold-runt');
      expect(MonsterComponent.lookup(state.getEntityAtPosition('M',1,2)).code).to.equal('kobold-tosser');
      expect(state.getEntityAtPosition('M',1,1)).to.be.null;
    });
  });

});
