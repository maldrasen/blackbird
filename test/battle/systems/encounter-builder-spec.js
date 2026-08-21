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
    it("centers the monster in the front rank", function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ monster:'kobold-runt', ambushState:'normal' });

      const state = BattleSystem.getState();
      expect(state.getActiveMonsters().length).to.equal(1);
      expect(MonsterComponent.lookup(state.getEntityAtPosition('M',0,2)).code).to.equal('kobold-runt');
    });

    it("places even a back preferring monster in the front rank", function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ monster:'kobold-tosser', ambushState:'normal' });

      const state = BattleSystem.getState();
      expect(state.getActiveMonsters().length).to.equal(1);
      expect(MonsterComponent.lookup(state.getEntityAtPosition('M',0,2)).code).to.equal('kobold-tosser');
      expect(state.getEntityAtPosition('M',1,2)).to.be.null;
    });
  });

  describe("chooseCohort()", function() {

    function minimumCost(code) {
      const cohort = Cohort.lookup(code);
      const cheapest = Math.min(...cohort.getMonsters().map(monster => EssenceData[monster].average));
      return (cohort.getMinimum() || 1) * cheapest;
    }

    function costSortedCohorts() {
      return Cohort.getAllCodes().sort((a,b) => minimumCost(a) - minimumCost(b));
    }

    it("throws without a list of cohorts", function() {
      expect(() => EncounterBuilder.chooseCohort(null, 150)).to.throw(/without cohorts/);
      expect(() => EncounterBuilder.chooseCohort([], 150)).to.throw(/without cohorts/);
    });

    it("offers a viable cohort to the random pick", function() {
      const cohorts = costSortedCohorts();
      const target = (minimumCost(cohorts[0]) + minimumCost(cohorts[cohorts.length-1])) / 2;

      Random.stubFrom(cohorts[0]);
      expect(EncounterBuilder.chooseCohort(cohorts, target).getCode()).to.equal(cohorts[0]);
    });

    it("does not offer a cohort that cannot field its minimum group within the target", function() {
      const cohorts = costSortedCohorts();
      const priciest = cohorts[cohorts.length-1];
      const target = (minimumCost(cohorts[0]) + minimumCost(priciest)) / 2;

      Random.stubFrom(priciest);
      expect(() => EncounterBuilder.chooseCohort(cohorts, target)).to.throw(/not within/);
    });

    it("falls back to the full list when no cohort is viable", function() {
      const cohorts = costSortedCohorts();
      const priciest = cohorts[cohorts.length-1];

      Random.stubFrom(priciest);
      expect(EncounterBuilder.chooseCohort(cohorts, 1).getCode()).to.equal(priciest);
    });
  });

  describe("selectMonsters()", function() {

    it("draws the only type until the total lands closest to the target", function() {
      const cohort = Cohort.lookup('daggermaws');
      const average = EssenceData['lesser-daggermaw'].average;

      expect(EncounterBuilder.selectMonsters(cohort, average * 3.4).length).to.equal(3);
      expect(EncounterBuilder.selectMonsters(cohort, average * 3.6).length).to.equal(4);
    });

    it("always fields at least one monster even when the budget is too small", function() {
      const monsters = EncounterBuilder.selectMonsters(Cohort.lookup('daggermaws'), 10);
      expect(monsters).to.deep.equal(['lesser-daggermaw']);
    });

    it("adds the cheapest type until the minimum group size is met", function() {
      const monsters = EncounterBuilder.selectMonsters(Cohort.lookup('skitterfangs'), 10);
      expect(monsters).to.deep.equal(['rabid-skitterfang','rabid-skitterfang','rabid-skitterfang']);
    });

    it("stops at the cohort's maximum group size", function() {
      const average = EssenceData['lesser-daggermaw'].average;
      const monsters = EncounterBuilder.selectMonsters(Cohort.lookup('daggermaws'), average * 20);
      expect(monsters.length).to.equal(5);
    });

    it("never puts more than three base types in a group", function() {
      for (let i=0; i<20; i++) {
        const monsters = EncounterBuilder.selectMonsters(Cohort.lookup('deepdark-kobolds'), 2000);
        expect(new Set(monsters).size).to.be.at.most(BattleConstants.maxEncounterTypes);
      }
    });

    it("keeps the essence spread of the group within the ratio", function() {
      for (let i=0; i<20; i++) {
        const monsters = EncounterBuilder.selectMonsters(Cohort.lookup('deepdark-kobolds'), 600);
        const averages = [...new Set(monsters)].map(code => EssenceData[code].average);
        expect(Math.max(...averages)).to.be.at.most(Math.min(...averages) * BattleConstants.essenceSpreadRatio);
      }
    });
  });

  describe("buildFromRecordData()", function() {
    it("resolves the formation grid and builds the monsters at their positions", function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'negotiation-fixture-1', ambushState:'normal' });

      EncounterBuilder.buildFromRecordData([
        [1,0,0,0,1],
        [2,0,0,0,2],
      ],{
        1: { code:'kobold-runt' },
        2: { code:'kobold-tosser' },
      });

      const state = BattleSystem.getState();
      expect(state.getActiveMonsters().length).to.equal(5);
      expect(MonsterComponent.lookup(state.getEntityAtPosition('M',0,0)).code).to.equal('kobold-runt');
      expect(MonsterComponent.lookup(state.getEntityAtPosition('M',1,0)).code).to.equal('kobold-tosser');
      expect(state.getEntityAtPosition('M',1,1)).to.be.null;
    });
  });

});
