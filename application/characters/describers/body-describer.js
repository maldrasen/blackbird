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

  function describeElf(id) {
    return Random.from([
      { text:`It's clear from {C:his} long tapered ears and firm slender build that {C:name} is an elf.` },
      { text:`{C:name} is an elf, a fact that's made clear by {C:his} long tapered ears and slender build.` },
    ]);
  }

  function describeEquian(id) {
    const actor = ActorComponent.lookup(id);
    const body = BodyComponent.lookup(id);
    const options = [];

    options.push({ text:`{C:name} is an equian. Like others of {C:his} species, {C:he} most resembles a large horse, 
      walking upright on thickly furred hooves.` });

    if (actor.gender === Gender.male && body.hairColor !== body.furColor) {
      options.push({ text:`{C:name} is an equian, one of the large, powerfully built horse men. His entire body is 
        covered in a dense coat of {C:body.furColor} fur, though the long hair of his tail and head are 
        {C:body.hairColor}.`, parts:['hair','fur']});
    }

    return Random.from(options);
  }

  function describeHalfling(id) {
    return Random.from([
      { text:`{C:name} is a halfling, looking remarkably similar to a human, though {C:he} only stands about half as
          tall.` },
    ]);
  }

  function describeHuman(id) {
    return Random.from([
      { text: `{C:name} is a human, a short lived and mostly uninteresting species.` },
    ]);
  }

  function describeKobold(id) {
    return Random.from([
      { text:`With a tiny reptilian body and a weary look in {C:his} slitted {C:body.eyeColor} eyes, {C:name} could
          only be a kobold.`, parts:['eyes']}
    ]);
  }

  function describeLupin(id) {
    return Random.from([
      { text:`{C:name} is a lupin, one of the savage looking wolf people.` },
    ]);
  }

  function describeNymph(id) {
    return Random.from([
      { text:`Given {C:his} long tapered ears, at first glance you might mistake {C:name} for a particularly lush 
          looking elf. In truth though {C:he's} a nymph, one of the fae water spirits.` }
    ]);
  }

  function describeSylph(id) {
    return Random.from([
      { text:`Given {C:his} long tapered ears, at first glance you might mistake {C:name} for a young looking elf. In
          truth though {C:he's} a sylph, one of the fae wind spirit.` }
    ]);
  }

  function describeVermen(id) {
    return Random.from([
      { text:`{C:name} is a vermen, a small rat like creature. Though {C:he} walks upright on two legs, {C:his}
          posture is rather hunched, as though {C:he} could drop to all fours and sprint away at any time.` }
    ]);
  }

  function describeHeight(id) {
    const actor = ActorComponent.lookup(id);
    const body = BodyComponent.lookup(id);

    const tallness = body.height / Species.lookup(actor.species).getAverageHeight(actor.gender);
    const measurement = MeasurementHelper.feetAndInchesInEnglish(body.height);
    const options = [];

    if (tallness < 0.90) {
      options.push({ text:`{C:He's} much shorter than most {C:species.elven} {C:men}, standing ${measurement} tall.` });
      options.push({ text:`{C:He's} ${measurement} tall, which is very short for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:he's} much shorter than most {C:species.elven} {C:men}.` });
    }
    if (tallness >= 0.90 && tallness < 0.95) {
      options.push({ text:`{C:He's} shorter than most {C:species.elven} {C:men}, standing ${measurement} tall.` });
      options.push({ text:`{C:He's} ${measurement} tall, which is somewhat short for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:he's} a little on the short side, when compared to most {C:species.elven} {C:men}.` });
    }
    if (tallness >= 0.95 && tallness < 1.05) {
      options.push({ text:`{C:He's} average height for an {C:species.elf} {C:man}, standing ${measurement} tall.` });
      options.push({ text:`{C:He's} ${measurement} tall, which is about average for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:he's} about average for an {C:species.elven} {C:man}.` });
    }
    if (tallness >= 1.05 && tallness < 1.10) {
      options.push({ text:`{C:He's} taller than most {C:species.elven} {C:men}, standing ${measurement} tall.` });
      options.push({ text:`{C:He's} ${measurement} tall, which is fairly tall for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:he's} taller than most {C:species.elven} {C:men}.` });
    }
    if (tallness >= 1.10) {
      options.push({ text:`{C:He's} much taller than most {C:species.elven} {C:men}, standing ${measurement} tall.` });
      options.push({ text:`{C:He's} ${measurement} tall, which is very tall for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:he's} much taller than most {C:species.elven} {C:men}.` });
    }

    return Random.from(options);
  }

  return Object.freeze({
    getTemplate,
    describeSpecies,
    describeHeight,
  });

})();