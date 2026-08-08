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
//   repeat        true keeps the episode in the queue after it fires. Omit for one-shot.
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
    const name = `Episode[${code}]`;

    if (data.layout != null) { Validate.isIn(`${name}.layout`, data.layout, Object.keys(views)); }
    if (data.endFunction != null) { Validate.isFunction(`${name}.endFunction`, data.endFunction); }

    Validate.isArray(`${name}.pages`, data.pages);
    Validate.atLeast(`${name}.pages.length`, data.pages.length, 1);
    data.pages.forEach((page,index) => validatePage(`${name}.pages[${index}]`, page));

    if (data.queue) { validateQueue(`${name}.queue`, data.queue); }
  }

  function validatePage(name, page) {
    const hasContent = typeof page.content === 'string';
    const hasContentFunction = typeof page.contentFunction === 'function';
    if (hasContent === hasContentFunction) {
      throw new Error(`${name} needs exactly one of content or contentFunction`);
    }

    if (page.buttonsStyle != null) { Validate.isIn(`${name}.buttonsStyle`, page.buttonsStyle, ['row','column']); }
    if (page.onShow != null) { Validate.isFunction(`${name}.onShow`, page.onShow); }
    if (page.requires != null) { Validate.singleOrArrayOf(`${name}.requires`, page.requires, 'function'); }

    if (page.buttons != null) {
      Validate.isArray(`${name}.buttons`, page.buttons);
      page.buttons.forEach((button,index) => validateButton(`${name}.buttons[${index}]`, button));
    }
  }

  function validateButton(name, button) {
    if (button.standard != null) {
      Validate.isIn(`${name}.standard`, button.standard, ['continue']);
      return;
    }

    Validate.isString(`${name}.label`, button.label);
    if (button.callback != null) { Validate.isFunction(`${name}.callback`, button.callback); }
    if (button.requires != null) { Validate.singleOrArrayOf(`${name}.requires`, button.requires, 'function'); }
    if (button.classname != null) { Validate.singleOrArrayOf(`${name}.classname`, button.classname, 'string'); }
  }

  function validateQueue(name, queue) {
    Validate.singleKeyFrom(name, queue, ['global','district','location']);
    Validate.exists(name, queue.global || queue.district || queue.location,
      `${name} needs one of global, district, or location`);

    if (queue.on != null) { Validate.isIn(`${name}.on`, queue.on, ['enter','move']); }
    if (queue.chance != null) { Validate.between(`${name}.chance`, queue.chance, 0, 100); }
    if (queue.priority != null) { Validate.isNumber(`${name}.priority`, queue.priority); }
    if (queue.removeWhen != null) { Validate.isFunction(`${name}.removeWhen`, queue.removeWhen); }
    if (queue.requires != null) { Validate.singleOrArrayOf(`${name}.requires`, queue.requires, 'function'); }

    Validate.trueOrNull(`${name}.repeat`, queue.repeat);
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
