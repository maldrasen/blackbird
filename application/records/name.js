global.Name = (function() {

  const nameData = {
    title: {},
    name: {},
    surname: {},
  };

  // If gender is set to none (as is the case for some titles) then the name is added to both lists.
  function register(type, gender, names) {
    if (gender !== Gender.none) {
      return nameData[type][gender] = names;
    }
    nameData[type][Gender.male] = nameData[type][Gender.male].concat(names);
    nameData[type][Gender.female] = nameData[type][Gender.female].concat(names);
  }

  // Get a random name from the normal name lists based on the character's gender. (Some species, demonic entities and
  // such, will have unique name lists to pull from.) Futa characters will pull from the feminine list. Once we decide
  // which name list to use we enter a while loop, picking names randomly until we find unique character name.
  function getRandom(genderCode, speciesCode) {
    if (genderCode == null || genderCode === Gender.none) { throw new Error(`A character needs a gender.`) }

    const list = (genderCode === Gender.male) ? nameData.name.male : nameData.name.female;

    while(true) {
      let names = {
        name: Random.from(list),
      };

      // Because I want character names to be unique, if we find a name that's already in use I give the character a
      // title or a surname. Surnames are more common than titles, and titles are mostly negative.
      if (!isUnique(names) || Random.roll(10) === 0) {
        Random.roll(30) === 0 ?
            names.title = getRandomTitle(genderCode):
            names.surname = getRandomSurname(genderCode);
      }

      // Adding a title or surname could still produce a non-unique name.
      if (isUnique(names)) {
        return names;
      }
    }
  }

  // Titles registered with no gender appear in both lists, so the set drops the duplicates.
  function getFutaTitles() { return [...new Set([...nameData.title.male, ...nameData.title.female])]; }

  function getRandomTitle(genderCode) {
    switch (genderCode) {
      case Gender.male: return Random.from(nameData.title.male);
      case Gender.female: return Random.from(nameData.title.female);
      case Gender.futa: return Random.from(getFutaTitles());
    }
  }

  function getRandomSurname(genderCode) {
    return (genderCode === Gender.male) ? Random.from(nameData.surname.male) : Random.from(nameData.surname.female);
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

  return {
    register,
    getRandom,
    isUnique,
  };

})();