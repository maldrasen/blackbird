describe("BreastDescriber", function() {

  function log(message) {
    // console.log(message);
  }

  it("describes tiny and flat breasts", function() {
    log('=== Flat Chest ===');
    for (let i=0; i<10; i++) {
      const jada = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.sylph, triggers:['flat-chest'] });
      const breasts = BreastsComponent.lookup(jada);
      const description = Weaver({ C:jada }).weave(BreastsDescriber.getTemplate(jada));
      log(`${breasts.breastShape} | ${breasts.absoluteBreastVolume}ml`);
      log(`   ${description}\n`);
    }
  });

  it("describes small breasts", function() {
    log('=== Small Breasts ===');
    for (let i=0; i<10; i++) {
      const jada = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.sylph, triggers:['small-tits'] });
      const breasts = BreastsComponent.lookup(jada);
      const description = Weaver({ C:jada }).weave(BreastsDescriber.getTemplate(jada));
      log(`${breasts.breastShape} | ${breasts.absoluteBreastVolume}ml`);
      log(`   ${description}\n`);
    }
  });

  it("describes average breasts", function() {
    log('=== Average Breasts ===');
    for (let i=0; i<10; i++) {
      const jada = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.sylph, triggers:['average-tits'] });
      const breasts = BreastsComponent.lookup(jada);
      const description = Weaver({ C:jada }).weave(BreastsDescriber.getTemplate(jada));
      log(`${breasts.breastShape} | ${breasts.absoluteBreastVolume}ml`);
      log(`   ${description}\n`);
    }
  });

  it("describes big breasts", function() {
    log('=== Big Breasts ===');
    for (let i=0; i<10; i++) {
      const jada = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.sylph, triggers:['big-tits'] });
      const breasts = BreastsComponent.lookup(jada);
      const description = Weaver({ C:jada }).weave(BreastsDescriber.getTemplate(jada));
      log(`${breasts.breastShape} | ${breasts.absoluteBreastVolume}ml`);
      log(`   ${description}\n`);
    }
  });

  it("describes huge breasts", function() {
    log('=== Huge Breasts ===');
    for (let i=0; i<10; i++) {
      const jada = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.sylph, triggers:['huge-tits'] });
      const breasts = BreastsComponent.lookup(jada);
      const description = Weaver({ C:jada }).weave(BreastsDescriber.getTemplate(jada));
      log(`${breasts.breastShape} | ${breasts.absoluteBreastVolume}ml`);
      log(`   ${description}\n`);
    }
  });

});
