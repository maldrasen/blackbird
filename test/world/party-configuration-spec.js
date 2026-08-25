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

  describe('addCharacter', function() {
    beforeEach(function() {
      GameSystem.getState().setPlayer('horse');
    });

    it('adds the first character to the front center', function() {
      PartyConfiguration.setConfiguration({ horse:'P.0.2' });
      PartyConfiguration.addCharacter('goat');

      expect(PartyConfiguration.getConfiguration()['goat']).to.equal('P.1.2');
    });

    it('fills the center column before moving outward', function() {
      PartyConfiguration.setConfiguration({ horse:'P.0.2', goat:'P.1.2' });
      PartyConfiguration.addCharacter('rabbit');

      expect(PartyConfiguration.getConfiguration()['rabbit']).to.equal('P.0.1');
    });

    it('takes the front center when it is vacant', function() {
      PartyConfiguration.setConfiguration({ horse:'P.0.1' });
      PartyConfiguration.addCharacter('goat');

      expect(PartyConfiguration.getConfiguration()['goat']).to.equal('P.0.2');
    });
  });

  describe('setConfiguration', function() {

    beforeEach(function() {
      GameSystem.getState().setPlayer('horse');
    });

    it('replaces the whole configuration', function() {
      PartyConfiguration.setCharacter('pig','P.0.4');
      PartyConfiguration.setConfiguration({ horse:'P.0.1', goat:'P.1.1' });

      expect(PartyConfiguration.getConfiguration()).to.eql({ horse:'P.0.1', goat:'P.1.1' });
    });

    it('copies the configuration it is given', function() {
      const draft = { horse:'P.0.1' };
      PartyConfiguration.setConfiguration(draft);
      draft.goat = 'P.0.2';

      expect(PartyConfiguration.getConfiguration()).to.eql({ horse:'P.0.1' });
    });

    it('rejects malformed positions', function() {
      expect(() => PartyConfiguration.setConfiguration({ horse:'front' })).to.throw('Invalid configuration');
      expect(() => PartyConfiguration.setConfiguration({ horse:'M.0.1' })).to.throw('Invalid configuration');
    });

    it('rejects duplicate positions', function() {
      expect(() => PartyConfiguration.setConfiguration({ horse:'P.0.1', goat:'P.0.1' })).to.throw('Invalid configuration');
    });

    it('rejects an exposed back row', function() {
      expect(() => PartyConfiguration.setConfiguration({ horse:'P.1.1' })).to.throw('Invalid configuration');
    });

    it('rejects a configuration without the player', function() {
      expect(() => PartyConfiguration.setConfiguration({ goat:'P.0.1' })).to.throw('Invalid configuration');
    });

  });

  describe('location syncing', function() {

    beforeEach(function() {
      GameSystem.getState().setPlayer('horse');
    });

    it('situates party members in the party', function() {
      const goat = Registry.createEntity();
      SituatedComponent.create(goat, { currentLocation:'ruined-living-room' });

      PartyConfiguration.setConfiguration({ horse:'P.0.2', [goat]:'P.1.2' });

      expect(SituatedComponent.lookup(goat).currentLocation).to.equal('(in-party)');
    });

    it('sends removed members to the living room', function() {
      const goat = Registry.createEntity();
      SituatedComponent.create(goat, { currentLocation:SpecialLocation.inParty });

      PartyConfiguration.setConfiguration({ horse:'P.0.2', [goat]:'P.1.2' });
      PartyConfiguration.setConfiguration({ horse:'P.0.2' });

      expect(SituatedComponent.lookup(goat).currentLocation).to.equal('ruined-living-room');
    });

    it('addCharacter situates the character in the party', function() {
      const goat = Registry.createEntity();
      SituatedComponent.create(goat, { currentLocation:'ruined-living-room' });

      PartyConfiguration.setConfiguration({ horse:'P.0.2' });
      PartyConfiguration.addCharacter(goat);

      expect(SituatedComponent.lookup(goat).currentLocation).to.equal('(in-party)');
    });

    it('ignores characters without a situated component', function() {
      PartyConfiguration.setConfiguration({ horse:'P.0.2', goat:'P.1.2' });
      PartyConfiguration.setConfiguration({ horse:'P.0.2' });

      expect(SituatedComponent.lookup('horse')).to.be.undefined;
      expect(SituatedComponent.lookup('goat')).to.be.undefined;
    });

  });

  describe('getScout', function() {
    beforeEach(function() {
      GameSystem.getState().setPlayer('horse');
    });

    it('picks the front center character', function() {
      PartyConfiguration.setConfiguration({ horse:'P.0.1', goat:'P.0.2', rabbit:'P.0.3' });
      expect(PartyConfiguration.getScout()).to.equal('goat');
    });

    it('falls back through the front rank when the center is empty', function() {
      PartyConfiguration.setConfiguration({ rabbit:'P.0.0', horse:'P.0.3', goat:'P.0.4' });
      expect(PartyConfiguration.getScout()).to.equal('horse');

      PartyConfiguration.setConfiguration({ rabbit:'P.0.0', horse:'P.0.4' });
      expect(PartyConfiguration.getScout()).to.equal('rabbit');
    });
  });

  describe('validity', function() {
    beforeEach(function() {
      GameSystem.getState().setPlayer('horse');
    });

    it('a configuration without the player is invalid', function() {
      expect(PartyConfiguration.isValid({})).to.equal(false);
      expect(PartyConfiguration.isValid({ goat:'P.0.1' })).to.equal(false);
    });

    it('an empty configuration has no vacant front positions', function() {
      expect(PartyConfiguration.getVacantFrontPositions({})).to.eql([]);
    });

    it('a front only configuration is valid', function() {
      const configuration = { horse:'P.0.1', goat:'P.0.2' };
      expect(PartyConfiguration.isValid(configuration)).to.equal(true);
    });

    it('a covered back row character is valid', function() {
      const configuration = { horse:'P.0.2', goat:'P.1.2' };
      expect(PartyConfiguration.isValid(configuration)).to.equal(true);
    });

    it('an exposed back row character is invalid', function() {
      const configuration = { horse:'P.0.1', goat:'P.1.2' };
      expect(PartyConfiguration.isValid(configuration)).to.equal(false);
      expect(PartyConfiguration.getVacantFrontPositions(configuration)).to.eql(['P.0.2']);
    });

    it('a malformed position is invalid', function() {
      expect(PartyConfiguration.isValid({ horse:'front' })).to.equal(false);
      expect(PartyConfiguration.isValid({ horse:'M.0.1' })).to.equal(false);
    });

    it('a duplicate position is invalid', function() {
      expect(PartyConfiguration.isValid({ horse:'P.0.1', goat:'P.0.1' })).to.equal(false);
    });

    it('columns are checked independently', function() {
      const configuration = { horse:'P.0.0', goat:'P.1.4' };
      expect(PartyConfiguration.isValid(configuration)).to.equal(false);
      expect(PartyConfiguration.getVacantFrontPositions(configuration)).to.eql(['P.0.4']);
    });

    it('lists every vacant front position', function() {
      const configuration = { horse:'P.1.0', goat:'P.1.2', rabbit:'P.0.2', pig:'P.1.3' };
      expect(PartyConfiguration.getVacantFrontPositions(configuration)).to.eql(['P.0.0','P.0.3']);
    });

  });

});
