describe("PartyConfiguration", function() {

  it('adding a character', function() {
    PartyConfiguration.setCharacter('horse', '0.1');
    expect(PartyConfiguration.getConfiguration()['0.1']).to.equal('horse');
  })

  it('replacing a character', function() {
    PartyConfiguration.setCharacter('horse', '1.1');
    PartyConfiguration.setCharacter('goat', '1.1');
    expect(PartyConfiguration.getConfiguration()['1.1']).to.equal('goat');
  });

  it('moving a character', function() {
    PartyConfiguration.setCharacter('horse','0.1');
    PartyConfiguration.setCharacter('horse','0.2');
    expect(PartyConfiguration.getConfiguration()['0.1']).to.be.null;
    expect(PartyConfiguration.getConfiguration()['0.2']).to.equal('horse');
  });

  it('swapping a character', function() {
    PartyConfiguration.setCharacter('rabbit','0.1');
    PartyConfiguration.setCharacter('horse','0.2');
    PartyConfiguration.setCharacter('rabbit','0.2');

    expect(PartyConfiguration.getConfiguration()['0.1']).to.equal('horse');
    expect(PartyConfiguration.getConfiguration()['0.2']).to.equal('rabbit');
  });

});
