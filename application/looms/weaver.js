global.Weaver = function(context) {

  const $context = context;

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

  function weave(source) {
    if (source == null) { return ''; }

    let text = `${source}`
    let weaving = true;

    while (weaving) {
      let actorMatch = text.match(ACTOR_PATTERN);
      let contextMatch = text.match(CONTEXT_PATTERN);
      let functionMatch = text.match(FUNCTION_PATTERN);
      let utilityMatch = text.match(UTILITY_PATTERN);
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
      } else if (simpleMatch) {
        text = text.replace(simpleMatch[0], simpleValue(simpleMatch[1].trim()));
      } else {
        weaving = false;
      }

      text.replace(/\s+/g,' ');
    }

    return text;
  }

  function contextValue(key) {
    return $context[key] ?  $context[key] : formatError(`[context.${key}==null]`)
  }

  function actorValue(subject, token) {
    try {
      return ActorLoom.weave(context[subject], token);
    }
    catch (error) {
      onError('Actor', error, { subject, token });
      return formatError(`[${subject}:${token}]`);
    }
  }

  function functionValue(name, argumentList) {
    return formatWarning(`[${name}(${JSON.stringify(argumentList)})]`)
  }

  function utilityValue(utility, argument) {
    try {
      return formatWarning(`[${utility}|${argument}]`);
    }
    catch (error) {
      onError('Utility', error, { utility, argument });
      return formatError(`[${utility}|${argument}]`);
    }
  }

  function simpleValue(key) {
    if (key === 'breast') { return Random.fromFrequencyMap({ tit:10, breast:8 }); }
    if (key === 'breasts') { return Random.fromFrequencyMap({ tits:10, breasts:8, jugs:1, hooters:1, knockers:1 }); }
    if (key === 'cock') { return Random.fromFrequencyMap({ cock:10, dick:3, shaft:1, length:1, manhood:1 }); }
    if (key === 'pussy') { return Random.fromFrequencyMap({ pussy:10, cunt:8, snatch:1, quim:1 }); }

    if (key === 'Breast') { return StringHelper.titlecase(simpleValue('breast')); }
    if (key === 'Breasts') { return StringHelper.titlecase(simpleValue('breasts')); }
    if (key === 'Cock') { return StringHelper.titlecase(simpleValue('cock')); }
    if (key === 'Pussy') { return StringHelper.titlecase(simpleValue('pussy')); }

    return formatWarning(`[${key}]`);
  }

  function formatWarning(message) { return `<span class='weaver-warning'>${message}</span>` }
  function formatError(message) { return `<span class='weaver-error'>${message}</span>` }

  function onError(type, error, data) {
    Console.logError(`Weaver:${type}Error thrown.`, error, { system:'Weaver', ...data });
  }

  return Object.freeze({
    weave
  });

};
