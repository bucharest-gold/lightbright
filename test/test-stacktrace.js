'use strict';

const stackfilter = require('../lib/filters/stack-trace');
const LightBright = require('../');
const assert = require('assert');

require('clarify');

// ensure the stack filter is a function
assert.equal(typeof stackfilter, 'function');

// ensure that it's monkey patching Error
assert.equal(typeof Error.prepareStackTrace, 'function');

LightBright.addFilter(stackfilter);
LightBright.enable();

function one () {
  setTimeout(two, 50);
}

function two () {
  setTimeout(three, 50);
}

function three () {
  throw new Error('You are so deep');
}

one();

process.on('uncaughtException', (e) => {
  // console.log(e);
});
