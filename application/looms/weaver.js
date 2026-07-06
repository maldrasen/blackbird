global.Weaver = function(context) {

  // === Weaver String Replacement Formats ===
  // Regular Expressions for Life!
  //
  // Context Match: {@KEY}
  //     - [KEY] A string value in the context object.
  //
  // Actor Match: {A:LOOM}
  //      - [A] Actor subject Code. There should be a single character code for
  //            an Actor reference within the context's actor's object.
  //      - [LOOM] Loom token. This is the Loom object and function to pass the actor into.
  //
  // Utility Match: {UTIL} or {UTIL|ARG}
  //      - [UTIL] The name of the utility.
  //      - [ARG] Optional. The string argument to pass to the utility.
  //
  // Function Match: {FUNC()} or {FUNC(ARGS...)}
  //      - [FUNC] The function name
  //      - [ARGS] Comma separated list of arguments

  const ACTOR_PATTERN = /{([^}]+):([^}]+)}/
  const CONTEXT_PATTERN = /{@([^}]+)}/
  const FUNCTION_PATTERN = /{(\w+)\(([^)]*)\)}/
  const UTILITY_PATTERN = /{([^}]+)\|([^}]+)}/
  const SIMPLE_PATTERN = /{([^}]+)}/

  const OPEN_SPAN_PATTERN = /{S\/([^}]+)}/;
  const CLOSE_SPAN = `{\/S}`;

  function weave(source) {
    if (source == null) { return ''; }

    let text = `${source}`
    let weaving = true;

    while (weaving) {
      let actorMatch = text.match(ACTOR_PATTERN);
      let contextMatch = text.match(CONTEXT_PATTERN);
      let functionMatch = text.match(FUNCTION_PATTERN);
      let utilityMatch = text.match(UTILITY_PATTERN);
      let openSpanMatch = text.match(OPEN_SPAN_PATTERN);
      let closeSpanMatch = text.includes(CLOSE_SPAN);
      let simpleMatch = text.match(SIMPLE_PATTERN);

      if (contextMatch) {
        text = text.replace(contextMatch[0], contextValue(contextMatch[1].trim()));
      } else if (actorMatch) {
        text = text.replace(actorMatch[0], actorValue(actorMatch[1].trim(), actorMatch[2].trim()));
      } else if (functionMatch) {
        const value = functionValue(functionMatch[1].trim(),functionMatch[2].split(',').map(s => s.trim()))
        text = text.replace(functionMatch[0],value||'');
      } else if (utilityMatch) {
        text = text.replace(utilityMatch[0], utilityValue(utilityMatch[1].trim(), utilityMatch[2].trim()));
      } else if (openSpanMatch) {
        text = text.replace(openSpanMatch[0], `<span style="${styleFor(openSpanMatch[1])}">`)
      } else if (closeSpanMatch) {
        text = text.replace(CLOSE_SPAN, `</span>`);
      } else if (simpleMatch) {
        text = text.replace(simpleMatch[0], simpleValue(simpleMatch[1].trim()));
      } else {
        weaving = false;
      }

      text.replace(/\s+/g,' ');
    }

    return StringHelper.pack(text);
  }

  function contextValue(key) {
    return context[key] ?  context[key] : Weaver.formatError(`[context.${key}==null]`)
  }

  function actorValue(subject, token) {
    try {
      return ActorLoom.weave(context[subject], token);
    }
    catch (error) {
      onError('Actor', error, { subject, token });
      return Weaver.formatError(`[${subject}:${token}]`);
    }
  }

  function functionValue(name, argumentList) {
    try {
      return FunctionLoom.weave(context, name, argumentList);
    }
    catch (error) {
      onError('Function', error, { context, name, argumentList });
      return Weaver.formatError(`[${name}(${argumentList.join(',')})]`);
    }
  }

  function utilityValue(utility, argument) {
    try {
      return UtilityLoom.weave(utility, argument);
    }
    catch (error) {
      onError('Utility', error, { utility, argument });
      return Weaver.formatError(`[${utility}|${argument}]`);
    }
  }

  // TODO: Define these colors somewhere else.
  // TODO: Weapon color should use the rarity of the weapon, which the 'hisWeaponName' function loom should have.
  function styleFor(key) {
    switch(key) {
      case 'abl': return `color: rgb(160,120,150)`; // Ability
      case 'act': return `color: rgb(150,150,200)`; // Acting Character or Monster
      case 'pst': return `color: rgb(120,190,110)`; // Positive Status
      case 'nst': return `color: rgb(190,100,180)`; // Negative Status
      case 'tar': return `color: rgb(200,150,120)`; // Target
      case 'wep': return `color: rgb(100,150,60)`;  // Weapon
      default: return `color:red`;
    }
  }

  function simpleValue(key) {
    if (key === 'breast') { return Random.fromFrequencyMap(BreastsLoom.breastWord); }
    if (key === 'breasts') { return Random.fromFrequencyMap(BreastsLoom.breastsWord); }
    if (key === 'cock') { return Random.fromFrequencyMap(CockLoom.cockWords); }
    if (key === 'pussy') { return Random.fromFrequencyMap(PussyLoom.pussyWords); }

    if (key === 'Breast') { return StringHelper.titlecase(simpleValue('breast')); }
    if (key === 'Breasts') { return StringHelper.titlecase(simpleValue('breasts')); }
    if (key === 'Cock') { return StringHelper.titlecase(simpleValue('cock')); }
    if (key === 'Pussy') { return StringHelper.titlecase(simpleValue('pussy')); }

    return Weaver.formatWarning(`[${key}]`);
  }

  function onError(type, error, data) {
    Console.logError(`Weaver:${type}Error thrown.`, error, { system:'Weaver', ...data });
  }

  return Object.freeze({
    weave,
  });
};

Weaver.formatWarning = (message) => { return `<span class='weaver-warning'>${message}</span>`; }
Weaver.formatError = (message) => { return `<span class='weaver-error'>${message}</span>`; }

