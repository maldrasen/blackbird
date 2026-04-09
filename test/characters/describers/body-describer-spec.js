describe.only("BodyDescriber", function() {

  function log(message) {
    console.log(message);
  }

  it("describes species", function() {
    log(`=== Species ===`);
    for (let i=0; i<10; i++) {
      const shadow = CharacterFactory.build({ });
      const description = BodyDescriber.describeSpecies(shadow);
      log(Weaver({ C:shadow }).weave(description.text));
    }
  });

  it("describes height", function() {
    log(`=== Height ===`);
    for (let i=0; i<10; i++) {
      const shadow = CharacterFactory.build({ });
      const description = BodyDescriber.describeHeight(shadow);
      log(Weaver({ C:shadow }).weave(description.text));
    }
  });

});
