describe("KeyBindings", function() {

  it("binds a default key to every battle command", function() {
    const bindings = KeyBindings.getBindings();
    Object.values(BattleCommand).forEach(code => {
      expect(bindings.battle[code]).to.be.a('string');
    });
  });

  it("has no conflicts in the defaults", function() {
    expect(KeyBindings.findConflicts(KeyBindings.getDefaults())).to.deep.equal([]);
  });

  it("finds the action bound to a key in a context", function() {
    expect(KeyBindings.getAction('battle','KeyA')).to.equal(BattleCommand.basicAttack);
    expect(KeyBindings.getAction('targeting','Digit0')).to.equal('back-5');
    expect(KeyBindings.getAction('dungeon','KeyW')).to.equal('north');
    expect(KeyBindings.getAction('battle','KeyZ')).to.equal(null);
    expect(KeyBindings.getAction('nonsense','KeyA')).to.equal(null);
  });

  it("reads saved bindings over the defaults", async function() {
    await WorldState.setOptions({ keyBindings:{ battle:{ [BattleCommand.basicAttack]:'KeyQ' } } });

    expect(KeyBindings.getBinding('battle',BattleCommand.basicAttack)).to.equal('KeyQ');
    expect(KeyBindings.getAction('battle','KeyQ')).to.equal(BattleCommand.basicAttack);
    expect(KeyBindings.getAction('battle','KeyA')).to.equal(null);
    expect(KeyBindings.getAction('battle','KeyD')).to.equal(BattleCommand.basicDefend);
    expect(KeyBindings.getBinding('dungeon','north')).to.equal('KeyW');
  });

  it("lets an action be unbound", async function() {
    await WorldState.setOptions({ keyBindings:{ battle:{ [BattleCommand.basicAttack]:null } } });

    expect(KeyBindings.getBinding('battle',BattleCommand.basicAttack)).to.equal(null);
    expect(KeyBindings.getAction('battle','KeyA')).to.equal(null);
    expect(KeyBindings.getAction('battle',null)).to.equal(null);
  });

  it("falls back to the defaults when the options hold no bindings", async function() {
    await WorldState.setOptions({ difficulty:{ damage:100, mitigation:100, resistance:0 } });
    expect(KeyBindings.getBindings()).to.deep.equal(KeyBindings.getDefaults());
  });

  it("hands out a fresh copy of the bindings each time", function() {
    KeyBindings.getBindings().battle[BattleCommand.basicAttack] = 'KeyZ';
    expect(KeyBindings.getBinding('battle',BattleCommand.basicAttack)).to.equal('KeyA');
  });

  describe("findConflicts()", function() {
    it("flags a key bound to two actions in one context", function() {
      const bindings = KeyBindings.getDefaults();
      bindings.battle[BattleCommand.basicDefend] = 'KeyA';

      const conflicts = KeyBindings.findConflicts(bindings);
      expect(conflicts.length).to.equal(1);
      expect(conflicts[0].context).to.equal('battle');
      expect(conflicts[0].code).to.equal('KeyA');
      expect(conflicts[0].actions).to.have.members([BattleCommand.basicAttack, BattleCommand.basicDefend]);
    });

    it("allows the same key in different contexts", function() {
      const bindings = KeyBindings.getDefaults();
      bindings.battle[BattleCommand.basicAttack] = 'KeyW';
      expect(KeyBindings.findConflicts(bindings)).to.deep.equal([]);
    });

    it("ignores unbound actions", function() {
      const bindings = KeyBindings.getDefaults();
      bindings.battle[BattleCommand.basicAttack] = null;
      bindings.battle[BattleCommand.basicDefend] = null;
      expect(KeyBindings.findConflicts(bindings)).to.deep.equal([]);
    });
  });

  describe("isBindable()", function() {
    it("rejects keys that belong to something else", function() {
      ['Escape','Backquote','Tab','F11','ShiftLeft','ControlRight','MetaLeft','PageUp','CapsLock',''].forEach(code => {
        expect(KeyBindings.isBindable(code), code).to.equal(false);
      });
    });

    it("accepts ordinary keys", function() {
      ['KeyA','Digit0','Numpad5','Space','Enter','ArrowUp','Minus','Slash'].forEach(code => {
        expect(KeyBindings.isBindable(code), code).to.equal(true);
      });
    });
  });

  describe("labelFor()", function() {
    it("shortens key codes to what's printed on the key", function() {
      expect(KeyBindings.labelFor('KeyA')).to.equal('A');
      expect(KeyBindings.labelFor('Digit0')).to.equal('0');
      expect(KeyBindings.labelFor('Numpad5')).to.equal('Num 5');
      expect(KeyBindings.labelFor('ArrowUp')).to.equal('↑');
      expect(KeyBindings.labelFor('Space')).to.equal('Space');
      expect(KeyBindings.labelFor('BracketLeft')).to.equal('[');
    });

    it("leaves unknown codes as they are", function() {
      expect(KeyBindings.labelFor('IntlBackslash')).to.equal('IntlBackslash');
    });
  });

});
