// Usage: node bin/reports/archetype-report.js [count]

require('../run-headless.js');

const count = Number(process.argv[2]) || 1000;
const genders = [Gender.male, Gender.female, Gender.futa, Gender.enby];
const rows = [];

// When the registry fills with characters the name pool runs dry and the factory can start failing outright.
// Clearing the registry resets the name pool, so retry after that.
function buildCharacter(speciesCode, gender) {
  for (let attempt=0; attempt<3; attempt++) {
    try { return CharacterFactory.build({ gender:gender, species:speciesCode }); }
    catch(error) { Registry.clear(); }
  }
  throw new Error(`Cannot build a ${gender} ${speciesCode} even with an empty registry.`);
}

Species.getAllCodes().forEach(speciesCode => {
  const ratio = Species.lookup(speciesCode).getGenderRatio();

  genders.forEach(gender => {
    if ((ratio[gender] || 0) === 0) { return; }

    Registry.clear();

    const counts = {};
    for (let i=0; i<count; i++) {
      const id = buildCharacter(speciesCode, gender);
      const archetype = Personality(id).getArchetype();
      counts[archetype] = (counts[archetype] || 0) + 1;
    }

    rows.push({ species:speciesCode, gender:gender, counts:counts });
  });
});

const archetypes = Archetype.getAllCodes().filter(code => {
  return rows.some(row => row.counts[code] != null);
}).sort();

console.log(`\n=== Archetype Report (${count} characters per row) ===\n`);

console.log(ReportHelper.formatTable([
  { label:'species' },
  { label:'gender' },
  ...archetypes.map(code => ({ label:code, align:'right' })),
], rows.map(row => [
  row.species,
  row.gender,
  ...archetypes.map(code => row.counts[code] || '-'),
])).join('\n'));
