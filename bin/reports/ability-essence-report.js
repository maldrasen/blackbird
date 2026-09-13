// Usage: node bin/reports/ability-essence-report.js
//
// Prints the essence of every status effect type, flagging the ones with none set, then the essence breakdown for
// every spell at each power level with no cooldown, then for every ability entry on every base monster as the essence
// system scores it, and finally each monster's ability essence sum. Use it to tune the essence knobs in EssenceSystem
// and the essence values on the status effect records. An unpriced status effect scores nothing beyond any damage it
// does, which is right for poison but a gap for anything else a spell or attack applies.

require('../run-headless.js');

const MAX_POWER_LEVEL = 8;

const breakdownColumns = [
  { label:'Period', align:'right' },
  { label:'Hit', align:'right' },
  { label:'Targets', align:'right' },
  { label:'Damage', align:'right' },
  { label:'Status', align:'right' },
  { label:'Total', align:'right' },
];

function breakdownCells(breakdown) {
  if (breakdown.handSet) { return ['-', '-', '-', '-', '-', breakdown.total.toFixed(2)]; }

  return [
    breakdown.period,
    breakdown.spike.toFixed(1),
    breakdown.targets,
    breakdown.damage.toFixed(2),
    breakdown.status.toFixed(2),
    breakdown.total.toFixed(2),
  ];
}

function print(title, columns, rows) {
  console.log(`\n=== ${title} ===\n`);
  console.log(ReportHelper.formatTable(columns, rows).join('\n'));
}

function kindOf(entry, breakdown) {
  if (breakdown.handSet) { return breakdown.total === 0 ? 'unpriced' : 'hand-set'; }
  return entry.code === 'monster-cast-spell' ? 'spell' : 'attack';
}

// ---

const statusRows = StatusEffectType.getAllCodes().sort().map(code => {
  const type = StatusEffectType.lookup(code);
  return [code, type.getCategory(), type.getDurationType(), type.getEssence(), type.getEssence() === 0 ? 'unpriced' : ''];
});

print('Status Effect Essence', [
  { label:'Status Effect' },
  { label:'Category' },
  { label:'Duration' },
  { label:'Essence', align:'right' },
  { label:'' },
], statusRows);

// ---

const spellRows = [];
Spell.getAllCodes().sort().forEach(spell => {
  for (let powerLevel=1; powerLevel<=MAX_POWER_LEVEL; powerLevel++) {
    spellRows.push([spell, powerLevel, ...breakdownCells(EssenceSystem.spellEssenceBreakdown({ spell, powerLevel }))]);
  }
});

print('Spell Essence by Power Level', [{ label:'Spell' }, { label:'Level', align:'right' }, ...breakdownColumns], spellRows);

// ---

const entryRows = [];
const sumRows = [];

BaseMonster.getAllCodes().sort().forEach(code => {
  const base = BaseMonster.lookup(code);
  const entries = Object.entries(base.getAbilityMap());
  let sum = 0;

  entries.forEach(([key, entry]) => {
    const breakdown = EssenceSystem.abilityEntryBreakdown(base, key);
    const ability = entry.spell || entry.article || entry.code;
    sum += breakdown.total;

    entryRows.push([code, key, ability, kindOf(entry, breakdown), base.getAbilityCooldown(key) || 0, ...breakdownCells(breakdown)]);
  });

  sumRows.push([code, base.getLevel(), entries.length, sum.toFixed(2)]);
});

print('Monster Ability Entries', [
  { label:'Monster' },
  { label:'Key' },
  { label:'Ability' },
  { label:'Kind' },
  { label:'Cooldown', align:'right' },
  ...breakdownColumns,
], entryRows);

print('Monster Ability Essence', [
  { label:'Monster' },
  { label:'Level', align:'right' },
  { label:'Entries', align:'right' },
  { label:'Sum', align:'right' },
], sumRows);
