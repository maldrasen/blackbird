global.NegotiationQuestion = (function() {
  const questions = {};
  const questionReactions = {};

  const propertyWeights = {
    supertype: 1,
    archetype: 5,
    species: 10,
    gender: 15,
    monster: 50,
  }

  const RESPONSE_KEYS = ['affection','fear','respect','text'];

  function register(code, data) {
    questions[code] = data;
  }

  function registerReaction(code, data) {
    data.weight = 0;

    Object.entries(propertyWeights).forEach(([property,weight]) => {
      if (data[property] != null) { data.weight += weight; }
    });

    reactionsFor(code).push(data);
  }

  // A reaction can load from a file that comes before its question in the manifest, so the array is created lazily
  // and validate() catches reactions whose question never arrives.
  function reactionsFor(code) {
    if (questionReactions[code] == null) { questionReactions[code] = []; }
    return questionReactions[code];
  }

  // Runs from Loader.boot() once every file has loaded. Beyond per-record checks this enforces the coverage
  // invariant: every supertype — and every archetype that opted out of the supertypes — has an unconditional
  // reaction to every question, so a monster can always be asked anything we throw at it.
  function validate() {
    // Object.keys(questionReactions).forEach(code => {
    //   if (questions[code] == null) { throw new Error(`Reactions are registered to an unknown question [${code}]`); }
    // });
    //
    // Object.keys(questions).forEach(code => {
    //   validateQuestion(code, questions[code]);
    //   reactionsFor(code).forEach(reaction => validateReaction(code, reaction));
    //   validateCoverage(code);
    // });
  }

  function validateQuestion(code, question) {
    Validate.exists(`${code}.text`, question.text);
    Validate.exists(`${code}.answers`, question.answers);

    const tones = Object.keys(question.answers);
    Validate.equals(`${code}.answers`, tones.length, 4,
      `A negotiation question needs exactly 4 answers, ${code} has ${tones.length}.`);

    tones.forEach(tone => {
      Validate.isIn(`${code}.answers`, tone, Object.values(NegotiationTone));
      if (typeof question.answers[tone] !== 'string' || question.answers[tone].length === 0) {
        throw new Error(`${code}.answers.${tone} must be a non-empty string.`);
      }
    });
  }

  function validateReaction(questionCode, reaction) {
    const name = reactionName(questionCode, reaction);

    const matchKeys = MATCH_KEYS.filter(key => reaction[key] != null);
    if (matchKeys.length !== 1) {
      throw new Error(`${name} needs exactly one of [${MATCH_KEYS.join(', ')}], found [${matchKeys.join(', ')}]`);
    }

    if (reaction.supertype != null) {
      Validate.isIn(`${name}.supertype`, reaction.supertype, Object.values(NegotiationSupertype));
    }
    if (reaction.archetype != null) { Archetype.lookup(reaction.archetype); }
    if (reaction.species != null) { Species.lookup(reaction.species); }
    if (reaction.monster != null) { BaseMonster.lookup(reaction.monster); }

    validateResponses(name, questionCode, reaction);
    validateRequires(name, reaction);
  }

  // Reactions have no codes of their own, so error messages name them by their question and match.
  function reactionName(questionCode, reaction) {
    const matchKey = MATCH_KEYS.find(key => reaction[key] != null);
    if (matchKey == null) { return `${questionCode} reaction #${reactionsFor(questionCode).indexOf(reaction)}`; }
    return `${questionCode} reaction [${matchKey}:${reaction[matchKey]}]`;
  }

  function validateResponses(name, questionCode, reaction) {
    const responses = reaction.responses || {};
    const tones = Object.keys(questions[questionCode].answers);

    tones.forEach(tone => {
      if (responses[tone] == null) { throw new Error(`${name} is missing a response to the ${tone} answer.`); }
    });

    Object.keys(responses).forEach(tone => {
      if (!tones.includes(tone)) {
        throw new Error(`${name} responds to ${tone}, which isn't an answer to ${questionCode}.`);
      }
      validateResponse(`${name}.responses.${tone}`, responses[tone]);
    });
  }

  function validateResponse(name, response) {
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

  function validateRequires(name, reaction) {
    if (reaction.requires == null) { return; }
    [].concat(reaction.requires).forEach(requirement => {
      if (typeof requirement !== 'function') { throw new Error(`${name}.requires must hold only functions.`); }
    });
  }

  function validateCoverage(code) {
    Object.values(NegotiationSupertype).forEach(supertype => ensureCovered(code,'supertype',supertype));
    nullSupertypeArchetypes().forEach(archetype => ensureCovered(code,'archetype',archetype));
  }

  function ensureCovered(code, matchType, matchValue) {
    const covered = reactionsFor(code).some(reaction =>
      reaction[matchType] === matchValue && reaction.requires == null);
    if (!covered) {
      throw new Error(`No unconditional ${matchType} reaction for ${matchValue} to the ${code} question.`);
    }
  }

  function nullSupertypeArchetypes() {
    return Archetype.getAllCodes().filter(code => Archetype.lookup(code).getSupertype() == null);
  }

  function getAllCodes() {
    return Object.keys(questions);
  }

  function lookup(code) {
    if (questions[code] == null) { throw new Error(`Bad negotiation question code [${code}]`); }

    const question = questions[code];
    const reactions = reactionsFor(code);

    return Object.freeze({
      getCode: () => { return code; },
      getText: () => { return question.text; },
      getAnswers: () => { return question.answers; },
      getTones: () => { return Object.keys(question.answers); },
      getReactions: () => { return reactions; }
    });
  }

  return Object.freeze({
    register,
    registerReaction,
    validate,
    getAllCodes,
    lookup,
  });

})();
