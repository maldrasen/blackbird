global.SexualPreferencesFactory = (function() {

  const PreferenceFamilies = {
    'top':['dominant','sadistic','debaser'],
    'bottom':['submissive','masochistic','humiliation-slut'],
    'self-rough':['breath-player','gape-queen','rope-bunny','size-queen'],
    'other-rough':['choker','pisser','pugilist','rigger','stretcher'],
    'humiliating':['cum-dump','piss-slut','masturbator','sex-toy-lover'],
    'slut':['anal-slut','breast-slut','cock-slut','oral-slut','pussy-slut'],
    'other-parts':['ass-lover','cock-lover','pussy-lover','breast-lover']};

  function makeAdjustments(sexualPreferences, context, triggers) {
    applyTriggers(sexualPreferences, context, triggers);
    applySpeciesPreferences(sexualPreferences, context);
    applyArchetypePreferences(sexualPreferences, context);
    removeIncorrectPreferences(sexualPreferences, context);
  }

  // We add the preferences specified by the triggers with +/- 10 to the specified value.
  function applyTriggers(sexualPreferences, context, triggers) {
    [...triggers].forEach(trigger => {
      const match = trigger.match(/([a-zA-Z-]+)\[(-?\d+)]/);
      if (match) {

        // TODO: Seems like a bad idea to hard code this list when we will be
        //  adding more species that have their own unique archetypes.
        if (['kobold','vermen'].includes(context.actor.species)) {
          throw `Character Rejected: ${trigger} can't be applied to a ${context.actor.species}`;
        }

        sexualPreferences[SexualPreference.lookup(match[1]).getCode()] = parseInt(match[2]) - 10 + Random.roll(20);
        Console.log(`Applied ${trigger}`,{ system:'SexualPreferencesFactory', level:3 });
        ArrayHelper.remove(triggers,trigger);
      }
    });
  }

  // Most species (but not humans) have a few species level sexual preferences. Species preferences need to be added
  // before the archetype preferences to properly remove most sexual preferences from innocents.
  function applySpeciesPreferences(sexualPreferences, context) {
    const speciesPrefs = Species.lookup(context.actor.species).getSexualPreferences() || {};

    Object.keys(speciesPrefs).forEach(code => {
      if (speciesPrefs[code].chance && Random.roll(100) < speciesPrefs[code].chance) {
        sexualPreferences[code] = (Random.roll(20)-10) + speciesPrefs[code].strength;
      }
    });
  }

  // TODO: Clearly some of these archetypes should also include negative
  //  preferences. I'll start adding them after the special handling.
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
      throw `Seems like a bad idea to require more preferences than there are in the family.`
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
  function removeIncorrectPreferences(sexualPreferences, context) {
    Object.keys(sexualPreferences).forEach(code => {
      const preference = SexualPreference.lookup(code);
      const senses = context.sensitivities;

      if (preference.getRequires() === 'breasts' && senses.breasts == null) { delete sexualPreferences[code]; }
      if (preference.getRequires() === 'cock' && senses.cock == null) { delete sexualPreferences[code]; }
      if (preference.getRequires() === 'pussy' && senses.pussy == null) { delete sexualPreferences[code]; }
      if (preference.getRequires() === 'erogenousCervix' && senses.cervix == null) { delete sexualPreferences[code]; }
      if (preference.getRequires() === 'erogenousUrethra' && senses.urethra == null) { delete sexualPreferences[code]; }

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
      if (preferences[code] > 100) { preferences.code = 100; }
    }
  }

  return Object.freeze({ makeAdjustments });

})();
