Record.define('NegotiationRequest', {
  getInstance: request => {

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

    // The request answers will either be an object in the shape:
    //   { yes:{ text, reaction, requires }, no:{ text, reaction, requires } }
    // or a function that returns an object in that shape.
    function getAnswers(context, parameters) {
      const answers = typeof request.answers === 'function' ? request.answers(context,parameters) : request.answers;
      return ObjectHelper.select(answers, (key, answer) => Requirements.met(answer.requires, context));
    }

    function getAnswerText(key, context, parameters) {
      const answer = getAnswers(context, parameters)[key];
      return typeof answer.text === 'string' ? answer.text : answer.text(parameters);
    }

    // Resolving the answer reaction gets the reaction for the player's answer, but it also resolves the request,
    // meaning that any resources that are removed as part of the negotiation happens here. This function should only
    // be called once, when the player chooses to respond to the request.
    function resolveAnswerReaction(key, context, parameters) {
      const answer = getAnswers(context, parameters)[key];
      return typeof answer.reaction === 'object' ? answer.reaction : answer.reaction(context,parameters);
    }

    return {
      getRequestParameters,
      getRequestText,
      isPossible,
      getAnswers,
      getAnswerText,
      resolveAnswerReaction,
      isRepeatable: () => { return request.isRepeatable !== false; },
    };
  },

  // A whitelist narrows the requests a negotiation can draw from. Specs use it to pin the requests they expect.
  functions: () => {
    let whitelist = null;

    function getAllowedCodes() {
      const codes = NegotiationRequest.getAllCodes();
      return whitelist ? codes.filter(code => whitelist.includes(code)) : codes;
    }

    return {
      getAllowedCodes,
      setWhitelist: list => { whitelist = list; },
      clearWhitelist: () => { whitelist = null; },
    };
  },
});
