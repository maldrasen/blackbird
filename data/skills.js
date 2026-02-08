
// === Dungeoning ===

// Persuasion, intimidation, seduction, convince other characters to like you more or just the ability to communicate
// in general.
Skill.register('conversation',{
  name: "Conversation",
  attributes: [Attrib.intelligence, Attrib.beauty] });

// A character's perception, and ability to search for things, tracking, danger sense.
Skill.register('scouting',{
  name: "Scouting",
  attributes: [Attrib.intelligence] });

// Used for hide actions in combat, but also should just make them less likely to be attacked in combat.
Skill.register('stealth',{
  name: "Stealth",
  attributes: [Attrib.dexterity] });

// Probably used for a variety of things, but for opening locks and disarming traps. I don't like having whole skills
// devoted to thief shit that's useless everywhere else though, so this could also include using any kind of mechanical
// object and figuring out how they work.
Skill.register('mechanics',{
  name: "Mechanics",
  attributes: [Attrib.intelligence] });

// The magical version of mechanics. Not related to a specific type of magic, arcana is used to figure out magical
// traps, magical locks, identifying magical items, and using things like wands.
Skill.register('arcana',{
  name: "Arcane",
  attributes: [Attrib.intelligence] });

// == Magical ===

Skill.register('sorcery',{
  name: "Sorcery",
  attributes: [Attrib.intelligence] });

Skill.register('thaumaturgy',{
  name: "Thaumaturgy",
  attributes: [Attrib.intelligence] });

Skill.register('witchcraft',{
  name: "Witchcraft",
  attributes: [Attrib.intelligence] });

Skill.register('magic',{
  name: "Magic",
  attributes: [Attrib.intelligence] });

Skill.register('wizardry',{
  name: "Wizardry",
  attributes: [Attrib.intelligence] });

// === Martial ===

Skill.register('axe',{
  name: "Axes",
  attributes: [Attrib.strength] });

Skill.register('bows',{
  name: "Bows & Guns",
  attributes: [Attrib.dexterity] });

Skill.register('daggers',{
  name: "Daggers",
  attributes: [Attrib.dexterity] });

Skill.register('grappling',{
  name: "Grappling",
  attributes: [Attrib.strength, Attrib.dexterity] });

Skill.register('maces',{
  name: "Maces",
  attributes: [Attrib.strength] });

Skill.register('polearms',{
  name: "Spears & Polearms",
  attributes: [Attrib.strength] });

Skill.register('shields',{
  name: "Shields",
  attributes: [Attrib.strength] });

Skill.register('swords',{
  name: "Swords",
  attributes: [Attrib.strength, Attrib.dexterity] });

Skill.register('whips',{
  name: "Whips & Flails",
  attributes: [Attrib.dexterity] });

// === Sexual ===
// I'll need some kind of BDSM skills. The sexual preferences for domination, sadism, etc., only indicate how much you
// like something, but not if you're good at it. Being a dominator takes skill, but being submissive doesn't.
// Submissiveness would instead rely on the servicing skill. What other sex skills are there?

// Characters with high performance are more active and vocal during sex. When an action is done to a character with
// high performance, it's more pleasurable for the person doing the action.
Skill.register('performance',{
  name: "Performance",
  attributes: [Attrib.beauty] });

// General sexual skill. High technique makes all sex actions better for the receiver of the action. Technique and
// Performance should mirror each other.
Skill.register('technique',{
  name: "Technique",
  attributes: [Attrib.dexterity] });

// Specifically for mouth and hand actions. Servicing factor can multiply with technique factor to make blowjobs and
// such as pleasurable as (or more than) fucking.
Skill.register('servicing',{
  name: "Servicing",
  attributes: [Attrib.dexterity, Attrib.vitality] });

// Deepthroating skill will increase the comfortable throat depth. Cleaner and more visible than adjusting the value on
// the mouth component. First hidden skill, which indicates that the skill isn't displayed until there are points.
Skill.register('deepthroating',{
  name: "Servicing",
  attributes: [Attrib.vitality],
  hidden: true,
});
