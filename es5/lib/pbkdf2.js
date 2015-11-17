window.pbkdf2 = function() {
  function pbkdf2_js(password, salt, iter, keyLen, hash) {
    var hashLen;
    switch (hash.name || hash) {
      case "SHA1":
        hashLen = 160 / 8;
        break;
      case "SHA224":
      case "SHA-224":
        hashLen = 224 / 8;
        break;
      case "SHA256":
      case "SHA-256":
        hashLen = 256 / 8;
        break;
      case "SHA384":
      case "SHA-384":
        hashLen = 384 / 8;
        break;
      case "SHA512":
      case "SHA-512":
        hashLen = 512 / 8;
        break;
      default:
        return Promise.reject(new Error("Invalid argument hash"));
    }
    var numBlocks = ((keyLen + hashLen - 1) / hashLen) | 0;
    var data = new Uint8Array(salt.length + 4);
    var dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
    data.set(salt);
    return window.crypto.subtle.importKey("raw", password, {
      name: "HMAC",
      hash: hash
    }, false, ["sign"]).then(function(key) {
      var dk = new Uint8Array(numBlocks * hashLen);
      var x = Promise.resolve();
      var $__0 = function(block, dki) {
        x = x.then((function() {
          return dataView.setUint32(salt.length, block, false);
        })).then((function() {
          return window.crypto.subtle.sign({
            name: "HMAC",
            hash: hash
          }, key, data);
        })).then((function(pdk) {
          return (dk.set(new Uint8Array(pdk), dki), pdk);
        }));
        for (var n = 2; n <= iter; n++) {
          x = x.then((function(U) {
            return window.crypto.subtle.sign({
              name: "HMAC",
              hash: hash
            }, key, U);
          })).then(function(U) {
            var Ux = new Uint8Array(U);
            for (var i = 0; i < Ux.length; i++) {
              dk[$traceurRuntime.toProperty(dki + i)] ^= Ux[$traceurRuntime.toProperty(i)];
            }
            return U;
          });
        }
      };
      for (var block = 1,
          dki = 0; block <= numBlocks; block++, dki += hashLen) {
        $__0(block, dki);
      }
      return x.then((function() {
        return dk.subarray(0, keyLen);
      }));
    });
  }
  if (window.crypto.subtle) {
    return function(password, salt, iter, keyLen, hash) {
      var self = this;
      var args = arguments;
      return window.crypto.subtle.importKey("raw", password, {
        name: "PBKDF2",
        hash: hash
      }, false, ["deriveBits"]).then((function(key) {
        return window.crypto.subtle.deriveBits({
          name: "PBKDF2",
          salt: salt,
          iterations: iter,
          hash: hash
        }, key, keyLen * 8);
      })).then((function(key) {
        return new Uint8Array(key);
      })).catch((function(err) {
        return (err.name === "OperationError") ? (window.pbkdf2 = pbkdf2_js).apply(self, args) : Promise.reject(err);
      }));
    };
  } else {
    return function(password, salt, iter, keyLen, hash) {
      var hashAlg = CryptoJS.algo[$traceurRuntime.toProperty(hash.name || hash)] || CryptoJS.algo[$traceurRuntime.toProperty((hash.name || hash).replace("-", ""))];
      if (!hashAlg) {
        return Promise.reject(new Error("Invalid argument hash"));
      }
      return new Promise(function(resolve, reject) {
        window.setImmediate(function() {
          password = CryptoJS.lib.WordArray.create(password);
          salt = CryptoJS.lib.WordArray.create(salt);
          var Ckey = CryptoJS.PBKDF2(password, salt, {
            keySize: keyLen * 8 / 32,
            iterations: iter,
            hasher: hashAlg
          });
          var key = new Uint8Array(Ckey.words.length * 4);
          var keyView = new DataView(key.buffer, key.byteOffset, key.byteLength);
          for (var i = 0; i < Ckey.words.length; i++) {
            keyView.setInt32(i * 4, Ckey.words[$traceurRuntime.toProperty(i)], false);
          }
          resolve(key);
        });
      });
    };
  }
}();

//# sourceMappingURL=pbkdf2.map
