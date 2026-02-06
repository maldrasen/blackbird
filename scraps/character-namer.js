global.CharacterNamer = (function() {

  async function execute(character) {
    if (character.id == null) { throw 'Character must be persisted.'; }
    if (character.firstName) { return []; }

    let names = await selectNames(0, character, (character.species.nameGenerator || ElfNameGenerator));

    await character.update(nameMap(names));
    return allAdjustments(names);
  }

  async function selectNames(failureCount, character, nameGenerator) {
    const names = await nameGenerator.getNames(character);
    const problem = await validate(character, names);

    if (problem == null) {
      return names;
    }

    if (failureCount++ < 10) {
      warningMessage(names, problem);
      return selectNames(failureCount, character, nameGenerator)
    }
  }

  // Print a warning to the log if we're in debug mode.
  function warningMessage(names, invalid) {
    let p = (name) => { return (name == null) ? '' : name.name; }
    log(`(Warning) Rejected Name ${p(names.pre)} ${p(names.first)} ${p(names.last)} > ${invalid}`)
  }

  // Check to see if a name is valid for this character. This promise should
  // reject on an invalid name.
  async function validate(character, names) {
    if ((await Character.findOne({ where:nameMap(names) })) != null) {
      return "Name is not unique";
    }

    const context = new Context();
    await context.addCharacter('C',character);

    if (await check(names.pre, context) == false) { return `Name (${names.pre.name}) requires ${names.pre.requires}.` }
    if (await check(names.first, context) == false) { return `Name (${names.first.name}) requires ${names.first.requires}.` }
    if (await check(names.last, context) == false) { return `Name (${names.last.name}) requires ${names.last.requires}.` }
  }

  async function check(name, context) {
    if (name == null || name.requires == null) { return true }
    return await CentralScrutinizer.meetsRequirements(name.requires, context);
  }

  function nameMap(names) {
    let map = {};
    if (names.pre != null)   { map.preName =   names.pre.name;   }
    if (names.first != null) { map.firstName = names.first.name; }
    if (names.last != null)  { map.lastName =  names.last.name;  }
    return map;
  }

  function allAdjustments(names) {
    const adjustments = [];
    ArrayUtility.addAll(adjustments, (names.pre  ||{}).adjustments);
    ArrayUtility.addAll(adjustments, (names.first||{}).adjustments);
    ArrayUtility.addAll(adjustments, (names.last ||{}).adjustments);
    return adjustments;
  }

  return { execute };

})();
