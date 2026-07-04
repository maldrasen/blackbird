require('./run-headless.js');

global.expect = require('chai').expect;

const Mocha = require('mocha');
const mocha = new Mocha({ ui: 'bdd', checkLeaks: true });

mocha.rootHooks({
  beforeAll: Tests.rootBefore,
  afterAll: Tests.rootAfter,
  beforeEach: Tests.beforeEachTest,
  afterEach: Tests.afterEachTest,
});

// Usage: SEED=<seed> node bin/run-tests.js --grep "<spec title>" to reproduce a spec that failed with a given seed.
const grepIndex = process.argv.indexOf('--grep');
if (grepIndex !== -1) { mocha.grep(process.argv[grepIndex + 1]); }

require(`${ROOT}/manifest.json`).testFileList.forEach(path => {
  mocha.addFile(`${ROOT}/${path}`);
});

mocha.run(failures => { process.exitCode = failures ? 1 : 0; });
