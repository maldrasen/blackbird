global.SexualPreferencesFactory = (function() {

  const PreferenceFamilies = {
    'top':['dominant','sadistic','debaser'],
    'bottom':['submissive','masochistic','humiliation-slut'],
    'self-rough':['breath-player','gape-queen','rope-bunny','size-queen'],
    'other-rough':['choker','pisser','pugilist','rigger','stretcher'],
    'humiliating':['cum-dump','piss-slut','masturbator','sex-toy-lover'],
    'slut':['anal-slut','breast-slut','cock-slut','oral-slut','pussy-slut'],
    'other-parts':['ass-lover','cock-lover','pussy-lover','breast-lover']};

  function makeAdjustments() {
    const state = CharacterFactory.getState();
    const sexualPreferences = state.getSexualPreferences();
    const context = {
      actor: state.getActor(),
      personality: state.getPersonality(),
      sensitivities: state.getSensitivities(),
    };

    applyTriggers(sexualPreferences, state);
    applySpeciesPreferences(sexualPreferences, context);
    applyArchetypePreferences(sexualPreferences, context);
    removeIncorrectPreferences(sexualPreferences);

    state.setSexualPreferences(sexualPreferences);
  }

  function applyTriggers(sexualPreferences, state) {
    state.getTriggers().forEach(trigger => {
      const match = trigger.match(/([a-zA-Z-]+)\[(-?\d+)]/);
      if (match) {
        sexualPreferences[SexualPreference.lookup(match[1]).getCode()] = parseInt(match[2]) - 10 + Random.roll(20);
        Console.log(`Applied ${trigger}`,{ system:'SexualPreferencesFactory', level:3 });
        state.removeTrigger(trigger);
      }
    });
  }

  // Most species have a few species level sexual preferences. Species preferences need to be added before the
  // archetype preferences to properly remove most sexual preferences from innocents.
  function applySpeciesPreferences(sexualPreferences, context) {
    const speciesPrefs = Species.lookup(context.actor.species).getSexualPreferences() || {};

    Object.keys(speciesPrefs).forEach(code => {
      const pref = speciesPrefs[code];
      if (pref.genders && pref.genders.includes(context.actor.gender) === false) { return; }
      if (pref.chance && Random.roll(100) < pref.chance) { sexualPreferences[code] = rollStrength(pref.strength); }
    });
  }

  // Strength can be a scalar (∓10) or a [min,max] array to allow for a wider range of values.
  function rollStrength(strength) {
    if (Array.isArray(strength)) { return Random.between(strength[0], strength[1]); }
    return (Random.roll(20)-10) + strength;
  }

  function applyArchetypePreferences(sexualPreferences, context) {
    const archetype = Archetype.lookup(context.personality.archetype);
    const archetypePreferences = archetype.getSexualPreferences() || {};

    Object.keys(archetypePreferences).forEach(code => {
      addPreferences(sexualPreferences, code, archetypePreferences[code]);
    });

    if (['innocent','prude'].includes(archetype.getCode())) {
      reducePreference(sexualPreferences, 'gynophilic');
      reducePreference(sexualPreferences, 'androphilic');

      Object.keys(sexualPreferences).forEach(code => {
        if (['gynophilic','androphilic'].includes(code) === false) {
          delete sexualPreferences[code];
        }
      });
    }

    if ('pervert' === archetype.getCode()) {
      applyPervert(sexualPreferences, context);
    }
  }

  function reducePreference(prefs, code) {
    if (prefs[code] > 0) { prefs[code] = Math.round((Random.between(20,80)/100) * prefs[code]); }
  }

  // Every sexual preference in the archetype will either be a family of sexual preferences or a specific preference.
  function addPreferences(sexualPreferences, code, options) {
    addPreferenceFamily(sexualPreferences, (PreferenceFamilies[code] || [code]), options);

    if (code === 'top') { removePreferenceFamily(sexualPreferences, PreferenceFamilies.bottom); }
    if (code === 'bottom') { removePreferenceFamily(sexualPreferences, PreferenceFamilies.top); }

    // When a character has a chance of randomly adding preferences for other
    // body parts we also increase their overall gender attractions.
    if (code === 'other-parts') {
      const min = options.strength[0]
      const max = options.strength[1]
      if (sexualPreferences.androphilic > 0) { sexualPreferences.androphilic += Random.between(min,max); }
      if (sexualPreferences.gynophilic > 0) { sexualPreferences.gynophilic += Random.between(min,max); }
    }
  }

  function addPreferenceFamily(sexualPreferences, family, options) {
    if (options.atLeast && options.atLeast > family.length) {
      throw new Error(`Seems like a bad idea to require more preferences than there are in the family.`);
    }

    family.forEach(code => {
      const roll = Random.roll(100)
      if (roll < options.chance) {
        const min = options.strength[0];
        const max = options.strength[1];

        // Adding a preference will add to an existing preference.
        if (sexualPreferences[code] == null) { sexualPreferences[code] = 0; }
        sexualPreferences[code] = Random.between(min,max);
        if (sexualPreferences[code] > 100) { sexualPreferences[code] = 100; }
      }
    });

    const count = family.filter(code => sexualPreferences[code] > 0).length;

    // Sure, just run this until we have at least the required number of the
    // preferences from the family. At least will usually be 1 anyway.
    if (options.atLeast && options.atLeast > count) {
      addPreferenceFamily(sexualPreferences, family, options);
    }
  }

  // Delete the preference if it's positive. This will still leave negative
  // preferences, but that should be okay in this context.
  function removePreferenceFamily(sexualPreferences, family) {
    family.forEach(code => {
      if (sexualPreferences[code] > 0) { delete sexualPreferences[code]; }
    })
  }

  // It's possible that we've added preferences (like cervix-slut) to characters that don't have the matching
  // requirements (like a cervix and the cervix within the sensitivities object). Rather than check every time, we can
  // just remove everything that isn't applicable at the end.
  function removeIncorrectPreferences(sexualPreferences) {
    Object.keys(sexualPreferences).forEach(code => {
      const requires = SexualPreference.lookup(code).getRequires();

      if (CharacterRequirements.met(requires, null) === false) { delete sexualPreferences[code]; }

      // If you don't like men, you don't love cocks, cum and getting pregnant.
      if (sexualPreferences.androphilic < 0) {
        if (code === 'cock-lover') { delete sexualPreferences[code]; }
        if (code === 'cum-dump') { delete sexualPreferences[code]; }
        if (code === 'breeder') { delete sexualPreferences[code]; }
      }
      // If you don't like women, you don't love tits, pussies, and getting women pregnant.
      if (sexualPreferences.gynophilic < 0) {
        if (code === 'breast-lover') { delete sexualPreferences[code]; }
        if (code === 'pussy-lover') { delete sexualPreferences[code]; }
        if (code === 'stud') { delete sexualPreferences[code]; }
      }
    });
  }

  // The applyPervert() function picks at least one perversion 'theme' which includes a 'rare' fetish to give a large
  // bonus to. We also add some associated preferences that could be seen as prerequisites, as well as the perverted
  // preference.
  function applyPervert(preferences, context) {
    const perversions = [];

    // Perverted anal/toilet slut.
    perversions.push({ code:'enemas', includes:[
      'ass-lover','anal-slut','piss-slut','pisser','humiliation-slut']})

    // Perverted pain slut.
    perversions.push({ code:'punching-bag', includes:[
      'masochistic','submissive','breath-player','rope-bunny','anal-slut','oral-slut']});

    // Perverted bucket cunt slut (must have a pussy)
    if(context.sensitivities.pussy > 0) {
      perversions.push({ code:'prolapse-queen', includes:[
        'gape-queen','size-queen','stretcher','pussy-slut','anal-slut','sex-toy-lover','humiliation-slut']});
    }

    // Perverted cock worshiper (must like dick)
    if (preferences.androphilic > 0) {
      perversions.push({ code:'beast-lover', includes:[
        'submissive','breath-player','size-queen','cum-dump','piss-slut','cock-lover','anal-slut','oral-slut']});
    }

    // Apply one of the available perversions.
    const first = Random.from(perversions);
    ArrayHelper.remove(perversions,first);
    applyPerversion(preferences, first);

    // We can rarely add a second for someone who's super perverted.
    if (Random.roll(100) < 33) { applyPerversion(preferences, Random.from(perversions)); }
  }

  function applyPerversion(preferences, perversion) {
    increasePreference(preferences, 'perverted', Random.between(20,40));
    increasePreference(preferences, perversion.code, Random.between(20,40));
    perversion.includes.forEach(code => {
      increasePreference(preferences, code, Random.between(0,20), 80);
    });
  }

  function increasePreference(preferences, code, amount, chance=100) {
    if (Random.roll(100) < chance) {
      if (preferences[code] == null) { preferences[code] = 0; }
      preferences[code] += amount;
      if (preferences[code] > 100) { preferences[code] = 100; }
    }
  }

  return Object.freeze({ makeAdjustments });

})();
