describe("PartyConfiguration", function() {

  it('adding a character', function() {
    PartyConfiguration.setCharacter('horse', 'P.0.1');
    expect(PartyConfiguration.getConfiguration()['horse']).to.equal('P.0.1');
  });

  it('replacing a character', function() {
    PartyConfiguration.setCharacter('horse', 'P.1.1');
    PartyConfiguration.setCharacter('goat', 'P.1.1');
    expect(PartyConfiguration.getConfiguration()['goat']).to.equal('P.1.1');
    expect(PartyConfiguration.getConfiguration()).to.not.have.property('horse');
  });

  it('moving a character', function() {
    PartyConfiguration.setCharacter('horse','P.0.1');
    PartyConfiguration.setCharacter('horse','P.0.2');
    expect(PartyConfiguration.getConfiguration()['horse']).to.equal('P.0.2');
  });

  it('swapping a character', function() {
    PartyConfiguration.setCharacter('rabbit','P.0.1');
    PartyConfiguration.setCharacter('horse','P.0.2');
    PartyConfiguration.setCharacter('rabbit','P.0.2');

    expect(PartyConfiguration.getConfiguration()['horse']).to.equal('P.0.1');
    expect(PartyConfiguration.getConfiguration()['rabbit']).to.equal('P.0.2');
  });

});
