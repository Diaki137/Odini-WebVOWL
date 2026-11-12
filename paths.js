//switched to commonjs syntax from ES6

"use strict";
// BEFORE:
// export const path_func = new (function () {...})();

// AFTER - Convert to CommonJS:
exports.path_func = new (function () {
  // General stuff
  this.srcPath = "src";

  // Deploy
  this.deployPath = "deploy";

  // JS/CSS/HTML
  this.frontendPath = `${this.srcPath}/app`;
})();

// OR alternatively:
// module.exports.path_func = new (function () {...})();