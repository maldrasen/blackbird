describe("NegotiationRequest", function() {

  // The player fixture is a human with no natural mana, so give-me-mana is impossible until some is granted. The specs
  // that need the request to be possible grant 100 red mana, which makes the request ask for between 10 and 32.
  function bootPlayer() {
    BattleFixtures.prepareForBattle();
    return GameSystem.getState().getPlayer();
  }

  it('throws for an unknown request code', function() {
    expect(() => NegotiationRequest.lookup('give-me-liberty')).to.throw('Bad negotiation request code');
  });

  it('is repeatable unless the record says otherwise', function() {
    expect(NegotiationRequest.lookup('give-me-mana').isRepeatable()).to.equal(true);
  });

  describe("isPossible()", function() {
    it('is only possible once the player has mana to give', function() {
      const player = bootPlayer();
      const request = NegotiationRequest.lookup('give-me-mana');

      expect(request.isPossible({ P:player })).to.equal(false);

      BattleFixtures.grantMana('red', 100);
      expect(request.isPossible({ P:player })).to.equal(true);
    });
  });

  describe("getRequestParameters()", function() {
    it('draws a color the player has and rolls an amount from a tenth to a half of it', function() {
      const player = bootPlayer();
      BattleFixtures.grantMana('red', 100);
      const request = NegotiationRequest.lookup('give-me-mana');

      Random.stubBetween(10, 32);
      expect(request.getRequestParameters({ P:player })).to.deep.equal({ color:'red', amount:10 });
      expect(request.getRequestParameters({ P:player })).to.deep.equal({ color:'red', amount:32 });
    });

    it('never asks for more than 32 and only draws colors with mana in them', function() {
      const player = bootPlayer();
      BattleFixtures.grantMana('red', 100);
      BattleFixtures.grantMana('blue', 5);
      const request = NegotiationRequest.lookup('give-me-mana');

      Random.stubFrom('blue');
      Random.stubBetween(2);
      expect(request.getRequestParameters({ P:player })).to.deep.equal({ color:'blue', amount:2 });

      Random.stubFrom('green');
      expect(() => request.getRequestParameters({ P:player })).to.throw('was not within');
    });
  });

  describe("getRequestText()", function() {
    it('builds the request from the rolled parameters', function() {
      const player = bootPlayer();
      const text = NegotiationRequest.lookup('give-me-mana').getRequestText({ P:player }, { color:'red', amount:20 });
      expect(text).to.include('red mana');
    });
  });

  // Neither give-me-mana answer carries requirements, so both stay regardless of context.
  describe("getAnswers()", function() {
    it('keeps every answer when none carry requirements', function() {
      const answers = NegotiationRequest.lookup('give-me-mana').getAnswers({});
      expect(Object.keys(answers)).to.deep.equal(['yes','no']);
    });
  });

  describe("getAnswerText()", function() {
    it('returns string text as is and builds function text from the parameters', function() {
      const request = NegotiationRequest.lookup('give-me-mana');
      const parameters = { color:'red', amount:20 };

      expect(request.getAnswerText('no', {}, parameters)).to.equal('Refuse.');
      expect(request.getAnswerText('yes', {}, parameters)).to.include('20 red mana');
    });
  });

  describe("resolveAnswerReaction()", function() {
    it('spends the mana and returns the respect reaction when the request is granted', function() {
      const player = bootPlayer();
      BattleFixtures.grantMana('red', 100);
      const request = NegotiationRequest.lookup('give-me-mana');

      const reaction = request.resolveAnswerReaction('yes', { P:player }, { color:'red', amount:20 });
      expect(reaction.type).to.equal('feelings');
      expect(reaction.feelings).to.deep.equal(Reaction.getFeelings('respect'));
      expect(ManaComponent.lookup(player).red).to.deep.equal({ current:80, max:100 });
    });

    it('throws rather than overspending when the parameters outrun the pool', function() {
      const player = bootPlayer();
      BattleFixtures.grantMana('red', 10);
      const request = NegotiationRequest.lookup('give-me-mana');

      expect(() => request.resolveAnswerReaction('yes', { P:player }, { color:'red', amount:20 })).to.throw(`doesn't have 20 red mana`);
      expect(ManaComponent.lookup(player).red).to.deep.equal({ current:10, max:10 });
    });

    it('keeps the mana and returns the disrespect reaction when the request is refused', function() {
      const player = bootPlayer();
      BattleFixtures.grantMana('red', 100);
      const request = NegotiationRequest.lookup('give-me-mana');

      const reaction = request.resolveAnswerReaction('no', { P:player }, { color:'red', amount:20 });
      expect(reaction.type).to.equal('feelings');
      expect(reaction.feelings).to.deep.equal(Reaction.getFeelings('disrespect'));
      expect(ManaComponent.lookup(player).red).to.deep.equal({ current:100, max:100 });
    });
  });

});
