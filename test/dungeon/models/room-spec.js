describe("Room", function() {

  describe("addBox()", function() {
    it("keeps the room's overall bounds pinned at the origin", function() {
      const room = Room();
      room.addBox(0,0,10,10);
      room.addBox(-3,-6,10,10);

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.xMax).to.equal(13);
      expect(bounds.yMax).to.equal(16);
    });

    it("re-pins the origin even when the first box isn't added at (0,0)", function() {
      const room = Room();
      room.addBox(5,5,4,4);

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.xMax).to.equal(4);
      expect(bounds.yMax).to.equal(4);
    });

    it("shifts every existing box, not just the one that went negative", function() {
      const room = Room();
      room.addBox(0,0,4,4);
      room.addBox(1,4,2,2);
      room.addBox(-2,0,2,4);

      const boxes = room.getBoxes();
      expect(boxes).to.deep.equal([
        { x:2, y:0, width:4, height:4 },
        { x:3, y:4, width:2, height:2 },
        { x:0, y:0, width:2, height:4 },
      ]);
    });
  });

  describe("getBounds()", function() {
    it('calculates the bounds for a single box room', function() {
      const room = Room();
      room.addBox(0,0,2,3);

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.xMax).to.equal(2);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.yMax).to.equal(3);
    });

    it('calculates the bounds of a two box room. (N)', function() {
      const room = Room();
      room.addBox(0,0,4,4);
      room.addBox(1,4,2,2);

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.xMax).to.equal(4);
      expect(bounds.yMax).to.equal(6);
    });

    it('calculates the bounds of a two box room. (S)', function() {
      const room = Room();
      room.addBox(0,0,4,4);
      room.addBox(1,-2,2,2);

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.xMax).to.equal(4);
      expect(bounds.yMax).to.equal(6);
    });

    it('calculates the bounds of a two box room. (E)', function() {
      const room = Room();
      room.addBox(0,0,4,4);
      room.addBox(4,1,2,2);

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.xMax).to.equal(6);
      expect(bounds.yMax).to.equal(4);
    });

    it('calculates the bounds of a two box room. (W)', function() {
      const room = Room();
      room.addBox(0,0,4,4);
      room.addBox(-2,1,2,2);

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.xMax).to.equal(6);
      expect(bounds.yMax).to.equal(4);
    });

    it('calculates the bounds of a three box dogleg-shaped room (H,V,H)', function() {
      const room = Room();
      room.addBox(0,0,4,1);  // first horizontal leg
      room.addBox(3,0,1,5);  // vertical jog
      room.addBox(3,4,4,1);  // second horizontal leg

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.xMax).to.equal(7);
      expect(bounds.yMax).to.equal(5);
    });
  });

  describe("getBoxes()", function() {
    it('returns every box that has been added, in order', function() {
      const room = Room();
      room.addBox(0,0,3,1);
      room.addBox(2,0,1,3);

      expect(room.getBoxes()).to.deep.equal([
        { x:0, y:0, width:3, height:1 },
        { x:2, y:0, width:1, height:3 },
      ]);
    });

    it('returns copies, not references to internal state', function() {
      const room = Room();
      room.addBox(0,0,3,1);

      const boxes = room.getBoxes();
      boxes[0].width = 999;

      expect(room.getBoxes()[0].width).to.equal(3);
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
      room.setStairs('down');
      expect(room.canHaveContents()).to.equal(false);
    });
  });

  describe("commands", function() {
    beforeEach(function() {
      RoomContents.register('spec-command-contents',{
        description: 'A room full of spec contents.',
        commands: [
          { code:'take', label:'Take', execute: () => ({ text:'Taken', loot:[{ code:'spec-loot', count:2 }] }) },
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

      const result = room.useCommand('take');
      expect(result).to.deep.equal({ text:'Taken', loot:[{ code:'spec-loot', count:2 }] });
      expect(room.getAvailableCommands().map(command => command.code)).to.deep.equal(['poke']);
    });

    it('throws when using a command that is not available', function() {
      const room = Room();
      room.setContents('spec-command-contents');
      room.useCommand('take');

      expect(() => room.useCommand('take')).to.throw('not available');
      expect(() => room.useCommand('hidden')).to.throw('not available');
      expect(() => room.useCommand('unknown')).to.throw('not available');
    });
  });

  describe("pack()", function() {
    it('serializes the position, contents, stairs, used commands, and every box', function() {
      const room = Room();
      room.setPosition(5,9);
      room.setContents('spec-contents');
      room.setStairs('up');
      room.addBox(0,0,3,1);
      room.addBox(2,0,1,3);

      expect(room.pack()).to.deep.equal({
        position: { x:5, y:9 },
        contents: 'spec-contents',
        stairs: 'up',
        usedCommands: [],
        boxes: [
          { x:0, y:0, width:3, height:1 },
          { x:2, y:0, width:1, height:3 },
        ],
      });
    });
  });

});
