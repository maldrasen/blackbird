describe.only('CockDescriber', function() {
  describe("buildFullDescription()", function() {

    it("describes humans", function() {
      const dude = CharacterFactory.build({ species:'human', gender:'male' });
      const description = CockDescriber(dude).buildFullDescription();

      console.log("=== Description ===")
      console.log(description);
    });

    it("describes humans with tiny cocks", function() {
      const dude = CharacterFactory.build({ species:'human', gender:'male', cock:{ size:'tiny' }});
      const description = CockDescriber(dude).buildFullDescription();

      console.log("=== Description ===")
      console.log(description);
    });

  });
});