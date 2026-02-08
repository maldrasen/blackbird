
// === Dungeoning ===

// Persuasion, intimidation, seduction, convince other characters to like you more or just the ability to communicate
// in general.
SkillRecord.register('conversation',{
  name: "Conversation",
  attributes: [Attrib.intelligence, Attrib.beauty] });

// A character's perception, and ability to search for things, tracking, danger sense.
SkillRecord.register('scouting',{
  name: "Scouting",
  attributes: [Attrib.intelligence] });

// Used for hide actions in combat, but also should just make them less likely to be attacked in combat.
SkillRecord.register('stealth',{
  name: "Stealth",
  attributes: [Attrib.dexterity] });

// Probably used for a variety of things, but for opening locks and disarming traps. I don't like having whole skills
// devoted to thief shit that's useless everywhere else though, so this could also include using any kind of mechanical
// object and figuring out how they work.
SkillRecord.register('mechanics',{
  name: "Mechanics",
  attributes: [Attrib.intelligence] });

// The magical version of mechanics. Not related to a specific type of magic, arcana is used to figure out magical
// traps, magical locks, identifying magical items, and using things like wands.
SkillRecord.register('arcana',{
  name: "Arcane",
  attributes: [Attrib.intelligence] });

// == Magical ===

SkillRecord.register('sorcery',{
  name: "Sorcery",
  attributes: [Attrib.intelligence] });

SkillRecord.register('thaumaturgy',{
  name: "Thaumaturgy",
  attributes: [Attrib.intelligence] });

SkillRecord.register('witchcraft',{
  name: "Witchcraft",
  attributes: [Attrib.intelligence] });

SkillRecord.register('magic',{
  name: "Magic",
  attributes: [Attrib.intelligence] });

SkillRecord.register('wizardry',{
  name: "Wizardry",
  attributes: [Attrib.intelligence] });

// === Martial ===

SkillRecord.register('axe',{
  name: "Axes",
  attributes: [Attrib.strength] });

SkillRecord.register('bows',{
  name: "Bows & Guns",
  attributes: [Attrib.dexterity] });

SkillRecord.register('daggers',{
  name: "Daggers",
  attributes: [Attrib.dexterity] });

SkillRecord.register('grappling',{
  name: "Grappling",
  attributes: [Attrib.strength, Attrib.dexterity] });

SkillRecord.register('maces',{
  name: "Maces",
  attributes: [Attrib.strength] });

SkillRecord.register('polearms',{
  name: "Spears & Polearms",
  attributes: [Attrib.strength] });

SkillRecord.register('shields',{
  name: "Shields",
  attributes: [Attrib.strength] });

SkillRecord.register('swords',{
  name: "Swords",
  attributes: [Attrib.strength, Attrib.dexterity] });

SkillRecord.register('whips',{
  name: "Whips & Flails",
  attributes: [Attrib.dexterity] });

// === Sexual ===

// Vitality for endurance, strength for anal squeezing.
SkillRecord.register('anal-sex',{
  name: "Anal Sex",
  attributes: [Attrib.strength, Attrib.vitality] });

// Vitality for endurance lack of breathing, dexterity for tongue work.
SkillRecord.register('oral-sex',{
  name: "Oral Sex",
  attributes: [Attrib.dexterity, Attrib.vitality] });
