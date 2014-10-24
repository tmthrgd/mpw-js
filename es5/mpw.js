var txtencoder = new TextEncoder;
var MPW = function MPW(name, password) {
  "use strict";
  this.name = name;
  this.key = $MPW.calculateKey(name, password);
};
var $MPW = MPW;
($traceurRuntime.createClass)(MPW, {
  calculateSeed: function(site) {
    "use strict";
    var counter = arguments[1] !== (void 0) ? arguments[1] : 1;
    var context = arguments[2] !== (void 0) ? arguments[2] : null;
    var NS = arguments[3] !== (void 0) ? arguments[3] : $MPW.PasswordNS;
    if (!site) {
      return Promise.reject(new Error("Argument site not present"));
    }
    if (counter < 1 || counter > 2147483647) {
      return Promise.reject(new Error("Argument counter out of range"));
    }
    try {
      site = txtencoder.encode(site);
      NS = txtencoder.encode(NS);
      if (context) {
        context = txtencoder.encode(context);
      }
      var data = new Uint8Array(NS.length + 4 + site.length + 4 + (context ? 4 + context.length : 0));
      var dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      var i = 0;
      data.set(NS, i);
      i += NS.length;
      dataView.setUint32(i, site.length, false);
      i += 4;
      data.set(site, i);
      i += site.length;
      dataView.setUint32(i, counter, false);
      i += 4;
      if (context) {
        dataView.setUint32(i, context.length, false);
        i += 4;
        data.set(context, i);
        i += context.length;
      }
    } catch (e) {
      return Promise.reject(e);
    }
    if (window.crypto.subtle) {
      return this.key.then((function(key) {
        return window.crypto.subtle.sign({
          name: "HMAC",
          hash: {name: "SHA-256"}
        }, key, data);
      })).then((function(seed) {
        return new Uint8Array(seed);
      }));
    } else {
      return this.key.then(function(key) {
        data = CryptoJS.lib.WordArray.create(data);
        key = CryptoJS.lib.WordArray.create(key);
        return CryptoJS.HmacSHA256(data, key);
      }).then(function(hash) {
        var seed = new Uint8Array(hash.words.length * 4);
        var seedView = new DataView(seed.buffer, seed.byteOffset, seed.byteLength);
        for (var i = 0; i < hash.words.length; i++) {
          seedView.setInt32(i * 4, hash.words[$traceurRuntime.toProperty(i)], false);
        }
        return seed;
      });
    }
  },
  generate: function(site) {
    "use strict";
    var counter = arguments[1] !== (void 0) ? arguments[1] : 1;
    var context = arguments[2] !== (void 0) ? arguments[2] : null;
    var template = arguments[3] !== (void 0) ? arguments[3] : "long";
    var NS = arguments[4] !== (void 0) ? arguments[4] : $MPW.PasswordNS;
    if (!($traceurRuntime.toProperty(template) in $MPW.templates)) {
      return Promise.reject(new Error("Argument template invalid"));
    }
    return this.calculateSeed(site, counter, context, NS).then(function(seed) {
      template = $MPW.templates[$traceurRuntime.toProperty(template)];
      template = template[$traceurRuntime.toProperty(seed[0] % template.length)];
      return template.split("").map(function(c, i) {
        var chars = $MPW.passchars[$traceurRuntime.toProperty(c)];
        return chars[$traceurRuntime.toProperty(seed[$traceurRuntime.toProperty(i + 1)] % chars.length)];
      }).join("");
    });
  },
  generatePassword: function(site) {
    "use strict";
    var counter = arguments[1] !== (void 0) ? arguments[1] : 1;
    var template = arguments[2] !== (void 0) ? arguments[2] : "long";
    return this.generate(site, counter, null, template, $MPW.PasswordNS);
  },
  generateLogin: function(site) {
    "use strict";
    var counter = arguments[1] !== (void 0) ? arguments[1] : 1;
    var template = arguments[2] !== (void 0) ? arguments[2] : "name";
    return this.generate(site, counter, null, template, $MPW.LoginNS);
  },
  generateAnswer: function(site) {
    "use strict";
    var counter = arguments[1] !== (void 0) ? arguments[1] : 1;
    var context = arguments[2] !== (void 0) ? arguments[2] : "";
    var template = arguments[3] !== (void 0) ? arguments[3] : "phrase";
    return this.generate(site, counter, context, template, $MPW.AnswerNS);
  },
  invalidate: function() {
    "use strict";
    this.key = Promise.reject(new Error("invalid state"));
  }
}, {
  calculateKey: function(name, password) {
    "use strict";
    if (!name || !name.length) {
      return Promise.reject(new Error("Argument name not present"));
    }
    if (!password || !password.length) {
      return Promise.reject(new Error("Argument password not present"));
    }
    try {
      password = txtencoder.encode(password);
      name = txtencoder.encode(name);
      var NS = txtencoder.encode($MPW.NS);
      var salt = new Uint8Array(NS.length + 4 + name.length);
      var saltView = new DataView(salt.buffer, salt.byteOffset, salt.byteLength);
      var i = 0;
      salt.set(NS, i);
      i += NS.length;
      saltView.setUint32(i, name.length, false);
      i += 4;
      salt.set(name, i);
      i += name.length;
    } catch (e) {
      return Promise.reject(e);
    }
    var key = window.scrypt(password, salt, 32768, 8, 2, 64);
    return window.crypto.subtle ? key.then((function(key) {
      return window.crypto.subtle.importKey("raw", key, {
        name: "HMAC",
        hash: {name: "SHA-256"}
      }, false, ["sign"]);
    })) : key;
  },
  test: function() {
    "use strict";
    return new $MPW("user", "password").generate("example.com", 0, null, "long", $MPW.PasswordNS).then(function(password) {
      console.assert(password === "KezpWado2+Fazo", "Self-test failed; expected: KezpWado2+Fazo; got: " + password);
      return password === "KezpWado2+Fazo" ? Promise.resolve() : Promise.reject(new Error("Self-test failed; expected: KezpWado2+Fazo; got: " + password));
    });
  }
});
MPW.NS = "com.lyndir.masterpassword";
MPW.PasswordNS = "com.lyndir.masterpassword";
MPW.LoginNS = "com.lyndir.masterpassword.login";
MPW.AnswerNS = "com.lyndir.masterpassword.answer";
MPW.templates = {
  'maximum': ["anoxxxxxxxxxxxxxxxxx", "axxxxxxxxxxxxxxxxxno"],
  'long': ["CvcvnoCvcvCvcv", "CvcvCvcvnoCvcv", "CvcvCvcvCvcvno", "CvccnoCvcvCvcv", "CvccCvcvnoCvcv", "CvccCvcvCvcvno", "CvcvnoCvccCvcv", "CvcvCvccnoCvcv", "CvcvCvccCvcvno", "CvcvnoCvcvCvcc", "CvcvCvcvnoCvcc", "CvcvCvcvCvccno", "CvccnoCvccCvcv", "CvccCvccnoCvcv", "CvccCvccCvcvno", "CvcvnoCvccCvcc", "CvcvCvccnoCvcc", "CvcvCvccCvccno", "CvccnoCvcvCvcc", "CvccCvcvnoCvcc", "CvccCvcvCvccno"],
  'medium': ["CvcnoCvc", "CvcCvcno"],
  'basic': ["aaanaaan", "aannaaan", "aaannaaa"],
  'short': ["Cvcn"],
  'pin': ["nnnn"],
  'name': ["cvccvcvcv"],
  'phrase': ["cvcc cvc cvccvcv cvc", "cvc cvccvcvcv cvcv", "cv cvccv cvc cvcvccv"]
};
MPW.passchars = {
  V: "AEIOU",
  C: "BCDFGHJKLMNPQRSTVWXYZ",
  v: "aeiou",
  c: "bcdfghjklmnpqrstvwxyz",
  A: "AEIOUBCDFGHJKLMNPQRSTVWXYZ",
  a: "AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz",
  n: "0123456789",
  o: "@&%?,=[]_:-+*$#!'^~;()/.",
  x: "AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz0123456789@&%?,=[]_:-+*$#!'^~;()/.",
  " ": " "
};

//# sourceMappingURL=mpw.map
