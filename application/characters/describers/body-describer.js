global.BodyDescriber = (function() {

  function getTemplate(id) {
    const parts = [
      describeSpecies(id),
      describeHeight(id)];
  }

  function describeSpecies(id) {
    switch (ActorComponent.lookup(id).species) {
      case SpeciesCode.elf: return describeElf(id);
      case SpeciesCode.equian: return describeEquian(id);
      case SpeciesCode.halfling: return describeHalfling(id);
      case SpeciesCode.human: return describeHuman(id);
      case SpeciesCode.kobold: return describeKobold(id);
      case SpeciesCode.lupin: return describeLupin(id);
      case SpeciesCode.nymph: return describeNymph(id);
      case SpeciesCode.sylph: return describeSylph(id);
      case SpeciesCode.vermen: return describeVermen(id);
    }
  }

  function describeElf(id) {}
  function describeEquian(id) {}
  function describeHalfling(id) {}
  function describeHuman(id) {}
  function describeKobold(id) {}
  function describeLupin(id) {}
  function describeNymph(id) {}
  function describeSylph(id) {}
  function describeVermen(id) {}

  function describeHeight(id) {
    const actor = ActorComponent.lookup(id);
    const body = BodyComponent.lookup(id);

    const tallness = body.height / Species.lookup(actor.species).getAverageHeight(actor.gender);
    const measurement = MeasurementHelper.feetAndInchesInEnglish(body.height);
    const options = [];

    if (tallness < 0.90) {
      options.push({ text:`{C:He}'s much shorter than most {C:species.elven} {C:men}, standing ${measurement} tall.` });
      options.push({ text:`{C:He}'s ${measurement} tall, which is very short for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:he}'s much shorter than most {C:species.elven} {C:men}.` });
    }
    if (tallness >= 0.90 && tallness < 0.95) {
      options.push({ text:`{C:He}'s shorter than most {C:species.elven} {C:men}, standing ${measurement} tall.` });
      options.push({ text:`{C:He}'s ${measurement} tall, which is somewhat short for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:he}'s a little on the short side, when compared to most {C:species.elven} {C:men}.` });
    }
    if (tallness >= 0.95 && tallness < 1.05) {
      options.push({ text:`{C:He}'s average height for an {C:species.elf} {C:man}, standing ${measurement} tall.` });
      options.push({ text:`{C:He}'s ${measurement} tall, which is about average for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:he}'s about average for an {C:species.elven} {C:man}.` });
    }
    if (tallness >= 1.05 && tallness < 1.10) {
      options.push({ text:`{C:He}'s taller than most {C:species.elven} {C:men}, standing ${measurement} tall.` });
      options.push({ text:`{C:He}'s ${measurement} tall, which is fairly tall for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:he}'s taller than most {C:species.elven} {C:men}.` });
    }
    if (tallness >= 1.10) {
      options.push({ text:`{C:He}'s much taller than most {C:species.elven} {C:men}, standing ${measurement} tall.` });
      options.push({ text:`{C:He}'s ${measurement} tall, which is very tall for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:he}'s much taller than most {C:species.elven} {C:men}.` });
    }

    return Random.from(options);
  }

  return Object.freeze({
    getTemplate,
    describeSpecies,
    describeHeight,
  });

})();