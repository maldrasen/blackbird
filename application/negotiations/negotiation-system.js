global.NegotiationSystem = (function() {

  const maxInteractions = 5;
  const negotiationTime = 1200;

  let state;

  // TODO: There should also be a version that the monster starts when there's only one monster remaining.
  function start() {
    state = NegotiationState();

    BattleSystem.getState().setNegotiationAttempted();
    NegotiationInterface.open();
  }

  function advance() {
    if (state.hasShownResolution()) { return executeResolution(); }
    if (state.hasResolution()) { return showResolution(); }
    if (state.hasFollowUp()) { return NegotiationInterface.renderQuestion(state.takeFollowUpQuestion()); }
    if (state.getInteractionCount() >= maxInteractions) { return forceResolution(); }
    NegotiationInterface.renderQuestion(state.pickQuestion());
  }

  function forceResolution() {
    state.resolveFromTimeout();
    showResolution();
  }

  function showResolution() {
    state.markResolutionShown();
    NegotiationInterface.renderResolution();
  }

  // TODO: Requests are answered here as well once they're implemented. (Task 105)
  function answer(key) {
    const question = state.getCurrentQuestion();
    const reaction = question.reactionData.reactions[key].resolve(state.getContext());

    reaction.applyEffects(state.getContext());
    applyReaction(reaction.feelings ? moderateReaction(reaction) : reaction);
  }

  function moderateReaction(reaction) {
    return reaction.withFeelings(NegotiationInfluence.moderateFeelings(reaction.feelings, state.getContext()));
  }

  function applyReaction(reaction) {
    NegotiationInterface.renderDialog(reaction.message);

    switch (reaction.type) {
      case 'feelings': break;
      case 'followUp': state.setFollowUp(reaction.question); break;
      case 'join':     state.setResolution({ type:'join' }); break;
      case 'attack':   state.setResolution({ type:'attack' }); break;
      case 'ability':  state.setResolution({ type:'ability', ability:reaction.ability }); break;
      case 'run':      state.setResolution({ type:'run' }); break;
      default: throw new Error(`Unknown reaction type [${reaction.type}]`);
    }

    if (reaction.feelings) { state.applyFeelings(reaction.feelings); }
  }

  function executeResolution() {
    const resolution = state.getResolution();

    switch (resolution.type) {
      case 'join':      return resolveJoin();
      case 'attack':    return resolveAbility('Attack');
      case 'ability':   return resolveAbility(resolution.ability);
      case 'run':       return resolveRun();
    }
    throw new Error(`Unknown resolution type [${resolution.type}]`);
  }

  function resolveJoin() {
    const monster = state.getMonster();
    const feelings = state.getFeelings();
    const battleState = BattleSystem.getState();

    battleState.setCondition(monster, BattleCondition.recruited);
    battleState.removeFromBattle(monster);

    // TODO: There's some uncertainty here about making recruit() happen before finishNegotiation(). We changed the
    //       order when adding the orphan sweep. If finishNegotiation() calls advanceBattle(), and advanceBattle() sees
    //       that combat is over and triggers the mode change, we don't want the recruited monster to be deleted when
    //       the mode change removes orphaned monsters. However, the recruit() function also deletes the monster
    //       component, turning a character from a monster into a party member. Something in the
    //       BattleSystem.finishRound() or BattleSystem.advanceBattle() path may expect the monster component to still
    //       be present. I ran a negotiation and added a monster to the party in game, and it seemed to work fine, but
    //       this could use a more complete examination. We may want to call finishNegotiation() first anyway and check
    //       to see if a negotiation has been successful before deleting an orphaned monster. That seems like an easier
    //       situation to work around than monsters not having their monster component in the battle. Even if it works
    //       now, it's setting an invalid state.

    RecruitmentSystem.recruit(monster, feelings);
    finishNegotiation();
    PartyConfiguration.addCharacter(monster);
  }

  function resolveAbility(name) {
    BattleSystem.getState().setForcedAbility(name);
    finishNegotiation();
  }

  // TODO: Run should also be an ability that a monster can use. If a monster tries to escape there should be a chance
  //       that they fail and that the battle continues. A monster might also choose to run as their action, outside
  //       of the negotiation system entirely.

  function resolveRun() {
    const monster = state.getMonster();
    const battleState = BattleSystem.getState();

    battleState.setCondition(monster, BattleCondition.fled);
    battleState.removeFromBattle(monster);
    finishNegotiation();
  }

  function finishNegotiation() {
    NegotiationInterface.close();
    BattleSystem.getRound().addTime(negotiationTime);
    BattleSystem.finishRound();
    scheduleMonsterResponse();
    BattleSystem.advanceBattle();
  }

  function reset() {
    state = null;
  }

  function scheduleMonsterResponse() {
    const battleState = BattleSystem.getState();

    if (battleState.getActiveMonsters().length === 0) { return battleState.battleWon(); }
    if (battleState.getCondition(state.getMonster()) !== BattleCondition.active) { return; }

    battleState.moveToTopOfTurnOrder({ type:'monster', id:state.getMonster() }, 500);
  }

  return {
    start,
    advance,
    answer,
    reset,
    getState: () => { return state; },
  };

})();
