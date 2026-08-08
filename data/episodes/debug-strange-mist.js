// TEMP: A placeholder navigation episode proving the episode queue works in game. Its queue settings exercise every
//       non-default option. Task 131's oath episode replaces it as the real thing.
Episode.register('debug-strange-mist',{
  layout: 'centered',
  queue: {
    district: 'dungeon',
    on: 'enter',
    chance: 25,
    priority: 5,
    repeat: true,
    removeWhen: () => GameSystem.getState().getGameTime() > 30 * 24 * 60,
    requires: [() => GameSystem.getState().getPlayer() != null],
  },
  pages: [{
    content: `<p>A pale mist comes rolling up the street as you cross into the dungeon district, thick enough to chew
      and smelling faintly of wet stone. The locals don't so much as glance at it. A shopkeeper leans out to shoo it
      away from her door like a stray cat, and it goes. By the time it thins to nothing you're left with only a vague
      dampness and the feeling of having been watched by something with no strong opinions about you.</p>`,
    buttons: [{ id:'strangeMistContinueButton', label:'Continue', callback:EpisodeSystem.endEpisode }],
  }],
});
