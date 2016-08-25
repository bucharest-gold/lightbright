'use strict';

const lightbright = require('../index.js');
const assert = require('assert');
const fs = require('fs');

let called = 0;
let expected = 0;
let accessCalled = true;
const didCall = () => (called += 1);

lightbright.addFilter(didCall);
lightbright.enable();

fs.access(__filename, () => {
  assert.equal(called, 2, 'Expected init and pre hooks to have been called');
  expected = called;
  lightbright.disable();
  fs.readFile('./fixture.txt', () => (accessCalled = true));
});

process.once('exit', () => {
  assert.equal(accessCalled, true, 'Callback not called');
  assert.equal(called, expected, 'Async hooks called unexpectedly');
});
