const http = require('http');
const util = require('util');
const fs = require('fs');
const LightBright = require('../../');
const Timing = LightBright.builtins.timing;

LightBright.addFilter(Timing.timer);
LightBright.enable();

const server = http.createServer((request, response) => {
  // do some other async activity
  fs.readFile(__filename, () => {
    response.end(util.format(Timing.timings()));
  });
});

const port = 8080;
server.listen(port, () => {
  console.log('Server listening on', port);
});
