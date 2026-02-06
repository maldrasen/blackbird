global.CharacterAdjuster = (function() {

  // The applyAll() function takes an array of adjustments and apply the
  // adjustments that can be made to the character. If an aspect or adjustment
  // is invalid it's just ignored.
  async function applyAll(character, triggers) {
    if (triggers && triggers.length > 0) {
      const aspects = filterAspects(triggers)
      const adjustments = filterAdjustments(triggers);
      const context = new Context();
      await context.addCharacter('C',character);

      await Promise.all(aspects.map(async aspect => {
        await applyAspect(character, aspect);
      }));

      await Promise.all(adjustments.map(async adjustment => {
        await applyAdjustment(character, context, Adjustment.lookup(adjustment));
      }));
    }
  }

  // This function only needs to filter out the adjustments from the aspect
  // adjustments.
  function filterAdjustments(triggers) {
    return triggers.filter(trigger => {
      return Adjustment.instances[trigger] != null;
    });
  }

  // I've tried doing this several different ways, but this is the only thing
  // that really seems to work. Aspects can't just be added in a Promise.all()
  // loop. They have to be made unique first. This is because the the call
  // trace looks something like this:
  //    1. canAddAspect(milky) - yes
  //    2. canAddAspect(milky) - yes
  //    3. addAspect(milky) - ok
  //    4. addAspect(milky) - BOOM! Unique Constraint Voilation.
  //
  // No amount of sleeping or waiting will make this execute sequentially, so
  // we have to recreate the canAddAspect() logic here a bit by making sure
  // that the aspect array doesn't try to add any of the same aspects twice. We
  // also ensure that the aspect in the valid array is the highest level aspect
  // if it appears in the adjustment list more than once.
  function filterAspects(triggers) {
    let valid = []

    let add = aspect => {
      let existing = valid.find((entry) => { return entry.code == aspect.code; })
      if (existing == null) {
        valid.push(aspect);
      } else if (existing.level < aspect.level) {
        ArrayUtility.remove(valid, existing);
        valid.push(aspect);
      }
    }

    each(triggers, raw => {
      const code = raw.split('.')[0];
      const level = parseInt(raw.split('.')[1]||'1');
      if (Aspect.instances[code]) {
        add({ code, level });
      }
    })

    return valid;
  }

  async function applyAdjustment(character, context, adjustment) {
    if ((await CentralScrutinizer.meetsRequirements(adjustment.requires, context))) {
      await adjustment.apply(character);
    }
  }

  async function applyAspect(character, aspect) {
    if ((await character.canAddAspect(aspect.code))) {
      await character.addAspect(aspect.code, { level:aspect.level });
    }
  }

  return { applyAll };

})();
