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

    return Object.freeze({
      getCode: () => { return code; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
