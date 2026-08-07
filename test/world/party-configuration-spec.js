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

  it('removing a character', function() {
    PartyConfiguration.setCharacter('horse', 'P.0.1');
    PartyConfiguration.removeCharacter('horse');
    expect(PartyConfiguration.getConfiguration()).to.not.have.property('horse');
  });

  it('swapping a character', function() {
    PartyConfiguration.setCharacter('rabbit','P.0.1');
    PartyConfiguration.setCharacter('horse','P.0.2');
    PartyConfiguration.setCharacter('rabbit','P.0.2');

    expect(PartyConfiguration.getConfiguration()['horse']).to.equal('P.0.1');
    expect(PartyConfiguration.getConfiguration()['rabbit']).to.equal('P.0.2');
  });

  describe('validity', function() {

    it('an empty configuration is valid', function() {
      expect(PartyConfiguration.isValidConfiguration({})).to.equal(true);
      expect(PartyConfiguration.getVacantFrontPositions({})).to.eql([]);
    });

    it('a front only configuration is valid', function() {
      const configuration = { horse:'P.0.1', goat:'P.0.2' };
      expect(PartyConfiguration.isValidConfiguration(configuration)).to.equal(true);
    });

    it('a covered back row character is valid', function() {
      const configuration = { horse:'P.0.2', goat:'P.1.2' };
      expect(PartyConfiguration.isValidConfiguration(configuration)).to.equal(true);
    });

    it('an exposed back row character is invalid', function() {
      const configuration = { goat:'P.1.2' };
      expect(PartyConfiguration.isValidConfiguration(configuration)).to.equal(false);
      expect(PartyConfiguration.getVacantFrontPositions(configuration)).to.eql(['P.0.2']);
    });

    it('columns are checked independently', function() {
      const configuration = { horse:'P.0.0', goat:'P.1.4' };
      expect(PartyConfiguration.isValidConfiguration(configuration)).to.equal(false);
      expect(PartyConfiguration.getVacantFrontPositions(configuration)).to.eql(['P.0.4']);
    });

    it('lists every vacant front position', function() {
      const configuration = { horse:'P.1.0', goat:'P.1.2', rabbit:'P.0.2', pig:'P.1.3' };
      expect(PartyConfiguration.getVacantFrontPositions(configuration)).to.eql(['P.0.0','P.0.3']);
    });

  });

});
