const lightbright = require('../index.js');
const assert = require('assert');
const fs = require('fs');

let didThrow = false;

const didThrowFilter = function didThrowFilter (record) {
  didThrow = record.step === 'post' && record.handle.didThrow;
};

lightbright.addFilter(didThrowFilter);
lightbright.enable();
fs.access(__filename, () => { throw Error('Test exception'); });

process.on('uncaughtException', () => {
  // simply allow the process to gracefully exit,
  // therefore hitting the 'post' step of our filter.
});

process.on('exit', () => {
  assert.equal(didThrow, true);
});
