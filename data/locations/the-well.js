Location.register('the-well',{
  name: 'The Well',
  district: 'dungeon',
  background: 'backgrounds/dungeon.jpg',
  actions: [
    { label:'Enter the Dungeon', onClick: () => { DungeonSystem.enterDungeon(); }},
  ],
});
