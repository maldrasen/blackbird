// Builds a batch of every base monster and reports the essence range for each, since the rolled attributes make the
// value random. Usage: node bin/essence-report.js [trials]

require('./run-headless.js');

const trials = Number(process.argv[2]) || 10;

const rows = BaseMonster.getAllCodes().map(code => {
  const base = BaseMonster.lookup(code);
  const values = [];

  for (let i=0; i<trials; i++) {
    values.push(EssenceSystem.monsterEssenceValue(MonsterFactory.build(code)));
  }

  return {
    name: base.getName(),
    type: base.getType(),
    level: base.getLevel(),
    min: Math.min(...values),
    max: Math.max(...values),
  };
});

rows.sort((a,b) => a.min - b.min);

console.log(`\n=== Monster Essence Report (${trials} builds each) ===\n`);
console.log(pad('Monster',28) + pad('Type',10) + padNumber('Level',6) + padNumber('Min',6) + padNumber('Max',6));

rows.forEach(row => {
  console.log(pad(row.name,28) + pad(row.type,10) +
    padNumber(row.level,6) + padNumber(row.min,6) + padNumber(row.max,6));
});

function pad(value, width) { return String(value).padEnd(width); }
function padNumber(value, width) { return String(value).padStart(width); }
