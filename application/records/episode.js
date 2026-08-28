/*
# Episode Properties
- `layout`        [novel (default), centered, large-centered]
- `background`    Image path. Defaults to the current location's background, then 'backgrounds/episode.jpg'.
- `pages`         Array of page objects, shown in order. (See below.)
- `endFunction`   Called when the episode ends. When omitted the game returns to the previous game mode.
- `repeat`        true lets the episode fire again after it has been viewed. Omit for one-time episodes.
- `requires`      Predicate or array of predicates, passed the context {P:player}. All must pass for the episode
                  to fire, whether it comes from the queue or is triggered by something like a room's contents.
- `queue`         Queue metadata, read by EpisodeQueue when the episode is pushed and on every move evaluation.
                  Only needed for episodes that fire from the queue; episodes started directly can omit it.

### Queue properties: (See EpisodeQueue for how candidates are ranked and evaluated.)
- `placement`     [global, district, location]
- `on`            [enter, move] 'enter' fires only when the move crossed into the destination district; 'move' fires
                  only on moves within it. Omit to allow both. Ignored when the episode matched by exact location.
- `priority`      Number, higher fires first. Use an EpisodePriority value. Ties are broken by place specificity
                  (location > district > global), then queue order. Default 0.
- `chance`        Percent chance (0-100) to fire when eligible. Default 100.
- `removeWhen`    Predicate, passed the same context. When true the episode is removed without firing.

### Page properties:
- `content`          HTML string. Woven with the episode context before rendering.
- `contentFunction`  () => HTML string, for content built at display time. Each page needs exactly one of
                     content or contentFunction.
- `label`            String, unique within the episode. Names the page as a jump target.
- `jump`             Page label. Advancing from this page jumps there (in either direction) instead of falling
                     through to the next page in the array. Mutually exclusive with end.
- `end`              true ends the episode when advancing from this page instead of falling through.
- `requires`         Predicate or array of predicates, passed the EpisodeState. Unmet pages are skipped.
- `buttons`          Array of button objects. (See below.) With no buttons a click (or space/enter)
                     advances to the next page.
- `buttonsStyle`     'column' stacks the buttons vertically. Default is a row.
- `onShow`           Function called after the page is rendered.

### Button properties:
- `standard`        ['continue'] Renders a canned button (only continue for now) all other properties are ignored.
- `label`           Button text. Required unless standard is set.
- `callback`        Called when the button is clicked or chosen with a number key. A side effect that runs before
                    jump or end; a button with neither is expected to advance the episode itself, if at all.
- `jump`            Page label. Clicking jumps to that page. Mutually exclusive with end.
- `end`             true ends the episode when clicked.
- `startEncounter`  { record } Clicking ends the episode (skipping the endFunction) and starts a battle with that
                    encounter record. Mutually exclusive with jump and end.
- `requires`        Predicate or array of predicates, passed the EpisodeState. Unmet buttons aren't rendered.
- `id`              Element id.
- `classname`       Classname string or array of classnames.
*/
global.Episode = (function() {
  const episodes = {};

  function register(code,data) {
    EpisodeValidator(code,data);
    episodes[code] = data;
  }

  function getAllCodes() {
    return Object.keys(episodes);
  }

  function lookup(code) {
    if (episodes[code] == null) { throw new Error(`Bad episode code [${code}]`); }

    const episode = { ...episodes[code] };

    function getLayout() {
      return episode.layout || 'novel';
    }

    function getBackground() {
      const location = GameSystem.getState().getCurrentLocation();
      if (episode.background) { return episode.background; }
      if (location) { return Location.lookup(location).getBackground(); }
      return 'backgrounds/episode.jpg';
    }

    // A one-time episode that has already been viewed no longer meets its requirements, so it can never fire twice.
    function meetsRequirements() {
      const state = GameSystem.getState();
      if (episode.repeat !== true && state.hasViewedEpisode(code)) { return false; }
      return Requirements.met(episode.requires, { P:state.getPlayer() });
    }

    return {
      getCode: () => { return code; },
      getEndFunction: () => { return episode.endFunction; },
      getQueue: () => { return episode.queue; },
      getPages: () => { return episode.pages; },
      getRepeat: () => { return episode.repeat === true; },
      getBackground,
      getLayout,
      meetsRequirements,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
