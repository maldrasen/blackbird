
const pages = {};


pages.travel = ``;


Episode.register('take-the-dungeon-oath',{
  layout: 'centered',

  queue: {
    district: 'dungeon',
    on: 'enter',
    priority: EpisodePriority.critical,
  },

  pages: [
    { content:pages.travel },
  ],

});
