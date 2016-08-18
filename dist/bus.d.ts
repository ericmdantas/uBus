export declare type event = {
    _id: string;
    token: string;
    cb: Function;
    once: boolean;
    del?: boolean;
};
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
    _q: event[];
    constructor();
    emit(token: string, info?: any): void;
    on(token: string, cb: Function): destroyFn;
    once(token: string, cb: Function): void;
    off(token: string | string[]): void;
    _s4(): string;
    _genId(): string;
}
