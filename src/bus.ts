// μBus

type event = {
  _id: string,
  token: string,
  cb: Function,
  once: boolean,
  del: boolean
}

export type destroyFn = () => void;

export interface Messenger {
  emit(token:string, info?: any):void;
}

export interface Listener {
  on(token: string, cb: Function):destroyFn;
  once(token: string, cb: Function):void;
}

export interface Destroyer {
  off(...token:string[]):void;
}

export class Bus implements Messenger, Listener, Destroyer {
  private _q: Set<event>;

  constructor() {
    this._q = new Set();
  }

  public emit(token: string, info?: any):void {
    if (!token) {
      throw new TypeError(this._invalidTokenMessage('emit'));
    }

    for (const s of this._q) {
      if (s.token === token) {
        s.cb(info);

        if (s.once) {
          this._q.delete(s);
          break;
        }
      }
    }
  }

  public on(token: string, cb: (info?:any) => void):destroyFn {
    if (!token) {
      throw new TypeError(this._invalidTokenMessage('on'));
    }

    let _id = this._genId();

    this._q.add({
      _id: _id,
      token: token,
      cb: cb,
      once: false,
      del: false
    });

    return () => {
      for (const s of this._q) {
        if (s._id === _id) {
          this._q.delete(s);
          break;
        }
      }
    }
  }

  public once(token: string, cb: Function):void {
    if (!token) {
      throw new TypeError(this._invalidTokenMessage('once'));
    }

    this._q.add({
      _id: this._genId(),
      token: token,
      cb: cb,
      once: true,
      del: false
    });
  }

  public off(...token: string[]):void {
    if ((typeof(token) === "object") && !!token.length) {
      (token as string[]).forEach((t) => {
        for (const s of this._q) {
          if (s.token === t) {
            this._q.delete(s);
          }
        }
      });
    }
  }

  private _invalidTokenMessage(method:string):string {
    return `[${method}] - Token not informed.`;
  }

  private _genId():string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
