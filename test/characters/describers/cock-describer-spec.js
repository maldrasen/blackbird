describe('CockDescriber', function() {
  describe("buildFullDescription()", function() {

    it.only("describes humans", function() {
      const dude = CharacterFactory.build({ species:'human', gender:'male' });
      const description = CockDescriber(dude).buildFullDescription();

      console.log("=== Description ===")
      console.log(description);
    });

  });
});