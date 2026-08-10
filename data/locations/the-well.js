Location.register('the-well',{
  name: 'The Well',
  district: 'dungeon',
  background: 'backgrounds/dungeon.jpg',
  actions: [
    { label:'Enter the Dungeon', actionCode:'enter-the-dungeon',
      requires:GameRequirements.flagIs(GameFlags.oathTaken, true) },
  ],
});
