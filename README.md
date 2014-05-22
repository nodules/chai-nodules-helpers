# Nodules-specific assertions for [Chai](http://chaijs.com)

## Installation and usage

```console
$ npm install chai-nodules-helpers
```

```javascript
var assert = require('chai').use(require('chai-nodules-helpers')).assert;

assert.throwTerror(...);
assert.mixedProperly(...);
```

### Note

All assertions available for [assert style](http://chaijs.com/guide/styles/#assert-section) only.

## [Objex](https://github.com/nodules/objex)

### assert.isMixed()

`assert.isMixed(Target, Mixin, mixinName, staticExceptions, prototypeExceptions, mixingArgs)`

* `{Objex} Target` – constructor;
* `{Function|Object} Mixin` – mixin;
* `{String} mixinName` – used in assertions messages;
* `{String[]} staticExceptions` – array of statics propertyies names excluded from assertions;
* `{String[]} prototypeExceptions` – array of prototypes propertyies names excluded from assertions;
* `{Array} [mixingArgs]` – additional arguments to pass to `mixin()` after `Mixin` itself.

### assert.canBeMixed()

`assert.canBeMixed(Target, Mixin, mixinName, staticExceptions, prototypeExceptions, mixingArgs)`

* `{Objex} Target` – constructor, inheritor of the Objex, `mixin` method applies to;
* `{Function|Object} Mixin` – mixin;
* `{String} mixinName` – used in assertions messages;
* `{String[]} staticExceptions` – array of statics propertyies names excluded from assertions;
* `{String[]} prototypeExceptions` – array of prototypes propertyies names excluded from assertions;
* `{Array} [mixingArgs]` – additional arguments to pass to `mixin()` after `Mixin` itself.

## [Terror](https://github.com/nodules/terror)

### assert.throwTerror()

`assert.throwTerror(fn, ErrorClass, spec)`

* `{Function} fn` – a function which expected to throw;
* `{Fucntion|Error|Terror} [ErrorClass]` – must be a Terror inheritor, if `spec` is specified, or any Error inheritor in other case;
* `{RegExp|String|Number} [spec]` – error specifier; can be a string (Terror code name), number (Terror code) or RegExp (used for message test).

If second argument is not a constructor (function), then helper recognize it as an specifier arg `spec`.
