
function color() { return DungeonSystem.getDungeonFloor().getCurrentRoom().getContentsOptions().color; }
function hue() { return color() === 'black' ? 'purple' : color(); }

// return WeaverElements.resultBlock(`You've gained ${amount} ${c} mana!`, { classname:'gain' });

Episode.register('deepen-mana-pool',{
  repeat: true,
  requires: [
    DungeonRequirements.fontUnused(),
    DungeonRequirements.contentsOptionIs('first', false),
  ],
  pages: [{ content: `TODO: Write this episode nowish` }],
});
