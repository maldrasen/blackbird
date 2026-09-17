// Usage: node bin/reports/armor-report.js [slot|reduction]

require('../run-headless.js');

const sort = process.argv[2] || 'slot';

const armors = BaseEquipment.getAllCodes().map(code => BaseEquipment.lookup(code)).filter(base => base.hasReduction()).map(armor => {
  const reduction = armor.getReductionMap();
  return {
    code:      armor.getCode(),
    slot:      armor.getSlots().join('/'),
    crush:     reduction.crush,
    slash:     reduction.slash,
    pierce:    reduction.pierce,
    total:     reduction.crush + reduction.slash + reduction.pierce,
    materials: Object.entries(armor.getMaterials()).map(([type,amount]) => `${type}:${amount}`).join(' '),
    effort:    armor.getEffort(),
  };
});

const byReduction = (a,b) => b.total - a.total;

switch (sort) {
  case 'slot':      armors.sort((a,b) => a.slot.localeCompare(b.slot) || byReduction(a,b)); break;
  case 'reduction': armors.sort(byReduction); break;
  default:          throw new Error(`Unknown sort "${sort}" (expected slot or reduction)`);
}

console.log(`\n=== Base Armor Report (by ${sort}) ===\n`);

console.log(ReportHelper.formatTable([
  { label:'code' },
  { label:'slot' },
  { label:'crush',  align:'right' },
  { label:'slash',  align:'right' },
  { label:'pierce', align:'right' },
  { label:'total',  align:'right' },
  { label:'materials' },
  { label:'effort', align:'right' },
], armors.map(armor => [
  armor.code, armor.slot, armor.crush, armor.slash, armor.pierce, armor.total, armor.materials, armor.effort,
])).join('\n'));
