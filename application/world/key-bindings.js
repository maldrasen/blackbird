global.KeyBindings = (function() {

  // Every action has two bindings, and pressing either key performs it. An action's `key` is the default for its
  // primary binding. It can also have an `alternate` key, though most actions start without one.
  const slots = ['primary','alternate'];

  const contexts = {
    battle: {
      name: 'Battle Commands',
      actions: {
        [StandardAbility.attack]:          { name:'Attack',           key:'KeyA' },
        [StandardAbility.defend]:          { name:'Defend',           key:'KeyD' },
        [StandardAbility.hide]:            { name:'Hide',             key:'KeyH' },
        [StandardAbility.sneakAttack]:     { name:'Sneak Attack',     key:'KeyS' },
        [StandardAbility.negotiate]:       { name:'Negotiate',        key:'KeyN' },
        [StandardAbility.useItem]:         { name:'Use Item',         key:'KeyI' },
        [StandardAbility.changeEquipment]: { name:'Change Equipment', key:'KeyE' },
        [StandardAbility.pass]:            { name:'Pass',             key:'KeyP' },
      },
    },

    // Auto battle needs to be a separate context from the commands. Commands are available when the command panel is
    // shown, auto battle is available at any time during a battle.
    autoBattle: {
      name: 'Auto Battle',
      actions: {
        toggle: { name:'Toggle Auto Battle', key:'KeyZ' },
      },
    },

    targeting: {
      name: 'Targeting',
      actions: {
        'front-1': { name:'Front Row 1', key:'Digit1' },
        'front-2': { name:'Front Row 2', key:'Digit2' },
        'front-3': { name:'Front Row 3', key:'Digit3' },
        'front-4': { name:'Front Row 4', key:'Digit4' },
        'front-5': { name:'Front Row 5', key:'Digit5' },
        'back-1':  { name:'Back Row 1',  key:'Digit6' },
        'back-2':  { name:'Back Row 2',  key:'Digit7' },
        'back-3':  { name:'Back Row 3',  key:'Digit8' },
        'back-4':  { name:'Back Row 4',  key:'Digit9' },
        'back-5':  { name:'Back Row 5',  key:'Digit0' },
      },
    },

    dungeon: {
      name: 'Dungeon',
      actions: {
        north:     { name:'Move North',     key:'Numpad8', alternate:'KeyW' },
        south:     { name:'Move South',     key:'Numpad2', alternate:'KeyS' },
        west:      { name:'Move West',      key:'Numpad4', alternate:'KeyA' },
        east:      { name:'Move East',      key:'Numpad6', alternate:'KeyD' },
        northeast: { name:'Move Northeast', key:'Numpad9' },
        northwest: { name:'Move Northwest', key:'Numpad7' },
        southeast: { name:'Move Southeast', key:'Numpad3' },
        southwest: { name:'Move Southwest', key:'Numpad1' },
      },
    },
  };

  // These keys belong to the escape chain, the console, scrolling, or to the OS.
  const unbindable = [
    KeyCodes.Escape,
    KeyCodes.Backquote,
    KeyCodes.CapsLock,
    KeyCodes.ContextMenu,
    KeyCodes.PageUp,
    KeyCodes.PageDown,
    KeyCodes.Home,
    KeyCodes.End,
    'Tab',
    'NumLock',
    'ScrollLock',
    'Pause',
    'PrintScreen',
  ];

  const labels = {
    Space: 'Space',
    Enter: 'Enter',
    Backspace: 'Backspace',
    Delete: 'Del',
    Insert: 'Ins',
    ArrowUp: '↑',
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
    Minus: '-',
    Equal: '=',
    BracketLeft: '[',
    BracketRight: ']',
    Backslash: '\\',
    Semicolon: ';',
    Quote: "'",
    Comma: ',',
    Period: '.',
    Slash: '/',
    NumpadAdd: 'Num +',
    NumpadSubtract: 'Num -',
    NumpadMultiply: 'Num *',
    NumpadDivide: 'Num /',
    NumpadDecimal: 'Num .',
    NumpadEnter: 'Num Enter',
  };

  function getContexts() { return contexts; }

  function getDefaults() {
    const defaults = {};
    Object.entries(contexts).forEach(([context, { actions }]) => {
      defaults[context] = {};
      Object.entries(actions).forEach(([action, { key, alternate }]) => {
        defaults[context][action] = { primary:key, alternate:(alternate || null) };
      });
    });
    return defaults;
  }

  function getBindings() {
    return ObjectHelper.merge(getDefaults(), savedBindings());
  }

  // Options saved before actions had an alternate binding hold a single key for each action, which was what's now
  // the primary binding.
  function savedBindings() {
    const saved = structuredClone(WorldState.getOptions().keyBindings || {});

    Object.values(saved).forEach(actions => {
      Object.entries(actions).forEach(([action, binding]) => {
        if (ObjectHelper.isPlainObject(binding) === false) { actions[action] = { primary:binding }; }
      });
    });

    return saved;
  }

  // The key to show as the hint for an action.
  function getBinding(context, action) {
    const binding = getBindings()[context][action];
    return binding.primary || binding.alternate;
  }

  function getAction(context, code) {
    if (code == null) { return null; }
    const entry = Object.entries(getBindings()[context] || {}).find(([action, binding]) =>
      slots.some(slot => binding[slot] === code));
    return entry ? entry[0] : null;
  }

  // A key can't perform two actions in the same context. Binding the same key to both of an action's slots is
  // pointless, but it isn't a conflict.
  function findConflicts(bindings) {
    const conflicts = [];

    Object.entries(bindings).forEach(([context, actions]) => {
      const byKey = {};
      Object.entries(actions).forEach(([action, binding]) => {
        slots.forEach(slot => {
          const key = binding[slot];
          if (key == null) { return; }
          if ((byKey[key] = byKey[key] || []).includes(action) === false) { byKey[key].push(action); }
        });
      });
      Object.entries(byKey).forEach(([code, list]) => {
        if (list.length > 1) { conflicts.push({ context, code, actions:list }); }
      });
    });

    return conflicts;
  }

  function isBindable(code) {
    if (code == null || code === '' || code === 'Unidentified') { return false; }
    if (/^F\d{1,2}$/.test(code)) { return false; }
    if (/^(Shift|Control|Alt|Meta)(Left|Right)$/.test(code)) { return false; }
    return unbindable.includes(code) === false;
  }

  function labelFor(code) {
    if (labels[code]) { return labels[code]; }
    if (/^Key[A-Z]$/.test(code)) { return code.substring(3); }
    if (/^Digit\d$/.test(code)) { return code.substring(5); }
    if (/^Numpad\d$/.test(code)) { return `Num ${code.substring(6)}`; }
    return code;
  }

  return {
    getSlots: () => { return [...slots]; },
    getContexts,
    getDefaults,
    getBindings,
    getBinding,
    getAction,
    findConflicts,
    isBindable,
    labelFor,
  };

})();
