'use strict';

const util = require('util');
const Benchmark = require('benchmark');

function a () {
  util.inspect({foo: 1});
}

const suite = Benchmark.Suite();
suite
.add('Without lightbright', a)
.on('cycle', (event) => console.log(String(event.target)))
.on('complete', () => { })
.run({ 'async': true });
