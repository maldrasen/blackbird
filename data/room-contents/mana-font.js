
function describe(options) {
  return Requirements.met(DungeonRequirements.fontUnused()) ? describeUnused(options) : describeUsed(options);
}

function describeUnused(options) {
  return `An ornately carved fountain sits in the center of the floor; filled with water that glistens with a soft
    ${hue(options.color)} light. A statue in the center of the fountain depicts ${describeStatue(options.color)}`;
}

function describeUsed(options) {
  return `An ornately carved fountain sits in the center of the floor. The water has lost its distinctive 
    ${hue(options.color)} glow, now that you've absorbed its power. A statue in the center of the fountain depicts 
    ${describeStatue(options.color)}`;
}

function hue(color) { return color === Mana.black ? 'purple' : color; }

function describeStatue(color) {
  switch (color) {
    case Mana.red:    return `a roaring and shamelessly erect dragon, it's huge ridged cock thrust forward aggressively.`;
    case Mana.yellow: return `a grinning havlin, holding a fist sized gemstone in one hand and a hammer in the other.`;
    case Mana.green:  return `a plush nymph, cupping and squeezing her large breasts, pushing her long hard nipples outward.`;
    case Mana.blue:   return `a regal looking futanari elf with a sharp and cruel smile, hir robes parted just enough to tease.`;
    case Mana.black:  return `an athletic looking sylph, balanced on one foot while holding her other leg behind her head.`;
  }
}

// Only the first font starts its episode on entry. Every later font waits for the drink command, and the first font
// offers the same command when the player walked away from it. The episodes' requirements decide which command shows.
RoomContents.register('mana-font',{
  episode: 'first-mana-font',
  commands:[
    { code:'first-drink', label:'Drink', startEpisode:'first-mana-font-return' },
    { code:'drink', label:'Drink', startEpisode:'deepen-mana-pool' },
  ],
  description: describe,
});
