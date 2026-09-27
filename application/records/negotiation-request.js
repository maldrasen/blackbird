global.NegotiationRequest = (function() {
  const requests = {};

  let whitelist;

  function register(code,data) {
    requests[code] = data;
  }

  function getAllCodes() {
    return Object.keys(requests);
  }

  function getAllowedCodes() { return whitelist ? Object.keys(requests).filter(code => whitelist.includes(code)) : getAllCodes(); }
  function setWhitelist(list) { whitelist = list; }
  function clearWhitelist() { whitelist = null; }

  function lookup(code) {
    if (requests[code] == null) { throw new Error(`Bad negotiation request code [${code}]`); }

    const request = { ...requests[code] };

    function getRequestParameters(context) {
      return typeof request.requestParameters === 'function' ?
        request.requestParameters(context) :
        (request.requestParameters || {});
    }

    function getRequestText(context, parameters) {
      return typeof request.requestText === 'function' ?
        request.requestText(context,parameters) :
        request.requestText;
    }

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
      getRequestParameters,
      getRequestText,
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
    getAllowedCodes,
    setWhitelist,
    clearWhitelist,
    lookup,
  };

})();
