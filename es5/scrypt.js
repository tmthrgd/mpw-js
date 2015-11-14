window.scrypt = function() {
  function salsaXOR(tmp, inp, out) {
    var w = [];
    var x = [];
    for (var i = 0; i < 16; i++) {
      x[$traceurRuntime.toProperty(i)] = w[$traceurRuntime.toProperty(i)] = tmp[$traceurRuntime.toProperty(i)] ^ inp[$traceurRuntime.toProperty(i)];
    }
    for (var i$__0 = 0,
        u; i$__0 < 8; i$__0 += 2) {
      u = x[0] + x[12];
      x[4] ^= (u << 7) | (u >>> (32 - 7));
      u = x[4] + x[0];
      x[8] ^= (u << 9) | (u >>> (32 - 9));
      u = x[8] + x[4];
      x[12] ^= (u << 13) | (u >>> (32 - 13));
      u = x[12] + x[8];
      x[0] ^= (u << 18) | (u >>> (32 - 18));
      u = x[5] + x[1];
      x[9] ^= (u << 7) | (u >>> (32 - 7));
      u = x[9] + x[5];
      x[13] ^= (u << 9) | (u >>> (32 - 9));
      u = x[13] + x[9];
      x[1] ^= (u << 13) | (u >>> (32 - 13));
      u = x[1] + x[13];
      x[5] ^= (u << 18) | (u >>> (32 - 18));
      u = x[10] + x[6];
      x[14] ^= (u << 7) | (u >>> (32 - 7));
      u = x[14] + x[10];
      x[2] ^= (u << 9) | (u >>> (32 - 9));
      u = x[2] + x[14];
      x[6] ^= (u << 13) | (u >>> (32 - 13));
      u = x[6] + x[2];
      x[10] ^= (u << 18) | (u >>> (32 - 18));
      u = x[15] + x[11];
      x[3] ^= (u << 7) | (u >>> (32 - 7));
      u = x[3] + x[15];
      x[7] ^= (u << 9) | (u >>> (32 - 9));
      u = x[7] + x[3];
      x[11] ^= (u << 13) | (u >>> (32 - 13));
      u = x[11] + x[7];
      x[15] ^= (u << 18) | (u >>> (32 - 18));
      u = x[0] + x[3];
      x[1] ^= (u << 7) | (u >>> (32 - 7));
      u = x[1] + x[0];
      x[2] ^= (u << 9) | (u >>> (32 - 9));
      u = x[2] + x[1];
      x[3] ^= (u << 13) | (u >>> (32 - 13));
      u = x[3] + x[2];
      x[0] ^= (u << 18) | (u >>> (32 - 18));
      u = x[5] + x[4];
      x[6] ^= (u << 7) | (u >>> (32 - 7));
      u = x[6] + x[5];
      x[7] ^= (u << 9) | (u >>> (32 - 9));
      u = x[7] + x[6];
      x[4] ^= (u << 13) | (u >>> (32 - 13));
      u = x[4] + x[7];
      x[5] ^= (u << 18) | (u >>> (32 - 18));
      u = x[10] + x[9];
      x[11] ^= (u << 7) | (u >>> (32 - 7));
      u = x[11] + x[10];
      x[8] ^= (u << 9) | (u >>> (32 - 9));
      u = x[8] + x[11];
      x[9] ^= (u << 13) | (u >>> (32 - 13));
      u = x[9] + x[8];
      x[10] ^= (u << 18) | (u >>> (32 - 18));
      u = x[15] + x[14];
      x[12] ^= (u << 7) | (u >>> (32 - 7));
      u = x[12] + x[15];
      x[13] ^= (u << 9) | (u >>> (32 - 9));
      u = x[13] + x[12];
      x[14] ^= (u << 13) | (u >>> (32 - 13));
      u = x[14] + x[13];
      x[15] ^= (u << 18) | (u >>> (32 - 18));
    }
    for (var i$__1 = 0; i$__1 < 16; i$__1++) {
      out[$traceurRuntime.toProperty(i$__1)] = tmp[$traceurRuntime.toProperty(i$__1)] = x[$traceurRuntime.toProperty(i$__1)] + w[$traceurRuntime.toProperty(i$__1)];
    }
  }
  function blockMix(inp, out, r) {
    var tmp = inp.slice((2 * r - 1) * 16, (2 * r - 1) * 16 + 16);
    for (var i = 0; i < 2 * r; i += 2) {
      salsaXOR(tmp, inp.subarray(i * 16), out.subarray(i * 8));
      salsaXOR(tmp, inp.subarray(i * 16 + 16), out.subarray(i * 8 + r * 16));
    }
  }
  function smix(b, r, N, v, x, y) {
    var bView = new DataView(b.buffer, b.byteOffset, b.byteLength);
    for (var i = 0,
        j = 0; i < x.length; i++, j += 4) {
      x[$traceurRuntime.toProperty(i)] = bView.getUint32(j, true);
    }
    for (var i$__2 = 0; i$__2 < N; i$__2 += 2) {
      v.set(x, i$__2 * 32 * r);
      blockMix(x, y, r);
      v.set(y, (i$__2 + 1) * 32 * r);
      blockMix(y, x, r);
    }
    for (var i$__3 = 0,
        j$__4,
        sh32 = Math.pow(2, 32); i$__3 < N; i$__3 += 2) {
      j$__4 = (x[$traceurRuntime.toProperty((2 * r - 1) * 16)] | (x[$traceurRuntime.toProperty((2 * r - 1) * 16 + 1)] * sh32)) & (N - 1);
      for (var k = 0; k < x.length; k++) {
        x[$traceurRuntime.toProperty(k)] ^= v[$traceurRuntime.toProperty(j$__4 * 32 * r + k)];
      }
      blockMix(x, y, r);
      j$__4 = (y[$traceurRuntime.toProperty((2 * r - 1) * 16)] | (y[$traceurRuntime.toProperty((2 * r - 1) * 16 + 1)] * sh32)) & (N - 1);
      for (var k$__5 = 0; k$__5 < x.length; k$__5++) {
        y[$traceurRuntime.toProperty(k$__5)] ^= v[$traceurRuntime.toProperty(j$__4 * 32 * r + k$__5)];
      }
      blockMix(y, x, r);
    }
    for (var i$__6 = 0,
        j$__7 = 0; i$__6 < x.length; i$__6++, j$__7 += 4) {
      bView.setUint32(j$__7, x[$traceurRuntime.toProperty(i$__6)], true);
    }
  }
  return function(passphrase, salt, N, r, p, keyLen) {
    if (r * p >= Math.pow(2, 30)) {
      return Promise.reject(Error("Parameters r and p are too large"));
    }
    if (N < 2 || N & (N - 1) != 0 || N > Math.pow(2, 32) - 1) {
      return Promise.reject(Error("Argument N is invalid; N must be > 1, a power of 2 and less than 2^32"));
    }
    var x = new Uint32Array(32 * r);
    var y = new Uint32Array(32 * r);
    var v = new Uint32Array(32 * N * r);
    var b = pbkdf2(passphrase, salt, 1, p * 128 * r, "SHA-256");
    var $__8 = function(i) {
      b = b.then((function(b) {
        return new Promise((function(resolve, reject) {
          return window.setImmediate((function() {
            return (smix(b.subarray(i * 128 * r), r, N, v, x, y), resolve(b));
          }));
        }));
      }));
    };
    for (var i = 0; i < p; i++) {
      $__8(i);
    }
    return b.then((function(b) {
      return pbkdf2(passphrase, b, 1, keyLen, "SHA-256");
    }));
  };
}();

//# sourceMappingURL=scrypt.map
