
function color() { return DungeonSystem.getDungeonFloor().getCurrentRoom().getContentsOptions().color; }
function hue() { return color() === 'black' ? 'purple' : color(); }

function describeFont() {
  const color = color();
  const poolSize = ManaComponent.lookup(GameSystem.getState().getPlayer())[color].max;
  return (poolSize > 0) ? describeSubsequent(color) : describeFirst(color);
}

function describeFirst(color) {
  return `TODO: First time at a ${color} font.`
}

function describeSubsequent(color) {
  return `TODO: At a ${color} font again.`
}

function getSpell(color) {
  const poolSize = ManaComponent.lookup(GameSystem.getState().getPlayer())[color].max;
  if (poolSize === 0) {
    switch (color) {
      case [Mana.red]: return 'ember';
      case [Mana.yellow]: return 'acidic-stream'
      case [Mana.green]: return 'mending';
      case [Mana.blue]: return 'shriek';
      case [Mana.black]: return 'derp';
    }
  }
}

function drink() {
  const color = color();
  const spell = getSpell(color);
  const amount = ManaSystem.deepenPool(color);
  const results = [{ text:`You gain ${amount} ${color} mana.`, options:{ classname:'gain' }}];

  // Player will learn a spell if they don't have any spells of this mana color yet. An introductory spell.
  // SpellbookComponent.setSpell(GameSystem.getState().getPlayer(), 'mending', 1);
  // { text:`You learn the spell {S/abl}Mending{/S}.`, options:{ classname:'gain' }},

  DungeonSystem.getDungeonState().fontUsed(DungeonSystem.getDungeonFloor().getLevel());
  DungeonSystem.getDungeonFloor().getCurrentRoom().refreshDescription();

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
