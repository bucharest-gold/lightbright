const lightbright = require('../index.js');
const assert = require('assert');
const fs = require('fs');

let didCall = false;
let accessCalled = false;

lightbright.addFilter(() => (didCall = true));
lightbright.activate();
fs.access(__filename, () => (accessCalled = true));

process.once('exit', () => {
  assert.equal(didCall, true);
  assert.equal(accessCalled, true);
});
