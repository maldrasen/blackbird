// Casting a spell takes the caster's action to begin. The casting time is added to their turn, and the spell is
// released when they next act: the battle state holds the spell, its power level, and its target until then. The
// target may have moved or fallen by the time the spell goes off, which the spell system sorts out on release.
//
//   Ability.CastSpell({
//     spell: 'ember',
//     powerLevel: 1,
//   });
//
// Optional keys:
//     essence           A hand-set essence value in place of the appraised one.
//     cooldown          Milliseconds before the caster can cast this again.
//     priority          How strongly a monster prefers this ability over its others.
Ability.CastSpell = function(options) {
  const spell = Spell.lookup(options.spell);
  Validate.isNumber('CastSpell.powerLevel', options.powerLevel);

  const ability = Ability(`Cast ${spell.getName()}`);

  ability.setTargetingMode(getTargetingMode(spell));
  ability.setExecuteFunction(() => execute(spell, options.powerLevel));

  if (options.cooldown != null) { ability.setCooldown(options.cooldown); }
  if (options.essence != null) { ability.setEssence(options.essence); }
  if (options.priority != null) { ability.setPriority(options.priority); }

  return ability;
}

// A spell aimed at one enemy or at a position needs a target picked. One that covers a formation or the caster
// doesn't.
function getTargetingMode(spell) {
  return [EffectTarget.single, EffectTarget.position].includes(spell.getTarget()) ? TargetingMode.anyEnemy : null;
}

function execute(spell, powerLevel) {
  const round = BattleSystem.getRound();

  round.addTime(spell.getCastingTime(powerLevel));
  round.addMessage({ text:`{A:ActingName} begins casting a spell.` });

  BattleSystem.getState().startCastingSpell({
    code: spell.getCode(),
    powerLevel,
    target: round.getTarget(),
    targetPosition: round.getTargetPosition(),
  });
}
