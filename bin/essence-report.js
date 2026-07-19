// Usage: node bin/essence-report.js

require('./run-headless.js');

const pad = StringHelper.pad;
const padn = StringHelper.padNumber;

const rows = BaseMonster.getAllCodes().map(code => {
  const base = BaseMonster.lookup(code);
  const values = [];

  for (let i=0; i<100; i++) {
    values.push(EssenceSystem.monsterEssenceValue(MonsterFactory.build(code)));
  }

  return {
    code,
    level: base.getLevel(),
    min: Math.min(...values),
    max: Math.max(...values),
  };
});

console.log(`\n=== Monster Essence Report ===\n`);
console.log(pad('Monster',20) + padn('Level',6) + padn('Min',6) + padn('Max',6));
console.log(pad('-------',20) + padn('-----',6) + padn('---',6) + padn('---',6));

rows.forEach(row => {
  console.log(pad(row.code,20) + padn(row.level,6) + padn(row.min,6) + padn(row.max,6));
});
