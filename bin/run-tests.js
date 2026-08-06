// Usage: bin/test.sh [--grep "<spec title>"] [--seed <seed>] [--seeds <seed,seed,...>] [--quiet]
//   --grep   only run specs whose title matches
//   --seed   run with a fixed seed to reproduce a failure
//   --seeds  run once per seed, printing a one-line summary for each run
//   --quiet  print only the summary lines; a failing run still dumps its full output
// Repeated random-seed runs to flush out flaky specs are handled by bin/soak-tests.js instead.

const args = parseArgs(process.argv);

if (args.seeds.length > 0 || args.quiet) {
  process.exitCode = runBatch(args);
} else {
  runMocha(args);
}

function parseArgs(argv) {
  const valueOf = flag => {
    const index = argv.indexOf(flag);
    return index === -1 ? null : argv[index + 1];
  };

  return {
    grep: valueOf('--grep'),
    seed: valueOf('--seed'),
    seeds: (valueOf('--seeds') || '').split(',').filter(seed => seed.length > 0),
    quiet: argv.includes('--quiet'),
  };
}

function runBatch(args) {
  const { spawnSync } = require('child_process');
  const seeds = args.seeds.length > 0 ? args.seeds : [args.seed];
  let failures = 0;

  for (const seed of seeds) {
    const childArgs = [__filename];
    if (args.grep != null) { childArgs.push('--grep', args.grep); }
    if (seed != null) { childArgs.push('--seed', seed); }

    const result = spawnSync('node', childArgs, { encoding:'utf8' });
    const output = `${result.stdout}${result.stderr}`;
    const label = seed == null ? 'Run' : `Seed ${seed}`;

    if (result.status !== 0) {
      failures += 1;
      console.log(output);
      console.log(`=== ${label}: FAILED ===`);
      continue;
    }

    const summary = output.match(/\d+ (passing|pending|failing).*/g) || ['passed'];
    console.log(`${label}: ${summary.join(', ')}`);
  }

  return failures ? 1 : 0;
}

function runMocha(args) {
  if (args.seed != null) { process.env.SEED = args.seed; }

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

  if (args.grep != null) { mocha.grep(args.grep); }

  require(`${ROOT}/manifest.json`).testFileList.forEach(path => {
    mocha.addFile(`${ROOT}/${path}`);
  });

  mocha.run(runFailures => { process.exitCode = runFailures ? 1 : 0; });
}
