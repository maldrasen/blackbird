global.KeyBindings = (function() {

  // Every bindable action, grouped by the context that listens for it. A context is a UI state that owns the keyboard
  // while it's showing, so two actions in one context can't share a key, though the same key can mean different
  // things in different contexts. Keys are KeyboardEvent.code values.
  const contexts = {
    battle: {
      name: 'Battle Commands',
      actions: {
        [BattleCommand.basicAttack]:     { name:'Attack',           key:'KeyA' },
        [BattleCommand.basicDefend]:     { name:'Defend',           key:'KeyD' },
        [BattleCommand.hide]:            { name:'Hide',             key:'KeyH' },
        [BattleCommand.sneakAttack]:     { name:'Sneak Attack',     key:'KeyS' },
        [BattleCommand.negotiate]:       { name:'Negotiate',        key:'KeyN' },
        [BattleCommand.useItem]:         { name:'Use Item',         key:'KeyI' },
        [BattleCommand.changeEquipment]: { name:'Change Equipment', key:'KeyE' },
        [BattleCommand.pass]:            { name:'Pass',             key:'KeyP' },
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
        north: { name:'Move North', key:'KeyW' },
        south: { name:'Move South', key:'KeyS' },
        west:  { name:'Move West',  key:'KeyA' },
        east:  { name:'Move East',  key:'KeyD' },
      },
    },
  };

  // Keys that already belong to something else (the escape chain, the console, scrolling) or to the OS.
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
      Object.entries(actions).forEach(([action, { key }]) => { defaults[context][action] = key; });
    });
    return defaults;
  }

  // The saved options only hold what the player has saved, so anything missing from them (including a world state
  // written before a binding existed) falls back to its default.
  function getBindings() {
    return ObjectHelper.merge(getDefaults(), WorldState.getOptions().keyBindings || {});
  }

  function getBinding(context, action) {
    return getBindings()[context][action];
  }

  function getAction(context, code) {
    const entry = Object.entries(getBindings()[context] || {}).find(([action, key]) => key === code);
    return entry ? entry[0] : null;
  }

  // A key bound to two actions in the same context is a conflict. The same key in different contexts is fine, since
  // only one context listens at a time.
  function findConflicts(bindings) {
    const conflicts = [];

    Object.entries(bindings).forEach(([context, actions]) => {
      const byKey = {};
      Object.entries(actions).forEach(([action, key]) => {
        (byKey[key] = byKey[key] || []).push(action);
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
