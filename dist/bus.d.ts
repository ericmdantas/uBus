declare type event = {
    _id: string;
    token: string;
    cb: Function;
    once: boolean;
};
declare type destroyCb = () => void;
interface Messenger {
    emit(token: string, info?: any): void;
}
interface Listener {
    on(token: string, cb: Function): destroyCb;
    once(token: string, cb: Function): void;
}
interface Destroyer {
    off(token: string | string[]): void;
}
declare class Bus implements Messenger, Listener, Destroyer {
    _q: event[];
    constructor();
    emit(token: string, info?: any): void;
    on(token: string, cb: Function): destroyCb;
    once(token: string, cb: Function): void;
    off(token: string | string[]): void;
    _genId(): string;
}
