global.SensationAlignment = (function() {

  // The sex action alignment refers to where the action falls within our submission, masochism, debasement matrix.
  // The alignment of an action affects the player's sensations but uses both the player's skill in that BDSM class
  // and the partner's associated BDSM preference to do so.
  //
  // TODO: I really have no idea how all this should really work yet. I think I need to get the game into a more
  //  playable state before implementing any of these functions.
  //
  function apply(result) {
    const player = result.getPlayer();
    const partner = result.getPartner();
    const alignment = result.getSexAction().getAlignment();
    const preferences = SexualPreferencesComponent.lookup(partner);

    if (alignment.submission < 0) {
      // TODO: If this is a servicing action (-1 on submission) generally, we
      //   don't need to adjust the partner's anger. This should have some kind
      //   of effect though.
    }

    if (alignment.submission > 0) {
      const submissiveFactor = CharacterMath.personalityFactorValue(preferences.submissive);
      const check = SkillCheck(player, 'domination');

      result.addToPlayerSkills('domination');

      if (submissiveFactor < 0) { applyDominationOnTop(alignment.submission, submissiveFactor, check); }
      if (submissiveFactor === 0) { applyDomination(alignment.submission, submissiveFactor, check); }
      if (submissiveFactor > 0) { applyDominationOnBottom(alignment.submission, submissiveFactor, check); }
    }

    if (alignment.masochism > 0) {
      const masochismFactor = CharacterMath.personalityFactorValue(preferences.masochistic);
      const check = SkillCheck(player, 'sadism');

      result.addToPlayerSkills('sadism');

      if (masochismFactor < 0) { applySadismOnTop(alignment.masochism, masochismFactor, check); }
      if (masochismFactor === 0) { applySadism(alignment.masochism, masochismFactor, check); }
      if (masochismFactor > 0) { applySadismOnBottom(alignment.masochism, masochismFactor, check); }
    }

    if (alignment.shame > 0) {
      const shameFactor = CharacterMath.personalityFactorValue(preferences['humiliation-slut']);
      const check = SkillCheck(player, 'degradation');

      result.addToPlayerSkills('degradation');

      if (shameFactor < 0) { applyDegradationOnTop(alignment.masochism, shameFactor, check); }
      if (shameFactor === 0) { applyDegradation(alignment.masochism, shameFactor, check); }
      if (shameFactor > 0) { applyDegradationOnBottom(alignment.masochism, shameFactor, check); }
    }

    // TODO: We need to consider the effect affection-slut would have on the
    //  current action as it too is part of the whole BDSM matrix.
  }

  // If partner is dominant, they'll struggle to accept a submissive action, and this should dramatically increase
  // their anger. A player with a high domination skill though should be able to reduce their anger, by being a more
  // dominant top in this case.
  function applyDominationOnTop(level, factor, check) {}

  // If partner is neutral (not having a submissive preference) this should still increase anger. A high skill level
  // though should reduce that anger, redirecting it into shame and suffering perhaps. This should need a skill check
  // to determine how much anger gets converted.
  function applyDomination(level, factor, check) {}

  // If the partner is submissive, then the player's domination skill should increase their submission at the very
  // least. It should also reduce anger and perhaps increase comfort. As domination is more psychological, these
  // functions shouldn't touch the physical sensations.
  function applyDominationOnBottom(level, factor, check) {}

  // A player's sadism skill should increase physical sensations, and should increase suffering. Sadistic actions
  // create a lot of anger unless the player has the masochist preference. Bring good at sadism won't make other people
  // like it more though.
  function applySadismOnTop(level, factor, check) {}
  function applySadism(level, factor, check) {}
  function applySadismOnBottom(level, factor, check) {}

  // I think the degradation skill is a bit of a halfway between physical and psychological, and should primarily be
  // about increasing shame. Degradation also causes a lot of anger, but like masochism I think only the
  // humiliation-slut preference will reduce it.
  function applyDegradationOnTop(level, factor, check) {}
  function applyDegradation(level, factor, check) {}
  function applyDegradationOnBottom(level, factor, check) {}

  return Object.freeze({ apply });

})();
