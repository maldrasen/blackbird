global.SexAlignment = (function()  {

  function getFondling(handAlignment) {
    return {
      player: { },
      partner: { hands:[handAlignment] },
    }
  }

  function getOral(trainingSlot) {
    const alignment = { player:{}, partner:{} };

    if (trainingSlot === TrainingSlot.breasts) {
      alignment.partner.mouth = [MouthAlignment.breasts];
    }
    if (trainingSlot === TrainingSlot.cock) {
      alignment.player.cock = [CockAlignment.sucked];
      alignment.partner.mouth = [MouthAlignment.cock];
    }
    if (trainingSlot === TrainingSlot.ass) {
      alignment.target = TrainingSlot.ass;
      alignment.player.ass = [AssAlignment.eaten];
      alignment.partner.mouth = [MouthAlignment.ass];
    }
    if (trainingSlot === TrainingSlot.pussy) {
      alignment.target = TrainingSlot.pussy;
      alignment.player.ass = [AssAlignment.eaten];
      alignment.partner.mouth = [MouthAlignment.ass];
    }

    return alignment
  }

  // When an action uses the 'ass' property, we need to have a target specified
  // so that we can build the uses arrays with either partner:['pussy'] or
  // partner:['anus'].
  function giveFingering(trainingSlot) {
    return {
      target: trainingSlot,
      player: { hands:[HandAlignment.ass] },
      partner: { ass:[AssAlignment.fingered] },
    };
  }

  // Fondling type actions checks the hand alignment. However, because fondling
  // technically doesn't check the alignment of the partner's parts it won't
  // see those parts as 'used', meaning you can fondle a part and do anything
  // else to it as well.
  function giveFondling(handAlignment) {
    return {
      player: { hands:[handAlignment] },
      partner: { },
    }
  }

  function giveOral(trainingSlot) {
    const alignment = { player:{}, partner:{} };

    if (trainingSlot === TrainingSlot.breasts) {
      alignment.player.mouth = [MouthAlignment.breasts];
    }
    if (trainingSlot === TrainingSlot.cock) {
      alignment.player.mouth = [MouthAlignment.cock];
      alignment.partner.cock = [CockAlignment.sucked];
    }
    if (trainingSlot === TrainingSlot.ass) {
      alignment.target = TrainingSlot.ass;
      alignment.player.mouth = [MouthAlignment.ass];
      alignment.partner.ass = [AssAlignment.eaten];
    }
    if (trainingSlot === TrainingSlot.pussy) {
      alignment.target = TrainingSlot.pussy;
      alignment.player.mouth = [MouthAlignment.ass];
      alignment.partner.ass = [AssAlignment.eaten];
    }

    return alignment;
  }

  function kissing() {
    return {
      player: { mouth:[MouthAlignment.mouth] },
      partner: { mouth:[MouthAlignment.mouth] },
    };
  }

  // This might be unique to the frottage action.
  function frottage() {
    return {
      player: { cock:[CockAlignment.frottage], hands:[HandAlignment.cock] },
      partner: { cock:[CockAlignment.frottage] },
    }
  }

  // For an insertion action, the fucking actions also need a hand to assist.
  // Including the hands here is used to remove a persisted action that might
  // also be using the hands.
  function giveFucking(trainingSlot, also=null) {
    const alignment = {
      target: trainingSlot,
      player: { cock:[CockAlignment.fucked] },
      partner: { ass:[AssAlignment.fucked] },
    }

    if (also === TrainingSlot.hands) {
      alignment.player.hands = [HandAlignment.ass];
    }

    return alignment;
  }

  return Object.freeze({
    getFondling,
    getOral,

    giveFingering,
    giveFondling,
    giveFucking,
    giveOral,

    frottage,
    kissing,
  });

})();
