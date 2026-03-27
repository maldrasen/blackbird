global.SexualHistoryFactory = (function() {

  // Currently the sexual history keys can only be set to UNKNOWN, meaning we don't know who took that virginity.
  // Whatever happened, it happened before you met this character. We could extend this to give more detail about the
  // conditions that they lost the virginity under. This would probably depend on their sexual preferences and could
  // even have some influences from things like species. (Is rape or incest common in this species?) If we pick
  // something 'interesting' though we should use that same value everywhere. Outside of this factory the values in the
  // firsts array will be set to an entity id (usually the player.)
  function build(context) {
    const history = { actions:{}, firsts:{} };
    const archetype = Archetype.lookup(context.personality.archetype);
    const virginityChances = archetype.getVirginChances();
    const taker = 'UNKNOWN';

    // If they are a complete virgin, they have no history at all.
    if (Random.roll(100) < virginityChances.complete) { return history; }

    const androphilia = context.sexualPreferences['androphilic'];
    const cockLover = context.sexualPreferences['cock-lover'];
    const cumDump = context.sexualPreferences['cum-dump'];
    const breathPlayer = context.sexualPreferences['breath-player'];
    const analSlut = context.sexualPreferences['anal-slut'];
    const cockSlut = context.sexualPreferences['cock-slut'];
    const oralSlut = context.sexualPreferences['oral-slut'];
    const pussySlut = context.sexualPreferences['pussy-slut'];

    if (androphilia == null) {
      throw new Error(`Androphilic preference should have been set.`);
    }

    // (1.1 - 10.9) base increases chance of virginity if they don't like men.
    if (androphilia < 0) {
      const factor = 1+(-androphilia / 10);
      if (virginityChances.oral > 0) { virginityChances.oral *= factor; }
      if (virginityChances.pussy > 0) { virginityChances.pussy *= factor; }
      if (virginityChances.anal > 0) { virginityChances.anal *= factor; }
    }
    if (cockLover > 0) {
      const factor = preferenceToFactor(cockLover);
      if (virginityChances.oral > 0) { virginityChances.oral *= factor * 0.6 }
      if (virginityChances.pussy > 0) { virginityChances.pussy *= factor * 0.8; }
      if (virginityChances.anal > 0) { virginityChances.anal *= factor; }
    }
    if (cumDump > 0) {
      const factor = preferenceToFactor(cumDump);
      if (virginityChances.oral > 0) { virginityChances.oral *= factor * 0.4 }
      if (virginityChances.pussy > 0) { virginityChances.pussy *= factor * 0.6; }
      if (virginityChances.anal > 0) { virginityChances.anal *= factor * 0.8; }
    }

    if (breathPlayer > 0 && virginityChances.oral > 0) { virginityChances.oral *= preferenceToFactor(breathPlayer); }
    if (oralSlut > 0 && virginityChances.oral > 0) { virginityChances.oral *= preferenceToFactor(oralSlut); }
    if (analSlut > 0 && virginityChances.anal > 0) { virginityChances.anal *= preferenceToFactor(analSlut); }
    if (cockSlut > 0 && virginityChances.cock > 0) { virginityChances.cock *= preferenceToFactor(cockSlut); }
    if (pussySlut > 0 && virginityChances.pussy > 0) { virginityChances.pussy *= preferenceToFactor(pussySlut); }

    Object.keys(virginityChances).forEach(key => {
      const target = Math.round(virginityChances[key]);

      let allowed = (key !== 'complete');
      if (key === 'cock' && context.sensitivities.cock == null) { allowed = false; }
      if (key === 'pussy' && context.sensitivities.pussy == null) { allowed = false; }

      if (allowed && target < 100 && Random.roll(100) > target) {
        history.firsts[key] = taker;
      }
    });

    return history;
  }

  // Just a guess on the math here. Preference value will be from 1-100, so the values (1,25,50,75,100) would translate
  // to (96%, 54%, 37%, 28%, 23%) which is a fair range I think as this will be used to reduce the chance of virginity
  // given a sexual preference value.
  function preferenceToFactor(value) {
    return 1 / (1+(value/30));
  }

  return Object.freeze({
    build
  });

})();