mpw-js
======

mpw-js is a JavaScript + Web Crypto implementation of the Master Password App (@Lyndir/MasterPassword) algorithm (<http://masterpasswordapp.com/algorithm.html>).

mpw-js relies heavily on `window.crypto.subtle` and will only work on a modern browser. It is written in ES6 JS but is transpiled to ES5 JS for browsers that do not yet support ES6 JS. It is purely inded as a proof-of-concept.

The `MPW` class implements `static calculateKey(name, password)` which is an implementation of step 1 of the algorithm, *Calculate the **master key** from a user's name and master password.*, it accepts two arguments, the users full name and the users master password; `calculateKey` is invoked automatically by the constructor.

`MPW` also implements `calculateSeed(site, counter = 0)`, an implementation of step 2 of the algorithm, *Calculate the **template seed** from the site's name and counter.*, it accepts two arguments, the name of the site -- potentially it's FQDN -- and a counter -- *This is an integer that can be incremented when the user needs a new password for the site.*.

`MPW` implements `generate(site, counter = 0, template = "long")` which is an implementation of step 3 of the algorithm, *Encode a **site password** using the site's type template.*, it accepts three arguments, the name of the site -- potentially it's FQDN -- and a counter -- *This is an integer that can be incremented when the user needs a new password for the site.* -- which are passed to `calculateSeed`, and `template` which refers to any of the 'Password Type Templates' supported by the algorithm -- maximum, long, medium, short, basic or pin.

*[ES6]: ECMAScript 6
*[JS]: JavaScript
*[FQDN]: fully qualified domain name