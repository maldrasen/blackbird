global.ResistRoll = function(target, type, power) {

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

  const resistance = (BattleSystem.getState().isMonster(target)) ?
    Monster(target).getResistance(type) :
    Character(target).getResistance(type) + Difficulty.getResistance();

  const resistRoll = Random.roll(BattleConstants.resistRollFloor) + Random.roll(resistance);
  const powerRoll = Random.roll(BattleConstants.resistRollFloor) + Random.roll(power);

  Console.log(`Resist Roll [${target}]`,{ system:'BattleSystem', level:3, data:{
    resistance:`${resistance}(${resistRoll})`,
    power:`${power}(${powerRoll})`
  }});

  return (resistRoll >= powerRoll) ? ResistResult.pass : ResistResult.fail;
}
