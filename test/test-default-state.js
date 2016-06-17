const lightbright = require('../index.js');
const test = require('tape');
const fs = require('fs');

test('Tracing should be off by default', (t) => {
  let uncalled = true;
  lightbright.addFilter(() => (uncalled = false));
  fs.readFile('./fixture.txt', () => {
    t.ok(uncalled, 'Filter was not called.');
    t.end();
  });
});
