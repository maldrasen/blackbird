describe("SexPosition", function() {

  describe("getMoves() text generation", function() {

    // Because there are so many possible permutations when changing position, we only spot check the position change
    // text. Given a position to change from, we randomly pick a new position from the possible moves, randomly put
    // characters into the context, and randomly pick the text from the package. With all this randomness, we'll
    // sometimes random ourselves into a situation that can't happen in real gameplay, so the textFor() function will
    // try again. If, after 10 trys, it can't find valid position text that indicates that there's a real problem with
    // that position. We also check to make sure that there are no weaver errors or warnings in the generated text.

    function spotCheck(code) {
      const text = textFor(code);
      if (text.includes('weaver-error')) { throw new Error(`SexPosition change weaver error: ${text}`); }
      if (text.includes('weaver-warning')) { throw new Error(`SexPosition change weaver warning: ${text}`); }
    }

    function randomSetup() {
      const player = PlayerFactory.build({});
      const partner = CharacterFactory.build({});
      const attitude = Random.from(Object.values(Attitude));

      GameSystem.getState().setPlayer(player);

      return Random.flipCoin() ? { A:player, B:partner, attitude:attitude } : { A:partner, B:player, attitude:attitude }
    }

    function textFor(code) {
      let attempts = 10;

      while (attempts > 0) {
        const context = randomSetup();
        const move = Random.from(SexPosition.lookup(code).getMoves());

        try {
          return Weaver(context).weave(move.package.pick(context));
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