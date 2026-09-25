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

    return {
      getCode: () => { return code; },
      getRequestParameters: context => { return request.getRequestParameters(context); },
      getRequestText: (context,parameters) => { return request.getRequestText(context,parameters); },
      isPossible,
      getAnswers,
      getAnswerText,
      isRepeatable: () => { return request.isRepeatable !== false; },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
