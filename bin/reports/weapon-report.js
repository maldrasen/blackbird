// Usage: node bin/reports/weapon-report.js [type|dps|value]

require('../run-headless.js');

const sort = process.argv[2] || 'type';

const weapons = BaseWeapon.getAllCodes().map(code => {
  const weapon = BaseWeapon.lookup(code);
  return {
    code:      code,
    type:      weapon.getType(),
    hands:     weapon.getHands(),
    reach:     weapon.getReach(),
    damage:    `${weapon.getLow()}-${weapon.getHigh()}`,
    dps:       weapon.getDamagePerSecond(),
    speed:     weapon.getSpeed(),
    types:     damageTypeString(weapon),
    material:  weapon.getPrimaryMaterial() || '-',
    value:     weapon.getValue(),
  };
});

const byValue = (a,b) => b.value - a.value;

switch (sort) {
  case 'type':  weapons.sort((a,b) => a.type.localeCompare(b.type) || byValue(a,b)); break;
  case 'dps':   weapons.sort((a,b) => b.dps - a.dps); break;
  case 'value': weapons.sort(byValue); break;
  default:      throw new Error(`Unknown sort "${sort}" (expected type, dps, or value)`);
}

function damageTypeString(weapon) {
  return weapon.getDamageTypes().map(entry => {
    return entry.percent === 100 ? entry.type : `${entry.type}:${entry.percent}`;
  }).join('/');
}

console.log(`\n=== Base Weapon Report (by ${sort}) ===\n`);

console.log(ReportHelper.formatTable([
  { label:'code' },
  { label:'type' },
  { label:'hands' },
  { label:'reach' },
  { label:'damage' },
  { label:'dps',   align:'right' },
  { label:'speed', align:'right' },
  { label:'damage types' },
  { label:'material' },
  { label:'value', align:'right' },
], weapons.map(weapon => [
  weapon.code, weapon.type, weapon.hands, weapon.reach, weapon.damage,
  weapon.dps.toFixed(1), weapon.speed, weapon.types, weapon.material, weapon.value,
])).join('\n'));
