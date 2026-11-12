GUIDE TO TESTING 


## Setup Testing Environment

1. Install Node.js
   - Download from nodejs.org (v18 recommended)
   - Verify installation with `node -v` and `npm -v`

2. Clone the Repository
   git clone https://github.com/your-org/webvowl-odini-webvowl_update.git
   cd webvowl-odini-webvowl_update

3. Install Dependencies
   npm install

## Also for now do:

   npm install --save-dev babel-loader
   
Since babel-loader had a problem loading on my machine

## Running Existing Tests

1. Run the Development Server (for manual testing)
   npm run serve
   - This starts a development server at http://localhost:8080
   - Use this to manually verify the application works correctly

2. Execute the Test Suite
   npm test


## Creating New Tests

1. Test File Location
   - All tests should be placed in `test/unit/` directory
   - Use `.spec.js` extension for test files

2. Basic Test Structure
   describe('Component Name', function() {
       it('should do something specific', function() {
           // Test code
           expect(actualValue).toBe(expectedValue);
       });
   });

3. Example Tests

   - Version Test
     describe('WebVOWL Version', function() {
         it('should be updated to version 1.3.9', function() {
             const pkg = require('../../package.json');
             expect(pkg.version).toBe("1.3.9");
         });
     });

   - Feature Test
     describe('Feature Name', function() {
         it('should behave correctly', function() {
             // Test specific behavior
             expect(true).toBe(true); // Replace with actual test
         });
     });

4. Jasmine Testing Features
   - Use `describe()` for test groups
   - Use `it()` for individual tests
   - Use `expect().toBe()` for assertions
   - Use `beforeEach()` for setup code
   - Use `afterEach()` for teardown code

## Common Issues & Solutions

1. Module Import Errors
   - Add `/* global describe, it, expect */` at the top of test files
   - Install types: `npm install --save-dev @types/jasmine`

2. Dependency Issues
   - If you get "package not found" errors:
     npm install --save-dev missing-package-name

3. Test Execution Errors
   - Check browser compatibility (tests use ChromeHeadless)
   - Verify webpack configuration in karma.conf.js

## Testing Strategy

1. Automated Tests
   - Version verification
   - Core functionality tests
   - Component tests

2. Manual Testing
   - Visual elements and rendering
   - User interactions
   - Performance testing
   - Cross-browser compatibility

## Key Files

- test/karma.conf.js - Test runner configuration
- test/unit/*.spec.js - Test files
- package.json - Dependencies and scripts