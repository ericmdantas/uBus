describe('μBus', () => {
  describe('creation', () => {
    it('should return a function', () => {
      expect(typeof(Bus)).toBe('function');
    });

    it('should create a new instance with an empty array in _q', () => {
      let _b = new Bus();
      expect(_b._q).toEqual([]);
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
  });

  describe('on', () => {
    
  });

  describe('once', () => {

  });

  describe('off', () => {

  });

  describe('destroyFn', () => {

  });
});
