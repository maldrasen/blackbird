
const pages = {};

pages.start1 = `The small octagonal room is filled with a soft green glow, emanating from a wide but shallow fountain.
  Looking down into the water you see that it shimmers with its own light, casting dancing rays across the walls, the
  ceiling, and the statue of the voluptuous water nymph standing on a short pedestal in the center of the basin.`;
pages.start2 = `The nymph's head is tilted back, her mouth open, her hands reaching up to firmly squeeze her large,
  soft looking breasts. You can't help but stare a little. The sculptor had a very specific eye for detail, judging
  from the way her fingers sink into her breasts, or the way her long erect nipples are jutting outward.`;
pages.start3 = `Looking around the room you see other reliefs, carved into the stone walls depicting the same woman. In
  some she's healing the sick or tending to people's wounds. In others it looks like she's the one who's spreading the
  disease. All the reliefs though emphasize her sensuality, even the one where she's pushing her tongue into a
  screaming man's mouth as his face melts away.`;
pages.start4 = `You've heard whispers of places like this before. Shrines and chapels dedicated to heretical dungeon
  gods. The Holy Church of course tells people to avoid such places. Though you've also heard, in even quieter and
  more secretive whispers, that these gods grant powers to the people who honor them.`;
pages.closer = `You step closer to the fountain, looking down into the faintly green glowing water. Other than the
  strange shimmering light, the water looks perfectly clear. You're tempted to drink from the fountain, though the
  relief of the man with all the flesh melting off his skull does give you pause.`;
pages.drink1 = `You reach down into the water. It's strangely warm, perhaps from the energy it contains. After waiting
  for a moment to make sure your hand doesn't dissolve, you cup your hand beneath the surface and bring a mouthful to
  your lips. The water doesn't taste like anything, but after a few moments you feel that same warmth begin to spread
  throughout your body. The heat pulses like a second heartbeat. It sinks into your bones, penetrates your skull.`;
pages.drink2 = `Your eyes open wide as you feel something else pushed inside of you. Knowledge. You stare at your empty
  hand, turning it over as though you've never seen your own skin before. You're not sure how, but you know that if you
  were to cut yourself, you could simply tell your flesh to close and it would obey.`;
pages.drink3 = `Is this magic? You can't imagine what else it could be. The green glow fades from the fountain, leaving
  nothing behind but water and stone, its power now claimed.`;
pages.return1 = `Once again you find yourself standing in front of the nymph goddess and her fountain; the rays cast 
  by it's glowing water playing across her body in an almost sensual manner. You kneel down in front of it, gazing into
  the waters below.`;

const startButtons = [
  { label:'Look closer', jump:'closer' },
  { label:'Ignore the fountain', end:true },
];

const closerButtons = [
  { label:'Drink', jump:'drink' },
  { label:`Leave`, end:true },
];

const returnButtons = [
  { label:'Drink', jump:'drink' },
  { label:'Leave', end:true },
];

function drink() {
  const amount = ManaSystem.deepenPool(Mana.green);

  SpellbookComponent.setSpell(GameSystem.getState().getPlayer(), 'mending', 1);
  DungeonSystem.getDungeonState().fontUsed(DungeonSystem.getDungeonFloor().getLevel());
  DungeonSystem.getDungeonFloor().getCurrentRoom().refreshDescription();

  return [
    WeaverElements.paragraph(pages.drink2),
    WeaverElements.resultBlocks([
      { text:`You learn the spell {S/abl}Mending{/S}.`, options:{ classname:'gain' }},
      { text:`You gain ${amount} green mana.`, options:{ classname:'gain' }},
    ]),
  ].join('');
}

Episode.register('first-mana-font', {
  pages: [
    { content:pages.start1 },
    { content:pages.start2 },
    { content:pages.start3 },
    { content:pages.start4, buttons:startButtons, buttonsStyle:'column' },
    { content:pages.closer, label:'closer', buttons:closerButtons, buttonsStyle:'column' },
    { content:pages.drink1, label:'drink' },
    { contentFunction:drink },
    { content:pages.drink3 },
  ],
});

Episode.register('first-mana-font-return', {
  repeat: true,
  requires: [
    DungeonRequirements.fontUnused(),
    DungeonRequirements.contentsOptionIs('first', true),
  ],
  pages: [
    { content:pages.return1, buttons:returnButtons, buttonsStyle:'column' },
    { content:pages.drink1, label:'drink' },
    { contentFunction:drink },
    { content:pages.drink3 },
  ],
});
