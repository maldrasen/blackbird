Episode.register('game-over',{
  layout: 'centered',
  background: 'backgrounds/dungeon.jpg',
  pages: [{
    content: `<h3>You Died</h3>`,
    buttons: [{ id:'gameOverConfirmButton', label:'Confirm', callback:EpisodeSystem.endEpisode }],
  }],
  endFunction: GameSystem.quitToMainMenu,
});
