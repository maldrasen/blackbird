// Episode.register(code, data) — data properties:
//
//   layout        'novel' (default) | 'centered' | 'large-centered'
//   background    Image path. Defaults to the current location's background, then 'backgrounds/episode.jpg'.
//   pages         Array of page objects, shown in order. (See below.)
//   endFunction   Called when the episode ends. When omitted the game returns to the previous game mode.
//   queue         Queue metadata, read by EpisodeQueue when the episode is pushed and on every move evaluation.
//                 Only needed for episodes that fire from the queue; episodes started directly can omit it.
//
// Queue properties: (See EpisodeQueue for how candidates are ranked and evaluated.)
//
//   Placement — exactly one of:
//   global        true — the episode can fire on any move.
//   district      A district code. The episode can fire on moves ending in that district.
//   location      A location code. The episode fires only on moves ending at that exact location.
//
//   on            'enter' fires only when the move crossed into the destination district; 'move' fires only on
//                 moves within it. Omit to allow both. Ignored when the episode matched by exact location.
//   priority      Number, higher fires first. Use an EpisodePriority value. Ties are broken by place specificity
//                 (location > district > global), then queue order. Default 0.
//   chance        Percent chance (0-100) to fire when eligible. Default 100.
//   repeat        true keeps the episode in the queue after it fires. Default is one-shot.
//   requires      Predicate or array of predicates, passed the context {P:player}. All must pass to fire.
//   removeWhen    Predicate, passed the same context. When true the episode is removed without firing.
//
// Page properties:
//
//   content          HTML string. Woven with the episode context before rendering.
//   contentFunction  () => HTML string, for content built at display time. Each page needs exactly one of
//                    content or contentFunction.
//   requires         Predicate or array of predicates, passed the EpisodeState. Unmet pages are skipped.
//   buttons          Array of button objects. (See below.) With no buttons a click (or space/enter)
//                    advances to the next page.
//   buttonsStyle     'column' stacks the buttons vertically. Default is a row.
//   onShow           Function called after the page is rendered.
//
// Button properties:
//
//   standard    'continue' renders the canned continue button; all other properties are ignored.
//   label       Button text. Required unless standard is set.
//   callback    Called when the button is clicked or chosen with a number key.
//   requires    Predicate or array of predicates, passed the EpisodeState. Unmet buttons aren't rendered.
//   id          Element id.
//   classname   Classname string or array of classnames.
global.Episode = (function() {
  const episodes = {};

  const views = {
    'novel': `views/episode-novel.html`,
    'centered': `views/episode-centered.html`,
    'large-centered': `views/episode-large-centered.html`,
  }

  function register(code,data) {
    validate(code,data);
    episodes[code] = data;
  }

  // Validates the record shape documented above, so that a malformed episode fails loudly at load time rather than
  // when it's first shown.
  function validate(code,data) {
    const fail = message => { throw new Error(`Episode [${code}] ${message}`); };

    if (data.layout != null && views[data.layout] == null) { fail(`has an unknown layout [${data.layout}]`); }
    if (data.endFunction != null && typeof data.endFunction !== 'function') { fail(`endFunction must be a function`); }
    if (Array.isArray(data.pages) === false || data.pages.length === 0) { fail(`needs at least one page`); }

    data.pages.forEach((page,index) => validatePage(page, message => fail(`page ${index} ${message}`)));
    if (data.queue) { validateQueue(data.queue, fail); }
  }

  function validatePage(page, fail) {
    const hasContent = typeof page.content === 'string';
    const hasContentFunction = typeof page.contentFunction === 'function';
    if (hasContent === hasContentFunction) { fail(`needs exactly one of content or contentFunction`); }

    if (page.buttonsStyle != null && ['row','column'].includes(page.buttonsStyle) === false) {
      fail(`has an unknown buttonsStyle [${page.buttonsStyle}]`);
    }
    if (page.onShow != null && typeof page.onShow !== 'function') { fail(`onShow must be a function`); }
    if (validRequires(page.requires) === false) { fail(`requires must be a function or an array of functions`); }
    if (page.buttons != null && Array.isArray(page.buttons) === false) { fail(`buttons must be an array`); }

    (page.buttons || []).forEach((button,index) => validateButton(button, message => fail(`button ${index} ${message}`)));
  }

  function validateButton(button, fail) {
    if (button.standard != null) {
      if (button.standard !== 'continue') { fail(`has an unknown standard button [${button.standard}]`); }
      return;
    }

    if (typeof button.label !== 'string') { fail(`needs a label`); }
    if (button.callback != null && typeof button.callback !== 'function') { fail(`callback must be a function`); }
    if (validRequires(button.requires) === false) { fail(`requires must be a function or an array of functions`); }
    if (validClassname(button.classname) === false) { fail(`classname must be a string or an array of strings`); }
  }

  function validateQueue(queue, fail) {
    const placements = ['global','district','location'].filter(key => queue[key] != null);
    if (placements.length !== 1) { fail(`queue needs exactly one of global, district, or location`); }

    if (queue.on != null && ['enter','move'].includes(queue.on) === false) {
      fail(`queue on must be 'enter' or 'move'`);
    }
    if (queue.chance != null && (typeof queue.chance !== 'number' || queue.chance < 0 || queue.chance > 100)) {
      fail(`queue chance must be a number from 0 to 100`);
    }
    if (queue.priority != null && typeof queue.priority !== 'number') { fail(`queue priority must be a number`); }
    if (queue.repeat != null && typeof queue.repeat !== 'boolean') { fail(`queue repeat must be a boolean`); }
    if (queue.removeWhen != null && typeof queue.removeWhen !== 'function') { fail(`queue removeWhen must be a function`); }
    if (validRequires(queue.requires) === false) { fail(`queue requires must be a function or an array of functions`); }
  }

  function validRequires(requires) {
    if (requires == null) { return true; }
    if (Array.isArray(requires)) { return requires.every(entry => typeof entry === 'function'); }
    return typeof requires === 'function';
  }

  function validClassname(classname) {
    if (classname == null) { return true; }
    if (Array.isArray(classname)) { return classname.every(entry => typeof entry === 'string'); }
    return typeof classname === 'string';
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

    return Object.freeze({
      getCode: () => { return code; },
      getContent: () => { return views[getLayout()]; },
      getEndFunction: () => { return episode.endFunction; },
      getQueue: () => { return episode.queue; },
      getPages: () => { return episode.pages; },
      getBackground,
      getLayout,
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
