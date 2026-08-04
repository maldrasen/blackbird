global.Tests = (function() {

  let isRunning = false;
  let currentSeed;

  function reset() {
    Random.stubReset();
    GameSystem.reset();
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
    if (this.currentTest && this.currentTest.state === 'failed') {
      console.error(`Test Failed - Seed ⟪ ${currentSeed} ⟫ - "${this.currentTest.fullTitle()}"`);
    }
    reset();
  }

  function rootBefore() {
    isRunning = true;
    console.log(`⟪ Random Test Seed : ${Random.getSeed()} ⟫\n`);
  }
  function rootAfter() { isRunning = false; }
  function running() { return isRunning; }

  return {
    running,
    rootBefore,
    rootAfter,
    beforeEachTest,
    afterEachTest,
  };

})();
