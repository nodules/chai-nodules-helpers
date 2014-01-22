module.exports = function(chai) {
    var assert = chai.assert;

    assert.throwTerror = function(fn, ErrClass, spec) {
        var assertionArgs = [ fn ];

        if (typeof ErrClass !== 'function') {
            spec = ErrClass;
        } else {
            assertionArgs.push(ErrClass);

            try {
                switch (typeof spec) {
                    case 'string':
                        // get code by code name
                        spec = ErrClass.CODES[spec];
                        /* falls through */
                    case 'number':
                        // get message template by code and convert it to appropriate regexp
                        spec = new RegExp('^' + ErrClass.MESSAGES[spec].replace(/%.*%/g, '.*') + '$', 'ig');
                    // in other cases keep the spec as is
                }
            } catch (error) {
                // add hints to error message about invalid arguments for assertion
                if (error instanceof TypeError) {
                    if (typeof ErrClass.CODES === 'object' &&
                        typeof ErrClass.MESSAGES === 'object' &&
                        typeof ErrClass.prototype.name === 'string') {
                        error.message += [
                                ' (looks like error code passed to assert.throwTerror is not declared for ' +
                                ErrClass.prototype.name +
                                ')'
                            ].join('');
                    } else {
                        error.message +=
                            ' (looks like error class passed to assert.throwTerror is not a Terror inheritor)';
                    }
                }

                throw error;
            }
        }

        if (typeof spec !== 'undefined') {
            assertionArgs.push(spec);
        }

        assert.throw.apply(assert, assertionArgs);
    };
};
