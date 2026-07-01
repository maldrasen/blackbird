require('./run-headless.js');

global.expect = require('chai').expect;

const Mocha = require('mocha');
const mocha = new Mocha({ ui: 'bdd', checkLeaks: true });

mocha.rootHooks({
  beforeEach: reset,
  afterEach: reset,
});

function reset() {
  Random.stubReset();
  GameState.reset();
}

require(`${ROOT}/manifest.json`).testFileList.forEach(path => {
  mocha.addFile(`${ROOT}/${path}`);
});

mocha.run(failures => { process.exitCode = failures ? 1 : 0; });
