global.ResistRoll = function(target, type, power, effect=null) {

  const isMonster = BattleSystem.getState().isMonster(target);

  // The resistance difficulty option is a player buff: the percent chance that a character shrugs an effect off
  // outright. It's rolled ahead of everything else so that 100 resists everything, and skipped at 0 so the default
  // setting doesn't spend a roll.
  function passesOnDifficulty() {
    if (isMonster) { return false; }
    const chance = Difficulty.getResistChance();
    return chance > 0 && Random.roll(100) < chance;
  }

  // The target resists with their resistance to the damage type behind the effect, and when a status effect is being
  // resisted, whatever resistance they carry against that effect in particular.
  function getResistance() {
    const resister = BattleHelper.getCombatant(target);
    const forEffect = (effect == null) ? 0 : resister.getEffectResistance(effect);
    return resister.getResistance(type) + forEffect;
  }

  if (passesOnDifficulty()) {
    Console.log(`Resist Roll [${target}] - Difficulty`,{ system:'BattleSystem', level:3 });
    return ResistResult.pass;
  }

  // The 5% bands exist so that a character with no resistance to an effect can still resist it, and a character with
  // overwhelming resistance can still fail.
  const critical = Random.roll(20);

  if (critical === 0) {
    Console.log(`Resist Roll [${target}] - Fumble`,{ system:'BattleSystem', level:3 });
    return ResistResult.fail;
  }

  if (critical === 19) {
    Console.log(`Resist Roll [${target}] - Critical`,{ system:'BattleSystem', level:3 });
    return ResistResult.pass;
  }

  const resistance = getResistance();
  const resistRoll = Random.roll(BattleConstants.resistRollFloor) + Random.roll(resistance);
  const powerRoll = Random.roll(BattleConstants.resistRollFloor) + Random.roll(power);

  Console.log(`Resist Roll [${target}]`,{ system:'BattleSystem', level:3, data:{
    resistance:`${resistance}(${resistRoll})`,
    power:`${power}(${powerRoll})`
  }});

  return (resistRoll >= powerRoll) ? ResistResult.pass : ResistResult.fail;
}
