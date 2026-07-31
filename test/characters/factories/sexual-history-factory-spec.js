describe("SexualHistoryFactory", function() {

  afterEach(function() { CharacterFactory.endBuild(); });

  it('when innocent', function() {
    const state = CharacterFactory.startBuild({
      species: SpeciesCode.human,
      gender: Gender.female,
      triggers: [],
    });
    state.setPersonality({ archetype:ArchetypeCode.innocent });

    SexualHistoryFactory.build();
    const firsts = state.getSexualHistory().firsts;

    expect(Object.keys(firsts).length).to.equal(0)
  });

  it('when androphobic', function() {
    const state = CharacterFactory.startBuild({
      species: SpeciesCode.human,
      gender: Gender.female,
      triggers: [],
    });
    state.setPersonality({ archetype:ArchetypeCode.slut });
    state.setSensitivities({ cock:10, pussy:10 });
    state.setSexualPreferences({ androphilic:-100, gynophilic:50 });

    Random.stubRoll(50,50,50,50,50,1000);
    SexualHistoryFactory.build();
    const firsts = state.getSexualHistory().firsts;

    expect(firsts.anal).to.be.undefined;
    expect(firsts.cock).to.equal('UNKNOWN');
  });

  it('with positive preferences', function() {
    const state = CharacterFactory.startBuild({
      species: SpeciesCode.human,
      gender: Gender.female,
      triggers: [],
    });
    state.setPersonality({ archetype:ArchetypeCode.slut });
    state.setSensitivities({ pussy:10 });
    state.setSexualPreferences({ androphilic:10, gynophilic:10, 'cock-lover':75, 'cum-dump':75 });

    Random.stubRoll(50,50,50,50,50,1000);
    SexualHistoryFactory.build();
    const firsts = state.getSexualHistory().firsts;

    expect(firsts.cock).to.be.undefined;
    expect(firsts.pussy).to.equal('UNKNOWN');
  });
});
