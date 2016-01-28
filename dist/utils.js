(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["utils"] = factory();
	else
		root["utils"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { throw err; };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.nextTick = undefined;
	exports.ajax = ajax;
	exports.uniqueId = uniqueId;
	exports.proxy = proxy;
	exports.bind = bind;
	exports.callFunc = callFunc;
	exports.equal = equal;
	exports.triggerMethodOn = triggerMethodOn;
	exports.getOption = getOption;
	exports.inherits = inherits;

	var _objects = __webpack_require__(2);

	var _arrays = __webpack_require__(1);

	var _strings = __webpack_require__(4);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var idCounter = 0;
	var nativeBind = Function.prototype.bind;
	function ajax() {
	    var e;
	    if (window.hasOwnProperty('XMLHttpRequest')) {
	        return new XMLHttpRequest();
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp.6.0');
	    } catch (_error) {
	        e = _error;
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp.3.0');
	    } catch (_error) {
	        e = _error;
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp');
	    } catch (_error) {
	        e = _error;
	    }
	    return e;
	}
	function uniqueId() {
	    var prefix = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	    return prefix + ++idCounter;
	}
	function proxy(from, to, fns) {
	    if (!Array.isArray(fns)) fns = [fns];
	    fns.forEach(function (fn) {
	        if (typeof to[fn] === 'function') {
	            from[fn] = bind(to[fn], to);
	        }
	    });
	}
	function bind(method, context) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	    }

	    if (typeof method !== 'function') throw new Error('method not at function');
	    if (nativeBind != null) return nativeBind.call.apply(nativeBind, [method, context].concat(_toConsumableArray(args)));
	    args = args || [];
	    var fnoop = function fnoop() {};
	    var fBound = function fBound() {
	        var ctx = this instanceof fnoop ? this : context;
	        return callFunc(method, ctx, args.concat((0, _arrays.slice)(arguments)));
	    };
	    fnoop.prototype = this.prototype;
	    fBound.prototype = new fnoop();
	    return fBound;
	}
	function callFunc(fn, ctx) {
	    var args = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	    switch (args.length) {
	        case 0:
	            return fn.call(ctx);
	        case 1:
	            return fn.call(ctx, args[0]);
	        case 2:
	            return fn.call(ctx, args[0], args[1]);
	        case 3:
	            return fn.call(ctx, args[0], args[1], args[2]);
	        case 4:
	            return fn.call(ctx, args[0], args[1], args[2], args[3]);
	        case 5:
	            return fn.call(ctx, args[0], args[1], args[2], args[3], args[4]);
	        default:
	            return fn.apply(ctx, args);
	    }
	}
	function equal(a, b) {
	    return eq(a, b, [], []);
	}
	function triggerMethodOn(obj, eventName, args) {
	    var ev = (0, _strings.camelcase)("on-" + eventName.replace(':', '-'));
	    if (obj[ev] && typeof obj[ev] === 'function') {
	        callFunc(obj[ev], obj, args);
	    }
	    if (typeof obj.trigger === 'function') {
	        args = [eventName].concat(args);
	        callFunc(obj.trigger, obj, args);
	    }
	}
	function getOption(option, objs) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = objs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var o = _step.value;

	            if ((0, _objects.isObject)(o) && o[option]) return o[option];
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return null;
	}
	function inherits(parent, protoProps, staticProps) {
	    var child;
	    if (protoProps && (0, _objects.has)(protoProps, 'constructor')) {
	        child = protoProps.constructor;
	    } else {
	        child = function child() {
	            return parent.apply(this, arguments);
	        };
	    }
	    (0, _objects.extend)(child, parent, staticProps);
	    var Surrogate = function Surrogate() {
	        this.constructor = child;
	    };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    if (protoProps) (0, _objects.extend)(child.prototype, protoProps);
	    child.__super__ = parent.prototype;
	    return child;
	}
	var nextTick = exports.nextTick = function () {
	    var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
	    var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
	    if (canSetImmediate) {
	        return function (f) {
	            return window.setImmediate(f);
	        };
	    }
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	}();
	function eq(a, b, aStack, bStack) {
	    if (a === b) return a !== 0 || 1 / a == 1 / b;
	    if (a == null || b == null) return a === b;
	    var className = toString.call(a);
	    if (className != toString.call(b)) return false;
	    switch (className) {
	        case '[object String]':
	            return a == String(b);
	        case '[object Number]':
	            return a !== +a ? b !== +b : a === 0 ? 1 / a === 1 / b : a === +b;
	        case '[object Date]':
	        case '[object Boolean]':
	            return +a == +b;
	        case '[object RegExp]':
	            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
	    }
	    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;
	    var length = aStack.length;
	    while (length--) {
	        if (aStack[length] == a) return bStack[length] == b;
	    }
	    var aCtor = a.constructor,
	        bCtor = b.constructor;
	    if (aCtor !== bCtor && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor)) {
	        return false;
	    }
	    aStack.push(a);
	    bStack.push(b);
	    var size = 0,
	        result = true;
	    if (className === '[object Array]') {
	        size = a.length;
	        result = size === b.length;
	        if (result) {
	            while (size--) {
	                if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	            }
	        }
	    } else {
	        for (var key in a) {
	            if ((0, _objects.has)(a, key)) {
	                size++;
	                if (!(result = (0, _objects.has)(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	            }
	        }
	        if (result) {
	            for (key in b) {
	                if ((0, _objects.has)(b, key) && ! size--) break;
	            }
	            result = !size;
	        }
	    }
	    aStack.pop();
	    bStack.pop();
	    return result;
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.unique = unique;
	exports.any = any;
	exports.indexOf = indexOf;
	exports.find = find;
	exports.slice = slice;
	exports.flatten = flatten;
	exports.sortBy = sortBy;

	var _utils = __webpack_require__(0);

	function unique(array) {
	    return Array.isArray(array) && array.filter(function (e, i) {
	        for (i += 1; i < array.length; i += 1) {
	            if ((0, _utils.equal)(e, array[i])) {
	                return false;
	            }
	        }
	        return true;
	    }) || [];
	}
	function any(array, predicate) {
	    for (var i = 0, ii = array.length; i < ii; i++) {
	        if (predicate(array[i])) return true;
	    }
	    return false;
	}
	function indexOf(array, item) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (array[i] === item) return i;
	    }return -1;
	}
	function find(array, callback, ctx) {
	    var v = undefined;
	    for (var i = 0, ii = array.length; i < ii; i++) {
	        if (callback.call(ctx, array[i])) return array[i];
	    }
	    return null;
	}
	function slice(array, begin, end) {
	    return Array.prototype.slice.call(array, begin, end);
	}
	function flatten(arr) {
	    return arr.reduce(function (flat, toFlatten) {
	        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	    }, []);
	}
	function sortBy(obj, value, context) {
	    var iterator = typeof value === 'function' ? value : function (obj) {
	        return obj[value];
	    };
	    return obj.map(function (value, index, list) {
	        return {
	            value: value,
	            index: index,
	            criteria: iterator.call(context, value, index, list)
	        };
	    }).sort(function (left, right) {
	        var a = left.criteria,
	            b = right.criteria;
	        if (a !== b) {
	            if (a > b || a === void 0) return 1;
	            if (a < b || b === void 0) return -1;
	        }
	        return left.index - right.index;
	    }).map(function (item) {
	        return item.value;
	    });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isObject = isObject;
	exports.isEmpty = isEmpty;
	exports.extend = extend;
	exports.assign = assign;
	exports.has = has;
	exports.pick = pick;
	exports.result = result;
	exports.values = values;
	exports.intersection = intersection;

	var _utils = __webpack_require__(0);

	var _arrays = __webpack_require__(1);

	function isObject(obj) {
	    return obj === Object(obj);
	}
	function isEmpty(obj) {
	    return Object.keys(obj).length === 0;
	}
	function extend(obj) {
	    if (!isObject(obj)) return obj;
	    var o = undefined,
	        k = undefined;

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            o = _step.value;

	            if (!isObject(o)) continue;
	            for (k in o) {
	                if (has(o, k)) obj[k] = o[k];
	            }
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return obj;
	}
	function assign(target) {
	    if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert first argument to object');
	    }
	    var to = Object(target);

	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	    }

	    for (var i = 0, ii = args.length; i < ii; i++) {
	        var nextSource = args[i];
	        if (nextSource === undefined || nextSource === null) {
	            continue;
	        }
	        nextSource = Object(nextSource);
	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	            var nextKey = keysArray[nextIndex];
	            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	            if (desc !== undefined && desc.enumerable) {
	                to[nextKey] = nextSource[nextKey];
	            }
	        }
	    }
	    return to;
	}
	function has(obj, prop) {
	    return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	function pick(obj, props) {
	    var out = {},
	        prop = undefined;
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	        for (var _iterator2 = props[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            prop = _step2.value;

	            if (has(obj, prop)) out[prop] = obj[prop];
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }

	    return out;
	}
	function result(obj, prop, ctx, args) {
	    var ret = obj[prop];
	    return typeof ret === 'function' ? (0, _utils.callFunc)(ret, ctx, args || []) : ret;
	}
	function values(obj) {
	    var output = [];
	    for (var k in obj) {
	        if (has(obj, k)) {
	            output.push(obj[k]);
	        }
	    }return output;
	}
	function intersectionObjects(a, b, predicate) {
	    var results = [],
	        aElement,
	        existsInB;
	    for (var i = 0, ii = a.length; i < ii; i++) {
	        aElement = a[i];
	        existsInB = (0, _arrays.any)(b, function (bElement) {
	            return predicate(bElement, aElement);
	        });
	        if (existsInB) {
	            results.push(aElement);
	        }
	    }
	    return results;
	}
	function intersection(results) {
	    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        args[_key3 - 1] = arguments[_key3];
	    }

	    var lastArgument = args[args.length - 1];
	    var arrayCount = args.length;
	    var areEqualFunction = _utils.equal;
	    if (typeof lastArgument === "function") {
	        areEqualFunction = lastArgument;
	        arrayCount--;
	    }
	    for (var i = 0; i < arrayCount; i++) {
	        var array = args[i];
	        results = intersectionObjects(results, array, areEqualFunction);
	        if (results.length === 0) break;
	    }
	    return results;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Promise = undefined;
	exports.isPromise = isPromise;
	exports.toPromise = toPromise;
	exports.thunkToPromise = thunkToPromise;
	exports.arrayToPromise = arrayToPromise;
	exports.objectToPromise = objectToPromise;
	exports.deferred = deferred;
	exports.callback = callback;
	exports.delay = delay;
	exports.eachAsync = eachAsync;
	exports.mapAsync = mapAsync;

	var _objects = __webpack_require__(2);

	var _arrays = __webpack_require__(1);

	var _utils = __webpack_require__(0);

	var Promise = exports.Promise = typeof window === 'undefined' ? global.Promise : window.Promise;
	function isPromise(obj) {
	    return obj && typeof obj.then === 'function';
	}
	function toPromise(obj) {
	    if (!obj) {
	        return obj;
	    }
	    if (isPromise(obj)) {
	        return obj;
	    }
	    if ("function" == typeof obj) {
	        return thunkToPromise.call(this, obj);
	    }
	    if (Array.isArray(obj)) {
	        return arrayToPromise.call(this, obj);
	    }
	    if ((0, _objects.isObject)(obj)) {
	        return objectToPromise.call(this, obj);
	    }
	    return Promise.resolve(obj);
	}
	function thunkToPromise(fn) {
	    var ctx = this;
	    return new Promise(function (resolve, reject) {
	        fn.call(ctx, function (err, res) {
	            if (err) return reject(err);
	            if (arguments.length > 2) res = (0, _arrays.slice)(arguments, 1);
	            resolve(res);
	        });
	    });
	}
	function arrayToPromise(obj) {
	    return Promise.all(obj.map(toPromise, this));
	}
	function objectToPromise(obj) {
	    var results = new obj.constructor();
	    var keys = Object.keys(obj);
	    var promises = [];
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var promise = toPromise.call(this, obj[key]);
	        if (promise && isPromise(promise)) defer(promise, key);else results[key] = obj[key];
	    }
	    return Promise.all(promises).then(function () {
	        return results;
	    });
	    function defer(promise, key) {
	        results[key] = undefined;
	        promises.push(promise.then(function (res) {
	            results[key] = res;
	        }));
	    }
	}
	function deferred(fn, ctx) {
	    var ret = {};
	    ret.promise = new Promise(function (resolve, reject) {
	        ret.resolve = resolve;
	        ret.reject = reject;
	        ret.done = function (err, result) {
	            if (err) return reject(err);else resolve(result);
	        };
	    });
	    if (typeof fn === 'function') {
	        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	            args[_key - 2] = arguments[_key];
	        }

	        (0, _utils.callFunc)(fn, ctx, args.concat([ret.done]));
	        return ret.promise;
	    }
	    return ret;
	}
	;
	function callback(promise, callback, ctx) {
	    promise.then(function (result) {
	        callback.call(ctx, null, result);
	    }).catch(function (err) {
	        callback.call(ctx, err);
	    });
	}
	function delay(timeout) {
	    var defer = deferred();
	    timeout == null ? (0, _utils.nextTick)(defer.resolve) : setTimeout(defer.resolve, timeout);
	    return defer.promise;
	}
	;
	function eachAsync(array, iterator, context) {
	    var accumulate = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	    return mapAsync(array, iterator, context, accumulate).then(function () {
	        return void 0;
	    });
	}
	function mapAsync(array, iterator, context) {
	    var accumulate = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	    return new Promise(function (resolve, reject) {
	        var i = 0,
	            len = array.length,
	            errors = [],
	            results = [];
	        function next(err, result) {
	            if (err && !accumulate) return reject(err);
	            if (err) errors.push(err);
	            if (i === len) return errors.length ? reject((0, _arrays.flatten)(errors)) : resolve(results);
	            var ret = iterator.call(context, array[i++]);
	            if (isPromise(ret)) {
	                ret.then(function (r) {
	                    results.push(r);next(null, r);
	                }, next);
	            } else if (ret instanceof Error) {
	                next(ret);
	            } else {
	                next(null);
	            }
	        }
	        next(null);
	    });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.camelcase = camelcase;
	exports.truncate = truncate;
	exports.humanFileSize = humanFileSize;
	function camelcase(input) {
	    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
	        return group1.toUpperCase();
	    });
	}
	function truncate(str, length) {
	    var n = str.substring(0, Math.min(length, str.length));
	    return n + (n.length == str.length ? '' : '...');
	}
	function humanFileSize(bytes) {
	    var si = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	    var thresh = si ? 1000 : 1024;
	    if (Math.abs(bytes) < thresh) {
	        return bytes + ' B';
	    }
	    var units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	    var u = -1;
	    do {
	        bytes /= thresh;
	        ++u;
	    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
	    return bytes.toFixed(1) + ' ' + units[u];
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Debug = undefined;
	exports.debug = debug;

	var _utils = __webpack_require__(0);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Debug = exports.Debug = function () {
	    function Debug(namespace) {
	        _classCallCheck(this, Debug);

	        this.enabled = false;
	        this.namespace = namespace;
	    }

	    _createClass(Debug, [{
	        key: 'debug',
	        value: function debug() {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }

	            if (!this.enabled) return;
	            args[0] = this._coerce(args[0]);
	            if ('string' !== typeof args[0]) {
	                args = ['%o'].concat(args);
	            }
	            var index = 0;
	            args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
	                if (match === '%%') return match;
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
	            this._log.apply(this, _toConsumableArray(args));
	        }
	    }, {
	        key: '_log',
	        value: function _log() {
	            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                args[_key2] = arguments[_key2];
	            }

	            return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	        }
	    }, {
	        key: '_coerce',
	        value: function _coerce(val) {
	            if (val instanceof Error) return val.stack || val.message;
	            return val;
	        }
	    }, {
	        key: '_formatArgs',
	        value: function _formatArgs(args) {
	            var p = this.prefix ? this.prefix + ":" : '';
	            args[0] = '[' + p + ':' + this.namespace + '] ' + args[0];
	            return args;
	        }
	    }], [{
	        key: 'enable',
	        value: function enable(enabled, namespace) {
	            for (var k in this.loggers) {
	                if (namespace && k === namespace) {
	                    this.loggers[k].enabled = enabled;
	                } else if (!namespace) {
	                    this.loggers[k].enabled = enabled;
	                }
	            }
	        }
	    }, {
	        key: 'create',
	        value: function create(namespace) {
	            var logger = undefined;
	            if (this.loggers[namespace]) {
	                logger = this.loggers[namespace].debug;
	            } else {
	                logger = new Debug(namespace);
	                this.loggers[namespace] = logger;
	            }
	            return (0, _utils.bind)(logger.debug, logger);
	        }
	    }]);

	    return Debug;
	}();

	Debug.loggers = {};
	Debug.formatters = {
	    j: function j(args) {
	        return JSON.stringify(args);
	    }
	};
	function debug(namespace) {
	    return Debug.create(namespace);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.domReady = undefined;
	exports.matches = matches;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.delegate = delegate;
	exports.undelegate = undelegate;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.hasClass = hasClass;
	exports.selectionStart = selectionStart;
	exports.transitionEnd = transitionEnd;
	exports.animationEnd = animationEnd;

	var _arrays = __webpack_require__(1);

	var ElementProto = typeof Element !== 'undefined' && Element.prototype || {};
	var matchesSelector = ElementProto.matches || ElementProto.webkitMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.msMatchesSelector || ElementProto.oMatchesSelector || function (selector) {
	    var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
	    return !! ~(0, _arrays.indexOf)(nodeList, this);
	};
	var elementAddEventListener = ElementProto.addEventListener || function (eventName, listener) {
	    return this.attachEvent('on' + eventName, listener);
	};
	var elementRemoveEventListener = ElementProto.removeEventListener || function (eventName, listener) {
	    return this.detachEvent('on' + eventName, listener);
	};
	var transitionEndEvent = function transitionEnd() {
	    var el = document.createElement('bootstrap');
	    var transEndEventNames = {
	        'WebkitTransition': 'webkitTransitionEnd',
	        'MozTransition': 'transitionend',
	        'OTransition': 'oTransitionEnd otransitionend',
	        'transition': 'transitionend'
	    };
	    for (var name in transEndEventNames) {
	        if (el.style[name] !== undefined) {
	            return transEndEventNames[name];
	        }
	    }
	    return null;
	};
	var animationEndEvent = function animationEnd() {
	    var el = document.createElement('bootstrap');
	    var transEndEventNames = {
	        'WebkitAnimation': 'webkitAnimationEnd',
	        'MozAnimation': 'animationend',
	        'OAnimation': 'oAnimationEnd oanimationend',
	        'animation': 'animationend'
	    };
	    for (var name in transEndEventNames) {
	        if (el.style[name] !== undefined) {
	            return transEndEventNames[name];
	        }
	    }
	    return null;
	};
	function matches(elm, selector) {
	    return matchesSelector.call(elm, selector);
	}
	function addEventListener(elm, eventName, listener) {
	    var useCap = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	    elementAddEventListener.call(elm, eventName, listener, useCap);
	}
	function removeEventListener(elm, eventName, listener) {
	    elementRemoveEventListener.call(elm, eventName, listener);
	}
	var unbubblebles = 'focus blur change'.split(' ');
	var domEvents = [];
	function delegate(elm, selector, eventName, callback, ctx) {
	    var root = elm;
	    var handler = function handler(e) {
	        var node = e.target || e.srcElement;
	        if (e.delegateTarget) return;
	        for (; node && node != root; node = node.parentNode) {
	            if (matches(node, selector)) {
	                e.delegateTarget = node;
	                callback(e);
	            }
	        }
	    };
	    var useCap = !! ~unbubblebles.indexOf(eventName);
	    addEventListener(elm, eventName, handler, useCap);
	    domEvents.push({ eventName: eventName, handler: handler, listener: callback, selector: selector });
	    return handler;
	}
	function undelegate(elm, selector, eventName, callback) {
	    var handlers = domEvents.slice();
	    for (var i = 0, len = handlers.length; i < len; i++) {
	        var item = handlers[i];
	        var match = item.eventName === eventName && (callback ? item.listener === callback : true) && (selector ? item.selector === selector : true);
	        if (!match) continue;
	        removeEventListener(elm, item.eventName, item.handler);
	        domEvents.splice((0, _arrays.indexOf)(handlers, item), 1);
	    }
	}
	function addClass(elm, className) {
	    if (elm.classList) {
	        var split = className.split(' ');
	        for (var i = 0, ii = split.length; i < ii; i++) {
	            if (elm.classList.contains(split[i].trim())) continue;
	            elm.classList.add(split[i].trim());
	        }
	    } else {
	        elm.className = (0, _arrays.unique)(elm.className.split(' ').concat(className.split(' '))).join(' ');
	    }
	}
	function removeClass(elm, className) {
	    if (elm.classList) {
	        var split = className.split(' ');
	        for (var i = 0, ii = split.length; i < ii; i++) {
	            elm.classList.remove(split[i].trim());
	        }
	    } else {
	        var split = elm.className.split(' '),
	            classNames = className.split(' '),
	            tmp = split,
	            index = undefined;
	        for (var i = 0, ii = classNames.length; i < ii; i++) {
	            index = split.indexOf(classNames[i]);
	            if (!! ~index) split = split.splice(index, 1);
	        }
	    }
	}
	function hasClass(elm, className) {
	    if (elm.classList) {
	        return elm.classList.contains(className);
	    }
	    var reg = new RegExp('\b' + className);
	    return reg.test(elm.className);
	}
	function selectionStart(elm) {
	    if ('selectionStart' in elm) {
	        return elm.selectionStart;
	    } else if (document.selection) {
	        elm.focus();
	        var sel = document.selection.createRange();
	        var selLen = document.selection.createRange().text.length;
	        sel.moveStart('character', -elm.value.length);
	        return sel.text.length - selLen;
	    }
	}
	var _events = {
	    animationEnd: null,
	    transitionEnd: null
	};
	function transitionEnd(elm, fn, ctx, duration) {
	    var event = _events.transitionEnd || (_events.transitionEnd = transitionEndEvent());
	    var callback = function callback(e) {
	        removeEventListener(elm, event, callback);
	        fn.call(ctx, e);
	    };
	    addEventListener(elm, event, callback);
	}
	function animationEnd(elm, fn, ctx, duration) {
	    var event = _events.animationEnd || (_events.animationEnd = animationEndEvent());
	    var callback = function callback(e) {
	        removeEventListener(elm, event, callback);
	        fn.call(ctx, e);
	    };
	    addEventListener(elm, event, callback);
	}
	var domReady = exports.domReady = function domReady() {
	    var fns = [],
	        _listener,
	        doc = document,
	        hack = doc.documentElement.doScroll,
	        domContentLoaded = 'DOMContentLoaded',
	        loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);
	    if (!loaded) {
	        doc.addEventListener(domContentLoaded, _listener = function listener() {
	            doc.removeEventListener(domContentLoaded, _listener);
	            loaded = true;
	            while (_listener = fns.shift()) {
	                _listener();
	            }
	        });
	    }
	    return function (fn) {
	        loaded ? setTimeout(fn, 0) : fns.push(fn);
	    };
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.request = exports.Request = undefined;
	exports.queryParam = queryParam;

	var _utils = __webpack_require__(0);

	var _promises = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var xmlRe = /^(?:application|text)\/xml/,
	    jsonRe = /^application\/json/,
	    fileProto = /^file:/;
	function queryParam(obj) {
	    return '?' + Object.keys(obj).reduce(function (a, k) {
	        a.push(k + '=' + encodeURIComponent(obj[k]));return a;
	    }, []).join('&');
	}
	var isValid = function isValid(xhr, url) {
	    return xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 0 && fileProto.test(url) || xhr.status === 0 && window.location.protocol === 'file:';
	};

	var Request = exports.Request = function () {
	    function Request(_method, _url) {
	        _classCallCheck(this, Request);

	        this._method = _method;
	        this._url = _url;
	        this._xhr = (0, _utils.ajax)();
	    }

	    _createClass(Request, [{
	        key: 'send',
	        value: function send(data) {
	            this._data = data;
	            return this;
	        }
	    }, {
	        key: 'withCredentials',
	        value: function withCredentials(ret) {
	            this._xhr.withCredentials = ret;
	            return this;
	        }
	    }, {
	        key: 'end',
	        value: function end(data) {
	            var _this = this;

	            this._data = data || this._data;
	            var defer = (0, _promises.deferred)();
	            this._xhr.addEventListener('readystatechange', function () {
	                if (_this._xhr.readyState !== XMLHttpRequest.DONE) return;
	                if (!isValid(_this._xhr, _this._url)) {
	                    return defer.reject(new Error('server responded with: ' + _this._xhr.status));
	                }
	                defer.resolve(_this._xhr.responseText);
	            });
	            data = this._data;
	            var url = this._url;
	            if (data && data === Object(data)) {
	                var d = queryParam(data);
	                url += d;
	            }
	            this._xhr.open(this._method, url, true);
	            this._xhr.send(data);
	            return defer.promise;
	        }
	    }, {
	        key: 'json',
	        value: function json(data) {
	            var _this2 = this;

	            return this.end(data).then(function (str) {
	                var accepts = _this2._xhr.getResponseHeader('content-type');
	                if (jsonRe.test(accepts) && str !== '') {
	                    var json = JSON.parse(str);
	                    return json;
	                } else {
	                    throw new Error('json');
	                }
	            });
	        }
	    }, {
	        key: 'progress',
	        value: function progress(fn) {
	            this._xhr.addEventListener('progress', fn);
	            return this;
	        }
	    }, {
	        key: 'header',
	        value: function header(field, value) {
	            this._xhr.setRequestHeader(field, value);
	            return this;
	        }
	    }]);

	    return Request;
	}();

	var request = exports.request = {};
	['get', 'post', 'put', 'delete', 'patch', 'head'].forEach(function (m) {
	    request[m === 'delete' ? 'del' : m] = function (url) {
	        return new Request(m.toUpperCase(), url);
	    };
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _arrays = __webpack_require__(1);

	var _loop = function _loop(_key9) {
	  if (_key9 === "default") return 'continue';
	  Object.defineProperty(exports, _key9, {
	    enumerable: true,
	    get: function get() {
	      return _arrays[_key9];
	    }
	  });
	};

	for (var _key9 in _arrays) {
	  var _ret = _loop(_key9);

	  if (_ret === 'continue') continue;
	}

	var _objects = __webpack_require__(2);

	var _loop2 = function _loop2(_key10) {
	  if (_key10 === "default") return 'continue';
	  Object.defineProperty(exports, _key10, {
	    enumerable: true,
	    get: function get() {
	      return _objects[_key10];
	    }
	  });
	};

	for (var _key10 in _objects) {
	  var _ret2 = _loop2(_key10);

	  if (_ret2 === 'continue') continue;
	}

	var _promises = __webpack_require__(3);

	var _loop3 = function _loop3(_key11) {
	  if (_key11 === "default") return 'continue';
	  Object.defineProperty(exports, _key11, {
	    enumerable: true,
	    get: function get() {
	      return _promises[_key11];
	    }
	  });
	};

	for (var _key11 in _promises) {
	  var _ret3 = _loop3(_key11);

	  if (_ret3 === 'continue') continue;
	}

	var _utils = __webpack_require__(0);

	var _loop4 = function _loop4(_key12) {
	  if (_key12 === "default") return 'continue';
	  Object.defineProperty(exports, _key12, {
	    enumerable: true,
	    get: function get() {
	      return _utils[_key12];
	    }
	  });
	};

	for (var _key12 in _utils) {
	  var _ret4 = _loop4(_key12);

	  if (_ret4 === 'continue') continue;
	}

	var _strings = __webpack_require__(4);

	var _loop5 = function _loop5(_key13) {
	  if (_key13 === "default") return 'continue';
	  Object.defineProperty(exports, _key13, {
	    enumerable: true,
	    get: function get() {
	      return _strings[_key13];
	    }
	  });
	};

	for (var _key13 in _strings) {
	  var _ret5 = _loop5(_key13);

	  if (_ret5 === 'continue') continue;
	}

	var _html = __webpack_require__(6);

	var _loop6 = function _loop6(_key14) {
	  if (_key14 === "default") return 'continue';
	  Object.defineProperty(exports, _key14, {
	    enumerable: true,
	    get: function get() {
	      return _html[_key14];
	    }
	  });
	};

	for (var _key14 in _html) {
	  var _ret6 = _loop6(_key14);

	  if (_ret6 === 'continue') continue;
	}

	var _request = __webpack_require__(7);

	var _loop7 = function _loop7(_key15) {
	  if (_key15 === "default") return 'continue';
	  Object.defineProperty(exports, _key15, {
	    enumerable: true,
	    get: function get() {
	      return _request[_key15];
	    }
	  });
	};

	for (var _key15 in _request) {
	  var _ret7 = _loop7(_key15);

	  if (_ret7 === 'continue') continue;
	}

	var _debug = __webpack_require__(5);

	var _loop8 = function _loop8(_key16) {
	  if (_key16 === "default") return 'continue';
	  Object.defineProperty(exports, _key16, {
	    enumerable: true,
	    get: function get() {
	      return _debug[_key16];
	    }
	  });
	};

	for (var _key16 in _debug) {
	  var _ret8 = _loop8(_key16);

	  if (_ret8 === 'continue') continue;
	}

/***/ }
/******/ ])
});
;