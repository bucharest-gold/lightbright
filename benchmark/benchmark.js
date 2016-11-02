'use strict';

const util = require('util');
const Benchmark = require('benchmark');
const LightBright = require('../index');
const Timing = LightBright.builtins.timing;
LightBright.addFilter(Timing.timer);
LightBright.enable();

function a () {
  util.inspect({foo: 1});
  let t = Timing.timings(); // eslint-disable-line
}

const suite = Benchmark.Suite();
suite
.add('With lightbright', a)
.on('cycle', (event) => console.log(String(event.target)))
.on('complete', () => {
  LightBright.disable();
})
.run({ 'async': true });
