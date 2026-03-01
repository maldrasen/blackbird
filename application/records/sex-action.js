global.SexAction = (function() {
  const $sexActions = {};

  const MainCategory = {
    foreplay: 'foreplay',
    giving: 'giving',
    performance: 'performance',
    receiving: 'receiving',
    sex: 'sex',
  };

  const PartCategory = {
    ass: 'ass',
    breasts: 'breasts',
    cock: 'cock',
    hands: 'hands',
    mouth: 'mouth',
    none: 'none',
    pussy: 'pussy',
  };

  const BaseClass = {
    emotional: 'emotional',
    performance: 'performance',
    penetration: 'penetration',
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
    return Object.keys($sexActions).filter(key => {
      return lookup(key).isPossible(context);
    });
  }

  function lookup(code) {
    if ($sexActions[code] == null) { throw `Bad sex action code [${code}]` }

    const action = {...$sexActions[code]};

    function getDescription(context) {
      return Weaver(context).weave(action.description);
    }

    // TODO: This function will need to determine things like arousal state (is cock hard) and if an insertion can
    //       possibly fit into an orifice. The orifice size calculations can change during training, so this needs to
    //       be recalculated every turn.
    function isAvailable(context) {
      return true;
    }

    // The isPossible() checks the basic action requirements to hide actions that will not ever be possible during this
    // training. These are conditions like, you can't get a tail job, when a character doesn't have a tail.
    function isPossible(context) {
      return CentralScrutinizer(context).allConditionsPass(action.requires||[]);
    }

    function directionHasPlayerActingOnPartner() {
      return [ActionDirection.playerToPartner, ActionDirection.playerToBoth].includes(action.direction)
    }

    function directionHasPartnerActingOnPlayer() {
      return [ActionDirection.partnerToPlayer, ActionDirection.partnerToBoth].includes(action.direction)
    }


    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return action.name; },
      getTime: () => { return action.time; },
      getPartnerStamina: () => { return action.partnerStamina; },
      getPlayerStamina: () => { return action.playerStamina; },
      getMainCategory: () => { return action.mainCategory; },
      getPartnerCategory: () => { return action.partnerCategory; },
      getPlayerCategory: () => { return action.playerCategory; },
      getDirection: () => { return action.direction },
      directionHasPlayerActingOnPartner,
      directionHasPartnerActingOnPlayer,
      getConsentTarget: () => { return action.consentTarget; },
      getConsentFactors: () => { return [ ...action.consentFactors ]; },
      getTechniqueTarget: () => { return action.techniqueTarget; },
      getRequires: () => { return action.requires||[]; },
      getPartnerSensations: () => { return { ...action.partnerSensations }; },
      getPlayerSensations: () => { return { ...action.playerSensations }; },
      getSkills: () => { return { ...action.skills }; },
      getAlignment: () => { return { ...action.alignment }; },
      getDescription,
      isAvailable,
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
