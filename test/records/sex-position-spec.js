describe("SexPosition", function() {

  describe("getMoves() text generation", function() {

    function randomSetup() {
      const player = PlayerFactory.build({});
      const partner = CharacterFactory.build({});
      const attitude = Random.from(Object.values(Attitude));

      GameState.setPlayer(player);

      return Random.flipCoin() ? { A:player, B:partner, attitude:attitude } : { A:partner, B:player, attitude:attitude }
    }

    function spotCheck(code) {
      let attempts = 10;

      // TODO: Eventually we want to assert that the text has no weaver warnings or errors.

      while (attempts > 0) {
        const context = randomSetup();
        const move = Random.from(SexPosition.lookup(code).getMoves());
        const direction = Character(context.A).isPlayer() ? `A`:`B`;
        const key = `${direction}:[${code}->${move.code}|${context.attitude}]`;

        try {
          console.log(`${key} ${Weaver(context).weave(move.package.pick(context))}`);
          return;
        }
        catch(error) {
          attempts -= 1;
        }
      }

      throw new Error(`Unable to generate move text for ${code} after 10 attempts.`)
    }

    it('centipede', function() { spotCheck('centipede'); });
    it('cowgirl', function() { spotCheck('cowgirl'); });
    it('cowgirl-reversed', function() { spotCheck('cowgirl-reversed'); });
    it('doggy-style', function() { spotCheck('doggy-style'); });
    it('face-sitting', function() { spotCheck('face-sitting'); });
    it('face-sitting-reversed', function() { spotCheck('face-sitting-reversed'); });
    it('kneeling', function() { spotCheck('kneeling'); });
    it('kneeling-service', function() { spotCheck('kneeling-service'); });
    it('lap-sitting', function() { spotCheck('lap-sitting'); });
    it('lap-sitting-reversed', function() { spotCheck('lap-sitting-reversed'); });
    it('missionary', function() { spotCheck('missionary'); });
    it('missionary-reversed', function() { spotCheck('missionary-reversed'); });
    it('prone', function() { spotCheck('prone'); });
    it('sixty-nine', function() { spotCheck('sixty-nine'); });
    it('spooning', function() { spotCheck('spooning'); });
    it('standing', function() { spotCheck('standing'); });
    it('standing-reversed', function() { spotCheck('standing-reversed'); });
    it('straddle', function() { spotCheck('straddle'); });
  });

});