/*
# Room Contents Properties
- `description`   HTML string or `() => HTML string`.
- `episode`       Optional episode code. The episode starts when the room is entered.
- `commands`      Optional array of command objects, offered as buttons in the dungeon controls.

### Command properties:
- `code`      String, unique within the contents.
- `label`     Button text.
- `execute`   Called when the command is chosen.
- `requires`  Predicate or array of predicates. Unmet commands aren't offered.
*/
global.RoomContents = (function() {
  const contents = {};

  function register(code,data) {
    contents[code] = data;
  }

  function getAllCodes() {
    return Object.keys(contents);
  }

  function lookup(code) {
    if (contents[code] == null) { throw new Error(`Bad room contents code [${code}]`); }

    const roomContents = { ...contents[code] };

    // By default, a room with contents has brighter text to differentiate it from an empty room. A room with a
    // treasure that wasn't discovered though should have the same style as an empty room. Or, if this room started an
    // episode, and that episode was resolved, the description should reflect the state of the room after the
    // resolution. When anything complicated like this happens the description() function needs to render its text in
    // whatever style is appropriate. This function can look up the resolution of the scouting roll from the current
    // room, which should always be accessible from the floor state with getCurrentRoom().
    function getDescription() {
      return (typeof roomContents.description === 'function') ? roomContents.description():
        `<span class='fg-strong'>${roomContents.description}</span>`;
    }

    return {
      getCode: () => { return code; },
      getRange: () => { return roomContents.range; },
      getSecrecy: () => { return roomContents.secrecy; },
      getTrap: () => { return roomContents.trap; },
      getEpisode: () => { return roomContents.episode; },
      getCommands: () => { return (roomContents.commands || []).filter(command => Requirements.met(command.requires)); },
      getDescription,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
