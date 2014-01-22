/* global describe, it */

var assert = require('assert');

describe('terror assertion helpers', function() {
    var chai = require('chai').use(require('../')),
        Terror = require('terror');

    describe('assert.throwTerror()', function() {
        var CustomError = Terror.create('CustomError', {
                MY_FAULT:
                    [ 2001, 'It is my own fault, sir.' ]
            }),
            SpecialError = Terror.create('SpecialError', {
                UNEXPECTED_APP_STATE:
                    [ 3001, 'Application has an unexpected state, sir!' ]
            });

        it('should be exposed to chai.assert interface', function() {
            assert.strictEqual(typeof chai.assert.throwTerror, 'function', 'assert.throwTerror exposed');
        });

        it('should not throw on non-Terror error if ErrClass or/and spec is not passed', function() {
            assert.doesNotThrow(function() {
                chai.assert.throwTerror(function() {
                    throw new Error('oh');
                });
            }, 'error class and spec are not passed');

            assert.doesNotThrow(function() {
                chai.assert.throwTerror(function() {
                    throw new Error('oh');
                }, Error);
            }, 'error class is passed, but spec is not');
        });

        it('should throw error with meaningful message if `spec` is passed, but ErrClass is not a Terror',
           function() {
                assert.throws(function() {
                    chai.assert.throwTerror(function() {
                        throw new Error('ok');
                    }, Error, 'ERROR_CODE');
                }, function(err) {
                    return (err instanceof TypeError) && / \(.*Terror.*\)/i.test(err.message);
                });
            });

        it('should throw error with meaningful message if error code specified by `spec` is not declared in ErrClass',
           function() {
                assert.throws(function() {
                    chai.assert.throwTerror(function() {
                        throw CustomError.createError();
                    }, CustomError, 'NOT_MY_FAULT');
                }, function(err) {
                    return (err instanceof TypeError) && / \(.*Terror.*\)/i.test(err.message);
                });
            });

        it('should not throws if error class is matching and `spec` is not specified', function() {
            assert.doesNotThrow(function() {
                chai.assert.throwTerror(function() {
                    throw CustomError.createError();
                }, CustomError);
            });
        });

        it('should throw error if error class is not matching', function() {
            assert.throws(function() {
                chai.assert.throwTerror(function() {
                    throw SpecialError.createError();
                }, CustomError);
            }, chai.AssertioError);
        });

        it('should not throws if error class and specifier are matching', function() {
            assert.doesNotThrow(function() {
                chai.assert.throwTerror(function() {
                    throw CustomError.createError(CustomError.CODES.MY_FAULT);
                }, CustomError, CustomError.CODES.MY_FAULT);
            });

            assert.doesNotThrow(function() {
                chai.assert.throwTerror(function() {
                    throw CustomError.createError(CustomError.CODES.MY_FAULT);
                }, CustomError, 'MY_FAULT');
            });
        });

        it('should throw error if error class is matching, but specifier is not', function() {
            assert.throws(function() {
                chai.assert.throwTerror(function() {
                    throw CustomError.createError();
                }, CustomError, CustomError.CODES.MY_FAULT);
            }, chai.AssertionError);

            assert.throws(function() {
                chai.assert.throwTerror(function() {
                    throw CustomError.createError();
                }, CustomError, CustomError.CODES.MY_FAULT);
            }, chai.AssertionError);
        });
    });
});
