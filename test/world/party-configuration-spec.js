describe("PartyConfiguration", function() {

  it('adding a character', function() {
    PartyConfiguration.setCharacter('horse', 'P.0.1');
    expect(PartyConfiguration.getConfiguration()['P.0.1']).to.equal('horse');
  })

  it('replacing a character', function() {
    PartyConfiguration.setCharacter('horse', 'P.1.1');
    PartyConfiguration.setCharacter('goat', 'P.1.1');
    expect(PartyConfiguration.getConfiguration()['P.1.1']).to.equal('goat');
  });

  it('moving a character', function() {
    PartyConfiguration.setCharacter('horse','P.0.1');
    PartyConfiguration.setCharacter('horse','P.0.2');
    expect(PartyConfiguration.getConfiguration()['P.0.1']).to.be.null;
    expect(PartyConfiguration.getConfiguration()['P.0.2']).to.equal('horse');
  });

  it('swapping a character', function() {
    PartyConfiguration.setCharacter('rabbit','P.0.1');
    PartyConfiguration.setCharacter('horse','P.0.2');
    PartyConfiguration.setCharacter('rabbit','P.0.2');

    expect(PartyConfiguration.getConfiguration()['P.0.1']).to.equal('horse');
    expect(PartyConfiguration.getConfiguration()['P.0.2']).to.equal('rabbit');
  });

});
