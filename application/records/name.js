global.Name = (function() {

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
  // until we find unique character name.
  function getRandom(genderCode, speciesCode) {
    let list = $nameData.name.female;

    if (genderCode === Gender.male) { list = $nameData.name.male; }
    if (genderCode === Gender.enby) { list = Random.roll(10) < 5 ? $nameData.name.male : $nameData.name.female }


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

  return Object.freeze({
    register,
    getRandom,
    isUnique,
  });

})();