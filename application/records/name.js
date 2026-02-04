global.Name = (function() {

  // In addition to the obvious 'name' value, a name can trigger changes to the character as it's being built. Triggers
  // can change attributes, change body parts, add sexual preferences, and trigger other changes. In this version of
  // the game most characters have a single name. A character might also randomly have a title or a surname. Titles
  // should all have triggers.
  //
  // Attribute triggers (Each +/- 10 per level or 10 by default):
  //    strong / weak
  //    skillful / clumsy
  //    healthy / sickly
  //    smart / stupid
  //    ugly / beautiful
  //
  // Personality Triggers
  //    calm
  //    kind
  //
  // Body Triggers:
  //    tall / short (by factor for species)
  //    red-hair (or fur/scales)
  //    white-hair (or fur/scales)
  //    pink-hair (or fur/scales)
  //    purple-hair (or fur/scales)
  //    dark-skin (or fur/scales)
  //    light-skin (or fur/scales)
  //    big-cock (1 size up to at least big size)
  //    big-balls (1 size up to at least big size)
  //    dog-cock (if would be normal)
  //    dog-pussy (if would be normal)
  //    horse-cock (if would be normal)
  //    horse-pussy (if would be normal)
  //    horse-anus (if would be normal)
  //    two-cocks (if would be single)
  //    three-cocks (if would be single)
  //    huge-cock (2 sizes up to at least huge size)
  //    huge-balls (2 sizes up to at least huge size)
  //    flat-chest (set size to 0)
  //    small-tits (1 size down to at most small)
  //    big-tits (1 size up to at least big size)
  //    huge-tits (2 sizes up to at least huge size)
  //    cow-tits (teat nipples)
  //    milky (add lactation)
  //
  // Preference Trigger:
  //    (preferenceCode)[value]
  //
  // Aspect Triggers:
  //    (aspectCode):(1-5 optional)
  //
  // Other Triggers:
  //    magical: Adds a mana component and starting spells
  //    virgin: Ensure virginity, lack of sexual experience
  //    slut: Has had a lot of sexual experience / multiple partners

  const $nameData = {
    title: {},
    name: {},
    surname: {},
  };

  function register(type, gender, names) {
    if (gender !== Gender.enby) {
      return $nameData[type][gender] = names;
    }
    $nameData[type][Gender.male] = $nameData[type][Gender.male].concat(names);
    $nameData[type][Gender.female] = $nameData[type][Gender.female].concat(names);
  }

  // Get a random name from the normal name lists based on the character's gender. (Some species, demonic entities and
  // such, will have unique name lists to pull from.) Futa characters will pull from the feminine list, enby characters
  // will randomly pick one to use. Once we decide which name list to use we enter a while loop, picking names randomly
  // until we find an appropriate name. (Names might not work if there are conflicting triggers, e.g. if we trigger
  // horse-cock on a lupin, we try again because we don't want to change from a dog cock.)
  //
  // Components should include all the character components that have been built so far.
  //
  function getRandom(genderCode, speciesCode) {
    let list = $nameData.name.female;

    if (genderCode === Gender.male) { list = $nameData.name.male; }
    if (genderCode === Gender.enby) { list = Random.roll(10) < 5 ? $nameData.name.male : $nameData.name.female }


    while(true) {
      let names = {
        name: Random.from(list),
      };

      // Because I want character names to be unique, if we find a name that's already in use I give the character a
      // title or surname. Ten percent of characters will also randomly receive titles and surnames.
      if (!isUnique(names) || Random.roll(100) < 10) {
        let roll = Random.roll(10);
        if (roll < 4) {
          names.title = getRandomTitle(genderCode);
        }
        if (roll >= 4 && roll < 8) {
          names.surname = getRandomSurname(genderCode);
        }
        if (roll >= 8) {
          names.title = getRandomTitle(genderCode);
          names.surname = getRandomSurname(genderCode);
        }
      }

      // Adding a title or surname could still produce a non-unique name. If so just try again.
      if (isUnique(names) && isValid(names, genderCode, speciesCode)) {
        return names;
      }
    }
  }

  function getRandomTitle(genderCode) {
    let list = $nameData.title.female;
    if (genderCode === Gender.male) { list = $nameData.title.male; }
    if (genderCode === Gender.enby) { list = Random.roll(10) < 5 ? $nameData.title.male : $nameData.title.female }
    return Random.from(list);
  }

  function getRandomSurname(genderCode) {
    let list = $nameData.surname.female;
    if (genderCode === Gender.male) { list = $nameData.surname.male; }
    if (genderCode === Gender.enby) { list = Random.roll(10) < 5 ? $nameData.surname.male : $nameData.surname.female }
    return Random.from(list);
  }

  // names = {name:{name}, title:{name}, surname:{name}}
  function isUnique(names) {
    return Registry.findComponentsWith(ComponentType.actor, actor => {
      let same = actor.name === names.name.name;
      if (names.title && actor.title !== names.title.name) { same = false; }
      if (names.surname && actor.surname !== names.surname.name) { same = false; }
      return same;
    }).length === 0;
  }

  function isValid(names, genderCode, speciesCode) {
    // console.log("=== Check Name Validity ===");
    // console.log(genderCode, speciesCode);
    // console.log(names);
    return true;
  }

  return Object.freeze({
    register,

    getRandom,

    isUnique,
    isValid,
  });

})();