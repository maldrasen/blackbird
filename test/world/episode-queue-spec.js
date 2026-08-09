describe('EpisodeQueue', function() {

  const enterDungeon = { toLocation:'the-well', toDistrict:'dungeon', districtChanged:true };

  function setPlayer() {
    GameSystem.getState().setPlayer(Registry.createEntity());
  }

  it('seeds episodes with places from their queue metadata', function() {
    EpisodeQueue.seed(['debug-strange-mist']);

    expect(GameSystem.getState().getEpisodes()).to.eql([
      { code:'debug-strange-mist', place:'district:dungeon' },
    ]);
  });

  it('pushes an episode without queue metadata to an explicit place', function() {
    EpisodeQueue.push('game-over','global');

    expect(GameSystem.getState().getEpisodes()).to.eql([{ code:'game-over', place:'global' }]);
  });

  it('throws when pushing an episode with no queue metadata and no place', function() {
    expect(() => EpisodeQueue.push('game-over')).to.throw(/no queue metadata/);
  });

  it('fires a global episode on any move and removes a once-only entry', function() {
    EpisodeQueue.push('game-over','global');

    expect(EpisodeQueue.evaluateMove(enterDungeon)).to.equal('game-over');
    expect(GameSystem.getState().getEpisodes()).to.eql([]);
  });

  it('fires at most one episode per move, front of the queue first', function() {
    EpisodeQueue.push('game-over','global');
    EpisodeQueue.push('propose-training','global');

    expect(EpisodeQueue.evaluateMove(enterDungeon)).to.equal('game-over');
    expect(GameSystem.getState().getEpisodes()).to.eql([{ code:'propose-training', place:'global' }]);
  });

  it('returns null when nothing is eligible for the move', function() {
    EpisodeQueue.push('game-over','district:home');

    expect(EpisodeQueue.evaluateMove(enterDungeon)).to.equal(null);
    expect(GameSystem.getState().getEpisodes()).to.eql([{ code:'game-over', place:'district:home' }]);
  });

  it('falls through to the next candidate when requirements fail', function() {
    EpisodeQueue.seed(['debug-strange-mist']);
    EpisodeQueue.push('game-over','district:dungeon');

    expect(EpisodeQueue.evaluateMove(enterDungeon)).to.equal('game-over');
    expect(GameSystem.getState().getEpisodes()).to.eql([
      { code:'debug-strange-mist', place:'district:dungeon' },
    ]);
  });

  it('fires when the roll is under the chance, keeping a repeating entry queued', function() {
    setPlayer();
    EpisodeQueue.seed(['debug-strange-mist']);
    Random.stubRoll(24);

    expect(EpisodeQueue.evaluateMove(enterDungeon)).to.equal('debug-strange-mist');
    expect(GameSystem.getState().getEpisodes()).to.eql([
      { code:'debug-strange-mist', place:'district:dungeon' },
    ]);
  });

  it('does not fire when the roll is at or over the chance', function() {
    setPlayer();
    EpisodeQueue.seed(['debug-strange-mist']);
    Random.stubRoll(25);

    expect(EpisodeQueue.evaluateMove(enterDungeon)).to.equal(null);
  });

  it('prunes an entry without firing once its removeWhen condition is met', function() {
    setPlayer();
    GameSystem.getState().setGameTime((30 * 24 * 60) + 1);
    EpisodeQueue.seed(['debug-strange-mist']);
    Random.stubRoll(0);

    expect(EpisodeQueue.evaluateMove(enterDungeon)).to.equal(null);
    expect(GameSystem.getState().getEpisodes()).to.eql([]);
  });

  it('ranks priority over specificity', function() {
    setPlayer();
    EpisodeQueue.push('game-over','location:the-well');
    EpisodeQueue.seed(['debug-strange-mist']);
    Random.stubRoll(0);

    expect(EpisodeQueue.evaluateMove(enterDungeon)).to.equal('debug-strange-mist');
  });

  it('breaks priority ties on specificity', function() {
    EpisodeQueue.push('propose-training','district:dungeon');
    EpisodeQueue.push('game-over','location:the-well');

    expect(EpisodeQueue.evaluateMove(enterDungeon)).to.equal('game-over');
  });

  it('skips entries queued for entering a district when the district has not changed', function() {
    setPlayer();
    EpisodeQueue.seed(['debug-strange-mist']);
    Random.stubRoll(0);

    expect(EpisodeQueue.evaluateMove({ ...enterDungeon, districtChanged:false })).to.equal(null);
    expect(GameSystem.getState().getEpisodes()).to.eql([
      { code:'debug-strange-mist', place:'district:dungeon' },
    ]);
  });

});
