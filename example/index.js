const http = require('http');
const util = require('util');
const lightbright = require('../');
const fs = require('fs');

// Note: this is very leaky and a bad example
// TODO: Fix me
const trace = new Map();

lightbright.addFilter((record) => {
  fs.writeSync(1, util.inspect(record));
  if (record.step === 'init') {
    trace.set(record.handle, []);
  } else if (trace.has(record.handle)) {
    trace.get(record.handle).push(record);
  }
});
lightbright.enable();

const server = http.createServer((request, response) => {
  const delay = Math.random() * 1000;
  setTimeout(() => {
    let reply = 'Accumulated data:\n';
    reply += util.inspect(trace);
    response.end('OK ' + reply);
  }, delay);
});

server.listen(8080, () => console.log('Server listening'));
