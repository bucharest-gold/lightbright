const lightbright = require('../index.js');
const test = require('tape');
const fs = require('fs');

test('Enabling lightbright should activate filters', (t) => {
  let didCall = false;
  lightbright.addFilter(() => (didCall = true));
  lightbright.activate();
  fs.readFile('./fixture.txt', () => {
    t.ok(didCall, 'Filter was called');
    t.end();
  });
});
