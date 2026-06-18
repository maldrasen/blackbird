global.ResistRoll = function(target, type, power) {

  // TODO: Again we can look in to adjusting the 10% always resist and 10% never resist boundaries. They exist to
  //       ensure that even if a character has 0 resistance to an effect, there's always a chance that they can resist,
  //       or that a character with 1000 resistance to an effect can still fail to resist an effect. Still, 10% might
  //       be a bit too high. Maybe 5% or 3% is more reasonable?


  console.log("RESIST ROLL:",target,type,power)

  const critical = Random.roll(10);

  if (critical === 0) {
    Console.log(`Resist Roll [${target}] - Fumble`,{ system:'BattleSystem', level:3 });
    return ResistRoll.fail;
  }

  if (critical === 9) {
    Console.log(`Resist Roll [${target}] - Critical`,{ system:'BattleSystem', level:3 });
    return ResistRoll.pass;
  }

  const resistance = (BattleSystem.getState().isMonster(target)) ?
    Monster(target).getResistance(type) :
    Character(target).getResistance(type);

  const resistRoll = Random.roll(resistance);
  const powerRoll = Random.roll(power)

  Console.log(`Resist Roll [${target}]`,{ system:'BattleSystem', level:3, data:{
    resistance:`${resistance}(${resistRoll})`,
    power:`${power}(${powerRoll})`
  }});

  return (resistRoll >= powerRoll) ? ResistResult.pass : ResistResult.fail;
}
