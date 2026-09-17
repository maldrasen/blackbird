// Usage: node bin/reports/weapon-report.js [type|dps]

require('../run-headless.js');

const sort = process.argv[2] || 'type';

const weapons = BaseEquipment.getAllCodes().map(code => BaseEquipment.lookup(code)).filter(base => base.isWeapon()).map(weapon => {
  return {
    code:      weapon.getCode(),
    type:      weapon.getType(),
    hands:     weapon.getHands(),
    reach:     weapon.getReach(),
    damage:    `${weapon.getLow()}-${weapon.getHigh()}`,
    dps:       ((weapon.getLow() + weapon.getHigh()) / 2) / (weapon.getSpeed() / 1000),
    speed:     weapon.getSpeed(),
    types:     damageTypeString(weapon),
    materials: materialString(weapon),
    effort:    weapon.getEffort(),
  };
});

const byDps = (a,b) => b.dps - a.dps;

switch (sort) {
  case 'type': weapons.sort((a,b) => a.type.localeCompare(b.type) || byDps(a,b)); break;
  case 'dps':  weapons.sort(byDps); break;
  default:     throw new Error(`Unknown sort "${sort}" (expected type or dps)`);
}

function damageTypeString(weapon) {
  return weapon.getDamageTypes().map(entry => {
    return entry.percent === 100 ? entry.type : `${entry.type}:${entry.percent}`;
  }).join('/');
}

function materialString(weapon) {
  return Object.entries(weapon.getMaterials()).map(([type,amount]) => `${type}:${amount}`).join(' ');
}

console.log(`\n=== Base Weapon Report (by ${sort}) ===\n`);

console.log(ReportHelper.formatTable([
  { label:'code' },
  { label:'type' },
  { label:'hands' },
  { label:'reach' },
  { label:'damage' },
  { label:'dps',    align:'right' },
  { label:'speed',  align:'right' },
  { label:'damage types' },
  { label:'materials' },
  { label:'effort', align:'right' },
], weapons.map(weapon => [
  weapon.code, weapon.type, weapon.hands, weapon.reach, weapon.damage,
  weapon.dps.toFixed(1), weapon.speed, weapon.types, weapon.materials, weapon.effort,
])).join('\n'));
