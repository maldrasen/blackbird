global.Tests = (function() {

  // Not a great way to do this. Mocha probably has some events I could hook into instead, but just setting a few
  // timeouts that anticipate how long it's going take for mocha to load and then run all the tests is quick and
  // dirty and probably work 99% of the time. Good enough for non-production code.
  const mochaLoadTime = 500;
  const mochaTestTime = 100;

  let testScrollingPanel;
  let isRunning = false;
  let currentSeed;

  function load() {
    if (Environment.isDevelopment) {
      addTestFrame();
      loadMocha();
      runTests();

      X.onClick('#mocha li.test', () => {
        testScrollingPanel.resize();
      });
    }
  }

  function addTestFrame() {
    const testFrame = X.createElement(`
      <div id='testFrame'>
        <div class='header'></div>
        <div class='scroll'>
          <div id="mocha"></div>
        </div>
      </div>`);

    X.first('#mainContent').appendChild(testFrame);

    testScrollingPanel = ScrollingPanel({ selector:'#testFrame .scroll' });
  }

  function loadMocha() {
    MainContent.addStylesheet(`${ROOT}/node_modules/mocha/mocha.css`);
    require(`${ROOT}/node_modules/mocha/mocha.js`);

    global.expect = require(`${ROOT}/node_modules/chai/chai.js`).expect;

    mocha.setup({
      ui:'bdd',
      rootHooks: {
        beforeAll: rootBefore,
        afterAll: rootAfter,
        beforeEach: beforeEachTest,
        afterEach: afterEachTest,
      }
    });
    mocha.checkLeaks();

    require(`${ROOT}/manifest.json`).testFileList.forEach(path => {
      require(`${ROOT}/${path}`);
    });
  }

  function reset() {
    Random.stubReset();
    GameSystem.reset();
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

  function runTests() {
    setTimeout(mocha.run,mochaLoadTime);
    setTimeout(resizeReport,mochaLoadTime + mochaTestTime);
  }

  function resizeReport() {
    if (X.all('#mocha .test.fail').length > 0) {
      X.addClass('#testFrame','with-failures');
      X.addClass('#mainMenu','hide');
    }

    testScrollingPanel.resize();
  }

  return {
    running,
    rootBefore,
    rootAfter,
    reset,
    beforeEachTest,
    afterEachTest,
    load,
  };

})();

