const { runCLI } = require('jest');

// Custom wrapper to keep central pipeline args from turning test paths into
// extra coverageReporters (e.g., "--coverageReporters=json-summary tests/unit").
(async () => {
  const rawArgs = process.argv.slice(2);

  const options = {
    coverageReporters: ['text', 'lcov', 'json-summary'],
    runInBand: true,
    $0: 'jest',
  };

  const testPaths = [];

  for (const arg of rawArgs) {
    if (arg.startsWith('--coverageReporters=')) {
      // ignore externally supplied coverage reporters; use our config
      continue;
    }
    if (arg === '--coverage') {
      options.coverage = true;
      continue;
    }
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      options[key] = value ?? true;
      continue;
    }
    testPaths.push(arg);
  }

  if (testPaths.length) {
    options.testPathPattern = testPaths;
  }

  const { results } = await runCLI(options, [process.cwd()]);
  process.exit(results.success ? 0 : 1);
})();
