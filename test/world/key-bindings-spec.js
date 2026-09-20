describe("KeyBindings", function() {

  it("binds a default key to every battle command", function() {
    const bindings = KeyBindings.getBindings();
    Object.values(StandardAbility).forEach(code => {
      expect(bindings.battle[code].primary).to.be.a('string');
    });
  });

  it("has no conflicts in the defaults", function() {
    expect(KeyBindings.findConflicts(KeyBindings.getDefaults())).to.deep.equal([]);
  });

  it("finds the action bound to a key in a context", function() {
    expect(KeyBindings.getAction('battle','KeyA')).to.equal(StandardAbility.attack);
    expect(KeyBindings.getAction('targeting','Digit0')).to.equal('back-5');
    expect(KeyBindings.getAction('dungeon','KeyW')).to.equal('north');
    expect(KeyBindings.getAction('battle','KeyZ')).to.equal(null);
    expect(KeyBindings.getAction('nonsense','KeyA')).to.equal(null);
  });

  it("gives every action a primary and an alternate binding", function() {
    expect(KeyBindings.getSlots()).to.deep.equal(['primary','alternate']);
    expect(KeyBindings.getDefaults().battle[StandardAbility.attack]).to.deep.equal({ primary:'KeyA', alternate:null });
  });

  it("performs an action from either of its bindings", async function() {
    await WorldState.setOptions({ keyBindings:{ battle:{ [StandardAbility.attack]:{ alternate:'KeyQ' } } } });

    expect(KeyBindings.getAction('battle','KeyA')).to.equal(StandardAbility.attack);
    expect(KeyBindings.getAction('battle','KeyQ')).to.equal(StandardAbility.attack);
    expect(KeyBindings.getBindings().battle[StandardAbility.attack]).to.deep.equal({ primary:'KeyA', alternate:'KeyQ' });
  });

  it("hints at the primary binding, or the alternate when there is no primary", async function() {
    await WorldState.setOptions({ keyBindings:{ battle:{
      [StandardAbility.attack]:{ alternate:'KeyQ' },
      [StandardAbility.defend]:{ primary:null, alternate:'KeyX' },
    }}});

    expect(KeyBindings.getBinding('battle',StandardAbility.attack)).to.equal('KeyA');
    expect(KeyBindings.getBinding('battle',StandardAbility.defend)).to.equal('KeyX');
  });

  it("reads saved bindings over the defaults", async function() {
    await WorldState.setOptions({ keyBindings:{ battle:{ [StandardAbility.attack]:{ primary:'KeyQ' } } } });

    expect(KeyBindings.getBinding('battle',StandardAbility.attack)).to.equal('KeyQ');
    expect(KeyBindings.getAction('battle','KeyQ')).to.equal(StandardAbility.attack);
    expect(KeyBindings.getAction('battle','KeyA')).to.equal(null);
    expect(KeyBindings.getAction('battle','KeyD')).to.equal(StandardAbility.defend);
    expect(KeyBindings.getBinding('dungeon','north')).to.equal('KeyW');
  });

  // Before actions had an alternate binding the options held a single key for each action.
  it("reads a binding saved as a single key as the primary binding", async function() {
    await WorldState.setOptions({ keyBindings:{ battle:{ [StandardAbility.attack]:'KeyQ', [StandardAbility.defend]:null } } });

    expect(KeyBindings.getBindings().battle[StandardAbility.attack]).to.deep.equal({ primary:'KeyQ', alternate:null });
    expect(KeyBindings.getBindings().battle[StandardAbility.defend]).to.deep.equal({ primary:null, alternate:null });
    expect(KeyBindings.getAction('battle','KeyQ')).to.equal(StandardAbility.attack);
    expect(KeyBindings.getAction('battle','KeyD')).to.equal(null);
  });

  it("lets an action be unbound", async function() {
    await WorldState.setOptions({ keyBindings:{ battle:{ [StandardAbility.attack]:{ primary:null } } } });

    expect(KeyBindings.getBinding('battle',StandardAbility.attack)).to.equal(null);
    expect(KeyBindings.getAction('battle','KeyA')).to.equal(null);
    expect(KeyBindings.getAction('battle',null)).to.equal(null);
  });

  it("falls back to the defaults when the options hold no bindings", async function() {
    await WorldState.setOptions({ difficulty:{ damage:100, mitigation:100, resistance:0 } });
    expect(KeyBindings.getBindings()).to.deep.equal(KeyBindings.getDefaults());
  });

  it("hands out a fresh copy of the bindings each time", function() {
    KeyBindings.getBindings().battle[StandardAbility.attack].primary = 'KeyZ';
    expect(KeyBindings.getBinding('battle',StandardAbility.attack)).to.equal('KeyA');
  });

  describe("findConflicts()", function() {
    it("flags a key bound to two actions in one context", function() {
      const bindings = KeyBindings.getDefaults();
      bindings.battle[StandardAbility.defend].primary = 'KeyA';

      const conflicts = KeyBindings.findConflicts(bindings);
      expect(conflicts.length).to.equal(1);
      expect(conflicts[0].context).to.equal('battle');
      expect(conflicts[0].code).to.equal('KeyA');
      expect(conflicts[0].actions).to.have.members([StandardAbility.attack, StandardAbility.defend]);
    });

    it("flags an alternate binding that takes another action's key", function() {
      const bindings = KeyBindings.getDefaults();
      bindings.battle[StandardAbility.defend].alternate = 'KeyA';

      const conflicts = KeyBindings.findConflicts(bindings);
      expect(conflicts).to.deep.equal([{ context:'battle', code:'KeyA', actions:[StandardAbility.attack, StandardAbility.defend] }]);
    });

    it("allows an action to have the same key in both of its bindings", function() {
      const bindings = KeyBindings.getDefaults();
      bindings.battle[StandardAbility.attack].alternate = 'KeyA';
      expect(KeyBindings.findConflicts(bindings)).to.deep.equal([]);
    });

    it("allows the same key in different contexts", function() {
      const bindings = KeyBindings.getDefaults();
      bindings.battle[StandardAbility.attack].primary = 'KeyW';
      expect(KeyBindings.findConflicts(bindings)).to.deep.equal([]);
    });

    it("ignores unbound actions", function() {
      const bindings = KeyBindings.getDefaults();
      bindings.battle[StandardAbility.attack].primary = null;
      bindings.battle[StandardAbility.defend].primary = null;
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
