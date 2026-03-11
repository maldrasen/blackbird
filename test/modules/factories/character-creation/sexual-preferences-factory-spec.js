describe("SexualPreferencesFactory", function() {

  it("applies triggers", function() {
    const preferences = {};

    SexualPreferencesFactory.makeAdjustments(preferences,{
      actor:{ species:'elf' },
      personality:{ archetype:ArchetypeCode.serious },
    },['rope-bunny[50]']);

    expect(preferences['rope-bunny']).to.be.within(40,60);
  });

  it("applies species preferences", function() {
    Random.stubRoll(1,2,3,4,5,6,7,8);
    const preferences = {};

    SexualPreferencesFactory.makeAdjustments(preferences,{
      actor:{ gender:Gender.female, species:'halfling' },
      personality:{ archetype:ArchetypeCode.reserved },
      sensitivities:{ pussy:2, cervix:1 },
    },[]);

    expect(preferences['size-queen']).to.equal(22);
    expect(preferences['cervix-slut']).to.equal(16);
    expect(preferences['gape-queen']).to.equal(24);
    expect(preferences['perverted']).to.equal(-22);
  });

  it("applies dominated to kobolds and other gender dominated species", function() {
    const preferences = {};

    SexualPreferencesFactory.makeAdjustments(preferences,{
      actor:{ gender:Gender.female, species:'kobold' },
      personality:{ archetype:ArchetypeCode.koboldSub },
    },[]);

    const doms = ['dominant','sadistic','debaser'].filter(code => preferences[code] > 0);
    const subs = ['submissive','masochistic','humiliation-slut'].filter(code => preferences[code] > 0);

    expect(doms.length).to.equal(0);
    expect(subs.length).to.be.within(1,3);
  });

  // There's no telling what this will actually do. There's a bit too much
  // randomness to stub out without this being completely fragile. Just make
  // sure this doesn't blow up and check what the preferences look like if
  // there's a problem I guess.
  it("randomly adds sexual preferences for the archetype", function() {
    const preferences = {};

    SexualPreferencesFactory.makeAdjustments(preferences,{
      actor:{ gender:Gender.female, species:'nymph' },
      personality:{ archetype:ArchetypeCode.slut },
      sensitivities:{ pussy:2, breasts:2 },
    },[]);
  });

  it("removes preferences when the character is a prude or innocent", function() {
    const preferences = {};

    SexualPreferencesFactory.makeAdjustments(preferences,{
      actor:{ gender:Gender.female, species:'nymph' },
      personality:{ archetype:ArchetypeCode.innocent },
      sensitivities:{ pussy:2, breasts:2 },
    },['cock-lover[20]','exhibitionist[30]','gynophilic[60]','androphilic[-30]']);

    expect(Object.keys(preferences).length).to.equal(2);
    expect(preferences.gynophilic).to.be.lessThan(60);
    expect(preferences.androphilic).to.be.lessThan(-20);
  });

  it("Adds perversions when character is perverted", function() {
    const preferences = {};

    SexualPreferencesFactory.makeAdjustments(preferences,{
      actor:{ gender:Gender.female, species:'lupin' },
      personality:{ archetype:ArchetypeCode.pervert },
      sensitivities:{ pussy:2, breasts:2 },
    },[]);

    // Perverted must add at least two preferences but probably a lot more.
    expect(Object.keys(preferences).length).to.be.greaterThan(1);
  });

});
