global.PussyFactory = (function() {

  function build(actor) {
    const species = Species.lookup(actor.species);
    const pussyDef = species.getBody().pussy || {};
    const pussyData = {
      placement: 'normal',
      shape: pussyDef.shape || 'normal',
      minPussyWidth: 0,
      minCervixWidth: 0,
      maxCervixWidth: 0,
      minUrethraWidth: 0,
      outerLabiaSize: Random.roll(5)+1,
      prolapseLength: 0,
    };

    let mean = pussyDef.pussyWidth || 70;
    let deviation = pussyDef.pussyWidthDev || 7;
    const urethraMin = pussyDef.urethraWidthMin || 4;
    const urethraMax = pussyDef.urethraWidthMax || 8;

    pussyData.maxPussyWidth = Math.max(32, Math.round(Random.normalDistribution(mean,deviation) * species.getLengthRatio()));
    pussyData.maxPussyDepth = Math.round(Random.normalDistribution(280,10) * species.getLengthRatio());
    pussyData.maxUrethraWidth = Math.max(2, Math.round(Random.between(urethraMin,urethraMax) * species.getLengthRatio()));

    // While dog pussies (lupins, vulpins) technically have a clit (in a fossa inside the ventral commissure, who
    // knew?) from a visual perspective they look more like a triangular pussy with three thick lips and no visible
    // clit. The reptilian pussy (dragons, naga, kobolds) is a fairly simple slit with no clit or labia.
    if (['normal','horse'].includes(pussyData.shape)) {
      mean = pussyDef.clitLength || 12;
      deviation = pussyDef.clitLengthDev || 4;
      pussyData.clitLength = Math.max(5, Math.round(Random.normalDistribution(mean,deviation) * species.getLengthRatio()));

      mean = pussyDef.clitWidth || 8;
      deviation = pussyDef.clitWidthDev || 2;
      pussyData.clitWidth = Math.max(4, Math.round(Random.normalDistribution(mean,deviation) * species.getLengthRatio()));
    }

    // Currently only human style pussies have large inner labia that extend beyond the outer labia.
    if (pussyData.shape === 'normal') {
      mean = pussyDef.labiaLength || 30;
      deviation = pussyDef.labiaLengthDev || 18;
      pussyData.innerLabiaLength = Math.max(0, Math.round(Random.normalDistribution(mean,deviation) * species.getLengthRatio()));
    }

    return pussyData;
  }

  // === Apply Triggers ================================================================================================

  function applyTriggers(pussyData, triggers) {

    function andRemove(trigger) {
      log(`Applied ${trigger}`,{ system:'PussyFactory', level:3 });
      ArrayHelper.remove(triggers, trigger);
    }

    [...triggers].forEach(trigger => {

      if (trigger === 'dog-pussy') {
        if (pussyData) { changeShapeTo('dog', pussyData) }
        andRemove(trigger);
      }

      if (trigger === 'horse-pussy') {
        if (pussyData) { changeShapeTo('horse', pussyData) }
        andRemove(trigger);
      }

    });
  }

  function changeShapeTo(newShape, pussyData) {
    pussyData.shape = newShape;

    if (newShape === 'horse') {
      delete pussyData.innerLabiaLength;
    }
    if (newShape === 'dog') {
      delete pussyData.innerLabiaLength;
      delete pussyData.clitWidth;
      delete pussyData.clitLength;
    }
  }

  return Object.freeze({ build, applyTriggers });

})();
