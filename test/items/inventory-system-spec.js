describe('InventorySystem', function() {

  describe('getReachableInventories()', function() {
    it('gathers the player, party, and co-located roster members', function() {
      const state = GameSystem.getState();
      const player = CharacterFixtures.genericMale({ actor:{ name:'Player' } });
      const partyMember = CharacterFixtures.genericMale({ actor:{ name:'Party' } });
      const coLocated = CharacterFixtures.genericMale({ actor:{ name:'Nearby' } });
      const farAway = CharacterFixtures.genericMale({ actor:{ name:'Distant' } });

      state.setPlayer(player);
      state.setCurrentLocation('night-market');
      state.setPartyConfiguration({ [player]:'p-0', [partyMember]:'p-1' });
      state.addToRoster(coLocated);
      state.addToRoster(farAway);

      SituatedComponent.create(coLocated, { currentLocation:'night-market' });
      SituatedComponent.create(farAway, { currentLocation:'graveyard' });

      const reachable = InventorySystem.getReachableInventories(partyMember);

      expect(reachable.map(entry => entry.id)).to.deep.equal([player, coLocated]);
      expect(reachable.map(entry => entry.name)).to.deep.equal(['Player','Nearby']);
    });

    it('excludes self and does not duplicate a player in the party', function() {
      const state = GameSystem.getState();
      const player = CharacterFixtures.genericMale({ actor:{ name:'Player' } });
      const partyMember = CharacterFixtures.genericMale({ actor:{ name:'Party' } });

      state.setPlayer(player);
      state.setPartyConfiguration({ [player]:'p-0', [partyMember]:'p-1' });

      const reachable = InventorySystem.getReachableInventories(player);

      expect(reachable.map(entry => entry.id)).to.deep.equal([partyMember]);
    });
  });

  it('transferItem() unequips an item and moves it between inventories', function() {
    const horse = CharacterFixtures.genericMale({});
    const goat = CharacterFixtures.genericMale({});
    const cleaver = WeaponFactory.build('cleaver');

    InventoryManager(horse).addItem(cleaver);
    EquipmentManager(horse).equipItem(cleaver, EquipmentSlot.primary);

    InventorySystem.transferItem(cleaver, horse, goat);

    expect(EquipmentComponent.lookup(horse).primary).to.not.exist;
    expect(InventoryManager(horse).hasItem(cleaver)).to.equal(false);
    expect(InventoryManager(goat).hasItem(cleaver)).to.equal(true);
  });

});
