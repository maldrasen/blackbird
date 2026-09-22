describe("Room", function() {

  describe("setBounds()", function() {
    it('creates an empty footprint grid of the correct size', function() {
      const room = Room();
      room.setBounds(3,2);

      expect(room.getBounds()).to.deep.equal({ xMin:0, yMin:0, xMax:3, yMax:2 });
      expect(room.getFootprint()).to.deep.equal([
        [null,null,null],
        [null,null,null],
      ]);
      expect(room.getSize()).to.equal(0);
    });

    it('throws when the bounds are set twice', function() {
      const room = Room();
      room.setBounds(3,3);
      expect(() => room.setBounds(4,4)).to.throw('already been set');
    });
  });

  describe("addBox()", function() {
    it('paints boxes directly into the footprint grid', function() {
      const room = Room();
      room.setBounds(4,3);
      room.addBox(0,0,4,2);
      room.addBox(1,0,2,3);

      expect(room.getFootprint()).to.deep.equal([
        [0,0,0,0],
        [0,0,0,0],
        [null,0,0,null],
      ]);
      expect(room.getSize()).to.equal(10);
    });

    it('keeps painting boxes after the footprint has been read', function() {
      const room = Room();
      room.setBounds(2,2);
      room.addBox(0,0,1,2);
      room.getFootprint();
      room.addBox(1,0,1,2);

      expect(room.getSize()).to.equal(4);
    });

    it('throws when a box is added before the bounds are set', function() {
      const room = Room();
      expect(() => room.addBox(0,0,2,2)).to.throw('before adding a box');
    });

    it('throws when a box does not fit inside the bounds', function() {
      const room = Room();
      room.setBounds(3,3);

      expect(() => room.addBox(-1,0,2,2)).to.throw(`doesn't fit`);
      expect(() => room.addBox(2,2,2,2)).to.throw(`doesn't fit`);
    });

    it('preserves the floor type of tiles painted twice', function() {
      const room = Room();
      room.setBounds(3,1);
      room.addBox(0,0,3,1);
      room.setFloor(1,0,'water');
      room.addBox(0,0,3,1);

      expect(room.getFloor(1,0)).to.equal('water');
      expect(room.getSize()).to.equal(3);
    });
  });

  describe("removeTile()", function() {
    it('takes a tile and its contents out of the footprint', function() {
      const room = Room();
      room.setBounds(3,1);
      room.addBox(0,0,3,1);
      room.setTileContents(1,0,{ canEnter:false });
      room.removeTile(1,0);

      expect(room.getFootprint()).to.deep.equal([[0,null,0]]);
      expect(room.getTileContents(1,0)).to.be.null;
      expect(room.getSize()).to.equal(2);
    });

    it('ignores tiles that are not part of the room', function() {
      const room = Room();
      room.setBounds(2,1);
      room.addBox(0,0,1,1);
      room.removeTile(1,0);
      room.removeTile(-1,0);
      room.removeTile(0,4);

      expect(room.getSize()).to.equal(1);
    });
  });

  describe("setFloor()", function() {
    it('sets the floor type index of a tile in the footprint', function() {
      const room = Room();
      room.setBounds(3,1);
      room.addBox(0,0,3,1);
      room.setFloor(1,0,'water');

      expect(room.getFootprint()).to.deep.equal([[0,1,0]]);
      expect(room.getFloor(0,0)).to.equal('default');
      expect(room.getFloor(1,0)).to.equal('water');
    });

    it('throws for an unknown floor type', function() {
      const room = Room();
      room.setBounds(3,1);
      room.addBox(0,0,3,1);

      expect(() => room.setFloor(1,0,'lava')).to.throw('Unknown floor type');
    });

    it('throws for a tile outside the room', function() {
      const room = Room();
      room.setBounds(3,2);
      room.addBox(0,0,3,1);

      expect(() => room.setFloor(1,1,'water')).to.throw('not a floor tile');
      expect(() => room.setFloor(5,0,'water')).to.throw('not a floor tile');
    });
  });

  describe("setFloorBox()", function() {
    it('sets the floor type of every tile in the box', function() {
      const room = Room();
      room.setBounds(4,3);
      room.addBox(0,0,4,3);
      room.setFloorBox({ x:0, y:0, width:4, height:1, type:'water' });

      expect(room.getFootprint()).to.deep.equal([
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
      ]);
    });

    it('throws when the box covers tiles outside the room', function() {
      const room = Room();
      room.setBounds(4,3);
      room.addBox(0,0,4,2);

      expect(() => room.setFloorBox({ x:0, y:1, width:4, height:2, type:'water' })).to.throw('not a floor tile');
    });
  });

  describe("setTileContents()", function() {
    function buildRoom() {
      const room = Room();
      room.setBounds(3,3);
      room.addBox(0,0,3,3);
      return room;
    }

    it('stores the contents of a tile', function() {
      const room = buildRoom();
      room.setTileContents(1, 2, { canEnter:true, description:'A mossy patch.' });

      expect(room.getTileContents(1,2)).to.deep.equal({ x:1, y:2, canEnter:true, description:'A mossy patch.' });
      expect(room.getTileContents(0,0)).to.equal(null);
    });

    it('throws for a tile outside the room', function() {
      expect(() => buildRoom().setTileContents(3, 0, { canEnter:false })).to.throw('not a floor tile');
    });

    it('draws the glyph at the center of the tile', function() {
      const room = buildRoom();
      room.setTileContents(1, 1, { glyph:{ glyph:'◉', color:'white' }});
      room.setTileContents(2, 0, { canEnter:false, glyph:{ glyph:'✽', color:'green', size:150 }});

      expect(room.getGlyphs()).to.deep.equal([
        { x:1.5, y:1.5, glyph:'◉', color:'white', shadow:false },
        { x:2.5, y:0.5, glyph:'✽', color:'green', size:150, shadow:false },
      ]);
    });
  });

  describe("getGlyphs()", function() {
    it('moves a glyph by its offset', function() {
      const room = Room();
      room.setBounds(3,3);
      room.addBox(0,0,3,3);
      room.setTileContents(1, 2, { glyph:{ glyph:'◉', color:'white', offset:{ x:-0.5, y:0.5 }}});

      expect(room.getGlyphs()).to.deep.equal([{ x:1, y:3, glyph:'◉', color:'white', shadow:false }]);
    });

    it('says whether the contents cast a shadow', function() {
      const room = Room();
      room.setBounds(3,3);
      room.addBox(0,0,3,3);
      room.setTileContents(1, 1, { canEnter:false, shadow:true, glyph:{ glyph:'◉', color:'white' }});

      expect(room.getGlyphs()).to.deep.equal([{ x:1.5, y:1.5, glyph:'◉', color:'white', shadow:true }]);
    });
  });

  describe("canEnterTile()", function() {
    it('is true for a tile with no contents or no canEnter', function() {
      const room = Room();
      room.setBounds(2,1);
      room.addBox(0,0,2,1);
      room.setTileContents(1, 0, { description:'Scattered bones.' });

      expect(room.canEnterTile(0,0)).to.equal(true);
      expect(room.canEnterTile(1,0)).to.equal(true);
    });

    it('uses a boolean canEnter', function() {
      const room = Room();
      room.setBounds(2,1);
      room.addBox(0,0,2,1);
      room.setTileContents(1, 0, { canEnter:false });

      expect(room.canEnterTile(1,0)).to.equal(false);
    });

    it('calls a canEnter function each time', function() {
      let open = false;
      const room = Room();
      room.setBounds(2,1);
      room.addBox(0,0,2,1);
      room.setTileContents(1, 0, { canEnter:() => open });

      expect(room.canEnterTile(1,0)).to.equal(false);
      open = true;
      expect(room.canEnterTile(1,0)).to.equal(true);
    });
  });

  describe("getFloor()", function() {
    it('returns null for tiles not in the room', function() {
      const room = Room();
      room.setBounds(2,1);
      room.addBox(0,0,1,1);

      expect(room.getFloor(1,0)).to.equal(null);
      expect(room.getFloor(0,5)).to.equal(null);
    });
  });

  describe("getCenterPoint()", function() {
    it('defaults to the center of the bounds', function() {
      const room = Room();
      room.setBounds(5,3);
      room.addBox(0,0,5,3);

      expect(room.getCenterPoint()).to.deep.equal({ x:2.5, y:1.5 });
    });

    it('returns an explicitly set center point', function() {
      const room = Room();
      room.setBounds(5,3);
      room.setCenterPoint(2,1);

      expect(room.getCenterPoint()).to.deep.equal({ x:2, y:1 });
    });
  });

  describe("stairs", function() {

    // An L-shaped room: the top row plus the right-hand column.
    function legRoom() {
      const room = Room();
      room.setBounds(3,3);
      room.addBox(0,0,3,1);
      room.addBox(2,0,1,3);
      return room;
    }

    it('starts without stairs', function() {
      const room = legRoom();
      expect(room.hasStairs()).to.equal(false);
      expect(room.getStairs()).to.equal(null);
      expect(room.getStairsTile()).to.equal(null);
      expect(room.getStairsFloorPosition()).to.equal(null);
    });

    it('puts the stairs on a tile of the room', function() {
      const room = legRoom();
      room.setStairs('down',2,2);

      expect(room.hasStairs()).to.equal(true);
      expect(room.getStairs()).to.equal('down');
      expect(room.getStairsTile()).to.deep.equal({ x:2, y:2 });
    });

    it('keeps the stairs as the contents of their tile', function() {
      const room = legRoom();
      room.setStairs('down',2,2);

      const contents = room.getTileContents(2,2);
      expect(contents.type).to.equal('stairs');
      expect(contents.direction).to.equal('down');
      expect(room.canEnterTile(2,2)).to.equal(true);
    });

    it('draws the stairs as a glyph on their tile', function() {
      const room = legRoom();
      room.setStairs('up',2,1);

      expect(room.getGlyphs()).to.deep.equal([
        { x:2.5, y:1.5, glyph:'▲', color:'rgb(119 110 94)', size:80, shadow:false },
      ]);
    });

    it('only allows a single set of stairs', function() {
      const room = legRoom();
      room.setStairs('down',2,2);
      expect(() => room.setStairs('up',2,1)).to.throw(/already has stairs/);
    });

    it('locates the stairs on the floor', function() {
      const room = legRoom();
      room.setFloorPosition(10,20);
      room.setStairs('up',2,1);

      expect(room.getStairsFloorPosition()).to.deep.equal({ x:12, y:21 });
    });

    it('throws when the tile is not part of the room', function() {
      const room = legRoom();
      expect(() => room.setStairs('up',0,2)).to.throw('(0,2) is not a floor tile in this room.');
      expect(() => room.setStairs('up',3,0)).to.throw('(3,0) is not a floor tile in this room.');
    });

    it('throws when the room has no footprint yet', function() {
      expect(() => Room().setStairs('up',0,0)).to.throw('(0,0) is not a floor tile in this room.');
    });

    it('throws on a bad direction', function() {
      expect(() => legRoom().setStairs('sideways',0,0)).to.throw('direction[sideways] not in list');
    });
  });

  describe("descriptions", function() {
    let room;

    // A 3x3 room with the party standing on its down stairs. The descriptions for tiny rooms never apply to it, which
    // leaves the theme with a single way to describe the stairs.
    beforeEach(function() {
      const floor = DungeonFloor(1,'dungeon');
      const feature = Feature('rect-room');
      DungeonSystem.setDungeonFloor(floor);

      room = Room(feature);
      room.setBounds(3,3);
      room.addBox(0,0,3,3);
      room.setStairs('down',1,1);
      feature.addRoom(room);
      feature.setPosition(4,4);
      floor.addFeature(feature);
      floor.setPartyPosition(5,5);
    });

    it('describes the stairs apart from the room', function() {
      expect(room.getTileDescription(1,1)).to.include('You find a room with stairs descending down into the darkness below..');
    });

    it('describes a tile with text or with a function', function() {
      room.setTileContents(0, 0, { description:'A mossy patch.' });
      room.setTileContents(2, 0, { description:() => 'Scattered bones.' });

      expect(room.getTileDescription(0,0)).to.equal('A mossy patch.');
      expect(room.getTileDescription(2,0)).to.equal('Scattered bones.');
    });

    it('has nothing to say about a tile without a description', function() {
      room.setTileContents(0, 0, { canEnter:false });

      expect(room.getTileDescription(0,0)).to.equal(null);
      expect(room.getTileDescription(2,2)).to.equal(null);
    });

    it('describes a room with stairs the same as any other room', function() {
      expect(room.getDescription()).to.be.a('string');
      expect(room.getDescription()).to.not.include('stairs');
    });
  });

  describe("door permissions", function() {

    // A 3x3 room with the south-east corner missing, so (2,1) has an exterior wall to the E and S, and (1,1) is an
    // interior tile with no exterior walls at all.
    function buildRoom() {
      const room = Room();
      room.setBounds(3,3);
      room.addBox(0,0,3,2);
      room.addBox(0,0,2,3);
      return room;
    }

    it('allows doors on every wall by default', function() {
      const room = buildRoom();
      expect(room.doorIsAllowed(0,0,'N')).to.equal(true);
      expect(room.doorIsAllowed(0,0,'W')).to.equal(true);
      expect(room.doorIsAllowed(2,1,'E')).to.equal(true);
    });

    it('forbids doors on every wall after forbidAllDoors()', function() {
      const room = buildRoom();
      room.forbidAllDoors();
      expect(room.doorIsAllowed(0,0,'N')).to.equal(false);
      expect(room.doorIsAllowed(2,1,'E')).to.equal(false);
    });

    it('whitelists a single wall with allowDoor() after forbidAllDoors()', function() {
      const room = buildRoom();
      room.forbidAllDoors();
      room.allowDoor(2,1,'E');

      expect(room.doorIsAllowed(2,1,'E')).to.equal(true);
      expect(room.doorIsAllowed(2,1,'S')).to.equal(false);
      expect(room.doorIsAllowed(0,0,'N')).to.equal(false);
    });

    it('blacklists a single wall with forbidDoor()', function() {
      const room = buildRoom();
      room.forbidDoor(0,1,'W');

      expect(room.doorIsAllowed(0,1,'W')).to.equal(false);
      expect(room.doorIsAllowed(0,0,'W')).to.equal(true);
    });

    it('applies to every exterior wall of the tile when the direction is omitted', function() {
      const room = buildRoom();
      room.forbidDoor(2,1);

      expect(room.doorIsAllowed(2,1,'E')).to.equal(false);
      expect(room.doorIsAllowed(2,1,'S')).to.equal(false);
    });

    it('reverses an earlier call in the same mode', function() {
      const room = buildRoom();
      room.forbidDoor(0,0,'N');
      room.allowDoor(0,0,'N');
      expect(room.doorIsAllowed(0,0,'N')).to.equal(true);

      room.forbidAllDoors();
      room.allowDoor(0,0,'N');
      room.forbidDoor(0,0,'N');
      expect(room.doorIsAllowed(0,0,'N')).to.equal(false);
    });

    it('resets the whitelist when forbidAllDoors() is called again', function() {
      const room = buildRoom();
      room.forbidAllDoors();
      room.allowDoor(0,0,'N');
      room.forbidAllDoors();
      expect(room.doorIsAllowed(0,0,'N')).to.equal(false);
    });

    it('throws for a tile that is not part of the room', function() {
      const room = buildRoom();
      expect(() => room.forbidDoor(2,2,'E')).to.throw('not a floor tile');
      expect(() => room.allowDoor(5,0,'N')).to.throw('not a floor tile');
    });

    it('throws for a wall that is not exterior', function() {
      const room = buildRoom();
      expect(() => room.forbidDoor(1,1,'N')).to.throw('no exterior wall');
    });

    it('throws for an interior tile when the direction is omitted', function() {
      const room = buildRoom();
      expect(() => room.forbidDoor(1,1)).to.throw('interior tile');
    });
  });

  describe("contents", function() {
    it('starts empty', function() {
      const room = Room();
      expect(room.hasContents()).to.equal(false);
      expect(room.getContents()).to.equal(null);
    });

    it('holds a contents code', function() {
      const room = Room();
      room.setContents('spec-contents');
      expect(room.hasContents()).to.equal(true);
      expect(room.getContents()).to.equal('spec-contents');
    });
  });

  describe("canHaveContents()", function() {
    it('allows a plain room', function() {
      const room = Room(Feature('rect-room'));
      expect(room.canHaveContents()).to.equal(true);
    });

    it('rejects corridor rooms', function() {
      const room = Room(Feature('corridor'));
      expect(room.canHaveContents()).to.equal(false);
    });

    it('rejects rooms with stairs', function() {
      const room = Room(Feature('rect-room'));
      room.setBounds(2,2);
      room.addBox(0,0,2,2);
      room.setStairs('down',0,0);
      expect(room.canHaveContents()).to.equal(false);
    });

    it('rejects rooms that already have contents', function() {
      const room = Room(Feature('rect-room'));
      room.setContents('spec-contents');
      expect(room.canHaveContents()).to.equal(false);
    });
  });

  describe("commands", function() {
    beforeEach(function() {
      Article.register('spec-loot', { name:'Spec Loot', category:InventoryCategory.valuables });
      RoomContents.register('spec-command-contents',{
        description: 'A room full of spec contents.',
        commands: [
          { code:'take', label:'Take', execute: () => ({ text:'Taken', loot:[{ articleCode:'spec-loot', quantity:2 }] }) },
          { code:'poke', label:'Poke', execute: () => ({ text:'Poked' }) },
          { code:'hidden', label:'Hidden', requires: () => false, execute: () => ({}) },
        ],
      });
    });

    it('offers no commands without contents', function() {
      expect(Room().getAvailableCommands()).to.be.empty;
    });

    it('offers the contents commands whose requirements are met', function() {
      const room = Room();
      room.setContents('spec-command-contents');
      expect(room.getAvailableCommands().map(command => command.code)).to.deep.equal(['take','poke']);
    });

    it('uses a command up when it is executed', function() {
      const room = Room();
      room.setContents('spec-command-contents');

      const result = room.useCommand('poke');
      expect(result).to.deep.equal({ text:'Poked' });
      expect(room.getAvailableCommands().map(command => command.code)).to.deep.equal(['take']);
    });

    it("banks the command's loot in the player's inventory", function() {
      const player = CharacterFixtures.randomPlayer();
      const room = Room();
      room.setContents('spec-command-contents');

      const result = room.useCommand('take');
      expect(result).to.deep.equal({ text:'Taken', loot:[{ articleCode:'spec-loot', quantity:2 }] });
      expect(InventoryManager(player).getArticleQuantity('spec-loot')).to.equal(2);
    });

    it('throws when using a command that is not available', function() {
      const room = Room();
      room.setContents('spec-command-contents');
      room.useCommand('poke');

      expect(() => room.useCommand('poke')).to.throw('not available');
      expect(() => room.useCommand('hidden')).to.throw('not available');
      expect(() => room.useCommand('unknown')).to.throw('not available');
    });

    it('offers an episode command while the episode meets its requirements', function() {
      Episode.register('spec-command-episode', { pages:[{ content:'Spec' }] });
      RoomContents.register('spec-episode-contents', {
        description: 'A room with a story.',
        commands: [{ code:'inspect', label:'Inspect', startEpisode:'spec-command-episode' }],
      });

      const room = Room();
      room.setContents('spec-episode-contents');
      expect(room.useCommand('inspect')).to.deep.equal({ episode:'spec-command-episode' });
      expect(room.getAvailableCommands().map(command => command.code)).to.deep.equal(['inspect']);

      GameSystem.getState().recordEpisodeViewed('spec-command-episode');
      expect(room.getAvailableCommands()).to.be.empty;
      expect(() => room.useCommand('inspect')).to.throw('not available');
    });
  });

  describe("pack()", function() {
    it('serializes the position, contents, stairs, used commands, and footprint', function() {
      const room = Room();
      room.setPosition(5,9);
      room.setContents('spec-contents');
      room.setBounds(3,3);
      room.addBox(0,0,3,1);
      room.addBox(2,0,1,3);
      room.setStairs('up',2,1);

      expect(room.pack()).to.deep.equal({
        position: { x:5, y:9 },
        contents: 'spec-contents',
        stairs: { direction:'up', x:2, y:1 },
        usedCommands: [],
        footprint: [
          [0,0,0],
          [null,null,0],
          [null,null,0],
        ],
      });
    });

    it('serializes a copy of the footprint, not the live grid', function() {
      const room = Room();
      room.setBounds(2,1);
      room.addBox(0,0,2,1);

      const packed = room.pack();
      packed.footprint[0][0] = null;

      expect(room.getFootprint()[0][0]).to.equal(0);
    });
  });

});
