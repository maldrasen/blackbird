describe('EpisodeSystem', function() {

  describe('startEncounter()', function() {
    it('ends the episode and starts a battle with the encounter record', function() {
      BattleFixtures.prepareForBattle();
      Episode.register('spec-charge-episode',{ pages:[{ content:`<p>Text</p>` }] });
      EpisodeSystem.startEpisode('spec-charge-episode',{ P:GameSystem.getState().getPlayer() });

      EpisodeSystem.startEncounter({ record:'nightgaunt' });

      expect(EpisodeSystem.getState()).to.equal(null);
      expect(GameSystem.getState().getGameMode()).to.equal(GameMode.battle);
      expect(BattleSystem.getState().getActiveMonsters().length).to.equal(1);
    });

    it('forces the ambush state when one is given', function() {
      BattleFixtures.prepareForBattle();
      Episode.register('spec-ambush-episode',{ pages:[{ content:`<p>Text</p>` }] });
      EpisodeSystem.startEpisode('spec-ambush-episode',{ P:GameSystem.getState().getPlayer() });

      EpisodeSystem.startEncounter({ record:'nightgaunt', ambushState:AmbushState.monstersAmbushed });

      expect(BattleSystem.getState().getAmbushState()).to.equal(AmbushState.monstersAmbushed);
    });
  });

});
