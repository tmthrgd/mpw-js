window.scrypt = function() {
  var SCRYPT_MEMORY = 512 * 1024 * 1024;
  if (window.Worker) {
    var scripts = document.getElementsByTagName("script");
    var wrkrsrc = ("// Import scrypt-asm.js which is scrypt.c compiled w/ Emscripten\nimportScripts(\"" + (window.SCRYPTASM_PATH || (scripts[$traceurRuntime.toProperty(scripts.length - 1)].src + "/../scrypt-asm.js")) + "\");\n\n// Create the Emscripten factory\nvar scrypt_module = scrypt_module_factory(" + SCRYPT_MEMORY + ");\n\n// Wait for incoming messages\n// Pull out the needed values from the e argument\nthis.addEventListener(\"message\", function (e) {\n\ttry {\n\t\t// Invoke the Emscripten compiled crypto_scrypt routine\n\t\tvar data = scrypt_module.crypto_scrypt(e.data.passwd, e.data.salt, e.data.n, e.data.r, e.data.p, e.data.buflen);\n\t\t\n\t\t// Send the data back to the DOM transferring ownership\n\t\t// of data to the DOM\n\t\tthis.postMessage({\n\t\t\tid: e.data.id,\n\t\t\t\n\t\t\tdata: data\n\t\t}, [ data.buffer ]);\n\t} catch(err) {\n\t\t// Send the error back to the DOM\n\t\tthis.postMessage({\n\t\t\tid: e.data.id,\n\t\t\t\n\t\t\terr: err\n\t\t});\n\t}\n}, false);");
    if (window.URL && window.Blob) {
      var url = URL.createObjectURL(new Blob([wrkrsrc], {type: "application/javascript"}));
    } else {
      var url = ("data:application/javascript;charset=utf-8," + encodeURIComponent(wrkrsrc));
    }
    var scryptWorker = new Worker(url);
    var scryptID = 1;
    var scryptcbs = {};
    var messageName = ("scrypt-" + Math.random()).replace("0.", "");
    scryptWorker.addEventListener("message", function($__0) {
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
        scryptWorker.postMessage({
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
  } else {
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
