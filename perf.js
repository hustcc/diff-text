var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var DiffText = require('./');

suite
  .add('diff-text', function () {
    DiffText('0123456789', '0123abc789');
  })
  .on('cycle', function (e) {
    console.log('' + e.target);
  })
  .run();