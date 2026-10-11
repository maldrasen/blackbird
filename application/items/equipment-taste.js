// A character's taste in equipment: how much they'd like to wear a given item, worked out from the item's style tags.
// Their personality archetype weighs every style, and their gender weighs the feminine and masculine styles on top
// of that. The equipper uses this to shop, and any future "would you wear this?" question should come through here.
global.EquipmentTaste = function(characterId) {

  // Being bare at these slots is itself slutty.
  const lewdWhenBare = [EquipmentSlot.chest, EquipmentSlot.legs];

  // I'm counting futanari as essentially feminine when it comes to clothing choices. Futanari characters are usually
  // seen as "women with dicks" rather than an actual non-binary gender.
  const GenderPreferences = {
    [Gender.male]:   { [ItemStyle.feminine]: -80 },
    [Gender.female]: { [ItemStyle.masculine]: -40 },
    [Gender.futa]:   { [ItemStyle.masculine]: -40 },
    [Gender.none]:   {},
  };

  // The player has no personality component, so only their gender shapes their taste.
  function archetypePreferences() {
    const personality = PersonalityComponent.lookup(characterId);
    return personality ? Archetype.lookup(personality.archetype).getEquipmentPreferences() : {};
  }

  function genderPreferences() {
    return GenderPreferences[ActorComponent.lookup(characterId).gender];
  }

  // The sum of the weights for every tag the item carries. A style neither the archetype nor the gender weighs
  // counts for nothing, and an untagged item always comes out neutral.
  function getPreference(itemId) {
    const archetype = archetypePreferences();
    const gender = genderPreferences();

    return Item(itemId).getTags().reduce((total, tag) => {
      return total + (archetype[tag] || 0) + (gender[tag] || 0);
    }, 0);
  }

  // Whether the character would rather leave a slot empty than wear something they dislike there. A character who
  // likes slutty things is happy to show skin; anyone else would rather be covered.
  function acceptsBare(slot) {
    if (lewdWhenBare.includes(slot) === false) { return true; }
    return (archetypePreferences()[ItemStyle.slutty] || 0) > 0;
  }

  return {
    getPreference,
    acceptsBare,
  };
}
