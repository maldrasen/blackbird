/*
# Tile Contents Properties
Tile contents are the things the tile content placer puts on random tiles of a floor, as opposed to the stairs and
the feature-authored tiles that rooms set directly.

- `type`          TileContentType. Required, and decides which rooms can take the contents.
- `range`         Optional [min,max] floor levels the contents can be placed on.
- `secrecy`       The scouting roll needed to find the contents before stepping on them.
- `glyph`         { glyph, color, size, offset } drawn on the tile once the contents have been found. Traps have a
                  default glyph, and are drawn in the resolved trap color once sprung or disarmed whatever the glyph.
- `description`   HTML string or `(options) => HTML string`, shown in place of the room's description on the tile.
                  A trap's description is read with `{ state }`, which is 'sprung' or 'disarmed'.
- `trap`          Required for the trap type. What the trap does when it's sprung and how it's disarmed.

### Trap properties:
- `damage`        Optional dice roll, e.g. { x:2, d:6 }. A trap without damage only has text.
- `damageType`    DamageType, used to mitigate the damage with armor and resistance.
- `hitLocation`   EquipmentSlot the armor is read from. Omitted for damage that armor can't help with.
- `target`        EpisodeTarget. Who the trap springs on when the party walks into it unaware.
- `disarm`        The mechanics roll needed to disarm the trap once it's been found. Omitted when knowing the trap is
                  there is enough to get past it safely, like an open pit.
- `springTrap`    `(context) => text` when the trap goes off. `context.T` is the character it went off on.
- `disarmTrap`    `(context) => text` when the trap is disarmed. `context.T` is the character who disarmed it.
*/
global.TileContents = (function() {
  const contents = {};

  function register(code, data) {
    Validate.isIn(`TileContents[${code}].type`, data.type, Object.values(TileContentType));
    if (data.type === TileContentType.trap) { validateTrap(`TileContents[${code}].trap`, data.trap); }
    contents[code] = data;
  }

  function validateTrap(name, trap) {
    Validate.exists(name, trap);
    if (trap.damage != null) { Validate.isDiceRoll(`${name}.damage`, trap.damage); }
    if (trap.disarm != null) { Validate.isNumber(`${name}.disarm`, trap.disarm); }
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

    // A trap's glyph is only drawn once the trap has been found, so an armed glyph always means a live trap the
    // party knows about. The state is null while the trap is armed.
    function getGlyph(state=null) {
      if (tileContents.type !== TileContentType.trap) { return tileContents.glyph ? { ...tileContents.glyph } : null; }

      const glyph = { glyph:DungeonConstants.trapGlyph, color:DungeonConstants.trapColors.armed, size:80, ...tileContents.glyph };
      return (state == null) ? glyph : { ...glyph, color:DungeonConstants.trapColors.resolved };
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
