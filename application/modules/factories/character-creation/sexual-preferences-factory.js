global.SexualPreferencesFactory = (function() {

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
      if (code === 'male-dominated')   { applyDominated(sexualPreferences, context.actor, Gender.male);   }
      if (code === 'female-dominated') { applyDominated(sexualPreferences, context.actor, Gender.female); }
      if (code === 'futa-dominated')   { applyDominated(sexualPreferences, context.actor, Gender.futa);   }
      if (speciesPrefs[code].chance && Random.roll(100) < speciesPrefs[code].chance) {
        sexualPreferences[code] = (Random.roll(20)-10) + speciesPrefs[code].strength;
      }
    });
  }

  function applyArchetypePreferences(sexualPreferences, context) {
    const archetype = Archetype.lookup(context.actor.archetype);
    const archetypePrefs = archetype.getSexualPreferences() || {};

    Object.keys(archetypePrefs).forEach(code => {
      addPreferences(sexualPreferences, code, archetypePrefs[code]);
    });

    // TODO: Archetypes with special handling:
    // innocent
    // prude
    // pervert - Probably best to pick some strange fetishes based on their body and sexuality and work backwards
    //   adding preferences that would be logical requirements.
  }

  // Every sexual preference in the archetype will either be a family of sexual preferences or a specific preference.
  function addPreferences(sexualPreferences, code, options) {
    const topPreferences = ['dominant','sadistic','debaser'];
    const bottomPreferences = ['submissive','masochistic','humiliation-slut'];
    const selfRoughPreferences = ['breath-player','gape-queen','prolapse-queen','punching-bag','rope-bunny','size-queen'];
    const otherRoughPreferences = ['choker','pisser','pugilist','rigger','stretcher'];
    const humiliatingPreferences = ['cum-dump','enemas','piss-slut','masturbator','sex-toy-lover'];
    const slutPreferences = ['anal-slut','breast-slut','cervix-slut','cock-slut','oral-slut','pussy-slut','urethra-slut'];
    const otherPartsPreferences = ['ass-lover','cock-lover','pussy-lover','breast-lover'];

    switch(code) {
      case 'top':         addPreferenceFamily(sexualPreferences, topPreferences, options); break;
      case 'bottom':      addPreferenceFamily(sexualPreferences, bottomPreferences, options); break;
      case 'self-rough':  addPreferenceFamily(sexualPreferences, selfRoughPreferences, options); break;
      case 'other-rough': addPreferenceFamily(sexualPreferences, otherRoughPreferences, options); break;
      case 'humiliating': addPreferenceFamily(sexualPreferences, humiliatingPreferences, options); break;
      case 'slut':        addPreferenceFamily(sexualPreferences, slutPreferences, options); break;
      case 'other-parts': addPreferenceFamily(sexualPreferences, otherPartsPreferences, options); break;
      default:            addPreferenceFamily(sexualPreferences, [code], options);
    }

    if (code === 'top') { removePreferenceFamily(sexualPreferences, bottomPreferences); }
    if (code === 'bottom') { removePreferenceFamily(sexualPreferences, topPreferences); }
  }

  // When adding preferences for other's parts (cock-lover, etc.) We need to check the character's sexuality.
  function addPreferenceFamily(sexualPreferences, family, options) {
    console.log("WIP: add from", family, options);
  }

  function removePreferenceFamily(sexualPreferences, family) {
    console.log("WIP: remove from", family);
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
    });
  }

  // When applying these sexual preferences, we roll against each preference,
  // which should give most characters several of these preferences.
  function applyDominated(preferences, actor, dominantGender) {
    const domRequires = ['dominant','sadistic','debaser'];
    const subRequires = ['submissive','masochistic','humiliation-slut'];
    const domPrefs = {
      'dominant':50,
      'sadistic':40,
      'debaser':40,
      'rigger': 30,
      'choker': 20,
      'pisser': 20,
      'pugilist': 20
    };
    const subPrefs = {
      'submissive':50,
      'masochistic':40,
      'humiliation-slut':40,
      'rope-bunny': 30,
      'breath-player': 20,
      'piss-slut': 20,
      'punching-bag': 20
    };

    if (actor.gender === dominantGender) {
      Object.keys(domPrefs).forEach(key => {
        if (Random.roll(100) < domPrefs[key]) {
          preferences[key] = (preferences[key]||0) + Random.between(10,30);
        }
      });
      return alsoInclude(preferences, domRequires);
    }

    // In a male or female dominated society the non-binary and futanari are a
    // little less likely to be as submissive as the males or females.
    if ([Gender.futa, Gender.enby].includes(actor.gender)) {
      Object.keys(subPrefs).forEach(key => {
        if (Random.roll(100) < (subPrefs[key]/1.5)) {
          preferences[key] = (preferences[key]||0) + Random.between(10,20);
        }
      });
      return alsoInclude(preferences, subRequires);
    }

    Object.keys(subPrefs).forEach(key => {
      if (Random.roll(100) < subPrefs[key]) {
        preferences[key] = (preferences[key]||0) + Random.between(10,30);
      }
    });
    alsoInclude(preferences, subRequires);
  }

  // We need to make sure that at least one of these preferences is included.
  function alsoInclude(preferences, requires) {
    if (Object.keys(ObjectHelper.filter(preferences, requires)).length === 0) {
      preferences[Random.from(requires)] = Random.between(10,30);
    }
  }










  /*

Consider moving these?

  // The slut trigger is fairly common. Rather than specifying anything specific it randomly adds 2 - 8 sexual
  // preferences. More common preferences will be picked more frequently. The function also increases the strength of
  // the androphile and gynophile preferences when they are already positive.
  function applySlut(preferences, options) {
    let count = Random.between(2,8);

    if (preferences.gynophilic > 0) {
      preferences.gynophilic += Random.roll(20); }
    if (preferences.androphilic > 0) {
      preferences.androphilic += Random.roll(20); }

    const sluttyPreferences =  {
      'sensitive': 30,
      'exhibitionist': 30,
      'masturbator': 30,
      'perverted': 20,
      'sex-toy-lover': 20,
      'ass-lover': 15,
      'anal-slut': 10,
      'oral-slut': 10,
      'beast-lover': 10,
      'submissive': 10,
      'masochistic': 10,
      'affection-slut': 10,
      'humiliation-slut': 10,
      'rope-bunny': 5,
    };

    if (options.breasts) {
      sluttyPreferences['breast-slut'] = 20;
    }
    if (options.pussy) {
      sluttyPreferences['pussy-slut'] = 30;
      sluttyPreferences['breeder'] = 10;
    }
    if (options.cock) {
      sluttyPreferences['cock-slut'] = 30;
    }
    if (preferences.androphilic > 0) {
      sluttyPreferences['cock-lover'] = 15;
      sluttyPreferences['cum-dump'] = 10;
    }
    if (preferences.gynophilic > 0) {
      sluttyPreferences['breast-lover'] = 15;
      sluttyPreferences['pussy-lover'] = 15;
    }

    while (count > 0) {
      const key = Random.fromFrequencyMap(sluttyPreferences);
      const strength = Random.between(10,40);

      if (preferences['affection-slut'] > 0 && key === 'humiliation-slut') { continue; }
      if (preferences['humiliation-slut'] > 0 && key === 'affection-slut') { continue; }

      if (preferences[key]) {
        const adjust = Math.floor(strength/2);
        Console.log(`Bimbo/Slut adds ${adjust} to ${key}[${preferences[key]}]`,{ system:'SexualPreferenceFactory', level:3 });
        preferences[key] += adjust;
        count -= 1;
      }
      else if (preferences[key] == null) {
        Console.log(`Bimbo/Slut adds ${key}[${strength}]`,{ system:'SexualPreferenceFactory', level:3 });
        preferences[key] = strength;
        count -= 1;
      }
    }
  }

  // The applyVirgin() function does the opposite of applySlut() by removing what positive sexual preferences it can
  // and lowering the positive gender sexualities by half.
  //
  // TODO: Eventually we might have systems that track other virgin properties, first kiss, hymen intact, all that
  //       shit. Right now none of that exists, so applyVirgin() is really more of an "applyChaste()" but this will
  //       need to be updated if we ever do any of that.
  //
  function applyVirgin(preferences) {
    const retained = ['gynophilic','androphilic'];

    if (preferences.gynophilic > 0) {
      preferences.gynophilic = Math.ceil(preferences.gynophilic/2); }
    if (preferences.androphilic > 0) {
      preferences.androphilic = Math.ceil(preferences.androphilic/2); }

    Object.keys(preferences).forEach(key => {
      if (retained.includes(key) === false && preferences[key] > 0) {
        Console.log(`Virgin removes ${key}`,{ system:'SexualPreferenceFactory', level:3 });
        delete preferences[key];
      }
    });
  }

  */


  return Object.freeze({ makeAdjustments });

})();
