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

    function essenceFloor(code) {
      const cohort = Cohort.lookup(code);
      return cohort.getMinimum() * Math.min(...cohort.getMonsters().map(monster => EssenceData[monster].average));
    }

    function essenceCeiling(code) {
      const cohort = Cohort.lookup(code);
      return cohort.getMaximum() * Math.max(...cohort.getMonsters().map(monster => EssenceData[monster].average));
    }

    it("offers a viable cohort to the random pick", function() {
      const cohorts = Cohort.getAllCodes().sort((a,b) => essenceFloor(a) - essenceFloor(b));
      const target = (essenceFloor(cohorts[0]) + essenceFloor(cohorts[cohorts.length-1])) / 2;
      expect(essenceCeiling(cohorts[0])).to.be.at.least(target);

      Random.stubFrom(cohorts[0]);
      expect(EncounterBuilder.chooseCohort(cohorts, target).getCode()).to.equal(cohorts[0]);
    });

    it("does not offer a cohort that cannot field its minimum group within the target", function() {
      const cohorts = Cohort.getAllCodes().sort((a,b) => essenceFloor(a) - essenceFloor(b));
      const priciest = cohorts[cohorts.length-1];
      const target = (essenceFloor(cohorts[0]) + essenceFloor(priciest)) / 2;

      Random.stubFrom(priciest);
      expect(() => EncounterBuilder.chooseCohort(cohorts, target)).to.throw(/not within/);
    });

    it("does not offer a cohort too weak to fill the essence budget", function() {
      const cohorts = Cohort.getAllCodes().sort((a,b) => essenceCeiling(a) - essenceCeiling(b));
      const weakest = cohorts[0];
      const target = (essenceCeiling(weakest) + essenceCeiling(cohorts[cohorts.length-1])) / 2;
      expect(cohorts.some(code => essenceFloor(code) <= target && essenceCeiling(code) >= target)).to.equal(true);

      Random.stubFrom(weakest);
      expect(() => EncounterBuilder.chooseCohort(cohorts, target)).to.throw(/not within/);
    });

    it("throws when no cohort can fit the essence target", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);
      expect(() => EncounterBuilder.chooseCohort(Cohort.getAllCodes(), 1)).to.throw(/viable cohort/);
    });
  });

  describe("selectMonsters()", function() {

    it("draws the only type until the total lands closest to the target", function() {
      const cohort = Cohort.lookup('daggermaws');
      const average = EssenceData['lesser-daggermaw'].average;

      expect(EncounterBuilder.selectMonsters(cohort, average * 3.4).length).to.equal(3);
      expect(EncounterBuilder.selectMonsters(cohort, average * 3.6).length).to.equal(4);
    });

    it("builds a group of one when only a single monster fits the target", function() {
      const average = EssenceData['lesser-daggermaw'].average;
      const monsters = EncounterBuilder.selectMonsters(Cohort.lookup('daggermaws'), average);
      expect(monsters).to.deep.equal(['lesser-daggermaw']);
    });

    it("adds the cheapest type until the minimum group size is met", function() {
      const average = EssenceData['rabid-skitterfang'].average;
      const monsters = EncounterBuilder.selectMonsters(Cohort.lookup('skitterfangs'), average * 2.2);
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

    it("reserves anchor room for the minimum group so the total stays near the target", function() {
      for (let i=0; i<30; i++) {
        const monsters = EncounterBuilder.selectMonsters(Cohort.lookup('deepdark-kobolds'), 190);
        const total = monsters.reduce((sum,code) => sum + EssenceData[code].average, 0);
        expect(total, `[${monsters}]`).to.be.at.most(190 * 1.25);
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

  describe("arrangeFormation()", function() {

    it("centers a single monster in the front rank", function() {
      expect(EncounterBuilder.arrangeFormation(['kobold-tosser'])).to.deep.equal([
        [null,null,'kobold-tosser',null,null],
        [null,null,null,null,null],
      ]);
    });

    it("mirrors pairs of the same type around the most expensive monster", function() {
      const formation = EncounterBuilder.arrangeFormation([
        'kobold-dick-puncher','kobold-runt','kobold-runt','kobold-tosser','kobold-tosser',
      ]);

      expect(formation).to.deep.equal([
        [null,'kobold-runt','kobold-dick-puncher','kobold-runt',null],
        [null,'kobold-tosser',null,'kobold-tosser',null],
      ]);
    });

    it("promotes back preferring monsters when the front line is too thin", function() {
      const formation = EncounterBuilder.arrangeFormation([
        'kobold-trapper','kobold-tosser','kobold-tosser','kobold-tosser',
      ]);

      expect(formation).to.deep.equal([
        [null,'kobold-trapper','kobold-tosser',null,null],
        [null,'kobold-tosser','kobold-tosser',null,null],
      ]);
    });

    it("adds an extra monster over budget to hold the center of a mirrored front row", function() {
      const formation = EncounterBuilder.arrangeFormation([
        'kobold-trapper','kobold-trapper','kobold-runt','kobold-runt',
      ]);

      expect(formation).to.deep.equal([
        ['kobold-runt','kobold-trapper','kobold-runt','kobold-trapper','kobold-runt'],
        [null,null,null,null,null],
      ]);
    });

    it("splits an oversized group across both rows", function() {
      const skitterfang = 'rabid-skitterfang';
      expect(EncounterBuilder.arrangeFormation(Array(6).fill(skitterfang))).to.deep.equal([
        [skitterfang,skitterfang,skitterfang,skitterfang,skitterfang],
        [null,null,skitterfang,null,null],
      ]);
    });

    it("never leaves a back row monster unguarded or the front center empty", function() {
      for (let i=0; i<20; i++) {
        const monsters = EncounterBuilder.selectMonsters(Cohort.lookup('deepdark-kobolds'), 600);
        const formation = EncounterBuilder.arrangeFormation(monsters);
        expect(formation[0][2], `front center for [${monsters}]`).to.not.be.null;
        formation[1].forEach((code,position) => {
          if (code) { expect(formation[0][position], `back position ${position}`).to.not.be.null; }
        });
      }
    });
  });

  describe("build()", function() {
    it("builds a battle formation from the floor's cohorts", function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ cohorts:Cohort.getAllCodes(), essenceTarget:300, ambushState:'normal' });

      const state = BattleSystem.getState();
      const monsters = state.getActiveMonsters();
      expect(monsters.length).to.be.within(1,10);
      expect(state.getEntityAtPosition('M',0,2)).to.not.be.null;

      const codes = monsters.map(id => MonsterComponent.lookup(id).code);
      const home = Cohort.getAllCodes().find(cohort =>
        codes.every(code => Cohort.lookup(cohort).getMonsters().includes(code)));
      expect(home, `Monsters [${codes}] should all come from a single cohort`).to.not.be.undefined;

      monsters.forEach(id => {
        if (state.isInBack(id)) {
          const column = state.getPosition(id)[4];
          expect(state.getEntityAtPosition('M',0,column), `guard for column ${column}`).to.not.be.null;
        }
      });
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
