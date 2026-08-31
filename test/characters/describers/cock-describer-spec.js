describe('CockDescriber', function() {
  describe("buildFullDescription()", function() {

    // TODO: Not much that can be tested with these. We should at least test the description for weaver error and
    //       warning messages. Mostly this is a "print the description to the console" kind of spec.

    it("describes humans with tiny cocks", function() {
      const dude = CharacterFactory.build({ species:'human', gender:'male', cock:{ size:'tiny' }});
      const description = CockDescriber(dude).buildFullDescription();
    });

    it("describes humans with small cocks", function() {
      const dude = CharacterFactory.build({ species:'human', gender:'male', cock:{ size:'small' }});
      const description = CockDescriber(dude).buildFullDescription();
    });

    it("describes humans with average cocks", function() {
      const dude = CharacterFactory.build({ species:'human', gender:'male', cock:{ size:'average' }});
      const description = CockDescriber(dude).buildFullDescription();
    });

    it("describes humans with big cocks", function() {
      const dude = CharacterFactory.build({ species:'human', gender:'male', cock:{ size:'big' }});
      const description = CockDescriber(dude).buildFullDescription();
    });

    it("describes humans with huge cocks", function() {
      const dude = CharacterFactory.build({ species:'human', gender:'male', cock:{ size:'huge' }});
      const description = CockDescriber(dude).buildFullDescription();
    });

  });
});