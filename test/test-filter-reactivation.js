const lightbright = require('../index.js');
const assert = require('assert');
const fs = require('fs');

let called = 0;
let accessOneCalled = false;
let accessTwoCalled = false;
const didCall = () => (called += 1);

lightbright.addFilter(didCall);
lightbright.activate();

fs.access(__filename, () => {
  const expected = called;
  accessOneCalled = true;
  assert.equal(called, 2, 'Expect init and pre hooks to have been called');

  // deactivate hooks
  lightbright.deactivate();
  fs.access(__filename, () => {
    // hooks called should not be changed
    assert.equal(called, expected, 'Filter should not be called');

    // reactivate hooks
    lightbright.addFilter(didCall);
    lightbright.activate();

    fs.access(__filename, () => (accessTwoCalled = true));
  });
});

process.once('exit', () => {
  assert.equal(accessOneCalled, true, 'Callback one not called');
  assert.equal(accessTwoCalled, true, 'Callback two not called');
  assert.equal(called, 6, 'Async hooks called unexpectedly: ' + called);
});
