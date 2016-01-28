import { bind } from './utils';
export class Debug {
    constructor(namespace) {
        this.enabled = false;
        this.namespace = namespace;
    }
    static enable(enabled, namespace) {
        for (let k in this.loggers) {
            if (namespace && k === namespace) {
                this.loggers[k].enabled = enabled;
            }
            else if (!namespace) {
                this.loggers[k].enabled = enabled;
            }
        }
    }
    static create(namespace) {
        let logger;
        if (this.loggers[namespace]) {
            logger = this.loggers[namespace].debug;
        }
        else {
            logger = new Debug(namespace);
            this.loggers[namespace] = logger;
        }
        return bind(logger.debug, logger);
    }
    debug(...args) {
        if (!this.enabled)
            return;
        args[0] = this._coerce(args[0]);
        if ('string' !== typeof args[0]) {
            args = ['%o'].concat(args);
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
            if (match === '%%')
                return match;
            index++;
            var formatter = Debug.formatters[format];
            if ('function' === typeof formatter) {
                var val = args[index];
                match = formatter.call(self, val);
                args.splice(index, 1);
                index--;
            }
            return match;
        });
        args = this._formatArgs(args);
        this._log(...args);
    }
    _log(...args) {
        return 'object' === typeof console
            && console.log
            && Function.prototype.apply.call(console.log, console, arguments);
    }
    _coerce(val) {
        if (val instanceof Error)
            return val.stack || val.message;
        return val;
    }
    _formatArgs(args) {
        let p = this.prefix ? this.prefix + ":" : '';
        args[0] = `[${p}:${this.namespace}] ${args[0]}`;
        return args;
    }
}
Debug.loggers = {};
Debug.formatters = {
    j: function (args) {
        return JSON.stringify(args);
    }
};
export function debug(namespace) {
    return Debug.create(namespace);
}
