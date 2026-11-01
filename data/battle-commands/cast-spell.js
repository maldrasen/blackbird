// Casting opens the spell selection panel, which picks a spell and a power level and then either starts targeting or
// runs the command with what it chose. The command is offered when the character can pay for at least one spell they
// know. A recruited monster fights on without a spellbook, so a missing one just means there's nothing to cast.
BattleCommand.register(StandardAbility.castSpell, {
  name: 'Cast Spell',
  category: 'basic',
  overlay: () => { BattleInterface.showSpellSelection(); },
  buildAbility: data => { return Ability.CastSpell(data); },

  isPossible: () => {
    const acting = BattleSystem.getRound().getActing();

    if (SpellbookComponent.lookup(acting) == null) { return false; }
    if (StatusEffects(acting).has('silence')) { return false; }

    return SpellbookSystem.getCastableSpells(acting).length > 0;
  },
});
