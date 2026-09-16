describe("Ability.Hide", function() {

  // The fixture party puts a rogue with the stealth skill at P.1.2. The runt pack has a single rank, so the only
  // observer of that position is the kobold at M.0.2.
  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  // finishCharacterRound() requires the acting entity to be next in the turn order.
  function startRound(acting) {
    BattleSystem.getState().moveToTopOfTurnOrder({ type:'character', id:acting });
    BattleSystem.specRound(acting);
  }

  function setAttribute(id, code, value) {
    const attributes = AttributesComponent.lookup(id);
    attributes[code] = value;
    AttributesComponent.update(id, attributes);
  }

  function setSkill(id, code, value) {
    const skills = SkillsComponent.lookup(id);
    skills[code] = value;
    SkillsComponent.update(id, skills);
  }

  it("carries a monster's priority", function() {
    expect(Ability.Hide().getPriority()).to.equal(50);
    expect(Ability.Hide({ priority:70 }).getPriority()).to.equal(70);
  });

  describe("isPossible()", function() {
    it("is possible for a stealthy character in the back rank", function() {
      const state = startBattle();
      startRound(state.getEntityAtPosition('P.1.2'));

      expect(Ability.Hide().isPossible()).to.equal(true);
    });

    it("is not possible from the front rank", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');

      setSkill(player, 'stealth', 10);
      startRound(player);

      expect(Ability.Hide().isPossible()).to.equal(false);
    });

    it("is not possible without the stealth skill", function() {
      const state = startBattle();
      const rogue = state.getEntityAtPosition('P.1.2');

      setSkill(rogue, 'stealth', 0);
      startRound(rogue);

      expect(Ability.Hide().isPossible()).to.equal(false);
    });

    it("is not possible while already hidden", function() {
      const state = startBattle();
      const rogue = state.getEntityAtPosition('P.1.2');

      BattleSystem.addStatus(rogue, 'hidden');
      startRound(rogue);

      expect(Ability.Hide().isPossible()).to.equal(false);
    });
  });

  // The rolls are pushed to their extremes instead of stubbed: the lowest possible stealth roll of a master still
  // beats the highest check a dim observer can make, and the reverse holds for a clumsy novice against a genius.
  describe("execute()", function() {
    it("hides in the shadows when no observer beats the stealth roll", function() {
      const state = startBattle();
      const rogue = state.getEntityAtPosition('P.1.2');
      const kobold = state.getEntityAtPosition('M.0.2');
      const ability = Ability.Hide();

      setSkill(rogue, 'stealth', 100);
      setAttribute(rogue, Attrib.dexterity, 100);
      setAttribute(kobold, Attrib.intelligence, 1);
      startRound(rogue);
      ability.execute();

      const round = BattleSystem.getRound();
      expect(round.getAbility()).to.equal(ability);
      expect(round.getTarget()).to.equal(null);
      expect(round.getMessages()[0].text).to.include('hides in the shadows');
      expect(StatusEffects(rogue).hasHidden()).to.equal(true);
    });

    it("is spotted when an observer's intelligence check beats the stealth roll", function() {
      const state = startBattle();
      const rogue = state.getEntityAtPosition('P.1.2');
      const kobold = state.getEntityAtPosition('M.0.2');

      setSkill(rogue, 'stealth', 1);
      setAttribute(rogue, Attrib.dexterity, 1);
      setAttribute(kobold, Attrib.intelligence, 100);
      startRound(rogue);
      Ability.Hide().execute();

      expect(BattleSystem.getRound().getMessages()[0].text).to.include('spots');
      expect(StatusEffects(rogue).hasHidden()).to.equal(false);
    });
  });

});
