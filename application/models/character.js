global.Character = function(id) {

  function getFullName() {
    const actor = ActorComponent.lookup(id);
    let name = actor.name;
    if (actor.surname) { name = `${name} ${actor.surname}`; }
    if (actor.title) { name = `${actor.title} ${name}`; }
    return name;
  }

  // The orgasm threshold is normally 10,000. The premature aspect reduces it to 7500, 5000, or 2500. There might be
  // other factors (such as equipment, special abilities, drugs) that raise or lower this threshold, either by a set
  // amount or by a percentage. (Which is why I'm using a variable here)
  function getOrgasmThreshold() {
    let threshold = 10000;
    const premature = AspectsComponent.lookup(id)[AspectType.premature];
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
    getName: () => { return ActorComponent.lookup(id).name; },
    getFullName,
    getSpeciesName: () => { return Species.lookup(ActorComponent.lookup(id).species).getName(); },
    getGenderName: () => { return GenderName[ActorComponent.lookup(id).gender] },
    getOrgasmThreshold,
    rollForOrgasm,
    rollRefectoryPeriod,
  });

}
