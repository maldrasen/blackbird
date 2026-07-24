// Usage: node bin/reports/sex-action-report.js [code|consent|technique|time|player|partner]

require('../run-headless.js');

const sort = process.argv[2] || 'code';

const actions = SexAction.getAllCodes().map(code => {
  const action = SexAction.lookup(code);
  return {
    code:      code,
    consent:   action.getConsentTarget(),
    technique: action.getTechniqueTarget(),
    time:      action.getTime(),
    player:    action.getPlayerStamina(),
    partner:   action.getPartnerStamina(),
  };
});

const byCode = (a,b) => a.code.localeCompare(b.code);

switch (sort) {
  case 'code':      actions.sort(byCode); break;
  case 'consent':   actions.sort((a,b) => a.consent - b.consent || byCode(a,b)); break;
  case 'technique': actions.sort((a,b) => a.technique - b.technique || byCode(a,b)); break;
  case 'time':      actions.sort((a,b) => a.time - b.time || byCode(a,b)); break;
  case 'player':    actions.sort((a,b) => a.player - b.player || byCode(a,b)); break;
  case 'partner':   actions.sort((a,b) => a.partner - b.partner || byCode(a,b)); break;
  default:          throw new Error(`Unknown sort "${sort}" (expected code, consent, technique, time, player, or partner)`);
}

console.log(`\n=== Sex Action Report (by ${sort}) ===\n`);

console.log(ReportHelper.formatTable([
  { label:'code' },
  { label:'consent',   align:'right' },
  { label:'technique', align:'right' },
  { label:'time',      align:'right' },
  { label:'player stamina',  align:'right' },
  { label:'partner stamina', align:'right' },
], actions.map(action => [
  action.code, action.consent, action.technique, action.time, action.player, action.partner,
])).join('\n'));
