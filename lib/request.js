import { ajax } from './utils';
import { deferred } from './promises';
let xmlRe = /^(?:application|text)\/xml/, jsonRe = /^application\/json/, fileProto = /^file:/;
export function queryParam(obj) {
    return '?' + Object.keys(obj).reduce(function (a, k) { a.push(k + '=' + encodeURIComponent(obj[k])); return a; }, []).join('&');
}
var isValid = function (xhr, url) {
    return (xhr.status >= 200 && xhr.status < 300) ||
        (xhr.status === 304) ||
        (xhr.status === 0 && fileProto.test(url)) ||
        (xhr.status === 0 && window.location.protocol === 'file:');
};
export class Request {
    constructor(_method, _url) {
        this._method = _method;
        this._url = _url;
        this._xhr = ajax();
    }
    send(data) {
        this._data = data;
        return this;
    }
    withCredentials(ret) {
        this._xhr.withCredentials = ret;
        return this;
    }
    end(data) {
        this._data = data || this._data;
        let defer = deferred();
        this._xhr.addEventListener('readystatechange', () => {
            if (this._xhr.readyState !== XMLHttpRequest.DONE)
                return;
            if (!isValid(this._xhr, this._url)) {
                return defer.reject(new Error('server responded with: ' + this._xhr.status));
            }
            defer.resolve(this._xhr.responseText);
        });
        data = this._data;
        let url = this._url;
        if (data && data === Object(data)) {
            let d = queryParam(data);
            url += d;
        }
        this._xhr.open(this._method, url, true);
        this._xhr.send(data);
        return defer.promise;
    }
    json(data) {
        return this.end(data)
            .then((str) => {
            let accepts = this._xhr.getResponseHeader('content-type');
            if (jsonRe.test(accepts) && str !== '') {
                let json = JSON.parse(str);
                return json;
            }
            else {
                throw new Error('json');
            }
        });
    }
    progress(fn) {
        this._xhr.addEventListener('progress', fn);
        return this;
    }
    header(field, value) {
        this._xhr.setRequestHeader(field, value);
        return this;
    }
}
export var request = {};
['get', 'post', 'put', 'delete', 'patch', 'head']
    .forEach((m) => {
    request[m === 'delete' ? 'del' : m] = function (url) {
        return new Request(m.toUpperCase(), url);
    };
});
