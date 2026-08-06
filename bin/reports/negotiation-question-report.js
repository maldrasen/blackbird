// Usage: node bin/reports/negotiation-question-report.js [samples]
//
// Shows the negotiation question pool size for each base monster as a range. The pool is built the same way
// NegotiationState builds it: a question must pass its static requirements and have a reaction that applies to the
// monster. Because archetype, orientation, attributes, and equipment are all rolled by the factories, the pool size
// varies between builds of the same monster. Each row samples a number of fresh player/monster pairs and reports the
// min-max pool count, bucketed by the monster's rolled gender, with a column for each player gender.

require('../run-headless.js');

const samples = Number(process.argv[2]) || 50;
const playerGenders = [Gender.male, Gender.female, Gender.futa, Gender.enby];

function poolCount(context) {
  return NegotiationQuestion.getAllCodes().filter(code => {
    const question = NegotiationQuestion.lookup(code);
    if (question.isFollowUp()) { return false; }
    if (question.isPossible(context) === false) { return false; }
    return question.getReactionData(context) != null;
  }).length;
}

function buildPair(monsterCode, playerGender) {
  Registry.clear();

  const player = PlayerFactory.build({ gender:playerGender });
  GameSystem.getState().setPlayer(player);
  CharacterEquipper(player).equip(Random.between(500,1000));

  return { P:player, T:MonsterFactory.build(monsterCode) };
}

// ranges[monsterCode][monsterGender][playerGender] = { min, max }
const ranges = {};

function recordCount(monsterCode, monsterGender, playerGender, count) {
  if (ranges[monsterCode] == null) { ranges[monsterCode] = {}; }
  if (ranges[monsterCode][monsterGender] == null) { ranges[monsterCode][monsterGender] = {}; }

  const range = ranges[monsterCode][monsterGender][playerGender];
  ranges[monsterCode][monsterGender][playerGender] = range == null ?
    { min:count, max:count } :
    { min:Math.min(range.min, count), max:Math.max(range.max, count) };
}

const monsterCodes = BaseMonster.getAllCodes().filter(code => BaseMonster.lookup(code).getSpecies() != null);
const skipped = BaseMonster.getAllCodes().filter(code => BaseMonster.lookup(code).getSpecies() == null);

monsterCodes.forEach(monsterCode => {
  playerGenders.forEach(playerGender => {
    for (let i=0; i<samples; i++) {
      const context = buildPair(monsterCode, playerGender);
      recordCount(monsterCode, Monster(context.T).getGender(), playerGender, poolCount(context));
    }
  });
});

function formatRange(range) {
  if (range == null) { return '-'; }
  return range.min === range.max ? `${range.min}` : `${range.min}-${range.max}`;
}

const genderOrder = [Gender.male, Gender.female, Gender.futa, Gender.enby];
const rows = [];

monsterCodes.forEach(monsterCode => {
  const monsterGenders = Object.keys(ranges[monsterCode]).sort((a,b) => genderOrder.indexOf(a) - genderOrder.indexOf(b));
  monsterGenders.forEach(monsterGender => {
    rows.push([
      monsterCode,
      monsterGender,
      ...playerGenders.map(playerGender => formatRange(ranges[monsterCode][monsterGender][playerGender])),
    ]);
  });
});

const questionCount = NegotiationQuestion.getAllCodes().filter(code => {
  return NegotiationQuestion.lookup(code).isFollowUp() === false;
}).length;

console.log(`\n=== Negotiation Question Report (${questionCount} questions, ${samples} samples per pairing) ===\n`);

console.log(ReportHelper.formatTable([
  { label:'monster' },
  { label:'gender' },
  ...playerGenders.map(gender => ({ label:`P:${gender}`, align:'right' })),
], rows).join('\n'));

if (skipped.length > 0) {
  console.log(`\nSkipped (no species, cannot negotiate): ${skipped.join(', ')}`);
}
