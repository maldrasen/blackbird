global.EpisodeValidator = function(code, data) {
  const name = `Episode[${code}]`;

  if (data.layout != null) { Validate.isIn(`${name}.layout`, data.layout, ['novel','centered','large-centered']); }
  if (data.endFunction != null) { Validate.isFunction(`${name}.endFunction`, data.endFunction); }

  Validate.isArray(`${name}.pages`, data.pages);
  Validate.atLeast(`${name}.pages.length`, data.pages.length, 1);
  data.pages.forEach((page,index) => validatePage(`${name}.pages[${index}]`, page));

  if (data.queue) { validateQueue(`${name}.queue`, data.queue); }

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
}
