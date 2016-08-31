# μBus

[![Build Status](https://travis-ci.org/ericmdantas/uBus.svg?branch=master)](https://travis-ci.org/ericmdantas/uBus)
[![npm version](https://badge.fury.io/js/ubus.svg)](https://badge.fury.io/js/ubus)


### Install

```shell
$ npm i --save ubus
```


### What is this?

μBus, as the name suggests, is a micro implementation of a light, fast and intuitive message bus/event emitter in javascript - it's only `740 bytes when gzipped`.

The API is minimal and straight forward. There's `one` class and `four` methods - nothing more, nothing less.

You can use it anywhere javascript is being used, both server and client.

Given there are a lot of different projects out there, `μBus` has `five` different `module loaders` for you to play with:

- `es2015`;
- `commonjs`; 
- `systemjs`;
- `amd`;
- `umd`. 

Pick the one that fits your project and have fun!


### API

#### on

```ts
  bus.on(token: string, callback: Function): () => void
```

```js
  let bus = new Bus();

  bus.on('my-event', () => {
    console.log('yo!'); // logs 'yo!' every time this Bus instance emits 'my-event'
  });

  bus.on('my-other-event', (info) => {
    console.log(info); // logs info every time this Bus instance emits 'my-other-event'
  });
```

#### once

```ts
  bus.once(token: string, callback: Function):void
```

```js
  let bus = new Bus();

  bus.once('my-event', () => {
    console.log('yo!'); // logs 'yo!' only once per bus instance
  });

  bus.once('my-other-event', (info) => {
    console.log(info); // logs 'yo!' only once per bus instance
  });
```


#### emit

```ts
  bus.emit(token: string, info?: any):void
```

```js
  let bus = new Bus();

  bus.on('my-event', () => {
    console.log('yo!'); // logs 'yo!' when 'my-event' is called
  });

  bus.on('my-other-event', (info) => {
    console.log(info); // logs { yo: true } when 'my-other-event' is called
  });

  bus.emit('my-event');
  bus.emit('my-other-event', { yo: true });
```

#### off

```ts
  bus.off(token: string | string[]):void
```

```js
  let bus = new Bus();

  bus.on('my-event', () => {
    console.log('yo!'); // logs 'yo!' when 'my-event' is emitted
  });

  bus.on('my-other-event', (info) => {
    console.log(info); // logs { yo: true } when 'my-other-event' is emitted
  });


  bus.emit('my-event'); // will trigger the event
  bus.emit('my-other-event', { yo: true }); // will trigger the event

  bus.off('my-event');
  bus.off('my-other-event');

  /* or
  bus.off([
    'my-event',
    'my-other-event'
  ]);
  */

  bus.emit('my-event'); // won't trigger the event, nobody listening
  bus.emit('my-other-event', { yo: true }); // won't trigger the event, nobody listening
```


#### destroy function

```ts
  let destroyFn = bus.on(token: string, cb: Function): () => void
```

```js
  let bus = new Bus();

  let _destroyMyEvent = bus.on('my-event', () => {
    console.log('yo!'); // logs 'yo!' when 'my-event' is called
  });

  let _destroyMyOtherEvent = bus.on('my-other-event', (info) => {
    console.log(info); // logs { yo: true } when 'my-other-event' is called
  });

  bus.emit('my-event'); // triggers the event
  bus.emit('my-other-event', { yo: true }); // triggers the event

  _destroyMyEvent(); // destroys 'my-event'
  _destroyMyOtherEvent(); // destroys 'my-other-event'

  bus.emit('my-event'); // triggers nothing, no one listening
  bus.emit('my-other-event', { yo: true }); // triggers nothing, no one listening
```

### Wiki

For more information on how to integrate with existing projects, Benchmarks, FAQ, Troubleshooting and other stuff, take a look at the [wiki](https://github.com/ericmdantas/uBus/wiki).


### Inspired by

- [Node.js](https://github.com/nodejs/node)'s EventEmitter.
- [socket.io](https://github.com/socketio/socket.io)'s simple API;
- [angular (1.x)](https://github.com/angular/angular.js)'s implementation of `$emit/$broadcast` and `$on`;
- [minibus](https://github.com/axelpale/minibus)'s compact API.


### LICENSE

MIT
