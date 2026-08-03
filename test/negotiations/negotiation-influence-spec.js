describe("NegotiationInfluence", function() {

  // Contestants default to level 100 in conversation so that each SkillCheck consumes exactly two between values, the
  // crit roll then the value roll, without an improve roll.
  function contestant(conversation=100) {
    const id = Registry.createEntity();
    AttributesComponent.create(id, { strength:10, dexterity:10, vitality:10, intelligence:10, beauty:10 });

    const skills = {};
    SkillsComponent.getSkills().forEach(code => { skills[code] = 0; });
    skills.conversation = conversation;
    SkillsComponent.create(id, skills);

    return id;
  }

  function buildContext() { return { P:contestant(), T:contestant() }; }

  describe("moderateFeelings()", function() {
    it('amplifies positive and softens negative feelings when the player wins', function() {
      Random.stubBetween(50,6, 50,3);
      expect(NegotiationInfluence.moderateFeelings({ control:10, affection:-20 }, buildContext()))
        .to.deep.equal({ control:13, affection:-15 });
    });

    it('softens positive and amplifies negative feelings when the player loses', function() {
      Random.stubBetween(50,3, 50,6);
      expect(NegotiationInfluence.moderateFeelings({ control:10, affection:-20 }, buildContext()))
        .to.deep.equal({ control:8, affection:-25 });
    });

    it('gives ties to the player', function() {
      Random.stubBetween(50,5, 50,5);
      expect(NegotiationInfluence.moderateFeelings({ respect:30 }, buildContext()))
        .to.deep.equal({ respect:38 });
    });

    it('does not mutate the reaction feelings', function() {
      const feelings = { control:10, fear:-20 };

      Random.stubBetween(50,6, 50,3);
      NegotiationInfluence.moderateFeelings(feelings, buildContext());
      expect(feelings).to.deep.equal({ control:10, fear:-20 });
    });
  });

});
