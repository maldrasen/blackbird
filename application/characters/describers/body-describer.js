global.BodyDescriber = (function() {

  function getTemplate(id) {}

  function describeHeight(id) {
    const actor = ActorComponent.lookup(id);
    const body = BodyComponent.lookup(id);

    const tallness = body.height / Species.lookup(actor.species).getAverageHeight(actor.gender);
    const measurement = MeasurementHelper.feetAndInchesInEnglish(body.height);
    const options = [];

    if (tallness < 0.90) {
      options.push({ text:`{C:name} is much shorter than most {C:species.elven} {C:men}, standing ${measurement} tall.` });
      options.push({ text:`{C:name} is ${measurement} tall, which is very short for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:name} is much shorter than most {C:species.elven} {C:men}.` });
    }
    if (tallness >= 0.90 && tallness < 0.95) {
      options.push({ text:`{C:name} is shorter than most {C:species.elven} {C:men}, standing ${measurement} tall.` });
      options.push({ text:`{C:name} is ${measurement} tall, which is somewhat short for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:name} is a little on the short side, when compared to most {C:species.elven} {C:men}.` });
    }
    if (tallness >= 0.95 && tallness < 1.05) {
      options.push({ text:`{C:name} is average height for an {C:species.elf} {C:man}, standing ${measurement} tall.` });
      options.push({ text:`{C:name} is ${measurement} tall, which is about average for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:name} is about average for an {C:species.elven} {C:man}.` });
    }
    if (tallness >= 1.05 && tallness < 1.10) {
      options.push({ text:`{C:name} is taller than most {C:species.elven} {C:men}, standing ${measurement} tall.` });
      options.push({ text:`{C:name} is ${measurement} tall, which is fairly tall for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:name} is taller than most {C:species.elven} {C:men}.` });
    }
    if (tallness >= 1.10) {
      options.push({ text:`{C:name} is much taller than most {C:species.elven} {C:men}, standing ${measurement} tall.` });
      options.push({ text:`{C:name} is ${measurement} tall, which is very tall for {C:species.anElf} {C:man}.` });
      options.push({ text:`At ${measurement}, {C:name} is much taller than most {C:species.elven} {C:men}.` });
    }

    return Random.from(options);
  }

  return Object.freeze({
    getTemplate,
    describeHeight,
  });

})();