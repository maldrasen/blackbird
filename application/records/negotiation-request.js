global.NegotiationRequest = (function() {
  const requests = {};

  function register(code,data) {
    requests[code] = data;
  }

  function getAllCodes() {
    return Object.keys(requests);
  }

  function lookup(code) {
    if (requests[code] == null) { throw new Error(`Bad negotiation request code [${code}]`); }

    const request = { ...requests[code] };

    function isPossible(context) {
      return (request.requirements || []).every(requirement => requirement(context));
    }

    function getAnswers(context) {
      return ObjectHelper.select(request.answers, (key, answer) => Requirements.met(answer.requires, context));
    }

    function getAnswerText(key, context, parameters) {
      const answer = getAnswers(context)[key];
      return typeof answer.text === 'string' ? answer.text : answer.text(parameters);
    }

    // Resolving the answer reaction gets the reaction for the player's answer, but it also resolves the request,
    // meaning that any resources that are removed as part of the negotiation happens here. This function should only
    // be called once, when the player chooses to respond to the request.
    function resolveAnswerReaction(key, context, parameters) {
      const answer = getAnswers(context)[key];
      return typeof answer.reaction === 'object' ? answer.reaction : answer.reaction(context,parameters);
    }

    return {
      getCode: () => { return code; },
      getRequestParameters: context => { return request.getRequestParameters(context); },
      getRequestText: (context,parameters) => { return request.getRequestText(context,parameters); },
      isPossible,
      getAnswers,
      getAnswerText,
      resolveAnswerReaction,
      isRepeatable: () => { return request.isRepeatable !== false; },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
