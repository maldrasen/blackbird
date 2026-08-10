global.EpisodeValidator = function(code, data) {
  const name = `Episode[${code}]`;

  if (data.layout != null) { Validate.isIn(`${name}.layout`, data.layout, ['novel','centered','large-centered']); }
  if (data.endFunction != null) { Validate.isFunction(`${name}.endFunction`, data.endFunction); }

  Validate.isArray(`${name}.pages`, data.pages);
  Validate.atLeast(`${name}.pages.length`, data.pages.length, 1);
  data.pages.forEach((page,index) => validatePage(`${name}.pages[${index}]`, page));
  validateJumps(name, data.pages);

  if (data.queue) { validateQueue(`${name}.queue`, data.queue); }

  function validatePage(name, page) {
    const hasContent = typeof page.content === 'string';
    const hasContentFunction = typeof page.contentFunction === 'function';
    if (hasContent === hasContentFunction) {
      throw new Error(`${name} needs exactly one of content or contentFunction`);
    }

    if (page.label != null) { Validate.isString(`${name}.label`, page.label); }
    validateNavigation(name, page);

    if (page.buttonsStyle != null) { Validate.isIn(`${name}.buttonsStyle`, page.buttonsStyle, ['row','column']); }
    if (page.onShow != null) { Validate.isFunction(`${name}.onShow`, page.onShow); }
    if (page.requires != null) { Validate.singleOrArrayOf(`${name}.requires`, page.requires, 'function'); }
    if (page.setFlag != null) { validateSetFlag(`${name}.setFlag`, page.setFlag); }

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
    validateNavigation(name, button);
    if (button.callback != null) { Validate.isFunction(`${name}.callback`, button.callback); }
    if (button.requires != null) { Validate.singleOrArrayOf(`${name}.requires`, button.requires, 'function'); }
    if (button.classname != null) { Validate.singleOrArrayOf(`${name}.classname`, button.classname, 'string'); }
  }

  // Flag values must be types that GameState.setFlag() accepts.
  function validateSetFlag(name, setFlag) {
    if (typeof setFlag !== 'object' || Array.isArray(setFlag)) { throw new Error(`${name} is not an object`); }
    Object.entries(setFlag).forEach(([key,value]) => {
      Validate.isIn(`${name}.${key}`, typeof value, ['boolean','number','string']);
    });
  }

  // Pages and buttons share the jump and end navigation properties.
  function validateNavigation(name, data) {
    if (data.jump != null) { Validate.isString(`${name}.jump`, data.jump); }
    Validate.trueOrNull(`${name}.end`, data.end);
    if (data.jump != null && data.end != null) { throw new Error(`${name} cannot have both jump and end`); }
  }

  // Page labels must be unique, and every jump must target a label that exists. Jumps on standard buttons are
  // skipped because all their custom properties are ignored.
  function validateJumps(name, pages) {
    const labels = [];
    pages.forEach(page => {
      if (page.label == null) { return; }
      if (labels.includes(page.label)) { throw new Error(`${name} has a duplicate page label [${page.label}]`); }
      labels.push(page.label);
    });

    pages.forEach((page,index) => {
      checkTarget(`${name}.pages[${index}]`, page.jump);
      (page.buttons || []).forEach((button,buttonIndex) => {
        if (button.standard != null) { return; }
        checkTarget(`${name}.pages[${index}].buttons[${buttonIndex}]`, button.jump);
      });
    });

    function checkTarget(name, jump) {
      if (jump != null && !labels.includes(jump)) { throw new Error(`${name} jumps to an unknown label [${jump}]`); }
    }
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
}
