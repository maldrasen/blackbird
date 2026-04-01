describe("BodyDescriber", function() {

  function log(message) {
    console.log(message);
  }


  it("describes height", function() {
    log(`=== Height ===`)
    for (let i=0; i<10; i++) {
      const elf = CharacterFactory.build({ });
      const description = BodyDescriber.describeHeight(elf);
      log(Weaver({ C:elf }).weave(description.text));
    }

  })

});
