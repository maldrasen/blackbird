
// This map is just a placeholder for now, when calling this from within a live game I think we'll always know both a
// character's gender and species. Once we have more well defined characters and monsters we should remove this.
const SpeciesFrequency = {
  elf:10, equian:10, havlin:10, human:10, kobold:10, lupin:10, nymph:10, sylph:10, vermen:10,
};

// The working state for a single character build. The character factory creates a fresh state for every build
// attempt, the sub factories read from it and write their component data blocks back into it, and once every block
// is built and correct the factory assembles the character's components from the state.
global.CharacterFactoryState = function(options={}) {

  const speciesCode = options.species || Random.fromFrequencyMap(SpeciesFrequency);
  const species = Species.lookup(speciesCode);
  const genderCode = options.gender || Random.fromFrequencyMap(species.getGenderRatio());
  const biologicalSex = getBiologicalSex(species, genderCode);

  const actorData = { gender:genderCode, species:speciesCode };
  if (options.name) { actorData.name = options.name; }
  if (options.title) { actorData.title = options.title; }
  if (options.surname) { actorData.surname = options.surname; }

  // It's very important for triggers to be cloned from the options here. The factory might add incompatible triggers
  // that cause the character to be rejected. A rejected character is retried with a fresh state built from the
  // original options, so the original triggers array must never be changed.
  let triggers = [...options.triggers||[]];

  const blocks = {
    body: null,
    anus: null,
    mouth: null,
    pussy: null,
    cock: null,
    breasts: null,
    aspects: null,
    attributes: null,
    health: null,
    personality: null,
    sensitivities: null,
    skills: null,
    sexualPreferences: null,
    sexualHistory: null,
  };

  function getBlock(name) {
    return blocks[name] == null ? null : structuredClone(blocks[name]);
  }

  function setBlock(name, data) {
    if (data == null && ['pussy','cock','breasts'].includes(name) === false) {
      throw new Error(`The ${name} data cannot be set to null.`);
    }
    blocks[name] = data;
  }

  function setBlockValue(name, key, value) {
    if (blocks[name] == null) { throw new Error(`Cannot set ${key} before the ${name} data has been built.`); }
    blocks[name][key] = value;
  }

  // === Triggers ======================================================================================================

  function addTriggers(codes) { triggers.push(...codes); }
  function hasTrigger(code) { return triggers.includes(code); }
  function removeTrigger(code) { ArrayHelper.remove(triggers, code); }

  // Remove the trigger if it's present, reporting if it was. Note that the trigger is removed whether or not the
  // caller can actually apply it. Triggers for a body part a character doesn't have still need to be consumed.
  function takeTrigger(code) {
    if (hasTrigger(code) === false) { return false; }
    removeTrigger(code);
    return true;
  }

  // Two names can add the same trigger, so the factory dedupes them once the names have been built.
  function dedupeTriggers() { triggers = [...new Set(triggers)]; }

  // === Part Predicates ===============================================================================================

  function shouldHavePussy() { return [Gender.futa, Gender.female].includes(biologicalSex); }
  function shouldHaveCock() { return [Gender.futa, Gender.male].includes(biologicalSex); }
  function shouldHaveBreasts() { return Boolean(species.getBody().breasts) && [Gender.futa, Gender.female].includes(biologicalSex); }

  // These predicates mirror the ones on Character(), so that requirements can be checked against a character mid-build.
  function isMale() { return genderCode === Gender.male; }
  function hasBreasts() { return blocks.breasts != null; }
  function hasNormalCock() { return blocks.cock != null && blocks.cock.placement === 'normal'; }
  function hasNormalPussy() { return blocks.pussy != null && blocks.pussy.placement === 'normal'; }
  function getSensitivity(code) { return (blocks.sensitivities||{})[code]; }
  function hasSensitivity(code) { return getSensitivity(code) != null; }

  // If a character is non-binary I still need to know their biological sex to build their various naughty bits. This
  // value needs to be randomly chosen from the species gender ratio map with the enby option removed. Non-binary
  // Kobolds and Vermens however are always biologically male.
  function getBiologicalSex(species, gender) {
    if (gender !== Gender.enby) { return gender; }

    if ([SpeciesCode.kobold,SpeciesCode.vermen].includes(species.getCode())) {
      return Gender.male;
    }

    const ratios = species.getGenderRatio();
    return Random.fromFrequencyMap({
      male: ratios.male,
      female: ratios.female,
      futa: ratios.futa,
    });
  }

  return Object.freeze({
    getSpeciesCode: () => { return speciesCode; },
    getSpecies: () => { return species; },
    getGender: () => { return genderCode; },
    getBiologicalSex: () => { return biologicalSex; },
    getArchetypes: () => { return options.archetypes ? { ...options.archetypes } : null; },
    getSexuality: () => { return options.sexuality; },
    getDefaultSkills: () => { return options.skills ? { ...options.skills } : null; },

    getActor: () => { return { ...actorData }; },
    getName: () => { return actorData.name; },
    setActorData: (key, value) => { actorData[key] = value; },

    getTriggers: () => { return [...triggers]; },
    addTrigger: (code) => { triggers.push(code); },
    addTriggers,
    hasTrigger,
    removeTrigger,
    takeTrigger,
    dedupeTriggers,

    getBody: () => { return getBlock('body'); },
    setBody: (data) => { setBlock('body', data); },
    setBodyData: (key, value) => { setBlockValue('body', key, value); },

    getAnus: () => { return getBlock('anus'); },
    setAnus: (data) => { setBlock('anus', data); },
    setAnusData: (key, value) => { setBlockValue('anus', key, value); },

    getMouth: () => { return getBlock('mouth'); },
    setMouth: (data) => { setBlock('mouth', data); },
    setMouthData: (key, value) => { setBlockValue('mouth', key, value); },

    getPussy: () => { return getBlock('pussy'); },
    setPussy: (data) => { setBlock('pussy', data); },
    setPussyData: (key, value) => { setBlockValue('pussy', key, value); },

    getCock: () => { return getBlock('cock'); },
    setCock: (data) => { setBlock('cock', data); },
    setCockData: (key, value) => { setBlockValue('cock', key, value); },

    getBreasts: () => { return getBlock('breasts'); },
    setBreasts: (data) => { setBlock('breasts', data); },
    setBreastsData: (key, value) => { setBlockValue('breasts', key, value); },

    getAspects: () => { return getBlock('aspects'); },
    setAspects: (data) => { setBlock('aspects', data); },

    getAttributes: () => { return getBlock('attributes'); },
    setAttributes: (data) => { setBlock('attributes', data); },

    getHealth: () => { return getBlock('health'); },
    setHealth: (data) => { setBlock('health', data); },

    getPersonality: () => { return getBlock('personality'); },
    setPersonality: (data) => { setBlock('personality', data); },

    getSensitivities: () => { return getBlock('sensitivities'); },
    setSensitivities: (data) => { setBlock('sensitivities', data); },

    getSkills: () => { return getBlock('skills'); },
    setSkills: (data) => { setBlock('skills', data); },

    getSexualPreferences: () => { return getBlock('sexualPreferences'); },
    setSexualPreferences: (data) => { setBlock('sexualPreferences', data); },
    setSexualPreferenceData: (key, value) => { setBlockValue('sexualPreferences', key, value); },
    removeSexualPreference: (key) => { delete (blocks.sexualPreferences||{})[key]; },

    getSexualHistory: () => { return getBlock('sexualHistory'); },
    setSexualHistory: (data) => { setBlock('sexualHistory', data); },

    shouldHavePussy,
    shouldHaveCock,
    shouldHaveBreasts,
    isMale,
    hasBreasts,
    hasNormalCock,
    hasNormalPussy,
    getSensitivity,
    hasSensitivity,
  });

}
