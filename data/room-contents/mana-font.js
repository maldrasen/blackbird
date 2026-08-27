
function describe(options) {
  return `An ornately carved fountain sits in the center of the floor; filled with sparkling, mana infused water. The
    water has lost its distinctive color though, now that you've absorbed its power. A statue in the center of the
    fountain depicts a ${describeStatue(options.color)}`;
}

function describeStatue(color) {
  switch (color) {
    case Mana.red:    return `roaring and shamelessly erect dragon, it's huge ridged cock thrust forward aggressively.`;
    case Mana.yellow: return `grinning havlin, holding a fist sized gemstone in one hand and a hammer in the other.`;
    case Mana.green:  return `plush nymph, cupping and squeezing her large breasts, pushing her long hard nipples outward.`;
    case Mana.blue:   return `regal looking futanari elf with a sharp and cruel smile, hir robes parted just enough to tease.`;
    case Mana.black:  return `athletic looking sylph, balanced on one foot while holding her other leg behind her head.`;
  }
}

RoomContents.register('mana-font',{
  episodes:[
    'nightgaunt-at-the-mana-font',
    'deepen-mana-pool',
  ],
  description: describe,
});
