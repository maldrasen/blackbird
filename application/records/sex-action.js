/*
# SexAction Properties
- `name`             Action name shown in the training action menu.
- `description`      What the action will do, woven with the training context.
- `persistedName`    Weaver template naming the action while it persists across rounds.
- `mainCategory`     [foreplay, giving, performance, receiving, sex] Top level action menu grouping.
- `playerCategory`   [ass, breasts, cock, hands, mouth, none, pussy] The part the player is using.
- `partnerCategory`  [ass, breasts, cock, hands, mouth, none, pussy] The part the partner is using.
- `direction`        An ActionDirection value. Who is acting on whom; mutual actions record the player as the actor.
- `time`             Time the action takes.
- `playerStamina`    Stamina the action costs the player. Negative for actions where the player just watches.
- `partnerStamina`   Stamina the action costs the partner.
- `isPossible`       Predicate, passed the training context. Filters out actions that can never happen in this
                     training, like tail jobs for the tailless. Slots in the uses arrays are checked automatically.

### Consent properties (See ConsentResult for how the factors combine.)
- `consentTarget`     Consent value the factors need to reach. Below the target the partner is unwilling; 1.25x the
                      target is reluctant, 2x willing, and beyond that eager.
- `minimumConsent`    [Consent] The action is disabled below this consent level.
- `techniqueTarget`   Technique skill roll target. Rolls below the target halve the sensations and shame or anger the
                      partner; rolls above double the sensations and soothe anger.
- `consentFactors`    Ordered factor array: a base factor first, then arousal, gender, and preference factors.
  - base:       `{ baseClass }` [emotional, performance, penetration, reverseService, roughService, service,
                touching] The starting consent value, derived from the partner's feelings.
  - arousal:    `{ strength }` Adds the partner's arousal curve, multiplied by the strength (default 1).
  - gender:     `{ scale }` Multiplies consent by the partner's attraction to the actor's gender.
  - preference: `{ code, scale, conflicting }` Multiplies consent by the partner's preference value. A conflicting
                preference inverts it.

### Sensation properties
- `partnerSensations`  Map of sensation keys to baseline intensities. Physical keys [anus, cervix, clit, cock,
                       nipple, prostate, pussy, throat, urethra] only apply when the partner has the part; emotional
                       keys [anger, comfort, desire, shame, submission, suffering] always apply.
- `playerSensations`   Same physical keys for the player. Desire is the only emotional key that applies.
- `orientation`        `{ submission, masochism, shame }` Where the action falls in the BDSM matrix, driving the
                       domination, sadism, and degradation skill effects.
- `skills`             `{ player, partner }` Skill code arrays each role is practicing during the action.

### Persistence properties
- `persist`        `{ action, revert, when }` Persists `action` (not always this action's own code) across rounds.
                   With revert and when both set, consent is rechecked each round and the persisted action drops
                   down to `revert` — or ends, when the revert is `_nothing` — below the `when` [Consent] level.
- `alignment`      A SexAlignment object describing the parts each role needs aligned in the sex position. Within an
                   alignment `ass` covers both orifices, with `target` naming the one this action uses. The uses
                   arrays are derived from the alignment.
- `uses`           `{ player, partner }` TrainingSlot arrays. Fallback for state-like actions with no alignment to
                   derive the used parts from.
- `penetration`    `{ player, partner }` The penetrating and penetrated parts. (Not consumed yet.)
- `forcePosition`  `{ code, playerFirst, clearPersisted }` Moves training into the sex position `code` instead of
                   finding an aligned position. playerFirst puts the player in the position's first role, and
                   clearPersisted drops all persisted actions on the change.

### availableWhen properties
An action with no availableWhen is always visible. isPossible combines with one of the match conditions, which are
checked in this order:
- `previousAction`   Available only the round after this action code ran.
- `persistedAction`  Available while this action code is persisted.
- `player`/`partner` TrainingSlot array pair. Available while a persisted action uses these parts.
- `isPossible`       Predicate, passed the training context. For conditions that change during training, like
                     striptease needing a partner who is still clothed.
*/
global.SexAction = (function() {
  const sexActions = {};

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
    SexActionValidator(code,data);
    sexActions[code] = data;
  }

  function getAllCodes() {
    return Object.keys(sexActions);
  }

  function getPossible(context) {
    return Object.keys(sexActions).filter(key => {
      return lookup(key).isPossible(context);
    });
  }

  function lookup(code) {
    if (sexActions[code] == null) { throw new Error(`Bad sex action code [${code}]`); }

    const action = {...sexActions[code]};

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
      throw new Error(`Unknown Sex Action Direction: ${action.direction}`);
    }

    // The uses arrays are build from the SexAlignment object, or falls back to the uses property if there is one.
    // These arrays represent the parts that each participant in the action are using, which is important for
    // determining what persisted actions can happen at the same time.
    function getUses() {
      const uses = action.uses ? structuredClone(action.uses) : { player:[], partner:[] };

      if (action.alignment) {
        const player = action.alignment.player;
        const partner = action.alignment.partner;

        if (player.ass) { uses.player.push(action.alignment.target); }
        if (partner.ass) { uses.partner.push(action.alignment.target); }
        if (player.cock) { uses.player.push(TrainingSlot.cock); }
        if (partner.cock) { uses.partner.push(TrainingSlot.cock); }
        if (player.hands) { uses.player.push(TrainingSlot.hands); }
        if (partner.hands) { uses.partner.push(TrainingSlot.hands); }
        if (player.mouth) { uses.player.push(TrainingSlot.mouth); }
        if (partner.mouth) { uses.partner.push(TrainingSlot.mouth); }
        if (player.breasts) { uses.player.push(TrainingSlot.breasts); }
        if (partner.breasts) { uses.partner.push(TrainingSlot.breasts); }
      }

      return uses;
    }

    // - role: { player, partner }
    // - slot: TrainingSlot
    function usesSlot(role, slot) {
      return getUses()[role].includes(slot);
    }

    // The isPossible() checks the basic action requirements to hide actions that will not ever be possible during this
    // training. These are conditions like, you can't get a tail job, when a character doesn't have a tail. This acts
    // as the initial action filter. Actions that are filtered here are no longer considered when determining which
    // actions are visible.
    function isPossible(context) {
      if (action.isPossible && action.isPossible(context) === false) { return false; }

      const player = Character(context.P);
      const partner = Character(context.T);
      const uses = getUses();

      if (uses.player.includes(TrainingSlot.breasts) && player.hasBreasts() === false) { return false; }
      if (uses.player.includes(TrainingSlot.cock) && player.hasNormalCock() === false) { return false; }
      if (uses.player.includes(TrainingSlot.pussy) && player.hasNormalPussy() === false) { return false; }
      if (uses.partner.includes(TrainingSlot.breasts) && partner.hasBreasts() === false) { return false; }
      if (uses.partner.includes(TrainingSlot.cock) && partner.hasNormalCock() === false) { return false; }
      if (uses.partner.includes(TrainingSlot.pussy) && partner.hasNormalPussy() === false) { return false; }

      return true
    }

    // The isAvailable() function serves as the second filter. It hides actions that shouldn't currently be visible,
    // but might become possible if their requirements are met. This is generally used to show follow on actions that
    // require a certain body position to become visible.
    //
    //  TODO: Orifice fit from penetration. (There are things that can make
    //   an impossible penetration possible)
    //
    function isAvailable(context) {
      return isNotPersisted() && matchesPersistedAction() && availableConditionsMet(context);
    }

    // TODO: An action that depends on the previousAction should be flagged as
    //   special somehow as that action will only be available for this round.
    //
    function matchesPersistedAction() {
      const persistedActions = TrainingSystem.getState().getPersistedActions();

      // True if there are no particular conditions.
      if (action.availableWhen == null) { return true; }

      // True when the previous action was the one specified.
      if (action.availableWhen.previousAction) {
        return TrainingSystem.getState().getPreviousAction() === action.availableWhen.previousAction;
      }

      // True if the specified action has been persisted.
      if (action.availableWhen.persistedAction) {
        return persistedActions.filter(persisted => {
          return persisted.getCode() === action.availableWhen.persistedAction;
        }).length > 0;
      }

      // True if a matching action has been persisted.
      if (action.availableWhen.player && action.availableWhen.partner) {
        return persistedActions.filter(persisted => {
          return persisted.usesParts(action.availableWhen.player, action.availableWhen.partner)
        }).length > 0;
      }

      return true;
    }

    // The available and the possible actions have different condition sets. The available conditions are for
    // conditions that might change during training. For instance, strip-tease is only available once, when the
    // partner is still wearing clothes and becomes unavailable and hidden once they're naked.
    function availableConditionsMet(context) {
      return (action.availableWhen && action.availableWhen.isPossible) ? action.availableWhen.isPossible(context) : true;
    }

    function isPersisted() { return TrainingSystem.getState().isActionPersisted(code); }
    function isNotPersisted() { return !isPersisted(); }

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
      getPersist: () => { return action.persist; },
      getAlignment: () => { return action.alignment; },
      getForcePosition: () => { return action.forcePosition; },
      getUses,
      usesSlot,

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
      getOrientation: () => { return { ...action.orientation }; },
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
