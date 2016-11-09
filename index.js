'use strict';

const LightBright = require('./lib/trace_hooks');
LightBright.builtins = {
  timing: require('./lib/filters/timing'),
  stacktrace: require('./lib/filters/stack-trace')
};

module.exports = exports = LightBright;
