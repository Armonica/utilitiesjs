var should = require('should');
var _ = require('../dist/utils');
var assert = require('assert');

describe('Array mixins', function() {
    describe('unique', function() {
        it('should be unique', function() {
            var list = [1, 2, 1, 3, 1, 4];
            
            assert.deepEqual(_.unique(list), [2, 3, 1, 4], 'can find the unique values of an unsorted array');
            list = [1, 1, 1, 2, 2, 3];
            assert.deepEqual(_.unique(list, true), [1, 2, 3], 'can find the unique values of a sorted array faster');

            // list = [{name: 'Moe'}, {name: 'Curly'}, {name: 'Larry'}, {name: 'Curly'}];
            // var expected = [{name: 'Moe'}, {name: 'Curly'}, {name: 'Larry'}];
            // var iterator = function(stooge) { return stooge.name; };
            
            // assert.deepEqual(_.unique(list, false, iterator), expected, 'uses the result of `iterator` for uniqueness comparisons (unsorted case)');
            // assert.deepEqual(_.unique(list, iterator), expected, '`sorted` argument defaults to false when omitted');
            // assert.deepEqual(_.unique(list, 'name'), expected, 'when `iterator` is a string, uses that key for comparisons (unsorted case)');

            // list = [{score: 8}, {score: 10}, {score: 10}];
            // expected = [{score: 8}, {score: 10}];
            // iterator = function(item) { return item.score; };
            // assert.deepEqual(_.unique(list, true, iterator), expected, 'uses the result of `iterator` for uniqueness comparisons (sorted case)');
            // assert.deepEqual(_.unique(list, true, 'score'), expected, 'when `iterator` is a string, uses that key for comparisons (sorted case)');

            // assert.deepEqual(_.unique([{0: 1}, {0: 1}, {0: 1}, {0: 2}], 0), [{0: 1}, {0: 2}], 'can use falsey pluck like iterator');

            var result = (function(){
                    var args = Array.prototype.slice.call(arguments);
                    // console.log('xxx ', args, arguments);
                    return _.unique(args);
                }(1, 2, 1, 3, 1, 4));
            // console.log('eee ', result);
            assert.deepEqual(result, [2, 3, 1, 4], 'works on an arguments object');

            // var a = {}, b = {}, c = {};
            // assert.deepEqual(_.unique([a, b, a, b, c]), [a, b, c], 'works on values that can be tested for equivalency but not ordered');

            assert.deepEqual(_.unique(null), [], 'returns an empty array when `array` is not iterable');

            var context = {};
            list = [3];
            _.unique(list, function(value, index, array) {
            assert.strictEqual(this, context, 'executes its iterator in the given context');
            assert.strictEqual(value, 3, 'passes its iterator the value');
            assert.strictEqual(index, 0, 'passes its iterator the index');
            assert.strictEqual(array, list, 'passes its iterator the entire array');
            }, context);
        });
    });
});