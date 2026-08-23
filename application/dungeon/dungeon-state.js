global.DungeonState = function(data={}) {

  const discoveredFonts = data.discoveredFonts || [];

  // The player gains mana by using the mana fonts found scattered through the dungeon. We don't want this to be an
  // endless resource though, so once a font has been found on a level within the dungeon, a font won't be able to
  // spawn on that level again. So if a player has made it 20 levels deep, they could have found at most 20 fonts.

  function canGenerateFont(level) { return discoveredFonts.includes(level) === false; }

  function fontUsed(level) {
    if (canGenerateFont(level) === false) { throw new Error(`A font on level ${level} has already been used.`); }
    discoveredFonts.push(level);

    // TODO: Deepen mana pool when font is used.
  }

  function pack() {
    return {
      discoveredFonts
    };
  }

  return {
    canGenerateFont,
    fontUsed,
    pack,
  };
}
