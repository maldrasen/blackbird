describe("SexualHistoryFactory", function() {
  it('when innocent', function() {
    const firsts = SexualHistoryFactory.build({
      personality:{ archetype:ArchetypeCode.innocent },
    }).firsts;

    expect(Object.keys(firsts).length).to.equal(0)
  });

  it('when androphobic', function() {
    let firsts = SexualHistoryFactory.build({
      personality:{ archetype:ArchetypeCode.slut },
      sensitivities:{ cock:10, pussy:10 },
      sexualPreferences:{ androphilic:-90, gynophilic:20 },
    }).firsts;

    expect(firsts.anal).to.be.undefined;
    expect(firsts.cock).to.equal('UNKNOWN');
  });

  it('with positive preferences', function() {
    let firsts = SexualHistoryFactory.build({
      personality:{ archetype:ArchetypeCode.slut },
      sensitivities:{ pussy:10 },
      sexualPreferences:{ androphilic:10, gynophilic:10, 'cock-lover':60, 'cum-dump':60 },
    }).firsts;

    expect(firsts.cock).to.be.undefined;
    expect(firsts.pussy).to.equal('UNKNOWN');
  });
});
