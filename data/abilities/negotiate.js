// Negotiate is offered only when a single monster remains (see CharacterAbilitySystem). Rather than resolving like a
// normal ability, the command panel hands it to the NegotiationController, which opens the negotiation overlay. The
// controller finishes or ends the round itself depending on how the negotiation goes, so this record's execute() is
// never called through the usual ability flow.

Ability.register(BattleCommand.negotiate, {
  name: 'Negotiate',
  category: 'utility',
  overlay: NegotiationSystem.start,

  canBeUsed: () => { return true; },
  execute: () => {},
});
