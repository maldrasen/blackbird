describe("SexualPreferencesFactory", function() {

  it("applies triggers", function() {
    const preferences = {};

    SexualPreferencesFactory.makeAdjustments(preferences,{
      actor:{ species:'elf' },
    },['rope-bunny[50]']);

    expect(preferences['rope-bunny']).to.be.within(40,60);
  });

  it("applies species preferences", function() {
    Random.stubRoll(1,2,3,4,5,6,7,8);
    const preferences = {};

    SexualPreferencesFactory.makeAdjustments(preferences,{
      actor:{ gender:Gender.female, species:'halfling' },
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
    },[]);

    const doms = ['dominant','sadistic','debaser'].filter(code => preferences[code] > 0);
    const subs = ['submissive','masochistic','humiliation-slut'].filter(code => preferences[code] > 0);

    expect(doms.length).to.equal(0);
    expect(subs.length).to.be.within(1,3);
  });

});
