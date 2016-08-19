import {Bus} from './bus';

describe('μBus', () => {
  describe('creation', () => {
    it('should return a function', () => {
      expect(typeof(Bus)).toBe('function');
    });
  });

  describe('emit', () => {
    it('should call the onCb with no info param - different tokens', () => {
      let _b = new Bus();
      let _called = false;

      _b.on('a', () => {
        _called = true;
      });

      _b.emit('a1');

      expect(_called).toBe(false);
    });

    it('should call the onCb with no info param', () => {
      let _b = new Bus();
      let _called = false;

      _b.on('a', () => {
        _called = true;
      });

      _b.emit('a');

      expect(_called).toBe(true);
    });

    it('should call the onCb with the info', () => {
      let _b = new Bus();
      let _calledInfo = null;
      let _calledWith = {
        a: true
      };

      _b.on('a', (info) => {
        _calledInfo = info;
      });

      _b.emit('a', _calledWith);

      expect(_calledInfo).toBe(_calledWith);
    });

    it('should satisfy multiple subs', () => {
      let _bus = new Bus();
      let _sub1 = 0;
      let _sub2 = 0;
      let _sub3 = 0;

      _bus.on('a', () => {
          _sub1 = 1;
      });

      _bus.on('a', () => {
          _sub2 = 2;
      })

      _bus.on('a', () => {
          _sub3 = 3;
      })

      _bus.emit('a');

      expect(_sub1).toBe(1);
      expect(_sub2).toBe(2);
      expect(_sub3).toBe(3);
    })
  });

  describe('on', () => {
    it('should not call the onCb with - nothing emitted yet', () => {
      let _b = new Bus();
      let _called = false;

      _b.on('a', () => {
        _called = true;
      });

      expect(_called).toBe(false);
    });

    it('should not call the onCb with - different token called', () => {
      let _b = new Bus();
      let _called = false;

      _b.on('a', () => {
        _called = true;
      });

      _b.emit('a1');

      expect(_called).toBe(false);
    });

    it('should call the onCb with no info param', () => {
      let _b = new Bus();
      let _called = false;

      _b.on('a', () => {
        _called = true;
      });

      _b.emit('a');

      expect(_called).toBe(true);
    });

    it('should call the onCb with no info param - called more than once', () => {
      let _b = new Bus();
      let _calledCount = 0;

      _b.on('a', () => {
        _calledCount += 1;
      });

      _b.emit('a');
      _b.emit('a');
      _b.emit('a');
      _b.emit('a');
      _b.emit('a');

      expect(_calledCount).toBe(5);
    });

    it('should call the onCb with the info', () => {
      let _b = new Bus();
      let _calledInfo = null;
      let _calledWith = {
        a: true
      };

      _b.on('a', (info) => {
        _calledInfo = info;
      });

      _b.emit('a', _calledWith);

      expect(_calledInfo).toBe(_calledWith);
    });

    it('should call the onCb with the info - called multiple times', () => {
      let _b = new Bus();
      let _calledInfo = null;
      let _calledWith = {
        a: true
      };
      let _calledCount = 0;

      _b.on('a', (info) => {
        _calledInfo = info;
        _calledCount += 1;
      });

      _b.emit('a', _calledWith);
      _b.emit('a', _calledWith);
      _b.emit('a', _calledWith);
      _b.emit('a', _calledWith);
      _b.emit('a', _calledWith);

      expect(_calledInfo).toBe(_calledWith);
      expect(_calledCount).toBe(5);
    });

    it('should pass the function around', () => {
      let _b = new Bus();
      let _called = false;

      let _fn = () => _called = true;

      _b.on('call-fn', (fn) => {
        fn();
      });

      _b.emit('call-fn', _fn);

      expect(_called).toBe(true);
    })
  });

  describe('once', () => {
    it('should not call the onCb with - nothing emitted yet', () => {
      let _b = new Bus();
      let _called = false;

      _b.once('a', () => {
        _called = true;
      });

      expect(_called).toBe(false);
    });

    it('should not call the onCb with - different token called', () => {
      let _b = new Bus();
      let _called = false;

      _b.once('a', () => {
        _called = true;
      });

      _b.emit('a1');

      expect(_called).toBe(false);
    });

    it('should call the onCb with no info param - only once', () => {
      let _b = new Bus();
      let _calledCount = 0;

      _b.once('a', () => {
        _calledCount += 1;
      });

      _b.emit('a');

      expect(_calledCount).toBe(1);
    });

    it('should call the onCb with no info param - only once', () => {
      let _b = new Bus();
      let _calledCount = 0;

      _b.once('a', () => {
        _calledCount += 1;
      });

      _b.emit('a');
      _b.emit('a');
      _b.emit('a');
      _b.emit('a');
      _b.emit('a');

      expect(_calledCount).toBe(1);
    });

    it('should call the onCb with the info', () => {
      let _b = new Bus();
      let _calledInfo = null;
      let _calledWith = {
        a: true
      };

      _b.on('a', (info) => {
        _calledInfo = info;
      });

      _b.emit('a', _calledWith);

      expect(_calledInfo).toBe(_calledWith);
    });

    it('should satisfy only one', () => {
      let _bus = new Bus();
      let _sub1 = 0;
      let _sub2 = 0;
      let _sub3 = 0;

      _bus.once('a', () => {
          _sub1 = 1;
      });

      _bus.once('a', () => {
          _sub2 = 2;
      })

      _bus.once('a', () => {
          _sub3 = 3;
      })

      _bus.emit('a');

      expect(_sub1).toBe(1);
      expect(_sub2).toBe(0);
      expect(_sub3).toBe(0);
    })

    it('should pass the function around', () => {
      let _b = new Bus();
      let _called = false;

      let _fn = () => _called = true;

      _b.once('call-fn', (fn) => {
        fn();
      });

      _b.emit('call-fn', _fn);

      expect(_called).toBe(true);
    })
  });

  describe('destroyFn', () => {
    it('should destroy the event for that given sub', () => {
      let _bus = new Bus();
      let _sub1 = 0;
      let _sub2 = 0;
      let _sub3 = 0;

      let _destroyFn1 = _bus.on('a', (info) => {
          _sub1 = info;
      });

      let _destroyFn2 = _bus.on('a', (info) => {
          _sub2 = info;
      })

      let _destroyFn3 = _bus.on('a', (info) => {
          _sub3 = info;
      })

      _bus.emit('a', 1);

      expect(_sub1).toBe(1);
      expect(_sub2).toBe(1);
      expect(_sub3).toBe(1);

      _destroyFn1();

      _bus.emit('a', 2);

      expect(_sub1).toBe(1);
      expect(_sub2).toBe(2);
      expect(_sub3).toBe(2);

      _destroyFn2();

      _bus.emit('a', 3);

      expect(_sub1).toBe(1);
      expect(_sub2).toBe(2);
      expect(_sub3).toBe(3);

      _destroyFn3();

      _bus.emit('a', 4);

      expect(_sub1).toBe(1);
      expect(_sub2).toBe(2);
      expect(_sub3).toBe(3);
    })
  });

  describe('off', () => {
    it('should clean all the given tokens from the queue - single token', () => {
      let _b = new Bus();
      let _sub1 = 0;
      let _sub2 = 0;
      let _sub3 = 0;

      _b.on('a', (info) => {
        _sub1 = info;
      })

      _b.on('a', (info) => {
        _sub2 = info;
      })

      _b.on('a', (info) => {
        _sub3 = info;
      })

      _b.emit('a', 3);

      expect(_sub1).toBe(3);
      expect(_sub2).toBe(3);
      expect(_sub3).toBe(3);

      _b.off('a');

      _b.emit('a', 999);

      expect(_sub1).toBe(3);
      expect(_sub2).toBe(3);
      expect(_sub3).toBe(3);
    })

    it('should clean all the given tokens from the queue - array of tokens, still one', () => {
      let _b = new Bus();
      let _sub1 = 0;
      let _sub2 = 0;
      let _sub3 = 0;

      _b.on('a', (info) => {
        _sub1 = info;
      })

      _b.on('a', (info) => {
        _sub2 = info;
      })

      _b.on('a', (info) => {
        _sub3 = info;
      })

      _b.emit('a', 3);

      expect(_sub1).toBe(3);
      expect(_sub2).toBe(3);
      expect(_sub3).toBe(3);

      _b.off(['a']);

      _b.emit('a', 999);

      expect(_sub1).toBe(3);
      expect(_sub2).toBe(3);
      expect(_sub3).toBe(3);
    })

    it('should clean all the given tokens from the queue - array of tokens, more than one', () => {
      let _b = new Bus();

      let _suba1 = 0;
      let _suba2 = 0;
      let _suba3 = 0;

      let _subb1 = 0;
      let _subb2 = 0;
      let _subb3 = 0;

      let _subc1 = 0;
      let _subc2 = 0;
      let _subc3 = 0;

      _b.on('a', (info) => {
        _suba1 = info;
      })

      _b.on('a', (info) => {
        _suba2 = info;
      })

      _b.on('a', (info) => {
        _suba3 = info;
      })

      _b.on('b', (info) => {
        _subb1 = info;
      })

      _b.on('b', (info) => {
        _subb2 = info;
      })

      _b.on('b', (info) => {
        _subb3 = info;
      })

      _b.on('c', (info) => {
        _subc1 = info;
      })

      _b.on('c', (info) => {
        _subc2 = info;
      })

      _b.on('c', (info) => {
        _subc3 = info;
      })

      _b.emit('a', 1);

      expect(_suba1).toBe(1);
      expect(_suba2).toBe(1);
      expect(_suba3).toBe(1);

      _b.emit('b', 2);

      expect(_subb1).toBe(2);
      expect(_subb2).toBe(2);
      expect(_subb3).toBe(2);

      _b.emit('c', 3);

      expect(_subc1).toBe(3);
      expect(_subc2).toBe(3);
      expect(_subc3).toBe(3);

      _b.off(['a', 'c']);

      _b.emit('a', 777);

      expect(_suba1).toBe(1);
      expect(_suba2).toBe(1);
      expect(_suba3).toBe(1);

      _b.emit('b', 888);

      expect(_subb1).toBe(888);
      expect(_subb2).toBe(888);
      expect(_subb3).toBe(888);

      _b.emit('c', 999);

      expect(_subc1).toBe(3);
      expect(_subc2).toBe(3);
      expect(_subc3).toBe(3);
    })
  });
});
