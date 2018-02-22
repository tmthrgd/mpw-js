mpw-js
======

mpw-js is a JavaScript (+ Web Crypto) implementation of the Master Password App ([Lyndir/MasterPassword](https://github.com/Lyndir/MasterPassword)) algorithm (<http://masterpasswordapp.com/algorithm.html>).

mpw-js relies on `window.crypto.subtle` when it is available on [modern browser](http://caniuse.com/#feat=cryptography) but will fallback to using [crypto-js](https://code.google.com/p/crypto-js/). It is written in ES6 JS but is transpiled to ES5 JS for browsers that do not yet support ES6 JS. It is purely intended as a proof-of-concept.

The `MPW` constructor `constructor(name, password)` accepts two mandatory arguments; `.name` is set to the argument `name` and both `name` and `password` are subsequently passed to `calculateKey`, `.key` being set to the result.

The `MPW` class implements `static calculateKey(name, password)` which is an implementation of step 1 of the algorithm, *Calculate the __master key__ from a user's name and master password*, it accepts two mandatory arguments, the users full name and the users master password; `calculateKey` is invoked automatically by the constructor.

`MPW` also implements `calculateSeed(site, counter = 1, context = null, NS = MPW.NS)`, an implementation of step 2 of the algorithm, *Calculate the __template seed__ from the site's name and counter*, it accepts four arguments, the name of the site -- potentially it's FQDN -- and a counter -- *This is an integer that can be incremented when the user needs a new password for the site*. The latter two arguments are for extended functionality; `context` is used to provide context to generated security answers and `NS` is used to alter the use of seed, either `MPW.AuthenticationNS` for passwords, `MPW.IdentificationNS` for usernames or `MPW.RecoveryNS` for security answers. `calculateSeed` is invoked automatically by `generate`.

`MPW` implements the generic `generate(site, counter = 1, context = null, template = "long", NS = MPW.NS)` which is an implementation of step 3 of the algorithm, *Encode a __site password__ using the site's type template*, it accepts five arguments, the name of the site -- potentially it's FQDN -- and a counter -- *This is an integer that can be incremented when the user needs a new password for the site.* -- which are passed to `calculateSeed`, `context` whose use is equal to `calculateSeed` (see above), `template` which refers to any of the 'Password Type Templates' supported by the algorithm -- maximum, long, medium, short, basic or pin, and `NS` whose use is equal to `calculateSeed` (see above).

`MPW` also implements the specialised functions `generateAuthentication(site, counter = 1, context = "", template = "long")` for generating passwords, the purpose of the arguments of this are equal to those of `generate` (see above); `generateIdentification(site, counter = 1, context = "", template = "name")` for generating usernames, the purpose of the arguments of this are equal to those of `generate` (see above); and `generateRecovery(site, counter = 1, context = "", template = "phrase")` for generating usernames, the purpose of the arguments of this are equal to those of `generate` (see above).

`MPW` also implements `invalidate()` which sets `.key` to a `Promise.reject`, preventing further access to the non-exportable key.

`MPW` finally implements `static test()` which provides a simple, non-rigorous test to ensure correct functionality of the algorithm.

Demo
----

A working demo can be found in the [gh-pages branch](https://github.com/tmthrgd/mpw-js/tree/gh-pages) and at <https://tmthrgd.github.io/mpw-js/>.

Dependencies
------------

	npm install -g traceur

License
-------

This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit <http://creativecommons.org/licenses/by/4.0/> or see [LICENSE](https://github.com/tmthrgd/mpw-js/blob/master/LICENSE).