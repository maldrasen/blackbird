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

    const record = { ...contents[code] };

    function getDescription() {
      return (typeof record.description === 'function') ? record.description() : record.description;
    }

    return {
      getCode: () => { return code; },
      getEpisode: () => { return record.episode; },
      getCommands: () => { return (record.commands || []).filter(command => Requirements.met(command.requires)); },
      getDescription,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
