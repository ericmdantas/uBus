# μBus

[![Build Status](https://travis-ci.org/ericmdantas/uBus.svg?branch=master)](https://travis-ci.org/ericmdantas/uBus)
[![npm version](https://badge.fury.io/js/ubus.svg)](https://badge.fury.io/js/ubus)


### Install

```shell
$ npm i --save ubus
```


### What is this?

This is a micro implementation of a message bus in javascript - only `740 bytes when gzipped`. It was created to be light, fast and intuitive.

The API is minimal and straight forward. There's `one` class and `four` methods - nothing more, nothing less.

You can use it anywhere javascript is part of the client, like: `angular`, `electron`, `aurelia`, `vue`, etc.
And integrate it with pretty much any building tool, like: `gulp`, `webpack`, etc.

Also, there are `five` different `module loaders` for you to play with: `es2015`, `commonjs`, `systemjs`, `amd` and `umd`. Pick the one that fits your project and have fun!


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

```ts
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
    console.log(info); // logs 'wtf' when 'my-other-event' is called
  });

  bus.emit('my-event');
  bus.emit('my-other-event', 'wtf');
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
    console.log(info); // logs 'wtf' when 'my-other-event' is emitted
  });


  bus.emit('my-event'); // will trigger the event
  bus.emit('my-other-event', 'wtf'); // will trigger the event

  bus.off('my-event');
  bus.off('my-other-event', 'wtf');

  /* or
  bus.off([
    'my-event',
    'my-other-event'
  ]);
  */

  bus.emit('my-event'); // won't trigger the event, nobody listening
  bus.emit('my-other-event', 'wtf'); // won't trigger the event, nobody listening
```


#### destroy function

```ts
  let destroyFn = bus.on(token: string, cb: Function): () => void
```

```js
  let bus = new Bus();

  let _destroyMyEvent1 = bus.on('my-event', () => {
    console.log('yo!'); // logs 'yo!' when 'my-event' is called
  });

  let _destroyMyEvent2 = bus.on('my-event', () => {
    console.log('yo!'); // logs 'yo!' when 'my-event' is called
  });

  let _destroyMyOtherEvent1 = bus.on('my-other-event', (info) => {
    console.log(info); // logs 'wtf' when 'my-other-event' is called
  });

  let _destroyMyOtherEvent2 = bus.on('my-other-event', (info) => {
    console.log(info); // logs 'wtf' when 'my-other-event' is called
  });

  bus.emit('my-event'); // triggers twice, because there are two listeners
  bus.emit('my-event', 'wtf'); // triggers twice, because there are two listeners

  _destroyMyEvent1(); // only destroys the first 'my-event'
  _destroyMyOtherEvent1(); // only destroys the first 'my-other-event'

  bus.emit('my-event'); // triggers once, because one of the listeners was destroyed
  bus.emit('my-event', 'wtf'); // triggers once, because one of the listeners was destroyed

  _destroyMyEvent2(); // destroy the second 'my-event'
  _destroyMyOtherEvent2(); // destroy the second 'my-other-event'

  bus.emit('my-event'); // triggers nothing, no one listening
  bus.emit('my-event', 'wtf'); // triggers nothing, no one listening
```

### Wiki

For more information on how to integrate with existing projects, Benchmarks, FAQ, Troubleshooting and other stuff, take a look at the [wiki](https://github.com/ericmdantas/uBus/wiki).


### Inspired by

- [socket.io](https://github.com/socketio/socket.io)'s simple API;
- [angular (1.x)](https://github.com/angular/angular.js)'s implementation of `$emit/$broadcast` and `$on`;
- [minibus](https://github.com/axelpale/minibus)'s compact API.


### LICENSE

MIT
