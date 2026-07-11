// A negotiation question is what a cornered monster asks the player, SMT-style. The questions and their answers are
// the same for every monster — what differs is the monster's NegotiationReaction to each answer. Answers are keyed by
// the NegotiationTone they represent, and their authored order drives the order of the answer buttons.
global.NegotiationQuestion = (function() {
  const questions = {};
  const questionReactions = {};

  function register(code, data) {
    questions[code] = data;
    questionReactions[code] = [];
  }

  function registerReaction(code, data) {
    questionReactions[code].push(data);
  }

  function validate() {
    // Object.keys($questions).forEach(code => {
    //   const question = $questions[code];
    //   Validate.exists(`${code}.text`, question.text);
    //   Validate.exists(`${code}.answers`, question.answers);
    //
    //   const tones = Object.keys(question.answers);
    //   Validate.equals(`${code}.answers`, tones.length, 4,
    //     `A negotiation question needs exactly 4 answers, ${code} has ${tones.length}.`);
    //
    //   tones.forEach(tone => {
    //     Validate.isIn(`${code}.answers`, tone, Object.values(NegotiationTone));
    //     if (typeof question.answers[tone] !== 'string' || question.answers[tone].length === 0) {
    //       throw new Error(`${code}.answers.${tone} must be a non-empty string.`);
    //     }
    //   });
    // });
  }

  function getAllCodes() {
    return Object.keys(questions);
  }

  function lookup(code) {
    if (questions[code] == null) { throw new Error(`Bad negotiation question code [${code}]`); }

    const question = questions[code];
    const reactions = questionReactions[code];

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

