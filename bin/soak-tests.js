// Runs the test suite over and over to flush out flaky specs, stopping at the first failing run and dumping that
// run's full output, which includes the failing spec's Random seed for reproduction.
// Usage: node bin/soak-tests.js [runs] [--grep "<spec title>"]

const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const grepIndex = args.indexOf('--grep');
const grep = grepIndex === -1 ? null : args.splice(grepIndex, 2)[1];
const runs = Number(args[0] || 100);

const childArgs = [`${__dirname}/run-tests.js`];
if (grep != null) { childArgs.push('--grep', grep); }

for (let i = 1; i <= runs; i++) {
  const result = spawnSync('node', childArgs, { encoding:'utf8' });
  const output = `${result.stdout}${result.stderr}`;

  if (result.status !== 0) {
    console.log(output);
    console.log(`=== Run ${i} of ${runs} failed ===`);
    process.exit(1);
  }

  const summary = output.match(/\d+ passing.*/);

  if (i === 1 && grep != null && summary && summary[0].startsWith('0 passing')) {
    console.log(`--grep "${grep}" matched no specs`);
    process.exit(1);
  }

  console.log(`Run ${i}: ${summary ? summary[0] : 'passed'}`);
}

console.log(`=== All ${runs} runs passed ===`);
