global.NameBuilder = (function() {

  const $categories = {
    Demon:  { first:{ male:[], female:[] }},
    Elf:    { first:{ male:[], female:[] }},
    Goblin: { first:{ male:[], female:[] }},
    Kobold: { first:{ male:[], female:[] }},
    Rat:    { first:{ male:[], female:[] }},
  };

  function addNames(nameList, listOptions) {
    const category = $categories[listOptions.category];

    if (listOptions.position === 'last') {
      category.last = nameList;
      return;
    }

    if (listOptions.gender === 'any') {
      category.first.male = category.first.male.concat(nameList);
      category.first.female = category.first.female.concat(nameList);
      return;
    }

    category.first[listOptions.gender] = category.first[listOptions.gender].concat(nameList);
  }

  function getRandom(options) {
    Validate.exists('Category',options.category);
    Validate.exists('Gender',options.gender);

    const name = { first:'', last:'' };
    const category = $categories[options.category];
    const gender = (options.gender === Gender.futa) ? Gender.female : options.gender;

    while (true) {
      name.first = Random.from(category.first[gender]);
      name.last = Random.from(category.last);

      if (isValid(name, gender)) { return name; }
    }
  }

  // TODO: This will need to check against other character attributes such as
  //       species, once species is a thing that might exist. This only really
  //       counts for the 'elf' names that could also be used on furred or
  //       scaled species. We'll need to pass species as one of the getRandom()
  //       options and pick the category based on the species.
  //
  // TODO: Because we're getting both first and last names here now we will
  //       want to make sure that the names agree with each other. They can't
  //       have aspects that are mutually exclusive. Aspects need to be
  //       finished first though.
  //
  function isValid(name, gender) {
    if (name.last) {
      if (validGender(name.last, gender) === false) { return false; }
    }

    return true;
  }

  // Only the last names should have gender restrictions. First names should be
  // sorted into their gender specific files.
  function validGender(name, options) {
    if (name.restriction) {
      if (name.restriction === NameRestriction.male) { return options.gender === Gender.male; }
      if (name.restriction === NameRestriction.female) { return options.gender === Gender.female; }
      if (name.restriction === NameRestriction.notMale) { return options.gender !== Gender.male; }
      if (name.restriction === NameRestriction.notFemale) { return options.gender !== Gender.female; }
    }
    return true;
  }

  return Object.freeze({
    addNames,
    getRandom,
  });

})();