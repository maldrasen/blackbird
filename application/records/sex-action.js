global.SexAction = (function() {
  const $sexActions = {};

  const MainCategory = {
    foreplay: 'Foreplay',
    giving: 'Giving',
    performance: 'Performance',
    receiving: 'Receiving',
  };

  const PartCategory = {
    ass: 'Ass',
    breasts: 'Breasts',
    cock: 'Cock',
    hands: 'Hands',
    mouth: 'Mouth',
    none: 'None',
    pussy: 'Pussy',
  };

  const BaseClass = {
    emotional: 'emotional',
    performance: 'performance',
    reverseService: 'reverseService',
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

  function getPossible(context) {

    console.log("Context?",context)

    return Object.keys($sexActions).filter(key => {
      return lookup(key).isPossible(context);
    });
  }

  function lookup(code) {
    if ($sexActions[code] == null) { throw `Bad sex action code [${code}]` }

    const action = {...$sexActions[code]};

    function isPossible(context) {
      return CentralScrutinizer(context).allConditionsPass(action.requires||[]);
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return action.name; },
      getMainCategory: () => { return action.mainCategory; },
      getPartnerCategory: () => { return action.partnerCategory; },
      getPlayerCategory: () => { return action.playerCategory; },
      getConsentTarget: () => { return action.consentTarget; },
      getConsentFactors: () => { return [ ...action.consentFactors ]; },
      getRequires: () => { return action.requires||[]; },
      isPossible,

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
    MainCategory,
    PartCategory,
    register,
    getAllCodes,
    getPossible,
    lookup,
  });

})();
