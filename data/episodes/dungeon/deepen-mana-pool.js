
function getColor() { return DungeonSystem.getDungeonFloor().getCurrentRoom().getContentsOptions().color; }
function getHue(color) { return color === 'black' ? 'purple' : color; }
function getPoolSize(color) { return ManaComponent.lookup(GameSystem.getState().getPlayer())[color].max }

function describeFont() {
  const color = getColor();
  return (getPoolSize(color) > 0) ? describeSubsequent(color) : describeFirst(color);
}

function describeFirst(color) {
  return `TODO: First time at a ${color} font.`
}

function describeSubsequent(color) {
  return `TODO: At a ${color} font again.`
}

function getSpell(color) {
  switch (color) {
    case Mana.red: return 'ember';
    case Mana.yellow: return 'caustic-burst'
    case Mana.green: return 'mending';
    case Mana.blue: return 'shriek';
    case Mana.black: return 'uncanny-awareness';
  }
}

function drink() {
  const color = getColor();
  const first = getPoolSize(color) === 0;
  const amount = ManaSystem.deepenPool(color);
  const results = [];

  if (first) {
    const spellCode = getSpell(color);
    const spellName = Spell.lookup(spellCode).getName();
    SpellbookComponent.setSpell(GameSystem.getState().getPlayer(), spellCode, 1);
    results.push({ text:`You learn the spell {S/abl}${spellName}{/S}.`, options:{ classname:'gain' }})
  }

  DungeonSystem.getDungeonState().fontUsed(DungeonSystem.getDungeonFloor().getLevel());
  DungeonSystem.getDungeonFloor().getCurrentRoom().refreshDescription();
  results.push({ text:`You gain ${amount} ${color} mana.`, options:{ classname:'gain' }});

  return [
    WeaverElements.paragraph('Drank text'),
    WeaverElements.resultBlocks(results),
  ].join('');
}

Episode.register('deepen-mana-pool',{
  repeat: true,
  requires: [
    DungeonRequirements.fontUnused(),
    DungeonRequirements.contentsOptionIs('first', false),
  ],
  pages: [
    { contentFunction:describeFont },
    { contentFunction:drink },
  ],
});
