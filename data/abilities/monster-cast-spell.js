
// TODO: When casting a spell, a monster spends their action starting to cast a spell. This adds the spell casting
//       time to their turn order. When they next act in the turn order the spell they start casting here actually
//       goes off. We store the spell code, power level, and targets in the battle state here. Then when the monster's
//       turn next happens, their action must be to cast the spell. At that point the target may have changed, so we
//       need to select the next available target closest to the original target (random from list of targets with
//       lowest position distance) A target position will still target the same position though.

Ability.register('monster-cast-spell', {
  execute: () => {
    const round = BattleSystem.getRound();
    const ability = round.getActingMonster().getAbility('monster-cast-spell');
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
