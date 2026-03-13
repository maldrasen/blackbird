global.Character = function(id) {

  function isPlayer() { return id === GameState.getPlayer(); }
  function getName() { return ActorComponent.lookup(id).name; }

  function getFullName() {
    const actor = ActorComponent.lookup(id);
    let name = actor.name;
    if (actor.surname) { name = `${name} ${actor.surname}`; }
    if (actor.title) { name = `${actor.title} ${name}`; }
    return name;
  }

  function getSpeciesName() { return Species.lookup(ActorComponent.lookup(id).species).getName(); }
  function getGenderName() { return GenderName[ActorComponent.lookup(id).gender] }
  function isMale() { return ActorComponent.lookup(id).gender === Gender.male; }
  function isFemale() { return ActorComponent.lookup(id).gender === Gender.female; }
  function isFuta() { return ActorComponent.lookup(id).gender === Gender.futa; }
  function isEnby() { return ActorComponent.lookup(id).gender === Gender.enby; }

  // ==============
  //   Attributes
  // ==============

  // The attribute functions take either an entity id (which would be a string) or a raw attribute value (a number)
  function compareAttributes(arg, attribute) {
    const other = (typeof arg === 'string') ? AttributesComponent.lookup(arg)[attribute] : arg;
    return AttributesComponent.lookup(id)[attribute] > other;
  }

  function isFasterThan(value) { return compareAttributes(value, Attrib.dexterity); }
  function isPrettierThan(value) { return compareAttributes(value, Attrib.beauty); }
  function isSmarterThan(value) { return compareAttributes(value, Attrib.intelligence); }
  function isStrongerThan(value) { return compareAttributes(value, Attrib.strength); }
  function isTougherThan(value) { return compareAttributes(value, Attrib.vitality); }

  // ===============
  //   Body Values
  // ===============

  // These functions take an optional threshold because it's usually not interesting if a person is only a single
  // millimeter taller or shorter than another.
  function isTallerThan(other, threshold=0) {
    const thisBody = BodyComponent.lookup(id);
    const otherBody = BodyComponent.lookup(other);
    return thisBody.height > otherBody.height + threshold;
  }
  function isShorterThan(other, threshold=0) {
    const thisBody = BodyComponent.lookup(id);
    const otherBody = BodyComponent.lookup(other);
    return thisBody.height + threshold < otherBody.height;
  }

  function hasBreasts() { return BreastsComponent.lookup(id) != null; }
  function hasNormalCock() { return CockComponent.lookupNormalOf(id) != null; }
  function hasNormalPussy() { return PussyComponent.lookupNormalOf(id) != null; }

  // This function checks to see if a character's breasts are at least as big as the argument value. If the argument
  // is a string this function checks the breastSize category. If the argument is a number it checks the absolute
  // breast volume.
  function breastsAreAtLeast(value) {
    const breastSizes = Object.keys(BreastData.BreastSizes);
    const tits = BreastsComponent.lookup(id);

    if (typeof value === 'string') {
      const targetIndex = breastSizes.indexOf(value);
      if (targetIndex < 0) { throw `Unknown Breast Size (${value})`; }
      return breastSizes.indexOf(tits.breastSize) >= targetIndex;
    }

    return tits.absoluteBreastVolume >= value;
  }

  // Like the breastsAreAtLeast() function this function takes a string if we're checking the cock size category or a
  // number if we're checking the cock length in mm.
  function cockIsAtLeast(value) {
    const cockSizes = Object.keys(CockData.CockSizes);
    const cock = CockComponent.lookupNormalOf(id);

    if (typeof value === 'string') {
      const targetIndex = cockSizes.indexOf(value);
      if (targetIndex < 0) { throw `Unknown Cock Size (${value})`; }
      return cockSizes.indexOf(cock.size) >= targetIndex;
    }

    return cock.length >= value;
  }

  // ======================
  //   Sexual Preferences
  // ======================

  function isGay() {
    const preferences = SexualPreferencesComponent.lookup(id);
    if (isMale()) { return preferences.gynophilic <= 10 && preferences.androphilic >= 10; }
    if (isFemale()) { return preferences.gynophilic >= 10 && preferences.androphilic <= 10; }
    throw `Gay has no meaning when gender is ${getGenderName()}`;
  }

  function isStraight() {
    const preferences = SexualPreferencesComponent.lookup(id);
    if (isMale()) { return preferences.gynophilic >= 10 && preferences.androphilic <= 10; }
    if (isFemale()) { return preferences.gynophilic <= 10 && preferences.androphilic >= 10; }
    `Straight has no meaning when gender is ${getGenderName()}`;
  }

  // TODO: This is a little wrong because it tests to see if a character would consent to this sex action right the
  //   fuck now, and doesn't take into account the kind of arousal level that they could be worked up to. It would be
  //   more accurate if we also look into the sexual history to see if they've at least already done it a few times
  //   with the player.
  function wouldConsentTo(code, minimumLevel=Consent.willing) {
    const result = ConsentResult(id);
    result.setSexAction(code);
    result.applyFactors();
    return result.getConsent() >= minimumLevel;
  }

  // =============
  //   Equipment
  // =============

  // TODO: Should isNaked() be false if a person is only wearing a hat?
  function isNaked() {
    return Object.keys(ObjectHelper.select(EquipmentComponent.lookup(id), ([_,i]) => i != null)).length === 0;
  }

  function isEquipped(slot) { return EquipmentComponent.lookup(id)[slot] != null; }

  // ===============
  //   Orgasm Data
  // ===============

  // The orgasm threshold is normally 10,000. The premature aspect reduces it to 7500, 5000, or 2500. There might be
  // other factors (such as equipment, special abilities, drugs) that raise or lower this threshold, either by a set
  // amount or by a percentage. (Which is why I'm using a variable here)
  function getOrgasmThreshold() {
    let threshold = 10000;
    const premature = AspectsComponent.lookup(id).premature;
    if (premature) { threshold -= (premature * 2500) }
    return threshold;
  }

  // For now, we can just always trigger the orgasm when pleasure is over the threshold. I need to determine what kind
  // of factors. Orgasm control will likely depend on some character aspects that represent self control or reluctance
  // to orgasm. Perhaps personality and feelings as well, are they the type who want to cum or not?
  //
  // This function should use the most intense physical sensation when determining if the player orgasms or not. When
  // pleasure is over the threshold we should get a separate trigger threshold, multiply the most intense sensation by
  // a random factor (0.8 - 1.2) and trigger an orgasm if the resulting value is over the trigger threshold. This will
  // allow us to add some randomness, and gives us different ways to control the orgasm threshold (being on the edge of
  // an orgasm) and the trigger threshold (actually achieving or being forced to orgasm)
  //
  // mostIntense:{ code, value }
  //
  // A character's arousal and a high edging value should also affect the trigger threshold.
  function rollForOrgasm(mostIntense) {
    const pleasure = ArousalComponent.lookup(id).pleasure;
    const threshold = getOrgasmThreshold();
    return (pleasure > threshold);
  }

  // TODO: I'm not sure yet what kind of character properties influence this, probably at least an aspect or two.
  //       Equipment, or drugs and such might as well.
  function rollRefectoryPeriod() {
    return Random.between(6,12);
  }

  return Object.freeze({
    getEntity: () => { return id; },
    isPlayer,
    getName,
    getFullName,
    getSpeciesName,
    getGenderName,
    isMale,
    isFemale,
    isFuta,
    isEnby,

    // Attributes
    isFasterThan,
    isPrettierThan,
    isSmarterThan,
    isStrongerThan,
    isTougherThan,

    // Body Data
    isTallerThan,
    isShorterThan,
    hasBreasts,
    hasNormalCock,
    hasNormalPussy,
    breastsAreAtLeast,
    cockIsAtLeast,

    // Sexual Preferences
    isStraight,
    isGay,
    wouldConsentTo,

    // Equipment
    isNaked,
    isEquipped,

    // Orgasm Data
    getOrgasmThreshold,
    rollForOrgasm,
    rollRefectoryPeriod,
  });

}
