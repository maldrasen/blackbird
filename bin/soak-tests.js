// Runs the test suite over and over to flush out flaky specs, stopping at the first failing run and dumping that
// run's full output, which includes the failing spec's Random seed for reproduction.
// Usage: node bin/soak-tests.js [runs]

const { spawnSync } = require('child_process');
const runs = Number(process.argv[2] || 1000);

for (let i = 1; i <= runs; i++) {
  const result = spawnSync('node', [`${__dirname}/run-tests.js`], { encoding:'utf8' });
  const output = `${result.stdout}${result.stderr}`;

  if (result.status !== 0) {
    console.log(output);
    console.log(`=== Run ${i} of ${runs} failed ===`);
    process.exit(1);
  }

  const summary = output.match(/\d+ passing.*/);
  console.log(`Run ${i}: ${summary ? summary[0] : 'passed'}`);
}

console.log(`=== All ${runs} runs passed ===`);
