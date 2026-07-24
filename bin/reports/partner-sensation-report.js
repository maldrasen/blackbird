// Usage: node bin/reports/partner-sensation-report.js

require('../run-headless.js');

// Partner sensations cover the same scales the training system tracks: anger plus the anima and animus properties.
const sensations = ['anger', ...AnimaComponent.getProperties(), ...AnimusComponent.getProperties()];

console.log(`\n=== Partner Sensation Report ===`);

sensations.forEach(sensation => {
  const rows = SexAction.getAllCodes().map(code => {
    return { code:code, value:SexAction.lookup(code).getPartnerSensations()[sensation] };
  }).filter(row => row.value != null);

  rows.sort((a,b) => a.value - b.value || a.code.localeCompare(b.code));

  console.log('');
  console.log(ReportHelper.formatTable([
    { label:'code' },
    { label:sensation, align:'right' },
  ], rows.map(row => [row.code, row.value])).join('\n'));
});
