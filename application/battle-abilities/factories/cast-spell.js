Ability.CastSpell = function(code, power) {
  const ability = Ability(`Cast ${Spell.lookup(code).getName()}`);
  AbilityAppraiser(ability).appraise();
  return ability;
}

/*
Ability.register('monster-cast-spell', {
  getEssenceBreakdown: entry => EssenceSystem.spellEssenceBreakdown(entry),
  execute: () => {
    const round = BattleSystem.getRound();
    const ability = round.getAbilityData();
    const spell = Spell.lookup(ability.spell);
    const target = round.getTarget();
    const targetPosition = round.getTargetPosition();

    round.addTime(spell.getCastingTime(ability.powerLevel));
    round.addMessage({ text:`{A:ActingName} begins casting a spell.` });

    BattleSystem.getState().startCastingSpell({
      code: ability.spell,
      powerLevel: ability.powerLevel,
      target: target,
      targetPosition: targetPosition,
    });
  },
});
*/
