describe("BreastDescriber", function() {

  it("describes tiny and flat breasts", function() {

    console.log('=== Flat Chest ===');
    for (let i=0; i<10; i++) {
      const ava = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.sylph, triggers:['flat-chest'] });
      const breasts = BreastsComponent.lookup(ava);
      const description = Weaver({ C:ava }).weave(BreastsDescriber.getTemplate(ava));
      console.log(`${breasts.breastShape} | ${breasts.absoluteBreastVolume}ml`);
      console.log(`   ${description}\n`);
    }

  });

});
