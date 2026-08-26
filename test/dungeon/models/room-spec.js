describe("Room", function() {

  describe("setBounds()", function() {
    it('creates an empty footprint grid of the correct size', function() {
      const room = Room();
      room.setBounds(3,2);

      expect(room.getBounds()).to.deep.equal({ xMin:0, yMin:0, xMax:3, yMax:2 });
      expect(room.getFootprint()).to.deep.equal([
        [false,false,false],
        [false,false,false],
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
        [true,true,true,true],
        [true,true,true,true],
        [false,true,true,false],
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
    it('serializes the position, contents, stairs, used commands, and footprint', function() {
      const room = Room();
      room.setPosition(5,9);
      room.setContents('spec-contents');
      room.setStairs('up');
      room.setBounds(3,3);
      room.addBox(0,0,3,1);
      room.addBox(2,0,1,3);

      expect(room.pack()).to.deep.equal({
        position: { x:5, y:9 },
        contents: 'spec-contents',
        stairs: 'up',
        usedCommands: [],
        footprint: [
          [true,true,true],
          [false,false,true],
          [false,false,true],
        ],
      });
    });

    it('serializes a copy of the footprint, not the live grid', function() {
      const room = Room();
      room.setBounds(2,1);
      room.addBox(0,0,2,1);

      const packed = room.pack();
      packed.footprint[0][0] = false;

      expect(room.getFootprint()[0][0]).to.equal(true);
    });
  });

});
