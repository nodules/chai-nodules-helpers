module.exports = function(chai) {
    var assert = chai.assert;

    /**
     * @param {Objex} Target for mixing (Objex inheritor)
     * @param {*} Mixin to check
     * @param {String} mixinName for assertion messages
     * @param {String[]} staticExceptions typically: ['constructor', 'prototype', 'create', 'mixin', '__super']
     * @param {String[]} prototypeExceptions typically: ['constructor']
     */
    assert.mixedProperly = function(Target, Mixin, mixinName, staticExceptions, prototypeExceptions, mixingArgs) {
        var staticExceptionsValues = staticExceptions.reduce(function(hash, propName) {
                hash[propName] = Target[propName];

                return hash;
            }, {}),
            ORIGINAL_CONSTRUCTOR = Target.prototype.constructor;

        mixingArgs = [ Mixin ].concat(mixingArgs);

        assert.doesNotThrow(function() {
            Target.mixin.apply(Target, mixingArgs);
        });

        Object.getOwnPropertyNames(Mixin)
            .forEach(function(propName) {
                if (staticExceptions.indexOf(propName) < 0) {
                    assert.deepEqual(
                        Mixin[propName],
                        Target[propName],
                        'static property "' + propName + '" should be mixed from ' + mixinName);
                } else {
                    assert.strictEqual(
                        Target[propName],
                        staticExceptionsValues[propName],
                        'static property "' + propName + '" should keep the same value');
                }
            });

        Object.getOwnPropertyNames(Mixin.prototype)
            .forEach(function(propName) {
                if (propName === 'constructor') {
                    assert.strictEqual(
                        Target.prototype.constructor,
                        ORIGINAL_CONSTRUCTOR,
                        'prototype property "' + propName + '" should keep the same value');
                } else if (prototypeExceptions.indexOf(propName) < 0) {
                    assert.deepEqual(
                        Mixin.prototype[propName],
                        Target.prototype[propName],
                        'property "' + propName + '" should be mixed from ' + mixinName);
                }
            });
    };
};
