/* global describe, it */

var assert = require('assert');

describe('objex assertion helpers', function() {
    var chai = require('chai').use(require('../')),
        Objex = require('objex');

    describe('assert.isMixed()', function() {
        it('should be exposed to chai.assert interface', function() {
            assert.strictEqual(typeof chai.assert.isMixed, 'function', 'assert.isMixed exposed');
        });

        it('should not throw if mixin mixed is properly', function() {
            assert.doesNotThrow(function() {
                var Target = Objex.create(),
                    Mixin = function() {};

                Target.uniqueStaticMethod = function uniqueStaticMethod() {};
                Target.prototype.uniqueProtoMethod = function uniqueProtoMethod() {};
                Target.prototype.specialProtoProp = true;

                Mixin.mixinStaticMethod = Target.mixinStaticMethod = function mixinStaticMethod() {};
                Mixin.prototype.mixinProtoMethod = Target.prototype.mixinProtoMethod = function mixinProtoMethod() {};
                Target.prototype.specialProtoProp = false;

                chai.assert.isMixed(Target, Mixin, 'Mixin',
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

                chai.assert.isMixed(Target, Mixin, 'Mixin',
                    [ 'prototype', 'super_', '__super' ], []);
            }, chai.AssertionError, /mixinStaticProp/ig);
        });
    });

    describe('assert.canBeMixed()', function() {
        it('should be exposed to chai.assert interface', function() {
            assert.strictEqual(typeof chai.assert.canBeMixed, 'function', 'assert.canBeMixed exposed');
        });

        it('should not throw if mixin mixed is properly', function() {
            assert.doesNotThrow(function() {
                var Target = Objex.create(),
                    Mixin = function() {};

                Target.uniqueStaticProp = true;
                Target.prototype.uniqueProtoProp = true;
                Target.prototype.specialProtoProp = true;

                Mixin.mixinStaticProp = true;
                Mixin.prototype.mixinProtoProp = true;
                Mixin.prototype.specialProtoProp = false;

                chai.assert.canBeMixed(Target, Mixin, 'Mixin',
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

                chai.assert.canBeMixed(Target, Mixin, 'Mixin',
                    [ 'prototype', 'super_', '__super' ], []);
            }, chai.AssertionError, /uniqueProtoProp/ig);
        });
    });
});
