// Usage: node bin/reports/player-sensation-report.js

require('../run-headless.js');

// Player sensations cover the same scales the training system tracks for the player: desire plus the animus properties.
const sensations = ['desire', ...AnimusComponent.getProperties()];

console.log(`\n=== Player Sensation Report ===`);

sensations.forEach(sensation => {
  const rows = SexAction.getAllCodes().map(code => {
    return { code:code, value:SexAction.lookup(code).getPlayerSensations()[sensation] };
  }).filter(row => row.value != null);

  rows.sort((a,b) => a.value - b.value || a.code.localeCompare(b.code));

  console.log('');
  console.log(ReportHelper.formatTable([
    { label:'code' },
    { label:sensation, align:'right' },
  ], rows.map(row => [row.code, row.value])).join('\n'));
});
