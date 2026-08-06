// Usage: node bin/reports/negotiation-reaction-report.js <monster> [playerGender] [samples]
//
// Detailed breakout of the negotiation question pool for a single base monster: when the question report shows a low
// pool count, this explains why. It samples fresh player/monster builds and, for every question, reports how often it
// made the pool along with what blocked it — which static requirements failed, and which reactions didn't apply to
// the monster and why (rolled style, gender, species, or the reaction's own static requirements).
//
// Static requirements are opaque predicates, so they're labeled by their position in the question's requirement list
// plus the predicate name pulled from the closure source. When the same name appears twice (e.g. isMale for both the
// player and the monster) the position tells them apart.

require('../run-headless.js');

const monsterCode = process.argv[2];
const playerGender = process.argv[3] || Gender.male;
const samples = Number(process.argv[4]) || 40;

if (monsterCode == null || BaseMonster.getAllCodes().includes(monsterCode) === false) {
  console.log(`Usage: node bin/reports/negotiation-reaction-report.js <monster> [playerGender] [samples]`);
  console.log(`Monsters: ${BaseMonster.getAllCodes().join(', ')}`);
  process.exit(1);
}
if (BaseMonster.lookup(monsterCode).getSpecies() == null) {
  console.log(`${monsterCode} has no species and cannot negotiate.`);
  process.exit(1);
}
if (Object.values(Gender).includes(playerGender) === false) {
  console.log(`Bad player gender [${playerGender}]. Genders: ${Object.values(Gender).join(', ')}`);
  process.exit(1);
}

// Negated requirements like notVisibleCock() wrap the positive predicate in a === false check, so the closure source
// only names the inner call. Detect the negation and put the "not" back.
function requirementLabel(requirement, index) {
  const source = requirement.toString();
  const match = /return (\w+)\(/.exec(source);
  const name = match ? match[1] : 'requirement';
  return `#${index+1} ${source.includes('=== false') ? `not ${name}` : name}`;
}

function reactionLabel(reaction) {
  const parts = ['style','archetype','species','gender','monster']
    .filter(property => reaction[property] != null)
    .map(property => `${property}:${reaction[property]}`);

  if ((reaction.staticRequirements || []).length > 0) { parts.push('*'); }
  return `[${parts.join(' ')}]`;
}

// Mirrors matchesTarget() in the NegotiationQuestion record, but reports the first mismatch instead of a boolean.
function reactionFailure(reaction, monster, context) {
  if (reaction.style != null     && monster.getNegotiationStyle() !== reaction.style) { return `style was ${monster.getNegotiationStyle()}`; }
  if (reaction.archetype != null && monster.getArchetype() !== reaction.archetype)    { return `archetype was ${monster.getArchetype()}`; }
  if (reaction.species != null   && monster.getSpecies() !== reaction.species)        { return `species is ${monster.getSpecies()}`; }
  if (reaction.gender != null    && monster.getGender() !== reaction.gender)          { return `gender was ${monster.getGender()}`; }
  if (reaction.monster != null   && monster.getCode() !== reaction.monster)           { return `monster is ${monster.getCode()}`; }
  if (Requirements.met(reaction.staticRequirements, context) === false)               { return `static requirements failed`; }
  return null;
}

const questionStats = {};
NegotiationQuestion.getAllCodes().forEach(code => {
  questionStats[code] = { inPool:0, reactionMatched:0, staticFails:{}, reactions:[] };
});

const genderCounts = {};
const styleCounts = {};

for (let i=0; i<samples; i++) {
  Registry.clear();

  const player = PlayerFactory.build({ gender:playerGender });
  GameSystem.getState().setPlayer(player);
  CharacterEquipper(player).equip(Random.between(500,1000));

  const monsterId = MonsterFactory.build(monsterCode);
  const monster = Monster(monsterId);
  const context = { P:player, T:monsterId };

  genderCounts[monster.getGender()] = (genderCounts[monster.getGender()] || 0) + 1;
  styleCounts[monster.getNegotiationStyle()] = (styleCounts[monster.getNegotiationStyle()] || 0) + 1;

  NegotiationQuestion.getAllCodes().forEach(code => {
    const question = NegotiationQuestion.lookup(code);
    const stats = questionStats[code];

    let staticOk = true;
    question.getStaticRequirements().forEach((requirement, index) => {
      if (requirement(context) === false) {
        staticOk = false;
        const label = requirementLabel(requirement, index);
        stats.staticFails[label] = (stats.staticFails[label] || 0) + 1;
      }
    });

    let anyMatch = false;
    NegotiationQuestion.getReactions(code).forEach((reaction, index) => {
      if (stats.reactions[index] == null) {
        stats.reactions[index] = { label:reactionLabel(reaction), matched:0, failures:{} };
      }

      const failure = reactionFailure(reaction, monster, context);
      if (failure == null) {
        anyMatch = true;
        stats.reactions[index].matched += 1;
      } else {
        stats.reactions[index].failures[failure] = (stats.reactions[index].failures[failure] || 0) + 1;
      }
    });

    if (anyMatch) { stats.reactionMatched += 1; }
    if (staticOk && anyMatch && question.isFollowUp() === false) { stats.inPool += 1; }
  });
}

function formatCounts(counts) {
  return Object.entries(counts).map(([key,count]) => `${key} ${count}`).join(', ');
}

console.log(`\n=== Negotiation Reaction Report : ${monsterCode} vs ${playerGender} player (${samples} samples) ===`);
console.log(`monster genders: ${formatCounts(genderCounts)}`);
console.log(`monster styles: ${formatCounts(styleCounts)}`);

NegotiationQuestion.getAllCodes().forEach(code => {
  const question = NegotiationQuestion.lookup(code);
  const stats = questionStats[code];

  console.log(question.isFollowUp() ?
    `\n${code} (follow-up) — reaction matched ${stats.reactionMatched}/${samples}` :
    `\n${code} — in pool ${stats.inPool}/${samples}`);

  if (question.isFollowUp() === false) {
    Object.entries(stats.staticFails).forEach(([label,count]) => {
      console.log(`  static ${label} failed ${count}/${samples}`);
    });
  }

  if (stats.reactions.length === 0) {
    console.log(`  no reactions registered`);
  }

  stats.reactions.forEach(reaction => {
    const failures = Object.entries(reaction.failures).map(([reason,count]) => `${reason} (${count})`).join(', ');
    if (failures.length > 0) {
      console.log(`  reaction ${reaction.label} matched ${reaction.matched}/${samples} — ${failures}`);
    }
  });
});
