describe("NegotiationQuestion", function() {

  // The player fixture is a male human, so the hasCock('P') answer stays and the hasNoCock('P') answer filters out.
  describe("getAnswers()", function() {
    it('filters out answers whose requirements fail', function() {
      BattleFixtures.prepareForBattle();
      const context = { P:GameSystem.getState().getPlayer() };

      const answers = NegotiationQuestion.lookup('how-do-you-murder').getAnswers(context);
      expect(Object.keys(answers)).to.deep.equal(['never','unknown','cruel','cock']);
    });

    it('keeps every answer when none carry requirements', function() {
      const answers = NegotiationQuestion.lookup('what-is-best').getAnswers({});
      expect(Object.keys(answers)).to.deep.equal(['bullshit','conan','comfort','cock']);
    });

    // The entertain answer offers up a female party member, so it only shows when the F reference was filled.
    it('filters answers gated on a party reference when the key is null', function() {
      const question = NegotiationQuestion.lookup('no-interest-in-men');

      const withGirl = question.getAnswers({ F:CharacterFixtures.genericFemale({}) });
      expect(Object.keys(withGirl)).to.deep.equal(['noNeed','entertain','dontCare','noUse']);

      const alone = question.getAnswers({ F:null });
      expect(Object.keys(alone)).to.deep.equal(['noNeed','dontCare','noUse']);
    });
  });

  // The negotiation-fixture-2 kobold-sneak-slut is pinned to the slut archetype so its style is lewd, and what-is-best
  // only has a lewd reaction with static requirements: the player must have a cock.
  describe("getReactionData()", function() {
    function bootMonster() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ monster:'kobold-sneak-slut', ambushState:'normal' });

      const monster = BattleSystem.getState().getActiveMonsters()[0];
      const personality = PersonalityComponent.lookup(monster);
      personality.archetype = ArchetypeCode.slut;
      PersonalityComponent.update(monster, personality);

      return monster;
    }

    it('returns the matching reaction when its static requirements pass', function() {
      const monster = bootMonster();
      const context = { P:GameSystem.getState().getPlayer(), T:monster };

      const reactionData = NegotiationQuestion.lookup('what-is-best').getReactionData(context);
      expect(reactionData.style).to.equal(NegotiationStyle.lewd);
    });

    it('excludes a reaction whose static requirements fail', function() {
      const monster = bootMonster();
      const context = { P:CharacterFixtures.genericFemale({}), T:monster };

      expect(NegotiationQuestion.lookup('what-is-best').getReactionData(context)).to.equal(null);
    });
  });

});
