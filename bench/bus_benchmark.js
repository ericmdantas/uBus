const Benchmark = new require('benchmark');
const {Bus} = require('../dist/commonjs/bus.min');

let suite = new Benchmark.Suite;
let bench = new Benchmark();
let bus1 = new Bus();
let bus2 = new Bus();

suite.add('on', function() {
  bus1.on('yo1!', () => {});
})
.add('once', function() {
  bus2.on('yo2!', () => {});
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is: ' + this.filter('fastest').map('name'));
})
.run({ 
  async: true,
  maxTime: 1
});