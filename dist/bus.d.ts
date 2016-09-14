export declare type destroyFn = () => void;
export interface Messenger {
    emit(token: string, info?: any): void;
}
export interface Listener {
    on(token: string, cb: Function): destroyFn;
    once(token: string, cb: Function): void;
}
export interface Destroyer {
    off(token: string | string[]): void;
}
export declare class Bus implements Messenger, Listener, Destroyer {
    private _q;
    constructor();
    emit(token: string, info?: any): void;
    on(token: string, cb: Function): destroyFn;
    once(token: string, cb: Function): void;
    off(token: string | string[]): void;
    private _tokenNotInformedMessage(method);
    private _s4();
    private _genId();
}
