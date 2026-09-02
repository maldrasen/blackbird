
const page1 = `You take a moment to thoroughly search the entrance chamber. The sound of the waterfalls outside is
  muffled by the thick stone walls, and only a trickle of the outside light can still be seen, reflecting off of the
  rippling water. The shallow pool is only a few inches deep, fed by several cascades, positioned behind the statues.`;
const page2 = `The statues themselves are imposing. They're each perhaps twelve feet tall or so and exquisitely carved
  from some dark stone. They're each unique, but the creatures all share a similar pose; standing tall, arms folded
  over their muscular chests, their featureless faces turned down as though judging those who enter. Though none of the
  statues are erect, they're positioned so that their thick bulging members are right at eye level. The effect is less
  erotic than it is... threatening.`;
const page3 = `Other than the pool and the statues though, there doesn't seem to be anything else of note in the
  large entrance chamber.`;

Episode.register('dungeon-entrance',{
  layout: 'centered',
  pages: [
    { content:page1 },
    { content:page2 },
    { content:page3 },
  ],
});
