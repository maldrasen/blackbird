// Usage: node bin/reports/loot-monster-report.js <monster> [samples]
//
// Builds a base monster repeatedly and generates its loot drop each time, reporting the drop table (from the last
// build, since gear sources depend on the monster's equipment), the essence and value ranges seen, and how often each
// article dropped.

require('../run-headless.js');
const LootReport = require('./loot-report-shared.js');

const monsterCode = process.argv[2];
const samples = Number(process.argv[3]) || 100;

if (monsterCode == null || BaseMonster.getAllCodes().includes(monsterCode) === false) {
  console.log(`Usage: node bin/reports/loot-monster-report.js <monster> [samples]`);
  console.log(`Monsters: ${BaseMonster.getAllCodes().join(', ')}`);
  process.exit(1);
}

const results = [];
const essences = [];
const ranges = [];
let generator;

for (let i=0; i<samples; i++) {
  Registry.clear();
  const id = MonsterFactory(monsterCode).build();
  generator = LootGenerator();
  results.push(generator.generateMonsterLoot(id));
  ranges.push(generator.getValueRange());
  essences.push(EssenceSystem.monsterEssenceValue(id));
}

console.log(`\n=== Monster Loot Report : ${monsterCode} ===\n`);
console.log(`Essence: ${LootReport.spread(essences)}`);
LootReport.printValueRanges(ranges);
LootReport.printDropTable(generator.getDropTable());
LootReport.printResults(results, generator.getDropTable());
