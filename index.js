'use strict';

const LightBright = require('./lib/trace_hooks');
LightBright.builtins = {
  timing: require('./lib/filters/timing')
};

module.exports = exports = LightBright;