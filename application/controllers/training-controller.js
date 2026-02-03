global.TrainingController = (function() {

  // The scale thresholds could be played with a bit, raised or lowered as needed as the levels aren't very even at all.
  const ScaleThresholds = [100, 500, 3000, 10000, 30000, 60000, 100000, 250000, 600000, 1000000];

  const $characterState = {};
  const $trainingScales = {
    clitoral: 0,
    vaginal: 0,
    anal: 0,
    oral: 0,
    nipple: 0,
    penile: 0,
    cervical: 0,
    urethral: 0,
    prostate: 0,
    comfort: 0,
    desire: 0,
    submission: 0,
    shame: 0,
    suffering: 0,
    anger: 0,
  }

  let $currentPosition = 'standing'

  // TODO: We should keep track of the fluids (cum, piss, milk, vomit) produced by each actor.
  //       We should keep track of how much fluid goes into each orifice separately.
  //       It should be possible for a character to be impregnated during a training scene. It's possible that if two
  //       other characters both came in a character's womb we won't know who got that character pregnant.
  //       Need systems for all fluid volumes, how much a character cums, etc.
  //       Extra cum production is a good candidate for an aspect. It would be relatively simple to take the default
  //       cum volume for species and multiply it by a factor indicated by a 'Massive Loads' aspect or some such.

  // TODO: We probably need a 'mood' variable as well. Mood could be set when the training is started. Could be based
  //       on a lot of different factors, but having the mood reflect the current emotional state of the partner
  //       character would start the training off at an advantage or disadvantage.

  // TODO: Drugs or alcohol can be used as mood enhancers. Drugging a person against their will would of course produce
  //       anger, but if you were sneaky... A strong enough drug though and they won't even remember. Drugged should be
  //       a priority status effect that appears early in the sex action text tree.


  function start(data) {
    TrainingView.show();

    console.log("Start Training:",data);

    nextTurn()
  }

  function nextTurn() {

  }

  return Object.freeze({
    start
  });

})();
