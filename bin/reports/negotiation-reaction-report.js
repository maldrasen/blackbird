// Usage: node bin/reports/negotiation-reaction-report.js
//
// Shows reaction coverage for every negotiation question across the negotiation styles. A monster can only draw a
// question when some reaction applies to it, so a '-' cell means monsters of that style can never be asked that
// question (and for follow-up questions, setFollowUp would throw). Cells show how the style is covered:
//
//   yes             an unrestricted reaction covers any monster of this style
//   kobold, female  only reactions restricted to that species/gender/monster/archetype cover this style
//   *               the reaction carries static requirements, so coverage is conditional
//   -               no coverage
//
// Questions marked (f) are follow-ups and never enter the random question pool.

require('../run-headless.js');

const styles = Object.values(NegotiationStyle);

// A reaction with an explicit style covers only that style. One that targets an archetype covers that archetype's
// style. Anything else (species, gender, or monster targets) applies to monsters of any style.
function coveredStyles(reaction) {
  if (reaction.style != null) { return [reaction.style]; }
  if (reaction.archetype != null) { return [Archetype.lookup(reaction.archetype).getNegotiationStyle()]; }
  return styles;
}

function restrictionLabel(reaction) {
  const parts = [
    reaction.monster,
    reaction.gender,
    reaction.species,
    reaction.archetype,
  ].filter(part => part != null);

  const label = parts.length === 0 ? 'yes' : parts.join('+');
  return (reaction.staticRequirements || []).length > 0 ? `${label}*` : label;
}

function cellText(labels) {
  if (labels.length === 0) { return '-'; }
  if (labels.includes('yes')) { return 'yes'; }
  return [...new Set(labels)].join(',');
}

const rows = NegotiationQuestion.getAllCodes().map(code => {
  const question = NegotiationQuestion.lookup(code);
  const coverage = {};

  NegotiationQuestion.getReactions(code).forEach(reaction => {
    coveredStyles(reaction).forEach(style => {
      if (coverage[style] == null) { coverage[style] = []; }
      coverage[style].push(restrictionLabel(reaction));
    });
  });

  return [
    question.isFollowUp() ? `${code} (f)` : code,
    ...styles.map(style => cellText(coverage[style] || [])),
  ];
});

console.log(`\n=== Negotiation Reaction Coverage ===\n`);

console.log(ReportHelper.formatTable([
  { label:'question' },
  ...styles.map(style => ({ label:style })),
], rows).join('\n'));

const questionCodes = NegotiationQuestion.getAllCodes();
const orphaned = NegotiationQuestion.getAllReactionCodes().filter(code => questionCodes.includes(code) === false);
const unanswered = questionCodes.filter(code => NegotiationQuestion.getReactions(code).length === 0);

if (orphaned.length > 0) {
  console.log(`\nOrphaned reactions (no question with this code): ${orphaned.join(', ')}`);
}
if (unanswered.length > 0) {
  console.log(`\nQuestions with no reactions at all: ${unanswered.join(', ')}`);
}
