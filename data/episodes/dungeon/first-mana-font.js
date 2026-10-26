
const pages = {};

pages.start1 = `The small octagonal room is filled with a soft green glow, emanating from a wide but shallow fountain.
  Looking down into water you see that it shimmers with it's own light, casting dancing rays across the walls, the
  ceiling, and the statue of the voluptuous water nymph standing on a short pedestal in the center of the basin.`;
pages.start2 = `The nymph's head tilted is back, her mouth open, her hands reaching up to firmly squeeze her large,
  soft looking breasts. You can't help but stare a little. The sculptor had a very specific eye for detail, judging
  from the way her fingers sink into her breasts, or the way her long erect nipples are jutting outward.`;
pages.start3 = `Looking around the room you see other reliefs, carved into the stone walls depicting the same woman. In
  some she's healing the sick or tending to people wounds. In others it looks like she's the one who's spreading the
  disease. All the reliefs though emphasize her sensuality, even the one where she's pushing her tongue into a
  screaming man's mouth as his face melts away.`;
pages.start4 = `You've heard whispers of places like this before. Shrines and chapels devoted to heretical dungeon
  gods. The Holy Church of course tells people to avoid such places. Though you've also heard, in even quieter and
  secretive whispers that these gods grant powers to the people who worship them.`;

const startButtons = [
  { label:'Look closer', jump:'closer' },
  { label:'Ignore the fountain', end:true },
];

const closerButtons = [
  { label:'Drink', jump:'drink' },
  { label:`Leave`, end:true },
];

pages.closer1 = `You look closer...`;
pages.drink1 = `You drink...`;

function drink() {
  DungeonSystem.getDungeonState().fontUsed(DungeonSystem.getDungeonFloor().getLevel());

  const amount = ManaSystem.deepenPool(Mana.green);
  return WeaverElements.resultBlock(`You've gained ${amount} green mana!`, { classname:'gain' });
}

Episode.register('first-mana-font', {
  pages: [
    { content:pages.start1 },
    { content:pages.start2 },
    { content:pages.start3 },
    { content:pages.start4, buttons:startButtons, buttonStyle:'column' },
    { content:pages.closer1, label:'closer', buttons:closerButtons, buttonStyle:'column' },
    { content:pages.drink1, label:'drink', onShow:drink },
  ],
});
