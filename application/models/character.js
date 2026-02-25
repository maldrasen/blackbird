global.Character = function(id) {

  function getFullName() {
    const actor = ActorComponent.lookup(id);
    let name = actor.name;
    if (actor.surname) { name = `${name} ${actor.surname}`; }
    if (actor.title) { name = `${actor.title} ${name}`; }
    return name;
  }

  return Object.freeze({
    getEntity: () => { return id; },
    getName: () => { return ActorComponent.lookup(id).name; },
    getFullName,
    getSpeciesName: () => { return Species.lookup(ActorComponent.lookup(id).species).getName(); },
    getGenderName: () => { return GenderName[ActorComponent.lookup(id).gender] },
  });

}
