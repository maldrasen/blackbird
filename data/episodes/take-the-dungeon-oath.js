/*
# Take the Dungeon Oath
This event establishes the role of the Church in the setting. It sets up a small conflict, forcing the player into a
situation where they must take an oath, then soon break it, in order to progress. All the delvers are quickly forced
into this situation where they need to participate in this fiction that the adventurers are delving to destroy the
dungeon, though it's obvious that no one is actually doing that.

This episode will always be one of the first played. At the start of the game the dungeon district is the only other
district that's been unlocked, and this episode fires when you navigate there.

### Facts
- Delvers, despite having taken an oath not to accept power from the dungeon, seem powerful.
- It's common to see parties with a harem configuration. A single male human, with 4 or 5 barely dressed women.
- Wolgur is a city of walls. There aren't a lot of public spaces. Even businesses like shops and bars. There are
  brothels though.
- The proper name for the dungeon is the Great Rhysh Dungeon. It's in the Rhysh valley, and it's big.
 */
const pages = {};

pages.travel = `You walk through Wolgur's narrow streets, trying not to look like someone fresh from the farmlands.
  It's difficult though. You walk past several groups of adventurers. Dangerous looking people who surround themselves
  beautiful but inhuman creatures. Most of whom could pass for human except for a few noticeable features; the horns,
  the tails, the thick swinging cocks barely concealed behind a thin skirt or a loincloth. It looks like Wolgur is as
  shameless as the stories make it out to be.`;

pages.empty = `Other than the small bands of delvers, the city seems surprisingly empty. You had expected to see dozens
  of shops and taverns along the main road through town, but Wolgur is strangely closed off. You're surrounded by tall,
  dark stone buildings, all behind gates and walls; nothing open to the public. Borr's central market was more lively
  than this place, with the notable exception of the brothels. You pass by several on your way to the dungeon. It's
  obvious what they are, given the barely dressed or sometimes entirely nude women who smile and wink in your direction
  as you walk past.`

pages.thePit = `After a little while you find yourself at the gateway to the Great Rhysh Dungeon, a huge, perfectly
  circular hole in the ground. A few small streams cascade over the edge of the pit, the water plunging downward,
  splashing against the walls of the shaft, turning into a thick mist that makes the pit look bottomless. A pair of
  stairways cling to the sides of the pit, angling downward and meeting again at the opposite side of the pit at a
  landing where the actual door to the dungeon sits.`

pages.approach = `A large man in polished armor is standing guard at the top of the pit where both stairways begin. The
  featureless helmet tilts downward as you approach. "New delver?" The man's voice is strange, reverberating, hollow.`;

const approachOptions = [
  { label:'Yes.' },
  { label:'I just want to take a look.' },
  { label:'How did you know?' },
];

Episode.register('take-the-dungeon-oath',{

  queue: {
    district: 'dungeon',
    on: 'enter',
    priority: EpisodePriority.critical,
  },

  pages: [
    { content:pages.travel },
    { content:pages.empty },
    { content:pages.thePit },
    { content:pages.approach, buttons:approachOptions },
  ],

});
