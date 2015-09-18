export declare function ajax(): XMLHttpRequest;
export declare function uniqueId(prefix?: string): string;
export declare function proxy(from: any, to: any, fns: any): void;
export declare function bind<T extends Function>(method: T, context: any, ...args: any[]): T;
export declare function callFunc(fn: Function, ctx: any, args?: any[]): any;
export declare function equal(a: any, b: any): boolean;
export declare function triggerMethodOn(obj: any, eventName: string, args?: any[]): void;
export declare function getOption(option: string, objs: any[]): any;
export declare function inherits<T extends FunctionConstructor>(parent: T, protoProps: Object, staticProps?: Object): T;
export declare const nextTick: (fn: any) => void;