global.PersonalityFactory = (function() {

  // Archetype selection priority: name triggers first, then the base monster's archetype map, then the species
  // distribution. Names win because people are sometimes named for their personality.
  function buildPersonality(actorData, triggers, monsterArchetypes) {
    const archetypes = Species.lookup(actorData.species).getArchetypes();
    const personality = { sanity: 100 };

    function setArchetype(trigger, archetypeCode) {
      assertValid(archetypeCode, actorData);
      if (personality.archetype != null) {
        throw new Error(`Character Rejected: Can't set more than one personality archetypes.`);
      }

      personality.archetype = archetypeCode;
      Console.log(`Applied ${trigger}`,{ system:'PersonalityFactory', level:3 });
      ArrayHelper.remove(triggers, trigger);
    }

    [...triggers].forEach(trigger => {
      if (trigger.match(/^~/)) {
        if (trigger === '~cruel') {
          setArchetype(trigger, actorData.gender === Gender.male ? ArchetypeCode.bastard : ArchetypeCode.bitch);
        }
        else if (trigger === '~kind') {
          setArchetype(trigger, actorData.gender === Gender.male ? ArchetypeCode.nice : ArchetypeCode.sweet)
        }
        else {
          setArchetype(trigger, trigger.substring(1,trigger.length));
        }
      }
    });

    if (personality.archetype == null && monsterArchetypes != null) {
      const valid = filterValidArchetypes(monsterArchetypes, actorData);
      if (Object.keys(valid).length > 0) {
        personality.archetype = Random.fromFrequencyMap(valid);
      }
    }

    if (personality.archetype == null) {
      personality.archetype = Random.fromFrequencyMap(archetypes[actorData.gender]);
    }

    return personality;
  }

  // The species archetype map for a gender already excludes archetypes that gender can't have, so filtering against
  // it covers both the species and gender requirements.
  function filterValidArchetypes(frequencyMap, actor) {
    const available = Object.keys(Species.lookup(actor.species).getArchetypes()[actor.gender]);
    const valid = {};
    Object.entries(frequencyMap).forEach(([code,frequency]) => {
      if (available.includes(code)) { valid[code] = frequency; }
    });
    return valid;
  }

  function assertValid(code, actor) {
    const available = Object.keys(Species.lookup(actor.species).getArchetypes()[actor.gender]);
    const requires = Archetype.lookup(code).getRequires();

    if (available.includes(code) === false) {
      throw new Error(`Character Rejected: Species[${actor.species}] cannot be an Archetype[${code}].`); }
    if (requires === 'gender.male' && actor.gender !== Gender.male) {
      throw new Error(`Character Rejected: Archetype[${code}] must be male.`); }
    if (requires === 'gender.not-male' && actor.gender === Gender.male) {
      throw new Error(`Character Rejected: Archetype[${code}] must not be male.`); }
  }

  return Object.freeze({
    buildPersonality,
  });

})();
