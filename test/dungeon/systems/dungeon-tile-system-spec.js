describe("DungeonTileSystem", function() {

  function commandCodes() {
    return DungeonTileSystem.getTileInfo().commands.map(command => command.code);
  }

  // The party starts the first level standing on the up stairs of the dungeon entrance, at (2,2) of the room. The
  // causeway runs east from there.
  describe("on the first level", function() {
    let floor;

    beforeEach(function() {
      DungeonSystem.enterDungeon();
      floor = DungeonSystem.getDungeonFloor();
    });

    function stepOffStairs() {
      const position = floor.getPartyPosition();
      floor.setPartyPosition(position.x + 1, position.y);
    }

    it('describes the stairs in place of the room while standing on them', function() {
      expect(DungeonTileSystem.hasTileFeature()).to.equal(true);
      expect(DungeonTileSystem.getTileInfo().description).to.include('stairs leading back up to the floor above');
    });

    it("puts the command for the stairs ahead of the room's commands", function() {
      expect(DungeonTileSystem.getTileInfo().commands[0]).to.deep.equal({ code:'use-stairs', label:'Climb Stairs' });
      expect(commandCodes()).to.deep.equal(['use-stairs','inspect']);
    });

    it('describes the room from any other tile', function() {
      stepOffStairs();

      expect(DungeonTileSystem.hasTileFeature()).to.equal(false);
      expect(DungeonTileSystem.getTileInfo().description).to.include('The entrance chamber is filled with the sound');
      expect(commandCodes()).to.deep.equal(['inspect']);
    });

    // The tile east of the stairs is (3,2) of the entrance room.
    it("describes a tile's contents in place of the room", function() {
      floor.getCurrentRoom().setTileContents(3, 2, { description:'A cracked flagstone.' });
      stepOffStairs();

      expect(DungeonTileSystem.hasTileFeature()).to.equal(true);
      expect(DungeonTileSystem.getTileInfo().description).to.equal('A cracked flagstone.');
      expect(commandCodes()).to.deep.equal(['inspect']);
    });

    it('describes the room from a tile whose contents have no description', function() {
      floor.getCurrentRoom().setTileContents(3, 2, { canEnter:true });
      stepOffStairs();

      expect(DungeonTileSystem.hasTileFeature()).to.equal(false);
      expect(DungeonTileSystem.getTileInfo().description).to.include('The entrance chamber is filled with the sound');
    });

    it("passes the room's commands along to the room", function() {
      stepOffStairs();
      expect(DungeonTileSystem.useCommand('inspect')).to.deep.equal({ episode:'dungeon-entrance' });
    });

    it('leaves the dungeon by climbing the stairs', function() {
      expect(DungeonTileSystem.useCommand('use-stairs')).to.deep.equal({ floorChanged:true });
      expect(GameSystem.getState().getGameMode()).to.equal(GameMode.location);
      expect(DungeonSystem.getDungeonFloor()).to.equal(null);
    });

    it('cannot take stairs that are not there', function() {
      stepOffStairs();
      expect(() => DungeonTileSystem.useCommand('use-stairs')).to.throw('There are no stairs here.');
    });

    it('throws for a command that is not on offer', function() {
      expect(() => DungeonTileSystem.useCommand('dance')).to.throw('Command [dance] is not available in this room.');
    });
  });

  describe("on the down stairs", function() {
    let floor;

    beforeEach(function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);
      floor = DungeonSystem.getDungeonFloor();

      const stairs = floor.getStairs('down')[0];
      floor.setPartyPosition(stairs.position.x, stairs.position.y);
    });

    it('offers the way down', function() {
      expect(DungeonTileSystem.getTileInfo().description).to.include('stairs descending down into the darkness below');
      expect(DungeonTileSystem.getTileInfo().commands).to.deep.equal([{ code:'use-stairs', label:'Descend Stairs' }]);
    });

    it('descends to the next level, arriving on its up stairs', function() {
      expect(DungeonTileSystem.useCommand('use-stairs')).to.deep.equal({ floorChanged:true });

      const below = DungeonSystem.getDungeonFloor();
      const position = below.getPartyPosition();
      expect(below.getLevel()).to.equal(2);
      expect(below.getStairsAt(position.x, position.y)).to.equal('up');
    });
  });

});
