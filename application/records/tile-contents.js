/*
# Tile Contents Properties
Tile contents are the things the tile content placer puts on random tiles of a floor, as opposed to the stairs and
the feature-authored tiles that rooms set directly.

- `type`          TileContentType. Required, and decides which rooms can take the contents.
- `range`         Optional [min,max] floor levels the contents can be placed on.
- `secrecy`       The scouting roll needed to find the contents before stepping on them.
- `glyph`         { glyph, color, size, offset } drawn on the tile once the contents have been found.
- `description`   HTML string or `() => HTML string`, shown in place of the room's description on the tile.
- `trap`          Required for the trap type. What the trap does when it's sprung and how it's disarmed.
*/
global.TileContents = (function() {
  const contents = {};

  function register(code, data) {
    Validate.isIn(`TileContents[${code}].type`, data.type, Object.values(TileContentType));
    if (data.type === TileContentType.trap) { Validate.exists(`TileContents[${code}].trap`, data.trap); }
    contents[code] = data;
  }

  function getAllCodes() {
    return Object.keys(contents);
  }

  function lookup(code) {
    if (contents[code] == null) { throw new Error(`Bad tile contents code [${code}]`); }

    const tileContents = { ...contents[code] };

    function isInRange(level) {
      const range = tileContents.range;
      return range == null || (level >= range[0] && level <= range[1]);
    }

    function getDescription(options) {
      return (typeof tileContents.description === 'function') ?
        tileContents.description(options) :
        tileContents.description;
    }

    // TODO: Hmm, actually the glyphs will need at least two states for traps. A found but still armed state,
    //       and a disarmed/tripped state. There's a hidden state as well, but that comes from the scouting roll. We
    //       either need to store the scouting roll as a separate property somewhere, or a tile with a trap has one of
    //       5 trap states: null (not scouted), hidden (scouting failure), armed (scouting success), sprung (stepped on
    //       after scouting failure or mechanics failure if scouted). disarmed (mechanics success after scouting
    //       success) Kind of makes sense though for all that to just be scoutingRoll and mechanicsRoll.

    function getGlyph() {
      if (tileContents.glyph) { return tileContents.glyph; }
      switch (tileContents.type) {
        case TileContentType.trap: return { glyph:'♆', color:'rgb(240 80 16)', size:80 };
      }
    }

    return {
      getCode: () => { return code; },
      getType: () => { return tileContents.type; },
      getRange: () => { return tileContents.range; },
      getSecrecy: () => { return tileContents.secrecy; },
      getTrap: () => { return tileContents.trap; },
      isInRange,
      getDescription,
      getGlyph,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
