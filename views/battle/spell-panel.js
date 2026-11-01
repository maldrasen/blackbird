// The spell selection lives inside the command panel as a mode of its own, like targeting does: the command buttons
// give way to a color list, the spells of the chosen color, and the power levels the caster can pay for. Casting
// leaves the mode and hands the choice to targeting, or runs the command at once for a spell that needs no target.
global.SpellPanel = (function() {

  let castable;
  let selection;

  function init() {
    X.onClick('#spellArea .color', event => selectColor(event.target.closest('.color').dataset.color));
    X.onClick('#spellArea .spell', event => selectSpell(event.target.closest('.spell').dataset.spell));
    X.onClick('#spellArea .level', event => selectLevel(parseInt(event.target.closest('.level').dataset.level)));
    X.onClick('#spellArea .cast-button', cast);
    X.onClick('#commandPanel .cancel-button', () => { if (isOpen()) { close(); } });
  }

  function open() {
    castable = SpellbookSystem.getCastableSpells(BattleSystem.getRound().getActing());
    selection = {};

    X.addClass('#battleView','spell-mode');
    renderColors();
    renderSpells();
    renderLevels();
  }

  function close() {
    X.removeClass('#battleView','spell-mode');
    X.empty('#spellArea .color-list');
    X.empty('#spellArea .spell-list');
    X.empty('#spellArea .level-list');
    X.addClass('#spellArea .cast-button','disabled');
  }

  function isOpen() {
    return X.hasClass('#battleView','spell-mode');
  }

  function selectColor(color) {
    selection = { color };
    renderColors();
    renderSpells();
    renderLevels();
  }

  function selectSpell(spell) {
    selection = { color:selection.color, spell };
    renderSpells();
    renderLevels();
  }

  function selectLevel(powerLevel) {
    selection.powerLevel = powerLevel;
    renderLevels();
  }

  function cast() {
    const command = BattleCommand.lookup(StandardAbility.castSpell);
    const data = { spell:selection.spell, powerLevel:selection.powerLevel };

    close();
    command.getTargetingMode(data) != null ? TargetingController.startTargeting(command, data) : command.execute(data);
  }

  // Only the colors the caster has a spell for, in the order the mana enum lists them.
  function renderColors() {
    const colors = Object.values(Mana).filter(color => castable.some(entry => entry.color === color));

    X.fill('#spellArea .color-list', colors.map(color => buildItem('color', color, color === selection.color, `
      <span class='label ${color}'>${capitalize(color)}</span>`)));
  }

  function renderSpells() {
    const spells = castable.filter(entry => entry.color === selection.color);

    X.fill('#spellArea .spell-list', spells.map(entry => {
      const spell = Spell.lookup(entry.code);
      return buildItem('spell', entry.code, entry.code === selection.spell, `
        <span class='label'>${spell.getName()}</span>
        <span class='cost'>${spell.getManaCost()} / level</span>`);
    }));
  }

  function renderLevels() {
    const entry = castable.find(entry => entry.code === selection.spell);
    const levels = entry ? Array.from({ length:entry.maxPowerLevel }, (_, index) => index + 1) : [];
    const spell = entry ? Spell.lookup(entry.code) : null;

    X.fill('#spellArea .level-list', levels.map(level => buildItem('level', level, level === selection.powerLevel, `
      <span class='label'>Power ${level}</span>
      <span class='cost'>${spell.getManaCost(level)} ${spell.getColor()}</span>`)));

    selection.powerLevel ?
      X.removeClass('#spellArea .cast-button','disabled') :
      X.addClass('#spellArea .cast-button','disabled');
  }

  function buildItem(type, value, selected, content) {
    return X.createElement(`<li><a href='#' class='${type} ${selected ? 'selected' : ''}' data-${type}='${value}'>${content}</a></li>`);
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return {
    init,
    open,
    close,
    isOpen,
  };

})();
