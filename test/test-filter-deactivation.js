const lightbright = require('../index.js');
const test = require('tape');
const fs = require('fs');

test('Disabling lightbright should deactivate filters', (t) => {
  let called = 0;
  const didCall = () => (called += 1);

  lightbright.addFilter(didCall);
  lightbright.activate();

  fs.readFile('./fixture.txt', () => {
    // TODO: Is this a bug? Here? In async-wrap?
    // I think this is a bit ugly, but once a set of hooks has been
    // put into action, they will complete, even if deactivate() has
    // been called. Add 2 to the expected count - one for this callback
    // function, and one for the outermost fs.readFile.
    const expected = called + 2;
    t.ok(called > 1, 'Filter was called');
    lightbright.deactivate();
    fs.readFile('./fixture.txt', () => {
      t.equal(called, expected, 'Filter was not called');
      t.end();
    });
  });
});
