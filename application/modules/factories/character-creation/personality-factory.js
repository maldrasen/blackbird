global.PersonalityFactory = (function() {

  function buildPersonality(actorData, triggers) {
    const archetypes = Species.lookup(actorData.species).getArchetypes();
    const personality = { sanity: 100 };

    function setArchetype(trigger, archetype) {
      if (personality.archetype != null) {
        throw `Character Rejected: Can't set more than one personality archetypes.`
      }

      personality.archetype = archetype;
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

  return Object.freeze({
    buildPersonality,
  });

})();
