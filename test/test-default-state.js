'use strict';

const lightbright = require('../index.js');
const assert = require('assert');
const fs = require('fs');

let uncalled = true;
let accessCalled = false;

lightbright.addFilter(() => (uncalled = false));
fs.access(__filename, () => (accessCalled = true));

process.once('exit', () => {
  assert.equal(uncalled, true, 'Filter should not be called');
  assert.equal(accessCalled, true, 'Callback should be executed');
});
