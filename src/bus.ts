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
  off(token: string | string[]):void;
}

export class Bus implements Messenger, Listener, Destroyer {
  private _q: event[];

  constructor() {
    this._q = [];
  }

  public emit(token: string, info?: any):void {
    if (!token) {
      throw new TypeError(this._invalidTokenMessage('emit'));
    }

    for (let i = 0, len = this._q.length; i < len; i++) {
      if (this._q[i].token === token) {
        this._q[i].cb(info);

        if (this._q[i].once) {
          this._q.splice(i, 1);
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

    this._q.push({
      _id: _id,
      token: token,
      cb: cb,
      once: false,
      del: false
    });

    return () => {
      for (let i = 0, len = this._q.length; i < len; i++) {
        if (this._q[i]._id === _id) {
          this._q.splice(i, 1);
          break;
        }
      }
    }
  }

  public once(token: string, cb: Function):void {
    if (!token) {
      throw new TypeError(this._invalidTokenMessage('once'));
    }

    this._q.push({
      _id: this._genId(),
      token: token,
      cb: cb,
      once: true,
      del: false
    });
  }

  public off(token: string | string[]):void {
    if (typeof(token) === "string") {
        for (let i = 0, len = this._q.length; i < len; i++) {
          if (this._q[i].token === token) {
            this._q[i].del = true;
          }
        }
    }

    if ((typeof(token) === "object") && !!token.length) {
      (token as string[]).forEach((t) => {
        for (let i = 0, len = this._q.length; i < len; i++) {
          if (this._q[i].token === t) {
            this._q[i].del = true;
          }
        }
      });
    }

    this._q = this._q.filter((item) => !item.del);
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
