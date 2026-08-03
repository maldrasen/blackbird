describe("NegotiationInfluence", function() {

  // Contestants have level 100 conversation so that each SkillCheck consumes exactly two between values, the crit
  // roll then the value roll, without an improve roll. A contestant's check value works out to (value roll + brains/4)
  // times 3, so a brainy contestant against a dim one can produce margins past the 100 point cap.
  function contestant(brains=10) {
    const id = Registry.createEntity();
    AttributesComponent.create(id, { strength:10, dexterity:10, vitality:10, intelligence:brains, beauty:brains });

    const skills = {};
    SkillsComponent.getSkills().forEach(code => { skills[code] = 0; });
    skills.conversation = 100;
    SkillsComponent.create(id, skills);

    return id;
  }

  describe("moderateFeelings()", function() {
    it('doubles helping feelings and zeroes hurting ones on an overwhelming win', function() {
      Random.stubBetween(50,25, 50,2);
      expect(NegotiationInfluence.moderateFeelings({ control:10, affection:-20 }, { P:contestant(100), T:contestant() }))
        .to.deep.equal({ control:20, affection:0 });
    });

    it('zeroes helping feelings and doubles hurting ones on an overwhelming loss', function() {
      Random.stubBetween(50,2, 50,25);
      expect(NegotiationInfluence.moderateFeelings({ control:10, affection:-20 }, { P:contestant(), T:contestant(100) }))
        .to.deep.equal({ control:0, affection:-40 });
    });

    it('barely moderates a narrow win', function() {
      // A 3 point margin sits in the linear zone, giving a strength of 0.03.
      Random.stubBetween(50,4, 50,3);
      expect(NegotiationInfluence.moderateFeelings({ control:10, affection:-20 }, { P:contestant(), T:contestant() }))
        .to.deep.equal({ control:10, affection:-19 });
    });

    it('tapers off on the winning side', function() {
      // A 60 point margin (81 against 21) lands on the 0.85 exponent zone for a strength of 0.65.
      Random.stubBetween(50,2, 50,5);
      expect(NegotiationInfluence.moderateFeelings({ control:10, affection:-20 }, { P:contestant(100), T:contestant() }))
        .to.deep.equal({ control:16, affection:-7 });
    });

    it('falls off a cliff on the losing side', function() {
      // The same 60 point margin lost lands on the 1.5 exponent zone for a strength of -0.47.
      Random.stubBetween(50,5, 50,2);
      expect(NegotiationInfluence.moderateFeelings({ control:10, affection:-20 }, { P:contestant(), T:contestant(100) }))
        .to.deep.equal({ control:5, affection:-29 });
    });

    it('does not mutate the reaction feelings', function() {
      const feelings = { control:10, fear:-20 };

      Random.stubBetween(50,6, 50,3);
      NegotiationInfluence.moderateFeelings(feelings, { P:contestant(), T:contestant() });
      expect(feelings).to.deep.equal({ control:10, fear:-20 });
    });
  });

});
