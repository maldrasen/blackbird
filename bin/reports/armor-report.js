// Usage: node bin/reports/armor-report.js [slot|reduction|value]

require('../run-headless.js');

const sort = process.argv[2] || 'slot';

const armors = BaseArmor.getAllCodes().map(code => {
  const armor = BaseArmor.lookup(code);
  const reduction = armor.getReductionMap();
  return {
    code:      code,
    slot:      armor.getSlot(),
    crush:     reduction.crush,
    slash:     reduction.slash,
    pierce:    reduction.pierce,
    total:     reduction.crush + reduction.slash + reduction.pierce,
    material:  armor.getPrimaryMaterial() || '-',
    value:     armor.getValue(),
  };
});

const byValue = (a,b) => b.value - a.value;

switch (sort) {
  case 'slot':      armors.sort((a,b) => a.slot.localeCompare(b.slot) || byValue(a,b)); break;
  case 'reduction': armors.sort((a,b) => b.total - a.total); break;
  case 'value':     armors.sort(byValue); break;
  default:          throw new Error(`Unknown sort "${sort}" (expected slot, reduction, or value)`);
}

console.log(`\n=== Base Armor Report (by ${sort}) ===\n`);

console.log(ReportHelper.formatTable([
  { label:'code' },
  { label:'slot' },
  { label:'crush',  align:'right' },
  { label:'slash',  align:'right' },
  { label:'pierce', align:'right' },
  { label:'total',  align:'right' },
  { label:'material' },
  { label:'value',  align:'right' },
], armors.map(armor => [
  armor.code, armor.slot, armor.crush, armor.slash, armor.pierce, armor.total, armor.material, armor.value,
])).join('\n'));
