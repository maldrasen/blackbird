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

    function directionHasPlayerActingOnPartner() {
      return [ActionDirection.playerToPartner, ActionDirection.playerToBoth].includes(action.direction);
    }

    function directionHasPartnerActingOnPlayer() {
      return [ActionDirection.partnerToPlayer, ActionDirection.partnerToBoth].includes(action.direction);
    }

    // The getActingCharacter() function should always return player or partner I think. If an assistant is involved in
    // this action either the player or the partner will still be the primary actor. Mutual actions return the 'player'
    // as the actor so that mutual persisted actions are organized under the player.
    function getActingCharacter() {
      if (action.direction === ActionDirection.mutual) { return 'player'; }
      if (action.direction.match(/player-to/)) { return 'player'; }
      if (action.direction.match(/partner-to/)) { return 'partner'; }
      throw `Unknown Sex Action Direction: ${action.direction}`
    }

    // The isPossible() checks the basic action requirements to hide actions that will not ever be possible during this
    // training. These are conditions like, you can't get a tail job, when a character doesn't have a tail. This acts
    // as the initial action filter. Actions that are filtered here are no longer considered when determining which
    // actions are visible.
    function isPossible(context) {
      if (action.requires && CentralScrutinizer(context).allConditionsPass(action.requires) === false) { return false; }

      const playerSenses = SensitivitiesComponent.lookup(context.P);
      const partnerSenses = SensitivitiesComponent.lookup(context.T);

      if (action.uses.player.includes(TrainingSlot.breasts) && playerSenses.breasts == null) { return false; }
      if (action.uses.player.includes(TrainingSlot.cock) && playerSenses.cock == null) { return false; }
      if (action.uses.player.includes(TrainingSlot.pussy) && playerSenses.pussy == null) { return false; }
      if (action.uses.partner.includes(TrainingSlot.breasts) && partnerSenses.breasts == null) { return false; }
      if (action.uses.partner.includes(TrainingSlot.cock) && partnerSenses.cock == null) { return false; }
      if (action.uses.partner.includes(TrainingSlot.pussy) && partnerSenses.pussy == null) { return false; }

      return true
    }

    // The isAvailable() function serves as the second filter. It hides actions that shouldn't currently be visible,
    // but might become possible if their requirements are met. This is generally used to show follow on actions that
    // require a certain body position to become visible.
    //   TODO: Check the "availableWhen" property for configuration.
    //     - AvailableWhen.conditions (Send to the scrutinizer)
    //     - AvailableWhen.player (List of player parts)
    //     - AvailableWhen.partner (List of partner parts)
    //     -- We can check the part arrays for a matching persisted action that includes all elements from both arrays.
    //
    //   TODO: Orifice fit from the penetration property. (Arousal state, lube, etc can make an impossible penetration
    //    possible)
    function isAvailable(context) {
      return matchesPersistedAction();
    }

    // If the availableWhen property includes a player and a partner array, then this action is only available when a
    // matching action has been persisted.
    function matchesPersistedAction() {
      if (action.availableWhen == null) { return true; }
      if (action.availableWhen.player == null) { return true; }

      return TrainingController.getPersistedActions().filter(persisted => {
        return persisted.usesParts(action.availableWhen.player, action.availableWhen.partner)
      }).length > 0;
    }

    // The isEnabled() function determines if an available action should be enabled or not. The logic here is that
    // an available action can be shown in a disabled state if something can be done at some point to make these
    // actions enabled.
    //   TODO: Bondage state, freedom of movement requirements.
    //   TODO: Arousal state for actions that require a hard cock.
    //   TODO: Actions that require inventory items should check the inventory.
    function isEnabled(context) {
      if (action.minimumConsent && action.minimumConsent > context.consent) { return false; }
      return true;
    }

    return Object.freeze({

      // Name, Description, Category, Direction
      getCode: () => { return code; },
      getName: () => { return action.name; },
      getPersistedName: () => { return action.persistedName; },
      getDescription,
      getMainCategory: () => { return action.mainCategory; },
      getPartnerCategory: () => { return action.partnerCategory; },
      getPlayerCategory: () => { return action.playerCategory; },
      getDirection: () => { return action.direction },
      directionHasPlayerActingOnPartner,
      directionHasPartnerActingOnPlayer,
      getActingCharacter,

      // Time & Stamina
      getTime: () => { return action.time; },
      getPartnerStamina: () => { return action.partnerStamina; },
      getPlayerStamina: () => { return action.playerStamina; },

      // Action persistence
      getPersist: () => { return action.persist },
      getUses: () => { return action.uses; },

      // Action visibility and enabled state.
      isPossible,
      isAvailable,
      isEnabled,

      // Consent, Sensation, and Alignment
      getConsentTarget: () => { return action.consentTarget; },
      getConsentFactors: () => { return [ ...action.consentFactors ]; },
      getTechniqueTarget: () => { return action.techniqueTarget; },
      getPartnerSensations: () => { return { ...action.partnerSensations }; },
      getPlayerSensations: () => { return { ...action.playerSensations }; },
      getSkills: () => { return { ...action.skills }; },
      getAlignment: () => { return { ...action.alignment }; },
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
