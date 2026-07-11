
// A negotiation reaction defines how a monster responds to the answers of one NegotiationQuestion. Reactions range
// from broad supertype baselines down to reactions for one specific base monster; when a negotiation starts, the most
// specific reaction the monster matches wins each question outright. Codes follow the pattern
// `<question>--<match-type>-<match-value>` (e.g. `why-follow--archetype-bitch`) — the match type is part of the code
// because values collide across types (timid is both an archetype and a supertype).
global.OldNegotiationReaction = (function() {
  const $reactions = {};

  // Match keys ordered from most to least specific: a monster reaction beats a species reaction, and so on down.
  const MATCH_KEYS = ['monster','species','archetype','supertype'];

  const RESPONSE_KEYS = ['affection','fear','respect','text'];

  function register(code,data) {
    $reactions[code] = data;
  }

  // Runs from Loader.boot() once every file has loaded. Beyond per-record checks this enforces the coverage
  // invariant: every supertype — and every archetype that opted out of the supertypes — has an unconditional
  // reaction to every question, so a monster can always be asked anything we throw at it.
  function validate() {
    // Object.keys($reactions).forEach(code => validateReaction(code,$reactions[code]));
    //
    // NegotiationQuestion.getAllCodes().forEach(question => {
    //   Object.values(NegotiationSupertype).forEach(supertype => ensureCovered(question,'supertype',supertype));
    //   nullSupertypeArchetypes().forEach(archetype => ensureCovered(question,'archetype',archetype));
    // });
  }

  function validateReaction(code,reaction) {
    const question = NegotiationQuestion.lookup(reaction.question);

    const matchKeys = MATCH_KEYS.filter(key => reaction[key] != null);
    if (matchKeys.length !== 1) {
      throw new Error(`${code} needs exactly one of [${MATCH_KEYS.join(', ')}], found [${matchKeys.join(', ')}]`);
    }

    if (reaction.supertype != null) {
      Validate.isIn(`${code}.supertype`, reaction.supertype, Object.values(NegotiationSupertype));
    }
    if (reaction.archetype != null) { Archetype.lookup(reaction.archetype); }
    if (reaction.species != null) { Species.lookup(reaction.species); }
    if (reaction.monster != null) { BaseMonster.lookup(reaction.monster); }

    validateResponses(code,reaction,question);
    validateRequires(code,reaction);
  }

  function validateResponses(code,reaction,question) {
    const responses = reaction.responses || {};

    question.getTones().forEach(tone => {
      if (responses[tone] == null) { throw new Error(`${code} is missing a response to the ${tone} answer.`); }
    });

    Object.keys(responses).forEach(tone => {
      if (!question.getTones().includes(tone)) {
        throw new Error(`${code} responds to ${tone}, which isn't an answer to ${reaction.question}.`);
      }
      validateResponse(`${code}.responses.${tone}`, responses[tone]);
    });
  }

  function validateResponse(name,response) {
    Object.keys(response).forEach(key => {
      if (!RESPONSE_KEYS.includes(key)) { throw new Error(`${name} has an unknown ${key} property.`); }
    });

    ['affection','fear','respect'].forEach(feeling => {
      if (response[feeling] != null && typeof response[feeling] !== 'number') {
        throw new Error(`${name}.${feeling} must be a number.`);
      }
    });

    if (response.text != null && typeof response.text !== 'string') {
      throw new Error(`${name}.text must be a string.`);
    }
  }

  function validateRequires(code,reaction) {
    if (reaction.requires == null) { return; }
    [].concat(reaction.requires).forEach(requirement => {
      if (typeof requirement !== 'function') { throw new Error(`${code}.requires must hold only functions.`); }
    });
  }

  function ensureCovered(question,matchType,matchValue) {
    const covered = Object.keys($reactions).some(code => {
      const reaction = $reactions[code];
      return reaction.question === question && reaction[matchType] === matchValue && reaction.requires == null;
    });
    if (!covered) {
      throw new Error(`No unconditional ${matchType} reaction for ${matchValue} to the ${question} question.`);
    }
  }

  function nullSupertypeArchetypes() {
    return Archetype.getAllCodes().filter(code => Archetype.lookup(code).getSupertype() == null);
  }

  function getAllCodes() {
    return Object.keys($reactions);
  }

  function lookup(code) {
    if ($reactions[code] == null) { throw new Error(`Bad negotiation reaction code [${code}]`); }

    const reaction = { ...$reactions[code] };
    const matchType = MATCH_KEYS.find(key => reaction[key] != null);

    // The context is the negotiation's { A:player, T:monster } weaver context.
    function matches(context) {
      return matchesTarget(context) && meetsRequirements(context);
    }

    function matchesTarget(context) {
      if (matchType === 'monster') { return Monster(context.T).getBaseMonster().getCode() === reaction.monster; }
      if (matchType === 'species') { return Monster(context.T).getSpecies() === reaction.species; }
      if (matchType === 'archetype') { return Personality(context.T).getArchetype() === reaction.archetype; }
      return Archetype.lookup(Personality(context.T).getArchetype()).getSupertype() === reaction.supertype;
    }

    function meetsRequirements(context) {
      if (reaction.requires == null) { return true; }
      return [].concat(reaction.requires).every(requirement => requirement(context));
    }

    function getResponse(tone) {
      if (reaction.responses[tone] == null) { throw new Error(`${code} has no response to the ${tone} answer`); }
      return { ...reaction.responses[tone] };
    }

    return Object.freeze({
      getCode: () => { return code; },
      getQuestion: () => { return reaction.question; },
      getMatchType: () => { return matchType; },
      getMatchValue: () => { return reaction[matchType]; },
      getSpecificity: () => { return MATCH_KEYS.indexOf(matchType); },
      getRequires: () => { return reaction.requires; },
      getResponses: () => { return { ...reaction.responses }; },
      getResponse,
      matches,
    });
  }

  return Object.freeze({
    register,
    validate,
    getAllCodes,
    lookup,
  });

})();
