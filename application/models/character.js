global.Character = function(id) {

  function getFullName() {
    const actor = ActorComponent.lookup(id);
    let name = actor.name;
    if (actor.surname) { name = `${name} ${actor.surname}`; }
    if (actor.title) { name = `${actor.title} ${name}`; }
    return name;
  }

  // Attribute checks only ever roll against one attribute.
  function rollAttributeCheck(code) {
    const attribute = AttributesComponent.lookup(id)[code];
    if (attribute < 3) { return attribute; }
    const plus = Math.floor(attribute/2);
    const rand = Math.ceil(attribute/2);
    return Random.between(1,rand) + plus;
  }

  // Skill checks can roll against one attribute, or an average of attributes.
  // The attribute roll is then multiplied by the level and skill factor to
  // get the final value.
  function rollSkillCheck(code) {
    const level = SkillsComponent.lookup(id)[code];
    const skill = Skill.lookup(code);
    const average = averageAttributes(AttributesComponent.lookup(id), skill.getAttributes());
    const plus = Math.floor(average/2);
    const rand = Math.ceil(average/2);
    const factor = (1 + (level/100)) * skill.getFactor();

    return (Random.between(1,rand) + plus) * factor;
  }

  function averageAttributes(attributes, attributeList) {
    let total = 0;

    attributeList.forEach(attribute => {
      total += attributes[attribute];
    });

    return Math.ceil(total / attributeList.length);
  }

  return Object.freeze({
    getEntity: () => { return id; },
    getName: () => { return ActorComponent.lookup(id).name; },
    getFullName,
    getSpeciesName: () => { return Species.lookup(ActorComponent.lookup(id).species).getName(); },
    getGenderName: () => { return GenderName[ActorComponent.lookup(id).gender] },
    rollAttributeCheck,
    rollSkillCheck,
  });

}
