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
  let essence;

  ability.setTargetingMode(getTargetingMode(spell));
  ability.setExecuteFunction(() => execute(spell, options.powerLevel));
  ability.setDetails({ spell:options.spell, powerLevel:options.powerLevel });
  ability.setAppraiseFunction(() => { return essence ??= AbilityAppraiser.spellEssence(options); });

  if (options.cooldown != null) { ability.setCooldown(options.cooldown); }
  if (options.essence != null) { ability.setEssence(options.essence); }
  if (options.priority != null) { ability.setPriority(options.priority); }

  return ability;
}

// A spell aimed at one enemy, one ally, or a position needs a target picked. One that covers a formation or the
// caster doesn't.
function getTargetingMode(spell) {
  switch (spell.getTarget()) {
    case EffectTarget.single:   return TargetingMode.anyEnemy;
    case EffectTarget.position: return TargetingMode.anyEnemy;
    case EffectTarget.ally:     return TargetingMode.anyAlly;
    default: return null;
  }
}

// A character pays the mana when the cast begins, so a cast that fails or is interrupted still costs them. A monster's
// spells are innate and cost nothing.
function execute(spell, powerLevel) {
  const round = BattleSystem.getRound();

  if (round.isActingCharacter()) {
    ManaSystem.spendMana(round.getActing(), spell.getColor(), spell.getManaCost(powerLevel));
  }

  round.addTime(spell.getCastingTime(powerLevel));
  round.addMessage({ text:`{A:ActingName} begins casting a spell.` });

  BattleSystem.getState().startCastingSpell({
    code: spell.getCode(),
    powerLevel,
    target: round.getTarget(),
    targetPosition: round.getTargetPosition(),
  });
}
