global.SexAction = (function() {
  const $sexActions = {};

  function register(code,data) {
    $sexActions[code] = data;
  }

  function getAllCodes() {
    return Object.keys($sexActions);
  }

  function lookup(code) {
    const action = $sexActions[code];

    if (action === null) {
      throw `Bad sex action code [${code}]`
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return action.name; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
