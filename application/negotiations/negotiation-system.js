global.NegotiationSystem = (function() {
  let state;

  // TODO: Limit the negotiate ability to only the player.
  // TODO: There should also be a version that the monster starts when there's only one monster remaining.
  function start() {
    state = NegotiationState();

    const round = BattleSystem.getRound();
    round.setAbility(BattleCommand.negotiate);
    // round.setTarget(state.getMonster()); // Is this necessary? Negotiate isn't actually targeted.

    NegotiationOverlay.open();
  }

  function advance() {
    console.log("=== Advance ===");
  }

  function complete() {
    console.log("=== Complete ===");
  }

  // TODO: The greeting still pulls from the old temp script. Greetings should work like the responses though with
  //       different greetings for Supertypes, archetypes, monster types, and specific monsters.
  function getGreeting() {
    return Weaver(NegotiationSystem.getState().getContext()).weave(NegotiationScript.greeting);
  }

  return Object.freeze({
    start,
    advance,
    complete,
    getState: () => { return state; },
    getGreeting,
  });

})();

