global.DungeonState = function(data={}) {

  const discoveredFonts = data.discoveredFonts || [];

  function pack() {
    return {
      discoveredFonts
    };
  }

  return {
    pack,
  };
}
