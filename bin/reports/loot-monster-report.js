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
const ceilings = [];
let generator;

for (let i=0; i<samples; i++) {
  Registry.clear();
  const id = MonsterFactory(monsterCode).build();
  generator = LootGenerator('monster', { id });
  essences.push(EssenceSystem.monsterEssenceValue(id));
  ceilings.push(LootReport.fullValueRange(generator).ceiling);
  results.push(generator.generateLoot());
}

const average = values => (values.reduce((sum,value) => sum + value, 0) / values.length).toFixed(1);

console.log(`\n=== Monster Loot Report : ${monsterCode} ===\n`);
console.log(`Essence: ${Math.min(...essences)} - ${Math.max(...essences)} (avg ${average(essences)})`);
console.log(`Value ceiling: ${Math.min(...ceilings).toFixed(1)} - ${Math.max(...ceilings).toFixed(1)} at most (avg ${average(ceilings)})`);
LootReport.printDropTable(generator.getDropTable());
LootReport.printResults(results, generator.getDropTable());
