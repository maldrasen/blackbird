describe("BreastDescriber", function() {

  const UNRESOLVED = /weaver-warning|weaver-error|\[/;

  function log(message) {
    // console.log(message);
  }

  // Builds ten characters with the trigger, weaves each one's breast description, and checks that nothing was left
  // unresolved. Flip the log() above on to eyeball the prose.
  function describeTen(title, trigger) {
    log(`=== ${title} ===`);
    for (let i=0; i<10; i++) {
      const jada = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.sylph, triggers:[trigger] });
      const breasts = BreastsComponent.lookup(jada);
      const description = Weaver({ C:jada }).weave(BreastsDescriber.getTemplate(jada));
      log(`${breasts.breastShape} | ${breasts.relativeBreastVolume}ml`);
      log(`   ${description}\n`);
      expect(description, `${breasts.breastShape} ${breasts.relativeBreastVolume}ml`).to.not.match(UNRESOLVED);
    }
  }

  it("describes tiny and flat breasts", function() { describeTen('Flat Chest','flat-chest'); });
  it("describes small breasts", function() { describeTen('Small Breasts','small-tits'); });
  it("describes average breasts", function() { describeTen('Average Breasts','average-tits'); });
  it("describes big breasts", function() { describeTen('Big Breasts','big-tits'); });
  it("describes huge breasts", function() { describeTen('Huge Breasts','huge-tits'); });

});
