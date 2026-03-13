global.PersonalityFactory = (function() {

  function buildPersonality(actorData, triggers) {
    const archetypes = Species.lookup(actorData.species).getArchetypes();
    const personality = { sanity: 100 };

    function setArchetype(trigger, archetypeCode) {
      assertValid(archetypeCode, actorData);
      if (personality.archetype != null) {
        throw `Character Rejected: Can't set more than one personality archetypes.`
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

    if (personality.archetype == null) {
      personality.archetype = Random.fromFrequencyMap(archetypes[actorData.gender]);
    }

    return personality;
  }

  function assertValid(code, actor) {
    const available = Object.keys(Species.lookup(actor.species).getArchetypes()[actor.gender]);
    const requires = Archetype.lookup(code).getRequires();

    if (available.includes(code) === false) {
      throw `Character Rejected: Species[${actor.species}] cannot be an Archetype[${code}].`;}
    if (requires === 'gender.male' && actor.gender !== Gender.male) {
      throw `Character Rejected: Archetype[${code}] must be male.`; }
    if (requires === 'gender.not-male' && actor.gender === Gender.male) {
      throw `Character Rejected: Archetype[${code}] must not be male.`; }
    if (requires === 'species.kobold' && actor.species !== SpeciesCode.kobold) {
      throw `Character Rejected: Archetype[${code}] must be a Kobold.`; }
    if (requires === 'species.vermen' && actor.species !== SpeciesCode.vermen) {
      throw `Character Rejected: Archetype[${code}] must be a Vermen.`; }
  }

  return Object.freeze({
    buildPersonality,
  });

})();
