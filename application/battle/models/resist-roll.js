// Both sides of the contest roll the floor before adding their own resistance or power. Because the floor is a
// constant, and not derived from the values being compared, resistance and power keep an absolute meaning: power 100
// is a hard effect to shrug off no matter who it lands on, and a target with no resistance at all is unlucky rather
// than doomed. Raising the floor makes every contest more random, lowering it makes resistance and power count for
// more. Neither value needs an upper bound - a power of 500 simply lands at the far end of the same curve.
const CONTEST_FLOOR = 100;

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

  const resistRoll = Random.roll(CONTEST_FLOOR) + signedRoll(resistance);
  const powerRoll = Random.roll(CONTEST_FLOOR) + signedRoll(power);

  Console.log(`Resist Roll [${target}]`,{ system:'BattleSystem', level:3, data:{
    resistance:`${resistance}(${resistRoll})`,
    power:`${power}(${powerRoll})`
  }});

  return (resistRoll >= powerRoll) ? ResistResult.pass : ResistResult.fail;
}

// A negative resistance is a vulnerability, subtracting a roll rather than adding one. Zero never rolls at all, both
// because the result could only ever be zero and because rolling it would consume a stubbed value in the specs.
function signedRoll(value) {
  if (value === 0) { return 0; }
  return (value > 0) ? Random.roll(value) : -Random.roll(-value);
}
