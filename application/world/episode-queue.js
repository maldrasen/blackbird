global.EpisodeQueue = (function() {

  const SPECIFICITY = { location:2, district:1, global:0 };

  function seed(codes) {
    codes.forEach(code => push(code));
  }

  function push(code, place) {
    GameSystem.getState().pushEpisode(code, place || placeFromMetadata(code));
  }

  function placeFromMetadata(code) {
    const metadata = Episode.lookup(code).getQueue();
    if (metadata == null) { throw new Error(`Episode [${code}] has no queue metadata, so it needs an explicit place`); }
    if (metadata.global) { return 'global'; }
    if (metadata.district) { return `district:${metadata.district}`; }
    if (metadata.location) { return `location:${metadata.location}`; }
    throw new Error(`Episode [${code}] queue metadata has no placement`);
  }

  // Returns the code of the episode that should interrupt this move, or null. At most one episode fires per move:
  // the highest ranked candidate that passes its requirements and chance roll.
  function evaluateMove(move) {
    const state = GameSystem.getState();
    const context = { P:state.getPlayer() };

    const candidates = state.getEpisodes()
      .map((entry,position) => buildCandidate(entry, position, move))
      .filter(candidate => candidate != null);

    const winner = pruneFinished(candidates, context).sort(byRank).find(candidate => isEligible(candidate));
    if (winner == null) { return null; }

    if (winner.record.getRepeat() === false) { state.removeEpisode(winner.code); }
    return winner.code;
  }

  function buildCandidate(entry, position, move) {
    const specificity = placeSpecificity(entry.place, move);
    if (specificity == null) { return null; }

    const record = Episode.lookup(entry.code);
    const metadata = record.getQueue() || {};
    if (specificity !== SPECIFICITY.location && momentMatches(metadata.on, move.districtChanged) === false) { return null; }

    return { code:entry.code, position, specificity, metadata, record };
  }

  function placeSpecificity(place, move) {
    if (place === `location:${move.toLocation}`) { return SPECIFICITY.location; }
    if (place === `district:${move.toDistrict}`) { return SPECIFICITY.district; }
    if (place === 'global') { return SPECIFICITY.global; }
    return null;
  }

  function momentMatches(on, districtChanged) {
    if (on === 'enter') { return districtChanged; }
    if (on === 'move') { return districtChanged === false; }
    return true;
  }

  function pruneFinished(candidates, context) {
    const finished = candidates.filter(candidate =>
      candidate.metadata.removeWhen != null && candidate.metadata.removeWhen(context));
    finished.forEach(candidate => GameSystem.getState().removeEpisode(candidate.code));
    return candidates.filter(candidate => finished.includes(candidate) === false);
  }

  function byRank(a,b) {
    const priority = (b.metadata.priority || 0) - (a.metadata.priority || 0);
    if (priority !== 0) { return priority; }
    if (a.specificity !== b.specificity) { return b.specificity - a.specificity; }
    return a.position - b.position;
  }

  function isEligible(candidate) {
    if (candidate.record.meetsRequirements() === false) { return false; }
    const chance = candidate.metadata.chance == null ? 100 : candidate.metadata.chance;
    return Random.roll(100) < chance;
  }

  return {
    seed,
    push,
    evaluateMove,
  };

})();
