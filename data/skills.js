
// === Dungeoning ===

// Persuasion, intimidation, seduction, convince other characters to like you more or just the ability to communicate
// in general.
Skill.register('conversation',{
  name: "Conversation",
  factor: 1.5,
  attributes: [Attrib.intelligence, Attrib.beauty] });

// A character's perception, and ability to search for things, tracking, danger sense.
Skill.register('scouting',{
  name: "Scouting",
  factor: 1.5,
  attributes: [Attrib.intelligence] });

// Used for hide actions in combat, but also should just make them less likely to be attacked in combat.
Skill.register('stealth',{
  name: "Stealth",
  factor: 1.25,
  attributes: [Attrib.dexterity] });

// Probably used for a variety of things, but for opening locks and disarming traps. I don't like having whole skills
// devoted to thief shit that's useless everywhere else though, so this could also include using any kind of mechanical
// object and figuring out how they work.
Skill.register('mechanics',{
  name: "Mechanics",
  factor: 2.5,
  attributes: [Attrib.intelligence] });

// The magical version of mechanics. Not related to a specific type of magic, arcana is used to figure out magical
// traps, magical locks, identifying magical items, and using things like wands.
Skill.register('arcana',{
  name: "Arcane",
  factor: 2.5,
  attributes: [Attrib.intelligence] });

// == Magical ===

Skill.register('sorcery',{
  name: "Sorcery",
  factor: 3,
  attributes: [Attrib.intelligence] });

Skill.register('thaumaturgy',{
  name: "Thaumaturgy",
  factor: 3,
  attributes: [Attrib.intelligence] });

Skill.register('witchcraft',{
  name: "Witchcraft",
  factor: 3,
  attributes: [Attrib.intelligence] });

Skill.register('magic',{
  name: "Magic",
  factor: 3,
  attributes: [Attrib.intelligence] });

Skill.register('wizardry',{
  name: "Wizardry",
  factor: 3,
  attributes: [Attrib.intelligence] });

// === Martial ===

Skill.register('axe',{
  name: "Axes",
  factor: 1,
  attributes: [Attrib.strength] });

Skill.register('bows',{
  name: "Bows & Guns",
  factor: 2,
  attributes: [Attrib.dexterity] });

Skill.register('daggers',{
  name: "Daggers",
  factor: 1.5,
  attributes: [Attrib.dexterity] });

Skill.register('grappling',{
  name: "Grappling",
  factor: 1.25,
  attributes: [Attrib.strength, Attrib.dexterity] });

Skill.register('maces',{
  name: "Maces",
  factor: 1,
  attributes: [Attrib.strength] });

Skill.register('polearms',{
  name: "Spears & Polearms",
  factor: 1.25,
  attributes: [Attrib.strength] });

Skill.register('shields',{
  name: "Shields",
  factor: 1,
  attributes: [Attrib.strength] });

Skill.register('swords',{
  name: "Swords",
  factor: 2,
  attributes: [Attrib.strength, Attrib.dexterity] });

Skill.register('whips',{
  name: "Whips & Flails",
  factor: 2.5,
  attributes: [Attrib.dexterity] });

// === Sexual ===

// Only the player character (and perhaps some NPCs) should have access to the domination, degradation, and sadism
// skills. The conceit of the game is that the player is capturing people to serve them and to train sexually. The
// player is always in the 'dominant' role. Captured characters can have sexual preferences that conflict with this,
// but that's the reality of their situation. It might make sense for characters in assistant roles to develop some
// of these skills, but only once they're completely devoted to the player. Skills like servicing and performance are
// essentially submissive skills, though I think it's fine for the player to have them as well. Being able to please
// your partner is part of dominating them.

Skill.register('domination',{
  name: "Domination",
  factor: 2.5,
  attributes: [Attrib.strength, Attrib.intelligence] });

Skill.register('degradation',{
  name: "Degradation",
  factor: 2,
  attributes: [Attrib.dexterity, Attrib.intelligence] });

Skill.register('sadism',{
  name: "Sadism",
  factor: 1.25,
  attributes: [Attrib.strength, Attrib.dexterity] });

// Characters with high performance are more active and vocal during sex. When an action is done to a character with
// high performance, it's more pleasurable for the person doing the action.
Skill.register('performance',{
  name: "Performance",
  factor: 1.75,
  attributes: [Attrib.beauty] });

// General sexual skill. High technique makes all sex actions better for the receiver of the action. Technique and
// Performance should mirror each other.
Skill.register('technique',{
  name: "Technique",
  factor: 1.25,
  attributes: [Attrib.dexterity] });

// Specifically for mouth and hand actions. Servicing factor can multiply with technique factor to make blowjobs and
// such as pleasurable as (or more than) fucking.
Skill.register('servicing',{
  name: "Servicing",
  factor: 1.5,
  attributes: [Attrib.dexterity, Attrib.vitality] });

// Specifically for thrusting and fucking type actions where strength and vitality are impressive.
Skill.register('ravishing',{
  name: "Ravishing",
  factor: 1,
  attributes: [Attrib.strength, Attrib.vitality] });

// Deepthroating skill will increase the comfortable throat depth. Cleaner and more visible than adjusting the value on
// the mouth component.
Skill.register('deepthroating',{
  name: "Deepthroating",
  factor: 2,
  attributes: [Attrib.vitality] });

// === Other ===

Skill.register('dance',{
  name: "Dance",
  factor: 2.25,
  attributes: [Attrib.beauty, Attrib.dexterity] });
