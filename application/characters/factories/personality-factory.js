global.PersonalityFactory = (function() {

  function build() {
    const state = CharacterFactory.getState();
    const actor = state.getActor();
    const archetypeMap = state.getArchetypes();
    const archetypes = state.getSpecies().getArchetypes();
    const personality = { sanity: 100 };

    function setArchetype(trigger, archetypeCode) {
      assertValid(archetypeCode, actor);
      if (personality.archetype != null) {
        throw new Error(`Character Rejected: Can't set more than one personality archetypes.`);
      }

      personality.archetype = archetypeCode;
      Console.log(`Applied ${trigger}`,{ system:'PersonalityFactory', level:3 });
      state.removeTrigger(trigger);
    }

    state.getTriggers().forEach(trigger => {
      if (trigger.match(/^~/)) {
        if (trigger === '~cruel') {
          setArchetype(trigger, actor.gender === Gender.male ? ArchetypeCode.bastard : ArchetypeCode.bitch);
        }
        else if (trigger === '~kind') {
          setArchetype(trigger, actor.gender === Gender.male ? ArchetypeCode.nice : ArchetypeCode.sweet)
        }
        else {
          setArchetype(trigger, trigger.substring(1,trigger.length));
        }
      }
    });

    if (personality.archetype == null && archetypeMap != null) {
      const valid = filterValidArchetypes(archetypeMap, actor);
      if (Object.keys(valid).length > 0) {
        personality.archetype = Random.fromFrequencyMap(valid);
      }
    }

    if (personality.archetype == null) {
      personality.archetype = Random.fromFrequencyMap(archetypes[actor.gender]);
    }

    state.setPersonality(personality);
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

    if (available.includes(code) === false) {
      throw new Error(`Character Rejected: Species[${actor.species}] cannot be an Archetype[${code}].`); }
    if (Requirements.met(Archetype.lookup(code).getRequires()) === false) {
      throw new Error(`Character Rejected: Archetype[${code}] requirements not met.`); }
  }

  return Object.freeze({
    build,
  });

})();
