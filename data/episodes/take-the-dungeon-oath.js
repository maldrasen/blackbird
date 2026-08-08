
const pages = [];
pages.push(`This is page 1`);
pages.push(`This is page 2`);
pages.push(`This is page 3`);

Episode.register('take-the-dungeon-oath',{
  layout: 'centered',

  queue: {
    district: 'dungeon',
    on: 'enter',
    priority: EpisodePriority.critical,
  },

  pages: [
    { content:pages[0] },
    { content:pages[1] },
    { content:pages[2] },
  ],

});
