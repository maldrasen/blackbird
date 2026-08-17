// Negotiate is offered only when a single monster remains (see CharacterAbilitySystem). Rather than resolving like a
// normal ability, the command panel hands it to the NegotiationSystem, which opens the negotiation overlay. The
// system finishes or ends the round itself depending on how the negotiation goes, so this record's execute() is
// never called through the usual ability flow.

Ability.register(BattleCommand.negotiate, {
  name: 'Negotiate',
  category: 'utility',
  overlay: NegotiationSystem.start,

  canBeUsed: () => {
    const state = BattleSystem.getState();

    if (BattleSystem.getRound().getActing() !== GameSystem.getState().getPlayer()) { return false; }
    if (state.hasAttemptedNegotiation()) { return false; }

    const monsters = state.getActiveMonsters();
    return monsters.length === 1 && Monster(monsters[0]).willNegotiate();
  },

  execute: () => {},
});
