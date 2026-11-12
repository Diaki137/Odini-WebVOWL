// Will almost always return True :P unless we updated again

describe('WebVOWL Version', function() {
    it('should be updated to version 1.3.9', function() {
        const pkg = require('../../package.json');
        expect(pkg.version).toBe("1.3.9");
    });
});