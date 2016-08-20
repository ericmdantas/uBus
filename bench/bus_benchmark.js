const Benchmark = new require('benchmark');
const {Bus} = require('../dist/commonjs/bus.min');

let suite = new Benchmark.Suite;
let bench = new Benchmark();
let bus = new Bus();

suite.add('on', function() {
  let _fn = bus.on('yo1!', () => {});

  _fn();
})
.add('once', function() {
  bus.once('yo1!', () => {});
})
.add('off - single', function() {
  bus.on('yo1!', () => {});
  bus.off('yo1!');
})
.add('off - array', function() {
  bus.on('yo1!', () => {});
  bus.off(['yo1!']);
})
.add('emit - on', function() {
  let _fn = bus.on('yo1!', () => {});
  bus.emit('yo1!');

  _fn();
})
.add('emit - on - params', function() {
  let _fn = bus.on('yo1!', (info) => {});
  bus.emit('yo1!', {a: true});

  _fn();
})
.add('emit - once', function() {
  bus.once('yo1!', () => {});
  bus.emit('yo1!');
})
.add('emit - once - params', function() {
  bus.once('yo1!', (info) => {});
  bus.emit('yo1!', {a: true});
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.run({ 
  async: true,
  maxTime: 1
});
