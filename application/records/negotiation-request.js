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

    function getAnswers(context) {
      return ObjectHelper.select(request.answers, (key, answer) => Requirements.met(answer.requires, context));
    }

    function getAnswerText(key, context, parameters) {
      const answer = getAnswers(context)[key];
      return Weaver(context).weave(typeof answer.text === 'string' ? answer.text : answer.text(parameters));
    }

    return {
      getCode: () => { return code; },
      getStaticRequirements: () => { return request.staticRequirements || []; },
      getRequestParameters: context => { return request.getRequestParameters(context); },
      getRequestText: (context,parameters) => { return request.getRequestText(context,parameters); },
      getAnswers,
      getAnswerText,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
