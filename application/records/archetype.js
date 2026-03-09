global.Archetype = (function() {
  const $archetypes = {};

  function register(code,data) {
    $archetypes[code] = data;
  }

  function lookup(code) {
    if ($archetypes[code] === null) { throw `Bad archetype code [${code}]` }

    const archetype = { ...$archetypes[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return archetype.name; },
    });
  }

  function assignArchetype(id) {
    const personality = PersonalityComponent.lookup(id);
    personality.archetype = getArchetype(id);
    PersonalityComponent.update(id, personality);
  }

  // The character's personality archetype is used to choose an initial dialog tree, which is easier than branching
  // within a huge tree that needs to take a character's personality, feelings, and aspects all into consideration.
  // Certain personality aspects are 'stronger' than others, so a character with a 'bimbo' aspect will act like a bimbo
  // even if they're also a violent sadist.
  function getArchetype(id) {
    const character = Character(id);
    const aspects = AspectsComponent.lookup(id);
    const personality = PersonalityComponent.lookup(id);
    const actor = ActorComponent.lookup(id);
    const sexualPreferences = SexualPreferencesComponent.lookup(id);
    const strongestFactor = strongestPersonalityFactor(personality);
    const personalityStrength = Math.abs(strongestFactor.value);

    if (personality.broken) { throw `Implement broken as archetype.` }

    // Some species have their own dialog trees.
    if (character.getSpeciesName() === 'Kobold') {
      return character.isMale() ? ArchetypeCode.koboldDom : ArchetypeCode.koboldSub;
    }

    // TODO: The 'innocent' archetype needs to look at sexual history, but I
    //   haven't written that component yet. An innocent archetype should also
    //   look at some other factors as well to make sure they're not overly
    //   violent and have few sexual preferences.

    // Aspects have the next highest priority when determining archetype.
    if (aspects[AspectType.prude]) { return ArchetypeCode.prude; }
    if (aspects[AspectType.bimbo]) { return ArchetypeCode.bimbo; }
    if (aspects[AspectType.slut]) { return ArchetypeCode.slut; }

    // TODO: The other sexual preferences will probably also have associated
    //   personality types, at least among the BDSM preferences. A strong
    //   dominant or masochist will need their own personality trees eventually,
    //   though we can probably do without them for now.

    const perv = sexualPreferences.perverted;
    if (perv > 10 && perv > personalityStrength) { return ArchetypeCode.pervert; }
    if (perv < -10 && Math.abs(-1 * perv) > personalityStrength) { return ArchetypeCode.prude; }

    // A violent person will be more serious, unless they're unkind enough to
    // be heartless.
    if (personality.violent > 20) {
      return (personality.kind < -10) ? ArchetypeCode.heartless : ArchetypeCode.serious;
    }

    // A very passive person will usually use a different factor to determine
    // their personality archetype, unless they're also excitable, in which
    // case they have the timid archetype.
    if (personality.violent < -20 && personality.calm < -10) { return ArchetypeCode.timid; }

    // If they're overly excitable, they'll either be playful or a brat.
    if (personality.calm < -20) {
      return (personality.kind > 0) ? ArchetypeCode.playful : ArchetypeCode.brat;
    }

    // If we don't have an archetype for them at this point, we can use their
    // kindness factor to choose between nice/sweet and bastard/bitch.
    if (personality.kind > 20) {
      return (actor.gender === Gender.male) ? ArchetypeCode.nice : ArchetypeCode.sweet;
    }
    if (personality.kind < -20) {
      return (actor.gender === Gender.male) ? ArchetypeCode.bastard : ArchetypeCode.bitch;
    }

    // Finally, a character with no strong personality factors in any direction
    // indicates that this person is rather unemotional and stoic.
    return ArchetypeCode.reserved;
  }

  function strongestPersonalityFactor(personality) {
    let strongestCode = 'none';
    let strongestValue = 0;

    ['calm','kind','violent'].forEach(code => {
      if (Math.abs(personality[code]) > strongestValue) {
        strongestCode = code;
        strongestValue = Math.abs(personality[code]);
      }
    });

    return { code:strongestCode, value:personality[strongestCode] };
  }

  return Object.freeze({
    register,
    lookup,
    assignArchetype,
  });

})();
