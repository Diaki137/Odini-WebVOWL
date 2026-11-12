// This file is the entry point for all tests but i think it's not needed

// Import all test files
const testsContext = require.context('./', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);
