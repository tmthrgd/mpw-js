window.scrypt = function() {
  var SCRYPT_MEMORY = 512 * 1024 * 1024;
  try {
    var scripts = document.getElementsByTagName("script");
    var scryptwrkr = new Worker(URL.createObjectURL(new Blob([("!" + function() {
      var SCRYPT_MEMORY = 512 * 1024 * 1024;
      importScripts("{{scrypt-asm.js}}");
      var scrypt_module = scrypt_module_factory(SCRYPT_MEMORY);
      var $traceurRuntime = {assertObject: (function(a) {
          return a;
        })};
      this.addEventListener("message", function($__0) {
        var $__2 = $__0.data,
            id = $__2.id,
            passwd = $__2.passwd,
            salt = $__2.salt,
            n = $__2.n,
            r = $__2.r,
            p = $__2.p,
            buflen = $__2.buflen;
        try {
          var data = scrypt_module.crypto_scrypt(passwd, salt, n, r, p, buflen);
          this.postMessage({
            id: id,
            data: data
          }, [data.buffer]);
        } catch (err) {
          this.postMessage({
            id: id,
            err: err
          });
        }
      }, false);
    } + "()").replace("{{scrypt-asm.js}}", window.SCRYPTASM_PATH || (scripts[$traceurRuntime.toProperty(scripts.length - 1)].src + "/../scrypt-asm.js"))], {type: "application/javascript"})));
    var scryptID = 1;
    var scryptcbs = {};
    var messageName = ("scrypt-" + Math.random()).replace("0.", "");
    scryptwrkr.addEventListener("message", function($__0) {
      var $__2 = $__0.data,
          id = $__2.id,
          data = $__2.data,
          err = $__2.err;
      var $__3 = id.split("$"),
          name = $__3[0],
          scryptID = $__3[1];
      if (name === messageName) {
        var $__4 = scryptcbs[$traceurRuntime.toProperty(scryptID)],
            resolve = $__4[0],
            reject = $__4[1];
        data ? resolve(data) : reject(err);
        delete scryptcbs[$traceurRuntime.toProperty(scryptID)];
      }
    });
    return (function(passwd, salt, n, r, p, buflen) {
      return new Promise(function(resolve, reject) {
        scryptcbs[$traceurRuntime.toProperty(scryptID)] = [resolve, reject];
        scryptwrkr.postMessage({
          id: [messageName, scryptID++].join("$"),
          passwd: passwd,
          salt: salt,
          n: n,
          r: r,
          p: p,
          buflen: buflen
        }, [passwd.buffer, salt.buffer]);
      });
    });
  } catch (e) {
    console.error(e);
    var scrypt_module = null;
    var script = document.createElement("script");
    script.src = window.SCRYPTASM_PATH || "scrypt-asm.js", script.async = true;
    script.addEventListener("load", function() {
      if (!scrypt_module) {
        scrypt_module = scrypt_module_factory(SCRYPT_MEMORY);
      }
    }, false);
    document.body.appendChild(script);
    return (function(passwd, salt, n, r, p, buflen) {
      return new Promise(function(resolve, reject) {
        window.setImmediate(function() {
          if (!scrypt_module) {
            if (!window.scrypt_module_factory) {
              return reject(new Error("scrypt-asm.js not loaded"));
            }
            scrypt_module = scrypt_module_factory(SCRYPT_MEMORY);
          }
          resolve(scrypt_module.crypto_scrypt(passwd, salt, n, r, p, buflen));
        });
      });
    });
  }
}();

//# sourceMappingURL=scrypt.map
