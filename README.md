# μBus

Work in progress.

### API

#### on

```js
bus.on(token:string, callback: Function): () => void
```

```js
  let bus = new Bus();

  bus.on('my-event', () => {
    console.log('yo!'); // logs: 'yo!' every time this Bus instance emits 'my-event'
  });

  bus.on('my-other-event', (info) => {
    console.log(info); // logs: info every time this Bus instance emits 'my-other-event'
  });
```

#### once

```js
bus.once(token:string, callback: Function):void
```

```js
  let bus = new Bus();

  bus.once('my-event', () => {
    console.log('yo!'); // logs: 'yo!' only once per bus instance
  });

  bus.once('my-other-event', (info) => {
    console.log(info); // logs: 'yo!' only once per bus instance
  });
```


#### emit

```js
bus.emit(token:string, info?: any):void
```

```js
  let bus = new Bus();

  bus.on('my-event', () => {
    console.log('yo!'); // logs: 'yo!'
  });

  bus.on('my-other-event', (info) => {
    console.log(info); // logs: 'wtf'
  });

  bus.emit('my-event');
  bus.emit('my-other-event', 'wtf');
```

#### off

```js
bus.off(token: string | string[]):void
```

```js
  let bus = new Bus();

  bus.on('my-event', () => {
    console.log('yo!'); // logs: 'yo!'
  });

  bus.on('my-other-event', (info) => {
    console.log(info); // logs: 'wtf'
  });

  bus.emit('my-event');
  bus.emit('my-other-event', 'wtf');

  bus.off('my-event');
  bus.off('my-other-event', 'wtf');

  // or

  bus.off([
    'my-event',
    'my-other-event'
  ]);
```


#### destroy function

```js
let destroyFn = bus.on(token:string, cb: Function): () => void
```

```js
  let bus = new Bus();

  let _destroyMyEvent = bus.on('my-event', () => {
    console.log('yo!'); // logs: 'yo!'
  });

  let _destroyMyOtherEvent = bus.on('my-other-event', (info) => {
    console.log(info); // logs: 'wtf'
  });

  _destroyMyEvent();
  _destroyMyOtherEvent();
```
