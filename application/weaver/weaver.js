global.Weaver = function(context) {

  // === Weaver String Replacement Formats ===
  // Regular Expressions for Life!
  //
  // Context Match: {@KEY}
  // - [KEY] A string value in the context object.
  //
  // Actor Match: {A:TOKEN}
  // - [A] The actor subject code points to an entity in the context.
  // - [TOKEN] Loom token.
  //
  // Item Match: {I.TOKEN}
  // - [I] Item subject code. An item subject can be an entity (for Items) or a code for articles.
  // - [TOKEN] Loom token.
  //
  // Utility Match: {UTIL} or {UTIL|ARG}
  // - [UTIL] The name of the utility.
  // - [ARG] Optional. The string argument to pass to the utility.
  //
  // Function Match: {FUNC()} or {FUNC(ARGS...)}
  // - [FUNC] The function name
  // - [ARGS] Comma separated list of arguments

  // We must prevent templates from being woven twice because quotes within a woven element would be treated as
  // quoted text, which then produces mangled HTML. Woven texts are prefixed with this invisible marker character.
  // If the template string contains this element, we know it's already been woven, and we throw an error.
  const WOVEN_MARKER = String.fromCharCode(0x2060); // U+2060 WORD JOINER

  const ACTOR_PATTERN = /{([^}]+):([^}]+)}/
  const CONTEXT_PATTERN = /{@([^}]+)}/
  const FUNCTION_PATTERN = /{(\w+)\(([^)]*)\)}/
  const UTILITY_PATTERN = /{([^}]+)\|([^}]+)}/
  const ITEM_PATTERN = /{([^}]+)\.([^}]+)}/
  const SIMPLE_PATTERN = /{([^}]+)}/

  const OPEN_SPAN_PATTERN = /{S\/([^}]+)}/;
  const CLOSE_SPAN = `{\/S}`;
  const QUOTE_PATTERN = /"([^"]+)"/g

  function weave(source) {

    if (source.includes(WOVEN_MARKER)) {
      throw new Error(`Error: This template string has already been woven, and cannot be woven again.`);
    }

    let text = replaceQuotes(source);
    let weaving = true;

    while (weaving) {
      let actorMatch = text.match(ACTOR_PATTERN);
      let contextMatch = text.match(CONTEXT_PATTERN);
      let functionMatch = text.match(FUNCTION_PATTERN);
      let utilityMatch = text.match(UTILITY_PATTERN);
      let itemMatch = text.match(ITEM_PATTERN);
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
      } else if (itemMatch) {
        text = text.replace(itemMatch[0], itemValue(itemMatch[1].trim(), itemMatch[2].trim()));
      } else if (openSpanMatch) {
        text = text.replace(openSpanMatch[0], openSpan(openSpanMatch[1]));
      } else if (closeSpanMatch) {
        text = text.replace(CLOSE_SPAN, `</span>`);
      } else if (simpleMatch) {
        text = text.replace(simpleMatch[0], simpleValue(simpleMatch[1].trim()));
      } else {
        weaving = false;
      }

      text.replace(/\s+/g,' ');
    }

    return `${WOVEN_MARKER}${StringHelper.pack(text)}`
  }

  function replaceQuotes(text) {
    return text.replaceAll('...','…').replace(QUOTE_PATTERN, (match, inner) => quoteSpan(inner));
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

  function itemValue(subject, token) {
    try {
      return ItemLoom.weave(context[subject], token)
    }
    catch (error) {
      onError('Item', error, { subject, token });
      return Weaver.formatError(`[${subject}.${token}]`);
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

  // TODO: These spans styles are only used in the battle system in the battle text panel. It's possible they may be
  //       used in the training or episode systems as well though. We'll either need to determine which system the key
  //       belongs to, or share classnames across systems. The weapon color style (wep) should use the rarity of the
  //       weapon. If we're getting the weapon name the context should have a weapon in it.
  function openSpan(key) { return `<span class='bt-${key}'>` }

  // The weaver replaces straight quotes with opening and closing quotes. Player responses should always be in button
  // choices, never quoted text, so any quoted text belongs to another character. At some point we may want a different
  // style for important characters. To do this we'll need to pass an additional speaker key parameter to the weave()
  // function. Given that key, we'll look up the actor component from the id and if this actor has a 'quote-classname'
  // attribute we'll add that to this span.
  function quoteSpan(text) {
    return `<span class='quote'>“${text}”</span>`;
  }

  function simpleValue(key) {
    if (key === 'teeth') { return Random.from(['teeth','fangs']); }

    if (key === 'breast') { return Random.fromFrequencyMap(BreastsLoom.breastWord); }
    if (key === 'breasts') { return Random.fromFrequencyMap(BreastsLoom.breastsWord); }
    if (key === 'balls') { return Random.fromFrequencyMap(CockLoom.ballsWords); }
    if (key === 'cock') { return Random.fromFrequencyMap(CockLoom.cockWords); }
    if (key === 'pussy') { return Random.fromFrequencyMap(PussyLoom.pussyWords); }

    if (key === 'Breast') { return StringHelper.titlecase(simpleValue('breast')); }
    if (key === 'Breasts') { return StringHelper.titlecase(simpleValue('breasts')); }
    if (key === 'Cock') { return StringHelper.titlecase(simpleValue('cock')); }
    if (key === 'Pussy') { return StringHelper.titlecase(simpleValue('pussy')); }

    if (key === 'party') { return partyName(); }

    return Weaver.formatWarning(`[${key}]`);
  }

  // TODO: What do you call your party? Are they your companions? girls? slaves? We need to have a way for the player
  //       to set this value. Maybe a drop down with valid options in the party configuration. For now we can just pick
  //       at random to make sure that all possible values sound right where they're used.
  function partyName() {
    return Random.from(['party','companions','girls','slaves','harem']);
  }

  function onError(type, error, data) {
    Console.logError(`Weaver:${type}Error thrown.`, error, { system:'Weaver', ...data });
  }

  return { weave };
};

Weaver.formatWarning = (message) => { return `<span class='weaver-warning'>${message}</span>`; }
Weaver.formatError = (message) => { return `<span class='weaver-error'>${message}</span>`; }
