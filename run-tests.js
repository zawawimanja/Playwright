const { exec } = require("child_process");

const tests = [
  "e2e/Prereg/NTA/test-NTA1-PK.spec.ts",
  "e2e/Prereg/NTA/test-NTA2-SCO.spec.ts",
  "e2e/Prereg/NTA/test-NTA3-SAO.spec.ts",
];

const runTest = (testPath) => {
  return new Promise((resolve, reject) => {
    console.log(`Running test: ${testPath}`); // Log the test being run
    exec(`npx playwright test ${testPath} --headed`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ${testPath}:`, stderr);
        reject(error);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
};

const runTestsSequentially = async () => {
  for (const test of tests) {
    await runTest(test);
  }
  console.log("All tests completed.");
};

runTestsSequentially().catch((error) => {
  console.error("Error running tests:", error);
});
