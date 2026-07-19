// Usage: node bin/level-report.js [maxLevel]

require('./run-headless.js');

const maxLevel = Number(process.argv[2]) || 100;
const speciesCodes = Species.getAllCodes();
const width = 9;

console.log(`\n=== Level Cost Report ===\n`);

console.log('Cost factors:');
speciesCodes.forEach(code => {
  console.log(`  ${code.padEnd(8)} ${EssenceSystem.speciesCostFactor(code).toFixed(3)}`);
});

console.log('');
console.log('Level'.padStart(5) + speciesCodes.map(code => code.padStart(width)).join(''));

for (let level=1; level<=maxLevel; level++) {
  const costs = speciesCodes.map(code => String(EssenceSystem.essenceToLevel(level,code)).padStart(width));
  console.log(String(level).padStart(5) + costs.join(''));
}

const totals = speciesCodes.map(code => String(EssenceSystem.totalEssenceToLevel(maxLevel,code)).padStart(width));
console.log('Total'.padStart(5) + totals.join(''));
