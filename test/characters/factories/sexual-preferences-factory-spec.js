describe("SexualPreferencesFactory", function() {

  afterEach(function() { CharacterFactory.endBuild(); });

  it("applies triggers", function() {
    const state = CharacterFactory.startBuild({
      species: SpeciesCode.elf,
      gender: Gender.female,
      triggers: ['rope-bunny[50]'],
    });
    state.setPersonality({ archetype:ArchetypeCode.serious });
    state.setSexualPreferences({});

    SexualPreferencesFactory.makeAdjustments();

    expect(state.getSexualPreferences()['rope-bunny']).to.be.within(40,60);
  });

  it("applies species preferences", function() {
    const state = CharacterFactory.startBuild({
      species: SpeciesCode.havlin,
      gender: Gender.female,
      triggers: [],
    });
    state.setPersonality({ archetype:ArchetypeCode.reserved });
    state.setSensitivities({ pussy:2, cervix:1 });
    state.setSexualPreferences({});

    Random.stubRoll(1,2,3,4,5,6,7,8);
    SexualPreferencesFactory.makeAdjustments();
    const preferences = state.getSexualPreferences();

    expect(preferences['size-queen']).to.equal(22);
    expect(preferences['cervix-slut']).to.equal(16);
    expect(preferences['gape-queen']).to.equal(24);
    expect(preferences['perverted']).to.equal(-22);
  });

  // There's no telling what this will actually do. There's a bit too much
  // randomness to stub out without this being completely fragile. Just make
  // sure this doesn't blow up and check what the preferences look like if
  // there's a problem I guess.
  it("randomly adds sexual preferences for the archetype", function() {
    const state = CharacterFactory.startBuild({
      species: SpeciesCode.nymph,
      gender: Gender.female,
      triggers: [],
    });
    state.setPersonality({ archetype:ArchetypeCode.slut });
    state.setSensitivities({ pussy:2, breasts:2 });
    state.setSexualPreferences({});

    SexualPreferencesFactory.makeAdjustments();
  });

  it("removes preferences when the character is a prude or innocent", function() {
    const state = CharacterFactory.startBuild({
      species: SpeciesCode.nymph,
      gender: Gender.female,
      triggers: ['cock-lover[20]','exhibitionist[30]','gynophilic[60]','androphilic[-30]'],
    });
    state.setPersonality({ archetype:ArchetypeCode.innocent });
    state.setSensitivities({ pussy:2, breasts:2 });
    state.setSexualPreferences({});

    SexualPreferencesFactory.makeAdjustments();
    const preferences = state.getSexualPreferences();

    expect(Object.keys(preferences).length).to.equal(2);
    expect(preferences.gynophilic).to.be.lessThan(60);
    expect(preferences.androphilic).to.be.lessThan(-20);
  });

  it("Adds perversions when character is perverted", function() {
    const state = CharacterFactory.startBuild({
      species: SpeciesCode.lupin,
      gender: Gender.female,
      triggers: [],
    });
    state.setPersonality({ archetype:ArchetypeCode.pervert });
    state.setSensitivities({ pussy:2, breasts:2 });
    state.setSexualPreferences({});

    SexualPreferencesFactory.makeAdjustments();

    // Perverted must add at least two preferences but probably a lot more.
    expect(Object.keys(state.getSexualPreferences()).length).to.be.greaterThan(1);
  });

});
