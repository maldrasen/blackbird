describe('CockDescriber', function() {
  describe("buildFullDescription()", function() {

    it.only("describes humans with tiny cocks", function() {
      const dude = CharacterFactory.build({ species:'human', gender:'male', cock:{ size:'tiny' }});
      const description = CockDescriber(dude).buildFullDescription();

      console.log("=== Description ===")
      console.log(description);
    });

    it("describes humans with small cocks", function() {
      const dude = CharacterFactory.build({ species:'human', gender:'male', cock:{ size:'small' }});
      const description = CockDescriber(dude).buildFullDescription();

      console.log("=== Description ===")
      console.log(description);
    });

    it("describes humans with average cocks", function() {
      const dude = CharacterFactory.build({ species:'human', gender:'male', cock:{ size:'average' }});
      const description = CockDescriber(dude).buildFullDescription();

      console.log("=== Description ===")
      console.log(description);
    });

    it("describes humans with big cocks", function() {
      const dude = CharacterFactory.build({ species:'human', gender:'male', cock:{ size:'big' }});
      const description = CockDescriber(dude).buildFullDescription();

      console.log("=== Description ===")
      console.log(description);
    });

    it("describes humans with huge cocks", function() {
      const dude = CharacterFactory.build({ species:'human', gender:'male', cock:{ size:'huge' }});
      const description = CockDescriber(dude).buildFullDescription();

      console.log("=== Description ===")
      console.log(description);
    });

  });
});