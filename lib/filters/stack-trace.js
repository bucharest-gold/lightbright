'use strict';

const chain = require('stack-chain');
const stackFormatter = require('./format.js');
const records = new WeakMap();
let currentStack = null;

Error.prepareStackTrace = function prepareStackTrace (err, stack) {
  if (currentStack) stack.push.apply(stack, currentStack);
  err.rawStack = stack;
  return stackFormatter(err, stack);
};

function getCallSites (skip) {
  const limit = Error.stackTraceLimit;

  Error.stackTraceLimit = limit + skip;
  const stack = chain.callSite({
    extend: false,
    filter: true,
    slice: skip
  });
  Error.stackTraceLimit = limit;
  return stack;
}

function tracer (record) {
  switch (record.step) {
    case 'init': {
      records.set(record.handle, getCallSites(6));
      break;
    }
    case 'pre': {
      currentStack = records.get(record.handle);
      break;
    }
    case 'post': {
      currentStack = null;
      break;
    }
  }
}

module.exports = exports = tracer;
