const http = require('http');
const util = require('util');
const fs = require('fs');
const lightbright = require('../../');
const timing = lightbright.builtins.timing;

lightbright.addFilter(timing.timer);
lightbright.enable();

const server = http.createServer((request, response) => {
  let reply = 'Accumulated data:\n';

  // do some other async activity
  fs.readFile(__filename, () => {
    reply += util.format(timing.timings());
    response.end('OK ' + reply);
  });
});

const port = 8080;
server.listen(port, () => {
  console.log('Server listening on', port);
});
