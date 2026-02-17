global.SexAction = (function() {
  const $sexActions = {};

  const BaseClass = {
    emotional: 'emotional',
    performance: 'performance',
    roughService: 'roughService',
    service: 'service',
    touching: 'touching',
  };

  function register(code,data) {
    $sexActions[code] = data;
  }

  function getAllCodes() {
    return Object.keys($sexActions);
  }

  function lookup(code) {
    if ($sexActions[code] === null) { throw `Bad sex action code [${code}]` }

    const action = {...$sexActions[code]};

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return action.name; },
      getMainCategory: () => { return action.mainCategory; },
      getPartCategory: () => { return action.partCategory; },
      getConsentTarget: () => { return action.consentTarget; },
      getConsentFactors: () => { return [ ...action.consentFactors ]; },

      // Include these when we're sure they're being used.
      // getAvailableWhile: () => { return action.availableWhile },
      // getPersistPlayer: () => { return action.persistPlayer; },
      // getPersistPartner: () => { return action.persistPartner; },
      // getComplementing: () => { return action.complementing; },
      // getConflicting: () => { return action.conflicting; },
    });
  }

  return Object.freeze({
    BaseClass,
    register,
    getAllCodes,
    lookup,
  });

})();
