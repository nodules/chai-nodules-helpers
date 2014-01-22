/* global describe, it */

var assert = require('assert');

describe('objex assertion helpers', function() {
    var chai = require('chai').use(require('../')),
        Objex = require('objex');

    describe('assert.mixedProperly()', function() {
        it('should be exposed to chai.assert interface', function() {
            assert.strictEqual(typeof chai.assert.mixedProperly, 'function', 'assert.mixedProperly exposed');
        });

        it('should not throw if mixin mixed properly', function() {
            assert.doesNotThrow(function() {
                var Target = Objex.create(),
                    Mixin = function() {};

                Target.uniqueStaticProp = true;
                Target.prototype.uniqueProtoProp = true;
                Target.prototype.specialProtoProp = true;

                Mixin.mixinStaticProp = true;
                Mixin.prototype.mixinProtoProp = true;
                Mixin.prototype.specialProtoProp = false;

                chai.assert.mixedProperly(Target, Mixin, 'Mixin',
                    [ 'prototype', 'super_', '__super' ], [ 'specialProtoProp' ]);
            });
        });

        it('should throw error if mixin mixed incorrectly', function() {
            assert.throws(function() {
                var Target = Objex.create(),
                    Mixin = function() {};

                Target.uniqueStaticProp = true;
                Target.prototype.uniqueProtoProp = true;

                Mixin.mixinStaticProp = true;
                Mixin.prototype.uniqueProtoProp = false;

                chai.assert.mixedProperly(Target, Mixin, 'Mixin',
                    [ 'prototype', 'super_', '__super' ], []);
            }, function(error) {
                return (error instanceof chai.AssertionError) && /uniqueProtoProp/ig.test(error.message);
            });
        });
    });
});
