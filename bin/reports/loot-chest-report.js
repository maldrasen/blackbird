// Usage: node bin/reports/loot-chest-report.js <theme> <level> [samples]
//
// Generates treasure chests for a dungeon theme at a given level and reports what was found in them: the drop table
// the chests roll from, the maximum value range, and how often each article turned up.

require('../run-headless.js');
const LootReport = require('./loot-report-shared.js');

const themeCode = process.argv[2];
const level = Number(process.argv[3]);
const samples = Number(process.argv[4]) || 100;

if (themeCode == null || DungeonTheme.getAllCodes().includes(themeCode) === false || Number.isInteger(level) === false || level < 1) {
  console.log(`Usage: node bin/reports/loot-chest-report.js <theme> <level> [samples]`);
  console.log(`Themes: ${DungeonTheme.getAllCodes().join(', ')}`);
  process.exit(1);
}

const generator = LootGenerator('chest', { theme:themeCode, level });
const results = [];
for (let i=0; i<samples; i++) { results.push(generator.generateLoot()); }

console.log(`\n=== Treasure Chest Loot Report : ${themeCode} level ${level} ===\n`);
console.log(`Loot quantity: ${DungeonTheme.lookup(themeCode).getLootQuantity().join('-')}`);
LootReport.printValueRange(LootReport.fullValueRange(generator));
LootReport.printDropTable(generator.getDropTable());
LootReport.printResults(results, generator.getDropTable());
