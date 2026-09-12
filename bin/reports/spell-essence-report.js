// Usage: node bin/reports/spell-essence-report.js
//
// Prints the essence breakdown for every spell at each power level with no cooldown, then for every monster-cast-spell
// entry on the base monsters as the essence system actually scores it. Use it to tune the spell essence knobs in
// EssenceSystem and the essence values on the status effect records.

require('../run-headless.js');

const MAX_POWER_LEVEL = 8;

const columns = [
  { label:'Period', align:'right' },
  { label:'Hit', align:'right' },
  { label:'Targets', align:'right' },
  { label:'Damage', align:'right' },
  { label:'Status', align:'right' },
  { label:'Total', align:'right' },
];

function breakdownCells(entry) {
  const breakdown = EssenceSystem.spellEssenceBreakdown(entry);
  return [
    breakdown.period,
    breakdown.spike.toFixed(1),
    breakdown.targets,
    breakdown.damage.toFixed(2),
    breakdown.status.toFixed(2),
    breakdown.total.toFixed(2),
  ];
}

function print(title, leadColumns, rows) {
  console.log(`\n=== ${title} ===\n`);
  console.log(ReportHelper.formatTable([...leadColumns, ...columns], rows).join('\n'));
}

const spellRows = [];
Spell.getAllCodes().sort().forEach(spell => {
  for (let powerLevel=1; powerLevel<=MAX_POWER_LEVEL; powerLevel++) {
    spellRows.push([spell, powerLevel, ...breakdownCells({ spell, powerLevel })]);
  }
});

print('Spell Essence by Power Level', [{ label:'Spell' }, { label:'Level', align:'right' }], spellRows);

const monsterRows = [];
BaseMonster.getAllCodes().sort().forEach(code => {
  const entries = BaseMonster.lookup(code).getPrioritizedAbilities();
  Object.entries(entries).filter(([, entry]) => entry.code === 'monster-cast-spell').forEach(([key, entry]) => {
    monsterRows.push([code, key, entry.spell, entry.powerLevel, entry.cooldown || 0, ...breakdownCells(entry)]);
  });
});

print('Monster Spell Entries', [
  { label:'Monster' },
  { label:'Key' },
  { label:'Spell' },
  { label:'Level', align:'right' },
  { label:'Cooldown', align:'right' },
], monsterRows);
