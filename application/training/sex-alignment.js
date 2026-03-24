/**
 * # SexAlignment
 *
 * This module is used to create the alignment objects that get added to the sex action. Because they're a little
 * tricky and verbose, and because similar actions will have similar alignments, I made this module to build all the
 * alignments we're likely to see. The sex action alignment defines what parts need to be aligned within the
 * SexPosition for this action to happen. This can result in the position needing to shift or change completely.
 *
 * ### partner:{ass}
 * Within the alignments the 'ass' property is overloaded and represents both the ass and the pussy. Because the
 * alignments are also used to build the 'uses' arrays, we need to specify the target orifice that 'ass' represents
 * in this particular alignment. I think a single target should be fine as I can't think of any sex actions that would
 * target one character's ass and the other character's pussy separately. If we do add a "double dildo ass on one end,
 * pussy on the other" action we can revisit this.
 */
global.SexAlignment = (function()  {

  function getFondling(handAlignment) {
    return {
      player: { },
      partner: { hands:handAlignment },
    }
  }

  function getOral(trainingSlot) {
    const alignment = { player:{}, partner:{} };

    if (trainingSlot === TrainingSlot.breasts) {
      alignment.partner.mouth = MouthAlignment.breasts;
    }
    if (trainingSlot === TrainingSlot.cock) {
      alignment.player.cock = CockAlignment.sucked;
      alignment.partner.mouth = MouthAlignment.cock;
    }
    if (trainingSlot === TrainingSlot.ass) {
      alignment.target = TrainingSlot.ass;
      alignment.player.ass = AssAlignment.eaten;
      alignment.partner.mouth = MouthAlignment.ass;
    }
    if (trainingSlot === TrainingSlot.pussy) {
      alignment.target = TrainingSlot.pussy;
      alignment.player.ass = AssAlignment.eaten;
      alignment.partner.mouth = MouthAlignment.ass;
    }

    return alignment
  }

  function getTitfuck() {
    return  {
      player: { cock:CockAlignment.rubbed },
      partner: { breasts:BreastAlignment.cock, hands:HandAlignment.cock },
    };
  }

  function giveFingering(trainingSlot) {
    return {
      target: trainingSlot,
      player: { hands:HandAlignment.ass },
      partner: { ass:AssAlignment.fingered },
    };
  }

  // Fondling type actions checks the hand alignment. However, because fondling
  // technically doesn't check the alignment of the partner's parts it won't
  // see those parts as 'used', meaning you can fondle a part and do anything
  // else to it as well.
  function giveFondling(handAlignment) {
    return {
      player: { hands:handAlignment },
      partner: { },
    }
  }

  function giveOral(trainingSlot) {
    const alignment = { player:{}, partner:{} };

    if (trainingSlot === TrainingSlot.breasts) {
      alignment.player.mouth = MouthAlignment.breasts;
    }
    if (trainingSlot === TrainingSlot.cock) {
      alignment.player.mouth = MouthAlignment.cock;
      alignment.partner.cock = CockAlignment.sucked;
    }
    if (trainingSlot === TrainingSlot.ass) {
      alignment.target = TrainingSlot.ass;
      alignment.player.mouth = MouthAlignment.ass;
      alignment.partner.ass = AssAlignment.eaten;
    }
    if (trainingSlot === TrainingSlot.pussy) {
      alignment.target = TrainingSlot.pussy;
      alignment.player.mouth = MouthAlignment.ass;
      alignment.partner.ass = AssAlignment.eaten;
    }

    return alignment;
  }

  function giveTitfuck() {
    return {
      player: { breasts:BreastAlignment.cock, hands:HandAlignment.cock },
      partner: { cock:CockAlignment.rubbed },
    };
  }

  function kissing() {
    return {
      player: { mouth:MouthAlignment.mouth },
      partner: { mouth:MouthAlignment.mouth },
    };
  }

  function frottage() {
    return {
      player: { cock:CockAlignment.frottage, hands:HandAlignment.cock },
      partner: { cock:CockAlignment.frottage },
    }
  }

  // For an insertion action, the fucking actions also need a hand to assist.
  // Including the hands here is used to remove a persisted action that might
  // also be using the hands.
  function giveFucking(trainingSlot, also=null) {
    const alignment = {
      target: trainingSlot,
      player: { cock:CockAlignment.fucked },
      partner: { ass:AssAlignment.fucked },
    }

    if (also === TrainingSlot.hands) {
      alignment.player.hands = HandAlignment.ass;
    }

    return alignment;
  }

  return Object.freeze({
    getFondling,
    getOral,
    getTitfuck,
    giveFingering,
    giveFondling,
    giveFucking,
    giveOral,
    giveTitfuck,
    frottage,
    kissing,
  });

})();
