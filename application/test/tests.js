global.Tests = (function() {

  // Not a great way to do this. Mocha probably has some events I could hook into instead, but just setting a few
  // timeouts that anticipate how long it's going take for mocha to load and then run all the tests is quick and
  // dirty and probably work 99% of the time. Good enough for non-production code.
  const $mochaLoadTime = 500;
  const $mochaTestTime = 100;

  let $testScrollingPanel;
  let $running = false;

  function load() {
    if (Environment.isDevelopment) {
      addTestFrame();
      loadMocha();
      runTests();

      X.onClick('#mocha li.test', () => {
        $testScrollingPanel.resize();
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

    $testScrollingPanel = ScrollingPanel({ selector:'#testFrame .scroll' });
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
        beforeEach: reset,
        afterEach: reset,
      }
    });
    mocha.checkLeaks();

    require(`${ROOT}/manifest.json`).testFileList.forEach(path => {
      require(`${ROOT}/${path}`);
    });
  }

  function reset() {
    Random.stubReset();
    Registry.clear();
  }

  function rootBefore() { $running = true; }
  function rootAfter() { $running = false; }
  function running() { return $running; }

  function runTests() {
    setTimeout(mocha.run,$mochaLoadTime);
    setTimeout(resizeReport,$mochaLoadTime + $mochaTestTime);
  }

  function resizeReport() {
    if (X('#mocha .test.fail').length > 0) {
      X.addClass('#testFrame','with-failures');
      X.addClass('#mainMenu','hide');
    }

    $testScrollingPanel.resize();
  }

  return {
    running,
    load,
  };

})();

