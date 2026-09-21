describe("BattleState", function() {

  describe("Formation", function() {
    it('getEntityAtPosition()', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ ...BattleFixtures.runtPack() });

      const state = BattleSystem.getState();
      expect(state.getEntityAtPosition('M',0,3)).to.not.be.null;
      expect(state.getEntityAtPosition('M',1,3)).to.be.null;
    });
  })

  describe("Combatant Conditions", function() {
    it('starts every combatant as active', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

      const state = BattleSystem.getState();
      expect(state.getCondition(state.getActiveCharacters()[0])).to.equal(BattleCondition.active);
      expect(state.getCondition(state.getActiveMonsters()[0])).to.equal(BattleCondition.active);
    });

    it('conditions are mutually exclusive', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

      const state = BattleSystem.getState();
      const monster = state.getActiveMonsters()[0];

      state.setCondition(monster, BattleCondition.dead);
      state.setCondition(monster, BattleCondition.fled);

      expect(state.getDeadMonsters()).to.deep.equal([]);
      expect(state.getFledMonsters()).to.deep.equal([monster]);
    });

    it('throws for entities that are not in the battle', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

      const state = BattleSystem.getState();
      expect(() => state.setCondition('nobody', BattleCondition.dead)).to.throw('Validate.exists');
      expect(() => state.setCondition(state.getActiveMonsters()[0], 'sleepy')).to.throw('not in list');
    });

    it('only monsters are listed in the dead and fled monster lists', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

      const state = BattleSystem.getState();
      state.setCondition(state.getActiveCharacters()[0], BattleCondition.dead);

      expect(state.getDeadMonsters()).to.deep.equal([]);
      expect(state.getFledMonsters()).to.deep.equal([]);
    });

    it('lists the knocked out characters', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

      const state = BattleSystem.getState();
      const character = state.getActiveCharacters()[0];
      state.setCondition(character, BattleCondition.knockedOut);

      expect(state.getKnockedOut()).to.deep.equal([character]);
      expect(state.isKnockedOut(character)).to.be.true;
      expect(state.isAlive(character)).to.be.true;
      expect(state.isDown(character)).to.be.true;
    });
  });

  describe("cleanup()", function() {
    const enchantment = { type:WeaponEnchantments.endanger, species:'kobold', power:100 };

    function startBattle() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
      return BattleSystem.getState();
    }

    function giveItem(monster, options={}) {
      const item = ItemFixtures.buildSteel('longsword', options);
      InventoryManager(monster).addItem(item);
      return item;
    }

    function getLoot() {
      return InventoryComponent.lookup(GameSystem.getState().manifestLootInventory()).items;
    }

    it('deletes every monster along with their items', function() {
      const state = startBattle();
      const [dead, knockedOut, active] = state.getActiveMonsters();
      const items = [dead, knockedOut, active].map(monster => giveItem(monster));

      state.setCondition(dead, BattleCondition.dead);
      state.setCondition(knockedOut, BattleCondition.knockedOut);
      state.cleanup();

      [dead, knockedOut, active, ...items].forEach(id => {
        expect(Registry.entityExists(id)).to.be.false;
      });
    });

    it('keeps the recruited monsters and their items', function() {
      const state = startBattle();
      const recruit = state.getActiveMonsters()[0];
      const item = giveItem(recruit);

      state.setCondition(recruit, BattleCondition.recruited);
      state.cleanup();

      expect(Registry.entityExists(recruit)).to.be.true;
      expect(Registry.entityExists(item)).to.be.true;
    });

    it('moves the enchanted items of the defeated monsters into the loot inventory', function() {
      const state = startBattle();
      const [dead, knockedOut] = state.getActiveMonsters();
      const deadLoot = giveItem(dead, { enchantment });
      const knockedOutLoot = giveItem(knockedOut, { enchantment });
      const mundane = giveItem(dead);

      state.setCondition(dead, BattleCondition.dead);
      state.setCondition(knockedOut, BattleCondition.knockedOut);
      state.cleanup();

      expect(getLoot()).to.have.members([deadLoot, knockedOutLoot]);
      expect(Registry.entityExists(mundane)).to.be.false;
    });

    it('monsters who were not defeated keep their enchanted items', function() {
      const state = startBattle();
      const [fled, active] = state.getActiveMonsters();
      const items = [giveItem(fled, { enchantment }), giveItem(active, { enchantment })];

      state.setCondition(fled, BattleCondition.fled);
      state.cleanup();

      expect(getLoot()).to.eql([]);
      items.forEach(id => { expect(Registry.entityExists(id)).to.be.false; });
    });

    it('saves no loot when told not to', function() {
      const state = startBattle();
      const dead = state.getActiveMonsters()[0];
      const item = giveItem(dead, { enchantment });

      state.setCondition(dead, BattleCondition.dead);
      state.cleanup(false);

      expect(getLoot()).to.eql([]);
      expect(Registry.entityExists(item)).to.be.false;
    });
  });

  describe("Turn Order", function() {
    it('moves the character within the turn order after acting', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

      const state = BattleSystem.getState();
      const next = state.getNext();
      next.time += 1000;
      state.setTurnOrder(next);

      const newOrder = state.getTurnOrder();
      const last = newOrder[newOrder.length-1];

      expect(next.id).to.equal(last.id);
    });

    it('moves an entity to the top of the turn order', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

      const state = BattleSystem.getState();
      const order = state.getTurnOrder();
      const last = order[order.length-1];

      state.moveToTopOfTurnOrder(last, 50);

      const newOrder = state.getTurnOrder();
      expect(newOrder[0].id).to.equal(last.id);
      expect(newOrder[0].time).to.equal(Math.max(0, newOrder[1].time - 50));
    });

    it('entities can be removed from the turn order', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

      const state = BattleSystem.getState();
      const order = state.getTurnOrder();
      const second = order[1];

      state.removeFromTurnOrder(second);

      const ids = state.getTurnOrder().map(data => { return data.id });

      expect(ids.includes(second.id)).to.be.false;
    });
  });


});