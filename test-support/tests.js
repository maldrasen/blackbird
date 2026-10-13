global.Tests = (function() {

  let currentSeed;

  function reset() {
    NegotiationQuestion.clearWhitelist();
    NegotiationRequest.clearWhitelist();
    Random.stubReset();
    GameSystem.createNewGame();
    WorldState.reset();
  }

  // Every spec gets its own fresh seed so a failure can be reproduced in isolation: rerunning just that spec (e.g. via
  // --grep) with SEED set to the reported value recreates exactly the randomness that caused the failure, regardless
  // of what ran before it.
  function beforeEachTest() {
    reset();
    currentSeed = process.env.SEED ? Random.seed(Number(process.env.SEED)) : Random.reseed();
  }

  function afterEachTest() {
    if (this.currentTest?.state === 'failed') {
      console.error(`Test Failed - Seed ⟪ ${currentSeed} ⟫ - "${this.currentTest.fullTitle()}"`);
    }
    reset();
  }

  function rootBefore() {
    console.log(`⟪ Random Test Seed : ${Random.getSeed()} ⟫\n`);
  }

  return {
    rootBefore,
    beforeEachTest,
    afterEachTest,
  };

})();
