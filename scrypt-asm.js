var scrypt_module_factory = (function (requested_total_memory) {
    var Module = {TOTAL_MEMORY: (requested_total_memory || 33554432)};
    var scrypt_raw = Module;
function e(a) {
  throw a;
}
var h = void 0, k = !0, l = null, n = !1;
function q() {
  return function() {
  }
}
var r, u;
u || (u = (function() { try { return Module || {} } catch(e) { return {} } })());
var aa = {}, ba;
for(ba in u) {
  u.hasOwnProperty(ba) && (aa[ba] = u[ba])
}
var v = "object" === typeof process && "function" === typeof require, da = "object" === typeof window, ea = "function" === typeof importScripts, fa = !da && !v && !ea;
if(v) {
  u.print || (u.print = function(a) {
    process.stdout.write(a + "\n")
  });
  u.printErr || (u.printErr = function(a) {
    process.stderr.write(a + "\n")
  });
  var ga = require("fs"), ha = require("path");
  u.read = function(a, b) {
    var a = ha.normalize(a), c = ga.readFileSync(a);
    !c && a != ha.resolve(a) && (a = path.join(__dirname, "..", "src", a), c = ga.readFileSync(a));
    c && !b && (c = c.toString());
    return c
  };
  u.readBinary = function(a) {
    return u.read(a, k)
  };
  u.load = function(a) {
    ia(read(a))
  };
  u.thisProgram = 1 < process.argv.length ? process.argv[1].replace(/\\/g, "/") : "unknown-program";
  u.arguments = process.argv.slice(2);
  "undefined" !== typeof module && (module.exports = u);
  process.on("uncaughtException", function(a) {
    a instanceof ja || e(a)
  })
}else {
  fa ? (u.print || (u.print = print), "undefined" != typeof printErr && (u.printErr = printErr), u.read = "undefined" != typeof read ? read : function() {
    e("no read() available (jsc?)")
  }, u.readBinary = function(a) {
    if("function" === typeof readbuffer) {
      return new Uint8Array(readbuffer(a))
    }
    a = read(a, "binary");
    w("object" === typeof a);
    return a
  }, "undefined" != typeof scriptArgs ? u.arguments = scriptArgs : "undefined" != typeof arguments && (u.arguments = arguments), this.Module = u, eval("if (typeof gc === 'function' && gc.toString().indexOf('[native code]') > 0) var gc = undefined")) : da || ea ? (u.read = function(a) {
    var b = new XMLHttpRequest;
    b.open("GET", a, n);
    b.send(l);
    return b.responseText
  }, "undefined" != typeof arguments && (u.arguments = arguments), "undefined" !== typeof console ? (u.print || (u.print = function(a) {
    console.log(a)
  }), u.printErr || (u.printErr = function(a) {
    console.log(a)
  })) : u.print || (u.print = q()), da ? window.Module = u : u.load = importScripts) : e("Unknown runtime environment. Where are we?")
}
function ia(a) {
  eval.call(l, a)
}
!u.load && u.read && (u.load = function(a) {
  ia(u.read(a))
});
u.print || (u.print = q());
u.printErr || (u.printErr = u.print);
u.arguments || (u.arguments = []);
u.thisProgram || (u.thisProgram = "./this.program");
u.print = u.print;
u.va = u.printErr;
u.preRun = [];
u.postRun = [];
for(ba in aa) {
  aa.hasOwnProperty(ba) && (u[ba] = aa[ba])
}
var A = {$e:function(a) {
  ka = a
}, te:function() {
  return ka
}, Nb:function() {
  return z
}, Mb:function(a) {
  z = a
}, bd:function(a) {
  switch(a) {
    case "i1":
    ;
    case "i8":
      return 1;
    case "i16":
      return 2;
    case "i32":
      return 4;
    case "i64":
      return 8;
    case "float":
      return 4;
    case "double":
      return 8;
    default:
      return"*" === a[a.length - 1] ? A.za : "i" === a[0] ? (a = parseInt(a.substr(1)), w(0 === a % 8), a / 8) : 0
  }
}, ad:function(a) {
  return Math.max(A.bd(a), A.za)
}, Ug:16, wh:function(a, b, c) {
  return!c && ("i64" == a || "double" == a) ? 8 : !a ? Math.min(b, 8) : Math.min(b || (a ? A.ad(a) : 0), A.za)
}, Ya:function(a, b, c) {
  return c && c.length ? (c.splice || (c = Array.prototype.slice.call(c)), c.splice(0, 0, b), u["dynCall_" + a].apply(l, c)) : u["dynCall_" + a].call(l, b)
}, Ab:[], Qd:function(a) {
  for(var b = 0;b < A.Ab.length;b++) {
    if(!A.Ab[b]) {
      return A.Ab[b] = a, 2 * (1 + b)
    }
  }
  e("Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.")
}, Ue:function(a) {
  A.Ab[(a - 2) / 2] = l
}, xh:function(a, b) {
  A.Yb || (A.Yb = {});
  var c = A.Yb[a];
  if(c) {
    return c
  }
  for(var c = [], d = 0;d < b;d++) {
    c.push(String.fromCharCode(36) + d)
  }
  d = la(a);
  '"' === d[0] && (d.indexOf('"', 1) === d.length - 1 ? d = d.substr(1, d.length - 2) : D("invalid EM_ASM input |" + d + "|. Please use EM_ASM(..code..) (no quotes) or EM_ASM({ ..code($0).. }, input) (to input values)"));
  try {
    var f = eval("(function(Module, FS) { return function(" + c.join(",") + "){ " + d + " } })")(u, "undefined" !== typeof E ? E : l)
  }catch(g) {
    u.va("error in executing inline EM_ASM code: " + g + " on: \n\n" + d + "\n\nwith args |" + c + "| (make sure to use the right one out of EM_ASM, EM_ASM_ARGS, etc.)"), e(g)
  }
  return A.Yb[a] = f
}, Sa:function(a) {
  A.Sa.uc || (A.Sa.uc = {});
  A.Sa.uc[a] || (A.Sa.uc[a] = 1, u.va(a))
}, fc:{}, Ah:function(a, b) {
  w(b);
  A.fc[b] || (A.fc[b] = {});
  var c = A.fc[b];
  c[a] || (c[a] = function() {
    return A.Ya(b, a, arguments)
  });
  return c[a]
}, Wa:function() {
  var a = [], b = 0;
  this.Jb = function(c) {
    c &= 255;
    if(0 == a.length) {
      if(0 == (c & 128)) {
        return String.fromCharCode(c)
      }
      a.push(c);
      b = 192 == (c & 224) ? 1 : 224 == (c & 240) ? 2 : 3;
      return""
    }
    if(b && (a.push(c), b--, 0 < b)) {
      return""
    }
    var c = a[0], d = a[1], f = a[2], g = a[3];
    2 == a.length ? c = String.fromCharCode((c & 31) << 6 | d & 63) : 3 == a.length ? c = String.fromCharCode((c & 15) << 12 | (d & 63) << 6 | f & 63) : (c = (c & 7) << 18 | (d & 63) << 12 | (f & 63) << 6 | g & 63, c = String.fromCharCode(((c - 65536) / 1024 | 0) + 55296, (c - 65536) % 1024 + 56320));
    a.length = 0;
    return c
  };
  this.sd = function(a) {
    for(var a = unescape(encodeURIComponent(a)), b = [], f = 0;f < a.length;f++) {
      b.push(a.charCodeAt(f))
    }
    return b
  }
}, yh:function() {
  e("You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work")
}, Lb:function(a) {
  var b = z;
  z = z + a | 0;
  z = z + 15 & -16;
  return b
}, vd:function(a) {
  var b = ma;
  ma = ma + a | 0;
  ma = ma + 15 & -16;
  return b
}, yb:function(a) {
  var b = F;
  F = F + a | 0;
  F = F + 15 & -16;
  F >= na && D("Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value " + na + ", (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.");
  return b
}, Vb:function(a, b) {
  return Math.ceil(a / (b ? b : 16)) * (b ? b : 16)
}, Ee:function(a, b, c) {
  return c ? +(a >>> 0) + 4294967296 * +(b >>> 0) : +(a >>> 0) + 4294967296 * +(b | 0)
}, Tg:8, za:4, Yg:0};
u.Runtime = A;
A.addFunction = A.Qd;
A.removeFunction = A.Ue;
var oa = n, pa, qa, ka;
function w(a, b) {
  a || D("Assertion failed: " + b)
}
function ra(a) {
  var b = u["_" + a];
  if(!b) {
    try {
      b = eval("_" + a)
    }catch(c) {
    }
  }
  w(b, "Cannot call unknown function " + a + " (perhaps LLVM optimizations or closure removed it?)");
  return b
}
var sa, ta;
(function() {
  function a(a) {
    a = a.toString().match(d).slice(1);
    return{arguments:a[0], body:a[1], returnValue:a[2]}
  }
  var b = {stackSave:function() {
    A.Nb()
  }, stackRestore:function() {
    A.Mb()
  }, arrayToC:function(a) {
    var b = A.Lb(a.length);
    ua(a, b);
    return b
  }, stringToC:function(a) {
    var b = 0;
    a !== l && (a !== h && 0 !== a) && (b = A.Lb((a.length << 2) + 1), va(a, b));
    return b
  }}, c = {string:b.stringToC, array:b.arrayToC};
  ta = function(a, b, d, f) {
    var g = ra(a), m = [], a = 0;
    if(f) {
      for(var x = 0;x < f.length;x++) {
        var G = c[d[x]];
        G ? (0 === a && (a = A.Nb()), m[x] = G(f[x])) : m[x] = f[x]
      }
    }
    d = g.apply(l, m);
    "string" === b && (d = la(d));
    0 !== a && A.Mb(a);
    return d
  };
  var d = /^function\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/, f = {}, g;
  for(g in b) {
    b.hasOwnProperty(g) && (f[g] = a(b[g]))
  }
  sa = function(b, c, d) {
    var d = d || [], g = ra(b), b = d.every(function(a) {
      return"number" === a
    }), y = "string" !== c;
    if(y && b) {
      return g
    }
    var m = d.map(function(a, b) {
      return"$" + b
    }), c = "(function(" + m.join(",") + ") {", x = d.length;
    if(!b) {
      for(var c = c + ("var stack = " + f.stackSave.body + ";"), G = 0;G < x;G++) {
        var L = m[G], O = d[G];
        "number" !== O && (O = f[O + "ToC"], c += "var " + O.arguments + " = " + L + ";", c += O.body + ";", c += L + "=" + O.returnValue + ";")
      }
    }
    d = a(function() {
      return g
    }).returnValue;
    c += "var ret = " + d + "(" + m.join(",") + ");";
    y || (d = a(function() {
      return la
    }).returnValue, c += "ret = " + d + "(ret);");
    b || (c += f.stackRestore.body.replace("()", "(stack)") + ";");
    return eval(c + "return ret})")
  }
})();
u.cwrap = sa;
u.ccall = ta;
function wa(a, b, c) {
  c = c || "i8";
  "*" === c.charAt(c.length - 1) && (c = "i32");
  switch(c) {
    case "i1":
      H[a >> 0] = b;
      break;
    case "i8":
      H[a >> 0] = b;
      break;
    case "i16":
      xa[a >> 1] = b;
      break;
    case "i32":
      I[a >> 2] = b;
      break;
    case "i64":
      qa = [b >>> 0, (pa = b, 1 <= +ya(pa) ? 0 < pa ? (za(+Aa(pa / 4294967296), 4294967295) | 0) >>> 0 : ~~+Ba((pa - +(~~pa >>> 0)) / 4294967296) >>> 0 : 0)];
      I[a >> 2] = qa[0];
      I[a + 4 >> 2] = qa[1];
      break;
    case "float":
      Ca[a >> 2] = b;
      break;
    case "double":
      Da[a >> 3] = b;
      break;
    default:
      D("invalid type for setValue: " + c)
  }
}
u.setValue = wa;
function Ea(a, b) {
  b = b || "i8";
  "*" === b.charAt(b.length - 1) && (b = "i32");
  switch(b) {
    case "i1":
      return H[a >> 0];
    case "i8":
      return H[a >> 0];
    case "i16":
      return xa[a >> 1];
    case "i32":
      return I[a >> 2];
    case "i64":
      return I[a >> 2];
    case "float":
      return Ca[a >> 2];
    case "double":
      return Da[a >> 3];
    default:
      D("invalid type for setValue: " + b)
  }
  return l
}
u.getValue = Ea;
var Fa = 2, Ga = 4;
u.ALLOC_NORMAL = 0;
u.ALLOC_STACK = 1;
u.ALLOC_STATIC = Fa;
u.ALLOC_DYNAMIC = 3;
u.ALLOC_NONE = Ga;
function J(a, b, c, d) {
  var f, g;
  "number" === typeof a ? (f = k, g = a) : (f = n, g = a.length);
  var i = "string" === typeof b ? b : l, c = c == Ga ? d : [Ha, A.Lb, A.vd, A.yb][c === h ? Fa : c](Math.max(g, i ? 1 : b.length));
  if(f) {
    d = c;
    w(0 == (c & 3));
    for(a = c + (g & -4);d < a;d += 4) {
      I[d >> 2] = 0
    }
    for(a = c + g;d < a;) {
      H[d++ >> 0] = 0
    }
    return c
  }
  if("i8" === i) {
    return a.subarray || a.slice ? M.set(a, c) : M.set(new Uint8Array(a), c), c
  }
  for(var d = 0, j, p;d < g;) {
    var t = a[d];
    "function" === typeof t && (t = A.Bh(t));
    f = i || b[d];
    0 === f ? d++ : ("i64" == f && (f = "i32"), wa(c + d, t, f), p !== f && (j = A.bd(f), p = f), d += j)
  }
  return c
}
u.allocate = J;
function la(a, b) {
  if(0 === b || !a) {
    return""
  }
  for(var c = n, d, f = 0;;) {
    d = M[a + f >> 0];
    if(128 <= d) {
      c = k
    }else {
      if(0 == d && !b) {
        break
      }
    }
    f++;
    if(b && f == b) {
      break
    }
  }
  b || (b = f);
  var g = "";
  if(!c) {
    for(;0 < b;) {
      d = String.fromCharCode.apply(String, M.subarray(a, a + Math.min(b, 1024))), g = g ? g + d : d, a += 1024, b -= 1024
    }
    return g
  }
  c = new A.Wa;
  for(f = 0;f < b;f++) {
    d = M[a + f >> 0], g += c.Jb(d)
  }
  return g
}
u.Pointer_stringify = la;
u.UTF16ToString = function(a) {
  for(var b = 0, c = "";;) {
    var d = xa[a + 2 * b >> 1];
    if(0 == d) {
      return c
    }
    ++b;
    c += String.fromCharCode(d)
  }
};
u.stringToUTF16 = function(a, b) {
  for(var c = 0;c < a.length;++c) {
    xa[b + 2 * c >> 1] = a.charCodeAt(c)
  }
  xa[b + 2 * a.length >> 1] = 0
};
u.UTF32ToString = function(a) {
  for(var b = 0, c = "";;) {
    var d = I[a + 4 * b >> 2];
    if(0 == d) {
      return c
    }
    ++b;
    65536 <= d ? (d -= 65536, c += String.fromCharCode(55296 | d >> 10, 56320 | d & 1023)) : c += String.fromCharCode(d)
  }
};
u.stringToUTF32 = function(a, b) {
  for(var c = 0, d = 0;d < a.length;++d) {
    var f = a.charCodeAt(d);
    if(55296 <= f && 57343 >= f) {
      var g = a.charCodeAt(++d), f = 65536 + ((f & 1023) << 10) | g & 1023
    }
    I[b + 4 * c >> 2] = f;
    ++c
  }
  I[b + 4 * c >> 2] = 0
};
function Ia(a) {
  function b(c, d, f) {
    var d = d || Infinity, g = "", i = [], m;
    if("N" === a[j]) {
      j++;
      "K" === a[j] && j++;
      for(m = [];"E" !== a[j];) {
        if("S" === a[j]) {
          j++;
          var C = a.indexOf("_", j);
          m.push(t[a.substring(j, C) || 0] || "?");
          j = C + 1
        }else {
          if("C" === a[j]) {
            m.push(m[m.length - 1]), j += 2
          }else {
            var C = parseInt(a.substr(j)), s = C.toString().length;
            if(!C || !s) {
              j--;
              break
            }
            var ca = a.substr(j + s, C);
            m.push(ca);
            t.push(ca);
            j += s + C
          }
        }
      }
      j++;
      m = m.join("::");
      d--;
      if(0 === d) {
        return c ? [m] : m
      }
    }else {
      if(("K" === a[j] || y && "L" === a[j]) && j++, C = parseInt(a.substr(j))) {
        s = C.toString().length, m = a.substr(j + s, C), j += s + C
      }
    }
    y = n;
    "I" === a[j] ? (j++, C = b(k), s = b(k, 1, k), g += s[0] + " " + m + "<" + C.join(", ") + ">") : g = m;
    a:for(;j < a.length && 0 < d--;) {
      if(m = a[j++], m in p) {
        i.push(p[m])
      }else {
        switch(m) {
          case "P":
            i.push(b(k, 1, k)[0] + "*");
            break;
          case "R":
            i.push(b(k, 1, k)[0] + "&");
            break;
          case "L":
            j++;
            C = a.indexOf("E", j) - j;
            i.push(a.substr(j, C));
            j += C + 2;
            break;
          case "A":
            C = parseInt(a.substr(j));
            j += C.toString().length;
            "_" !== a[j] && e("?");
            j++;
            i.push(b(k, 1, k)[0] + " [" + C + "]");
            break;
          case "E":
            break a;
          default:
            g += "?" + m;
            break a
        }
      }
    }
    !f && (1 === i.length && "void" === i[0]) && (i = []);
    return c ? (g && i.push(g + "?"), i) : g + ("(" + i.join(", ") + ")")
  }
  var c = !!u.___cxa_demangle;
  if(c) {
    try {
      var d = Ha(a.length);
      va(a.substr(1), d);
      var f = Ha(4), g = u.___cxa_demangle(d, 0, 0, f);
      if(0 === Ea(f, "i32") && g) {
        return la(g)
      }
    }catch(i) {
    }finally {
      d && Ja(d), f && Ja(f), g && Ja(g)
    }
  }
  var j = 3, p = {v:"void", b:"bool", c:"char", s:"short", i:"int", l:"long", f:"float", d:"double", w:"wchar_t", a:"signed char", h:"unsigned char", t:"unsigned short", j:"unsigned int", m:"unsigned long", x:"long long", y:"unsigned long long", z:"..."}, t = [], y = k, d = a;
  try {
    if("Object._main" == a || "_main" == a) {
      return"main()"
    }
    "number" === typeof a && (a = la(a));
    if("_" !== a[0] || "_" !== a[1] || "Z" !== a[2]) {
      return a
    }
    switch(a[3]) {
      case "n":
        return"operator new()";
      case "d":
        return"operator delete()"
    }
    d = b()
  }catch(m) {
    d += "?"
  }
  0 <= d.indexOf("?") && !c && A.Sa("warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
  return d
}
function Ka() {
  var a;
  a: {
    a = Error();
    if(!a.stack) {
      try {
        e(Error(0))
      }catch(b) {
        a = b
      }
      if(!a.stack) {
        a = "(no stack trace available)";
        break a
      }
    }
    a = a.stack.toString()
  }
  return a.replace(/__Z[\w\d_]+/g, function(a) {
    var b = Ia(a);
    return a === b ? a : a + " [" + b + "]"
  })
}
u.stackTrace = function() {
  return Ka()
};
for(var H, M, xa, La, I, Ma, Ca, Da, Na = 0, ma = 0, Oa = 0, z = 0, Pa = 0, Qa = 0, F = 0, Ra = u.TOTAL_STACK || 5242880, na = u.TOTAL_MEMORY || 16777216, N = 65536;N < na || N < 2 * Ra;) {
  N = 16777216 > N ? 2 * N : N + 16777216
}
N !== na && (u.va("increasing TOTAL_MEMORY to " + N + " to be compliant with the asm.js spec"), na = N);
w("undefined" !== typeof Int32Array && "undefined" !== typeof Float64Array && !!(new Int32Array(1)).subarray && !!(new Int32Array(1)).set, "JS engine does not provide full typed array support");
var P = new ArrayBuffer(na);
H = new Int8Array(P);
xa = new Int16Array(P);
I = new Int32Array(P);
M = new Uint8Array(P);
La = new Uint16Array(P);
Ma = new Uint32Array(P);
Ca = new Float32Array(P);
Da = new Float64Array(P);
I[0] = 255;
w(255 === M[0] && 0 === M[3], "Typed arrays 2 must be run on a little-endian system");
u.HEAP = h;
u.buffer = P;
u.HEAP8 = H;
u.HEAP16 = xa;
u.HEAP32 = I;
u.HEAPU8 = M;
u.HEAPU16 = La;
u.HEAPU32 = Ma;
u.HEAPF32 = Ca;
u.HEAPF64 = Da;
function Sa(a) {
  for(;0 < a.length;) {
    var b = a.shift();
    if("function" == typeof b) {
      b()
    }else {
      var c = b.Ba;
      "number" === typeof c ? b.rb === h ? A.Ya("v", c) : A.Ya("vi", c, [b.rb]) : c(b.rb === h ? l : b.rb)
    }
  }
}
var Ta = [], Ua = [], Va = [], Wa = [], Xa = [], Ya = n;
function Za(a) {
  Ta.unshift(a)
}
u.addOnPreRun = u.eh = Za;
u.addOnInit = u.ah = function(a) {
  Ua.unshift(a)
};
u.addOnPreMain = u.dh = function(a) {
  Va.unshift(a)
};
u.addOnExit = u.$g = function(a) {
  Wa.unshift(a)
};
function $a(a) {
  Xa.unshift(a)
}
u.addOnPostRun = u.bh = $a;
function ab(a, b, c) {
  a = (new A.Wa).sd(a);
  c && (a.length = c);
  b || a.push(0);
  return a
}
u.intArrayFromString = ab;
u.intArrayToString = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    var d = a[c];
    255 < d && (d &= 255);
    b.push(String.fromCharCode(d))
  }
  return b.join("")
};
function va(a, b, c) {
  a = ab(a, c);
  for(c = 0;c < a.length;) {
    H[b + c >> 0] = a[c], c += 1
  }
}
u.writeStringToMemory = va;
function ua(a, b) {
  for(var c = 0;c < a.length;c++) {
    H[b + c >> 0] = a[c]
  }
}
u.writeArrayToMemory = ua;
function bb(a, b, c) {
  for(var d = 0;d < a.length;d++) {
    H[b + d >> 0] = a.charCodeAt(d)
  }
  c || (H[b + a.length >> 0] = 0)
}
u.writeAsciiToMemory = bb;
function cb(a, b) {
  return 0 <= a ? a : 32 >= b ? 2 * Math.abs(1 << b - 1) + a : Math.pow(2, b) + a
}
function db(a, b) {
  if(0 >= a) {
    return a
  }
  var c = 32 >= b ? Math.abs(1 << b - 1) : Math.pow(2, b - 1);
  if(a >= c && (32 >= b || a > c)) {
    a = -2 * c + a
  }
  return a
}
if(!Math.imul || -5 !== Math.imul(4294967295, 5)) {
  Math.imul = function(a, b) {
    var c = a & 65535, d = b & 65535;
    return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16) | 0
  }
}
Math.Eh = Math.imul;
var ya = Math.abs, eb = Math.cos, fb = Math.sin, gb = Math.exp, hb = Math.log, ib = Math.sqrt, Ba = Math.ceil, Aa = Math.floor, za = Math.min, jb = 0, kb = l, lb = l;
function mb() {
  jb++;
  u.monitorRunDependencies && u.monitorRunDependencies(jb)
}
u.addRunDependency = mb;
function nb() {
  jb--;
  u.monitorRunDependencies && u.monitorRunDependencies(jb);
  if(0 == jb && (kb !== l && (clearInterval(kb), kb = l), lb)) {
    var a = lb;
    lb = l;
    a()
  }
}
u.removeRunDependency = nb;
u.preloadedImages = {};
u.preloadedAudios = {};
var Q = l, Na = 8, ma = Na + 6112;
Ua.push();
var Q = "scrypt_raw.js.mem", R = A.Vb(J(12, "i8", Fa), 8);
w(0 == R % 8);
u._i64Subtract = ob;
var pb = 0;
function S(a) {
  return I[pb >> 2] = a
}
var T = {W:1, $:2, Hg:3, If:4, ya:5, Cc:6, ff:7, eg:8, ga:9, tf:10, Va:11, Rg:11, Ed:12, Pb:13, Df:14, qg:15, wa:16, Ac:17, Hd:18, kb:19, mb:20, Ia:21, D:22, $f:23, Dd:24, Fd:25, Og:26, Ef:27, mg:28, ob:29, Eg:30, Tf:31, yg:32, Af:33, Gd:34, ig:42, Gf:43, uf:44, Kf:45, Lf:46, Mf:47, Sf:48, Pg:49, cg:50, Jf:51, yf:35, fg:37, lf:52, of:53, Sg:54, ag:55, pf:56, qf:57, zf:35, rf:59, og:60, dg:61, Lg:62, ng:63, jg:64, kg:65, Dg:66, gg:67, jf:68, Ig:69, vf:70, zg:71, Vf:72, Bf:73, nf:74, ug:76, mf:77, 
Cg:78, Nf:79, Of:80, Rf:81, Qf:82, Pf:83, pg:38, Rb:39, Wf:36, Qb:40, nb:95, xg:96, xf:104, bg:105, kf:97, Bg:91, sg:88, lg:92, Fg:108, zc:111, gf:98, wf:103, Zf:101, Xf:100, Mg:110, Ff:112, Bc:113, Bd:115, zd:114, Ad:89, Uf:90, Ag:93, Gg:94, hf:99, Yf:102, Cd:106, lb:107, Ng:109, Qg:87, Cf:122, Jg:116, tg:95, hg:123, Hf:84, vg:75, sf:125, rg:131, wg:130, Kg:86};
u._memset = qb;
var rb = {"0":"Success", 1:"Not super-user", 2:"No such file or directory", 3:"No such process", 4:"Interrupted system call", 5:"I/O error", 6:"No such device or address", 7:"Arg list too long", 8:"Exec format error", 9:"Bad file number", 10:"No children", 11:"No more processes", 12:"Not enough core", 13:"Permission denied", 14:"Bad address", 15:"Block device required", 16:"Mount device busy", 17:"File exists", 18:"Cross-device link", 19:"No such device", 20:"Not a directory", 21:"Is a directory", 
22:"Invalid argument", 23:"Too many open files in system", 24:"Too many open files", 25:"Not a typewriter", 26:"Text file busy", 27:"File too large", 28:"No space left on device", 29:"Illegal seek", 30:"Read only file system", 31:"Too many links", 32:"Broken pipe", 33:"Math arg out of domain of func", 34:"Math result not representable", 35:"File locking deadlock error", 36:"File or path name too long", 37:"No record locks available", 38:"Function not implemented", 39:"Directory not empty", 40:"Too many symbolic links", 
42:"No message of desired type", 43:"Identifier removed", 44:"Channel number out of range", 45:"Level 2 not synchronized", 46:"Level 3 halted", 47:"Level 3 reset", 48:"Link number out of range", 49:"Protocol driver not attached", 50:"No CSI structure available", 51:"Level 2 halted", 52:"Invalid exchange", 53:"Invalid request descriptor", 54:"Exchange full", 55:"No anode", 56:"Invalid request code", 57:"Invalid slot", 59:"Bad font file fmt", 60:"Device not a stream", 61:"No data (for no delay io)", 
62:"Timer expired", 63:"Out of streams resources", 64:"Machine is not on the network", 65:"Package not installed", 66:"The object is remote", 67:"The link has been severed", 68:"Advertise error", 69:"Srmount error", 70:"Communication error on send", 71:"Protocol error", 72:"Multihop attempted", 73:"Cross mount point (not really error)", 74:"Trying to read unreadable message", 75:"Value too large for defined data type", 76:"Given log. name not unique", 77:"f.d. invalid for this operation", 78:"Remote address changed", 
79:"Can   access a needed shared lib", 80:"Accessing a corrupted shared lib", 81:".lib section in a.out corrupted", 82:"Attempting to link in too many libs", 83:"Attempting to exec a shared library", 84:"Illegal byte sequence", 86:"Streams pipe error", 87:"Too many users", 88:"Socket operation on non-socket", 89:"Destination address required", 90:"Message too long", 91:"Protocol wrong type for socket", 92:"Protocol not available", 93:"Unknown protocol", 94:"Socket type not supported", 95:"Not supported", 
96:"Protocol family not supported", 97:"Address family not supported by protocol family", 98:"Address already in use", 99:"Address not available", 100:"Network interface is not configured", 101:"Network is unreachable", 102:"Connection reset by network", 103:"Connection aborted", 104:"Connection reset by peer", 105:"No buffer space available", 106:"Socket is already connected", 107:"Socket is not connected", 108:"Can't send after socket shutdown", 109:"Too many references", 110:"Connection timed out", 
111:"Connection refused", 112:"Host is down", 113:"Host is unreachable", 114:"Socket already connected", 115:"Connection already in progress", 116:"Stale file handle", 122:"Quota exceeded", 123:"No medium (in tape drive)", 125:"Operation canceled", 130:"Previous owner died", 131:"State not recoverable"};
function sb(a, b, c) {
  if(a in rb) {
    if(rb[a].length > c - 1) {
      return S(T.Gd)
    }
    bb(rb[a], b);
    return 0
  }
  return S(T.D)
}
function tb(a) {
  tb.buffer || (tb.buffer = Ha(256));
  sb(a, tb.buffer, 256);
  return tb.buffer
}
u._bitshift64Shl = ub;
function vb(a, b) {
  for(var c = 0, d = a.length - 1;0 <= d;d--) {
    var f = a[d];
    "." === f ? a.splice(d, 1) : ".." === f ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--)
  }
  if(b) {
    for(;c--;c) {
      a.unshift("..")
    }
  }
  return a
}
function wb(a) {
  var b = "/" === a.charAt(0), c = "/" === a.substr(-1), a = vb(a.split("/").filter(function(a) {
    return!!a
  }), !b).join("/");
  !a && !b && (a = ".");
  a && c && (a += "/");
  return(b ? "/" : "") + a
}
function xb(a) {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1), a = b[0], b = b[1];
  if(!a && !b) {
    return"."
  }
  b && (b = b.substr(0, b.length - 1));
  return a + b
}
function yb(a) {
  if("/" === a) {
    return"/"
  }
  var b = a.lastIndexOf("/");
  return-1 === b ? a : a.substr(b + 1)
}
function zb() {
  var a = Array.prototype.slice.call(arguments, 0);
  return wb(a.join("/"))
}
function Ab(a, b) {
  return wb(a + "/" + b)
}
function Bb() {
  for(var a = "", b = n, c = arguments.length - 1;-1 <= c && !b;c--) {
    b = 0 <= c ? arguments[c] : E.ac();
    "string" !== typeof b && e(new TypeError("Arguments to path.resolve must be strings"));
    if(!b) {
      return""
    }
    a = b + "/" + a;
    b = "/" === b.charAt(0)
  }
  a = vb(a.split("/").filter(function(a) {
    return!!a
  }), !b).join("/");
  return(b ? "/" : "") + a || "."
}
function Cb(a, b) {
  function c(a) {
    for(var b = 0;b < a.length && "" === a[b];b++) {
    }
    for(var c = a.length - 1;0 <= c && "" === a[c];c--) {
    }
    return b > c ? [] : a.slice(b, c - b + 1)
  }
  for(var a = Bb(a).substr(1), b = Bb(b).substr(1), d = c(a.split("/")), f = c(b.split("/")), g = Math.min(d.length, f.length), i = g, j = 0;j < g;j++) {
    if(d[j] !== f[j]) {
      i = j;
      break
    }
  }
  g = [];
  for(j = i;j < d.length;j++) {
    g.push("..")
  }
  g = g.concat(f.slice(i));
  return g.join("/")
}
var Db = [];
function Eb(a, b) {
  Db[a] = {input:[], R:[], La:b};
  E.rc(a, Fb)
}
var Fb = {open:function(a) {
  var b = Db[a.k.Kb];
  b || e(new E.e(T.kb));
  a.V = b;
  a.seekable = n
}, close:function(a) {
  a.V.La.flush(a.V)
}, flush:function(a) {
  a.V.La.flush(a.V)
}, U:function(a, b, c, d) {
  (!a.V || !a.V.La.ed) && e(new E.e(T.Cc));
  for(var f = 0, g = 0;g < d;g++) {
    var i;
    try {
      i = a.V.La.ed(a.V)
    }catch(j) {
      e(new E.e(T.ya))
    }
    i === h && 0 === f && e(new E.e(T.Va));
    if(i === l || i === h) {
      break
    }
    f++;
    b[c + g] = i
  }
  f && (a.k.timestamp = Date.now());
  return f
}, write:function(a, b, c, d) {
  (!a.V || !a.V.La.oc) && e(new E.e(T.Cc));
  for(var f = 0;f < d;f++) {
    try {
      a.V.La.oc(a.V, b[c + f])
    }catch(g) {
      e(new E.e(T.ya))
    }
  }
  d && (a.k.timestamp = Date.now());
  return f
}}, Hb = {ed:function(a) {
  if(!a.input.length) {
    var b = l;
    if(v) {
      if(b = process.stdin.read(), !b) {
        if(process.stdin._readableState && process.stdin._readableState.ended) {
          return l
        }
        return
      }
    }else {
      "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), b !== l && (b += "\n")) : "function" == typeof readline && (b = readline(), b !== l && (b += "\n"))
    }
    if(!b) {
      return l
    }
    a.input = ab(b, k)
  }
  return a.input.shift()
}, flush:function(a) {
  a.R && 0 < a.R.length && (u.print(a.R.join("")), a.R = [])
}, oc:function(a, b) {
  b === l || 10 === b ? (u.print(a.R.join("")), a.R = []) : a.R.push(Gb.Jb(b))
}}, Ib = {oc:function(a, b) {
  b === l || 10 === b ? (u.printErr(a.R.join("")), a.R = []) : a.R.push(Gb.Jb(b))
}, flush:function(a) {
  a.R && 0 < a.R.length && (u.printErr(a.R.join("")), a.R = [])
}}, U = {da:l, L:function() {
  return U.createNode(l, "/", 16895, 0)
}, createNode:function(a, b, c, d) {
  (E.ze(c) || E.Ae(c)) && e(new E.e(T.W));
  U.da || (U.da = {dir:{k:{ba:U.o.ba, O:U.o.O, Ka:U.o.Ka, oa:U.o.oa, rename:U.o.rename, Ra:U.o.Ra, hb:U.o.hb, gb:U.o.gb, pa:U.o.pa}, G:{ma:U.q.ma}}, file:{k:{ba:U.o.ba, O:U.o.O}, G:{ma:U.q.ma, U:U.q.U, write:U.q.write, Xa:U.q.Xa, bb:U.q.bb}}, link:{k:{ba:U.o.ba, O:U.o.O, Ma:U.o.Ma}, G:{}}, Nc:{k:{ba:U.o.ba, O:U.o.O}, G:E.Xd}});
  c = E.createNode(a, b, c, d);
  E.Q(c.mode) ? (c.o = U.da.dir.k, c.q = U.da.dir.G, c.n = {}) : E.isFile(c.mode) ? (c.o = U.da.file.k, c.q = U.da.file.G, c.B = 0, c.n = l) : E.ab(c.mode) ? (c.o = U.da.link.k, c.q = U.da.link.G) : E.Eb(c.mode) && (c.o = U.da.Nc.k, c.q = U.da.Nc.G);
  c.timestamp = Date.now();
  a && (a.n[b] = c);
  return c
}, qe:function(a) {
  if(a.n && a.n.subarray) {
    for(var b = [], c = 0;c < a.B;++c) {
      b.push(a.n[c])
    }
    return b
  }
  return a.n
}, zh:function(a) {
  return!a.n ? new Uint8Array : a.n.subarray ? a.n.subarray(0, a.B) : new Uint8Array(a.n)
}, Yc:function(a, b) {
  a.n && (a.n.subarray && b > a.n.length) && (a.n = U.qe(a), a.B = a.n.length);
  if(!a.n || a.n.subarray) {
    var c = a.n ? a.n.buffer.byteLength : 0;
    c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) | 0), 0 != c && (b = Math.max(b, 256)), c = a.n, a.n = new Uint8Array(b), 0 < a.B && a.n.set(c.subarray(0, a.B), 0))
  }else {
    !a.n && 0 < b && (a.n = []);
    for(;a.n.length < b;) {
      a.n.push(0)
    }
  }
}, We:function(a, b) {
  if(a.B != b) {
    if(0 == b) {
      a.n = l, a.B = 0
    }else {
      if(!a.n || a.n.subarray) {
        var c = a.n;
        a.n = new Uint8Array(new ArrayBuffer(b));
        c && a.n.set(c.subarray(0, Math.min(b, a.B)))
      }else {
        if(a.n || (a.n = []), a.n.length > b) {
          a.n.length = b
        }else {
          for(;a.n.length < b;) {
            a.n.push(0)
          }
        }
      }
      a.B = b
    }
  }
}, o:{ba:function(a) {
  var b = {};
  b.ph = E.Eb(a.mode) ? a.id : 1;
  b.Fh = a.id;
  b.mode = a.mode;
  b.Sh = 1;
  b.uid = 0;
  b.Dh = 0;
  b.Kb = a.Kb;
  b.size = E.Q(a.mode) ? 4096 : E.isFile(a.mode) ? a.B : E.ab(a.mode) ? a.link.length : 0;
  b.gh = new Date(a.timestamp);
  b.Qh = new Date(a.timestamp);
  b.nh = new Date(a.timestamp);
  b.Ud = 4096;
  b.hh = Math.ceil(b.size / b.Ud);
  return b
}, O:function(a, b) {
  b.mode !== h && (a.mode = b.mode);
  b.timestamp !== h && (a.timestamp = b.timestamp);
  b.size !== h && U.We(a, b.size)
}, Ka:function() {
  e(E.gc[T.$])
}, oa:function(a, b, c, d) {
  return U.createNode(a, b, c, d)
}, rename:function(a, b, c) {
  if(E.Q(a.mode)) {
    var d;
    try {
      d = E.na(b, c)
    }catch(f) {
    }
    if(d) {
      for(var g in d.n) {
        e(new E.e(T.Rb))
      }
    }
  }
  delete a.parent.n[a.name];
  a.name = c;
  b.n[c] = a;
  a.parent = b
}, Ra:function(a, b) {
  delete a.n[b]
}, hb:function(a, b) {
  var c = E.na(a, b), d;
  for(d in c.n) {
    e(new E.e(T.Rb))
  }
  delete a.n[b]
}, gb:function(a) {
  var b = [".", ".."], c;
  for(c in a.n) {
    a.n.hasOwnProperty(c) && b.push(c)
  }
  return b
}, pa:function(a, b, c) {
  a = U.createNode(a, b, 41471, 0);
  a.link = c;
  return a
}, Ma:function(a) {
  E.ab(a.mode) || e(new E.e(T.D));
  return a.link
}}, q:{U:function(a, b, c, d, f) {
  var g = a.k.n;
  if(f >= a.k.B) {
    return 0
  }
  a = Math.min(a.k.B - f, d);
  w(0 <= a);
  if(8 < a && g.subarray) {
    b.set(g.subarray(f, f + a), c)
  }else {
    for(d = 0;d < a;d++) {
      b[c + d] = g[f + d]
    }
  }
  return a
}, write:function(a, b, c, d, f, g) {
  if(!d) {
    return 0
  }
  a = a.k;
  a.timestamp = Date.now();
  if(b.subarray && (!a.n || a.n.subarray)) {
    if(g) {
      return a.n = b.subarray(c, c + d), a.B = d
    }
    if(0 === a.B && 0 === f) {
      return a.n = new Uint8Array(b.subarray(c, c + d)), a.B = d
    }
    if(f + d <= a.B) {
      return a.n.set(b.subarray(c, c + d), f), d
    }
  }
  U.Yc(a, f + d);
  if(a.n.subarray && b.subarray) {
    a.n.set(b.subarray(c, c + d), f)
  }else {
    for(g = 0;g < d;g++) {
      a.n[f + g] = b[c + g]
    }
  }
  a.B = Math.max(a.B, f + d);
  return d
}, ma:function(a, b, c) {
  1 === c ? b += a.position : 2 === c && E.isFile(a.k.mode) && (b += a.k.B);
  0 > b && e(new E.e(T.D));
  return b
}, Xa:function(a, b, c) {
  U.Yc(a.k, b + c);
  a.k.B = Math.max(a.k.B, b + c)
}, bb:function(a, b, c, d, f, g, i) {
  E.isFile(a.k.mode) || e(new E.e(T.kb));
  c = a.k.n;
  if(!(i & 2) && (c.buffer === b || c.buffer === b.buffer)) {
    a = n, d = c.byteOffset
  }else {
    if(0 < f || f + d < a.k.B) {
      c = c.subarray ? c.subarray(f, f + d) : Array.prototype.slice.call(c, f, f + d)
    }
    a = k;
    (d = Ha(d)) || e(new E.e(T.Ed));
    b.set(c, d)
  }
  return{Vh:d, fh:a}
}}}, Jb = J(1, "i32*", Fa), Kb = J(1, "i32*", Fa), Lb = J(1, "i32*", Fa), E = {root:l, eb:[], Tc:[l], Ha:[], Je:1, ca:l, Qc:"/", Db:n, jd:k, N:{}, xd:{qd:{Kd:1, Nd:2}}, e:l, gc:{}, fd:function(a) {
  a instanceof E.e || e(a + " : " + Ka());
  return S(a.zb)
}, F:function(a, b) {
  a = Bb(E.ac(), a);
  b = b || {};
  if(!a) {
    return{path:"", k:l}
  }
  var c = {ec:k, qc:0}, d;
  for(d in c) {
    b[d] === h && (b[d] = c[d])
  }
  8 < b.qc && e(new E.e(T.Qb));
  var c = vb(a.split("/").filter(function(a) {
    return!!a
  }), n), f = E.root;
  d = "/";
  for(var g = 0;g < c.length;g++) {
    var i = g === c.length - 1;
    if(i && b.parent) {
      break
    }
    f = E.na(f, c[g]);
    d = Ab(d, c[g]);
    if(E.Ca(f) && (!i || i && b.ec)) {
      f = f.cb.root
    }
    if(!i || b.aa) {
      for(i = 0;E.ab(f.mode);) {
        f = E.Ma(d), d = Bb(xb(d), f), f = E.F(d, {qc:b.qc}).k, 40 < i++ && e(new E.e(T.Qb))
      }
    }
  }
  return{path:d, k:f}
}, ta:function(a) {
  for(var b;;) {
    if(E.Fb(a)) {
      return a = a.L.He, !b ? a : "/" !== a[a.length - 1] ? a + "/" + b : a + b
    }
    b = b ? a.name + "/" + b : a.name;
    a = a.parent
  }
}, ic:function(a, b) {
  for(var c = 0, d = 0;d < b.length;d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0
  }
  return(a + c >>> 0) % E.ca.length
}, gd:function(a) {
  var b = E.ic(a.parent.id, a.name);
  a.Fa = E.ca[b];
  E.ca[b] = a
}, hd:function(a) {
  var b = E.ic(a.parent.id, a.name);
  if(E.ca[b] === a) {
    E.ca[b] = a.Fa
  }else {
    for(b = E.ca[b];b;) {
      if(b.Fa === a) {
        b.Fa = a.Fa;
        break
      }
      b = b.Fa
    }
  }
}, na:function(a, b) {
  var c = E.Fe(a);
  c && e(new E.e(c, a));
  for(c = E.ca[E.ic(a.id, b)];c;c = c.Fa) {
    var d = c.name;
    if(c.parent.id === a.id && d === b) {
      return c
    }
  }
  return E.Ka(a, b)
}, createNode:function(a, b, c, d) {
  E.pb || (E.pb = function(a, b, c, d) {
    a || (a = this);
    this.parent = a;
    this.L = a.L;
    this.cb = l;
    this.id = E.Je++;
    this.name = b;
    this.mode = c;
    this.o = {};
    this.q = {};
    this.Kb = d
  }, E.pb.prototype = {}, Object.defineProperties(E.pb.prototype, {U:{get:function() {
    return 365 === (this.mode & 365)
  }, set:function(a) {
    a ? this.mode |= 365 : this.mode &= -366
  }}, write:{get:function() {
    return 146 === (this.mode & 146)
  }, set:function(a) {
    a ? this.mode |= 146 : this.mode &= -147
  }}, Be:{get:function() {
    return E.Q(this.mode)
  }}, jc:{get:function() {
    return E.Eb(this.mode)
  }}}));
  a = new E.pb(a, b, c, d);
  E.gd(a);
  return a
}, bc:function(a) {
  E.hd(a)
}, Fb:function(a) {
  return a === a.parent
}, Ca:function(a) {
  return!!a.cb
}, isFile:function(a) {
  return 32768 === (a & 61440)
}, Q:function(a) {
  return 16384 === (a & 61440)
}, ab:function(a) {
  return 40960 === (a & 61440)
}, Eb:function(a) {
  return 8192 === (a & 61440)
}, ze:function(a) {
  return 24576 === (a & 61440)
}, Ae:function(a) {
  return 4096 === (a & 61440)
}, Ce:function(a) {
  return 49152 === (a & 49152)
}, me:{r:0, rs:1052672, "r+":2, w:577, wx:705, xw:705, "w+":578, "wx+":706, "xw+":706, a:1089, ax:1217, xa:1217, "a+":1090, "ax+":1218, "xa+":1218}, od:function(a) {
  var b = E.me[a];
  "undefined" === typeof b && e(Error("Unknown file open mode: " + a));
  return b
}, ne:function(a) {
  var b = ["r", "w", "rw"][a & 2097155];
  a & 512 && (b += "w");
  return b
}, Ga:function(a, b) {
  return E.jd ? 0 : -1 !== b.indexOf("r") && !(a.mode & 292) || -1 !== b.indexOf("w") && !(a.mode & 146) || -1 !== b.indexOf("x") && !(a.mode & 73) ? T.Pb : 0
}, Fe:function(a) {
  var b = E.Ga(a, "x");
  return b ? b : !a.o.Ka ? T.Pb : 0
}, mc:function(a, b) {
  try {
    return E.na(a, b), T.Ac
  }catch(c) {
  }
  return E.Ga(a, "wx")
}, Gb:function(a, b, c) {
  var d;
  try {
    d = E.na(a, b)
  }catch(f) {
    return f.zb
  }
  if(a = E.Ga(a, "wx")) {
    return a
  }
  if(c) {
    if(!E.Q(d.mode)) {
      return T.mb
    }
    if(E.Fb(d) || E.ta(d) === E.ac()) {
      return T.wa
    }
  }else {
    if(E.Q(d.mode)) {
      return T.Ia
    }
  }
  return 0
}, Ge:function(a, b) {
  return!a ? T.$ : E.ab(a.mode) ? T.Qb : E.Q(a.mode) && (0 !== (b & 2097155) || b & 512) ? T.Ia : E.Ga(a, E.ne(b))
}, Jd:4096, Ke:function(a, b) {
  for(var b = b || E.Jd, c = a || 0;c <= b;c++) {
    if(!E.Ha[c]) {
      return c
    }
  }
  e(new E.e(T.Dd))
}, Ja:function(a) {
  return E.Ha[a]
}, Oc:function(a, b, c) {
  E.qb || (E.qb = q(), E.qb.prototype = {}, Object.defineProperties(E.qb.prototype, {object:{get:function() {
    return this.k
  }, set:function(a) {
    this.k = a
  }}, Hh:{get:function() {
    return 1 !== (this.J & 2097155)
  }}, Ih:{get:function() {
    return 0 !== (this.J & 2097155)
  }}, Gh:{get:function() {
    return this.J & 1024
  }}}));
  var d = new E.qb, f;
  for(f in a) {
    d[f] = a[f]
  }
  a = d;
  b = E.Ke(b, c);
  a.H = b;
  return E.Ha[b] = a
}, Yd:function(a) {
  E.Ha[a] = l
}, cd:function(a) {
  return E.Ha[a - 1]
}, hc:function(a) {
  return a ? a.H + 1 : 0
}, Xd:{open:function(a) {
  a.q = E.pe(a.k.Kb).q;
  a.q.open && a.q.open(a)
}, ma:function() {
  e(new E.e(T.ob))
}}, lc:function(a) {
  return a >> 8
}, Ph:function(a) {
  return a & 255
}, Ea:function(a, b) {
  return a << 8 | b
}, rc:function(a, b) {
  E.Tc[a] = {q:b}
}, pe:function(a) {
  return E.Tc[a]
}, $c:function(a) {
  for(var b = [], a = [a];a.length;) {
    var c = a.pop();
    b.push(c);
    a.push.apply(a, c.eb)
  }
  return b
}, wd:function(a, b) {
  function c(a) {
    if(a) {
      if(!c.ke) {
        return c.ke = k, b(a)
      }
    }else {
      ++f >= d.length && b(l)
    }
  }
  "function" === typeof a && (b = a, a = n);
  var d = E.$c(E.root.L), f = 0;
  d.forEach(function(b) {
    if(!b.type.wd) {
      return c(l)
    }
    b.type.wd(b, a, c)
  })
}, L:function(a, b, c) {
  var d = "/" === c, f = !c, g;
  d && E.root && e(new E.e(T.wa));
  !d && !f && (g = E.F(c, {ec:n}), c = g.path, g = g.k, E.Ca(g) && e(new E.e(T.wa)), E.Q(g.mode) || e(new E.e(T.mb)));
  b = {type:a, Uh:b, He:c, eb:[]};
  a = a.L(b);
  a.L = b;
  b.root = a;
  d ? E.root = a : g && (g.cb = b, g.L && g.L.eb.push(b));
  return a
}, di:function(a) {
  a = E.F(a, {ec:n});
  E.Ca(a.k) || e(new E.e(T.D));
  var a = a.k, b = a.cb, c = E.$c(b);
  Object.keys(E.ca).forEach(function(a) {
    for(a = E.ca[a];a;) {
      var b = a.Fa;
      -1 !== c.indexOf(a.L) && E.bc(a);
      a = b
    }
  });
  a.cb = l;
  b = a.L.eb.indexOf(b);
  w(-1 !== b);
  a.L.eb.splice(b, 1)
}, Ka:function(a, b) {
  return a.o.Ka(a, b)
}, oa:function(a, b, c) {
  var d = E.F(a, {parent:k}).k, a = yb(a);
  (!a || "." === a || ".." === a) && e(new E.e(T.D));
  var f = E.mc(d, a);
  f && e(new E.e(f));
  d.o.oa || e(new E.e(T.W));
  return d.o.oa(d, a, b, c)
}, create:function(a, b) {
  b = (b !== h ? b : 438) & 4095;
  b |= 32768;
  return E.oa(a, b, 0)
}, ua:function(a, b) {
  b = (b !== h ? b : 511) & 1023;
  b |= 16384;
  return E.oa(a, b, 0)
}, Hb:function(a, b, c) {
  "undefined" === typeof c && (c = b, b = 438);
  return E.oa(a, b | 8192, c)
}, pa:function(a, b) {
  Bb(a) || e(new E.e(T.$));
  var c = E.F(b, {parent:k}).k;
  c || e(new E.e(T.$));
  var d = yb(b), f = E.mc(c, d);
  f && e(new E.e(f));
  c.o.pa || e(new E.e(T.W));
  return c.o.pa(c, d, a)
}, rename:function(a, b) {
  var c = xb(a), d = xb(b), f = yb(a), g = yb(b), i, j, p;
  try {
    i = E.F(a, {parent:k}), j = i.k, i = E.F(b, {parent:k}), p = i.k
  }catch(t) {
    e(new E.e(T.wa))
  }
  (!j || !p) && e(new E.e(T.$));
  j.L !== p.L && e(new E.e(T.Hd));
  i = E.na(j, f);
  d = Cb(a, d);
  "." !== d.charAt(0) && e(new E.e(T.D));
  d = Cb(b, c);
  "." !== d.charAt(0) && e(new E.e(T.Rb));
  var y;
  try {
    y = E.na(p, g)
  }catch(m) {
  }
  if(i !== y) {
    c = E.Q(i.mode);
    (f = E.Gb(j, f, c)) && e(new E.e(f));
    (f = y ? E.Gb(p, g, c) : E.mc(p, g)) && e(new E.e(f));
    j.o.rename || e(new E.e(T.W));
    (E.Ca(i) || y && E.Ca(y)) && e(new E.e(T.wa));
    p !== j && (f = E.Ga(j, "w")) && e(new E.e(f));
    try {
      E.N.willMovePath && E.N.willMovePath(a, b)
    }catch(x) {
      console.log("FS.trackingDelegate['willMovePath']('" + a + "', '" + b + "') threw an exception: " + x.message)
    }
    E.hd(i);
    try {
      j.o.rename(i, p, g)
    }catch(G) {
      e(G)
    }finally {
      E.gd(i)
    }
    try {
      if(E.N.onMovePath) {
        E.N.onMovePath(a, b)
      }
    }catch(L) {
      console.log("FS.trackingDelegate['onMovePath']('" + a + "', '" + b + "') threw an exception: " + L.message)
    }
  }
}, hb:function(a) {
  var b = E.F(a, {parent:k}).k, c = yb(a), d = E.na(b, c), f = E.Gb(b, c, k);
  f && e(new E.e(f));
  b.o.hb || e(new E.e(T.W));
  E.Ca(d) && e(new E.e(T.wa));
  try {
    E.N.willDeletePath && E.N.willDeletePath(a)
  }catch(g) {
    console.log("FS.trackingDelegate['willDeletePath']('" + a + "') threw an exception: " + g.message)
  }
  b.o.hb(b, c);
  E.bc(d);
  try {
    if(E.N.onDeletePath) {
      E.N.onDeletePath(a)
    }
  }catch(i) {
    console.log("FS.trackingDelegate['onDeletePath']('" + a + "') threw an exception: " + i.message)
  }
}, gb:function(a) {
  a = E.F(a, {aa:k}).k;
  a.o.gb || e(new E.e(T.mb));
  return a.o.gb(a)
}, Ra:function(a) {
  var b = E.F(a, {parent:k}).k, c = yb(a), d = E.na(b, c), f = E.Gb(b, c, n);
  f && (f === T.Ia && (f = T.W), e(new E.e(f)));
  b.o.Ra || e(new E.e(T.W));
  E.Ca(d) && e(new E.e(T.wa));
  try {
    E.N.willDeletePath && E.N.willDeletePath(a)
  }catch(g) {
    console.log("FS.trackingDelegate['willDeletePath']('" + a + "') threw an exception: " + g.message)
  }
  b.o.Ra(b, c);
  E.bc(d);
  try {
    if(E.N.onDeletePath) {
      E.N.onDeletePath(a)
    }
  }catch(i) {
    console.log("FS.trackingDelegate['onDeletePath']('" + a + "') threw an exception: " + i.message)
  }
}, Ma:function(a) {
  (a = E.F(a).k) || e(new E.e(T.$));
  a.o.Ma || e(new E.e(T.D));
  return a.o.Ma(a)
}, ud:function(a, b) {
  var c = E.F(a, {aa:!b}).k;
  c || e(new E.e(T.$));
  c.o.ba || e(new E.e(T.W));
  return c.o.ba(c)
}, Oh:function(a) {
  return E.ud(a, k)
}, sb:function(a, b, c) {
  a = "string" === typeof a ? E.F(a, {aa:!c}).k : a;
  a.o.O || e(new E.e(T.W));
  a.o.O(a, {mode:b & 4095 | a.mode & -4096, timestamp:Date.now()})
}, Kh:function(a, b) {
  E.sb(a, b, k)
}, sh:function(a, b) {
  var c = E.Ja(a);
  c || e(new E.e(T.ga));
  E.sb(c.k, b)
}, Mc:function(a, b, c, d) {
  a = "string" === typeof a ? E.F(a, {aa:!d}).k : a;
  a.o.O || e(new E.e(T.W));
  a.o.O(a, {timestamp:Date.now()})
}, Lh:function(a, b, c) {
  E.Mc(a, b, c, k)
}, th:function(a, b, c) {
  (a = E.Ja(a)) || e(new E.e(T.ga));
  E.Mc(a.k, b, c)
}, truncate:function(a, b) {
  0 > b && e(new E.e(T.D));
  var c;
  c = "string" === typeof a ? E.F(a, {aa:k}).k : a;
  c.o.O || e(new E.e(T.W));
  E.Q(c.mode) && e(new E.e(T.Ia));
  E.isFile(c.mode) || e(new E.e(T.D));
  var d = E.Ga(c, "w");
  d && e(new E.e(d));
  c.o.O(c, {size:b, timestamp:Date.now()})
}, vh:function(a, b) {
  var c = E.Ja(a);
  c || e(new E.e(T.ga));
  0 === (c.J & 2097155) && e(new E.e(T.D));
  E.truncate(c.k, b)
}, ei:function(a, b, c) {
  a = E.F(a, {aa:k}).k;
  a.o.O(a, {timestamp:Math.max(b, c)})
}, open:function(a, b, c, d, f) {
  "" === a && e(new E.e(T.$));
  var b = "string" === typeof b ? E.od(b) : b, c = b & 64 ? ("undefined" === typeof c ? 438 : c) & 4095 | 32768 : 0, g;
  if("object" === typeof a) {
    g = a
  }else {
    a = wb(a);
    try {
      g = E.F(a, {aa:!(b & 131072)}).k
    }catch(i) {
    }
  }
  var j = n;
  b & 64 && (g ? b & 128 && e(new E.e(T.Ac)) : (g = E.oa(a, c, 0), j = k));
  g || e(new E.e(T.$));
  E.Eb(g.mode) && (b &= -513);
  j || (c = E.Ge(g, b)) && e(new E.e(c));
  b & 512 && E.truncate(g, 0);
  b &= -641;
  d = E.Oc({k:g, path:E.ta(g), J:b, seekable:k, position:0, q:g.q, df:[], error:n}, d, f);
  d.q.open && d.q.open(d);
  u.logReadFiles && !(b & 1) && (E.pc || (E.pc = {}), a in E.pc || (E.pc[a] = 1, u.printErr("read file: " + a)));
  try {
    E.N.onOpenFile && (f = 0, 1 !== (b & 2097155) && (f |= E.xd.qd.Kd), 0 !== (b & 2097155) && (f |= E.xd.qd.Nd), E.N.onOpenFile(a, f))
  }catch(p) {
    console.log("FS.trackingDelegate['onOpenFile']('" + a + "', flags) threw an exception: " + p.message)
  }
  return d
}, close:function(a) {
  try {
    a.q.close && a.q.close(a)
  }catch(b) {
    e(b)
  }finally {
    E.Yd(a.H)
  }
}, ma:function(a, b, c) {
  (!a.seekable || !a.q.ma) && e(new E.e(T.ob));
  a.position = a.q.ma(a, b, c);
  a.df = [];
  return a.position
}, U:function(a, b, c, d, f) {
  (0 > d || 0 > f) && e(new E.e(T.D));
  1 === (a.J & 2097155) && e(new E.e(T.ga));
  E.Q(a.k.mode) && e(new E.e(T.Ia));
  a.q.U || e(new E.e(T.D));
  var g = k;
  "undefined" === typeof f ? (f = a.position, g = n) : a.seekable || e(new E.e(T.ob));
  b = a.q.U(a, b, c, d, f);
  g || (a.position += b);
  return b
}, write:function(a, b, c, d, f, g) {
  (0 > d || 0 > f) && e(new E.e(T.D));
  0 === (a.J & 2097155) && e(new E.e(T.ga));
  E.Q(a.k.mode) && e(new E.e(T.Ia));
  a.q.write || e(new E.e(T.D));
  a.J & 1024 && E.ma(a, 0, 2);
  var i = k;
  "undefined" === typeof f ? (f = a.position, i = n) : a.seekable || e(new E.e(T.ob));
  b = a.q.write(a, b, c, d, f, g);
  i || (a.position += b);
  try {
    if(a.path && E.N.onWriteToFile) {
      E.N.onWriteToFile(a.path)
    }
  }catch(j) {
    console.log("FS.trackingDelegate['onWriteToFile']('" + path + "') threw an exception: " + j.message)
  }
  return b
}, Xa:function(a, b, c) {
  (0 > b || 0 >= c) && e(new E.e(T.D));
  0 === (a.J & 2097155) && e(new E.e(T.ga));
  !E.isFile(a.k.mode) && !E.Q(node.mode) && e(new E.e(T.kb));
  a.q.Xa || e(new E.e(T.nb));
  a.q.Xa(a, b, c)
}, bb:function(a, b, c, d, f, g, i) {
  1 === (a.J & 2097155) && e(new E.e(T.Pb));
  a.q.bb || e(new E.e(T.kb));
  return a.q.bb(a, b, c, d, f, g, i)
}, $a:function(a, b, c) {
  a.q.$a || e(new E.e(T.Fd));
  return a.q.$a(a, b, c)
}, Wh:function(a, b) {
  b = b || {};
  b.J = b.J || "r";
  b.encoding = b.encoding || "binary";
  "utf8" !== b.encoding && "binary" !== b.encoding && e(Error('Invalid encoding type "' + b.encoding + '"'));
  var c, d = E.open(a, b.J), f = E.ud(a).size, g = new Uint8Array(f);
  E.U(d, g, 0, f, 0);
  if("utf8" === b.encoding) {
    c = "";
    for(var i = new A.Wa, j = 0;j < f;j++) {
      c += i.Jb(g[j])
    }
  }else {
    "binary" === b.encoding && (c = g)
  }
  E.close(d);
  return c
}, fi:function(a, b, c) {
  c = c || {};
  c.J = c.J || "w";
  c.encoding = c.encoding || "utf8";
  "utf8" !== c.encoding && "binary" !== c.encoding && e(Error('Invalid encoding type "' + c.encoding + '"'));
  a = E.open(a, c.J, c.mode);
  "utf8" === c.encoding ? (b = new Uint8Array((new A.Wa).sd(b)), E.write(a, b, 0, b.length, 0, c.Wd)) : "binary" === c.encoding && E.write(a, b, 0, b.length, 0, c.Wd);
  E.close(a)
}, ac:function() {
  return E.Qc
}, jh:function(a) {
  a = E.F(a, {aa:k});
  E.Q(a.k.mode) || e(new E.e(T.mb));
  var b = E.Ga(a.k, "x");
  b && e(new E.e(b));
  E.Qc = a.path
}, $d:function() {
  E.ua("/tmp");
  E.ua("/home");
  E.ua("/home/web_user")
}, Zd:function() {
  E.ua("/dev");
  E.rc(E.Ea(1, 3), {U:function() {
    return 0
  }, write:function() {
    return 0
  }});
  E.Hb("/dev/null", E.Ea(1, 3));
  Eb(E.Ea(5, 0), Hb);
  Eb(E.Ea(6, 0), Ib);
  E.Hb("/dev/tty", E.Ea(5, 0));
  E.Hb("/dev/tty1", E.Ea(6, 0));
  var a;
  if("undefined" !== typeof crypto) {
    var b = new Uint8Array(1);
    a = function() {
      crypto.getRandomValues(b);
      return b[0]
    }
  }else {
    a = v ? function() {
      return require("crypto").randomBytes(1)[0]
    } : function() {
      return 256 * Math.random() | 0
    }
  }
  E.ia("/dev", "random", a);
  E.ia("/dev", "urandom", a);
  E.ua("/dev/shm");
  E.ua("/dev/shm/tmp")
}, he:function() {
  u.stdin ? E.ia("/dev", "stdin", u.stdin) : E.pa("/dev/tty", "/dev/stdin");
  u.stdout ? E.ia("/dev", "stdout", l, u.stdout) : E.pa("/dev/tty", "/dev/stdout");
  u.stderr ? E.ia("/dev", "stderr", l, u.stderr) : E.pa("/dev/tty1", "/dev/stderr");
  var a = E.open("/dev/stdin", "r");
  I[Jb >> 2] = E.hc(a);
  w(0 === a.H, "invalid handle for stdin (" + a.H + ")");
  a = E.open("/dev/stdout", "w");
  I[Kb >> 2] = E.hc(a);
  w(1 === a.H, "invalid handle for stdout (" + a.H + ")");
  a = E.open("/dev/stderr", "w");
  I[Lb >> 2] = E.hc(a);
  w(2 === a.H, "invalid handle for stderr (" + a.H + ")")
}, Vc:function() {
  E.e || (E.e = function(a, b) {
    this.k = b;
    this.Ze = function(a) {
      this.zb = a;
      for(var b in T) {
        if(T[b] === a) {
          this.code = b;
          break
        }
      }
    };
    this.Ze(a);
    this.message = rb[a]
  }, E.e.prototype = Error(), [T.$].forEach(function(a) {
    E.gc[a] = new E.e(a);
    E.gc[a].stack = "<generic error, no stack>"
  }))
}, bf:function() {
  E.Vc();
  E.ca = Array(4096);
  E.L(U, {}, "/");
  E.$d();
  E.Zd()
}, Za:function(a, b, c) {
  w(!E.Za.Db, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
  E.Za.Db = k;
  E.Vc();
  u.stdin = a || u.stdin;
  u.stdout = b || u.stdout;
  u.stderr = c || u.stderr;
  E.he()
}, Re:function() {
  E.Za.Db = n;
  for(var a = 0;a < E.Ha.length;a++) {
    var b = E.Ha[a];
    b && E.close(b)
  }
}, Bb:function(a, b) {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c
}, Jh:function(a, b) {
  var c = zb.apply(l, a);
  b && "/" == c[0] && (c = c.substr(1));
  return c
}, Zg:function(a, b) {
  return Bb(b, a)
}, ai:function(a) {
  return wb(a)
}, uh:function(a, b) {
  var c = E.Xb(a, b);
  if(c.dc) {
    return c.object
  }
  S(c.error);
  return l
}, Xb:function(a, b) {
  try {
    var c = E.F(a, {aa:!b}), a = c.path
  }catch(d) {
  }
  var f = {Fb:n, dc:n, error:0, name:l, path:l, object:l, Ne:n, Pe:l, Oe:l};
  try {
    c = E.F(a, {parent:k}), f.Ne = k, f.Pe = c.path, f.Oe = c.k, f.name = yb(a), c = E.F(a, {aa:!b}), f.dc = k, f.path = c.path, f.object = c.k, f.name = c.k.name, f.Fb = "/" === c.path
  }catch(g) {
    f.error = g.zb
  }
  return f
}, be:function(a, b, c, d) {
  a = Ab("string" === typeof a ? a : E.ta(a), b);
  return E.ua(a, E.Bb(c, d))
}, ee:function(a, b) {
  for(var a = "string" === typeof a ? a : E.ta(a), c = b.split("/").reverse();c.length;) {
    var d = c.pop();
    if(d) {
      var f = Ab(a, d);
      try {
        E.ua(f)
      }catch(g) {
      }
      a = f
    }
  }
  return f
}, ae:function(a, b, c, d, f) {
  a = Ab("string" === typeof a ? a : E.ta(a), b);
  return E.create(a, E.Bb(d, f))
}, $b:function(a, b, c, d, f, g) {
  a = b ? Ab("string" === typeof a ? a : E.ta(a), b) : a;
  d = E.Bb(d, f);
  f = E.create(a, d);
  if(c) {
    if("string" === typeof c) {
      for(var a = Array(c.length), b = 0, i = c.length;b < i;++b) {
        a[b] = c.charCodeAt(b)
      }
      c = a
    }
    E.sb(f, d | 146);
    a = E.open(f, "w");
    E.write(a, c, 0, c.length, 0, g);
    E.close(a);
    E.sb(f, d)
  }
  return f
}, ia:function(a, b, c, d) {
  a = Ab("string" === typeof a ? a : E.ta(a), b);
  b = E.Bb(!!c, !!d);
  E.ia.lc || (E.ia.lc = 64);
  var f = E.Ea(E.ia.lc++, 0);
  E.rc(f, {open:function(a) {
    a.seekable = n
  }, close:function() {
    d && (d.buffer && d.buffer.length) && d(10)
  }, U:function(a, b, d, f) {
    for(var t = 0, y = 0;y < f;y++) {
      var m;
      try {
        m = c()
      }catch(x) {
        e(new E.e(T.ya))
      }
      m === h && 0 === t && e(new E.e(T.Va));
      if(m === l || m === h) {
        break
      }
      t++;
      b[d + y] = m
    }
    t && (a.k.timestamp = Date.now());
    return t
  }, write:function(a, b, c, f) {
    for(var t = 0;t < f;t++) {
      try {
        d(b[c + t])
      }catch(y) {
        e(new E.e(T.ya))
      }
    }
    f && (a.k.timestamp = Date.now());
    return t
  }});
  return E.Hb(a, b, f)
}, de:function(a, b, c) {
  a = Ab("string" === typeof a ? a : E.ta(a), b);
  return E.pa(c, a)
}, Zc:function(a) {
  if(a.jc || a.Be || a.link || a.n) {
    return k
  }
  var b = k;
  "undefined" !== typeof XMLHttpRequest && e(Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."));
  if(u.read) {
    try {
      a.n = ab(u.read(a.url), k), a.B = a.n.length
    }catch(c) {
      b = n
    }
  }else {
    e(Error("Cannot load without read() or XMLHttpRequest."))
  }
  b || S(T.ya);
  return b
}, ce:function(a, b, c, d, f) {
  function g() {
    this.kc = n;
    this.ub = []
  }
  g.prototype.get = function(a) {
    if(!(a > this.length - 1 || 0 > a)) {
      var b = a % this.tb;
      return this.ue(a / this.tb | 0)[b]
    }
  };
  g.prototype.Ye = function(a) {
    this.ue = a
  };
  g.prototype.Kc = function() {
    var a = new XMLHttpRequest;
    a.open("HEAD", c, n);
    a.send(l);
    200 <= a.status && 300 > a.status || 304 === a.status || e(Error("Couldn't load " + c + ". Status: " + a.status));
    var b = Number(a.getResponseHeader("Content-length")), d, f = 1048576;
    if(!((d = a.getResponseHeader("Accept-Ranges")) && "bytes" === d)) {
      f = b
    }
    var g = this;
    g.Ye(function(a) {
      var d = a * f, i = (a + 1) * f - 1, i = Math.min(i, b - 1);
      if("undefined" === typeof g.ub[a]) {
        var j = g.ub;
        d > i && e(Error("invalid range (" + d + ", " + i + ") or no bytes requested!"));
        i > b - 1 && e(Error("only " + b + " bytes available! programmer error!"));
        var m = new XMLHttpRequest;
        m.open("GET", c, n);
        b !== f && m.setRequestHeader("Range", "bytes=" + d + "-" + i);
        "undefined" != typeof Uint8Array && (m.responseType = "arraybuffer");
        m.overrideMimeType && m.overrideMimeType("text/plain; charset=x-user-defined");
        m.send(l);
        200 <= m.status && 300 > m.status || 304 === m.status || e(Error("Couldn't load " + c + ". Status: " + m.status));
        d = m.response !== h ? new Uint8Array(m.response || []) : ab(m.responseText || "", k);
        j[a] = d
      }
      "undefined" === typeof g.ub[a] && e(Error("doXHR failed!"));
      return g.ub[a]
    });
    this.Pd = b;
    this.Od = f;
    this.kc = k
  };
  if("undefined" !== typeof XMLHttpRequest) {
    ea || e("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
    var i = new g;
    Object.defineProperty(i, "length", {get:function() {
      this.kc || this.Kc();
      return this.Pd
    }});
    Object.defineProperty(i, "chunkSize", {get:function() {
      this.kc || this.Kc();
      return this.Od
    }});
    i = {jc:n, n:i}
  }else {
    i = {jc:n, url:c}
  }
  var j = E.ae(a, b, i, d, f);
  i.n ? j.n = i.n : i.url && (j.n = l, j.url = i.url);
  Object.defineProperty(j, "usedBytes", {get:function() {
    return this.n.length
  }});
  var p = {};
  Object.keys(j.q).forEach(function(a) {
    var b = j.q[a];
    p[a] = function() {
      E.Zc(j) || e(new E.e(T.ya));
      return b.apply(l, arguments)
    }
  });
  p.U = function(a, b, c, d, f) {
    E.Zc(j) || e(new E.e(T.ya));
    a = a.k.n;
    if(f >= a.length) {
      return 0
    }
    d = Math.min(a.length - f, d);
    w(0 <= d);
    if(a.slice) {
      for(var g = 0;g < d;g++) {
        b[c + g] = a[f + g]
      }
    }else {
      for(g = 0;g < d;g++) {
        b[c + g] = a.get(f + g)
      }
    }
    return d
  };
  j.q = p;
  return j
}, fe:function(a, b, c, d, f, g, i, j, p) {
  function t() {
    Mb = document.pointerLockElement === x || document.mozPointerLockElement === x || document.webkitPointerLockElement === x || document.msPointerLockElement === x
  }
  function y(c) {
    function m(c) {
      j || E.$b(a, b, c, d, f, p);
      g && g();
      nb()
    }
    var t = n;
    u.preloadPlugins.forEach(function(a) {
      !t && a.canHandle(G) && (a.handle(c, G, m, function() {
        i && i();
        nb()
      }), t = k)
    });
    t || m(c)
  }
  u.preloadPlugins || (u.preloadPlugins = []);
  if(!Nb) {
    Nb = k;
    try {
      new Blob, Ob = k
    }catch(m) {
      Ob = n, console.log("warning: no blob constructor, cannot create blobs with mimetypes")
    }
    Pb = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : !Ob ? console.log("warning: no BlobBuilder") : l;
    Qb = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : h;
    !u.pd && "undefined" === typeof Qb && (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."), u.pd = k);
    u.preloadPlugins.push({canHandle:function(a) {
      return!u.pd && /\.(jpg|jpeg|png|bmp)$/i.test(a)
    }, handle:function(a, b, c, d) {
      var f = l;
      if(Ob) {
        try {
          f = new Blob([a], {type:Rb(b)}), f.size !== a.length && (f = new Blob([(new Uint8Array(a)).buffer], {type:Rb(b)}))
        }catch(g) {
          A.Sa("Blob constructor present but fails: " + g + "; falling back to blob builder")
        }
      }
      f || (f = new Pb, f.append((new Uint8Array(a)).buffer), f = f.getBlob());
      var i = Qb.createObjectURL(f), j = new Image;
      j.onload = function() {
        w(j.complete, "Image " + b + " could not be decoded");
        var d = document.createElement("canvas");
        d.width = j.width;
        d.height = j.height;
        d.getContext("2d").drawImage(j, 0, 0);
        u.preloadedImages[b] = d;
        Qb.revokeObjectURL(i);
        c && c(a)
      };
      j.onerror = function() {
        console.log("Image " + i + " could not be decoded");
        d && d()
      };
      j.src = i
    }});
    u.preloadPlugins.push({canHandle:function(a) {
      return!u.Th && a.substr(-4) in {".ogg":1, ".wav":1, ".mp3":1}
    }, handle:function(a, b, c, d) {
      function f(d) {
        i || (i = k, u.preloadedAudios[b] = d, c && c(a))
      }
      function g() {
        i || (i = k, u.preloadedAudios[b] = new Audio, d && d())
      }
      var i = n;
      if(Ob) {
        try {
          var j = new Blob([a], {type:Rb(b)})
        }catch(m) {
          return g()
        }
        var j = Qb.createObjectURL(j), p = new Audio;
        p.addEventListener("canplaythrough", function() {
          f(p)
        }, n);
        p.onerror = function() {
          if(!i) {
            console.log("warning: browser could not fully decode audio " + b + ", trying slower base64 approach");
            for(var c = "", d = 0, g = 0, j = 0;j < a.length;j++) {
              d = d << 8 | a[j];
              for(g += 8;6 <= g;) {
                var m = d >> g - 6 & 63, g = g - 6, c = c + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[m]
              }
            }
            2 == g ? (c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(d & 3) << 4], c += "==") : 4 == g && (c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(d & 15) << 2], c += "=");
            p.src = "data:audio/x-" + b.substr(-3) + ";base64," + c;
            f(p)
          }
        };
        p.src = j;
        u.noExitRuntime = k;
        setTimeout(function() {
          oa || f(p)
        }, 1E4)
      }else {
        return g()
      }
    }});
    var x = u.canvas;
    x && (x.sc = x.requestPointerLock || x.mozRequestPointerLock || x.webkitRequestPointerLock || x.msRequestPointerLock || q(), x.Xc = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || q(), x.Xc = x.Xc.bind(document), document.addEventListener("pointerlockchange", t, n), document.addEventListener("mozpointerlockchange", t, n), document.addEventListener("webkitpointerlockchange", t, n), document.addEventListener("mspointerlockchange", 
    t, n), u.elementPointerLock && x.addEventListener("click", function(a) {
      !Mb && x.sc && (x.sc(), a.preventDefault())
    }, n))
  }
  var G = b ? Bb(Ab(a, b)) : a;
  mb();
  "string" == typeof c ? Sb(c, function(a) {
    y(a)
  }, i) : y(c)
}, indexedDB:function() {
  return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
}, xc:function() {
  return"EM_FS_" + window.location.pathname
}, yc:20, Ta:"FILE_DATA", Zh:function(a, b, c) {
  var b = b || q(), c = c || q(), d = E.indexedDB();
  try {
    var f = d.open(E.xc(), E.yc)
  }catch(g) {
    return c(g)
  }
  f.Me = function() {
    console.log("creating db");
    f.result.createObjectStore(E.Ta)
  };
  f.onsuccess = function() {
    var d = f.result.transaction([E.Ta], "readwrite"), g = d.objectStore(E.Ta), p = 0, t = 0, y = a.length;
    a.forEach(function(a) {
      a = g.put(E.Xb(a).object.n, a);
      a.onsuccess = function() {
        p++;
        p + t == y && (0 == t ? b() : c())
      };
      a.onerror = function() {
        t++;
        p + t == y && (0 == t ? b() : c())
      }
    });
    d.onerror = c
  };
  f.onerror = c
}, Nh:function(a, b, c) {
  var b = b || q(), c = c || q(), d = E.indexedDB();
  try {
    var f = d.open(E.xc(), E.yc)
  }catch(g) {
    return c(g)
  }
  f.Me = c;
  f.onsuccess = function() {
    var d = f.result;
    try {
      var g = d.transaction([E.Ta], "readonly")
    }catch(p) {
      c(p);
      return
    }
    var t = g.objectStore(E.Ta), y = 0, m = 0, x = a.length;
    a.forEach(function(a) {
      var d = t.get(a);
      d.onsuccess = function() {
        E.Xb(a).dc && E.Ra(a);
        E.$b(xb(a), yb(a), d.result, k, k, k);
        y++;
        y + m == x && (0 == m ? b() : c())
      };
      d.onerror = function() {
        m++;
        y + m == x && (0 == m ? b() : c())
      }
    });
    g.onerror = c
  };
  f.onerror = c
}};
function Tb() {
  e("TODO")
}
var V = {L:function() {
  u.websocket = u.websocket && "object" === typeof u.websocket ? u.websocket : {};
  u.websocket.Tb = {};
  u.websocket.on = function(a, b) {
    "function" === typeof b && (this.Tb[a] = b);
    return this
  };
  u.websocket.X = function(a, b) {
    "function" === typeof this.Tb[a] && this.Tb[a].call(this, b)
  };
  return E.createNode(l, "/", 16895, 0)
}, ge:function(a, b, c) {
  c && w(1 == b == (6 == c));
  a = {le:a, type:b, protocol:c, M:l, error:l, fb:{}, nc:[], Na:[], Pa:V.S};
  b = V.Ib();
  c = E.createNode(V.root, b, 49152, 0);
  c.Oa = a;
  b = E.Oc({path:b, k:c, J:E.od("r+"), seekable:n, q:V.q});
  a.G = b;
  return a
}, se:function(a) {
  a = E.Ja(a);
  return!a || !E.Ce(a.k.mode) ? l : a.k.Oa
}, q:{rd:function(a) {
  a = a.k.Oa;
  return a.Pa.rd(a)
}, $a:function(a, b, c) {
  a = a.k.Oa;
  return a.Pa.$a(a, b, c)
}, U:function(a, b, c, d) {
  a = a.k.Oa;
  d = a.Pa.Te(a, d);
  if(!d) {
    return 0
  }
  b.set(d.buffer, c);
  return d.buffer.length
}, write:function(a, b, c, d) {
  a = a.k.Oa;
  return a.Pa.Xe(a, b, c, d)
}, close:function(a) {
  a = a.k.Oa;
  a.Pa.close(a)
}}, Ib:function() {
  V.Ib.Pc || (V.Ib.Pc = 0);
  return"socket[" + V.Ib.Pc++ + "]"
}, S:{wb:function(a, b, c) {
  var d;
  "object" === typeof b && (d = b, c = b = l);
  if(d) {
    d._socket ? (b = d._socket.remoteAddress, c = d._socket.remotePort) : ((c = /ws[s]?:\/\/([^:]+):(\d+)/.exec(d.url)) || e(Error("WebSocket URL must be in the format ws(s)://address:port")), b = c[1], c = parseInt(c[2], 10))
  }else {
    try {
      var f = u.websocket && "object" === typeof u.websocket, g = "ws:#".replace("#", "//");
      f && "string" === typeof u.websocket.url && (g = u.websocket.url);
      if("ws://" === g || "wss://" === g) {
        var i = b.split("/"), g = g + i[0] + ":" + c + "/" + i.slice(1).join("/")
      }
      i = "binary";
      f && "string" === typeof u.websocket.subprotocol && (i = u.websocket.subprotocol);
      var i = i.replace(/^ +| +$/g, "").split(/ *, */), j = v ? {protocol:i.toString()} : i;
      d = new (v ? require("ws") : window.WebSocket)(g, j);
      d.binaryType = "arraybuffer"
    }catch(p) {
      e(new E.e(T.Bc))
    }
  }
  b = {ha:b, port:c, p:d, xb:[]};
  V.S.Ic(a, b);
  V.S.xe(a, b);
  2 === a.type && "undefined" !== typeof a.Qa && b.xb.push(new Uint8Array([255, 255, 255, 255, 112, 111, 114, 116, (a.Qa & 65280) >> 8, a.Qa & 255]));
  return b
}, Cb:function(a, b, c) {
  return a.fb[b + ":" + c]
}, Ic:function(a, b) {
  a.fb[b.ha + ":" + b.port] = b
}, td:function(a, b) {
  delete a.fb[b.ha + ":" + b.port]
}, xe:function(a, b) {
  function c() {
    u.websocket.X("open", a.G.H);
    try {
      for(var c = b.xb.shift();c;) {
        b.p.send(c), c = b.xb.shift()
      }
    }catch(d) {
      b.p.close()
    }
  }
  function d(c) {
    w("string" !== typeof c && c.byteLength !== h);
    var c = new Uint8Array(c), d = f;
    f = n;
    d && 10 === c.length && 255 === c[0] && 255 === c[1] && 255 === c[2] && 255 === c[3] && 112 === c[4] && 111 === c[5] && 114 === c[6] && 116 === c[7] ? (c = c[8] << 8 | c[9], V.S.td(a, b), b.port = c, V.S.Ic(a, b)) : (a.Na.push({ha:b.ha, port:b.port, data:c}), u.websocket.X("message", a.G.H))
  }
  var f = k;
  v ? (b.p.on("open", c), b.p.on("message", function(a, b) {
    b.binary && d((new Uint8Array(a)).buffer)
  }), b.p.on("close", function() {
    u.websocket.X("close", a.G.H)
  }), b.p.on("error", function() {
    a.error = T.zc;
    u.websocket.X("error", [a.G.H, a.error, "ECONNREFUSED: Connection refused"])
  })) : (b.p.onopen = c, b.p.onclose = function() {
    u.websocket.X("close", a.G.H)
  }, b.p.onmessage = function(a) {
    d(a.data)
  }, b.p.onerror = function() {
    a.error = T.zc;
    u.websocket.X("error", [a.G.H, a.error, "ECONNREFUSED: Connection refused"])
  })
}, rd:function(a) {
  if(1 === a.type && a.M) {
    return a.nc.length ? 65 : 0
  }
  var b = 0, c = 1 === a.type ? V.S.Cb(a, a.ja, a.ka) : l;
  if(a.Na.length || !c || c && c.p.readyState === c.p.jb || c && c.p.readyState === c.p.CLOSED) {
    b |= 65
  }
  if(!c || c && c.p.readyState === c.p.OPEN) {
    b |= 4
  }
  if(c && c.p.readyState === c.p.jb || c && c.p.readyState === c.p.CLOSED) {
    b |= 16
  }
  return b
}, $a:function(a, b, c) {
  switch(b) {
    case 21531:
      return b = 0, a.Na.length && (b = a.Na[0].data.length), I[c >> 2] = b, 0;
    default:
      return T.D
  }
}, close:function(a) {
  if(a.M) {
    try {
      a.M.close()
    }catch(b) {
    }
    a.M = l
  }
  for(var c = Object.keys(a.fb), d = 0;d < c.length;d++) {
    var f = a.fb[c[d]];
    try {
      f.p.close()
    }catch(g) {
    }
    V.S.td(a, f)
  }
  return 0
}, bind:function(a, b, c) {
  ("undefined" !== typeof a.tc || "undefined" !== typeof a.Qa) && e(new E.e(T.D));
  a.tc = b;
  a.Qa = c || Tb();
  if(2 === a.type) {
    a.M && (a.M.close(), a.M = l);
    try {
      a.Pa.De(a, 0)
    }catch(d) {
      d instanceof E.e || e(d), d.zb !== T.nb && e(d)
    }
  }
}, kh:function(a, b, c) {
  a.M && e(new E.e(T.nb));
  if("undefined" !== typeof a.ja && "undefined" !== typeof a.ka) {
    var d = V.S.Cb(a, a.ja, a.ka);
    d && (d.p.readyState === d.p.CONNECTING && e(new E.e(T.zd)), e(new E.e(T.Cd)))
  }
  b = V.S.wb(a, b, c);
  a.ja = b.ha;
  a.ka = b.port;
  e(new E.e(T.Bd))
}, De:function(a) {
  v || e(new E.e(T.nb));
  a.M && e(new E.e(T.D));
  var b = require("ws").Server;
  a.M = new b({host:a.tc, port:a.Qa});
  u.websocket.X("listen", a.G.H);
  a.M.on("connection", function(b) {
    if(1 === a.type) {
      var d = V.ge(a.le, a.type, a.protocol), b = V.S.wb(d, b);
      d.ja = b.ha;
      d.ka = b.port;
      a.nc.push(d);
      u.websocket.X("connection", d.G.H)
    }else {
      V.S.wb(a, b), u.websocket.X("connection", a.G.H)
    }
  });
  a.M.on("closed", function() {
    u.websocket.X("close", a.G.H);
    a.M = l
  });
  a.M.on("error", function() {
    a.error = T.Bc;
    u.websocket.X("error", [a.G.H, a.error, "EHOSTUNREACH: Host is unreachable"])
  })
}, accept:function(a) {
  a.M || e(new E.e(T.D));
  var b = a.nc.shift();
  b.G.J = a.G.J;
  return b
}, Ch:function(a, b) {
  var c, d;
  b ? ((a.ja === h || a.ka === h) && e(new E.e(T.lb)), c = a.ja, d = a.ka) : (c = a.tc || 0, d = a.Qa || 0);
  return{ha:c, port:d}
}, Xe:function(a, b, c, d, f, g) {
  if(2 === a.type) {
    if(f === h || g === h) {
      f = a.ja, g = a.ka
    }
    (f === h || g === h) && e(new E.e(T.Ad))
  }else {
    f = a.ja, g = a.ka
  }
  var i = V.S.Cb(a, f, g);
  1 === a.type && ((!i || i.p.readyState === i.p.jb || i.p.readyState === i.p.CLOSED) && e(new E.e(T.lb)), i.p.readyState === i.p.CONNECTING && e(new E.e(T.Va)));
  b = b instanceof Array || b instanceof ArrayBuffer ? b.slice(c, c + d) : b.buffer.slice(b.byteOffset + c, b.byteOffset + c + d);
  if(2 === a.type && (!i || i.p.readyState !== i.p.OPEN)) {
    if(!i || i.p.readyState === i.p.jb || i.p.readyState === i.p.CLOSED) {
      i = V.S.wb(a, f, g)
    }
    i.xb.push(b);
    return d
  }
  try {
    return i.p.send(b), d
  }catch(j) {
    e(new E.e(T.D))
  }
}, Te:function(a, b) {
  1 === a.type && a.M && e(new E.e(T.lb));
  var c = a.Na.shift();
  if(!c) {
    if(1 === a.type) {
      var d = V.S.Cb(a, a.ja, a.ka);
      if(d) {
        if(d.p.readyState === d.p.jb || d.p.readyState === d.p.CLOSED) {
          return l
        }
        e(new E.e(T.Va))
      }
      e(new E.e(T.lb))
    }
    e(new E.e(T.Va))
  }
  var d = c.data.byteLength || c.data.length, f = c.data.byteOffset || 0, g = c.data.buffer || c.data, i = Math.min(b, d), j = {buffer:new Uint8Array(g, f, i), ha:c.ha, port:c.port};
  1 === a.type && i < d && (c.data = new Uint8Array(g, f + i, d - i), a.Na.unshift(c));
  return j
}}};
function Ub(a, b, c) {
  a = E.Ja(a);
  if(!a) {
    return S(T.ga), -1
  }
  try {
    return E.write(a, H, b, c)
  }catch(d) {
    return E.fd(d), -1
  }
}
function Vb(a) {
  a = E.cd(a);
  return!a ? -1 : a.H
}
function Wb(a, b, c, d) {
  c *= b;
  if(0 == c) {
    return 0
  }
  a = Ub(Vb(d), a, c);
  if(-1 == a) {
    if(b = E.cd(d)) {
      b.error = k
    }
    return 0
  }
  return a / b | 0
}
u._strlen = Xb;
function Yb(a) {
  return 0 > a || 0 === a && -Infinity === 1 / a
}
function Zb(a, b) {
  function c(a) {
    var c;
    "double" === a ? c = (I[R >> 2] = I[b + f >> 2], I[R + 4 >> 2] = I[b + (f + 4) >> 2], +Da[R >> 3]) : "i64" == a ? c = [I[b + f >> 2], I[b + (f + 4) >> 2]] : (a = "i32", c = I[b + f >> 2]);
    f += A.ad(a);
    return c
  }
  for(var d = a, f = 0, g = [], i, j;;) {
    var p = d;
    i = H[d >> 0];
    if(0 === i) {
      break
    }
    j = H[d + 1 >> 0];
    if(37 == i) {
      var t = n, y = n, m = n, x = n, G = n;
      a:for(;;) {
        switch(j) {
          case 43:
            t = k;
            break;
          case 45:
            y = k;
            break;
          case 35:
            m = k;
            break;
          case 48:
            if(x) {
              break a
            }else {
              x = k;
              break
            }
          ;
          case 32:
            G = k;
            break;
          default:
            break a
        }
        d++;
        j = H[d + 1 >> 0]
      }
      var L = 0;
      if(42 == j) {
        L = c("i32"), d++, j = H[d + 1 >> 0]
      }else {
        for(;48 <= j && 57 >= j;) {
          L = 10 * L + (j - 48), d++, j = H[d + 1 >> 0]
        }
      }
      var O = n, K = -1;
      if(46 == j) {
        K = 0;
        O = k;
        d++;
        j = H[d + 1 >> 0];
        if(42 == j) {
          K = c("i32"), d++
        }else {
          for(;;) {
            j = H[d + 1 >> 0];
            if(48 > j || 57 < j) {
              break
            }
            K = 10 * K + (j - 48);
            d++
          }
        }
        j = H[d + 1 >> 0]
      }
      0 > K && (K = 6, O = n);
      var B;
      switch(String.fromCharCode(j)) {
        case "h":
          j = H[d + 2 >> 0];
          104 == j ? (d++, B = 1) : B = 2;
          break;
        case "l":
          j = H[d + 2 >> 0];
          108 == j ? (d++, B = 8) : B = 4;
          break;
        case "L":
        ;
        case "q":
        ;
        case "j":
          B = 8;
          break;
        case "z":
        ;
        case "t":
        ;
        case "I":
          B = 4;
          break;
        default:
          B = l
      }
      B && d++;
      j = H[d + 1 >> 0];
      switch(String.fromCharCode(j)) {
        case "d":
        ;
        case "i":
        ;
        case "u":
        ;
        case "o":
        ;
        case "x":
        ;
        case "X":
        ;
        case "p":
          p = 100 == j || 105 == j;
          B = B || 4;
          var C = i = c("i" + 8 * B), s;
          8 == B && (i = A.Ee(i[0], i[1], 117 == j));
          4 >= B && (i = (p ? db : cb)(i & Math.pow(256, B) - 1, 8 * B));
          var ca = Math.abs(i), p = "";
          if(100 == j || 105 == j) {
            s = 8 == B && $b ? $b.stringify(C[0], C[1], l) : db(i, 8 * B).toString(10)
          }else {
            if(117 == j) {
              s = 8 == B && $b ? $b.stringify(C[0], C[1], k) : cb(i, 8 * B).toString(10), i = Math.abs(i)
            }else {
              if(111 == j) {
                s = (m ? "0" : "") + ca.toString(8)
              }else {
                if(120 == j || 88 == j) {
                  p = m && 0 != i ? "0x" : "";
                  if(8 == B && $b) {
                    if(C[1]) {
                      s = (C[1] >>> 0).toString(16);
                      for(m = (C[0] >>> 0).toString(16);8 > m.length;) {
                        m = "0" + m
                      }
                      s += m
                    }else {
                      s = (C[0] >>> 0).toString(16)
                    }
                  }else {
                    if(0 > i) {
                      i = -i;
                      s = (ca - 1).toString(16);
                      C = [];
                      for(m = 0;m < s.length;m++) {
                        C.push((15 - parseInt(s[m], 16)).toString(16))
                      }
                      for(s = C.join("");s.length < 2 * B;) {
                        s = "f" + s
                      }
                    }else {
                      s = ca.toString(16)
                    }
                  }
                  88 == j && (p = p.toUpperCase(), s = s.toUpperCase())
                }else {
                  112 == j && (0 === ca ? s = "(nil)" : (p = "0x", s = ca.toString(16)))
                }
              }
            }
          }
          if(O) {
            for(;s.length < K;) {
              s = "0" + s
            }
          }
          0 <= i && (t ? p = "+" + p : G && (p = " " + p));
          "-" == s.charAt(0) && (p = "-" + p, s = s.substr(1));
          for(;p.length + s.length < L;) {
            y ? s += " " : x ? s = "0" + s : p = " " + p
          }
          s = p + s;
          s.split("").forEach(function(a) {
            g.push(a.charCodeAt(0))
          });
          break;
        case "f":
        ;
        case "F":
        ;
        case "e":
        ;
        case "E":
        ;
        case "g":
        ;
        case "G":
          i = c("double");
          if(isNaN(i)) {
            s = "nan", x = n
          }else {
            if(isFinite(i)) {
              O = n;
              B = Math.min(K, 20);
              if(103 == j || 71 == j) {
                O = k, K = K || 1, B = parseInt(i.toExponential(B).split("e")[1], 10), K > B && -4 <= B ? (j = (103 == j ? "f" : "F").charCodeAt(0), K -= B + 1) : (j = (103 == j ? "e" : "E").charCodeAt(0), K--), B = Math.min(K, 20)
              }
              if(101 == j || 69 == j) {
                s = i.toExponential(B), /[eE][-+]\d$/.test(s) && (s = s.slice(0, -1) + "0" + s.slice(-1))
              }else {
                if(102 == j || 70 == j) {
                  s = i.toFixed(B), 0 === i && Yb(i) && (s = "-" + s)
                }
              }
              p = s.split("e");
              if(O && !m) {
                for(;1 < p[0].length && -1 != p[0].indexOf(".") && ("0" == p[0].slice(-1) || "." == p[0].slice(-1));) {
                  p[0] = p[0].slice(0, -1)
                }
              }else {
                for(m && -1 == s.indexOf(".") && (p[0] += ".");K > B++;) {
                  p[0] += "0"
                }
              }
              s = p[0] + (1 < p.length ? "e" + p[1] : "");
              69 == j && (s = s.toUpperCase());
              0 <= i && (t ? s = "+" + s : G && (s = " " + s))
            }else {
              s = (0 > i ? "-" : "") + "inf", x = n
            }
          }
          for(;s.length < L;) {
            s = y ? s + " " : x && ("-" == s[0] || "+" == s[0]) ? s[0] + "0" + s.slice(1) : (x ? "0" : " ") + s
          }
          97 > j && (s = s.toUpperCase());
          s.split("").forEach(function(a) {
            g.push(a.charCodeAt(0))
          });
          break;
        case "s":
          x = (t = c("i8*")) ? Xb(t) : 6;
          O && (x = Math.min(x, K));
          if(!y) {
            for(;x < L--;) {
              g.push(32)
            }
          }
          if(t) {
            for(m = 0;m < x;m++) {
              g.push(M[t++ >> 0])
            }
          }else {
            g = g.concat(ab("(null)".substr(0, x), k))
          }
          if(y) {
            for(;x < L--;) {
              g.push(32)
            }
          }
          break;
        case "c":
          for(y && g.push(c("i8"));0 < --L;) {
            g.push(32)
          }
          y || g.push(c("i8"));
          break;
        case "n":
          y = c("i32*");
          I[y >> 2] = g.length;
          break;
        case "%":
          g.push(i);
          break;
        default:
          for(m = p;m < d + 2;m++) {
            g.push(H[m >> 0])
          }
      }
      d += 2
    }else {
      g.push(i), d += 1
    }
  }
  return g
}
u._i64Add = ac;
var bc = ya;
function cc(a, b) {
  dc = a;
  ec = b;
  if(!fc) {
    return 1
  }
  0 == a ? (gc = function() {
    setTimeout(hc, b)
  }, ic = "timeout") : 1 == a && (gc = function() {
    jc(hc)
  }, ic = "rAF");
  return 0
}
function kc(a, b, c, d) {
  u.noExitRuntime = k;
  w(!fc, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
  fc = a;
  lc = d;
  var f = mc;
  hc = function() {
    if(!oa) {
      if(0 < nc.length) {
        var b = Date.now(), c = nc.shift();
        c.Ba(c.rb);
        if(oc) {
          var j = oc, p = 0 == j % 1 ? j - 1 : Math.floor(j);
          oc = c.mh ? p : (8 * j + (p + 0.5)) / 9
        }
        console.log('main loop blocker "' + c.name + '" took ' + (Date.now() - b) + " ms");
        u.setStatus && (b = u.statusMessage || "Please wait...", c = oc, j = pc.rh, c ? c < j ? u.setStatus(b + " (" + (j - c) + "/" + j + ")") : u.setStatus(b) : u.setStatus(""));
        setTimeout(hc, 0)
      }else {
        if(!(f < mc)) {
          if(qc = qc + 1 | 0, 1 == dc && 1 < ec && 0 != qc % ec) {
            gc()
          }else {
            "timeout" === ic && u.oh && (u.va("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"), ic = "");
            a: {
              if(!oa && !(u.preMainLoop && u.preMainLoop() === n)) {
                try {
                  "undefined" !== typeof d ? A.Ya("vi", a, [d]) : A.Ya("v", a)
                }catch(t) {
                  if(t instanceof ja) {
                    break a
                  }
                  t && ("object" === typeof t && t.stack) && u.va("exception thrown: " + [t, t.stack]);
                  e(t)
                }
                u.postMainLoop && u.postMainLoop()
              }
            }
            f < mc || ("object" === typeof SDL && (SDL.Jc && SDL.Jc.Qe) && SDL.Jc.Qe(), gc())
          }
        }
      }
    }
  };
  b && 0 < b ? cc(0, 1E3 / b) : cc(1, 1);
  gc();
  c && e("SimulateInfiniteLoop")
}
var gc = l, ic = "", mc = 0, fc = l, lc = 0, dc = 0, ec = 0, qc = 0, nc = [], pc = {}, hc, oc, rc = n, Mb = n, sc = n, tc = h, uc = h, vc = 0;
function wc(a) {
  var b = Date.now();
  if(0 === vc) {
    vc = b + 1E3 / 60
  }else {
    for(;b + 2 >= vc;) {
      vc += 1E3 / 60
    }
  }
  b = Math.max(vc - b, 0);
  setTimeout(a, b)
}
function jc(a) {
  "undefined" === typeof window ? wc(a) : (window.requestAnimationFrame || (window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || wc), window.requestAnimationFrame(a))
}
function Rb(a) {
  return{jpg:"image/jpeg", jpeg:"image/jpeg", png:"image/png", bmp:"image/bmp", ogg:"audio/ogg", wav:"audio/wav", mp3:"audio/mpeg"}[a.substr(a.lastIndexOf(".") + 1)]
}
function Sb(a, b, c) {
  function d() {
    c ? c() : e('Loading data file "' + a + '" failed.')
  }
  var f = new XMLHttpRequest;
  f.open("GET", a, k);
  f.responseType = "arraybuffer";
  f.onload = function() {
    if(200 == f.status || 0 == f.status && f.response) {
      var c = f.response;
      w(c, 'Loading data file "' + a + '" failed (no arrayBuffer).');
      b(new Uint8Array(c));
      nb()
    }else {
      d()
    }
  };
  f.onerror = d;
  f.send(l);
  mb()
}
var xc = [];
function yc() {
  var a = u.canvas;
  xc.forEach(function(b) {
    b(a.width, a.height)
  })
}
function zc(a, b, c) {
  b && c ? (a.ef = b, a.ye = c) : (b = a.ef, c = a.ye);
  var d = b, f = c;
  u.forcedAspectRatio && 0 < u.forcedAspectRatio && (d / f < u.forcedAspectRatio ? d = Math.round(f * u.forcedAspectRatio) : f = Math.round(d / u.forcedAspectRatio));
  if((document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.fullScreenElement || document.fullscreenElement || document.msFullScreenElement || document.msFullscreenElement || document.webkitCurrentFullScreenElement) === a.parentNode && "undefined" != typeof screen) {
    var g = Math.min(screen.width / d, screen.height / f), d = Math.round(d * g), f = Math.round(f * g)
  }
  uc ? (a.width != d && (a.width = d), a.height != f && (a.height = f), "undefined" != typeof a.style && (a.style.removeProperty("width"), a.style.removeProperty("height"))) : (a.width != b && (a.width = b), a.height != c && (a.height = c), "undefined" != typeof a.style && (d != b || f != c ? (a.style.setProperty("width", d + "px", "important"), a.style.setProperty("height", f + "px", "important")) : (a.style.removeProperty("width"), a.style.removeProperty("height"))))
}
var Nb, Ob, Pb, Qb;
u._bitshift64Lshr = Ac;
u._memcpy = Bc;
function Cc(a) {
  Cc.Vd || (F = F + 4095 & -4096, Cc.Vd = k, w(A.yb), Cc.Rd = A.yb, A.yb = function() {
    D("cannot dynamically allocate, sbrk now has control")
  });
  var b = F;
  0 != a && Cc.Rd(a);
  return b
}
pb = A.vd(4);
I[pb >> 2] = 0;
E.bf();
Ua.unshift({Ba:function() {
  !u.noFSInit && !E.Za.Db && E.Za()
}});
Va.push({Ba:function() {
  E.jd = n
}});
Wa.push({Ba:function() {
  E.Re()
}});
u.FS_createFolder = E.be;
u.FS_createPath = E.ee;
u.FS_createDataFile = E.$b;
u.FS_createPreloadedFile = E.fe;
u.FS_createLazyFile = E.ce;
u.FS_createLink = E.de;
u.FS_createDevice = E.ia;
Ua.unshift({Ba:q()});
Wa.push({Ba:q()});
var Gb = new A.Wa;
v && (require("fs"), process.platform.match(/^win/));
Ua.push({Ba:function() {
  V.root = E.L(V, {}, l)
}});
u.requestFullScreen = function(a, b) {
  function c() {
    rc = n;
    var a = d.parentNode;
    (document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.fullScreenElement || document.fullscreenElement || document.msFullScreenElement || document.msFullscreenElement || document.webkitCurrentFullScreenElement) === a ? (d.Lc = document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen || document.exitFullscreen || q(), d.Lc = d.Lc.bind(document), 
    tc && d.sc(), rc = k, uc && ("undefined" != typeof SDL && (a = Ma[SDL.screen + 0 * A.za >> 2], I[SDL.screen + 0 * A.za >> 2] = a | 8388608), yc())) : (a.parentNode.insertBefore(d, a), a.parentNode.removeChild(a), uc && ("undefined" != typeof SDL && (a = Ma[SDL.screen + 0 * A.za >> 2], I[SDL.screen + 0 * A.za >> 2] = a & -8388609), yc()));
    if(u.onFullScreen) {
      u.onFullScreen(rc)
    }
    zc(d)
  }
  tc = a;
  uc = b;
  "undefined" === typeof tc && (tc = k);
  "undefined" === typeof uc && (uc = n);
  var d = u.canvas;
  sc || (sc = k, document.addEventListener("fullscreenchange", c, n), document.addEventListener("mozfullscreenchange", c, n), document.addEventListener("webkitfullscreenchange", c, n), document.addEventListener("MSFullscreenChange", c, n));
  var f = document.createElement("div");
  d.parentNode.insertBefore(f, d);
  f.appendChild(d);
  f.Ve = f.requestFullScreen || f.mozRequestFullScreen || f.msRequestFullscreen || (f.webkitRequestFullScreen ? function() {
    f.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
  } : l);
  f.Ve()
};
u.requestAnimationFrame = function(a) {
  jc(a)
};
u.setCanvasSize = function(a, b, c) {
  zc(u.canvas, a, b);
  c || yc()
};
u.pauseMainLoop = function() {
  gc = l;
  mc++
};
u.resumeMainLoop = function() {
  mc++;
  var a = dc, b = ec, c = fc;
  fc = l;
  kc(c, 0, n, lc);
  cc(a, b)
};
u.getUserMedia = function() {
  window.dd || (window.dd = navigator.getUserMedia || navigator.mozGetUserMedia);
  window.dd(h)
};
Oa = z = A.Vb(ma);
Pa = Oa + Ra;
Qa = F = A.Vb(Pa);
w(Qa < na, "TOTAL_MEMORY not big enough for stack");
var Dc = J([8, 7, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "i8", 3), Ec = J([8, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 
2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 7, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 
0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0], "i8", 3);
u.Sd = {Math:Math, Int8Array:Int8Array, Int16Array:Int16Array, Int32Array:Int32Array, Uint8Array:Uint8Array, Uint16Array:Uint16Array, Uint32Array:Uint32Array, Float32Array:Float32Array, Float64Array:Float64Array};
u.Td = {abort:D, assert:w, min:za, invoke_iiii:function(a, b, c, d) {
  try {
    return u.dynCall_iiii(a, b, c, d)
  }catch(f) {
    "number" !== typeof f && "longjmp" !== f && e(f), W.setThrew(1, 0)
  }
}, _fabs:bc, _sin:fb, _exp:gb, _cosf:eb, _send:function(a, b, c) {
  return!V.se(a) ? (S(T.ga), -1) : Ub(a, b, c)
}, _sqrtf:ib, _cosl:eb, _remquof:function() {
  u.printErr("missing function: remquof");
  D(-1)
}, _emscripten_set_main_loop_timing:cc, _logf:hb, _fflush:q(), _pwrite:function(a, b, c, d) {
  a = E.Ja(a);
  if(!a) {
    return S(T.ga), -1
  }
  try {
    return E.write(a, H, b, c, d)
  }catch(f) {
    return E.fd(f), -1
  }
}, _strerror_r:sb, _fprintf:function(a, b, c) {
  c = Zb(b, c);
  b = A.Nb();
  a = Wb(J(c, "i8", 1), 1, c.length, a);
  A.Mb(b);
  return a
}, __reallyNegative:Yb, _sbrk:Cc, _nextafter:function() {
  u.printErr("missing function: nextafter");
  D(-1)
}, _remquo:function() {
  u.printErr("missing function: remquo");
  D(-1)
}, _emscripten_memcpy_big:function(a, b, c) {
  M.set(M.subarray(b, b + c), a);
  return a
}, _fileno:Vb, _sysconf:function(a) {
  switch(a) {
    case 30:
      return 4096;
    case 132:
    ;
    case 133:
    ;
    case 12:
    ;
    case 137:
    ;
    case 138:
    ;
    case 15:
    ;
    case 235:
    ;
    case 16:
    ;
    case 17:
    ;
    case 18:
    ;
    case 19:
    ;
    case 20:
    ;
    case 149:
    ;
    case 13:
    ;
    case 10:
    ;
    case 236:
    ;
    case 153:
    ;
    case 9:
    ;
    case 21:
    ;
    case 22:
    ;
    case 159:
    ;
    case 154:
    ;
    case 14:
    ;
    case 77:
    ;
    case 78:
    ;
    case 139:
    ;
    case 80:
    ;
    case 81:
    ;
    case 79:
    ;
    case 82:
    ;
    case 68:
    ;
    case 67:
    ;
    case 164:
    ;
    case 11:
    ;
    case 29:
    ;
    case 47:
    ;
    case 48:
    ;
    case 95:
    ;
    case 52:
    ;
    case 51:
    ;
    case 46:
      return 200809;
    case 27:
    ;
    case 246:
    ;
    case 127:
    ;
    case 128:
    ;
    case 23:
    ;
    case 24:
    ;
    case 160:
    ;
    case 161:
    ;
    case 181:
    ;
    case 182:
    ;
    case 242:
    ;
    case 183:
    ;
    case 184:
    ;
    case 243:
    ;
    case 244:
    ;
    case 245:
    ;
    case 165:
    ;
    case 178:
    ;
    case 179:
    ;
    case 49:
    ;
    case 50:
    ;
    case 168:
    ;
    case 169:
    ;
    case 175:
    ;
    case 170:
    ;
    case 171:
    ;
    case 172:
    ;
    case 97:
    ;
    case 76:
    ;
    case 32:
    ;
    case 173:
    ;
    case 35:
      return-1;
    case 176:
    ;
    case 177:
    ;
    case 7:
    ;
    case 155:
    ;
    case 8:
    ;
    case 157:
    ;
    case 125:
    ;
    case 126:
    ;
    case 92:
    ;
    case 93:
    ;
    case 129:
    ;
    case 130:
    ;
    case 131:
    ;
    case 94:
    ;
    case 91:
      return 1;
    case 74:
    ;
    case 60:
    ;
    case 69:
    ;
    case 70:
    ;
    case 4:
      return 1024;
    case 31:
    ;
    case 42:
    ;
    case 72:
      return 32;
    case 87:
    ;
    case 26:
    ;
    case 33:
      return 2147483647;
    case 34:
    ;
    case 1:
      return 47839;
    case 38:
    ;
    case 36:
      return 99;
    case 43:
    ;
    case 37:
      return 2048;
    case 0:
      return 2097152;
    case 3:
      return 65536;
    case 28:
      return 32768;
    case 44:
      return 32767;
    case 75:
      return 16384;
    case 39:
      return 1E3;
    case 89:
      return 700;
    case 71:
      return 256;
    case 40:
      return 255;
    case 2:
      return 100;
    case 180:
      return 64;
    case 25:
      return 20;
    case 5:
      return 16;
    case 6:
      return 6;
    case 73:
      return 4;
    case 84:
      return"object" === typeof navigator ? navigator.hardwareConcurrency || 1 : 1
  }
  S(T.D);
  return-1
}, ___setErrNo:S, _sinf:fb, _cos:eb, _llvm_fma_f64:function() {
  u.printErr("missing function: llvm_fma_f64");
  D(-1)
}, _log:hb, ___unlock:q(), _write:Ub, _emscripten_set_main_loop:kc, ___errno_location:function() {
  return pb
}, _expf:gb, _fesetround:function() {
  u.printErr("missing function: fesetround");
  D(-1)
}, _sinl:fb, ___lock:q(), _abort:function() {
  u.abort()
}, _fwrite:Wb, _time:function(a) {
  var b = Date.now() / 1E3 | 0;
  a && (I[a >> 2] = b);
  return b
}, _mkport:Tb, _strerror:tb, __formatString:Zb, _sqrt:ib, _ilogb:function() {
  u.printErr("missing function: ilogb");
  D(-1)
}, STACKTOP:z, STACK_MAX:Pa, tempDoublePtr:R, ABORT:oa, cttz_i8:Ec, ctlz_i8:Dc, NaN:NaN, Infinity:Infinity, _stderr:Lb};
// EMSCRIPTEN_START_ASM

var W = (function(global,env,buffer) {

 "use asm";
 var a = new global.Int8Array(buffer);
 var b = new global.Int16Array(buffer);
 var c = new global.Int32Array(buffer);
 var d = new global.Uint8Array(buffer);
 var e = new global.Uint16Array(buffer);
 var f = new global.Uint32Array(buffer);
 var g = new global.Float32Array(buffer);
 var h = new global.Float64Array(buffer);
 var i = env.STACKTOP | 0;
 var j = env.STACK_MAX | 0;
 var k = env.tempDoublePtr | 0;
 var l = env.ABORT | 0;
 var m = env.cttz_i8 | 0;
 var n = env.ctlz_i8 | 0;
 var o = env._stderr | 0;
 var p = 0;
 var q = 0;
 var r = 0;
 var s = 0;
 var t = +env.NaN, u = +env.Infinity;
 var v = 0, w = 0, x = 0, y = 0, z = 0.0, A = 0, B = 0, C = 0, D = 0.0;
 var E = 0;
 var F = 0;
 var G = 0;
 var H = 0;
 var I = 0;
 var J = 0;
 var K = 0;
 var L = 0;
 var M = 0;
 var N = 0;
 var O = global.Math.floor;
 var P = global.Math.abs;
 var Q = global.Math.sqrt;
 var R = global.Math.pow;
 var S = global.Math.cos;
 var T = global.Math.sin;
 var U = global.Math.tan;
 var V = global.Math.acos;
 var W = global.Math.asin;
 var X = global.Math.atan;
 var Y = global.Math.atan2;
 var Z = global.Math.exp;
 var _ = global.Math.log;
 var $ = global.Math.ceil;
 var aa = global.Math.imul;
 var ba = env.abort;
 var ca = env.assert;
 var da = env.min;
 var ea = env.invoke_iiii;
 var fa = env._fabs;
 var ga = env._sin;
 var ha = env._exp;
 var ia = env._cosf;
 var ja = env._send;
 var ka = env._sqrtf;
 var la = env._cosl;
 var ma = env._remquof;
 var na = env._emscripten_set_main_loop_timing;
 var oa = env._logf;
 var pa = env._fflush;
 var qa = env._pwrite;
 var ra = env._strerror_r;
 var sa = env._fprintf;
 var ta = env.__reallyNegative;
 var ua = env._sbrk;
 var va = env._nextafter;
 var wa = env._remquo;
 var xa = env._emscripten_memcpy_big;
 var ya = env._fileno;
 var za = env._sysconf;
 var Aa = env.___setErrNo;
 var Ba = env._sinf;
 var Ca = env._cos;
 var Da = env._llvm_fma_f64;
 var Ea = env._log;
 var Fa = env.___unlock;
 var Ga = env._write;
 var Ha = env._emscripten_set_main_loop;
 var Ia = env.___errno_location;
 var Ja = env._expf;
 var Ka = env._fesetround;
 var La = env._sinl;
 var Ma = env.___lock;
 var Na = env._abort;
 var Oa = env._fwrite;
 var Pa = env._time;
 var Qa = env._mkport;
 var Ra = env._strerror;
 var Sa = env.__formatString;
 var Ta = env._sqrt;
 var Ua = env._ilogb;
 var Va = 0.0;
 
// EMSCRIPTEN_START_FUNCS
function Xa(e,f,g,j,l){e=e|0;f=f|0;g=g|0;j=j|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ja=0,Ka=0.0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0.0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,ob=0,pb=0,qb=0,rb=0.0,sb=0.0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0.0,zb=0,Ab=0,Bb=0,Cb=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0.0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0,lc=0,mc=0,nc=0.0,oc=0.0,pc=0.0,qc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0,Ac=0,Bc=0,Cc=0,Dc=0,Ec=0,Fc=0,Gc=0,Hc=0,Ic=0,Jc=0,Kc=0,Lc=0,Mc=0,Nc=0,Oc=0,Pc=0,Qc=0,Rc=0,Sc=0,Tc=0,Uc=0,Vc=0,Wc=0,Yc=0,Zc=0,_c=0,$c=0,ad=0,bd=0,cd=0,dd=0,ed=0,fd=0,gd=0,hd=0,id=0,jd=0,kd=0,ld=0,md=0,nd=0,od=0,pd=0,qd=0,rd=0,sd=0,td=0,ud=0,vd=0,wd=0,xd=0,yd=0,zd=0;m=i;i=i+864|0;n=m+16|0;o=m+8|0;p=m+836|0;q=p;r=m+824|0;s=m+568|0;t=m+528|0;u=m;v=m+520|0;w=(e|0)!=0;x=t+40|0;y=x;z=t+39|0;t=u+4|0;A=u;B=r+12|0;C=r+11|0;r=B;D=r-q|0;F=-2-q|0;G=r+2|0;H=n+288|0;I=p+9|0;J=I;K=p+8|0;L=0;M=0;N=f;f=0;O=0;P=0;a:while(1){do if((f|0)>-1)if((O|0)>(2147483647-f|0)){c[(Ia()|0)>>2]=75;Q=-1;break}else{Q=O+f|0;break}else Q=f;while(0);R=a[N>>0]|0;if(!(R<<24>>24)){S=352;break}else{T=R;U=N}while(1){if(T<<24>>24==37){V=U;W=U;S=9;break}else if(!(T<<24>>24)){X=U;Y=U;break}R=U+1|0;T=a[R>>0]|0;U=R}b:do if((S|0)==9)while(1){S=0;if((a[V+1>>0]|0)!=37){X=V;Y=W;break b}R=W+1|0;Z=V+2|0;if((a[Z>>0]|0)==37){V=Z;W=R;S=9}else{X=Z;Y=R;break}}while(0);R=Y-N|0;if(w)Db(N,R,e)|0;if((Y|0)!=(N|0)){N=X;f=Q;O=R;continue}Z=X+1|0;_=a[Z>>0]|0;$=(_<<24>>24)+-48|0;if($>>>0<10?(a[X+2>>0]|0)==36:0){ba=X+3|0;ca=a[ba>>0]|0;da=$;ea=1;fa=ba}else{ca=_;da=-1;ea=P;fa=Z}Z=ca<<24>>24;c:do if((Z&-32|0)==32){_=ca;ba=Z;$=0;ga=fa;while(1){ha=1<<ba+-32;if(!(ha&75913)){ia=_;ja=$;ka=ga;break c}la=ha|$;ha=ga+1|0;ma=a[ha>>0]|0;ba=ma<<24>>24;if((ba&-32|0)!=32){ia=ma;ja=la;ka=ha;break}else{_=ma;$=la;ga=ha}}}else{ia=ca;ja=0;ka=fa}while(0);do if(ia<<24>>24==42){Z=ka+1|0;ga=(a[Z>>0]|0)+-48|0;if(ga>>>0<10?(a[ka+2>>0]|0)==36:0){c[l+(ga<<2)>>2]=10;na=1;oa=ka+3|0;pa=c[j+((a[Z>>0]|0)+-48<<3)>>2]|0}else{if(ea){qa=-1;S=370;break a}if(!w){ra=Z;sa=ja;ta=0;ua=0;break}ga=c[g>>2]|0;$=c[ga>>2]|0;c[g>>2]=ga+4;na=0;oa=Z;pa=$}if((pa|0)<0){ra=oa;sa=ja|8192;ta=na;ua=0-pa|0}else{ra=oa;sa=ja;ta=na;ua=pa}}else{$=ia<<24>>24;if(($+-48|0)>>>0<10){Z=$;$=ka;ga=0;do{ga=Z+-48+(ga*10|0)|0;$=$+1|0;Z=a[$>>0]|0}while((Z+-48|0)>>>0<10);if((ga|0)<0){qa=-1;S=370;break a}else{ra=$;sa=ja;ta=ea;ua=ga}}else{ra=ka;sa=ja;ta=ea;ua=0}}while(0);d:do if((a[ra>>0]|0)==46){Z=ra+1|0;_=a[Z>>0]|0;if(_<<24>>24!=42){ba=_<<24>>24;if((ba+-48|0)>>>0<10){va=ba;wa=Z;xa=0}else{ya=Z;za=0;break}while(1){Z=va+-48+(xa*10|0)|0;ba=wa+1|0;va=a[ba>>0]|0;if((va+-48|0)>>>0>=10){ya=ba;za=Z;break d}else{wa=ba;xa=Z}}}ga=ra+2|0;$=(a[ga>>0]|0)+-48|0;if($>>>0<10?(a[ra+3>>0]|0)==36:0){c[l+($<<2)>>2]=10;ya=ra+4|0;za=c[j+((a[ga>>0]|0)+-48<<3)>>2]|0;break}if(ta){qa=-1;S=370;break a}if(w){$=c[g>>2]|0;Z=c[$>>2]|0;c[g>>2]=$+4;ya=ga;za=Z}else{ya=ga;za=0}}else{ya=ra;za=-1}while(0);ga=ya;Z=0;while(1){Aa=a[ga>>0]|0;$=(Aa<<24>>24)+-65|0;if($>>>0>57){qa=-1;S=370;break a}Ba=ga+1|0;Ca=a[5432+(Z*58|0)+$>>0]|0;Da=Ca&255;if((Da+-1|0)>>>0<8){ga=Ba;Z=Da}else break}if(!(Ca<<24>>24)){qa=-1;S=370;break}$=(da|0)>-1;e:do if(Ca<<24>>24==19)if($){qa=-1;S=370;break a}else{Ea=L;Fa=M;S=63}else{if($){c[l+(da<<2)>>2]=Da;ba=j+(da<<3)|0;Ea=c[ba>>2]|0;Fa=c[ba+4>>2]|0;S=63;break}if(!w){qa=0;S=370;break a}if((Ca&255)>20){Ga=Aa;Ha=L;Ja=M}else do switch(Da|0){case 17:{ba=c[g>>2]|0;c[k>>2]=c[ba>>2];c[k+4>>2]=c[ba+4>>2];Ka=+h[k>>3];c[g>>2]=ba+8;h[k>>3]=Ka;La=c[k+4>>2]|0;Ma=c[k>>2]|0;S=64;break e;break}case 10:{ba=c[g>>2]|0;_=c[ba>>2]|0;c[g>>2]=ba+4;La=((_|0)<0)<<31>>31;Ma=_;S=64;break e;break}case 14:{_=c[g>>2]|0;ba=c[_>>2]|0;c[g>>2]=_+4;La=0;Ma=ba&65535;S=64;break e;break}case 13:{ba=c[g>>2]|0;_=c[ba>>2]|0;c[g>>2]=ba+4;La=(((_&65535)<<16>>16|0)<0)<<31>>31;Ma=_<<16>>16;S=64;break e;break}case 15:{_=c[g>>2]|0;ba=c[_>>2]|0;c[g>>2]=_+4;La=(((ba&255)<<24>>24|0)<0)<<31>>31;Ma=ba<<24>>24;S=64;break e;break}case 16:{ba=c[g>>2]|0;_=c[ba>>2]|0;c[g>>2]=ba+4;La=0;Ma=_&255;S=64;break e;break}case 9:{_=c[g>>2]|0;ba=c[_>>2]|0;c[g>>2]=_+4;La=M;Ma=ba;S=64;break e;break}case 12:{ba=c[g>>2]|0;_=ba;ha=c[_>>2]|0;la=c[_+4>>2]|0;c[g>>2]=ba+8;La=la;Ma=ha;S=64;break e;break}case 11:{ha=c[g>>2]|0;la=c[ha>>2]|0;c[g>>2]=ha+4;La=0;Ma=la;S=64;break e;break}case 18:{la=c[g>>2]|0;c[k>>2]=c[la>>2];c[k+4>>2]=c[la+4>>2];Ka=+h[k>>3];c[g>>2]=la+8;h[k>>3]=Ka;Ea=c[k>>2]|0;Fa=c[k+4>>2]|0;S=63;break e;break}default:{La=M;Ma=L;S=64;break e}}while(0)}while(0);if((S|0)==63){S=0;if(w){La=Fa;Ma=Ea;S=64}else{L=Ea;M=Fa;N=Ba;f=Q;O=R;P=ta;continue}}if((S|0)==64){S=0;Ga=a[ga>>0]|0;Ha=Ma;Ja=La}$=Ga<<24>>24;la=(Z|0)!=0&($&15|0)==3?$&-33:$;$=sa&-65537;ha=(sa&8192|0)==0?sa:$;f:do switch(la|0){case 112:{Na=ha|8;Oa=za>>>0>8?za:8;Pa=120;S=75;break}case 99:{a[z>>0]=Ha;Qa=Ha;Sa=Ja;Ta=z;Ua=$;Va=1;Wa=0;Xa=5896;Ya=x;break}case 109:{Za=Ra(c[(Ia()|0)>>2]|0)|0;S=96;break}case 115:{Za=(Ha|0)==0?5912:Ha;S=96;break}case 88:case 120:{Na=ha;Oa=za;Pa=la;S=75;break}case 117:{_a=Ja;$a=Ha;ab=0;bb=5896;S=86;break}case 105:case 100:{if((Ja|0)<0){ba=Ld(0,0,Ha|0,Ja|0)|0;_a=E;$a=ba;ab=1;bb=5896;S=86;break f}if(!(ha&2048)){ba=ha&1;_a=Ja;$a=Ha;ab=ba;bb=(ba|0)==0?5896:5898;S=86}else{_a=Ja;$a=Ha;ab=1;bb=5897;S=86}break}case 65:case 71:case 70:case 69:case 97:case 103:case 102:case 101:{c[k>>2]=Ha;c[k+4>>2]=Ja;Ka=+h[k>>3];c[o>>2]=0;if((Ja|0)>=0)if(!(ha&2048)){ba=ha&1;cb=Ka;db=ba;eb=(ba|0)==0?5921:5926}else{cb=Ka;db=1;eb=5923}else{cb=-Ka;db=1;eb=5920}h[k>>3]=cb;ba=c[k+4>>2]&2146435072;if(!(ba>>>0<2146435072|(ba|0)==2146435072&0<0)){ba=(la&32|0)!=0;if(cb!=cb|0.0!=0.0){fb=0;gb=ba?5960:5968}else{fb=db;gb=ba?5944:5952}ba=fb+3|0;_=(ua|0)>(ba|0);if((ha&8192|0)==0&_){ma=ua-ba|0;Xc(s|0,32,(ma>>>0>256?256:ma)|0)|0;if(ma>>>0>255){hb=ma;do{Db(s,256,e)|0;hb=hb+-256|0}while(hb>>>0>255);ib=ma&255}else ib=ma;Db(s,ib,e)|0}Db(eb,fb,e)|0;Db(gb,3,e)|0;if((ha&73728|0)==8192&_){hb=ua-ba|0;Xc(s|0,32,(hb>>>0>256?256:hb)|0)|0;if(hb>>>0>255){jb=hb;do{Db(s,256,e)|0;jb=jb+-256|0}while(jb>>>0>255);kb=hb&255}else kb=hb;Db(s,kb,e)|0}L=Ha;M=Ja;N=Ba;f=Q;O=_?ua:ba;P=ta;continue a}Ka=+Ge(cb,o)*2.0;jb=Ka!=0.0;if(jb)c[o>>2]=(c[o>>2]|0)+-1;ma=la|32;if((ma|0)==97){lb=la&32;mb=(lb|0)==0?eb:eb+9|0;ob=db|2;pb=za>>>0>11?0:12-za|0;do if(pb){qb=pb;rb=8.0;do{qb=qb+-1|0;rb=rb*16.0}while((qb|0)!=0);if((a[mb>>0]|0)==45){sb=-(rb+(-Ka-rb));break}else{sb=Ka+rb-rb;break}}else sb=Ka;while(0);pb=c[o>>2]|0;ba=(pb|0)<0?0-pb|0:pb;if((ba|0)<0){pb=B;_=ba;hb=((ba|0)<0)<<31>>31;while(1){qb=Bd(_|0,hb|0,10,0)|0;pb=pb+-1|0;a[pb>>0]=qb|48;qb=_;_=re(_|0,hb|0,10,0)|0;if(!(hb>>>0>9|(hb|0)==9&qb>>>0>4294967295))break;else hb=E}tb=pb;ub=_}else{tb=B;ub=ba}if(!ub)vb=tb;else{hb=tb;qb=ub;while(1){wb=hb+-1|0;a[wb>>0]=(qb>>>0)%10|0|48;if(qb>>>0<10){vb=wb;break}else{hb=wb;qb=(qb>>>0)/10|0}}}if((vb|0)==(B|0)){a[C>>0]=48;xb=C}else xb=vb;a[xb+-1>>0]=(c[o>>2]>>31&2)+43;qb=xb+-2|0;a[qb>>0]=la+15;if((za|0)<1)if(!(ha&8)){yb=sb;hb=p;while(1){ba=~~yb;_=hb+1|0;a[hb>>0]=d[5976+ba>>0]|lb;yb=(yb-+(ba|0))*16.0;if((_-q|0)!=1|yb==0.0)zb=_;else{a[_>>0]=46;zb=hb+2|0}if(!(yb!=0.0)){Ab=zb;break}else hb=zb}}else{yb=sb;hb=p;while(1){_=~~yb;ba=hb+1|0;a[hb>>0]=d[5976+_>>0]|lb;yb=(yb-+(_|0))*16.0;if((ba-q|0)==1){a[ba>>0]=46;Bb=hb+2|0}else Bb=ba;if(!(yb!=0.0)){Ab=Bb;break}else hb=Bb}}else{yb=sb;hb=p;while(1){ba=~~yb;_=hb+1|0;a[hb>>0]=d[5976+ba>>0]|lb;yb=(yb-+(ba|0))*16.0;if((_-q|0)==1){a[_>>0]=46;Cb=hb+2|0}else Cb=_;if(!(yb!=0.0)){Ab=Cb;break}else hb=Cb}}hb=Ab;lb=qb;if((za|0)!=0&(F+hb|0)<(za|0))Eb=G+za-lb|0;else Eb=D-lb+hb|0;lb=Eb+ob|0;_=ha&73728;ba=(ua|0)>(lb|0);if((_|0)==0&ba){pb=ua-lb|0;Xc(s|0,32,(pb>>>0>256?256:pb)|0)|0;if(pb>>>0>255){wb=pb;do{Db(s,256,e)|0;wb=wb+-256|0}while(wb>>>0>255);Fb=pb&255}else Fb=pb;Db(s,Fb,e)|0}Db(mb,ob,e)|0;if((_|0)==65536&ba){wb=ua-lb|0;Xc(s|0,48,(wb>>>0>256?256:wb)|0)|0;if(wb>>>0>255){Gb=wb;do{Db(s,256,e)|0;Gb=Gb+-256|0}while(Gb>>>0>255);Hb=wb&255}else Hb=wb;Db(s,Hb,e)|0}Gb=hb-q|0;Db(p,Gb,e)|0;ob=r-qb|0;mb=Eb-ob-Gb|0;if((mb|0)>0){Xc(s|0,48,(mb>>>0>256?256:mb)|0)|0;if(mb>>>0>255){Gb=mb;do{Db(s,256,e)|0;Gb=Gb+-256|0}while(Gb>>>0>255);Ib=mb&255}else Ib=mb;Db(s,Ib,e)|0}Db(qb,ob,e)|0;if((_|0)==8192&ba){Gb=ua-lb|0;Xc(s|0,32,(Gb>>>0>256?256:Gb)|0)|0;if(Gb>>>0>255){hb=Gb;do{Db(s,256,e)|0;hb=hb+-256|0}while(hb>>>0>255);Jb=Gb&255}else Jb=Gb;Db(s,Jb,e)|0}L=Ha;M=Ja;N=Ba;f=Q;O=ba?ua:lb;P=ta;continue a}hb=(za|0)<0?6:za;if(jb){_=(c[o>>2]|0)+-28|0;c[o>>2]=_;Kb=Ka*268435456.0;Lb=_}else{Kb=Ka;Lb=c[o>>2]|0}_=(Lb|0)<0?n:H;ob=_;yb=Kb;qb=_;do{mb=~~yb>>>0;c[qb>>2]=mb;qb=qb+4|0;yb=(yb-+(mb>>>0))*1.0e9}while(yb!=0.0);jb=c[o>>2]|0;if((jb|0)>0){lb=jb;ba=_;Gb=qb;while(1){mb=(lb|0)>29?29:lb;wb=Gb+-4|0;do if(wb>>>0<ba>>>0)Mb=ba;else{pb=0;Nb=wb;do{Ob=Td(c[Nb>>2]|0,0,mb|0)|0;Pb=_d(Ob|0,E|0,pb|0,0)|0;Ob=E;Qb=Bd(Pb|0,Ob|0,1e9,0)|0;c[Nb>>2]=Qb;pb=re(Pb|0,Ob|0,1e9,0)|0;Nb=Nb+-4|0}while(Nb>>>0>=ba>>>0);if(!pb){Mb=ba;break}Nb=ba+-4|0;c[Nb>>2]=pb;Mb=Nb}while(0);wb=Gb;while(1){if(wb>>>0<=Mb>>>0)break;Nb=wb+-4|0;if(!(c[Nb>>2]|0))wb=Nb;else break}Nb=(c[o>>2]|0)-mb|0;c[o>>2]=Nb;if((Nb|0)>0){lb=Nb;ba=Mb;Gb=wb}else{Rb=Nb;Sb=Mb;Tb=wb;break}}}else{Rb=jb;Sb=_;Tb=qb}g:do if((Rb|0)<0){Gb=((hb+25|0)/9|0)+1|0;if((ma|0)==102){ba=_+(Gb<<2)|0;lb=Rb;Nb=Sb;Ob=Tb;while(1){Pb=0-lb|0;Qb=(Pb|0)>9?9:Pb;do if(Nb>>>0<Ob>>>0){Pb=(1<<Qb)+-1|0;Ub=1e9>>>Qb;Vb=0;Wb=Nb;do{Xb=c[Wb>>2]|0;c[Wb>>2]=(Xb>>>Qb)+Vb;Vb=aa(Xb&Pb,Ub)|0;Wb=Wb+4|0}while(Wb>>>0<Ob>>>0);Wb=(c[Nb>>2]|0)==0?Nb+4|0:Nb;if(!Vb){Yb=Wb;Zb=Ob;break}c[Ob>>2]=Vb;Yb=Wb;Zb=Ob+4|0}else{Yb=(c[Nb>>2]|0)==0?Nb+4|0:Nb;Zb=Ob}while(0);pb=(Zb-ob>>2|0)>(Gb|0)?ba:Zb;lb=(c[o>>2]|0)+Qb|0;c[o>>2]=lb;if((lb|0)>=0){_b=Yb;$b=pb;break g}else{Nb=Yb;Ob=pb}}}else{ac=Rb;bc=Sb;cc=Tb}while(1){Ob=0-ac|0;Nb=(Ob|0)>9?9:Ob;do if(bc>>>0<cc>>>0){Ob=(1<<Nb)+-1|0;lb=1e9>>>Nb;ba=0;wb=bc;do{mb=c[wb>>2]|0;c[wb>>2]=(mb>>>Nb)+ba;ba=aa(mb&Ob,lb)|0;wb=wb+4|0}while(wb>>>0<cc>>>0);wb=(c[bc>>2]|0)==0?bc+4|0:bc;if(!ba){dc=wb;ec=cc;break}c[cc>>2]=ba;dc=wb;ec=cc+4|0}else{dc=(c[bc>>2]|0)==0?bc+4|0:bc;ec=cc}while(0);if((ec-dc>>2|0)>(Gb|0))fc=dc+(Gb<<2)|0;else fc=ec;ac=(c[o>>2]|0)+Nb|0;c[o>>2]=ac;if((ac|0)>=0){_b=dc;$b=fc;break}else{bc=dc;cc=fc}}}else{_b=Sb;$b=Tb}while(0);do if(_b>>>0<$b>>>0){qb=(ob-_b>>2)*9|0;jb=c[_b>>2]|0;if(jb>>>0<10){gc=qb;break}else{hc=qb;ic=10}while(1){ic=ic*10|0;qb=hc+1|0;if(jb>>>0<ic>>>0){gc=qb;break}else hc=qb}}else gc=0;while(0);jb=(ma|0)==103;qb=hb-((ma|0)!=102?gc:0)+((jb&(hb|0)!=0)<<31>>31)|0;if((qb|0)<((($b-ob>>2)*9|0)+-9|0)){Gb=qb+9216|0;qb=(Gb|0)/9|0;Qb=_+(qb+-1023<<2)|0;wb=((Gb|0)%9|0)+1|0;if((wb|0)<9){Gb=10;lb=wb;while(1){wb=Gb*10|0;lb=lb+1|0;if((lb|0)==9){jc=wb;break}else Gb=wb}}else jc=10;Gb=c[Qb>>2]|0;lb=(Gb>>>0)%(jc>>>0)|0;if((lb|0)==0?(_+(qb+-1022<<2)|0)==($b|0):0){kc=_b;lc=Qb;mc=gc}else S=232;do if((S|0)==232){S=0;rb=(((Gb>>>0)/(jc>>>0)|0)&1|0)==0?9007199254740992.0:9007199254740994.0;ma=(jc|0)/2|0;do if(lb>>>0<ma>>>0)nc=.5;else{if((lb|0)==(ma|0)?(_+(qb+-1022<<2)|0)==($b|0):0){nc=1.0;break}nc=1.5}while(0);do if(!db){oc=rb;pc=nc}else{if((a[eb>>0]|0)!=45){oc=rb;pc=nc;break}oc=rb*-1.0;pc=nc*-1.0}while(0);ma=Gb-lb|0;c[Qb>>2]=ma;if(!(oc+pc!=oc)){kc=_b;lc=Qb;mc=gc;break}wb=ma+jc|0;c[Qb>>2]=wb;if(wb>>>0>999999999){wb=_b;ma=Qb;while(1){Ob=ma+-4|0;c[ma>>2]=0;if(Ob>>>0<wb>>>0){Vb=wb+-4|0;c[Vb>>2]=0;qc=Vb}else qc=wb;Vb=(c[Ob>>2]|0)+1|0;c[Ob>>2]=Vb;if(Vb>>>0>999999999){wb=qc;ma=Ob}else{rc=qc;sc=Ob;break}}}else{rc=_b;sc=Qb}ma=(ob-rc>>2)*9|0;wb=c[rc>>2]|0;if(wb>>>0<10){kc=rc;lc=sc;mc=ma;break}else{tc=ma;uc=10}while(1){uc=uc*10|0;ma=tc+1|0;if(wb>>>0<uc>>>0){kc=rc;lc=sc;mc=ma;break}else tc=ma}}while(0);Qb=lc+4|0;vc=kc;wc=mc;xc=$b>>>0>Qb>>>0?Qb:$b}else{vc=_b;wc=gc;xc=$b}Qb=0-wc|0;lb=xc;while(1){if(lb>>>0<=vc>>>0){yc=0;break}Gb=lb+-4|0;if(!(c[Gb>>2]|0))lb=Gb;else{yc=1;break}}do if(jb){Gb=((hb|0)==0&1)+hb|0;if((Gb|0)>(wc|0)&(wc|0)>-5){zc=la+-1|0;Ac=Gb+-1-wc|0}else{zc=la+-2|0;Ac=Gb+-1|0}if(ha&8){Bc=zc;Cc=Ac;break}do if(yc){Gb=c[lb+-4>>2]|0;if(!Gb){Dc=9;break}if(!((Gb>>>0)%10|0)){Ec=10;Fc=0}else{Dc=0;break}while(1){Ec=Ec*10|0;qb=Fc+1|0;if((Gb>>>0)%(Ec>>>0)|0){Dc=qb;break}else Fc=qb}}else Dc=9;while(0);Gb=((lb-ob>>2)*9|0)+-9|0;if((zc|32|0)==102){Nb=Gb-Dc|0;qb=(Nb|0)<0?0:Nb;Bc=zc;Cc=(Ac|0)<(qb|0)?Ac:qb;break}else{qb=Gb+wc-Dc|0;Gb=(qb|0)<0?0:qb;Bc=zc;Cc=(Ac|0)<(Gb|0)?Ac:Gb;break}}else{Bc=la;Cc=hb}while(0);hb=(Cc|0)!=0;if(hb)Gc=1;else Gc=(ha&8|0)!=0;ob=Gc&1;jb=(Bc|32|0)==102;if(jb){Hc=(wc|0)>0?wc:0;Ic=0}else{Gb=(wc|0)<0?Qb:wc;if((Gb|0)<0){qb=B;Nb=Gb;wb=((Gb|0)<0)<<31>>31;while(1){ma=Bd(Nb|0,wb|0,10,0)|0;qb=qb+-1|0;a[qb>>0]=ma|48;ma=Nb;Nb=re(Nb|0,wb|0,10,0)|0;if(!(wb>>>0>9|(wb|0)==9&ma>>>0>4294967295))break;else wb=E}Jc=qb;Kc=Nb}else{Jc=B;Kc=Gb}if(!Kc)Lc=Jc;else{wb=Jc;Qb=Kc;while(1){ma=wb+-1|0;a[ma>>0]=(Qb>>>0)%10|0|48;if(Qb>>>0<10){Lc=ma;break}else{wb=ma;Qb=(Qb>>>0)/10|0}}}if((r-Lc|0)<2){Qb=Lc;while(1){wb=Qb+-1|0;a[wb>>0]=48;if((r-wb|0)<2)Qb=wb;else{Mc=wb;break}}}else Mc=Lc;a[Mc+-1>>0]=(wc>>31&2)+43;Qb=Mc+-2|0;a[Qb>>0]=Bc;Hc=r-Qb|0;Ic=Qb}Qb=db+1+Cc+ob+Hc|0;wb=ha&73728;Gb=(ua|0)>(Qb|0);if((wb|0)==0&Gb){Nb=ua-Qb|0;Xc(s|0,32,(Nb>>>0>256?256:Nb)|0)|0;if(Nb>>>0>255){qb=Nb;do{Db(s,256,e)|0;qb=qb+-256|0}while(qb>>>0>255);Nc=Nb&255}else Nc=Nb;Db(s,Nc,e)|0}Db(eb,db,e)|0;if((wb|0)==65536&Gb){qb=ua-Qb|0;Xc(s|0,48,(qb>>>0>256?256:qb)|0)|0;if(qb>>>0>255){ob=qb;do{Db(s,256,e)|0;ob=ob+-256|0}while(ob>>>0>255);Oc=qb&255}else Oc=qb;Db(s,Oc,e)|0}do if(jb){ob=vc>>>0>_>>>0?_:vc;Nb=ob;do{ma=c[Nb>>2]|0;if(!ma)Pc=I;else{Ob=I;Vb=ma;while(1){ma=Ob+-1|0;a[ma>>0]=(Vb>>>0)%10|0|48;if(Vb>>>0<10){Pc=ma;break}else{Ob=ma;Vb=(Vb>>>0)/10|0}}}do if((Nb|0)==(ob|0)){if((Pc|0)!=(I|0)){Qc=Pc;break}a[K>>0]=48;Qc=K}else{if(Pc>>>0>p>>>0)Rc=Pc;else{Qc=Pc;break}while(1){Vb=Rc+-1|0;a[Vb>>0]=48;if(Vb>>>0>p>>>0)Rc=Vb;else{Qc=Vb;break}}}while(0);Db(Qc,J-Qc|0,e)|0;Nb=Nb+4|0}while(Nb>>>0<=_>>>0);if(!((ha&8|0)==0&(hb^1)))Db(5992,1,e)|0;if(Nb>>>0<lb>>>0&(Cc|0)>0){ob=Cc;ba=Nb;while(1){Vb=c[ba>>2]|0;if(Vb){Ob=I;ma=Vb;while(1){Ob=Ob+-1|0;a[Ob>>0]=(ma>>>0)%10|0|48;if(ma>>>0<10)break;else ma=(ma>>>0)/10|0}if(Ob>>>0>p>>>0){Sc=Ob;S=301}else Tc=Ob}else{Sc=I;S=301}if((S|0)==301)while(1){S=0;ma=Sc+-1|0;a[ma>>0]=48;if(ma>>>0>p>>>0){Sc=ma;S=301}else{Tc=ma;break}}Db(Tc,(ob|0)>9?9:ob,e)|0;ba=ba+4|0;Ob=ob+-9|0;if(!(ba>>>0<lb>>>0&(Ob|0)>0)){Uc=Ob;break}else ob=Ob}}else Uc=Cc;if((Uc|0)<=0)break;Xc(s|0,48,(Uc>>>0>256?256:Uc)|0)|0;if(Uc>>>0>255){ob=Uc;do{Db(s,256,e)|0;ob=ob+-256|0}while(ob>>>0>255);Vc=Uc&255}else Vc=Uc;Db(s,Vc,e)|0}else{ob=yc?lb:vc+4|0;do if((Cc|0)>-1){ba=(ha&8|0)==0;Nb=Cc;Ob=vc;do{ma=c[Ob>>2]|0;if(ma){Vb=I;mb=ma;while(1){Vb=Vb+-1|0;a[Vb>>0]=(mb>>>0)%10|0|48;if(mb>>>0<10)break;else mb=(mb>>>0)/10|0}if((Vb|0)!=(I|0))Wc=Vb;else S=313}else S=313;if((S|0)==313){S=0;a[K>>0]=48;Wc=K}do if((Ob|0)==(vc|0)){mb=Wc+1|0;Db(Wc,1,e)|0;if((Nb|0)<1&ba){Yc=mb;break}Db(5992,1,e)|0;Yc=mb}else{if(Wc>>>0>p>>>0)Zc=Wc;else{Yc=Wc;break}while(1){mb=Zc+-1|0;a[mb>>0]=48;if(mb>>>0>p>>>0)Zc=mb;else{Yc=mb;break}}}while(0);Vb=J-Yc|0;Db(Yc,(Nb|0)>(Vb|0)?Vb:Nb,e)|0;Nb=Nb-Vb|0;Ob=Ob+4|0}while(Ob>>>0<ob>>>0&(Nb|0)>-1);if((Nb|0)<=0)break;Xc(s|0,48,(Nb>>>0>256?256:Nb)|0)|0;if(Nb>>>0>255){Ob=Nb;do{Db(s,256,e)|0;Ob=Ob+-256|0}while(Ob>>>0>255);_c=Nb&255}else _c=Nb;Db(s,_c,e)|0}while(0);Db(Ic,r-Ic|0,e)|0}while(0);if((wb|0)==8192&Gb){lb=ua-Qb|0;Xc(s|0,32,(lb>>>0>256?256:lb)|0)|0;if(lb>>>0>255){hb=lb;do{Db(s,256,e)|0;hb=hb+-256|0}while(hb>>>0>255);$c=lb&255}else $c=lb;Db(s,$c,e)|0}L=Ha;M=Ja;N=Ba;f=Q;O=Gb?ua:Qb;P=ta;continue a;break}case 111:{hb=(Ha|0)==0&(Ja|0)==0;if(hb)ad=x;else{wb=x;_=Ha;jb=Ja;while(1){qb=wb+-1|0;a[qb>>0]=_&7|48;_=Vd(_|0,jb|0,3)|0;jb=E;if((_|0)==0&(jb|0)==0){ad=qb;break}else wb=qb}}wb=(ha&8|0)==0|hb;bd=Ha;cd=Ja;dd=ad;ed=ha;fd=za;gd=wb&1^1;hd=wb?5896:5901;S=91;break}case 110:{switch(Z|0){case 2:{wb=Ha;c[wb>>2]=Q;c[wb+4>>2]=((Q|0)<0)<<31>>31;L=Ha;M=Ja;N=Ba;f=Q;O=R;P=ta;continue a;break}case 3:{b[Ha>>1]=Q;L=Ha;M=Ja;N=Ba;f=Q;O=R;P=ta;continue a;break}case 4:{a[Ha>>0]=Q;L=Ha;M=Ja;N=Ba;f=Q;O=R;P=ta;continue a;break}case 6:{c[Ha>>2]=Q;L=Ha;M=Ja;N=Ba;f=Q;O=R;P=ta;continue a;break}case 7:{wb=Ha;c[wb>>2]=Q;c[wb+4>>2]=((Q|0)<0)<<31>>31;L=Ha;M=Ja;N=Ba;f=Q;O=R;P=ta;continue a;break}case 0:{c[Ha>>2]=Q;L=Ha;M=Ja;N=Ba;f=Q;O=R;P=ta;continue a;break}case 1:{c[Ha>>2]=Q;L=Ha;M=Ja;N=Ba;f=Q;O=R;P=ta;continue a;break}default:{L=Ha;M=Ja;N=Ba;f=Q;O=R;P=ta;continue a}}break}case 67:{c[u>>2]=Ha;c[t>>2]=0;id=u;jd=A;kd=-1;S=101;break}case 83:{wb=Ha;if(!za){ld=Ha;md=wb;nd=0;S=106}else{id=wb;jd=Ha;kd=za;S=101}break}default:{Qa=Ha;Sa=Ja;Ta=N;Ua=ha;Va=za;Wa=0;Xa=5896;Ya=x}}while(0);do if((S|0)==75){S=0;R=Pa&32;if(!((Ha|0)==0&(Ja|0)==0)){Z=x;la=Ha;ga=Ja;do{Z=Z+-1|0;a[Z>>0]=d[5976+(la&15)>>0]|R;la=Vd(la|0,ga|0,4)|0;ga=E}while(!((la|0)==0&(ga|0)==0));if(!(Na&8)){bd=Ha;cd=Ja;dd=Z;ed=Na;fd=Oa;gd=0;hd=5896;S=91}else{bd=Ha;cd=Ja;dd=Z;ed=Na;fd=Oa;gd=2;hd=5896+(Pa>>4)|0;S=91}}else{bd=Ha;cd=Ja;dd=x;ed=Na;fd=Oa;gd=0;hd=5896;S=91}}else if((S|0)==86){S=0;if(_a>>>0>0|(_a|0)==0&$a>>>0>4294967295){ga=x;la=$a;R=_a;while(1){hb=Bd(la|0,R|0,10,0)|0;ga=ga+-1|0;a[ga>>0]=hb|48;hb=la;la=re(la|0,R|0,10,0)|0;if(!(R>>>0>9|(R|0)==9&hb>>>0>4294967295))break;else R=E}od=ga;pd=la}else{od=x;pd=$a}if(!pd){bd=$a;cd=_a;dd=od;ed=ha;fd=za;gd=ab;hd=bb;S=91}else{R=od;Z=pd;while(1){hb=R+-1|0;a[hb>>0]=(Z>>>0)%10|0|48;if(Z>>>0<10){bd=$a;cd=_a;dd=hb;ed=ha;fd=za;gd=ab;hd=bb;S=91;break}else{R=hb;Z=(Z>>>0)/10|0}}}}else if((S|0)==96){S=0;Z=nb(Za,0,za)|0;if(!Z){Qa=Ha;Sa=Ja;Ta=Za;Ua=$;Va=za;Wa=0;Xa=5896;Ya=Za+za|0;break}else{Qa=Ha;Sa=Ja;Ta=Za;Ua=$;Va=Z-Za|0;Wa=0;Xa=5896;Ya=Z;break}}else if((S|0)==101){S=0;Z=0;R=0;la=id;while(1){ga=c[la>>2]|0;if(!ga){qd=Z;rd=R;break}hb=Zd(v,ga)|0;if((hb|0)<0|hb>>>0>(kd-Z|0)>>>0){qd=Z;rd=hb;break}ga=hb+Z|0;if(kd>>>0>ga>>>0){Z=ga;R=hb;la=la+4|0}else{qd=ga;rd=hb;break}}if((rd|0)<0){qa=-1;S=370;break a}else{ld=jd;md=id;nd=qd;S=106}}while(0);if((S|0)==91){S=0;$=(fd|0)>-1?ed&-65537:ed;la=(bd|0)!=0|(cd|0)!=0;if(la|(fd|0)!=0){R=(la&1^1)+(y-dd)|0;Qa=bd;Sa=cd;Ta=dd;Ua=$;Va=(fd|0)>(R|0)?fd:R;Wa=gd;Xa=hd;Ya=x}else{Qa=bd;Sa=cd;Ta=x;Ua=$;Va=0;Wa=gd;Xa=hd;Ya=x}}else if((S|0)==106){S=0;$=ha&73728;R=(ua|0)>(nd|0);if(($|0)==0&R){la=ua-nd|0;Xc(s|0,32,(la>>>0>256?256:la)|0)|0;if(la>>>0>255){Z=la;do{Db(s,256,e)|0;Z=Z+-256|0}while(Z>>>0>255);sd=la&255}else sd=la;Db(s,sd,e)|0}h:do if(nd){Z=0;ha=md;while(1){hb=c[ha>>2]|0;if(!hb)break h;ga=Zd(v,hb)|0;Z=ga+Z|0;if((Z|0)>(nd|0))break h;Db(v,ga,e)|0;if(Z>>>0>=nd>>>0)break;else ha=ha+4|0}}while(0);if(($|0)==8192&R){la=ua-nd|0;Xc(s|0,32,(la>>>0>256?256:la)|0)|0;if(la>>>0>255){ha=la;do{Db(s,256,e)|0;ha=ha+-256|0}while(ha>>>0>255);td=la&255}else td=la;Db(s,td,e)|0}L=ld;M=Ja;N=Ba;f=Q;O=R?ua:nd;P=ta;continue}ha=Ya-Ta|0;$=(Va|0)<(ha|0)?ha:Va;Z=Wa+$|0;ga=(ua|0)<(Z|0)?Z:ua;hb=Ua&73728;wb=(ga|0)>(Z|0);if((hb|0)==0&wb){jb=ga-Z|0;Xc(s|0,32,(jb>>>0>256?256:jb)|0)|0;if(jb>>>0>255){_=jb;do{Db(s,256,e)|0;_=_+-256|0}while(_>>>0>255);ud=jb&255}else ud=jb;Db(s,ud,e)|0}Db(Xa,Wa,e)|0;if((hb|0)==65536&wb){_=ga-Z|0;Xc(s|0,48,(_>>>0>256?256:_)|0)|0;if(_>>>0>255){R=_;do{Db(s,256,e)|0;R=R+-256|0}while(R>>>0>255);vd=_&255}else vd=_;Db(s,vd,e)|0}if(($|0)>(ha|0)){R=$-ha|0;Xc(s|0,48,(R>>>0>256?256:R)|0)|0;if(R>>>0>255){jb=R;do{Db(s,256,e)|0;jb=jb+-256|0}while(jb>>>0>255);wd=R&255}else wd=R;Db(s,wd,e)|0}Db(Ta,ha,e)|0;if(!((hb|0)==8192&wb)){L=Qa;M=Sa;N=Ba;f=Q;O=ga;P=ta;continue}jb=ga-Z|0;Xc(s|0,32,(jb>>>0>256?256:jb)|0)|0;if(jb>>>0>255){$=jb;do{Db(s,256,e)|0;$=$+-256|0}while($>>>0>255);xd=jb&255}else xd=jb;Db(s,xd,e)|0;L=Qa;M=Sa;N=Ba;f=Q;O=ga;P=ta}if((S|0)==352){if(e){qa=Q;i=m;return qa|0}if(!P){qa=0;i=m;return qa|0}else yd=1;while(1){P=c[l+(yd<<2)>>2]|0;if(!P){zd=yd;break}Q=j+(yd<<3)|0;i:do if(P>>>0<=20)do switch(P|0){case 9:{e=c[g>>2]|0;ta=c[e>>2]|0;c[g>>2]=e+4;c[Q>>2]=ta;break i;break}case 10:{ta=c[g>>2]|0;e=c[ta>>2]|0;c[g>>2]=ta+4;ta=Q;c[ta>>2]=e;c[ta+4>>2]=((e|0)<0)<<31>>31;break i;break}case 11:{e=c[g>>2]|0;ta=c[e>>2]|0;c[g>>2]=e+4;e=Q;c[e>>2]=ta;c[e+4>>2]=0;break i;break}case 12:{e=c[g>>2]|0;ta=e;O=c[ta>>2]|0;f=c[ta+4>>2]|0;c[g>>2]=e+8;e=Q;c[e>>2]=O;c[e+4>>2]=f;break i;break}case 13:{f=c[g>>2]|0;e=c[f>>2]|0;c[g>>2]=f+4;f=(e&65535)<<16>>16;e=Q;c[e>>2]=f;c[e+4>>2]=((f|0)<0)<<31>>31;break i;break}case 14:{f=c[g>>2]|0;e=c[f>>2]|0;c[g>>2]=f+4;f=Q;c[f>>2]=e&65535;c[f+4>>2]=0;break i;break}case 15:{f=c[g>>2]|0;e=c[f>>2]|0;c[g>>2]=f+4;f=(e&255)<<24>>24;e=Q;c[e>>2]=f;c[e+4>>2]=((f|0)<0)<<31>>31;break i;break}case 16:{f=c[g>>2]|0;e=c[f>>2]|0;c[g>>2]=f+4;f=Q;c[f>>2]=e&255;c[f+4>>2]=0;break i;break}case 17:{f=c[g>>2]|0;c[k>>2]=c[f>>2];c[k+4>>2]=c[f+4>>2];oc=+h[k>>3];c[g>>2]=f+8;h[Q>>3]=oc;break i;break}case 18:{f=c[g>>2]|0;c[k>>2]=c[f>>2];c[k+4>>2]=c[f+4>>2];oc=+h[k>>3];c[g>>2]=f+8;h[Q>>3]=oc;break i;break}default:break i}while(0);while(0);yd=yd+1|0;if((yd|0)>=10){qa=1;S=370;break}}if((S|0)==370){i=m;return qa|0}while(1){if(c[l+(zd<<2)>>2]|0){qa=-1;S=370;break}zd=zd+1|0;if((zd|0)>=10){qa=1;S=370;break}}if((S|0)==370){i=m;return qa|0}}else if((S|0)==370){i=m;return qa|0}return 0}function Ya(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,va=0,wa=0,xa=0,ya=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ja=0,Ka=0,La=0,Ma=0,Oa=0,Qa=0;b=i;do if(a>>>0<245){if(a>>>0<11)d=16;else d=a+11&-8;e=d>>>3;f=c[18]|0;g=f>>>e;if(g&3){h=(g&1^1)+e|0;j=h<<1;k=112+(j<<2)|0;l=112+(j+2<<2)|0;j=c[l>>2]|0;m=j+8|0;n=c[m>>2]|0;do if((k|0)!=(n|0)){if(n>>>0<(c[22]|0)>>>0)Na();o=n+12|0;if((c[o>>2]|0)==(j|0)){c[o>>2]=k;c[l>>2]=n;break}else Na()}else c[18]=f&~(1<<h);while(0);n=h<<3;c[j+4>>2]=n|3;l=j+(n|4)|0;c[l>>2]=c[l>>2]|1;p=m;i=b;return p|0}l=c[20]|0;if(d>>>0>l>>>0){if(g){n=2<<e;k=g<<e&(n|0-n);n=(k&0-k)+-1|0;k=n>>>12&16;o=n>>>k;n=o>>>5&8;q=o>>>n;o=q>>>2&4;r=q>>>o;q=r>>>1&2;s=r>>>q;r=s>>>1&1;t=(n|k|o|q|r)+(s>>>r)|0;r=t<<1;s=112+(r<<2)|0;q=112+(r+2<<2)|0;r=c[q>>2]|0;o=r+8|0;k=c[o>>2]|0;do if((s|0)!=(k|0)){if(k>>>0<(c[22]|0)>>>0)Na();n=k+12|0;if((c[n>>2]|0)==(r|0)){c[n>>2]=s;c[q>>2]=k;u=c[20]|0;break}else Na()}else{c[18]=f&~(1<<t);u=l}while(0);l=t<<3;f=l-d|0;c[r+4>>2]=d|3;k=r+d|0;c[r+(d|4)>>2]=f|1;c[r+l>>2]=f;if(u){l=c[23]|0;q=u>>>3;s=q<<1;e=112+(s<<2)|0;g=c[18]|0;m=1<<q;if(g&m){q=112+(s+2<<2)|0;j=c[q>>2]|0;if(j>>>0<(c[22]|0)>>>0)Na();else{v=q;w=j}}else{c[18]=g|m;v=112+(s+2<<2)|0;w=e}c[v>>2]=l;c[w+12>>2]=l;c[l+8>>2]=w;c[l+12>>2]=e}c[20]=f;c[23]=k;p=o;i=b;return p|0}k=c[19]|0;if(k){f=(k&0-k)+-1|0;k=f>>>12&16;e=f>>>k;f=e>>>5&8;l=e>>>f;e=l>>>2&4;s=l>>>e;l=s>>>1&2;m=s>>>l;s=m>>>1&1;g=c[376+((f|k|e|l|s)+(m>>>s)<<2)>>2]|0;s=(c[g+4>>2]&-8)-d|0;m=g;l=g;while(1){g=c[m+16>>2]|0;if(!g){e=c[m+20>>2]|0;if(!e)break;else x=e}else x=g;g=(c[x+4>>2]&-8)-d|0;e=g>>>0<s>>>0;s=e?g:s;m=x;l=e?x:l}m=c[22]|0;if(l>>>0<m>>>0)Na();o=l+d|0;if(l>>>0>=o>>>0)Na();r=c[l+24>>2]|0;t=c[l+12>>2]|0;do if((t|0)==(l|0)){e=l+20|0;g=c[e>>2]|0;if(!g){k=l+16|0;f=c[k>>2]|0;if(!f){y=0;break}else{z=f;A=k}}else{z=g;A=e}while(1){e=z+20|0;g=c[e>>2]|0;if(g){z=g;A=e;continue}e=z+16|0;g=c[e>>2]|0;if(!g)break;else{z=g;A=e}}if(A>>>0<m>>>0)Na();else{c[A>>2]=0;y=z;break}}else{e=c[l+8>>2]|0;if(e>>>0<m>>>0)Na();g=e+12|0;if((c[g>>2]|0)!=(l|0))Na();k=t+8|0;if((c[k>>2]|0)==(l|0)){c[g>>2]=t;c[k>>2]=e;y=t;break}else Na()}while(0);do if(r){t=c[l+28>>2]|0;m=376+(t<<2)|0;if((l|0)==(c[m>>2]|0)){c[m>>2]=y;if(!y){c[19]=c[19]&~(1<<t);break}}else{if(r>>>0<(c[22]|0)>>>0)Na();t=r+16|0;if((c[t>>2]|0)==(l|0))c[t>>2]=y;else c[r+20>>2]=y;if(!y)break}t=c[22]|0;if(y>>>0<t>>>0)Na();c[y+24>>2]=r;m=c[l+16>>2]|0;do if(m)if(m>>>0<t>>>0)Na();else{c[y+16>>2]=m;c[m+24>>2]=y;break}while(0);m=c[l+20>>2]|0;if(m)if(m>>>0<(c[22]|0)>>>0)Na();else{c[y+20>>2]=m;c[m+24>>2]=y;break}}while(0);if(s>>>0<16){r=s+d|0;c[l+4>>2]=r|3;m=l+(r+4)|0;c[m>>2]=c[m>>2]|1}else{c[l+4>>2]=d|3;c[l+(d|4)>>2]=s|1;c[l+(s+d)>>2]=s;m=c[20]|0;if(m){r=c[23]|0;t=m>>>3;m=t<<1;e=112+(m<<2)|0;k=c[18]|0;g=1<<t;if(k&g){t=112+(m+2<<2)|0;f=c[t>>2]|0;if(f>>>0<(c[22]|0)>>>0)Na();else{B=t;C=f}}else{c[18]=k|g;B=112+(m+2<<2)|0;C=e}c[B>>2]=r;c[C+12>>2]=r;c[r+8>>2]=C;c[r+12>>2]=e}c[20]=s;c[23]=o}p=l+8|0;i=b;return p|0}else D=d}else D=d}else if(a>>>0<=4294967231){e=a+11|0;r=e&-8;m=c[19]|0;if(m){g=0-r|0;k=e>>>8;if(k)if(r>>>0>16777215)E=31;else{e=(k+1048320|0)>>>16&8;f=k<<e;k=(f+520192|0)>>>16&4;t=f<<k;f=(t+245760|0)>>>16&2;j=14-(k|e|f)+(t<<f>>>15)|0;E=r>>>(j+7|0)&1|j<<1}else E=0;j=c[376+(E<<2)>>2]|0;a:do if(!j){F=g;G=0;H=0}else{if((E|0)==31)I=0;else I=25-(E>>>1)|0;f=g;t=0;e=r<<I;k=j;q=0;while(1){h=c[k+4>>2]&-8;n=h-r|0;if(n>>>0<f>>>0)if((h|0)==(r|0)){F=n;G=k;H=k;break a}else{J=n;K=k}else{J=f;K=q}n=c[k+20>>2]|0;k=c[k+(e>>>31<<2)+16>>2]|0;h=(n|0)==0|(n|0)==(k|0)?t:n;if(!k){F=J;G=h;H=K;break}else{f=J;t=h;e=e<<1;q=K}}}while(0);if((G|0)==0&(H|0)==0){j=2<<E;g=m&(j|0-j);if(!g){D=r;break}j=(g&0-g)+-1|0;g=j>>>12&16;l=j>>>g;j=l>>>5&8;o=l>>>j;l=o>>>2&4;s=o>>>l;o=s>>>1&2;q=s>>>o;s=q>>>1&1;L=c[376+((j|g|l|o|s)+(q>>>s)<<2)>>2]|0}else L=G;if(!L){M=F;N=H}else{s=F;q=L;o=H;while(1){l=(c[q+4>>2]&-8)-r|0;g=l>>>0<s>>>0;j=g?l:s;l=g?q:o;g=c[q+16>>2]|0;if(g){s=j;q=g;o=l;continue}q=c[q+20>>2]|0;if(!q){M=j;N=l;break}else{s=j;o=l}}}if((N|0)!=0?M>>>0<((c[20]|0)-r|0)>>>0:0){o=c[22]|0;if(N>>>0<o>>>0)Na();s=N+r|0;if(N>>>0>=s>>>0)Na();q=c[N+24>>2]|0;m=c[N+12>>2]|0;do if((m|0)==(N|0)){l=N+20|0;j=c[l>>2]|0;if(!j){g=N+16|0;e=c[g>>2]|0;if(!e){O=0;break}else{P=e;Q=g}}else{P=j;Q=l}while(1){l=P+20|0;j=c[l>>2]|0;if(j){P=j;Q=l;continue}l=P+16|0;j=c[l>>2]|0;if(!j)break;else{P=j;Q=l}}if(Q>>>0<o>>>0)Na();else{c[Q>>2]=0;O=P;break}}else{l=c[N+8>>2]|0;if(l>>>0<o>>>0)Na();j=l+12|0;if((c[j>>2]|0)!=(N|0))Na();g=m+8|0;if((c[g>>2]|0)==(N|0)){c[j>>2]=m;c[g>>2]=l;O=m;break}else Na()}while(0);do if(q){m=c[N+28>>2]|0;o=376+(m<<2)|0;if((N|0)==(c[o>>2]|0)){c[o>>2]=O;if(!O){c[19]=c[19]&~(1<<m);break}}else{if(q>>>0<(c[22]|0)>>>0)Na();m=q+16|0;if((c[m>>2]|0)==(N|0))c[m>>2]=O;else c[q+20>>2]=O;if(!O)break}m=c[22]|0;if(O>>>0<m>>>0)Na();c[O+24>>2]=q;o=c[N+16>>2]|0;do if(o)if(o>>>0<m>>>0)Na();else{c[O+16>>2]=o;c[o+24>>2]=O;break}while(0);o=c[N+20>>2]|0;if(o)if(o>>>0<(c[22]|0)>>>0)Na();else{c[O+20>>2]=o;c[o+24>>2]=O;break}}while(0);b:do if(M>>>0>=16){c[N+4>>2]=r|3;c[N+(r|4)>>2]=M|1;c[N+(M+r)>>2]=M;q=M>>>3;if(M>>>0<256){o=q<<1;m=112+(o<<2)|0;l=c[18]|0;g=1<<q;do if(!(l&g)){c[18]=l|g;R=112+(o+2<<2)|0;S=m}else{q=112+(o+2<<2)|0;j=c[q>>2]|0;if(j>>>0>=(c[22]|0)>>>0){R=q;S=j;break}Na()}while(0);c[R>>2]=s;c[S+12>>2]=s;c[N+(r+8)>>2]=S;c[N+(r+12)>>2]=m;break}o=M>>>8;if(o)if(M>>>0>16777215)T=31;else{g=(o+1048320|0)>>>16&8;l=o<<g;o=(l+520192|0)>>>16&4;j=l<<o;l=(j+245760|0)>>>16&2;q=14-(o|g|l)+(j<<l>>>15)|0;T=M>>>(q+7|0)&1|q<<1}else T=0;q=376+(T<<2)|0;c[N+(r+28)>>2]=T;c[N+(r+20)>>2]=0;c[N+(r+16)>>2]=0;l=c[19]|0;j=1<<T;if(!(l&j)){c[19]=l|j;c[q>>2]=s;c[N+(r+24)>>2]=q;c[N+(r+12)>>2]=s;c[N+(r+8)>>2]=s;break}j=c[q>>2]|0;if((T|0)==31)U=0;else U=25-(T>>>1)|0;c:do if((c[j+4>>2]&-8|0)!=(M|0)){q=M<<U;l=j;while(1){V=l+(q>>>31<<2)+16|0;g=c[V>>2]|0;if(!g)break;if((c[g+4>>2]&-8|0)==(M|0)){W=g;break c}else{q=q<<1;l=g}}if(V>>>0<(c[22]|0)>>>0)Na();else{c[V>>2]=s;c[N+(r+24)>>2]=l;c[N+(r+12)>>2]=s;c[N+(r+8)>>2]=s;break b}}else W=j;while(0);j=W+8|0;m=c[j>>2]|0;q=c[22]|0;if(W>>>0>=q>>>0&m>>>0>=q>>>0){c[m+12>>2]=s;c[j>>2]=s;c[N+(r+8)>>2]=m;c[N+(r+12)>>2]=W;c[N+(r+24)>>2]=0;break}else Na()}else{m=M+r|0;c[N+4>>2]=m|3;j=N+(m+4)|0;c[j>>2]=c[j>>2]|1}while(0);p=N+8|0;i=b;return p|0}else D=r}else D=r}else D=-1;while(0);N=c[20]|0;if(N>>>0>=D>>>0){M=N-D|0;W=c[23]|0;if(M>>>0>15){c[23]=W+D;c[20]=M;c[W+(D+4)>>2]=M|1;c[W+N>>2]=M;c[W+4>>2]=D|3}else{c[20]=0;c[23]=0;c[W+4>>2]=N|3;M=W+(N+4)|0;c[M>>2]=c[M>>2]|1}p=W+8|0;i=b;return p|0}W=c[21]|0;if(W>>>0>D>>>0){M=W-D|0;c[21]=M;W=c[24]|0;c[24]=W+D;c[W+(D+4)>>2]=M|1;c[W+4>>2]=D|3;p=W+8|0;i=b;return p|0}do if(!(c[136]|0)){W=za(30)|0;if(!(W+-1&W)){c[138]=W;c[137]=W;c[139]=-1;c[140]=-1;c[141]=0;c[129]=0;c[136]=(Pa(0)|0)&-16^1431655768;break}else Na()}while(0);W=D+48|0;M=c[138]|0;N=D+47|0;V=M+N|0;U=0-M|0;M=V&U;if(M>>>0<=D>>>0){p=0;i=b;return p|0}T=c[128]|0;if((T|0)!=0?(S=c[126]|0,R=S+M|0,R>>>0<=S>>>0|R>>>0>T>>>0):0){p=0;i=b;return p|0}d:do if(!(c[129]&4)){T=c[24]|0;e:do if(T){R=520|0;while(1){S=c[R>>2]|0;if(S>>>0<=T>>>0?(X=R+4|0,(S+(c[X>>2]|0)|0)>>>0>T>>>0):0)break;S=c[R+8>>2]|0;if(!S){Y=181;break e}else R=S}if(R){S=V-(c[21]|0)&U;if(S>>>0<2147483647){O=ua(S|0)|0;if((O|0)==((c[R>>2]|0)+(c[X>>2]|0)|0)){Z=O;_=S;Y=190}else{$=O;aa=S;Y=191}}else ba=0}else Y=181}else Y=181;while(0);do if((Y|0)==181){T=ua(0)|0;if((T|0)!=(-1|0)){r=T;S=c[137]|0;O=S+-1|0;if(!(O&r))ca=M;else ca=M-r+(O+r&0-S)|0;S=c[126]|0;r=S+ca|0;if(ca>>>0>D>>>0&ca>>>0<2147483647){O=c[128]|0;if((O|0)!=0?r>>>0<=S>>>0|r>>>0>O>>>0:0){ba=0;break}O=ua(ca|0)|0;if((O|0)==(T|0)){Z=T;_=ca;Y=190}else{$=O;aa=ca;Y=191}}else ba=0}else ba=0}while(0);f:do if((Y|0)==190)if((Z|0)==(-1|0))ba=_;else{da=Z;ea=_;Y=201;break d}else if((Y|0)==191){O=0-aa|0;do if(($|0)!=(-1|0)&aa>>>0<2147483647&W>>>0>aa>>>0?(T=c[138]|0,r=N-aa+T&0-T,r>>>0<2147483647):0)if((ua(r|0)|0)==(-1|0)){ua(O|0)|0;ba=0;break f}else{fa=r+aa|0;break}else fa=aa;while(0);if(($|0)==(-1|0))ba=0;else{da=$;ea=fa;Y=201;break d}}while(0);c[129]=c[129]|4;ga=ba;Y=198}else{ga=0;Y=198}while(0);if((((Y|0)==198?M>>>0<2147483647:0)?(ba=ua(M|0)|0,M=ua(0)|0,(ba|0)!=(-1|0)&(M|0)!=(-1|0)&ba>>>0<M>>>0):0)?(fa=M-ba|0,M=fa>>>0>(D+40|0)>>>0,M):0){da=ba;ea=M?fa:ga;Y=201}if((Y|0)==201){ga=(c[126]|0)+ea|0;c[126]=ga;if(ga>>>0>(c[127]|0)>>>0)c[127]=ga;ga=c[24]|0;g:do if(ga){fa=520|0;while(1){ha=c[fa>>2]|0;ia=fa+4|0;ja=c[ia>>2]|0;if((da|0)==(ha+ja|0)){Y=213;break}M=c[fa+8>>2]|0;if(!M)break;else fa=M}if(((Y|0)==213?(c[fa+12>>2]&8|0)==0:0)?ga>>>0>=ha>>>0&ga>>>0<da>>>0:0){c[ia>>2]=ja+ea;M=(c[21]|0)+ea|0;ba=ga+8|0;if(!(ba&7))ka=0;else ka=0-ba&7;ba=M-ka|0;c[24]=ga+ka;c[21]=ba;c[ga+(ka+4)>>2]=ba|1;c[ga+(M+4)>>2]=40;c[25]=c[140];break}M=c[22]|0;if(da>>>0<M>>>0){c[22]=da;la=da}else la=M;M=da+ea|0;ba=520|0;while(1){if((c[ba>>2]|0)==(M|0)){Y=223;break}$=c[ba+8>>2]|0;if(!$)break;else ba=$}if((Y|0)==223?(c[ba+12>>2]&8|0)==0:0){c[ba>>2]=da;M=ba+4|0;c[M>>2]=(c[M>>2]|0)+ea;M=da+8|0;if(!(M&7))ma=0;else ma=0-M&7;M=da+(ea+8)|0;if(!(M&7))na=0;else na=0-M&7;M=da+(na+ea)|0;fa=ma+D|0;$=da+fa|0;aa=M-(da+ma)-D|0;c[da+(ma+4)>>2]=D|3;h:do if((M|0)!=(ga|0)){if((M|0)==(c[23]|0)){N=(c[20]|0)+aa|0;c[20]=N;c[23]=$;c[da+(fa+4)>>2]=N|1;c[da+(N+fa)>>2]=N;break}N=ea+4|0;W=c[da+(N+na)>>2]|0;if((W&3|0)==1){_=W&-8;Z=W>>>3;i:do if(W>>>0>=256){ca=c[da+((na|24)+ea)>>2]|0;X=c[da+(ea+12+na)>>2]|0;do if((X|0)==(M|0)){U=na|16;V=da+(N+U)|0;O=c[V>>2]|0;if(!O){R=da+(U+ea)|0;U=c[R>>2]|0;if(!U){oa=0;break}else{pa=U;qa=R}}else{pa=O;qa=V}while(1){V=pa+20|0;O=c[V>>2]|0;if(O){pa=O;qa=V;continue}V=pa+16|0;O=c[V>>2]|0;if(!O)break;else{pa=O;qa=V}}if(qa>>>0<la>>>0)Na();else{c[qa>>2]=0;oa=pa;break}}else{V=c[da+((na|8)+ea)>>2]|0;if(V>>>0<la>>>0)Na();O=V+12|0;if((c[O>>2]|0)!=(M|0))Na();R=X+8|0;if((c[R>>2]|0)==(M|0)){c[O>>2]=X;c[R>>2]=V;oa=X;break}else Na()}while(0);if(!ca)break;X=c[da+(ea+28+na)>>2]|0;l=376+(X<<2)|0;do if((M|0)!=(c[l>>2]|0)){if(ca>>>0<(c[22]|0)>>>0)Na();V=ca+16|0;if((c[V>>2]|0)==(M|0))c[V>>2]=oa;else c[ca+20>>2]=oa;if(!oa)break i}else{c[l>>2]=oa;if(oa)break;c[19]=c[19]&~(1<<X);break i}while(0);X=c[22]|0;if(oa>>>0<X>>>0)Na();c[oa+24>>2]=ca;l=na|16;V=c[da+(l+ea)>>2]|0;do if(V)if(V>>>0<X>>>0)Na();else{c[oa+16>>2]=V;c[V+24>>2]=oa;break}while(0);V=c[da+(N+l)>>2]|0;if(!V)break;if(V>>>0<(c[22]|0)>>>0)Na();else{c[oa+20>>2]=V;c[V+24>>2]=oa;break}}else{V=c[da+((na|8)+ea)>>2]|0;X=c[da+(ea+12+na)>>2]|0;ca=112+(Z<<1<<2)|0;do if((V|0)!=(ca|0)){if(V>>>0<la>>>0)Na();if((c[V+12>>2]|0)==(M|0))break;Na()}while(0);if((X|0)==(V|0)){c[18]=c[18]&~(1<<Z);break}do if((X|0)==(ca|0))ra=X+8|0;else{if(X>>>0<la>>>0)Na();l=X+8|0;if((c[l>>2]|0)==(M|0)){ra=l;break}Na()}while(0);c[V+12>>2]=X;c[ra>>2]=V}while(0);sa=da+((_|na)+ea)|0;ta=_+aa|0}else{sa=M;ta=aa}Z=sa+4|0;c[Z>>2]=c[Z>>2]&-2;c[da+(fa+4)>>2]=ta|1;c[da+(ta+fa)>>2]=ta;Z=ta>>>3;if(ta>>>0<256){N=Z<<1;W=112+(N<<2)|0;ca=c[18]|0;l=1<<Z;do if(!(ca&l)){c[18]=ca|l;va=112+(N+2<<2)|0;wa=W}else{Z=112+(N+2<<2)|0;R=c[Z>>2]|0;if(R>>>0>=(c[22]|0)>>>0){va=Z;wa=R;break}Na()}while(0);c[va>>2]=$;c[wa+12>>2]=$;c[da+(fa+8)>>2]=wa;c[da+(fa+12)>>2]=W;break}N=ta>>>8;do if(!N)xa=0;else{if(ta>>>0>16777215){xa=31;break}l=(N+1048320|0)>>>16&8;ca=N<<l;_=(ca+520192|0)>>>16&4;R=ca<<_;ca=(R+245760|0)>>>16&2;Z=14-(_|l|ca)+(R<<ca>>>15)|0;xa=ta>>>(Z+7|0)&1|Z<<1}while(0);N=376+(xa<<2)|0;c[da+(fa+28)>>2]=xa;c[da+(fa+20)>>2]=0;c[da+(fa+16)>>2]=0;W=c[19]|0;Z=1<<xa;if(!(W&Z)){c[19]=W|Z;c[N>>2]=$;c[da+(fa+24)>>2]=N;c[da+(fa+12)>>2]=$;c[da+(fa+8)>>2]=$;break}Z=c[N>>2]|0;if((xa|0)==31)ya=0;else ya=25-(xa>>>1)|0;j:do if((c[Z+4>>2]&-8|0)!=(ta|0)){N=ta<<ya;W=Z;while(1){Aa=W+(N>>>31<<2)+16|0;ca=c[Aa>>2]|0;if(!ca)break;if((c[ca+4>>2]&-8|0)==(ta|0)){Ba=ca;break j}else{N=N<<1;W=ca}}if(Aa>>>0<(c[22]|0)>>>0)Na();else{c[Aa>>2]=$;c[da+(fa+24)>>2]=W;c[da+(fa+12)>>2]=$;c[da+(fa+8)>>2]=$;break h}}else Ba=Z;while(0);Z=Ba+8|0;N=c[Z>>2]|0;V=c[22]|0;if(Ba>>>0>=V>>>0&N>>>0>=V>>>0){c[N+12>>2]=$;c[Z>>2]=$;c[da+(fa+8)>>2]=N;c[da+(fa+12)>>2]=Ba;c[da+(fa+24)>>2]=0;break}else Na()}else{N=(c[21]|0)+aa|0;c[21]=N;c[24]=$;c[da+(fa+4)>>2]=N|1}while(0);p=da+(ma|8)|0;i=b;return p|0}fa=520|0;while(1){Ca=c[fa>>2]|0;if(Ca>>>0<=ga>>>0?(Da=c[fa+4>>2]|0,Ea=Ca+Da|0,Ea>>>0>ga>>>0):0)break;fa=c[fa+8>>2]|0}fa=Ca+(Da+-39)|0;if(!(fa&7))Fa=0;else Fa=0-fa&7;fa=Ca+(Da+-47+Fa)|0;$=fa>>>0<(ga+16|0)>>>0?ga:fa;fa=$+8|0;aa=da+8|0;if(!(aa&7))Ga=0;else Ga=0-aa&7;aa=ea+-40-Ga|0;c[24]=da+Ga;c[21]=aa;c[da+(Ga+4)>>2]=aa|1;c[da+(ea+-36)>>2]=40;c[25]=c[140];c[$+4>>2]=27;c[fa+0>>2]=c[130];c[fa+4>>2]=c[131];c[fa+8>>2]=c[132];c[fa+12>>2]=c[133];c[130]=da;c[131]=ea;c[133]=0;c[132]=fa;fa=$+28|0;c[fa>>2]=7;if(($+32|0)>>>0<Ea>>>0){aa=fa;do{fa=aa;aa=aa+4|0;c[aa>>2]=7}while((fa+8|0)>>>0<Ea>>>0)}if(($|0)!=(ga|0)){aa=$-ga|0;fa=ga+(aa+4)|0;c[fa>>2]=c[fa>>2]&-2;c[ga+4>>2]=aa|1;c[ga+aa>>2]=aa;fa=aa>>>3;if(aa>>>0<256){M=fa<<1;ba=112+(M<<2)|0;N=c[18]|0;Z=1<<fa;do if(!(N&Z)){c[18]=N|Z;Ha=112+(M+2<<2)|0;Ja=ba}else{fa=112+(M+2<<2)|0;V=c[fa>>2]|0;if(V>>>0>=(c[22]|0)>>>0){Ha=fa;Ja=V;break}Na()}while(0);c[Ha>>2]=ga;c[Ja+12>>2]=ga;c[ga+8>>2]=Ja;c[ga+12>>2]=ba;break}M=aa>>>8;if(M)if(aa>>>0>16777215)Ka=31;else{Z=(M+1048320|0)>>>16&8;N=M<<Z;M=(N+520192|0)>>>16&4;$=N<<M;N=($+245760|0)>>>16&2;V=14-(M|Z|N)+($<<N>>>15)|0;Ka=aa>>>(V+7|0)&1|V<<1}else Ka=0;V=376+(Ka<<2)|0;c[ga+28>>2]=Ka;c[ga+20>>2]=0;c[ga+16>>2]=0;N=c[19]|0;$=1<<Ka;if(!(N&$)){c[19]=N|$;c[V>>2]=ga;c[ga+24>>2]=V;c[ga+12>>2]=ga;c[ga+8>>2]=ga;break}$=c[V>>2]|0;if((Ka|0)==31)La=0;else La=25-(Ka>>>1)|0;k:do if((c[$+4>>2]&-8|0)!=(aa|0)){V=aa<<La;N=$;while(1){Ma=N+(V>>>31<<2)+16|0;Z=c[Ma>>2]|0;if(!Z)break;if((c[Z+4>>2]&-8|0)==(aa|0)){Oa=Z;break k}else{V=V<<1;N=Z}}if(Ma>>>0<(c[22]|0)>>>0)Na();else{c[Ma>>2]=ga;c[ga+24>>2]=N;c[ga+12>>2]=ga;c[ga+8>>2]=ga;break g}}else Oa=$;while(0);$=Oa+8|0;aa=c[$>>2]|0;ba=c[22]|0;if(Oa>>>0>=ba>>>0&aa>>>0>=ba>>>0){c[aa+12>>2]=ga;c[$>>2]=ga;c[ga+8>>2]=aa;c[ga+12>>2]=Oa;c[ga+24>>2]=0;break}else Na()}}else{aa=c[22]|0;if((aa|0)==0|da>>>0<aa>>>0)c[22]=da;c[130]=da;c[131]=ea;c[133]=0;c[27]=c[136];c[26]=-1;aa=0;do{$=aa<<1;ba=112+($<<2)|0;c[112+($+3<<2)>>2]=ba;c[112+($+2<<2)>>2]=ba;aa=aa+1|0}while((aa|0)!=32);aa=da+8|0;if(!(aa&7))Qa=0;else Qa=0-aa&7;aa=ea+-40-Qa|0;c[24]=da+Qa;c[21]=aa;c[da+(Qa+4)>>2]=aa|1;c[da+(ea+-36)>>2]=40;c[25]=c[140]}while(0);ea=c[21]|0;if(ea>>>0>D>>>0){da=ea-D|0;c[21]=da;ea=c[24]|0;c[24]=ea+D;c[ea+(D+4)>>2]=da|1;c[ea+4>>2]=D|3;p=ea+8|0;i=b;return p|0}}c[(Ia()|0)>>2]=12;p=0;i=b;return p|0}function Za(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;d=i;i=i+288|0;e=d+32|0;f=d;Hd(e,b);b=16;do{g=c[e+(b+-2<<2)>>2]|0;h=c[e+(b+-15<<2)>>2]|0;c[e+(b<<2)>>2]=(c[e+(b+-16<<2)>>2]|0)+(c[e+(b+-7<<2)>>2]|0)+((g>>>19|g<<13)^g>>>10^(g>>>17|g<<15))+((h>>>18|h<<14)^h>>>3^(h>>>7|h<<25));b=b+1|0}while((b|0)!=64);c[f+0>>2]=c[a+0>>2];c[f+4>>2]=c[a+4>>2];c[f+8>>2]=c[a+8>>2];c[f+12>>2]=c[a+12>>2];c[f+16>>2]=c[a+16>>2];c[f+20>>2]=c[a+20>>2];c[f+24>>2]=c[a+24>>2];c[f+28>>2]=c[a+28>>2];b=f+28|0;h=f+16|0;g=c[h>>2]|0;j=f+20|0;k=f+24|0;l=c[k>>2]|0;m=(c[b>>2]|0)+1116352408+(c[e>>2]|0)+((g>>>6|g<<26)^(g>>>11|g<<21)^(g>>>25|g<<7))+((l^c[j>>2])&g^l)|0;l=c[f>>2]|0;g=f+4|0;n=c[g>>2]|0;o=f+8|0;p=c[o>>2]|0;q=f+12|0;c[q>>2]=(c[q>>2]|0)+m;r=((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+m+((p|n)&l|p&n)|0;c[b>>2]=r;n=c[q>>2]|0;p=c[j>>2]|0;l=(c[k>>2]|0)+1899447441+(c[e+4>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[h>>2])&n^p)|0;p=c[f>>2]|0;n=c[g>>2]|0;c[o>>2]=(c[o>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((n|p)&r|n&p)|0;c[k>>2]=m;p=c[o>>2]|0;n=c[h>>2]|0;r=(c[j>>2]|0)+-1245643825+(c[e+8>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[q>>2])&p^n)|0;n=c[b>>2]|0;p=c[f>>2]|0;c[g>>2]=(c[g>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((p|n)&m|p&n)|0;c[j>>2]=l;n=c[g>>2]|0;p=c[q>>2]|0;m=(c[h>>2]|0)+-373957723+(c[e+12>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[o>>2])&n^p)|0;p=c[k>>2]|0;n=c[b>>2]|0;c[f>>2]=(c[f>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((n|p)&l|n&p)|0;c[h>>2]=r;p=c[f>>2]|0;n=c[o>>2]|0;l=(c[q>>2]|0)+961987163+(c[e+16>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[g>>2])&p^n)|0;n=c[j>>2]|0;p=c[k>>2]|0;c[b>>2]=(c[b>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((p|n)&r|p&n)|0;c[q>>2]=m;n=c[b>>2]|0;p=c[g>>2]|0;r=(c[o>>2]|0)+1508970993+(c[e+20>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[f>>2])&n^p)|0;p=c[h>>2]|0;n=c[j>>2]|0;c[k>>2]=(c[k>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((n|p)&m|n&p)|0;c[o>>2]=l;p=c[k>>2]|0;n=c[f>>2]|0;m=(c[g>>2]|0)+-1841331548+(c[e+24>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[b>>2])&p^n)|0;n=c[q>>2]|0;p=c[h>>2]|0;c[j>>2]=(c[j>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((p|n)&l|p&n)|0;c[g>>2]=r;n=c[j>>2]|0;p=c[b>>2]|0;l=(c[f>>2]|0)+-1424204075+(c[e+28>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[k>>2])&n^p)|0;p=c[o>>2]|0;n=c[q>>2]|0;c[h>>2]=(c[h>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((n|p)&r|n&p)|0;c[f>>2]=m;p=c[h>>2]|0;n=c[k>>2]|0;r=(c[b>>2]|0)+-670586216+(c[e+32>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[j>>2])&p^n)|0;n=c[g>>2]|0;p=c[o>>2]|0;c[q>>2]=(c[q>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((p|n)&m|p&n)|0;c[b>>2]=l;n=c[q>>2]|0;p=c[j>>2]|0;m=(c[k>>2]|0)+310598401+(c[e+36>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[h>>2])&n^p)|0;p=c[f>>2]|0;n=c[g>>2]|0;c[o>>2]=(c[o>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((n|p)&l|n&p)|0;c[k>>2]=r;p=c[o>>2]|0;n=c[h>>2]|0;l=(c[j>>2]|0)+607225278+(c[e+40>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[q>>2])&p^n)|0;n=c[b>>2]|0;p=c[f>>2]|0;c[g>>2]=(c[g>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((p|n)&r|p&n)|0;c[j>>2]=m;n=c[g>>2]|0;p=c[q>>2]|0;r=(c[h>>2]|0)+1426881987+(c[e+44>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[o>>2])&n^p)|0;p=c[k>>2]|0;n=c[b>>2]|0;c[f>>2]=(c[f>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((n|p)&m|n&p)|0;c[h>>2]=l;p=c[f>>2]|0;n=c[o>>2]|0;m=(c[q>>2]|0)+1925078388+(c[e+48>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[g>>2])&p^n)|0;n=c[j>>2]|0;p=c[k>>2]|0;c[b>>2]=(c[b>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((p|n)&l|p&n)|0;c[q>>2]=r;n=c[b>>2]|0;p=c[g>>2]|0;l=(c[o>>2]|0)+-2132889090+(c[e+52>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[f>>2])&n^p)|0;p=c[h>>2]|0;n=c[j>>2]|0;c[k>>2]=(c[k>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((n|p)&r|n&p)|0;c[o>>2]=m;p=c[k>>2]|0;n=c[f>>2]|0;r=(c[g>>2]|0)+-1680079193+(c[e+56>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[b>>2])&p^n)|0;n=c[q>>2]|0;p=c[h>>2]|0;c[j>>2]=(c[j>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((p|n)&m|p&n)|0;c[g>>2]=l;n=c[j>>2]|0;p=c[b>>2]|0;m=(c[f>>2]|0)+-1046744716+(c[e+60>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[k>>2])&n^p)|0;p=c[o>>2]|0;n=c[q>>2]|0;c[h>>2]=(c[h>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((n|p)&l|n&p)|0;c[f>>2]=r;p=c[h>>2]|0;n=c[k>>2]|0;l=(c[b>>2]|0)+-459576895+(c[e+64>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[j>>2])&p^n)|0;n=c[g>>2]|0;p=c[o>>2]|0;c[q>>2]=(c[q>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((p|n)&r|p&n)|0;c[b>>2]=m;n=c[q>>2]|0;p=c[j>>2]|0;r=(c[k>>2]|0)+-272742522+(c[e+68>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[h>>2])&n^p)|0;p=c[f>>2]|0;n=c[g>>2]|0;c[o>>2]=(c[o>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((n|p)&m|n&p)|0;c[k>>2]=l;p=c[o>>2]|0;n=c[h>>2]|0;m=(c[j>>2]|0)+264347078+(c[e+72>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[q>>2])&p^n)|0;n=c[b>>2]|0;p=c[f>>2]|0;c[g>>2]=(c[g>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((p|n)&l|p&n)|0;c[j>>2]=r;n=c[g>>2]|0;p=c[q>>2]|0;l=(c[h>>2]|0)+604807628+(c[e+76>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[o>>2])&n^p)|0;p=c[k>>2]|0;n=c[b>>2]|0;c[f>>2]=(c[f>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((n|p)&r|n&p)|0;c[h>>2]=m;p=c[f>>2]|0;n=c[o>>2]|0;r=(c[q>>2]|0)+770255983+(c[e+80>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[g>>2])&p^n)|0;n=c[j>>2]|0;p=c[k>>2]|0;c[b>>2]=(c[b>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((p|n)&m|p&n)|0;c[q>>2]=l;n=c[b>>2]|0;p=c[g>>2]|0;m=(c[o>>2]|0)+1249150122+(c[e+84>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[f>>2])&n^p)|0;p=c[h>>2]|0;n=c[j>>2]|0;c[k>>2]=(c[k>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((n|p)&l|n&p)|0;c[o>>2]=r;p=c[k>>2]|0;n=c[f>>2]|0;l=(c[g>>2]|0)+1555081692+(c[e+88>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[b>>2])&p^n)|0;n=c[q>>2]|0;p=c[h>>2]|0;c[j>>2]=(c[j>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((p|n)&r|p&n)|0;c[g>>2]=m;n=c[j>>2]|0;p=c[b>>2]|0;r=(c[f>>2]|0)+1996064986+(c[e+92>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[k>>2])&n^p)|0;p=c[o>>2]|0;n=c[q>>2]|0;c[h>>2]=(c[h>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((n|p)&m|n&p)|0;c[f>>2]=l;p=c[h>>2]|0;n=c[k>>2]|0;m=(c[b>>2]|0)+-1740746414+(c[e+96>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[j>>2])&p^n)|0;n=c[g>>2]|0;p=c[o>>2]|0;c[q>>2]=(c[q>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((p|n)&l|p&n)|0;c[b>>2]=r;n=c[q>>2]|0;p=c[j>>2]|0;l=(c[k>>2]|0)+-1473132947+(c[e+100>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[h>>2])&n^p)|0;p=c[f>>2]|0;n=c[g>>2]|0;c[o>>2]=(c[o>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((n|p)&r|n&p)|0;c[k>>2]=m;p=c[o>>2]|0;n=c[h>>2]|0;r=(c[j>>2]|0)+-1341970488+(c[e+104>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[q>>2])&p^n)|0;n=c[b>>2]|0;p=c[f>>2]|0;c[g>>2]=(c[g>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((p|n)&m|p&n)|0;c[j>>2]=l;n=c[g>>2]|0;p=c[q>>2]|0;m=(c[h>>2]|0)+-1084653625+(c[e+108>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[o>>2])&n^p)|0;p=c[k>>2]|0;n=c[b>>2]|0;c[f>>2]=(c[f>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((n|p)&l|n&p)|0;c[h>>2]=r;p=c[f>>2]|0;n=c[o>>2]|0;l=(c[q>>2]|0)+-958395405+(c[e+112>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[g>>2])&p^n)|0;n=c[j>>2]|0;p=c[k>>2]|0;c[b>>2]=(c[b>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((p|n)&r|p&n)|0;c[q>>2]=m;n=c[b>>2]|0;p=c[g>>2]|0;r=(c[o>>2]|0)+-710438585+(c[e+116>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[f>>2])&n^p)|0;p=c[h>>2]|0;n=c[j>>2]|0;c[k>>2]=(c[k>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((n|p)&m|n&p)|0;c[o>>2]=l;p=c[k>>2]|0;n=c[f>>2]|0;m=(c[g>>2]|0)+113926993+(c[e+120>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[b>>2])&p^n)|0;n=c[q>>2]|0;p=c[h>>2]|0;c[j>>2]=(c[j>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((p|n)&l|p&n)|0;c[g>>2]=r;n=c[j>>2]|0;p=c[b>>2]|0;l=(c[f>>2]|0)+338241895+(c[e+124>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[k>>2])&n^p)|0;p=c[o>>2]|0;n=c[q>>2]|0;c[h>>2]=(c[h>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((n|p)&r|n&p)|0;c[f>>2]=m;p=c[h>>2]|0;n=c[k>>2]|0;r=(c[b>>2]|0)+666307205+(c[e+128>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[j>>2])&p^n)|0;n=c[g>>2]|0;p=c[o>>2]|0;c[q>>2]=(c[q>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((p|n)&m|p&n)|0;c[b>>2]=l;n=c[q>>2]|0;p=c[j>>2]|0;m=(c[k>>2]|0)+773529912+(c[e+132>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[h>>2])&n^p)|0;p=c[f>>2]|0;n=c[g>>2]|0;c[o>>2]=(c[o>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((n|p)&l|n&p)|0;c[k>>2]=r;p=c[o>>2]|0;n=c[h>>2]|0;l=(c[j>>2]|0)+1294757372+(c[e+136>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[q>>2])&p^n)|0;n=c[b>>2]|0;p=c[f>>2]|0;c[g>>2]=(c[g>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((p|n)&r|p&n)|0;c[j>>2]=m;n=c[g>>2]|0;p=c[q>>2]|0;r=(c[h>>2]|0)+1396182291+(c[e+140>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[o>>2])&n^p)|0;p=c[k>>2]|0;n=c[b>>2]|0;c[f>>2]=(c[f>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((n|p)&m|n&p)|0;c[h>>2]=l;p=c[f>>2]|0;n=c[o>>2]|0;m=(c[q>>2]|0)+1695183700+(c[e+144>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[g>>2])&p^n)|0;n=c[j>>2]|0;p=c[k>>2]|0;c[b>>2]=(c[b>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((p|n)&l|p&n)|0;c[q>>2]=r;n=c[b>>2]|0;p=c[g>>2]|0;l=(c[o>>2]|0)+1986661051+(c[e+148>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[f>>2])&n^p)|0;p=c[h>>2]|0;n=c[j>>2]|0;c[k>>2]=(c[k>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((n|p)&r|n&p)|0;c[o>>2]=m;p=c[k>>2]|0;n=c[f>>2]|0;r=(c[g>>2]|0)+-2117940946+(c[e+152>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[b>>2])&p^n)|0;n=c[q>>2]|0;p=c[h>>2]|0;c[j>>2]=(c[j>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((p|n)&m|p&n)|0;c[g>>2]=l;n=c[j>>2]|0;p=c[b>>2]|0;m=(c[f>>2]|0)+-1838011259+(c[e+156>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[k>>2])&n^p)|0;p=c[o>>2]|0;n=c[q>>2]|0;c[h>>2]=(c[h>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((n|p)&l|n&p)|0;c[f>>2]=r;p=c[h>>2]|0;n=c[k>>2]|0;l=(c[b>>2]|0)+-1564481375+(c[e+160>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[j>>2])&p^n)|0;n=c[g>>2]|0;p=c[o>>2]|0;c[q>>2]=(c[q>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((p|n)&r|p&n)|0;c[b>>2]=m;n=c[q>>2]|0;p=c[j>>2]|0;r=(c[k>>2]|0)+-1474664885+(c[e+164>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[h>>2])&n^p)|0;p=c[f>>2]|0;n=c[g>>2]|0;c[o>>2]=(c[o>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((n|p)&m|n&p)|0;c[k>>2]=l;p=c[o>>2]|0;n=c[h>>2]|0;m=(c[j>>2]|0)+-1035236496+(c[e+168>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[q>>2])&p^n)|0;n=c[b>>2]|0;p=c[f>>2]|0;c[g>>2]=(c[g>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((p|n)&l|p&n)|0;c[j>>2]=r;n=c[g>>2]|0;p=c[q>>2]|0;l=(c[h>>2]|0)+-949202525+(c[e+172>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[o>>2])&n^p)|0;p=c[k>>2]|0;n=c[b>>2]|0;c[f>>2]=(c[f>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((n|p)&r|n&p)|0;c[h>>2]=m;p=c[f>>2]|0;n=c[o>>2]|0;r=(c[q>>2]|0)+-778901479+(c[e+176>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[g>>2])&p^n)|0;n=c[j>>2]|0;p=c[k>>2]|0;c[b>>2]=(c[b>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((p|n)&m|p&n)|0;c[q>>2]=l;n=c[b>>2]|0;p=c[g>>2]|0;m=(c[o>>2]|0)+-694614492+(c[e+180>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[f>>2])&n^p)|0;p=c[h>>2]|0;n=c[j>>2]|0;c[k>>2]=(c[k>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((n|p)&l|n&p)|0;c[o>>2]=r;p=c[k>>2]|0;n=c[f>>2]|0;l=(c[g>>2]|0)+-200395387+(c[e+184>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[b>>2])&p^n)|0;n=c[q>>2]|0;p=c[h>>2]|0;c[j>>2]=(c[j>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((p|n)&r|p&n)|0;c[g>>2]=m;n=c[j>>2]|0;p=c[b>>2]|0;r=(c[f>>2]|0)+275423344+(c[e+188>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[k>>2])&n^p)|0;p=c[o>>2]|0;n=c[q>>2]|0;c[h>>2]=(c[h>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((n|p)&m|n&p)|0;c[f>>2]=l;p=c[h>>2]|0;n=c[k>>2]|0;m=(c[b>>2]|0)+430227734+(c[e+192>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[j>>2])&p^n)|0;n=c[g>>2]|0;p=c[o>>2]|0;c[q>>2]=(c[q>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((p|n)&l|p&n)|0;c[b>>2]=r;n=c[q>>2]|0;p=c[j>>2]|0;l=(c[k>>2]|0)+506948616+(c[e+196>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[h>>2])&n^p)|0;p=c[f>>2]|0;n=c[g>>2]|0;c[o>>2]=(c[o>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((n|p)&r|n&p)|0;c[k>>2]=m;p=c[o>>2]|0;n=c[h>>2]|0;r=(c[j>>2]|0)+659060556+(c[e+200>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[q>>2])&p^n)|0;n=c[b>>2]|0;p=c[f>>2]|0;c[g>>2]=(c[g>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((p|n)&m|p&n)|0;c[j>>2]=l;n=c[g>>2]|0;p=c[q>>2]|0;m=(c[h>>2]|0)+883997877+(c[e+204>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[o>>2])&n^p)|0;p=c[k>>2]|0;n=c[b>>2]|0;c[f>>2]=(c[f>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((n|p)&l|n&p)|0;c[h>>2]=r;p=c[f>>2]|0;n=c[o>>2]|0;l=(c[q>>2]|0)+958139571+(c[e+208>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[g>>2])&p^n)|0;n=c[j>>2]|0;p=c[k>>2]|0;c[b>>2]=(c[b>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((p|n)&r|p&n)|0;c[q>>2]=m;n=c[b>>2]|0;p=c[g>>2]|0;r=(c[o>>2]|0)+1322822218+(c[e+212>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[f>>2])&n^p)|0;p=c[h>>2]|0;n=c[j>>2]|0;c[k>>2]=(c[k>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((n|p)&m|n&p)|0;c[o>>2]=l;p=c[k>>2]|0;n=c[f>>2]|0;m=(c[g>>2]|0)+1537002063+(c[e+216>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[b>>2])&p^n)|0;n=c[q>>2]|0;p=c[h>>2]|0;c[j>>2]=(c[j>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((p|n)&l|p&n)|0;c[g>>2]=r;n=c[j>>2]|0;p=c[b>>2]|0;l=(c[f>>2]|0)+1747873779+(c[e+220>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[k>>2])&n^p)|0;p=c[o>>2]|0;n=c[q>>2]|0;c[h>>2]=(c[h>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((n|p)&r|n&p)|0;c[f>>2]=m;p=c[h>>2]|0;n=c[k>>2]|0;r=(c[b>>2]|0)+1955562222+(c[e+224>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[j>>2])&p^n)|0;n=c[g>>2]|0;p=c[o>>2]|0;c[q>>2]=(c[q>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((p|n)&m|p&n)|0;c[b>>2]=l;n=c[q>>2]|0;p=c[j>>2]|0;m=(c[k>>2]|0)+2024104815+(c[e+228>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[h>>2])&n^p)|0;p=c[f>>2]|0;n=c[g>>2]|0;c[o>>2]=(c[o>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((n|p)&l|n&p)|0;c[k>>2]=r;p=c[o>>2]|0;n=c[h>>2]|0;l=(c[j>>2]|0)+-2067236844+(c[e+232>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[q>>2])&p^n)|0;n=c[b>>2]|0;p=c[f>>2]|0;c[g>>2]=(c[g>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((p|n)&r|p&n)|0;c[j>>2]=m;n=c[g>>2]|0;p=c[q>>2]|0;r=(c[h>>2]|0)+-1933114872+(c[e+236>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[o>>2])&n^p)|0;p=c[k>>2]|0;n=c[b>>2]|0;c[f>>2]=(c[f>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((n|p)&m|n&p)|0;c[h>>2]=l;p=c[f>>2]|0;n=c[o>>2]|0;m=(c[q>>2]|0)+-1866530822+(c[e+240>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[g>>2])&p^n)|0;n=c[j>>2]|0;p=c[k>>2]|0;c[b>>2]=(c[b>>2]|0)+m;r=m+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((p|n)&l|p&n)|0;c[q>>2]=r;n=c[b>>2]|0;p=c[g>>2]|0;l=(c[o>>2]|0)+-1538233109+(c[e+244>>2]|0)+((n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7))+((p^c[f>>2])&n^p)|0;p=c[h>>2]|0;n=c[j>>2]|0;c[k>>2]=(c[k>>2]|0)+l;m=l+((r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10))+((n|p)&r|n&p)|0;c[o>>2]=m;p=c[k>>2]|0;n=c[f>>2]|0;r=(c[g>>2]|0)+-1090935817+(c[e+248>>2]|0)+((p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+((n^c[b>>2])&p^n)|0;n=c[q>>2]|0;p=c[h>>2]|0;c[j>>2]=(c[j>>2]|0)+r;l=r+((m>>>2|m<<30)^(m>>>13|m<<19)^(m>>>22|m<<10))+((p|n)&m|p&n)|0;c[g>>2]=l;g=c[j>>2]|0;j=c[b>>2]|0;b=(c[f>>2]|0)+-965641998+(c[e+252>>2]|0)+((g>>>6|g<<26)^(g>>>11|g<<21)^(g>>>25|g<<7))+((j^c[k>>2])&g^j)|0;j=c[o>>2]|0;o=c[q>>2]|0;c[h>>2]=(c[h>>2]|0)+b;h=b+((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+((o|j)&l|o&j)|0;c[f>>2]=h;c[a>>2]=(c[a>>2]|0)+h;h=a+4|0;c[h>>2]=(c[h>>2]|0)+(c[f+4>>2]|0);h=a+8|0;c[h>>2]=(c[h>>2]|0)+(c[f+8>>2]|0);h=a+12|0;c[h>>2]=(c[h>>2]|0)+(c[f+12>>2]|0);h=a+16|0;c[h>>2]=(c[h>>2]|0)+(c[f+16>>2]|0);h=a+20|0;c[h>>2]=(c[h>>2]|0)+(c[f+20>>2]|0);h=a+24|0;c[h>>2]=(c[h>>2]|0)+(c[f+24>>2]|0);h=a+28|0;c[h>>2]=(c[h>>2]|0)+(c[f+28>>2]|0);i=d;return}function _a(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0.0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0.0,Q=0,R=0.0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,ba=0.0,ca=0,da=0.0,ea=0,fa=0.0,ga=0,ha=0.0,ia=0,ja=0.0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0.0,sa=0,ta=0.0,ua=0,va=0,wa=0,xa=0,ya=0.0,za=0,Aa=0,Ba=0,Ca=0.0,Da=0.0,Ea=0,Fa=0,Ga=0,Ha=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Xb=0,Yb=0,Zb=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0,lc=0,mc=0,nc=0,oc=0,pc=0,qc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0,Ac=0,Bc=0,Cc=0,Dc=0,Ec=0,Fc=0.0,Gc=0,Hc=0,Ic=0,Jc=0,Kc=0,Lc=0.0,Mc=0,Nc=0.0,Oc=0.0,Pc=0.0,Qc=0.0,Rc=0.0,Sc=0,Tc=0,Uc=0.0,Vc=0,Wc=0.0,Xc=0,Yc=0,Zc=0,_c=0;g=i;i=i+512|0;h=g;if((e|0)==1){j=53;k=-1074}else if(!e){j=24;k=-149}else if((e|0)==2){j=53;k=-1074}else{l=0.0;i=g;return +l}e=b+4|0;m=b+100|0;do{n=c[e>>2]|0;if(n>>>0<(c[m>>2]|0)>>>0){c[e>>2]=n+1;o=d[n>>0]|0}else o=Wb(b)|0}while((Ce(o)|0)!=0);do if((o|0)==43|(o|0)==45){n=1-(((o|0)==45&1)<<1)|0;p=c[e>>2]|0;if(p>>>0<(c[m>>2]|0)>>>0){c[e>>2]=p+1;q=d[p>>0]|0;r=n;break}else{q=Wb(b)|0;r=n;break}}else{q=o;r=1}while(0);o=q;q=0;while(1){if((o|32|0)!=(a[944+q>>0]|0)){s=o;v=q;break}do if(q>>>0<7){n=c[e>>2]|0;if(n>>>0<(c[m>>2]|0)>>>0){c[e>>2]=n+1;w=d[n>>0]|0;break}else{w=Wb(b)|0;break}}else w=o;while(0);n=q+1|0;if(n>>>0<8){o=w;q=n}else{s=w;v=n;break}}do if((v|0)==3)x=23;else if((v|0)!=8){w=(f|0)!=0;if(v>>>0>3&w)if((v|0)==8)break;else{x=23;break}a:do if(!v){q=s;o=0;while(1){if((q|32|0)!=(a[960+o>>0]|0)){y=q;z=o;break a}do if(o>>>0<2){n=c[e>>2]|0;if(n>>>0<(c[m>>2]|0)>>>0){c[e>>2]=n+1;A=d[n>>0]|0;break}else{A=Wb(b)|0;break}}else A=q;while(0);n=o+1|0;if(n>>>0<3){q=A;o=n}else{y=A;z=n;break}}}else{y=s;z=v}while(0);if(!z){do if((y|0)==48){o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;B=d[o>>0]|0}else B=Wb(b)|0;if((B|32|0)!=120){if(!(c[m>>2]|0)){C=48;break}c[e>>2]=(c[e>>2]|0)+-1;C=48;break}o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;D=d[o>>0]|0;F=0}else{D=Wb(b)|0;F=0}while(1){if((D|0)==46){x=70;break}else if((D|0)!=48){G=0;H=0;I=0;J=0;K=D;L=F;M=0;N=0;O=1.0;Q=0;R=0.0;break}o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;D=d[o>>0]|0;F=1;continue}else{D=Wb(b)|0;F=1;continue}}if((x|0)==70){o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;S=d[o>>0]|0}else S=Wb(b)|0;if((S|0)==48){o=0;q=0;while(1){n=c[e>>2]|0;if(n>>>0<(c[m>>2]|0)>>>0){c[e>>2]=n+1;T=d[n>>0]|0}else T=Wb(b)|0;n=_d(o|0,q|0,-1,-1)|0;p=E;if((T|0)==48){o=n;q=p}else{G=0;H=0;I=n;J=p;K=T;L=1;M=1;N=0;O=1.0;Q=0;R=0.0;break}}}else{G=0;H=0;I=0;J=0;K=S;L=F;M=1;N=0;O=1.0;Q=0;R=0.0}}b:while(1){q=K+-48|0;do if(q>>>0>=10){o=K|32;p=(K|0)==46;if(!((o+-97|0)>>>0<6|p)){U=K;break b}if(p)if(!M){V=H;W=G;X=H;Y=G;Z=L;_=1;$=N;ba=O;ca=Q;da=R;break}else{U=46;break b}else{ea=(K|0)>57?o+-87|0:q;x=83;break}}else{ea=q;x=83}while(0);if((x|0)==83){x=0;do if(!((G|0)<0|(G|0)==0&H>>>0<8)){if((G|0)<0|(G|0)==0&H>>>0<14){fa=O*.0625;ga=N;ha=fa;ia=Q;ja=R+fa*+(ea|0);break}if((ea|0)==0|(N|0)!=0){ga=N;ha=O;ia=Q;ja=R}else{ga=1;ha=O;ia=Q;ja=R+O*.5}}else{ga=N;ha=O;ia=ea+(Q<<4)|0;ja=R}while(0);q=_d(H|0,G|0,1,0)|0;V=I;W=J;X=q;Y=E;Z=1;_=M;$=ga;ba=ha;ca=ia;da=ja}q=c[e>>2]|0;if(q>>>0<(c[m>>2]|0)>>>0){c[e>>2]=q+1;G=Y;H=X;I=V;J=W;K=d[q>>0]|0;L=Z;M=_;N=$;O=ba;Q=ca;R=da;continue}else{G=Y;H=X;I=V;J=W;K=Wb(b)|0;L=Z;M=_;N=$;O=ba;Q=ca;R=da;continue}}if(!L){q=(c[m>>2]|0)==0;if(!q)c[e>>2]=(c[e>>2]|0)+-1;if(f){if(!q?(q=c[e>>2]|0,c[e>>2]=q+-1,(M|0)!=0):0)c[e>>2]=q+-2}else ed(b,0);l=+(r|0)*0.0;i=g;return +l}q=(M|0)==0;o=q?H:I;p=q?G:J;if((G|0)<0|(G|0)==0&H>>>0<8){q=H;n=G;ka=Q;while(1){la=ka<<4;q=_d(q|0,n|0,1,0)|0;n=E;if(!((n|0)<0|(n|0)==0&q>>>0<8)){ma=la;break}else ka=la}}else ma=Q;do if((U|32|0)==112){ka=kb(b,f)|0;q=E;if((ka|0)==0&(q|0)==-2147483648)if(!f){ed(b,0);l=0.0;i=g;return +l}else{if(!(c[m>>2]|0)){na=0;oa=0;break}c[e>>2]=(c[e>>2]|0)+-1;na=0;oa=0;break}else{na=ka;oa=q}}else if(!(c[m>>2]|0)){na=0;oa=0}else{c[e>>2]=(c[e>>2]|0)+-1;na=0;oa=0}while(0);q=Td(o|0,p|0,2)|0;ka=_d(q|0,E|0,-32,-1)|0;q=_d(ka|0,E|0,na|0,oa|0)|0;ka=E;if(!ma){l=+(r|0)*0.0;i=g;return +l}if((ka|0)>0|(ka|0)==0&q>>>0>(0-k|0)>>>0){c[(Ia()|0)>>2]=34;l=+(r|0)*1797693134862315708145274.0e284*1797693134862315708145274.0e284;i=g;return +l}n=k+-106|0;la=((n|0)<0)<<31>>31;if((ka|0)<(la|0)|(ka|0)==(la|0)&q>>>0<n>>>0){c[(Ia()|0)>>2]=34;l=+(r|0)*2.2250738585072014e-308*2.2250738585072014e-308;i=g;return +l}if((ma|0)>-1){n=q;la=ka;pa=ma;fa=R;while(1){qa=pa<<1;if(!(fa>=.5)){ra=fa;sa=qa}else{ra=fa+-1.0;sa=qa|1}ta=fa+ra;qa=_d(n|0,la|0,-1,-1)|0;ua=E;if((sa|0)>-1){n=qa;la=ua;pa=sa;fa=ta}else{va=qa;wa=ua;xa=sa;ya=ta;break}}}else{va=q;wa=ka;xa=ma;ya=R}pa=Ld(32,0,k|0,((k|0)<0)<<31>>31|0)|0;la=_d(va|0,wa|0,pa|0,E|0)|0;pa=E;if(0>(pa|0)|0==(pa|0)&j>>>0>la>>>0)if((la|0)<0){za=0;x=126}else{Aa=la;x=124}else{Aa=j;x=124}if((x|0)==124)if((Aa|0)<53){za=Aa;x=126}else{Ba=Aa;Ca=+(r|0);Da=0.0}if((x|0)==126){fa=+(r|0);Ba=za;Ca=fa;Da=+Ee(+_b(1.0,84-za|0),fa)}la=(Ba|0)<32&ya!=0.0&(xa&1|0)==0;fa=Ca*(la?0.0:ya)+(Da+Ca*+(((la&1)+xa|0)>>>0))-Da;if(!(fa!=0.0))c[(Ia()|0)>>2]=34;l=+Fe(fa,va);i=g;return +l}else C=y;while(0);la=k+j|0;pa=0-la|0;n=C;p=0;while(1){if((n|0)==46){x=137;break}else if((n|0)!=48){Ea=n;Fa=0;Ga=0;Ha=p;Ja=0;break}o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;n=d[o>>0]|0;p=1;continue}else{n=Wb(b)|0;p=1;continue}}if((x|0)==137){n=c[e>>2]|0;if(n>>>0<(c[m>>2]|0)>>>0){c[e>>2]=n+1;Ka=d[n>>0]|0}else Ka=Wb(b)|0;if((Ka|0)==48){n=0;o=0;while(1){ua=_d(n|0,o|0,-1,-1)|0;qa=E;La=c[e>>2]|0;if(La>>>0<(c[m>>2]|0)>>>0){c[e>>2]=La+1;Ma=d[La>>0]|0}else Ma=Wb(b)|0;if((Ma|0)==48){n=ua;o=qa}else{Ea=Ma;Fa=ua;Ga=qa;Ha=1;Ja=1;break}}}else{Ea=Ka;Fa=0;Ga=0;Ha=p;Ja=1}}c[h>>2]=0;o=Ea+-48|0;n=(Ea|0)==46;c:do if(o>>>0<10|n){qa=h+496|0;ua=Ea;La=0;Na=0;Oa=n;Pa=o;Qa=Fa;Ra=Ga;Sa=Ha;Ta=Ja;Ua=0;Va=0;Wa=0;d:while(1){do if(Oa)if(!Ta){Xa=La;Ya=Na;Za=La;_a=Na;$a=Sa;ab=1;bb=Ua;cb=Va;db=Wa}else break d;else{eb=_d(La|0,Na|0,1,0)|0;fb=E;gb=(ua|0)!=48;if((Va|0)>=125){if(!gb){Xa=Qa;Ya=Ra;Za=eb;_a=fb;$a=Sa;ab=Ta;bb=Ua;cb=Va;db=Wa;break}c[qa>>2]=c[qa>>2]|1;Xa=Qa;Ya=Ra;Za=eb;_a=fb;$a=Sa;ab=Ta;bb=Ua;cb=Va;db=Wa;break}hb=h+(Va<<2)|0;if(!Ua)ib=Pa;else ib=ua+-48+((c[hb>>2]|0)*10|0)|0;c[hb>>2]=ib;hb=Ua+1|0;jb=(hb|0)==9;Xa=Qa;Ya=Ra;Za=eb;_a=fb;$a=1;ab=Ta;bb=jb?0:hb;cb=(jb&1)+Va|0;db=gb?eb:Wa}while(0);eb=c[e>>2]|0;if(eb>>>0<(c[m>>2]|0)>>>0){c[e>>2]=eb+1;lb=d[eb>>0]|0}else lb=Wb(b)|0;Pa=lb+-48|0;Oa=(lb|0)==46;if(!(Pa>>>0<10|Oa)){mb=lb;nb=Xa;ob=Za;pb=Ya;qb=_a;rb=$a;sb=ab;tb=bb;ub=cb;vb=db;x=160;break c}else{ua=lb;La=Za;Na=_a;Qa=Xa;Ra=Ya;Sa=$a;Ta=ab;Ua=bb;Va=cb;Wa=db}}wb=La;xb=Na;yb=Qa;zb=Ra;Ab=(Sa|0)!=0;Bb=Ua;Cb=Va;Db=Wa;x=168}else{mb=Ea;nb=Fa;ob=0;pb=Ga;qb=0;rb=Ha;sb=Ja;tb=0;ub=0;vb=0;x=160}while(0);do if((x|0)==160){o=(sb|0)==0;n=o?ob:nb;p=o?qb:pb;o=(rb|0)!=0;if(!(o&(mb|32|0)==101))if((mb|0)>-1){wb=ob;xb=qb;yb=n;zb=p;Ab=o;Bb=tb;Cb=ub;Db=vb;x=168;break}else{Eb=ob;Fb=qb;Gb=o;Hb=n;Ib=p;Jb=tb;Kb=ub;Lb=vb;x=170;break}o=kb(b,f)|0;Ta=E;do if((o|0)==0&(Ta|0)==-2147483648)if(!f){ed(b,0);l=0.0;i=g;return +l}else{if(!(c[m>>2]|0)){Mb=0;Nb=0;break}c[e>>2]=(c[e>>2]|0)+-1;Mb=0;Nb=0;break}else{Mb=o;Nb=Ta}while(0);Ta=_d(Mb|0,Nb|0,n|0,p|0)|0;Ob=Ta;Pb=ob;Qb=E;Rb=qb;Sb=tb;Tb=ub;Ub=vb}while(0);if((x|0)==168)if(c[m>>2]|0){c[e>>2]=(c[e>>2]|0)+-1;if(Ab){Ob=yb;Pb=wb;Qb=zb;Rb=xb;Sb=Bb;Tb=Cb;Ub=Db}else x=171}else{Eb=wb;Fb=xb;Gb=Ab;Hb=yb;Ib=zb;Jb=Bb;Kb=Cb;Lb=Db;x=170}if((x|0)==170)if(Gb){Ob=Hb;Pb=Eb;Qb=Ib;Rb=Fb;Sb=Jb;Tb=Kb;Ub=Lb}else x=171;if((x|0)==171){c[(Ia()|0)>>2]=22;ed(b,0);l=0.0;i=g;return +l}Ta=c[h>>2]|0;if(!Ta){l=+(r|0)*0.0;i=g;return +l}if((Ob|0)==(Pb|0)&(Qb|0)==(Rb|0)&((Rb|0)<0|(Rb|0)==0&Pb>>>0<10)?j>>>0>30|(Ta>>>j|0)==0:0){l=+(r|0)*+(Ta>>>0);i=g;return +l}Ta=(k|0)/-2|0;o=((Ta|0)<0)<<31>>31;if((Qb|0)>(o|0)|(Qb|0)==(o|0)&Ob>>>0>Ta>>>0){c[(Ia()|0)>>2]=34;l=+(r|0)*1797693134862315708145274.0e284*1797693134862315708145274.0e284;i=g;return +l}Ta=k+-106|0;o=((Ta|0)<0)<<31>>31;if((Qb|0)<(o|0)|(Qb|0)==(o|0)&Ob>>>0<Ta>>>0){c[(Ia()|0)>>2]=34;l=+(r|0)*2.2250738585072014e-308*2.2250738585072014e-308;i=g;return +l}if(!Sb)Vb=Tb;else{if((Sb|0)<9){Ta=h+(Tb<<2)|0;o=c[Ta>>2]|0;Wa=Sb;do{o=o*10|0;Wa=Wa+1|0}while((Wa|0)!=9);c[Ta>>2]=o}Vb=Tb+1|0}if((Ub|0)<9?(Ub|0)<=(Ob|0)&(Ob|0)<18:0){if((Ob|0)==9){l=+(r|0)*+((c[h>>2]|0)>>>0);i=g;return +l}if((Ob|0)<9){l=+(r|0)*+((c[h>>2]|0)>>>0)/+(c[976+(8-Ob<<2)>>2]|0);i=g;return +l}Wa=j+27+(aa(Ob,-3)|0)|0;Va=c[h>>2]|0;if((Wa|0)>30|(Va>>>Wa|0)==0){l=+(r|0)*+(Va>>>0)*+(c[976+(Ob+-10<<2)>>2]|0);i=g;return +l}}Va=(Ob|0)%9|0;if(!Va){Xb=0;Yb=0;Zb=Ob;$b=Vb}else{Wa=(Ob|0)>-1?Va:Va+9|0;Va=c[976+(8-Wa<<2)>>2]|0;if(Vb){Ua=1e9/(Va|0)|0;Sa=0;Ra=0;Qa=0;Na=Ob;while(1){La=h+(Qa<<2)|0;ua=c[La>>2]|0;Oa=((ua>>>0)/(Va>>>0)|0)+Ra|0;c[La>>2]=Oa;Ra=aa((ua>>>0)%(Va>>>0)|0,Ua)|0;ua=Qa;Qa=Qa+1|0;if((ua|0)==(Sa|0)&(Oa|0)==0){ac=Qa&127;bc=Na+-9|0}else{ac=Sa;bc=Na}if((Qa|0)==(Vb|0))break;else{Sa=ac;Na=bc}}if(!Ra){cc=ac;dc=bc;ec=Vb}else{c[h+(Vb<<2)>>2]=Ra;cc=ac;dc=bc;ec=Vb+1|0}}else{cc=0;dc=Ob;ec=0}Xb=cc;Yb=0;Zb=9-Wa+dc|0;$b=ec}e:while(1){Na=h+(Xb<<2)|0;if((Zb|0)<18){Sa=Yb;Qa=$b;while(1){Ua=0;Va=Qa+127|0;o=Qa;while(1){Ta=Va&127;Oa=h+(Ta<<2)|0;ua=Td(c[Oa>>2]|0,0,29)|0;La=_d(ua|0,E|0,Ua|0,0)|0;ua=E;if(ua>>>0>0|(ua|0)==0&La>>>0>1e9){Pa=re(La|0,ua|0,1e9,0)|0;qa=Bd(La|0,ua|0,1e9,0)|0;fc=qa;gc=Pa}else{fc=La;gc=0}c[Oa>>2]=fc;Oa=(Ta|0)==(Xb|0);if((Ta|0)!=(o+127&127|0)|Oa)hc=o;else hc=(fc|0)==0?Ta:o;if(Oa)break;else{Ua=gc;Va=Ta+-1|0;o=hc}}o=Sa+-29|0;if(!gc){Sa=o;Qa=hc}else{ic=o;jc=gc;kc=hc;break}}}else{if((Zb|0)==18){lc=Yb;mc=$b}else{nc=Xb;oc=Yb;pc=Zb;qc=$b;break}while(1){if((c[Na>>2]|0)>>>0>=9007199){nc=Xb;oc=lc;pc=18;qc=mc;break e}Qa=0;Sa=mc+127|0;p=mc;while(1){n=Sa&127;o=h+(n<<2)|0;Va=Td(c[o>>2]|0,0,29)|0;Ua=_d(Va|0,E|0,Qa|0,0)|0;Va=E;if(Va>>>0>0|(Va|0)==0&Ua>>>0>1e9){Ta=re(Ua|0,Va|0,1e9,0)|0;Oa=Bd(Ua|0,Va|0,1e9,0)|0;rc=Oa;sc=Ta}else{rc=Ua;sc=0}c[o>>2]=rc;o=(n|0)==(Xb|0);if((n|0)!=(p+127&127|0)|o)tc=p;else tc=(rc|0)==0?n:p;if(o)break;else{Qa=sc;Sa=n+-1|0;p=tc}}p=lc+-29|0;if(!sc){lc=p;mc=tc}else{ic=p;jc=sc;kc=tc;break}}}Na=Xb+127&127;if((Na|0)==(kc|0)){p=kc+127&127;Sa=h+((kc+126&127)<<2)|0;c[Sa>>2]=c[Sa>>2]|c[h+(p<<2)>>2];uc=p}else uc=kc;c[h+(Na<<2)>>2]=jc;Xb=Na;Yb=ic;Zb=Zb+9|0;$b=uc}f:while(1){vc=qc+1&127;Wa=h+((qc+127&127)<<2)|0;Ra=nc;Na=oc;p=pc;while(1){Sa=(p|0)==18;Qa=(p|0)>27?9:1;wc=Ra;xc=Na;while(1){n=0;while(1){o=n+wc&127;if((o|0)==(qc|0)){yc=2;break}Ua=c[h+(o<<2)>>2]|0;o=c[968+(n<<2)>>2]|0;if(Ua>>>0<o>>>0){yc=2;break}Ta=n+1|0;if(Ua>>>0>o>>>0){yc=n;break}if((Ta|0)<2)n=Ta;else{yc=Ta;break}}if((yc|0)==2&Sa)break f;zc=Qa+xc|0;if((wc|0)==(qc|0)){wc=qc;xc=zc}else break}Sa=(1<<Qa)+-1|0;n=1e9>>>Qa;Ac=wc;Bc=0;Ta=wc;Cc=p;do{o=h+(Ta<<2)|0;Ua=c[o>>2]|0;Oa=(Ua>>>Qa)+Bc|0;c[o>>2]=Oa;Bc=aa(Ua&Sa,n)|0;Ua=(Ta|0)==(Ac|0)&(Oa|0)==0;Ta=Ta+1&127;Cc=Ua?Cc+-9|0:Cc;Ac=Ua?Ta:Ac}while((Ta|0)!=(qc|0));if(!Bc){Ra=Ac;Na=zc;p=Cc;continue}if((vc|0)!=(Ac|0))break;c[Wa>>2]=c[Wa>>2]|1;Ra=Ac;Na=zc;p=Cc}c[h+(qc<<2)>>2]=Bc;nc=Ac;oc=zc;pc=Cc;qc=vc}p=wc&127;if((p|0)==(qc|0)){c[h+(vc+-1<<2)>>2]=0;Dc=vc}else Dc=qc;fa=+((c[h+(p<<2)>>2]|0)>>>0);p=wc+1&127;if((p|0)==(Dc|0)){Na=Dc+1&127;c[h+(Na+-1<<2)>>2]=0;Ec=Na}else Ec=Dc;ta=+(r|0);Fc=ta*(fa*1.0e9+ +((c[h+(p<<2)>>2]|0)>>>0));p=xc+53|0;Na=p-k|0;if((Na|0)<(j|0))if((Na|0)<0){Gc=0;Hc=1;x=244}else{Ic=Na;Jc=1;x=243}else{Ic=j;Jc=0;x=243}if((x|0)==243)if((Ic|0)<53){Gc=Ic;Hc=Jc;x=244}else{Kc=Ic;Lc=0.0;Mc=Jc;Nc=0.0;Oc=Fc}if((x|0)==244){fa=+Ee(+_b(1.0,105-Gc|0),Fc);Pc=+Ie(Fc,+_b(1.0,53-Gc|0));Kc=Gc;Lc=fa;Mc=Hc;Nc=Pc;Oc=fa+(Fc-Pc)}Ra=wc+2&127;do if((Ra|0)==(Ec|0))Qc=Nc;else{Wa=c[h+(Ra<<2)>>2]|0;do if(Wa>>>0>=5e8){if(Wa>>>0>5e8){Rc=ta*.75+Nc;break}if((wc+3&127|0)==(Ec|0)){Rc=ta*.5+Nc;break}else{Rc=ta*.75+Nc;break}}else{if((Wa|0)==0?(wc+3&127|0)==(Ec|0):0){Rc=Nc;break}Rc=ta*.25+Nc}while(0);if((53-Kc|0)<=1){Qc=Rc;break}if(+Ie(Rc,1.0)!=0.0){Qc=Rc;break}Qc=Rc+1.0}while(0);ta=Oc+Qc-Lc;do if((p&2147483647|0)>(-2-la|0)){if(!(+P(+ta)>=9007199254740992.0)){Sc=Mc;Tc=xc;Uc=ta}else{Sc=(Mc|0)!=0&(Kc|0)==(Na|0)?0:Mc;Tc=xc+1|0;Uc=ta*.5}if((Tc+50|0)<=(pa|0)?!((Sc|0)!=0&Qc!=0.0):0){Vc=Tc;Wc=Uc;break}c[(Ia()|0)>>2]=34;Vc=Tc;Wc=Uc}else{Vc=xc;Wc=ta}while(0);l=+Fe(Wc,Vc);i=g;return +l}else if((z|0)==3){pa=c[e>>2]|0;if(pa>>>0<(c[m>>2]|0)>>>0){c[e>>2]=pa+1;Xc=d[pa>>0]|0}else Xc=Wb(b)|0;if((Xc|0)==40)Yc=1;else{if(!(c[m>>2]|0)){l=t;i=g;return +l}c[e>>2]=(c[e>>2]|0)+-1;l=t;i=g;return +l}while(1){pa=c[e>>2]|0;if(pa>>>0<(c[m>>2]|0)>>>0){c[e>>2]=pa+1;Zc=d[pa>>0]|0}else Zc=Wb(b)|0;if(!((Zc+-48|0)>>>0<10|(Zc+-65|0)>>>0<26)?!((Zc+-97|0)>>>0<26|(Zc|0)==95):0)break;Yc=Yc+1|0}if((Zc|0)==41){l=t;i=g;return +l}pa=(c[m>>2]|0)==0;if(!pa)c[e>>2]=(c[e>>2]|0)+-1;if(!w){c[(Ia()|0)>>2]=22;ed(b,0);l=0.0;i=g;return +l}if((Yc|0)==0|pa){l=t;i=g;return +l}else _c=Yc;do{_c=_c+-1|0;c[e>>2]=(c[e>>2]|0)+-1}while((_c|0)!=0);l=t;i=g;return +l}else{if(c[m>>2]|0)c[e>>2]=(c[e>>2]|0)+-1;c[(Ia()|0)>>2]=22;ed(b,0);l=0.0;i=g;return +l}}while(0);if((x|0)==23){x=(c[m>>2]|0)==0;if(!x)c[e>>2]=(c[e>>2]|0)+-1;if(!(v>>>0<4|(f|0)==0|x)){x=v;do{c[e>>2]=(c[e>>2]|0)+-1;x=x+-1|0}while(x>>>0>3)}}l=+(r|0)*u;i=g;return +l}function $a(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0;b=i;if(!a){i=b;return}d=a+-8|0;e=c[22]|0;if(d>>>0<e>>>0)Na();f=c[a+-4>>2]|0;g=f&3;if((g|0)==1)Na();h=f&-8;j=a+(h+-8)|0;do if(!(f&1)){k=c[d>>2]|0;if(!g){i=b;return}l=-8-k|0;m=a+l|0;n=k+h|0;if(m>>>0<e>>>0)Na();if((m|0)==(c[23]|0)){o=a+(h+-4)|0;p=c[o>>2]|0;if((p&3|0)!=3){q=m;r=n;break}c[20]=n;c[o>>2]=p&-2;c[a+(l+4)>>2]=n|1;c[j>>2]=n;i=b;return}p=k>>>3;if(k>>>0<256){k=c[a+(l+8)>>2]|0;o=c[a+(l+12)>>2]|0;s=112+(p<<1<<2)|0;if((k|0)!=(s|0)){if(k>>>0<e>>>0)Na();if((c[k+12>>2]|0)!=(m|0))Na()}if((o|0)==(k|0)){c[18]=c[18]&~(1<<p);q=m;r=n;break}if((o|0)!=(s|0)){if(o>>>0<e>>>0)Na();s=o+8|0;if((c[s>>2]|0)==(m|0))t=s;else Na()}else t=o+8|0;c[k+12>>2]=o;c[t>>2]=k;q=m;r=n;break}k=c[a+(l+24)>>2]|0;o=c[a+(l+12)>>2]|0;do if((o|0)==(m|0)){s=a+(l+20)|0;p=c[s>>2]|0;if(!p){u=a+(l+16)|0;v=c[u>>2]|0;if(!v){w=0;break}else{x=v;y=u}}else{x=p;y=s}while(1){s=x+20|0;p=c[s>>2]|0;if(p){x=p;y=s;continue}s=x+16|0;p=c[s>>2]|0;if(!p)break;else{x=p;y=s}}if(y>>>0<e>>>0)Na();else{c[y>>2]=0;w=x;break}}else{s=c[a+(l+8)>>2]|0;if(s>>>0<e>>>0)Na();p=s+12|0;if((c[p>>2]|0)!=(m|0))Na();u=o+8|0;if((c[u>>2]|0)==(m|0)){c[p>>2]=o;c[u>>2]=s;w=o;break}else Na()}while(0);if(k){o=c[a+(l+28)>>2]|0;s=376+(o<<2)|0;if((m|0)==(c[s>>2]|0)){c[s>>2]=w;if(!w){c[19]=c[19]&~(1<<o);q=m;r=n;break}}else{if(k>>>0<(c[22]|0)>>>0)Na();o=k+16|0;if((c[o>>2]|0)==(m|0))c[o>>2]=w;else c[k+20>>2]=w;if(!w){q=m;r=n;break}}o=c[22]|0;if(w>>>0<o>>>0)Na();c[w+24>>2]=k;s=c[a+(l+16)>>2]|0;do if(s)if(s>>>0<o>>>0)Na();else{c[w+16>>2]=s;c[s+24>>2]=w;break}while(0);s=c[a+(l+20)>>2]|0;if(s)if(s>>>0<(c[22]|0)>>>0)Na();else{c[w+20>>2]=s;c[s+24>>2]=w;q=m;r=n;break}else{q=m;r=n}}else{q=m;r=n}}else{q=d;r=h}while(0);if(q>>>0>=j>>>0)Na();d=a+(h+-4)|0;w=c[d>>2]|0;if(!(w&1))Na();if(!(w&2)){if((j|0)==(c[24]|0)){e=(c[21]|0)+r|0;c[21]=e;c[24]=q;c[q+4>>2]=e|1;if((q|0)!=(c[23]|0)){i=b;return}c[23]=0;c[20]=0;i=b;return}if((j|0)==(c[23]|0)){e=(c[20]|0)+r|0;c[20]=e;c[23]=q;c[q+4>>2]=e|1;c[q+e>>2]=e;i=b;return}e=(w&-8)+r|0;x=w>>>3;do if(w>>>0>=256){y=c[a+(h+16)>>2]|0;t=c[a+(h|4)>>2]|0;do if((t|0)==(j|0)){g=a+(h+12)|0;f=c[g>>2]|0;if(!f){s=a+(h+8)|0;o=c[s>>2]|0;if(!o){z=0;break}else{A=o;B=s}}else{A=f;B=g}while(1){g=A+20|0;f=c[g>>2]|0;if(f){A=f;B=g;continue}g=A+16|0;f=c[g>>2]|0;if(!f)break;else{A=f;B=g}}if(B>>>0<(c[22]|0)>>>0)Na();else{c[B>>2]=0;z=A;break}}else{g=c[a+h>>2]|0;if(g>>>0<(c[22]|0)>>>0)Na();f=g+12|0;if((c[f>>2]|0)!=(j|0))Na();s=t+8|0;if((c[s>>2]|0)==(j|0)){c[f>>2]=t;c[s>>2]=g;z=t;break}else Na()}while(0);if(y){t=c[a+(h+20)>>2]|0;n=376+(t<<2)|0;if((j|0)==(c[n>>2]|0)){c[n>>2]=z;if(!z){c[19]=c[19]&~(1<<t);break}}else{if(y>>>0<(c[22]|0)>>>0)Na();t=y+16|0;if((c[t>>2]|0)==(j|0))c[t>>2]=z;else c[y+20>>2]=z;if(!z)break}t=c[22]|0;if(z>>>0<t>>>0)Na();c[z+24>>2]=y;n=c[a+(h+8)>>2]|0;do if(n)if(n>>>0<t>>>0)Na();else{c[z+16>>2]=n;c[n+24>>2]=z;break}while(0);n=c[a+(h+12)>>2]|0;if(n)if(n>>>0<(c[22]|0)>>>0)Na();else{c[z+20>>2]=n;c[n+24>>2]=z;break}}}else{n=c[a+h>>2]|0;t=c[a+(h|4)>>2]|0;y=112+(x<<1<<2)|0;if((n|0)!=(y|0)){if(n>>>0<(c[22]|0)>>>0)Na();if((c[n+12>>2]|0)!=(j|0))Na()}if((t|0)==(n|0)){c[18]=c[18]&~(1<<x);break}if((t|0)!=(y|0)){if(t>>>0<(c[22]|0)>>>0)Na();y=t+8|0;if((c[y>>2]|0)==(j|0))C=y;else Na()}else C=t+8|0;c[n+12>>2]=t;c[C>>2]=n}while(0);c[q+4>>2]=e|1;c[q+e>>2]=e;if((q|0)==(c[23]|0)){c[20]=e;i=b;return}else D=e}else{c[d>>2]=w&-2;c[q+4>>2]=r|1;c[q+r>>2]=r;D=r}r=D>>>3;if(D>>>0<256){w=r<<1;d=112+(w<<2)|0;e=c[18]|0;C=1<<r;if(e&C){r=112+(w+2<<2)|0;j=c[r>>2]|0;if(j>>>0<(c[22]|0)>>>0)Na();else{E=r;F=j}}else{c[18]=e|C;E=112+(w+2<<2)|0;F=d}c[E>>2]=q;c[F+12>>2]=q;c[q+8>>2]=F;c[q+12>>2]=d;i=b;return}d=D>>>8;if(d)if(D>>>0>16777215)G=31;else{F=(d+1048320|0)>>>16&8;E=d<<F;d=(E+520192|0)>>>16&4;w=E<<d;E=(w+245760|0)>>>16&2;C=14-(d|F|E)+(w<<E>>>15)|0;G=D>>>(C+7|0)&1|C<<1}else G=0;C=376+(G<<2)|0;c[q+28>>2]=G;c[q+20>>2]=0;c[q+16>>2]=0;E=c[19]|0;w=1<<G;a:do if(E&w){F=c[C>>2]|0;if((G|0)==31)H=0;else H=25-(G>>>1)|0;b:do if((c[F+4>>2]&-8|0)!=(D|0)){d=D<<H;e=F;while(1){I=e+(d>>>31<<2)+16|0;j=c[I>>2]|0;if(!j)break;if((c[j+4>>2]&-8|0)==(D|0)){J=j;break b}else{d=d<<1;e=j}}if(I>>>0<(c[22]|0)>>>0)Na();else{c[I>>2]=q;c[q+24>>2]=e;c[q+12>>2]=q;c[q+8>>2]=q;break a}}else J=F;while(0);F=J+8|0;d=c[F>>2]|0;j=c[22]|0;if(J>>>0>=j>>>0&d>>>0>=j>>>0){c[d+12>>2]=q;c[F>>2]=q;c[q+8>>2]=d;c[q+12>>2]=J;c[q+24>>2]=0;break}else Na()}else{c[19]=E|w;c[C>>2]=q;c[q+24>>2]=C;c[q+12>>2]=q;c[q+8>>2]=q}while(0);q=(c[26]|0)+-1|0;c[26]=q;if(!q)K=528|0;else{i=b;return}while(1){q=c[K>>2]|0;if(!q)break;else K=q+8|0}c[26]=-1;i=b;return}function ab(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;d=i;e=a+b|0;f=c[a+4>>2]|0;do if(!(f&1)){g=c[a>>2]|0;if(!(f&3)){i=d;return}h=a+(0-g)|0;j=g+b|0;k=c[22]|0;if(h>>>0<k>>>0)Na();if((h|0)==(c[23]|0)){l=a+(b+4)|0;m=c[l>>2]|0;if((m&3|0)!=3){n=h;o=j;break}c[20]=j;c[l>>2]=m&-2;c[a+(4-g)>>2]=j|1;c[e>>2]=j;i=d;return}m=g>>>3;if(g>>>0<256){l=c[a+(8-g)>>2]|0;p=c[a+(12-g)>>2]|0;q=112+(m<<1<<2)|0;if((l|0)!=(q|0)){if(l>>>0<k>>>0)Na();if((c[l+12>>2]|0)!=(h|0))Na()}if((p|0)==(l|0)){c[18]=c[18]&~(1<<m);n=h;o=j;break}if((p|0)!=(q|0)){if(p>>>0<k>>>0)Na();q=p+8|0;if((c[q>>2]|0)==(h|0))r=q;else Na()}else r=p+8|0;c[l+12>>2]=p;c[r>>2]=l;n=h;o=j;break}l=c[a+(24-g)>>2]|0;p=c[a+(12-g)>>2]|0;do if((p|0)==(h|0)){q=16-g|0;m=a+(q+4)|0;s=c[m>>2]|0;if(!s){t=a+q|0;q=c[t>>2]|0;if(!q){u=0;break}else{v=q;w=t}}else{v=s;w=m}while(1){m=v+20|0;s=c[m>>2]|0;if(s){v=s;w=m;continue}m=v+16|0;s=c[m>>2]|0;if(!s)break;else{v=s;w=m}}if(w>>>0<k>>>0)Na();else{c[w>>2]=0;u=v;break}}else{m=c[a+(8-g)>>2]|0;if(m>>>0<k>>>0)Na();s=m+12|0;if((c[s>>2]|0)!=(h|0))Na();t=p+8|0;if((c[t>>2]|0)==(h|0)){c[s>>2]=p;c[t>>2]=m;u=p;break}else Na()}while(0);if(l){p=c[a+(28-g)>>2]|0;k=376+(p<<2)|0;if((h|0)==(c[k>>2]|0)){c[k>>2]=u;if(!u){c[19]=c[19]&~(1<<p);n=h;o=j;break}}else{if(l>>>0<(c[22]|0)>>>0)Na();p=l+16|0;if((c[p>>2]|0)==(h|0))c[p>>2]=u;else c[l+20>>2]=u;if(!u){n=h;o=j;break}}p=c[22]|0;if(u>>>0<p>>>0)Na();c[u+24>>2]=l;k=16-g|0;m=c[a+k>>2]|0;do if(m)if(m>>>0<p>>>0)Na();else{c[u+16>>2]=m;c[m+24>>2]=u;break}while(0);m=c[a+(k+4)>>2]|0;if(m)if(m>>>0<(c[22]|0)>>>0)Na();else{c[u+20>>2]=m;c[m+24>>2]=u;n=h;o=j;break}else{n=h;o=j}}else{n=h;o=j}}else{n=a;o=b}while(0);u=c[22]|0;if(e>>>0<u>>>0)Na();v=a+(b+4)|0;w=c[v>>2]|0;if(!(w&2)){if((e|0)==(c[24]|0)){r=(c[21]|0)+o|0;c[21]=r;c[24]=n;c[n+4>>2]=r|1;if((n|0)!=(c[23]|0)){i=d;return}c[23]=0;c[20]=0;i=d;return}if((e|0)==(c[23]|0)){r=(c[20]|0)+o|0;c[20]=r;c[23]=n;c[n+4>>2]=r|1;c[n+r>>2]=r;i=d;return}r=(w&-8)+o|0;f=w>>>3;do if(w>>>0>=256){m=c[a+(b+24)>>2]|0;p=c[a+(b+12)>>2]|0;do if((p|0)==(e|0)){g=a+(b+20)|0;l=c[g>>2]|0;if(!l){t=a+(b+16)|0;s=c[t>>2]|0;if(!s){x=0;break}else{y=s;z=t}}else{y=l;z=g}while(1){g=y+20|0;l=c[g>>2]|0;if(l){y=l;z=g;continue}g=y+16|0;l=c[g>>2]|0;if(!l)break;else{y=l;z=g}}if(z>>>0<u>>>0)Na();else{c[z>>2]=0;x=y;break}}else{g=c[a+(b+8)>>2]|0;if(g>>>0<u>>>0)Na();l=g+12|0;if((c[l>>2]|0)!=(e|0))Na();t=p+8|0;if((c[t>>2]|0)==(e|0)){c[l>>2]=p;c[t>>2]=g;x=p;break}else Na()}while(0);if(m){p=c[a+(b+28)>>2]|0;j=376+(p<<2)|0;if((e|0)==(c[j>>2]|0)){c[j>>2]=x;if(!x){c[19]=c[19]&~(1<<p);break}}else{if(m>>>0<(c[22]|0)>>>0)Na();p=m+16|0;if((c[p>>2]|0)==(e|0))c[p>>2]=x;else c[m+20>>2]=x;if(!x)break}p=c[22]|0;if(x>>>0<p>>>0)Na();c[x+24>>2]=m;j=c[a+(b+16)>>2]|0;do if(j)if(j>>>0<p>>>0)Na();else{c[x+16>>2]=j;c[j+24>>2]=x;break}while(0);j=c[a+(b+20)>>2]|0;if(j)if(j>>>0<(c[22]|0)>>>0)Na();else{c[x+20>>2]=j;c[j+24>>2]=x;break}}}else{j=c[a+(b+8)>>2]|0;p=c[a+(b+12)>>2]|0;m=112+(f<<1<<2)|0;if((j|0)!=(m|0)){if(j>>>0<u>>>0)Na();if((c[j+12>>2]|0)!=(e|0))Na()}if((p|0)==(j|0)){c[18]=c[18]&~(1<<f);break}if((p|0)!=(m|0)){if(p>>>0<u>>>0)Na();m=p+8|0;if((c[m>>2]|0)==(e|0))A=m;else Na()}else A=p+8|0;c[j+12>>2]=p;c[A>>2]=j}while(0);c[n+4>>2]=r|1;c[n+r>>2]=r;if((n|0)==(c[23]|0)){c[20]=r;i=d;return}else B=r}else{c[v>>2]=w&-2;c[n+4>>2]=o|1;c[n+o>>2]=o;B=o}o=B>>>3;if(B>>>0<256){w=o<<1;v=112+(w<<2)|0;r=c[18]|0;A=1<<o;if(r&A){o=112+(w+2<<2)|0;e=c[o>>2]|0;if(e>>>0<(c[22]|0)>>>0)Na();else{C=o;D=e}}else{c[18]=r|A;C=112+(w+2<<2)|0;D=v}c[C>>2]=n;c[D+12>>2]=n;c[n+8>>2]=D;c[n+12>>2]=v;i=d;return}v=B>>>8;if(v)if(B>>>0>16777215)E=31;else{D=(v+1048320|0)>>>16&8;C=v<<D;v=(C+520192|0)>>>16&4;w=C<<v;C=(w+245760|0)>>>16&2;A=14-(v|D|C)+(w<<C>>>15)|0;E=B>>>(A+7|0)&1|A<<1}else E=0;A=376+(E<<2)|0;c[n+28>>2]=E;c[n+20>>2]=0;c[n+16>>2]=0;C=c[19]|0;w=1<<E;if(!(C&w)){c[19]=C|w;c[A>>2]=n;c[n+24>>2]=A;c[n+12>>2]=n;c[n+8>>2]=n;i=d;return}w=c[A>>2]|0;if((E|0)==31)F=0;else F=25-(E>>>1)|0;a:do if((c[w+4>>2]&-8|0)==(B|0))G=w;else{E=B<<F;A=w;while(1){H=A+(E>>>31<<2)+16|0;C=c[H>>2]|0;if(!C)break;if((c[C+4>>2]&-8|0)==(B|0)){G=C;break a}else{E=E<<1;A=C}}if(H>>>0<(c[22]|0)>>>0)Na();c[H>>2]=n;c[n+24>>2]=A;c[n+12>>2]=n;c[n+8>>2]=n;i=d;return}while(0);H=G+8|0;B=c[H>>2]|0;w=c[22]|0;if(!(G>>>0>=w>>>0&B>>>0>=w>>>0))Na();c[B+12>>2]=n;c[H>>2]=n;c[n+8>>2]=B;c[n+12>>2]=G;c[n+24>>2]=0;i=d;return}function bb(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0;j=i;if(e>>>0>36){c[(Ia()|0)>>2]=22;k=0;l=0;E=k;i=j;return l|0}m=b+4|0;n=b+100|0;do{o=c[m>>2]|0;if(o>>>0<(c[n>>2]|0)>>>0){c[m>>2]=o+1;p=d[o>>0]|0}else p=Wb(b)|0}while((Ce(p)|0)!=0);do if((p|0)==43|(p|0)==45){o=((p|0)==45)<<31>>31;q=c[m>>2]|0;if(q>>>0<(c[n>>2]|0)>>>0){c[m>>2]=q+1;r=d[q>>0]|0;s=o;break}else{r=Wb(b)|0;s=o;break}}else{r=p;s=0}while(0);p=(e|0)==0;do if((e&-17|0)==0&(r|0)==48){o=c[m>>2]|0;if(o>>>0<(c[n>>2]|0)>>>0){c[m>>2]=o+1;t=d[o>>0]|0}else t=Wb(b)|0;if((t|32|0)!=120)if(p){u=8;v=t;w=46;break}else{x=e;y=t;w=32;break}o=c[m>>2]|0;if(o>>>0<(c[n>>2]|0)>>>0){c[m>>2]=o+1;z=d[o>>0]|0}else z=Wb(b)|0;if((d[z+665>>0]|0)>15){o=(c[n>>2]|0)==0;if(!o)c[m>>2]=(c[m>>2]|0)+-1;if(!f){ed(b,0);k=0;l=0;E=k;i=j;return l|0}if(o){k=0;l=0;E=k;i=j;return l|0}c[m>>2]=(c[m>>2]|0)+-1;k=0;l=0;E=k;i=j;return l|0}else{u=16;v=z;w=46}}else{o=p?10:e;if((d[r+665>>0]|0)>>>0<o>>>0){x=o;y=r;w=32}else{if(c[n>>2]|0)c[m>>2]=(c[m>>2]|0)+-1;ed(b,0);c[(Ia()|0)>>2]=22;k=0;l=0;E=k;i=j;return l|0}}while(0);if((w|0)==32)if((x|0)==10){r=y+-48|0;if(r>>>0<10){e=r;r=0;do{r=(r*10|0)+e|0;p=c[m>>2]|0;if(p>>>0<(c[n>>2]|0)>>>0){c[m>>2]=p+1;A=d[p>>0]|0}else A=Wb(b)|0;e=A+-48|0}while(e>>>0<10&r>>>0<429496729);B=r;C=0;D=A}else{B=0;C=0;D=y}A=D+-48|0;if(A>>>0<10){r=B;e=C;p=A;A=D;while(1){D=Dd(r|0,e|0,10,0)|0;z=E;f=((p|0)<0)<<31>>31;t=~f;if(z>>>0>t>>>0|(z|0)==(t|0)&D>>>0>~p>>>0){F=p;G=r;H=e;I=A;break}t=_d(D|0,z|0,p|0,f|0)|0;f=E;z=c[m>>2]|0;if(z>>>0<(c[n>>2]|0)>>>0){c[m>>2]=z+1;J=d[z>>0]|0}else J=Wb(b)|0;z=J+-48|0;if(z>>>0<10&(f>>>0<429496729|(f|0)==429496729&t>>>0<2576980378)){r=t;e=f;p=z;A=J}else{F=z;G=t;H=f;I=J;break}}if(F>>>0>9){K=H;L=G}else{M=10;N=G;O=H;P=I;w=72}}else{K=C;L=B}}else{u=x;v=y;w=46}a:do if((w|0)==46){if(!(u+-1&u)){y=a[928+((u*23|0)>>>5&7)>>0]|0;x=a[v+665>>0]|0;B=x&255;if(B>>>0<u>>>0){C=B;B=0;do{B=C|B<<y;I=c[m>>2]|0;if(I>>>0<(c[n>>2]|0)>>>0){c[m>>2]=I+1;Q=d[I>>0]|0}else Q=Wb(b)|0;R=a[Q+665>>0]|0;C=R&255}while(C>>>0<u>>>0&B>>>0<134217728);S=R;T=0;U=B;V=Q}else{S=x;T=0;U=0;V=v}C=Vd(-1,-1,y|0)|0;I=E;if((S&255)>>>0>=u>>>0|(T>>>0>I>>>0|(T|0)==(I|0)&U>>>0>C>>>0)){M=u;N=U;O=T;P=V;w=72;break}else{W=U;X=T;Y=S}while(1){H=Td(W|0,X|0,y|0)|0;G=E;F=Y&255|H;H=c[m>>2]|0;if(H>>>0<(c[n>>2]|0)>>>0){c[m>>2]=H+1;Z=d[H>>0]|0}else Z=Wb(b)|0;Y=a[Z+665>>0]|0;if((Y&255)>>>0>=u>>>0|(G>>>0>I>>>0|(G|0)==(I|0)&F>>>0>C>>>0)){M=u;N=F;O=G;P=Z;w=72;break a}else{W=F;X=G}}}C=a[v+665>>0]|0;I=C&255;if(I>>>0<u>>>0){y=I;I=0;do{I=y+(aa(I,u)|0)|0;x=c[m>>2]|0;if(x>>>0<(c[n>>2]|0)>>>0){c[m>>2]=x+1;_=d[x>>0]|0}else _=Wb(b)|0;$=a[_+665>>0]|0;y=$&255}while(y>>>0<u>>>0&I>>>0<119304647);ba=$;ca=I;da=0;ea=_}else{ba=C;ca=0;da=0;ea=v}if((ba&255)>>>0<u>>>0){y=re(-1,-1,u|0,0)|0;x=E;B=da;G=ca;F=ba;H=ea;while(1){if(B>>>0>x>>>0|(B|0)==(x|0)&G>>>0>y>>>0){M=u;N=G;O=B;P=H;w=72;break a}J=Dd(G|0,B|0,u|0,0)|0;A=E;p=F&255;if(A>>>0>4294967295|(A|0)==-1&J>>>0>~p>>>0){M=u;N=G;O=B;P=H;w=72;break a}e=_d(p|0,0,J|0,A|0)|0;A=E;J=c[m>>2]|0;if(J>>>0<(c[n>>2]|0)>>>0){c[m>>2]=J+1;fa=d[J>>0]|0}else fa=Wb(b)|0;F=a[fa+665>>0]|0;if((F&255)>>>0>=u>>>0){M=u;N=e;O=A;P=fa;w=72;break}else{B=A;G=e;H=fa}}}else{M=u;N=ca;O=da;P=ea;w=72}}while(0);if((w|0)==72)if((d[P+665>>0]|0)>>>0<M>>>0){do{P=c[m>>2]|0;if(P>>>0<(c[n>>2]|0)>>>0){c[m>>2]=P+1;ga=d[P>>0]|0}else ga=Wb(b)|0}while((d[ga+665>>0]|0)>>>0<M>>>0);c[(Ia()|0)>>2]=34;K=h;L=g}else{K=O;L=N}if(c[n>>2]|0)c[m>>2]=(c[m>>2]|0)+-1;if(!(K>>>0<h>>>0|(K|0)==(h|0)&L>>>0<g>>>0)){if(!((g&1|0)!=0|0!=0|(s|0)!=0)){c[(Ia()|0)>>2]=34;m=_d(g|0,h|0,-1,-1)|0;k=E;l=m;E=k;i=j;return l|0}if(K>>>0>h>>>0|(K|0)==(h|0)&L>>>0>g>>>0){c[(Ia()|0)>>2]=34;k=h;l=g;E=k;i=j;return l|0}}g=((s|0)<0)<<31>>31;h=Ld(L^s|0,K^g|0,s|0,g|0)|0;k=E;l=h;E=k;i=j;return l|0}function cb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;d=i;e=a+4|0;f=c[e>>2]|0;g=f&-8;h=a+g|0;j=c[22]|0;k=f&3;if(!((k|0)!=1&a>>>0>=j>>>0&a>>>0<h>>>0))Na();l=a+(g|4)|0;m=c[l>>2]|0;if(!(m&1))Na();if(!k){if(b>>>0<256){n=0;i=d;return n|0}if(g>>>0>=(b+4|0)>>>0?(g-b|0)>>>0<=c[138]<<1>>>0:0){n=a;i=d;return n|0}n=0;i=d;return n|0}if(g>>>0>=b>>>0){k=g-b|0;if(k>>>0<=15){n=a;i=d;return n|0}c[e>>2]=f&1|b|2;c[a+(b+4)>>2]=k|3;c[l>>2]=c[l>>2]|1;ab(a+b|0,k);n=a;i=d;return n|0}if((h|0)==(c[24]|0)){k=(c[21]|0)+g|0;if(k>>>0<=b>>>0){n=0;i=d;return n|0}l=k-b|0;c[e>>2]=f&1|b|2;c[a+(b+4)>>2]=l|1;c[24]=a+b;c[21]=l;n=a;i=d;return n|0}if((h|0)==(c[23]|0)){l=(c[20]|0)+g|0;if(l>>>0<b>>>0){n=0;i=d;return n|0}k=l-b|0;if(k>>>0>15){c[e>>2]=f&1|b|2;c[a+(b+4)>>2]=k|1;c[a+l>>2]=k;o=a+(l+4)|0;c[o>>2]=c[o>>2]&-2;p=a+b|0;q=k}else{c[e>>2]=f&1|l|2;k=a+(l+4)|0;c[k>>2]=c[k>>2]|1;p=0;q=0}c[20]=q;c[23]=p;n=a;i=d;return n|0}if(m&2){n=0;i=d;return n|0}p=(m&-8)+g|0;if(p>>>0<b>>>0){n=0;i=d;return n|0}q=p-b|0;k=m>>>3;do if(m>>>0>=256){l=c[a+(g+24)>>2]|0;o=c[a+(g+12)>>2]|0;do if((o|0)==(h|0)){r=a+(g+20)|0;s=c[r>>2]|0;if(!s){t=a+(g+16)|0;u=c[t>>2]|0;if(!u){v=0;break}else{w=u;x=t}}else{w=s;x=r}while(1){r=w+20|0;s=c[r>>2]|0;if(s){w=s;x=r;continue}r=w+16|0;s=c[r>>2]|0;if(!s)break;else{w=s;x=r}}if(x>>>0<j>>>0)Na();else{c[x>>2]=0;v=w;break}}else{r=c[a+(g+8)>>2]|0;if(r>>>0<j>>>0)Na();s=r+12|0;if((c[s>>2]|0)!=(h|0))Na();t=o+8|0;if((c[t>>2]|0)==(h|0)){c[s>>2]=o;c[t>>2]=r;v=o;break}else Na()}while(0);if(l){o=c[a+(g+28)>>2]|0;r=376+(o<<2)|0;if((h|0)==(c[r>>2]|0)){c[r>>2]=v;if(!v){c[19]=c[19]&~(1<<o);break}}else{if(l>>>0<(c[22]|0)>>>0)Na();o=l+16|0;if((c[o>>2]|0)==(h|0))c[o>>2]=v;else c[l+20>>2]=v;if(!v)break}o=c[22]|0;if(v>>>0<o>>>0)Na();c[v+24>>2]=l;r=c[a+(g+16)>>2]|0;do if(r)if(r>>>0<o>>>0)Na();else{c[v+16>>2]=r;c[r+24>>2]=v;break}while(0);r=c[a+(g+20)>>2]|0;if(r)if(r>>>0<(c[22]|0)>>>0)Na();else{c[v+20>>2]=r;c[r+24>>2]=v;break}}}else{r=c[a+(g+8)>>2]|0;o=c[a+(g+12)>>2]|0;l=112+(k<<1<<2)|0;if((r|0)!=(l|0)){if(r>>>0<j>>>0)Na();if((c[r+12>>2]|0)!=(h|0))Na()}if((o|0)==(r|0)){c[18]=c[18]&~(1<<k);break}if((o|0)!=(l|0)){if(o>>>0<j>>>0)Na();l=o+8|0;if((c[l>>2]|0)==(h|0))y=l;else Na()}else y=o+8|0;c[r+12>>2]=o;c[y>>2]=r}while(0);if(q>>>0<16){c[e>>2]=p|f&1|2;y=a+(p|4)|0;c[y>>2]=c[y>>2]|1;n=a;i=d;return n|0}else{c[e>>2]=f&1|b|2;c[a+(b+4)>>2]=q|3;f=a+(p|4)|0;c[f>>2]=c[f>>2]|1;ab(a+b|0,q);n=a;i=d;return n|0}return 0}function db(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0;b=i;i=i+128|0;d=b+64|0;e=b;f=0;do{c[d+(f<<2)>>2]=me(a+(f<<2)|0)|0;f=f+1|0}while((f|0)!=16);f=e+0|0;g=d+0|0;h=f+64|0;do{c[f>>2]=c[g>>2];f=f+4|0;g=g+4|0}while((f|0)<(h|0));g=e+48|0;f=e+16|0;h=e+32|0;j=e+20|0;k=e+4|0;l=e+36|0;m=e+52|0;n=e+40|0;o=e+24|0;p=e+56|0;q=e+8|0;r=e+60|0;s=e+44|0;t=e+12|0;u=e+28|0;v=c[u>>2]|0;w=c[e>>2]|0;x=c[g>>2]|0;y=c[f>>2]|0;z=c[h>>2]|0;A=c[j>>2]|0;B=c[k>>2]|0;C=c[l>>2]|0;D=c[m>>2]|0;E=c[n>>2]|0;F=c[o>>2]|0;G=c[p>>2]|0;H=c[q>>2]|0;I=c[r>>2]|0;J=c[s>>2]|0;K=c[t>>2]|0;L=0;do{M=x+w|0;N=(M<<7|M>>>25)^y;M=N+w|0;O=(M<<9|M>>>23)^z;M=O+N|0;P=(M<<13|M>>>19)^x;M=P+O|0;Q=(M<<18|M>>>14)^w;M=B+A|0;R=(M<<7|M>>>25)^C;M=R+A|0;S=(M<<9|M>>>23)^D;M=S+R|0;T=(M<<13|M>>>19)^B;M=T+S|0;U=(M<<18|M>>>14)^A;M=F+E|0;V=(M<<7|M>>>25)^G;M=V+E|0;W=(M<<9|M>>>23)^H;M=W+V|0;X=(M<<13|M>>>19)^F;M=X+W|0;Y=(M<<18|M>>>14)^E;M=J+I|0;Z=(M<<7|M>>>25)^K;M=Z+I|0;_=(M<<9|M>>>23)^v;M=_+Z|0;$=(M<<13|M>>>19)^J;M=$+_|0;aa=(M<<18|M>>>14)^I;M=Z+Q|0;B=(M<<7|M>>>25)^T;T=B+Q|0;H=(T<<9|T>>>23)^W;W=H+B|0;K=(W<<13|W>>>19)^Z;Z=K+H|0;w=(Z<<18|Z>>>14)^Q;Q=N+U|0;F=(Q<<7|Q>>>25)^X;X=F+U|0;v=(X<<9|X>>>23)^_;_=v+F|0;y=(_<<13|_>>>19)^N;N=y+v|0;A=(N<<18|N>>>14)^U;U=R+Y|0;J=(U<<7|U>>>25)^$;$=J+Y|0;z=($<<9|$>>>23)^O;O=z+J|0;C=(O<<13|O>>>19)^R;R=C+z|0;E=(R<<18|R>>>14)^Y;Y=V+aa|0;x=(Y<<7|Y>>>25)^P;P=x+aa|0;D=(P<<9|P>>>23)^S;S=D+x|0;G=(S<<13|S>>>19)^V;V=G+D|0;I=(V<<18|V>>>14)^aa;L=L+2|0}while(L>>>0<8);c[e>>2]=w;c[g>>2]=x;c[f>>2]=y;c[h>>2]=z;c[j>>2]=A;c[k>>2]=B;c[l>>2]=C;c[m>>2]=D;c[n>>2]=E;c[o>>2]=F;c[p>>2]=G;c[q>>2]=H;c[r>>2]=I;c[s>>2]=J;c[t>>2]=K;c[u>>2]=v;c[d>>2]=(c[d>>2]|0)+(c[e>>2]|0);v=d+4|0;c[v>>2]=(c[v>>2]|0)+(c[e+4>>2]|0);v=d+8|0;c[v>>2]=(c[v>>2]|0)+(c[e+8>>2]|0);v=d+12|0;c[v>>2]=(c[v>>2]|0)+(c[e+12>>2]|0);v=d+16|0;c[v>>2]=(c[v>>2]|0)+(c[e+16>>2]|0);v=d+20|0;c[v>>2]=(c[v>>2]|0)+(c[e+20>>2]|0);v=d+24|0;c[v>>2]=(c[v>>2]|0)+(c[e+24>>2]|0);v=d+28|0;c[v>>2]=(c[v>>2]|0)+(c[e+28>>2]|0);v=d+32|0;c[v>>2]=(c[v>>2]|0)+(c[e+32>>2]|0);v=d+36|0;c[v>>2]=(c[v>>2]|0)+(c[e+36>>2]|0);v=d+40|0;c[v>>2]=(c[v>>2]|0)+(c[e+40>>2]|0);v=d+44|0;c[v>>2]=(c[v>>2]|0)+(c[e+44>>2]|0);v=d+48|0;c[v>>2]=(c[v>>2]|0)+(c[e+48>>2]|0);v=d+52|0;c[v>>2]=(c[v>>2]|0)+(c[e+52>>2]|0);v=d+56|0;c[v>>2]=(c[v>>2]|0)+(c[e+56>>2]|0);v=d+60|0;c[v>>2]=(c[v>>2]|0)+(c[e+60>>2]|0);e=0;do{he(a+(e<<2)|0,c[d+(e<<2)>>2]|0);e=e+1|0}while((e|0)!=16);i=b;return}function eb(a,b){a=+a;b=+b;var d=0,e=0,f=0,g=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0.0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0.0;d=i;h[k>>3]=a;e=c[k>>2]|0;f=c[k+4>>2]|0;h[k>>3]=b;g=c[k>>2]|0;j=c[k+4>>2]|0;l=Vd(e|0,f|0,52)|0;m=l&2047;l=Vd(g|0,j|0,52)|0;n=l&2047;l=f&-2147483648;o=Td(g|0,j|0,1)|0;p=E;if(!((o|0)==0&(p|0)==0)?(q=j&2147483647,!(q>>>0>2146435072|(q|0)==2146435072&g>>>0>0|(m|0)==2047)):0){q=Td(e|0,f|0,1)|0;r=E;if(!(r>>>0>p>>>0|(r|0)==(p|0)&q>>>0>o>>>0)){if(!((q|0)==(o|0)&(r|0)==(p|0))){s=a;i=d;return +s}s=a*0.0;i=d;return +s}if(!m){p=Td(e|0,f|0,12)|0;r=E;if((r|0)>-1|(r|0)==-1&p>>>0>4294967295){o=p;p=r;r=0;while(1){q=r+-1|0;o=Td(o|0,p|0,1)|0;p=E;if(!((p|0)>-1|(p|0)==-1&o>>>0>4294967295)){t=q;break}else r=q}}else t=0;r=Td(e|0,f|0,1-t|0)|0;u=r;v=E;w=t}else{u=e;v=f&1048575|1048576;w=m}if(!n){m=Td(g|0,j|0,12)|0;f=E;if((f|0)>-1|(f|0)==-1&m>>>0>4294967295){e=m;m=f;f=0;while(1){t=f+-1|0;e=Td(e|0,m|0,1)|0;m=E;if(!((m|0)>-1|(m|0)==-1&e>>>0>4294967295)){x=t;break}else f=t}}else x=0;f=Td(g|0,j|0,1-x|0)|0;y=f;z=E;A=x}else{y=g;z=j&1048575|1048576;A=n}n=Ld(u|0,v|0,y|0,z|0)|0;j=E;g=(j|0)>-1|(j|0)==-1&n>>>0>4294967295;a:do if((w|0)>(A|0)){x=g;f=n;e=j;m=u;t=v;r=w;while(1){if(x)if((m|0)==(y|0)&(t|0)==(z|0))break;else{B=f;C=e}else{B=m;C=t}o=Td(B|0,C|0,1)|0;p=E;q=r+-1|0;D=Ld(o|0,p|0,y|0,z|0)|0;F=E;G=(F|0)>-1|(F|0)==-1&D>>>0>4294967295;if((q|0)>(A|0)){x=G;f=D;e=F;m=o;t=p;r=q}else{H=G;I=o;J=p;K=D;L=F;M=q;break a}}s=a*0.0;i=d;return +s}else{H=g;I=u;J=v;K=n;L=j;M=w}while(0);if(H)if((I|0)==(y|0)&(J|0)==(z|0)){s=a*0.0;i=d;return +s}else{N=L;O=K}else{N=J;O=I}if(N>>>0<1048576|(N|0)==1048576&O>>>0<0){I=O;J=N;K=M;while(1){L=Td(I|0,J|0,1)|0;z=E;y=K+-1|0;if(z>>>0<1048576|(z|0)==1048576&L>>>0<0){I=L;J=z;K=y}else{P=L;Q=z;R=y;break}}}else{P=O;Q=N;R=M}if((R|0)>0){M=_d(P|0,Q|0,0,-1048576)|0;N=E;O=Td(R|0,0,52)|0;S=N|E;T=M|O}else{O=Vd(P|0,Q|0,1-R|0)|0;S=E;T=O}c[k>>2]=T;c[k+4>>2]=S|l;s=+h[k>>3];i=d;return +s}U=a*b;s=U/U;i=d;return +s}function fb(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0;g=a;h=b;i=h;j=d;k=e;l=k;if(!i){m=(f|0)!=0;if(!l){if(m){c[f>>2]=(g>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(g>>>0)/(j>>>0)>>>0;return (E=n,o)|0}else{if(!m){n=0;o=0;return (E=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;n=0;o=0;return (E=n,o)|0}}m=(l|0)==0;do if(j){if(!m){p=(pd(l|0)|0)-(pd(i|0)|0)|0;if(p>>>0<=31){q=p+1|0;r=31-p|0;s=p-31>>31;t=q;u=g>>>(q>>>0)&s|i<<r;v=i>>>(q>>>0)&s;w=0;x=g<<r;break}if(!f){n=0;o=0;return (E=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return (E=n,o)|0}r=j-1|0;if(r&j){s=(pd(j|0)|0)+33-(pd(i|0)|0)|0;q=64-s|0;p=32-s|0;y=p>>31;z=s-32|0;A=z>>31;t=s;u=p-1>>31&i>>>(z>>>0)|(i<<p|g>>>(s>>>0))&A;v=A&i>>>(s>>>0);w=g<<q&y;x=(i<<q|g>>>(z>>>0))&y|g<<p&s-33>>31;break}if(f){c[f>>2]=r&g;c[f+4>>2]=0}if((j|0)==1){n=h|b&0;o=a|0|0;return (E=n,o)|0}else{r=od(j|0)|0;n=i>>>(r>>>0)|0;o=i<<32-r|g>>>(r>>>0)|0;return (E=n,o)|0}}else{if(m){if(f){c[f>>2]=(i>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(i>>>0)/(j>>>0)>>>0;return (E=n,o)|0}if(!g){if(f){c[f>>2]=0;c[f+4>>2]=(i>>>0)%(l>>>0)}n=0;o=(i>>>0)/(l>>>0)>>>0;return (E=n,o)|0}r=l-1|0;if(!(r&l)){if(f){c[f>>2]=a|0;c[f+4>>2]=r&i|b&0}n=0;o=i>>>((od(l|0)|0)>>>0);return (E=n,o)|0}r=(pd(l|0)|0)-(pd(i|0)|0)|0;if(r>>>0<=30){s=r+1|0;p=31-r|0;t=s;u=i<<p|g>>>(s>>>0);v=i>>>(s>>>0);w=0;x=g<<p;break}if(!f){n=0;o=0;return (E=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return (E=n,o)|0}while(0);if(!t){B=x;C=w;D=v;F=u;G=0;H=0}else{b=d|0|0;d=k|e&0;e=_d(b,d,-1,-1)|0;k=E;h=x;x=w;w=v;v=u;u=t;t=0;do{a=h;h=x>>>31|h<<1;x=t|x<<1;g=v<<1|a>>>31|0;a=v>>>31|w<<1|0;Ld(e,k,g,a)|0;i=E;l=i>>31|((i|0)<0?-1:0)<<1;t=l&1;v=Ld(g,a,l&b,(((i|0)<0?-1:0)>>31|((i|0)<0?-1:0)<<1)&d)|0;w=E;u=u-1|0}while((u|0)!=0);B=h;C=x;D=w;F=v;G=0;H=t}t=C;C=0;if(f){c[f>>2]=F;c[f+4>>2]=D}n=(t|0)>>>31|(B|C)<<1|(C<<1|t>>>31)&0|G;o=(t<<1|0>>>31)&-2|H;return (E=n,o)|0}function gb(a,b,d){a=+a;b=+b;d=+d;var e=0,f=0,g=0,j=0,l=0,m=0,n=0,o=0,p=0.0,q=0.0,r=0.0,s=0.0,t=0,v=0.0,w=0.0,x=0.0,y=0.0,z=0.0,A=0.0;e=i;i=i+32|0;f=e+16|0;g=e+12|0;j=e+8|0;l=e;h[k>>3]=a;m=c[k+4>>2]&2146435072;if(m>>>0<2146435072|(m|0)==2146435072&0<0?(h[k>>3]=b,m=c[k+4>>2]&2146435072,m>>>0<2146435072|(m|0)==2146435072&0<0):0){h[k>>3]=d;m=c[k>>2]|0;n=c[k+4>>2]|0;o=n&2146435072;if(!(o>>>0<2146435072|(o|0)==2146435072&0<0)){p=d;i=e;return +p}if(a==0.0|b==0.0){p=a*b+d;i=e;return +p}if(d==0.0){p=a*b;i=e;return +p}q=+gc(a,f);r=+gc(b,g);s=+gc(d,j);o=Ef()|0;t=(c[g>>2]|0)+(c[f>>2]|0)|0;f=t-(c[j>>2]|0)|0;if((f|0)<-53){_d(m|0,n|0,0,1048576)|0;if((o|0)==3072){if(a>0.0^b<0.0^d<0.0){p=d;i=e;return +p}p=+va(+d,0.0);i=e;return +p}else if((o|0)==1024){if(a>0.0^b<0.0){p=d;i=e;return +p}p=+va(+d,-u);i=e;return +p}else if((o|0)==2048){if(!(a>0.0^b<0.0)){p=d;i=e;return +p}p=+va(+d,u);i=e;return +p}else{p=d;i=e;return +p}}if((f|0)<107)v=+_b(s,0-f|0);else v=+$c(2.2250738585072014e-308,s);Ka(0)|0;s=q*134217729.0;w=s+(q-s);s=q-w;q=r*134217729.0;x=q+(r-q);q=r-x;r=w*x;y=s*x+w*q;w=r+y;x=s*q+(y+(r-w));r=w+v;y=r-w;q=v-y+(w-(r-y));if(r==0.0){Ka(o|0)|0;h[l>>3]=v;v=w+ +h[l>>3];p=v+ +_b(x,t);i=e;return +p}if(o){l=vf(32)|0;Ka(o|0)|0;v=+_b(r+(x+q),t);if((Ua(+v)|0)<-1022?(vf(32)|0)!=0:0){p=v;i=e;return +p}if(!l){p=v;i=e;return +p}p=v;i=e;return +p}v=x+q;w=v-q;y=x-w+(q-(v-w));if(y!=0.0?(h[k>>3]=v,l=c[k>>2]|0,o=c[k+4>>2]|0,(l&1|0)==0&0==0):0){h[k>>3]=y;f=Vd(c[k>>2]^l|0,c[k+4>>2]^o|0,62)|0;n=E;m=_d(l|0,o|0,1,0)|0;o=Ld(m|0,E|0,f|0,n|0)|0;n=E;c[k>>2]=o;c[k+4>>2]=n;z=+h[k>>3]}else z=v;v=r+z;if(((Ua(+r)|0)+t|0)>-1023){p=+_b(v,t);i=e;return +p}y=v-r;w=z-y+(r-(v-y));if(w!=0.0?(h[k>>3]=v,n=c[k>>2]|0,o=c[k+4>>2]|0,f=Vd(n|0,o|0,52)|0,(t|0)!=(0-(f&2047)|0)^((n&1|0)!=0|0!=0)):0){h[k>>3]=w;f=Vd(c[k>>2]^n|0,c[k+4>>2]^o|0,62)|0;m=_d(n|0,o|0,1,0)|0;o=Ld(m|0,E|0,f&2|0,0)|0;f=E;c[k>>2]=o;c[k+4>>2]=f;A=+h[k>>3]}else A=v;p=+_b(A,t);i=e;return +p}p=a*b+d;i=e;return +p}function hb(a){a=+a;var b=0,d=0,e=0,f=0,j=0,l=0,m=0,n=0.0,o=0.0,p=0.0,q=0,r=0.0,s=0,t=0.0,u=0.0,v=0.0,w=0.0;b=i;i=i+16|0;d=b;h[k>>3]=a;e=c[k>>2]|0;f=c[k+4>>2]|0;j=f&2147483647;l=Vd(e|0,f|0,63)|0;if(j>>>0>1078159481){m=f&2147483647;if(m>>>0>2146435072|(m|0)==2146435072&e>>>0>0){n=a;i=b;return +n}if(l){n=-1.0;i=b;return +n}if(a>709.782712893384){n=a*8988465674311579538646525.0e283;i=b;return +n}}if(j>>>0<=1071001154)if(j>>>0<1016070144){if(j>>>0>=1048576){n=a;i=b;return +n}g[d>>2]=a;n=a;i=b;return +n}else{o=a;p=0.0;q=0}else{do if(j>>>0<1072734898)if(!l){r=a+-.6931471803691238;s=1;t=1.9082149292705877e-10;break}else{r=a+.6931471803691238;s=-1;t=-1.9082149292705877e-10;break}else{d=~~(a*1.4426950408889634+((l|0)!=0?-.5:.5));u=+(d|0);r=a-u*.6931471803691238;s=d;t=u*1.9082149292705877e-10}while(0);a=r-t;o=a;p=r-a-t;q=s}t=o*.5;a=o*t;r=a*(a*(a*(a*(a*-2.0109921818362437e-07+4.008217827329362e-06)+-7.93650757867488e-05)+1.5873015872548146e-03)+-.03333333333333313)+1.0;u=3.0-t*r;t=a*((r-u)/(6.0-o*u));if(!q){n=o-(o*t-a);i=b;return +n}u=o*(t-p)-p-a;if((q|0)==-1){n=(o-u)*.5+-.5;i=b;return +n}else if((q|0)==1)if(o<-.25){n=(u-(o+.5))*-2.0;i=b;return +n}else{n=(o-u)*2.0+1.0;i=b;return +n}else{s=Td(q+1023|0,0,52)|0;l=E;c[k>>2]=s;c[k+4>>2]=l;a=+h[k>>3];if(q>>>0>56){p=o-u+1.0;if((q|0)==1024)v=p*2.0*8988465674311579538646525.0e283;else v=a*p;n=v+-1.0;i=b;return +n}else{l=Td(1023-q|0,0,52)|0;s=E;if((q|0)<20){c[k>>2]=l;c[k+4>>2]=s;w=1.0-+h[k>>3]+(o-u)}else{c[k>>2]=l;c[k+4>>2]=s;w=o-(+h[k>>3]+u)+1.0}n=a*w;i=b;return +n}}return +(0.0)}function ib(a,b){a=+a;b=+b;var d=0,e=0,f=0,h=0,j=0,l=0,m=0,n=0,o=0.0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0.0;d=i;e=(g[k>>2]=a,c[k>>2]|0);f=(g[k>>2]=b,c[k>>2]|0);h=e>>>23&255;j=f>>>23&255;l=e&-2147483648;m=f<<1;if((m|0)!=0?!((f&2147483647)>>>0>2139095040|(h|0)==255):0){n=e<<1;if(n>>>0<=m>>>0){if((n|0)!=(m|0)){o=a;i=d;return +o}o=a*0.0;i=d;return +o}if(!h){m=e<<9;if((m|0)>-1){n=0;p=m;while(1){m=n+-1|0;p=p<<1;if((p|0)<=-1){q=m;break}else n=m}}else q=0;r=q;s=e<<1-q}else{r=h;s=e&8388607|8388608}if(!j){e=f<<9;if((e|0)>-1){h=0;q=e;while(1){e=h+-1|0;q=q<<1;if((q|0)<=-1){t=e;break}else h=e}}else t=0;u=t;v=f<<1-t}else{u=j;v=f&8388607|8388608}f=s-v|0;j=(f|0)>-1;a:do if((r|0)>(u|0)){t=j;h=f;q=r;e=s;while(1){if(t)if((e|0)==(v|0))break;else w=h;else w=e;n=w<<1;p=q+-1|0;m=n-v|0;x=(m|0)>-1;if((p|0)>(u|0)){t=x;h=m;q=p;e=n}else{y=m;z=x;A=p;B=n;break a}}o=a*0.0;i=d;return +o}else{y=f;z=j;A=r;B=s}while(0);if(z)if((B|0)==(v|0)){o=a*0.0;i=d;return +o}else C=y;else C=B;if(C>>>0<8388608){B=A;y=C;while(1){v=y<<1;z=B+-1|0;if(v>>>0<8388608){B=z;y=v}else{D=z;E=v;break}}}else{D=A;E=C}if((D|0)>0)F=E+-8388608|D<<23;else F=E>>>(1-D|0);o=(c[k>>2]=F|l,+g[k>>2]);i=d;return +o}G=a*b;o=G/G;i=d;return +o}function kb(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;e=i;f=a+4|0;g=c[f>>2]|0;h=a+100|0;if(g>>>0<(c[h>>2]|0)>>>0){c[f>>2]=g+1;j=d[g>>0]|0}else j=Wb(a)|0;if((j|0)==43|(j|0)==45){g=c[f>>2]|0;k=(j|0)==45&1;if(g>>>0<(c[h>>2]|0)>>>0){c[f>>2]=g+1;l=d[g>>0]|0}else l=Wb(a)|0;if((l+-48|0)>>>0>9&(b|0)!=0?(c[h>>2]|0)!=0:0){c[f>>2]=(c[f>>2]|0)+-1;m=l;n=k}else{m=l;n=k}}else{m=j;n=0}if((m+-48|0)>>>0>9){if(!(c[h>>2]|0)){o=-2147483648;p=0;E=o;i=e;return p|0}c[f>>2]=(c[f>>2]|0)+-1;o=-2147483648;p=0;E=o;i=e;return p|0}else{q=m;r=0}while(1){r=q+-48+(r*10|0)|0;m=c[f>>2]|0;if(m>>>0<(c[h>>2]|0)>>>0){c[f>>2]=m+1;s=d[m>>0]|0}else s=Wb(a)|0;if(!((s+-48|0)>>>0<10&(r|0)<214748364))break;else q=s}q=((r|0)<0)<<31>>31;if((s+-48|0)>>>0<10){m=r;j=q;k=s;while(1){l=Dd(m|0,j|0,10,0)|0;b=E;g=_d(k|0,((k|0)<0)<<31>>31|0,-48,-1)|0;t=_d(g|0,E|0,l|0,b|0)|0;b=E;l=c[f>>2]|0;if(l>>>0<(c[h>>2]|0)>>>0){c[f>>2]=l+1;u=d[l>>0]|0}else u=Wb(a)|0;if((u+-48|0)>>>0<10&((b|0)<21474836|(b|0)==21474836&t>>>0<2061584302)){m=t;j=b;k=u}else{v=t;w=b;x=u;break}}}else{v=r;w=q;x=s}if((x+-48|0)>>>0<10)do{x=c[f>>2]|0;if(x>>>0<(c[h>>2]|0)>>>0){c[f>>2]=x+1;y=d[x>>0]|0}else y=Wb(a)|0}while((y+-48|0)>>>0<10);if(c[h>>2]|0)c[f>>2]=(c[f>>2]|0)+-1;f=(n|0)!=0;n=Ld(0,0,v|0,w|0)|0;o=f?E:w;p=f?n:v;E=o;i=e;return p|0}function jb(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;f=i;do if(!(c[136]|0)){g=za(30)|0;if(!(g+-1&g)){c[138]=g;c[137]=g;c[139]=-1;c[140]=-1;c[141]=0;c[129]=0;c[136]=(Pa(0)|0)&-16^1431655768;break}else Na()}while(0);g=(a|0)==0;do if(!e)if(g){h=Ya(0)|0;i=f;return h|0}else{j=a<<2;if(j>>>0<11){k=16;l=0;break}k=j+11&-8;l=0;break}else if(g){h=e;i=f;return h|0}else{k=0;l=e}while(0);if(!(d&1))if(g){m=0;n=0}else{g=0;e=0;while(1){j=c[b+(e<<2)>>2]|0;if(j>>>0<11)o=16;else o=j+11&-8;j=o+g|0;e=e+1|0;if((e|0)==(a|0)){m=j;n=0;break}else g=j}}else{g=c[b>>2]|0;if(g>>>0<11)p=16;else p=g+11&-8;m=aa(p,a)|0;n=p}p=Ya(k+-4+m|0)|0;if(!p){h=0;i=f;return h|0}g=p+-8|0;e=c[p+-4>>2]&-8;if(d&2)Xc(p|0,0,-4-k+e|0)|0;if(!l){c[p+(m+-4)>>2]=e-m|3;q=p+m|0;r=m}else{q=l;r=e}c[q>>2]=p;p=a+-1|0;a:do if(!p){s=g;t=r}else{if(!n){u=0;v=g;w=r}else{a=0;e=g;l=r;while(1){m=l-n|0;c[e+4>>2]=n|3;k=e+n|0;a=a+1|0;c[q+(a<<2)>>2]=e+(n+8);if((a|0)==(p|0)){s=k;t=m;break a}else{e=k;l=m}}}while(1){l=c[b+(u<<2)>>2]|0;if(l>>>0<11)x=16;else x=l+11&-8;l=w-x|0;c[v+4>>2]=x|3;e=v+x|0;u=u+1|0;c[q+(u<<2)>>2]=v+(x+8);if((u|0)==(p|0)){s=e;t=l;break}else{v=e;w=l}}}while(0);c[s+4>>2]=t|3;h=q;i=f;return h|0}function lb(a){a=+a;var b=0,d=0,e=0,f=0,h=0,j=0.0,l=0.0,m=0.0,n=0,o=0.0,p=0,q=0.0,r=0.0,s=0.0,t=0.0;b=i;i=i+16|0;d=b;e=(g[k>>2]=a,c[k>>2]|0);f=e&2147483647;h=e>>>31;if(f>>>0>1100331075){if(f>>>0>2139095040){j=a;i=b;return +j}if(h){j=-1.0;i=b;return +j}if(a>88.7216796875){j=a*1701411834604692317316873.0e14;i=b;return +j}}if(f>>>0<=1051816472)if(f>>>0<855638016){if(f>>>0>=8388608){j=a;i=b;return +j}g[d>>2]=a*a;j=a;i=b;return +j}else{l=a;m=0.0;n=0}else{do if(f>>>0<1065686418)if(!h){o=a+-.6931381225585938;p=1;q=9.05800061445916e-06;break}else{o=a+.6931381225585938;p=-1;q=-9.05800061445916e-06;break}else{d=~~(a*1.4426950216293335+((h|0)!=0?-.5:.5));r=+(d|0);o=a-r*.6931381225585938;p=d;q=r*9.05800061445916e-06}while(0);a=o-q;l=a;m=o-a-q;n=p}q=l*.5;a=l*q;o=a*(a*1.5807170420885086e-03+-.03333321213722229)+1.0;r=3.0-q*o;q=a*((o-r)/(6.0-l*r));if(!n){j=l-(l*q-a);i=b;return +j}r=l*(q-m)-m-a;if((n|0)==-1){j=(l-r)*.5+-.5;i=b;return +j}else if((n|0)==1)if(l<-.25){j=(r-(l+.5))*-2.0;i=b;return +j}else{j=(l-r)*2.0+1.0;i=b;return +j}else{a=(c[k>>2]=(n<<23)+1065353216,+g[k>>2]);if(n>>>0>56){m=l-r+1.0;if((n|0)==128)s=m*2.0*1701411834604692317316873.0e14;else s=a*m;j=s+-1.0;i=b;return +j}else{p=127-n<<23;if((n|0)<23)t=1.0-(c[k>>2]=p,+g[k>>2])+(l-r);else t=l-((c[k>>2]=p,+g[k>>2])+r)+1.0;j=a*t;i=b;return +j}}return +(0.0)}function mb(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;b=i;do if(!(c[136]|0)){d=za(30)|0;if(!(d+-1&d)){c[138]=d;c[137]=d;c[139]=-1;c[140]=-1;c[141]=0;c[129]=0;c[136]=(Pa(0)|0)&-16^1431655768;break}else Na()}while(0);d=c[24]|0;if(!d){e=0;f=0;g=0;h=0;j=0;k=0;l=0}else{m=c[21]|0;n=m+40|0;o=n;p=1;q=520|0;r=n;while(1){n=c[q>>2]|0;s=n+8|0;if(!(s&7))t=0;else t=0-s&7;s=n+(c[q+4>>2]|0)|0;u=o;v=p;w=n+t|0;x=r;while(1){if(w>>>0>=s>>>0|(w|0)==(d|0)){y=u;z=v;A=x;break}B=c[w+4>>2]|0;if((B|0)==7){y=u;z=v;A=x;break}C=B&-8;D=C+x|0;if((B&3|0)==1){E=C+u|0;F=v+1|0}else{E=u;F=v}w=w+C|0;if(w>>>0<n>>>0){y=E;z=F;A=D;break}else{u=E;v=F;x=D}}q=c[q+8>>2]|0;if(!q)break;else{o=y;p=z;r=A}}r=c[126]|0;e=A;f=m;g=z;h=r-A|0;j=c[127]|0;k=r-y|0;l=y}c[a>>2]=e;c[a+4>>2]=g;g=a+8|0;c[g>>2]=0;c[g+4>>2]=0;c[a+16>>2]=h;c[a+20>>2]=j;c[a+24>>2]=0;c[a+28>>2]=k;c[a+32>>2]=l;c[a+36>>2]=f;i=b;return}function nb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;f=i;g=d&255;h=(e|0)!=0;a:do if((b&3|0)!=0&h){j=d&255;k=e;l=b;while(1){if((a[l>>0]|0)==j<<24>>24){m=k;n=l;o=6;break a}p=l+1|0;q=k+-1|0;r=(q|0)!=0;if((p&3|0)!=0&r){k=q;l=p}else{s=q;t=r;u=p;o=5;break}}}else{s=e;t=h;u=b;o=5}while(0);if((o|0)==5)if(t){m=s;n=u;o=6}else{v=0;w=u}b:do if((o|0)==6){u=d&255;if((a[n>>0]|0)!=u<<24>>24){s=aa(g,16843009)|0;c:do if(m>>>0>3){t=m;b=n;while(1){h=c[b>>2]^s;if((h&-2139062144^-2139062144)&h+-16843009){x=t;y=b;break c}h=b+4|0;e=t+-4|0;if(e>>>0>3){t=e;b=h}else{x=e;y=h;break}}}else{x=m;y=n}while(0);if(!x){v=0;w=y}else{s=x;b=y;while(1){if((a[b>>0]|0)==u<<24>>24){v=s;w=b;break b}t=b+1|0;s=s+-1|0;if(!s){v=0;w=t;break}else b=t}}}else{v=m;w=n}}while(0);i=f;return ((v|0)!=0?w:0)|0}function pb(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0;b=i;do if(!(c[136]|0)){d=za(30)|0;if(!(d+-1&d)){c[138]=d;c[137]=d;c[139]=-1;c[140]=-1;c[141]=0;c[129]=0;c[136]=(Pa(0)|0)&-16^1431655768;break}else Na()}while(0);if(a>>>0>=4294967232){e=0;i=b;return e|0}d=c[24]|0;if(!d){e=0;i=b;return e|0}f=c[21]|0;if(f>>>0>(a+40|0)>>>0){g=c[138]|0;h=((-41-a+f+g|0)>>>0)/(g>>>0)|0;f=520|0;while(1){a=c[f>>2]|0;if(a>>>0<=d>>>0?(j=f+4|0,(a+(c[j>>2]|0)|0)>>>0>d>>>0):0)break;f=c[f+8>>2]|0}d=aa(h+-1|0,g)|0;if((((c[f+12>>2]&8|0)==0?(h=ua(0)|0,(h|0)==((c[f>>2]|0)+(c[j>>2]|0)|0)):0)?(f=ua(0-(d>>>0>2147483646?-2147483648-g|0:d)|0)|0,d=ua(0)|0,(f|0)!=(-1|0)&d>>>0<h>>>0):0)?(f=h-d|0,(h|0)!=(d|0)):0){c[j>>2]=(c[j>>2]|0)-f;c[126]=(c[126]|0)-f;j=c[24]|0;d=(c[21]|0)-f|0;f=j+8|0;if(!(f&7))k=0;else k=0-f&7;f=d-k|0;c[24]=j+k;c[21]=f;c[j+(k+4)>>2]=f|1;c[j+(d+4)>>2]=40;c[25]=c[140];e=1;i=b;return e|0}}if((c[21]|0)>>>0<=(c[25]|0)>>>0){e=0;i=b;return e|0}c[25]=-1;e=0;i=b;return e|0}function ob(a){a=+a;var b=0,d=0,e=0,f=0,g=0.0,j=0,l=0,m=0,n=0,o=0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0;b=i;h[k>>3]=a;d=c[k>>2]|0;e=c[k+4>>2]|0;f=(e|0)<0;do if(!(e>>>0<1048576|f)){if(e>>>0>2146435071){g=a;i=b;return +g}if((e|0)==1072693248&((d|0)==0&0==0)){g=0.0;i=b;return +g}else{j=d;l=e;m=e;n=-1023}}else{if((d|0)==0&(e&2147483647|0)==0){g=-1.0/(a*a);i=b;return +g}if(!f){h[k>>3]=a*18014398509481984.0;o=c[k+4>>2]|0;j=c[k>>2]|0;l=o;m=o;n=-1077;break}g=(a-a)/0.0;i=b;return +g}while(0);l=m+614242|0;c[k>>2]=j;c[k+4>>2]=(l&1048575)+1072079006;a=+h[k>>3]+-1.0;p=a*(a*.5);q=a/(a+2.0);r=q*q;s=r*r;h[k>>3]=a-p;j=c[k+4>>2]|0;c[k>>2]=0;c[k+4>>2]=j;t=+h[k>>3];u=q*(p+(s*(s*(s*.15313837699209373+.22222198432149784)+.3999999999940942)+r*(s*(s*(s*.14798198605116586+.1818357216161805)+.2857142874366239)+.6666666666666735)))+(a-t-p);p=t*.4342944818781689;a=+(n+(l>>>20)|0);s=a*.30102999566361177;r=s+p;g=r+(p+(s-r)+(u*.4342944818781689+(a*3.694239077158931e-13+(t+u)*2.5082946711645275e-11)));i=b;return +g}function qb(a){a=+a;var b=0,d=0,e=0,f=0.0,j=0,l=0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0;b=i;i=i+16|0;d=b;h[k>>3]=a;e=c[k+4>>2]|0;do if(!(e>>>0<1071284858|(e|0)<0))if(e>>>0>2146435071){f=a;i=b;return +f}else j=11;else{if(e>>>0>3220176895)if(a==-1.0){f=a/0.0;i=b;return +f}else{f=(a-a)/0.0;i=b;return +f}l=Td(e|0,0,1)|0;if(l>>>0>=2034237440)if(e>>>0<3218259653){m=0.0;n=a;o=0.0;break}else{j=11;break}if(e&2146435072){f=a;i=b;return +f}g[d>>2]=a;f=a;i=b;return +f}while(0);if((j|0)==11){p=a+1.0;h[k>>3]=p;j=c[k>>2]|0;d=(c[k+4>>2]|0)+614242|0;e=(d>>>20)+-1023|0;if((e|0)<54){if((e|0)>1)q=1.0-(p-a);else q=a-(p+-1.0);r=q/p}else r=0.0;c[k>>2]=j;c[k+4>>2]=(d&1048575)+1072079006;m=r;n=+h[k>>3]+-1.0;o=+(e|0)}r=n*(n*.5);p=n/(n+2.0);q=p*p;a=q*q;f=o*.6931471803691238+(n+(m+o*1.9082149292705877e-10+p*(r+(a*(a*(a*.15313837699209373+.22222198432149784)+.3999999999940942)+q*(a*(a*(a*.14798198605116586+.1818357216161805)+.2857142874366239)+.6666666666666735)))-r));i=b;return +f}function rb(a){a=+a;var b=0,d=0,e=0,f=0,g=0.0,j=0,l=0,m=0,n=0,o=0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0;b=i;h[k>>3]=a;d=c[k>>2]|0;e=c[k+4>>2]|0;f=(e|0)<0;do if(!(e>>>0<1048576|f)){if(e>>>0>2146435071){g=a;i=b;return +g}if((e|0)==1072693248&((d|0)==0&0==0)){g=0.0;i=b;return +g}else{j=d;l=e;m=e;n=-1023}}else{if((d|0)==0&(e&2147483647|0)==0){g=-1.0/(a*a);i=b;return +g}if(!f){h[k>>3]=a*18014398509481984.0;o=c[k+4>>2]|0;j=c[k>>2]|0;l=o;m=o;n=-1077;break}g=(a-a)/0.0;i=b;return +g}while(0);l=m+614242|0;c[k>>2]=j;c[k+4>>2]=(l&1048575)+1072079006;a=+h[k>>3]+-1.0;p=a*(a*.5);q=a/(a+2.0);r=q*q;s=r*r;h[k>>3]=a-p;j=c[k+4>>2]|0;c[k>>2]=0;c[k+4>>2]=j;t=+h[k>>3];u=q*(p+(s*(s*(s*.15313837699209373+.22222198432149784)+.3999999999940942)+r*(s*(s*(s*.14798198605116586+.1818357216161805)+.2857142874366239)+.6666666666666735)))+(a-t-p);p=t*1.4426950407214463;a=+(n+(l>>>20)|0);s=a+p;g=s+(p+(a-s)+(u*1.4426950407214463+(t+u)*1.6751713164886512e-10));i=b;return +g}function tb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;d=i;e=a>>>0<16?16:a;if(!(e+-1&e))f=e;else{a=16;while(1)if(a>>>0<e>>>0)a=a<<1;else{f=a;break}}if((-64-f|0)>>>0<=b>>>0){c[(Ia()|0)>>2]=12;g=0;i=d;return g|0}if(b>>>0<11)h=16;else h=b+11&-8;b=Ya(f+12+h|0)|0;if(!b){g=0;i=d;return g|0}a=b+-8|0;e=f+-1|0;do if(b&e){j=b+e&0-f;k=j+-8|0;l=a;if((k-l|0)>>>0>15)m=k;else m=j+(f+-8)|0;j=m-l|0;l=b+-4|0;k=c[l>>2]|0;n=(k&-8)-j|0;if(!(k&3)){c[m>>2]=(c[a>>2]|0)+j;c[m+4>>2]=n;o=m;break}else{k=m+4|0;c[k>>2]=n|c[k>>2]&1|2;k=m+(n+4)|0;c[k>>2]=c[k>>2]|1;c[l>>2]=j|c[l>>2]&1|2;l=b+(j+-4)|0;c[l>>2]=c[l>>2]|1;ab(a,j);o=m;break}}else o=a;while(0);a=o+4|0;m=c[a>>2]|0;if((m&3|0)!=0?(b=m&-8,b>>>0>(h+16|0)>>>0):0){f=b-h|0;c[a>>2]=h|m&1|2;c[o+(h|4)>>2]=f|3;m=o+(b|4)|0;c[m>>2]=c[m>>2]|1;ab(o+h|0,f)}g=o+8|0;i=d;return g|0}function sb(a,b,d,e,f,g,h,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;m=i;n=Dd(j|0,0,h|0,0)|0;o=E;if(o>>>0>0|(o|0)==0&n>>>0>1073741823){c[(Ia()|0)>>2]=27;p=-1;i=m;return p|0}n=_d(f|0,g|0,-1,-1)|0;if((n&f|0)!=0|(E&g|0)!=0|(f|0)==0&(g|0)==0){c[(Ia()|0)>>2]=22;p=-1;i=m;return p|0}if(!(h>>>0>16777215?1:(33554431/(j>>>0)|0)>>>0<h>>>0)?!(0<g>>>0|(0==(g|0)?(33554431/(h>>>0)|0)>>>0<f>>>0:0)):0){n=h<<7;o=Ya(aa(n,j)|0)|0;if(!o){p=-1;i=m;return p|0}q=Ya(h<<8)|0;do if(q){r=Dd(n|0,0,f|0,g|0)|0;s=Ya(r)|0;if(!s){$a(q);break}r=aa(j<<7,h)|0;xb(a,b,d,e,1,0,o,r);if(j){t=h<<7;u=0;do{Ib(o+(aa(t,u)|0)|0,h,f,g,s,q);u=u+1|0}while((u|0)!=(j|0))}xb(a,b,o,r,1,0,k,l);$a(s);$a(q);$a(o);p=0;i=m;return p|0}while(0);$a(o);p=-1;i=m;return p|0}c[(Ia()|0)>>2]=12;p=-1;i=m;return p|0}function ub(a,b){a=+a;b=+b;var d=0,e=0,f=0,g=0,j=0,l=0,m=0,n=0,o=0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0,v=0.0;d=i;h[k>>3]=a;e=c[k>>2]|0;f=c[k+4>>2]|0;h[k>>3]=b;g=c[k>>2]|0;j=f&2147483647;f=c[k+4>>2]&2147483647;l=j>>>0<f>>>0|(j|0)==(f|0)&e>>>0<g>>>0;m=l?g:e;n=l?f:j;o=l?e:g;g=l?j:f;f=Vd(m|0,n|0,52)|0;j=Vd(o|0,g|0,52)|0;c[k>>2]=m;c[k+4>>2]=n;b=+h[k>>3];c[k>>2]=o;c[k+4>>2]=g;a=+h[k>>3];if((j|0)==2047){p=a;i=d;return +p}if((f|0)==2047|(o|0)==0&(g|0)==0){p=b;i=d;return +p}if((f-j|0)>64){p=b+a;i=d;return +p}if(f>>>0<=1533)if(j>>>0<573){q=b*5260135901548373507240989.0e186;r=a*5260135901548373507240989.0e186;s=1.90109156629516e-211}else{q=b;r=a;s=1.0}else{q=b*1.90109156629516e-211;r=a*1.90109156629516e-211;s=5260135901548373507240989.0e186}a=q*134217729.0;b=a+(q-a);a=q-b;t=q*q;q=r*134217729.0;u=q+(r-q);q=r-u;v=r*r;p=s*+Q(+(t+(v+(q*q+(u*u-v+u*2.0*q)+(a*a+(b*b-t+b*2.0*a))))));i=d;return +p}function vb(){var a=0,b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;a=i;i=i+16|0;b=a;do if(!(c[136]|0)){d=za(30)|0;if(!(d+-1&d)){c[138]=d;c[137]=d;c[139]=-1;c[140]=-1;c[141]=0;c[129]=0;c[136]=(Pa(0)|0)&-16^1431655768;break}else Na()}while(0);d=c[24]|0;if(!d){e=0;f=0;g=0}else{h=c[127]|0;j=c[126]|0;k=520|0;l=j+-40-(c[21]|0)|0;while(1){m=c[k>>2]|0;n=m+8|0;if(!(n&7))p=0;else p=0-n&7;n=m+(c[k+4>>2]|0)|0;q=m+p|0;r=l;while(1){if(q>>>0>=n>>>0|(q|0)==(d|0)){s=r;break}t=c[q+4>>2]|0;if((t|0)==7){s=r;break}u=t&-8;v=r-((t&3|0)==1?u:0)|0;q=q+u|0;if(q>>>0<m>>>0){s=v;break}else r=v}k=c[k+8>>2]|0;if(!k){e=j;f=h;g=s;break}else l=s}}s=c[o>>2]|0;c[b>>2]=f;sa(s|0,568,b|0)|0;c[b>>2]=e;sa(s|0,600,b|0)|0;c[b>>2]=g;sa(s|0,632,b|0)|0;i=a;return}function wb(a){a=+a;var b=0,d=0,e=0,f=0.0,h=0,j=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0;b=i;i=i+16|0;d=b;e=(g[k>>2]=a,c[k>>2]|0);do if(!(e>>>0<1054086096|(e|0)<0))if(e>>>0>2139095039){f=a;i=b;return +f}else h=11;else{if(e>>>0>3212836863)if(a==-1.0){f=a/0.0;i=b;return +f}else{f=(a-a)/0.0;i=b;return +f}if(e<<1>>>0>=1728053248)if(e>>>0<3197498906){j=0.0;l=a;m=0.0;break}else{h=11;break}if(e&2139095040){f=a;i=b;return +f}g[d>>2]=a*a;f=a;i=b;return +f}while(0);if((h|0)==11){n=a+1.0;h=(g[k>>2]=n,c[k>>2]|0)+4913933|0;d=(h>>>23)+-127|0;if((d|0)<25){if((d|0)>1)o=1.0-(n-a);else o=a-(n+-1.0);p=o/n}else p=0.0;j=p;l=(c[k>>2]=(h&8388607)+1060439283,+g[k>>2])+-1.0;m=+(d|0)}p=l/(l+2.0);n=p*p;o=n*n;a=l*(l*.5);f=m*.6931381225585938+(l+(j+m*9.05800061445916e-06+p*(a+(n*(o*.2849878668785095+.6666666269302368)+o*(o*.24279078841209412+.40000972151756287)))-a));i=b;return +f}function Ab(a){a=+a;var b=0,d=0,e=0,f=0,j=0.0,l=0.0,m=0.0,n=0.0;b=i;i=i+16|0;d=b;h[k>>3]=a;e=c[k+4>>2]|0;f=e&2147483647;do if(f>>>0>1083174911){if(f>>>0>1083179007&((e|0)>-1|(e|0)==-1&(c[k>>2]|0)>>>0>4294967295)){j=a*8988465674311579538646525.0e283;i=b;return +j}if(f>>>0>2146435071){j=-1.0/a;i=b;return +j}if((e|0)<0)if(!(a<=-1075.0)){if(!(a+-4503599627370496.0+4503599627370496.0!=a))break;g[d>>2]=-1.401298464324817e-45/a;break}else{g[d>>2]=-1.401298464324817e-45/a;j=0.0;i=b;return +j}}else if(f>>>0<1016070144){j=a+1.0;i=b;return +j}while(0);l=a+26388279066624.0;h[k>>3]=l;f=(c[k>>2]|0)+128|0;d=f<<1&510;m=+h[1008+(d<<3)>>3];n=a-(l+-26388279066624.0)-+h[1008+((d|1)<<3)>>3];j=+_b(m+m*n*(n*(n*(n*(n*1.3333559164630223e-03+.009618129842126066)+.0555041086648214)+.2402265069591)+.6931471805599453),(f&-256|0)/256|0);i=b;return +j}function zb(a){a=+a;var b=0,d=0,e=0,f=0.0,h=0,j=0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0;b=i;d=(g[k>>2]=a,c[k>>2]|0);e=(d|0)<0;do if(!(d>>>0<8388608|e)){if(d>>>0>2139095039){f=a;i=b;return +f}if((d|0)==1065353216){f=0.0;i=b;return +f}else{h=d;j=-127}}else{if(!(d&2147483647)){f=-1.0/(a*a);i=b;return +f}if(!e){h=(g[k>>2]=a*33554432.0,c[k>>2]|0);j=-152;break}f=(a-a)/0.0;i=b;return +f}while(0);e=h+4913933|0;a=(c[k>>2]=(e&8388607)+1060439283,+g[k>>2])+-1.0;l=a/(a+2.0);m=l*l;n=m*m;o=a*(a*.5);p=(c[k>>2]=(g[k>>2]=a-o,c[k>>2]|0)&-4096,+g[k>>2]);q=l*(o+(m*(n*.2849878668785095+.6666666269302368)+n*(n*.24279078841209412+.40000972151756287)))+(a-p-o);o=+(j+(e>>>23)|0);f=o*.3010292053222656+(p*.434326171875+(q*.434326171875+(o*7.903415166765626e-07+(p+q)*-3.168997136526741e-05)));i=b;return +f}function xb(b,c,d,e,f,g,h,j){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;k=i;i=i+496|0;l=k+208|0;m=k;n=k+480|0;o=k+448|0;p=k+416|0;Lb(l,b,c);qe(l,d,e);if(!j){i=k;return}e=g>>>0<0|(g|0)==0&f>>>0<2;d=0;q=0;do{q=q+1|0;ie(n,q);Kc(m|0,l|0,208)|0;qe(m,n,4);Gd(o,m);r=p+0|0;s=o+0|0;t=r+32|0;do{a[r>>0]=a[s>>0]|0;r=r+1|0;s=s+1|0}while((r|0)<(t|0));if(!e){s=2;r=0;do{Lb(m,b,c);qe(m,o,32);Gd(o,m);t=0;do{u=p+t|0;a[u>>0]=a[u>>0]^a[o+t>>0];t=t+1|0}while((t|0)!=32);s=_d(s|0,r|0,1,0)|0;r=E}while(!(r>>>0>g>>>0|(r|0)==(g|0)&s>>>0>f>>>0))}s=j-d|0;Kc(h+d|0,p|0,(s>>>0>32?32:s)|0)|0;d=q<<5}while(d>>>0<j>>>0);i=k;return}function Bb(a){a=+a;var b=0,d=0,e=0,f=0.0,h=0,j=0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0;b=i;d=(g[k>>2]=a,c[k>>2]|0);e=(d|0)<0;do if(!(d>>>0<8388608|e)){if(d>>>0>2139095039){f=a;i=b;return +f}if((d|0)==1065353216){f=0.0;i=b;return +f}else{h=d;j=-127}}else{if(!(d&2147483647)){f=-1.0/(a*a);i=b;return +f}if(!e){h=(g[k>>2]=a*33554432.0,c[k>>2]|0);j=-152;break}f=(a-a)/0.0;i=b;return +f}while(0);e=h+4913933|0;a=(c[k>>2]=(e&8388607)+1060439283,+g[k>>2])+-1.0;l=a/(a+2.0);m=l*l;n=m*m;o=a*(a*.5);p=(c[k>>2]=(g[k>>2]=a-o,c[k>>2]|0)&-4096,+g[k>>2]);q=l*(o+(m*(n*.2849878668785095+.6666666269302368)+n*(n*.24279078841209412+.40000972151756287)))+(a-p-o);f=+(j+(e>>>23)|0)+(p*1.44287109375+(q*1.44287109375+(p+q)*-1.7605285393074155e-04));i=b;return +f}function yb(a){a=+a;var b=0,d=0,e=0,f=0,g=0.0,j=0,l=0,m=0,n=0,o=0,p=0,q=0.0,r=0.0;b=i;h[k>>3]=a;d=c[k>>2]|0;e=c[k+4>>2]|0;f=e&2147483647;if(f>>>0>2146435071){g=a+a;i=b;return +g}do if(f>>>0<1048576){h[k>>3]=a*18014398509481984.0;j=c[k>>2]|0;l=c[k+4>>2]|0;m=l&2147483647;if(!m){g=a;i=b;return +g}else{n=l;o=j;p=((m>>>0)/3|0)+696219795|0;break}}else{n=e;o=d;p=((f>>>0)/3|0)+715094163|0}while(0);c[k>>2]=0;c[k+4>>2]=p|n&-2147483648;q=+h[k>>3];r=q/a*(q*q);h[k>>3]=q*(r*(r*r)*(r*.14599619288661245+-.758397934778766)+(r*(r*1.6214297201053545+-1.8849797954337717)+1.87595182427177));n=_d(c[k>>2]|0,c[k+4>>2]|0,-2147483648,0)|0;p=E;c[k>>2]=n&-1073741824;c[k+4>>2]=p;r=+h[k>>3];q=a/(r*r);g=r+(q-r)/(q+(r+r))*r;i=b;return +g}function Fb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;if(d>>>0<8){f=0;i=e;return f|0}Ma(5256);g=(c[1318]|0)+-4|0;c[g>>2]=c[1322]<<8|c[1316]<<16|c[1320];if(d>>>0<32){c[1316]=0;h=b+4|0;c[1318]=h;c[h>>2]=a;j=h}else{do if(d>>>0>=64){if(d>>>0<128){c[1316]=15;k=1;break}if(d>>>0<256){c[1316]=31;k=3;break}else{c[1316]=63;k=1;break}}else{c[1316]=7;k=3}while(0);d=b+4|0;c[1318]=d;c[1322]=k;c[1320]=0;k=a;a=0;b=0;do{h=Dd(k|0,a|0,1284865837,1481765933)|0;k=_d(h|0,E|0,1,0)|0;a=E;c[d+(b<<2)>>2]=a;b=b+1|0}while((b|0)<(c[1316]|0));c[d>>2]=c[d>>2]|1;j=d}c[j+-4>>2]=c[1322]<<8|c[1316]<<16|c[1320];Fa(5256);f=g;i=e;return f|0}function Db(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;g=e+16|0;h=c[g>>2]|0;do if(!h)if(!(Uc(e)|0)){j=c[g>>2]|0;break}else{k=0;i=f;return k|0}else j=h;while(0);h=e+20|0;g=c[h>>2]|0;if((j-g|0)>>>0<d>>>0){k=Wa[c[e+36>>2]&1](e,b,d)|0;i=f;return k|0}a:do if((a[e+75>>0]|0)>-1){j=d;while(1){if(!j){l=d;m=b;n=g;o=0;break a}p=j+-1|0;if((a[b+p>>0]|0)==10)break;else j=p}if((Wa[c[e+36>>2]&1](e,b,j)|0)>>>0<j>>>0){k=j;i=f;return k|0}else{l=d-j|0;m=b+j|0;n=c[h>>2]|0;o=j;break}}else{l=d;m=b;n=g;o=0}while(0);Kc(n|0,m|0,l|0)|0;c[h>>2]=(c[h>>2]|0)+l;k=o+l|0;i=f;return k|0}function Cb(a,b,d){a=+a;b=+b;d=+d;var e=0,f=0,j=0,l=0.0,m=0,n=0,o=0,p=0.0,q=0.0,r=0.0;e=i;i=i+16|0;f=e+8|0;j=e;l=a*b;b=d;a=l+b;h[k>>3]=a;m=c[k>>2]|0;n=Vd(m|0,c[k+4>>2]|0,52)|0;o=n&2047;if(!((m&536870911|0)!=268435456|0!=0|(o|0)==2047|a-l==b)?(Ef()|0)==0:0){Ka(3072)|0;h[j>>3]=l;p=b+ +h[j>>3];Ka(0)|0;if(!(a==p)){q=p;r=q;i=e;return +r}h[k>>3]=p;j=_d(c[k>>2]|0,c[k+4>>2]|0,1,0)|0;m=E;c[k>>2]=j;c[k+4>>2]=m;q=+h[k>>3];r=q;i=e;return +r}if((o+-874|0)>>>0>=23){q=a;r=q;i=e;return +r}if(!(vf(32)|0)){q=a;r=q;i=e;return +r}g[f>>2]=d;d=l+ +g[f>>2];if(!(vf(32)|0)){q=d;r=q;i=e;return +r}else{q=d;r=q;i=e;return +r}return +(0.0)}function Hb(a){a=+a;var b=0,d=0,e=0,f=0,j=0.0,l=0,m=0.0,n=0.0;b=i;i=i+16|0;d=b;e=(g[k>>2]=a,c[k>>2]|0);f=e&2147483647;if(f>>>0>1123811328){if(e>>>0>1124073471&(e|0)>-1){j=a*1701411834604692317316873.0e14;i=b;return +j}if((e|0)<0){l=e>>>0>3272998911;if(!((e&65535|0)==0&(l^1)))g[d>>2]=-1.401298464324817e-45/a;if(l){j=0.0;i=b;return +j}}}else if(f>>>0<855638017){j=a+1.0;i=b;return +j}m=a+786432.0;f=(g[k>>2]=m,c[k>>2]|0)+8|0;l=Td((f>>>4)+1023|0,0,52)|0;d=E;n=a-(m+-786432.0);m=+h[5104+((f&15)<<3)>>3];a=n*m;c[k>>2]=l;c[k+4>>2]=d;j=+h[k>>3]*(m+(n*.24022650718688965+.6931471824645996)*a+(n*.009618354961276054+.055505409836769104)*(n*n*a));i=b;return +j}function Gb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;e=i;i=i+224|0;f=e+120|0;g=e+80|0;h=e;j=e+136|0;k=g+0|0;l=k+40|0;do{c[k>>2]=0;k=k+4|0}while((k|0)<(l|0));c[f>>2]=c[d>>2];if((Xa(0,b,f,h,g)|0)<0){m=-1;i=e;return m|0}d=a+48|0;if(!(c[d>>2]|0)){k=a+44|0;l=c[k>>2]|0;c[k>>2]=j;n=a+28|0;c[n>>2]=j;o=a+20|0;c[o>>2]=j;c[d>>2]=80;p=a+16|0;c[p>>2]=j+80;j=Xa(a,b,f,h,g)|0;if(!l)q=j;else{Wa[c[a+36>>2]&1](a,0,0)|0;r=(c[o>>2]|0)==0?-1:j;c[k>>2]=l;c[d>>2]=0;c[p>>2]=0;c[n>>2]=0;c[o>>2]=0;q=r}}else q=Xa(a,b,f,h,g)|0;m=q;i=e;return m|0}function Jb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;d=i;e=a+(b<<2)|0;if(!b){i=d;return 0}else f=a;a:while(1){a=c[f>>2]|0;do if(!a)g=f+4|0;else{b=a+-8|0;h=a+-4|0;j=c[h>>2]|0;k=j&-8;c[f>>2]=0;if(b>>>0<(c[22]|0)>>>0|(j&3|0)==1){l=9;break a}m=f+4|0;n=j+-8&-8;if((m|0)!=(e|0)?(c[m>>2]|0)==(a+(n+8)|0):0){o=(c[a+(n|4)>>2]&-8)+k|0;c[h>>2]=j&1|o|2;j=a+(o+-4)|0;c[j>>2]=c[j>>2]|1;c[m>>2]=a;g=m;break}ab(b,k);g=m}while(0);if((g|0)==(e|0)){l=11;break}else f=g}if((l|0)==9)Na();else if((l|0)==11){i=d;return 0}return 0}function Eb(a,b){a=+a;b=b|0;var d=0,e=0,f=0,g=0,j=0,l=0.0,m=0.0;d=i;h[k>>3]=a;e=c[k>>2]|0;f=c[k+4>>2]|0;g=Vd(e|0,f|0,52)|0;j=(g&2047)+-1023|0;if((j|0)>51){h[b>>3]=a;if(!((j|0)!=1024|(e|0)==0&(f&1048575|0)==0)){l=a;i=d;return +l}c[k>>2]=0;c[k+4>>2]=f&-2147483648;l=+h[k>>3];i=d;return +l}if((j|0)<0){c[k>>2]=0;c[k+4>>2]=f&-2147483648;h[b>>3]=+h[k>>3];l=a;i=d;return +l}g=Vd(-1,1048575,j|0)|0;j=E;if((g&e|0)==0&(j&f|0)==0){h[b>>3]=a;c[k>>2]=0;c[k+4>>2]=f&-2147483648;l=+h[k>>3];i=d;return +l}else{c[k>>2]=e&~g;c[k+4>>2]=f&~j;m=+h[k>>3];h[b>>3]=m;l=a-m;i=d;return +l}return +(0.0)}function Kb(a,b){a=+a;b=+b;var d=0,e=0,f=0,h=0,j=0,l=0,m=0.0,n=0.0,o=0.0,p=0.0;d=i;e=(g[k>>2]=a,c[k>>2]|0);f=e&2147483647;e=(g[k>>2]=b,c[k>>2]|0)&2147483647;h=f>>>0<e>>>0;j=h?e:f;l=h?f:e;b=(c[k>>2]=j,+g[k>>2]);a=(c[k>>2]=l,+g[k>>2]);if((l|0)==2139095040){m=a;i=d;return +m}if(j>>>0>2139095039|(l|0)==0|(j-l|0)>>>0>209715199){m=b+a;i=d;return +m}if(j>>>0<=1568669695)if(l>>>0<562036736){n=a*1237940039285380274899124.0e3;o=b*1237940039285380274899124.0e3;p=8.077935669463161e-28}else{n=a;o=b;p=1.0}else{n=a*8.077935669463161e-28;o=b*8.077935669463161e-28;p=1237940039285380274899124.0e3}b=o;o=n;m=p*+Q(+(b*b+o*o));i=d;return +m}function Mb(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;f=i;if(!e){g=0;i=f;return g|0}h=a[b>>0]|0;a:do if(!(h<<24>>24)){j=0;k=c}else{l=e;m=h;n=h&255;o=b;p=c;while(1){l=l+-1|0;q=a[p>>0]|0;if(!(q<<24>>24!=0&(l|0)!=0)){j=m;k=p;break a}if(m<<24>>24!=q<<24>>24?(q=xe(n)|0,(q|0)!=(xe(d[p>>0]|0)|0)):0)break;q=o+1|0;r=p+1|0;s=a[q>>0]|0;if(!(s<<24>>24)){j=0;k=r;break a}else{m=s;n=s&255;o=q;p=r}}j=a[o>>0]|0;k=p}while(0);c=xe(j&255)|0;g=c-(xe(d[k>>0]|0)|0)|0;i=f;return g|0}function Ob(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;e=i;f=a+32|0;g=a+36|0;h=c[g>>2]|0;j=h>>>3&63;k=d<<3;l=h+k|0;c[g>>2]=l;if(l>>>0<k>>>0)c[f>>2]=(c[f>>2]|0)+1;c[f>>2]=(c[f>>2]|0)+(d>>>29);f=64-j|0;k=a+j+40|0;if(f>>>0>d>>>0){Kc(k|0,b|0,d|0)|0;i=e;return}Kc(k|0,b|0,f|0)|0;k=a+40|0;Za(a,k);j=b+f|0;l=d-f|0;if(l>>>0>63){f=h>>>3&63;h=f+d+-128|0;d=h&-64;g=d+128-f|0;f=l;m=j;while(1){Za(a,m);f=f+-64|0;if(f>>>0<=63)break;else m=m+64|0}n=h-d|0;o=b+g|0}else{n=l;o=j}Kc(k|0,o|0,n|0)|0;i=e;return}function Ib(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;g=i;h=b<<7;j=f+h|0;ud(f,a,h);if((c|0)==0&(d|0)==0){ud(a,f,h);i=g;return}k=0;l=0;do{m=Dd(k|0,l|0,h|0,0)|0;ud(e+m|0,f,h);Yb(f,j,b);k=_d(k|0,l|0,1,0)|0;l=E}while(l>>>0<d>>>0|(l|0)==(d|0)&k>>>0<c>>>0);if((c|0)==0&(d|0)==0){ud(a,f,h);i=g;return}k=_d(c|0,d|0,-1,-1)|0;l=E;m=0;n=0;do{o=ke(f,b)|0;p=Dd(o&k|0,E&l|0,h|0,0)|0;nd(f,e+p|0,h);Yb(f,j,b);m=_d(m|0,n|0,1,0)|0;n=E}while(n>>>0<d>>>0|(n|0)==(d|0)&m>>>0<c>>>0);ud(a,f,h);i=g;return}function Nb(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;g=i;i=i+128|0;h=g+112|0;j=g;k=j+0|0;l=6e3|0;m=k+112|0;do{c[k>>2]=c[l>>2];k=k+4|0;l=l+4|0}while((k|0)<(m|0));if((d+-1|0)>>>0>2147483646)if(!d){n=h;o=1}else{c[(Ia()|0)>>2]=75;p=-1;i=g;return p|0}else{n=b;o=d}d=-2-n|0;b=o>>>0>d>>>0?d:o;c[j+48>>2]=b;o=j+20|0;c[o>>2]=n;c[j+44>>2]=n;d=n+b|0;n=j+16|0;c[n>>2]=d;c[j+28>>2]=d;d=Gb(j,e,f)|0;if(!b){p=d;i=g;return p|0}b=c[o>>2]|0;a[b+(((b|0)==(c[n>>2]|0))<<31>>31)>>0]=0;p=d;i=g;return p|0}function Lb(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;i=i+96|0;f=e+32|0;g=e;if(d>>>0>64){hd(b);Ob(b,c,d);Ed(g,b);h=32;j=g}else{h=d;j=c}hd(b);c=f+0|0;d=c+64|0;do{a[c>>0]=54;c=c+1|0}while((c|0)<(d|0));if(h){g=0;do{k=f+g|0;a[k>>0]=a[k>>0]^a[j+g>>0];g=g+1|0}while((g|0)!=(h|0))}Ob(b,f,64);g=b+104|0;hd(g);c=f+0|0;d=c+64|0;do{a[c>>0]=92;c=c+1|0}while((c|0)<(d|0));if(!h){Ob(g,f,64);i=e;return}else l=0;do{c=f+l|0;a[c>>0]=a[c>>0]^a[j+l>>0];l=l+1|0}while((l|0)!=(h|0));Ob(g,f,64);i=e;return}function Qb(b){b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;c=i;d=b;while(1){e=d+1|0;if(!(Ce(a[d>>0]|0)|0))break;else d=e}b=a[d>>0]|0;f=b<<24>>24;if((f|0)==45){g=1;h=5}else if((f|0)==43){g=0;h=5}else{j=d;k=b;l=0}if((h|0)==5){j=e;k=a[e>>0]|0;l=g}if(!(of(k<<24>>24)|0)){m=0;n=(l|0)!=0;o=0-m|0;p=n?m:o;i=c;return p|0}else{q=j;r=0}while(1){j=(r*10|0)+48-(a[q>>0]|0)|0;q=q+1|0;if(!(of(a[q>>0]|0)|0)){m=j;break}else r=j}n=(l|0)!=0;o=0-m|0;p=n?m:o;i=c;return p|0}function Pb(b){b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;c=i;d=b;while(1){e=d+1|0;if(!(Ce(a[d>>0]|0)|0))break;else d=e}b=a[d>>0]|0;f=b<<24>>24;if((f|0)==45){g=1;h=5}else if((f|0)==43){g=0;h=5}else{j=d;k=b;l=0}if((h|0)==5){j=e;k=a[e>>0]|0;l=g}if(!(of(k<<24>>24)|0)){m=0;n=(l|0)!=0;o=0-m|0;p=n?m:o;i=c;return p|0}else{q=j;r=0}while(1){j=(r*10|0)+48-(a[q>>0]|0)|0;q=q+1|0;if(!(of(a[q>>0]|0)|0)){m=j;break}else r=j}n=(l|0)!=0;o=0-m|0;p=n?m:o;i=c;return p|0}function Vb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;e=i;if(!b){f=1;i=e;return f|0}if(d>>>0<128){a[b>>0]=d;f=1;i=e;return f|0}if(d>>>0<2048){a[b>>0]=d>>>6|192;a[b+1>>0]=d&63|128;f=2;i=e;return f|0}if(d>>>0<55296|(d&-8192|0)==57344){a[b>>0]=d>>>12|224;a[b+1>>0]=d>>>6&63|128;a[b+2>>0]=d&63|128;f=3;i=e;return f|0}if((d+-65536|0)>>>0<1048576){a[b>>0]=d>>>18|240;a[b+1>>0]=d>>>12&63|128;a[b+2>>0]=d>>>6&63|128;a[b+3>>0]=d&63|128;f=4;i=e;return f|0}else{c[(Ia()|0)>>2]=84;f=-1;i=e;return f|0}return 0}function Tb(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;e=i;f=a[b>>0]|0;a:do if(!(f<<24>>24)){g=0;h=c}else{j=f;k=f&255;l=b;m=c;while(1){n=a[m>>0]|0;if(!(n<<24>>24)){g=j;h=m;break a}if(j<<24>>24!=n<<24>>24?(n=xe(k)|0,(n|0)!=(xe(d[m>>0]|0)|0)):0)break;n=l+1|0;o=m+1|0;p=a[n>>0]|0;if(!(p<<24>>24)){g=0;h=o;break a}else{j=p;k=p&255;l=n;m=o}}g=a[l>>0]|0;h=m}while(0);c=xe(g&255)|0;g=c-(xe(d[h>>0]|0)|0)|0;i=e;return g|0}function Wb(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;f=b+104|0;g=c[f>>2]|0;if(!((g|0)!=0?(c[b+108>>2]|0)>=(g|0):0))h=3;if((h|0)==3?(h=id(b)|0,(h|0)>=0):0){g=c[f>>2]|0;f=c[b+8>>2]|0;if((g|0)!=0?(j=c[b+4>>2]|0,k=g-(c[b+108>>2]|0)+-1|0,(f-j|0)>(k|0)):0)c[b+100>>2]=j+k;else c[b+100>>2]=f;k=c[b+4>>2]|0;if(f){j=b+108|0;c[j>>2]=f+1-k+(c[j>>2]|0)}j=k+-1|0;if((d[j>>0]|0|0)==(h|0)){l=h;i=e;return l|0}a[j>>0]=h;l=h;i=e;return l|0}c[b+100>>2]=0;l=-1;i=e;return l|0}function _b(a,b){a=+a;b=b|0;var d=0,e=0.0,f=0,g=0,j=0,l=0.0;d=i;if((b|0)>1023){e=a*8988465674311579538646525.0e283;f=b+-1023|0;if((f|0)>1023){g=b+-2046|0;j=(g|0)>1023?1023:g;l=e*8988465674311579538646525.0e283}else{j=f;l=e}}else if((b|0)<-1022){e=a*2.2250738585072014e-308;f=b+1022|0;if((f|0)<-1022){g=b+2044|0;j=(g|0)<-1022?-1022:g;l=e*2.2250738585072014e-308}else{j=f;l=e}}else{j=b;l=a}b=Td(j+1023|0,0,52)|0;j=E;c[k>>2]=b;c[k+4>>2]=j;a=l*+h[k>>3];i=d;return +a}function Sb(a){a=+a;var b=0,d=0,e=0,f=0,g=0,j=0,l=0.0,m=0.0,n=0.0;b=i;i=i+16|0;d=b;h[k>>3]=a;e=c[k>>2]|0;f=c[k+4>>2]|0;g=Vd(e|0,f|0,52)|0;j=g&2047;c[k>>2]=e;c[k+4>>2]=f&2147483647;a=+h[k>>3];do if(j>>>0<=1048){if(j>>>0>1023){l=+_(+(a*2.0+1.0/(a+ +Q(+(a*a+1.0)))));break}if(j>>>0>996){m=a*a;l=+qb(a+m/(+Q(+(m+1.0))+1.0));break}else{h[d>>3]=a+1329227995784915872903807.0e12;l=a;break}}else l=+_(+a)+.6931471805599453;while(0);if((f|0)>=0){n=l;i=b;return +n}n=-l;i=b;return +n}function Rb(a,b){a=+a;b=b|0;var d=0,e=0,f=0,h=0.0,j=0,l=0.0;d=i;e=(g[k>>2]=a,c[k>>2]|0);f=(e>>>23&255)+-127|0;if((f|0)>22){g[b>>2]=a;if(!((f|0)!=128|(e&8388607|0)==0)){h=a;i=d;return +h}h=(c[k>>2]=e&-2147483648,+g[k>>2]);i=d;return +h}if((f|0)<0){g[b>>2]=(c[k>>2]=e&-2147483648,+g[k>>2]);h=a;i=d;return +h}j=8388607>>>f;if(!(j&e)){g[b>>2]=a;h=(c[k>>2]=e&-2147483648,+g[k>>2]);i=d;return +h}else{l=(c[k>>2]=e&~j,+g[k>>2]);g[b>>2]=l;h=a-l;i=d;return +h}return +(0.0)}function Ub(a){a=+a;var b=0,d=0,e=0,f=0.0,h=0,j=0,l=0,m=0.0,n=0.0,o=0.0,p=0.0;b=i;d=(g[k>>2]=a,c[k>>2]|0);e=d&2147483647;if(e>>>0>2139095039){f=a+a;i=b;return +f}do if(e>>>0<8388608)if(!e){f=a;i=b;return +f}else{h=(g[k>>2]=a*16777216.0,c[k>>2]|0);j=(((h&2147483647)>>>0)/3|0)+642849266|0;l=h;break}else{j=((e>>>0)/3|0)+709958130|0;l=d}while(0);m=(c[k>>2]=l&-2147483648|j,+g[k>>2]);n=m*(m*m);o=a;a=o+o;p=m*(a+n)/(n+(o+n));n=p*(p*p);f=p*(a+n)/(n+(o+n));i=b;return +f}function Xb(a){a=+a;var b=0,d=0,e=0,f=0,j=0.0,l=0.0,m=0.0;b=i;i=i+16|0;d=b;h[k>>3]=a;e=c[k+4>>2]|0;f=e&2147483647;c[k>>2]=c[k>>2];c[k+4>>2]=f;a=+h[k>>3];do if(f>>>0>1071748074)if(f>>>0>1077149696){j=1.0-0.0/a;break}else{j=1.0-2.0/(+hb(a*2.0)+2.0);break}else{if(f>>>0>1070618798){l=+hb(a*2.0);j=l/(l+2.0);break}if(f>>>0>1048575){l=+hb(a*-2.0);j=-l/(l+2.0);break}else{g[d>>2]=a;j=a;break}}while(0);if((e|0)>=0){m=j;i=b;return +m}m=-j;i=b;return +m}function dc(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;if(!e){g=0;i=f;return g|0}h=a[b>>0]|0;a:do if(!(h<<24>>24)){j=0;k=c}else{l=e;m=h;n=b;o=c;while(1){l=l+-1|0;p=a[o>>0]|0;if(!(p<<24>>24!=0&(l|0)!=0&m<<24>>24==p<<24>>24)){j=m;k=o;break a}n=n+1|0;p=o+1|0;m=a[n>>0]|0;if(!(m<<24>>24)){j=0;k=p;break}else o=p}}while(0);g=(j&255)-(d[k>>0]|0)|0;i=f;return g|0}function Yb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0;d=i;i=i+64|0;e=d;ud(e,a+((c<<7)+-64)|0,64);if(c&2147483647){f=c<<1;g=0;do{h=g<<6;nd(e,a+h|0,64);db(e);ud(b+h|0,e,64);g=g+1|0}while((g|0)!=(f|0))}if(!c){i=d;return}else j=0;do{ud(a+(j<<6)|0,b+(j<<7)|0,64);j=j+1|0}while((j|0)!=(c|0));if(!c){i=d;return}else k=0;do{ud(a+(k+c<<6)|0,b+(k<<7|64)|0,64);k=k+1|0}while((k|0)!=(c|0));i=d;return}function Zb(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=i;Ma(5256);d=c[1316]|0;if(!d){c[c[1318]>>2]=a;Fa(5256);i=b;return}else if((d|0)!=31){c[1322]=(d|0)==7?3:1;c[1320]=0;if((d|0)>0)e=6;else f=c[1318]|0}else{c[1322]=3;c[1320]=0;e=6}if((e|0)==6){e=c[1318]|0;d=a;a=0;g=0;do{h=Dd(d|0,a|0,1284865837,1481765933)|0;d=_d(h|0,E|0,1,0)|0;a=E;c[e+(g<<2)>>2]=a;g=g+1|0}while((g|0)<(c[1316]|0));f=e}c[f>>2]=c[f>>2]|1;Fa(5256);i=b;return}function $b(a){a=+a;var b=0,d=0,e=0,f=0,h=0.0,j=0.0,l=0.0;b=i;i=i+16|0;d=b;e=(g[k>>2]=a,c[k>>2]|0);f=e&2147483647;a=(c[k>>2]=f,+g[k>>2]);do if(f>>>0>1057791828)if(f>>>0>1092616192){h=0.0/a+1.0;break}else{h=1.0-2.0/(+lb(a*2.0)+2.0);break}else{if(f>>>0>1048757624){j=+lb(a*2.0);h=j/(j+2.0);break}if(f>>>0>8388607){j=+lb(a*-2.0);h=-j/(j+2.0);break}else{g[d>>2]=a*a;h=a;break}}while(0);if((e|0)>=0){l=h;i=b;return +l}l=-h;i=b;return +l}function bc(a,b){a=+a;b=+b;var d=0,e=0,f=0,g=0,j=0.0,l=0,m=0;d=i;h[k>>3]=a;e=c[k>>2]|0;f=c[k+4>>2]|0;g=f&2147483647;if(g>>>0>2146435072|(g|0)==2146435072&e>>>0>0){j=b;i=d;return +j}h[k>>3]=b;g=c[k>>2]|0;l=c[k+4>>2]|0;m=l&2147483647;if(m>>>0>2146435072|(m|0)==2146435072&g>>>0>0){j=a;i=d;return +j}m=Vd(e|0,f|0,63)|0;e=Vd(g|0,l|0,63)|0;if((m|0)==(e|0)){j=a<b?b:a;i=d;return +j}else{j=(f|0)<0?b:a;i=d;return +j}return +(0.0)}function ac(a,b){a=+a;b=+b;var d=0,e=0,f=0,g=0,j=0.0,l=0,m=0;d=i;h[k>>3]=a;e=c[k>>2]|0;f=c[k+4>>2]|0;g=f&2147483647;if(g>>>0>2146435072|(g|0)==2146435072&e>>>0>0){j=b;i=d;return +j}h[k>>3]=b;g=c[k>>2]|0;l=c[k+4>>2]|0;m=l&2147483647;if(m>>>0>2146435072|(m|0)==2146435072&g>>>0>0){j=a;i=d;return +j}m=Vd(e|0,f|0,63)|0;e=Vd(g|0,l|0,63)|0;if((m|0)==(e|0)){j=a<b?a:b;i=d;return +j}else{j=(f|0)<0?a:b;i=d;return +j}return +(0.0)}function fc(a){a=+a;var b=0,d=0,e=0,f=0,h=0.0,j=0.0,l=0.0;b=i;i=i+16|0;d=b;e=(g[k>>2]=a,c[k>>2]|0);f=e&2147483647;a=(c[k>>2]=f,+g[k>>2]);do if(f>>>0<=1166016511){if(f>>>0>1073741823){h=+_(+(a*2.0+1.0/(a+ +Q(+(a*a+1.0)))));break}if(f>>>0>964689919){j=a*a;h=+wb(a+j/(+Q(+(j+1.0))+1.0));break}else{g[d>>2]=a+1329227995784915872903807.0e12;h=a;break}}else h=+_(+a)+.6931471824645996;while(0);if((e|0)>=0){l=h;i=b;return +l}l=-h;i=b;return +l}function cc(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;i=i+16|0;g=f;a[g>>0]=e;e=b+16|0;h=c[e>>2]|0;do if(!h)if(!(Uc(b)|0)){j=c[e>>2]|0;break}else{k=-1;i=f;return k|0}else j=h;while(0);h=b+20|0;e=c[h>>2]|0;if(e>>>0<j>>>0?(j=a[g>>0]|0,l=j&255,(l|0)!=(a[b+75>>0]|0)):0){c[h>>2]=e+1;a[e>>0]=j;k=l;i=f;return k|0}if((Wa[c[b+36>>2]&1](b,g,1)|0)!=1){k=-1;i=f;return k|0}k=d[g>>0]|0;i=f;return k|0}function gc(a,b){a=+a;b=b|0;var d=0,e=0,f=0,g=0,j=0,l=0.0,m=0.0,n=0.0,o=0;d=i;h[k>>3]=a;e=c[k>>2]|0;f=c[k+4>>2]|0;g=Vd(e|0,f|0,52)|0;j=g&2047;if((j|0)==2047){l=a;i=d;return +l}else if(!j){if(a!=0.0){m=+gc(a*18446744073709551616.0,b);n=m;o=(c[b>>2]|0)+-64|0}else{n=a;o=0}c[b>>2]=o;l=n;i=d;return +l}else{c[b>>2]=j+-1022;c[k>>2]=e;c[k+4>>2]=f&-2146435073|1071644672;l=+h[k>>3];i=d;return +l}return +(0.0)}function mc(){var a=0,b=0,d=0,e=0,f=0;a=i;Ma(5256);if(!(c[1316]|0)){b=c[1318]|0;d=(aa(c[b>>2]|0,1103515245)|0)+12345&2147483647;c[b>>2]=d;e=d;Fa(5256);i=a;return e|0}else{d=c[1318]|0;b=d+(c[1322]<<2)|0;c[b>>2]=(c[b>>2]|0)+(c[d+(c[1320]<<2)>>2]|0);b=c[1322]|0;f=(c[d+(b<<2)>>2]|0)>>>1;d=b+1|0;b=c[1316]|0;c[1322]=(d|0)==(b|0)?0:d;d=(c[1320]|0)+1|0;c[1320]=(d|0)==(b|0)?0:d;e=f;Fa(5256);i=a;return e|0}return 0}function hc(a){a=+a;var b=0,d=0,e=0,f=0,g=0.0,j=0.0,l=0.0,m=0.0;b=i;i=i+16|0;h[k>>3]=a;d=c[k+4>>2]|0;e=Vd(c[k>>2]|0,d|0,52)|0;f=e&2047;if(f>>>0>1074){g=a;i=b;return +g}e=(d|0)<0;if(e)j=-a;else j=a;l=j+4503599627370496.0;if(f>>>0<1022){h[b>>3]=l;g=a*0.0;i=b;return +g}a=l+-4503599627370496.0-j;if(!(a>.5)){l=j+a;if(!(a<=-.5))m=l;else m=l+1.0}else m=j+a+-1.0;if(!e){g=m;i=b;return +g}g=-m;i=b;return +g}function ec(a){a=+a;var b=0,d=0,e=0,f=0,j=0,l=0,m=0.0,n=0.0,o=0.0;b=i;i=i+16|0;d=b;h[k>>3]=a;e=c[k>>2]|0;f=c[k+4>>2]|0;j=Vd(e|0,f|0,52)|0;l=j&2047;c[k>>2]=e;c[k+4>>2]=f&2147483647;a=+h[k>>3];do if(l>>>0<1022){if(l>>>0>=991){m=a*2.0;n=+qb(m+a*m/(1.0-a))*.5;break}if(!l){g[d>>2]=a;n=a}else n=a}else n=+qb(a/(1.0-a)*2.0)*.5;while(0);if((f|0)>=0){o=n;i=b;return +o}o=-n;i=b;return +o}function ic(a){a=+a;var b=0,d=0,e=0,f=0.0,g=0.0;b=i;i=i+16|0;d=b;h[k>>3]=a;e=c[k+4>>2]&2147483647;c[k>>2]=c[k>>2];c[k+4>>2]=e;a=+h[k>>3];if(e>>>0<1072049730)if(e>>>0<1045430272){h[d>>3]=a+1329227995784915872903807.0e12;f=1.0;i=b;return +f}else{g=+hb(a);f=g*g/((g+1.0)*2.0)+1.0;i=b;return +f}else if(e>>>0<1082535490){g=+Z(+a);f=(g+1.0/g)*.5;i=b;return +f}else{f=+le(a);i=b;return +f}return +(0.0)}function oc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0.0,j=0,k=0.0,l=0;d=i;i=i+112|0;e=d;f=e+0|0;g=f+112|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(g|0));f=e+4|0;c[f>>2]=a;g=e+8|0;c[g>>2]=-1;c[e+44>>2]=a;c[e+76>>2]=-1;ed(e,0);h=+_a(e,0,1);j=(c[f>>2]|0)-(c[g>>2]|0)+(c[e+108>>2]|0)|0;if(!b){k=h;i=d;return +k}if(!j)l=a;else l=a+j|0;c[b>>2]=l;k=h;i=d;return +k}function rc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;do if(!(c[136]|0)){e=za(30)|0;if(!(e+-1&e)){c[138]=e;c[137]=e;c[139]=-1;c[140]=-1;c[141]=0;c[129]=0;c[136]=(Pa(0)|0)&-16^1431655768;break}else Na()}while(0);if((a|0)==-1){c[140]=b;f=1}else if((a|0)==-2)if((c[137]|0)>>>0<=b>>>0?(b+-1&b|0)==0:0){c[138]=b;f=1}else f=0;else if((a|0)==-3){c[139]=b;f=1}else f=0;i=d;return f|0}function lc(a){a=+a;var b=0,d=0,e=0,f=0,g=0,j=0.0,l=0;b=i;i=i+16|0;h[k>>3]=a;d=c[k>>2]|0;e=c[k+4>>2]|0;f=Vd(d|0,e|0,52)|0;g=(f&2047)+-1011|0;if((g|0)>63){j=a;i=b;return +j}f=(g|0)<12;l=Vd(-1,-1,g|0)|0;g=f?-1:l;l=f?2147483647:E;if((g&d|0)==0&(l&e|0)==0){j=a;i=b;return +j}h[b>>3]=a+1329227995784915872903807.0e12;c[k>>2]=d&~g;c[k+4>>2]=e&~l;j=+h[k>>3];i=b;return +j}function kc(a){a=a|0;var b=0,c=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;b=i;c=d[a>>0]|0;e=Td(d[a+1>>0]|0|0,0,8)|0;f=E;g=Td(d[a+2>>0]|0|0,0,16)|0;h=f|E;f=Td(d[a+3>>0]|0|0,0,24)|0;j=h|E|(d[a+4>>0]|0);h=Td(d[a+5>>0]|0|0,0,40)|0;k=j|E;j=Td(d[a+6>>0]|0|0,0,48)|0;l=_d(e|c|g|f|h|0,k|0,j|0,E|0)|0;j=E;k=Td(d[a+7>>0]|0|0,0,56)|0;a=_d(l|0,j|0,k|0,E|0)|0;i=b;return a|0}function qc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0.0,j=0,k=0.0,l=0;d=i;i=i+112|0;e=d;f=e+0|0;g=f+112|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(g|0));f=e+4|0;c[f>>2]=a;g=e+8|0;c[g>>2]=-1;c[e+44>>2]=a;c[e+76>>2]=-1;ed(e,0);h=+_a(e,0,1);j=(c[f>>2]|0)-(c[g>>2]|0)+(c[e+108>>2]|0)|0;if(!b){k=h;i=d;return +k}if(!j)l=a;else l=a+j|0;c[b>>2]=l;k=h;i=d;return +k}function nc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0;d=i;do if(a){if(b>>>0>4294967231){c[(Ia()|0)>>2]=12;e=0;break}if(b>>>0<11)f=16;else f=b+11&-8;g=cb(a+-8|0,f)|0;if(g){e=g+8|0;break}g=Ya(b)|0;if(!g)e=0;else{h=c[a+-4>>2]|0;j=(h&-8)-((h&3|0)==0?8:4)|0;Kc(g|0,a|0,(j>>>0<b>>>0?j:b)|0)|0;$a(a);e=g}}else e=Ya(b)|0;while(0);i=d;return e|0}function vc(b){b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;e=b+74|0;f=a[e>>0]|0;a[e>>0]=f+255|f;f=b+20|0;e=b+44|0;if((c[f>>2]|0)>>>0>(c[e>>2]|0)>>>0)Wa[c[b+36>>2]&1](b,0,0)|0;c[b+16>>2]=0;c[b+28>>2]=0;c[f>>2]=0;f=c[b>>2]|0;if(!(f&20)){g=c[e>>2]|0;c[b+8>>2]=g;c[b+4>>2]=g;h=0;i=d;return h|0}if(!(f&4)){h=-1;i=d;return h|0}c[b>>2]=f|32;h=-1;i=d;return h|0}function jc(a){a=+a;var b=0,d=0,e=0,f=0,h=0,j=0.0,l=0.0,m=0.0,n=0.0,o=0.0;b=i;i=i+16|0;d=b;e=(g[k>>2]=a,c[k>>2]|0);f=e>>>23&255;do if(f>>>0<=149){h=(e|0)<0;if(h)j=-a;else j=a;l=j+8388608.0;if(f>>>0<126){g[d>>2]=l;m=a*0.0;break}n=l+-8388608.0-j;if(!(n>.5)){l=j+n;if(!(n<=-.5))o=l;else o=l+1.0}else o=j+n+-1.0;if(h)m=-o;else m=o}else m=a;while(0);i=b;return +m}function wc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+8|0;g=f|0;h=b>>31|((b|0)<0?-1:0)<<1;j=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;k=e>>31|((e|0)<0?-1:0)<<1;l=((e|0)<0?-1:0)>>31|((e|0)<0?-1:0)<<1;m=Ld(h^a,j^b,h,j)|0;b=E;fb(m,b,Ld(k^d,l^e,k,l)|0,E,g)|0;l=Ld(c[g>>2]^h,c[g+4>>2]^j,h,j)|0;j=E;i=f;return (E=j,l)|0}function pc(a){a=+a;var b=0,d=0,e=0,f=0.0,h=0.0;b=i;i=i+16|0;d=b;e=(g[k>>2]=a,c[k>>2]|0)&2147483647;a=(c[k>>2]=e,+g[k>>2]);if(e>>>0<1060205079)if(e>>>0<964689920){g[d>>2]=a+1329227995784915872903807.0e12;f=1.0;i=b;return +f}else{h=+lb(a);f=h*h/((h+1.0)*2.0)+1.0;i=b;return +f}else if(e>>>0<1118925335){h=+Z(+a);f=(h+1.0/h)*.5;i=b;return +f}else{f=+oe(a);i=b;return +f}return +(0.0)}function uc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0.0,j=0,k=0;d=i;i=i+112|0;e=d;f=e+0|0;g=f+112|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(g|0));f=e+4|0;c[f>>2]=a;g=e+8|0;c[g>>2]=-1;c[e+44>>2]=a;c[e+76>>2]=-1;ed(e,0);h=+_a(e,1,1);j=(c[f>>2]|0)-(c[g>>2]|0)+(c[e+108>>2]|0)|0;if(!b){i=d;return +h}if(!j)k=a;else k=a+j|0;c[b>>2]=k;i=d;return +h}function tc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0.0,j=0,k=0;d=i;i=i+112|0;e=d;f=e+0|0;g=f+112|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(g|0));f=e+4|0;c[f>>2]=a;g=e+8|0;c[g>>2]=-1;c[e+44>>2]=a;c[e+76>>2]=-1;ed(e,0);h=+_a(e,2,1);j=(c[f>>2]|0)-(c[g>>2]|0)+(c[e+108>>2]|0)|0;if(!b){i=d;return +h}if(!j)k=a;else k=a+j|0;c[b>>2]=k;i=d;return +h}function Ac(a,b){a=+a;b=b|0;var d=0,e=0,f=0,h=0.0,j=0.0,l=0.0,m=0;d=i;e=(g[k>>2]=a,c[k>>2]|0);f=e>>>23&255;if((f|0)==255){h=a;i=d;return +h}else if(!f){if(a!=0.0){j=+Ac(a*18446744073709551616.0,b);l=j;m=(c[b>>2]|0)+-64|0}else{l=a;m=0}c[b>>2]=m;h=l;i=d;return +h}else{c[b>>2]=f+-126;h=(c[k>>2]=e&-2139095041|1056964608,+g[k>>2]);i=d;return +h}return +(0.0)}function zc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0.0,j=0,k=0;d=i;i=i+112|0;e=d;f=e+0|0;g=f+112|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(g|0));f=e+4|0;c[f>>2]=a;g=e+8|0;c[g>>2]=-1;c[e+44>>2]=a;c[e+76>>2]=-1;ed(e,0);h=+_a(e,1,1);j=(c[f>>2]|0)-(c[g>>2]|0)+(c[e+108>>2]|0)|0;if(!b){i=d;return +h}if(!j)k=a;else k=a+j|0;c[b>>2]=k;i=d;return +h}function xc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0.0,j=0,k=0;d=i;i=i+112|0;e=d;f=e+0|0;g=f+112|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(g|0));f=e+4|0;c[f>>2]=a;g=e+8|0;c[g>>2]=-1;c[e+44>>2]=a;c[e+76>>2]=-1;ed(e,0);h=+_a(e,2,1);j=(c[f>>2]|0)-(c[g>>2]|0)+(c[e+108>>2]|0)|0;if(!b){i=d;return +h}if(!j)k=a;else k=a+j|0;c[b>>2]=k;i=d;return +h}function sc(a){a=+a;var b=0,d=0,e=0,f=0,h=0.0,j=0.0,l=0.0;b=i;i=i+16|0;d=b;e=(g[k>>2]=a,c[k>>2]|0);f=e&2147483647;a=(c[k>>2]=f,+g[k>>2]);do if(f>>>0<1056964608){if(f>>>0>=796917760){h=a*2.0;j=+wb(h+a*h/(1.0-a))*.5;break}if(f>>>0<8388608){g[d>>2]=a*a;j=a}else j=a}else j=+wb(a/(1.0-a)*2.0)*.5;while(0);if((e|0)>=0){l=j;i=b;return +l}l=-j;i=b;return +l}function yc(a){a=+a;var b=0,d=0,e=0.0,f=0,g=0.0,j=0.0,l=0.0;b=i;h[k>>3]=a;d=c[k+4>>2]|0;e=(d|0)<0?-.5:.5;f=d&2147483647;c[k>>2]=c[k>>2];c[k+4>>2]=f;g=+h[k>>3];if(f>>>0>=1082535490){j=e*2.0*+le(g);i=b;return +j}l=+hb(g);if(f>>>0>=1072693248){j=e*(l+l/(l+1.0));i=b;return +j}if(f>>>0<1045430272){j=a;i=b;return +j}j=e*(l*2.0-l*l/(l+1.0));i=b;return +j}function Bc(a,c){a=a|0;c=c|0;var d=0,f=0,g=0,h=0,j=0,k=0;d=i;f=a+2|0;g=(e[f>>1]|0)<<16|(e[a>>1]|0);h=a+4|0;j=(e[c+2>>1]|0)<<16|(e[c>>1]|0);k=Dd(j|0,((j|0)<0)<<31>>31|(e[c+4>>1]|0)|0,g|0,((g|0)<0)<<31>>31|(e[h>>1]|0)|0)|0;g=_d(k|0,E|0,e[c+6>>1]|0|0,0)|0;c=E;b[a>>1]=g;a=Vd(g|0,c|0,16)|0;b[f>>1]=a;b[h>>1]=c;E=c&65535;i=d;return g|0}function Kc(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((e|0)>=4096)return xa(b|0,d|0,e|0)|0;f=b|0;if((b&3)==(d&3)){while(b&3){if(!e)return f|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function Gc(a){a=+a;var b=0,d=0,e=0.0,f=0,h=0.0,j=0.0,l=0.0;b=i;d=(g[k>>2]=a,c[k>>2]|0);e=(d|0)<0?-.5:.5;f=d&2147483647;h=(c[k>>2]=f,+g[k>>2]);if(f>>>0>=1118925335){j=e*2.0*+oe(h);i=b;return +j}l=+lb(h);if(f>>>0>=1065353216){j=e*(l+l/(l+1.0));i=b;return +j}if(f>>>0<964689920){j=a;i=b;return +j}j=e*(l*2.0-l*l/(l+1.0));i=b;return +j}function Dc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+112|0;f=e;c[f>>2]=0;g=f+4|0;c[g>>2]=a;c[f+44>>2]=a;if((a|0)<0)c[f+8>>2]=-1;else c[f+8>>2]=a+2147483647;c[f+76>>2]=-1;ed(f,0);h=bb(f,d,1,0,-2147483648)|0;d=E;if(!b){E=d;i=e;return h|0}c[b>>2]=a+((c[g>>2]|0)+(c[f+108>>2]|0)-(c[f+8>>2]|0));E=d;i=e;return h|0}function Cc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+112|0;f=e;c[f>>2]=0;g=f+4|0;c[g>>2]=a;c[f+44>>2]=a;if((a|0)<0)c[f+8>>2]=-1;else c[f+8>>2]=a+2147483647;c[f+76>>2]=-1;ed(f,0);h=bb(f,d,1,0,-2147483648)|0;d=E;if(!b){E=d;i=e;return h|0}c[b>>2]=a+((c[g>>2]|0)+(c[f+108>>2]|0)-(c[f+8>>2]|0));E=d;i=e;return h|0}function Fc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+112|0;f=e;c[f>>2]=0;g=f+4|0;c[g>>2]=a;c[f+44>>2]=a;if((a|0)<0)c[f+8>>2]=-1;else c[f+8>>2]=a+2147483647;c[f+76>>2]=-1;ed(f,0);h=bb(f,d,1,-1,-1)|0;d=E;if(!b){E=d;i=e;return h|0}c[b>>2]=a+((c[g>>2]|0)+(c[f+108>>2]|0)-(c[f+8>>2]|0));E=d;i=e;return h|0}function Ec(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+112|0;f=e;c[f>>2]=0;g=f+4|0;c[g>>2]=a;c[f+44>>2]=a;if((a|0)<0)c[f+8>>2]=-1;else c[f+8>>2]=a+2147483647;c[f+76>>2]=-1;ed(f,0);h=bb(f,d,1,-1,-1)|0;d=E;if(!b){E=d;i=e;return h|0}c[b>>2]=a+((c[g>>2]|0)+(c[f+108>>2]|0)-(c[f+8>>2]|0));E=d;i=e;return h|0}function Mc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=b>>31|((b|0)<0?-1:0)<<1;f=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;g=d>>31|((d|0)<0?-1:0)<<1;h=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;i=Ld(e^a,f^b,e,f)|0;b=E;a=g^e;e=h^f;f=Ld((fb(i,b,Ld(g^c,h^d,g,h)|0,E,0)|0)^a,E^e,a,e)|0;return f|0}function Ic(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+112|0;f=e;c[f>>2]=0;g=f+4|0;c[g>>2]=a;c[f+44>>2]=a;if((a|0)<0)c[f+8>>2]=-1;else c[f+8>>2]=a+2147483647;c[f+76>>2]=-1;ed(f,0);h=bb(f,d,1,-2147483648,0)|0;if(!b){i=e;return h|0}c[b>>2]=a+((c[g>>2]|0)+(c[f+108>>2]|0)-(c[f+8>>2]|0));i=e;return h|0}function Hc(a,b){a=+a;b=+b;var d=0,e=0,f=0.0;d=i;h[k>>3]=a;e=c[k+4>>2]&2147483647;if(e>>>0>2146435072|(e|0)==2146435072&(c[k>>2]|0)>>>0>0){f=a;i=d;return +f}h[k>>3]=b;e=c[k+4>>2]&2147483647;if(e>>>0>2146435072|(e|0)==2146435072&(c[k>>2]|0)>>>0>0){f=b;i=d;return +f}if(!(a>b)){f=0.0;i=d;return +f}f=a-b;i=d;return +f}function Xc(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;if((e|0)>=20){d=d&255;g=b&3;h=d|d<<8|d<<16|d<<24;i=f&~3;if(g){g=b+4-g|0;while((b|0)<(g|0)){a[b>>0]=d;b=b+1|0}}while((b|0)<(i|0)){c[b>>2]=h;b=b+4|0}}while((b|0)<(f|0)){a[b>>0]=d;b=b+1|0}return b-e|0}function Jc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+112|0;f=e;c[f>>2]=0;g=f+4|0;c[g>>2]=a;c[f+44>>2]=a;if((a|0)<0)c[f+8>>2]=-1;else c[f+8>>2]=a+2147483647;c[f+76>>2]=-1;ed(f,0);h=bb(f,d,1,-1,0)|0;if(!b){i=e;return h|0}c[b>>2]=a+((c[g>>2]|0)+(c[f+108>>2]|0)-(c[f+8>>2]|0));i=e;return h|0}function Lc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;if((b|0)!=8){f=b>>>2;if(!((b&3|0)!=0|(f|0)==0)?(f+1073741823&f|0)==0:0)if((-64-b|0)>>>0<d>>>0)g=12;else{h=tb(b>>>0<16?16:b,d)|0;j=7}else g=22}else{h=Ya(d)|0;j=7}if((j|0)==7)if(!h)g=12;else{c[a>>2]=h;g=0}i=e;return g|0}function Nc(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;a:do if(!d)f=0;else{g=d;h=b;j=c;while(1){k=a[h>>0]|0;l=a[j>>0]|0;if(k<<24>>24!=l<<24>>24)break;g=g+-1|0;if(!g){f=0;break a}else{h=h+1|0;j=j+1|0}}f=(k&255)-(l&255)|0}while(0);i=e;return f|0}function Tc(b,c){b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=i;e=a[b>>0]|0;f=a[c>>0]|0;if(e<<24>>24==0?1:e<<24>>24!=f<<24>>24){g=e;h=f}else{f=b;b=c;do{f=f+1|0;b=b+1|0;c=a[f>>0]|0;e=a[b>>0]|0}while(!(c<<24>>24==0?1:c<<24>>24!=e<<24>>24));g=c;h=e}i=d;return (g&255)-(h&255)|0}function Vc(a){a=+a;var b=0,d=0,e=0,f=0.0,g=0.0;b=i;h[k>>3]=a;d=c[k+4>>2]|0;e=d&2146435072;if(e>>>0>1126170624|(e|0)==1126170624&0>0){f=a;i=b;return +f}e=(d|0)<0;if(e)g=a+-4503599627370496.0+4503599627370496.0;else g=a+4503599627370496.0+-4503599627370496.0;if(!(g==0.0)){f=g;i=b;return +f}f=e?-0.0:0.0;i=b;return +f}function Uc(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;e=b+74|0;f=a[e>>0]|0;a[e>>0]=f+255|f;f=c[b>>2]|0;if(!(f&8)){c[b+8>>2]=0;c[b+4>>2]=0;e=c[b+44>>2]|0;c[b+28>>2]=e;c[b+20>>2]=e;c[b+16>>2]=e+(c[b+48>>2]|0);g=0;i=d;return g|0}else{c[b>>2]=f|32;g=-1;i=d;return g|0}return 0}function Pc(a){a=+a;var b=0,d=0,e=0,f=0,g=0,j=0;b=i;h[k>>3]=a;d=c[k>>2]|0;e=c[k+4>>2]|0;f=Vd(d|0,e|0,52)|0;g=f&2047;if((g|0)==2047){j=(d|0)==0&(e&1048575|0)==0&1;i=b;return j|0}else if(!g){j=(d|0)!=0|(e&2147483647|0)!=0?3:2;i=b;return j|0}else{j=4;i=b;return j|0}return 0}function Oc(a){a=+a;var b=0,d=0,e=0,f=0.0,g=0.0;b=i;h[k>>3]=a;d=Vd(c[k>>2]|0,c[k+4>>2]|0,52)|0;e=d&2047;if(e>>>0<1024){f=a+-1.0;g=+qb(f+ +Q(+(f*f+f*2.0)));i=b;return +g}if(e>>>0<1049){g=+_(+(a*2.0-1.0/(+Q(+(a*a+-1.0))+a)));i=b;return +g}else{g=+_(+a)+.6931471805599453;i=b;return +g}return +(0.0)}function Sc(a){a=+a;var b=0,d=0,e=0,f=0.0,h=0;b=i;i=i+16|0;d=(g[k>>2]=a,c[k>>2]|0);e=(d>>>23&255)+-118|0;if((e|0)>31){f=a;i=b;return +f}h=(e|0)<9?2147483647:-1>>>e;if(!(h&d)){f=a;i=b;return +f}g[b>>2]=a+1329227995784915872903807.0e12;f=(c[k>>2]=d&~h,+g[k>>2]);i=b;return +f}function Wc(a){a=+a;var b=0,d=0,e=0.0,f=0.0;b=i;d=(g[k>>2]=a,c[k>>2]|0)&2147483647;if(d>>>0<1073741824){e=a+-1.0;f=+wb(e+ +Q(+(e*e+e*2.0)));i=b;return +f}if(d>>>0<1166016512){f=+_(+(a*2.0-1.0/(+Q(+(a*a+-1.0))+a)));i=b;return +f}else{f=+_(+a)+.6931471824645996;i=b;return +f}return +(0.0)}function Rc(a,b){a=+a;b=+b;var d=0,e=0,f=0,h=0.0;d=i;e=(g[k>>2]=a,c[k>>2]|0);do if((e&2147483647)>>>0<=2139095040){f=(g[k>>2]=b,c[k>>2]|0);if((f&2147483647)>>>0<=2139095040)if((f^e|0)<0){h=(e|0)<0?b:a;break}else{h=a<b?b:a;break}else h=a}else h=b;while(0);i=d;return +h}function Qc(a,b){a=+a;b=+b;var d=0,e=0,f=0,h=0.0;d=i;e=(g[k>>2]=a,c[k>>2]|0);do if((e&2147483647)>>>0<=2139095040){f=(g[k>>2]=b,c[k>>2]|0);if((f&2147483647)>>>0<=2139095040)if((f^e|0)<0){h=(e|0)<0?a:b;break}else{h=a<b?a:b;break}else h=a}else h=b;while(0);i=d;return +h}function Zc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;if(a){e=aa(b,a)|0;if((b|a)>>>0>65535)f=((e>>>0)/(a>>>0)|0|0)==(b|0)?e:-1;else f=e}else f=0;e=Ya(f)|0;if(!e){i=d;return e|0}if(!(c[e+-4>>2]&3)){i=d;return e|0}Xc(e|0,0,f|0)|0;i=d;return e|0}function _c(a){a=a|0;var b=0,d=0,e=0;b=i;do if(!(c[136]|0)){d=za(30)|0;if(!(d+-1&d)){c[138]=d;c[137]=d;c[139]=-1;c[140]=-1;c[141]=0;c[129]=0;c[136]=(Pa(0)|0)&-16^1431655768;break}else Na()}while(0);d=c[137]|0;e=Wd(d,a+-1+d&0-d)|0;i=b;return e|0}function Yc(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;if(c[136]|0){d=c[137]|0;e=Wd(d,a)|0;i=b;return e|0}f=za(30)|0;if(f+-1&f)Na();c[138]=f;c[137]=f;c[139]=-1;c[140]=-1;c[141]=0;c[129]=0;c[136]=(Pa(0)|0)&-16^1431655768;d=c[137]|0;e=Wd(d,a)|0;i=b;return e|0}function ed(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=i;c[a+104>>2]=b;e=c[a+8>>2]|0;f=c[a+4>>2]|0;g=e-f|0;c[a+108>>2]=g;if((b|0)!=0&(g|0)>(b|0)){c[a+100>>2]=f+b;i=d;return}else{c[a+100>>2]=e;i=d;return}}function bd(a){a=+a;var b=0,d=0,e=0,f=0.0,h=0.0;b=i;d=(g[k>>2]=a,c[k>>2]|0);if((d&2130706432)>>>0<=1249902592){e=(d|0)<0;if(e)f=a+-8388608.0+8388608.0;else f=a+8388608.0+-8388608.0;if(f==0.0)h=e?-0.0:0.0;else h=f}else h=a;i=b;return +h}function gd(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=a&65535;d=b&65535;e=aa(d,c)|0;f=a>>>16;a=(e>>>16)+(aa(d,f)|0)|0;d=b>>>16;b=aa(d,c)|0;return (E=(a>>>16)+(aa(d,f)|0)+(((a&65535)+b|0)>>>16)|0,a+b<<16|e&65535|0)|0}function cd(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;if(!a){i=d;return 0}if(b>>>0>4294967231){c[(Ia()|0)>>2]=12;i=d;return 0}if(b>>>0<11)e=16;else e=b+11&-8;b=a+-8|0;f=(cb(b,e)|0)==(b|0);i=d;return (f?a:0)|0}function hd(a){a=a|0;c[a+36>>2]=0;c[a+32>>2]=0;c[a>>2]=1779033703;c[a+4>>2]=-1150833019;c[a+8>>2]=1013904242;c[a+12>>2]=-1521486534;c[a+16>>2]=1359893119;c[a+20>>2]=-1694144372;c[a+24>>2]=528734635;c[a+28>>2]=1541459225;return}function fd(a){a=a|0;var b=0,d=0;b=i;Ma(5256);d=(c[1318]|0)+-4|0;c[d>>2]=c[1322]<<8|c[1316]<<16|c[1320];c[1318]=a+4;c[1316]=(c[a>>2]|0)>>>16;c[1322]=(c[a>>2]|0)>>>8&255;c[1320]=c[a>>2]&255;Fa(5256);i=b;return d|0}function pd(b){b=b|0;var c=0;c=a[n+(b>>>24)>>0]|0;if((c|0)<8)return c|0;c=a[n+(b>>16&255)>>0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>8&255)>>0]|0;if((c|0)<8)return c+16|0;return (a[n+(b&255)>>0]|0)+24|0}function od(b){b=b|0;var c=0;c=a[m+(b&255)>>0]|0;if((c|0)<8)return c|0;c=a[m+(b>>8&255)>>0]|0;if((c|0)<8)return c+8|0;c=a[m+(b>>16&255)>>0]|0;if((c|0)<8)return c+16|0;return (a[m+(b>>>24)>>0]|0)+24|0}function md(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;f=a+20|0;g=c[f>>2]|0;h=(c[a+16>>2]|0)-g|0;a=h>>>0>d>>>0?d:h;Kc(g|0,b|0,a|0)|0;c[f>>2]=(c[f>>2]|0)+a;i=e;return d|0}function dd(a,b){a=+a;b=+b;var d=0,e=0.0;d=i;if(((g[k>>2]=a,c[k>>2]|0)&2147483647)>>>0<=2139095040)if(((g[k>>2]=b,c[k>>2]|0)&2147483647)>>>0<=2139095040)if(a>b)e=a-b;else e=0.0;else e=b;else e=a;i=d;return +e}function kd(){var a=0,b=0,d=0,e=0;a=i;b=5248;d=Dd(c[b>>2]|0,c[b+4>>2]|0,1284865837,1481765933)|0;b=_d(d|0,E|0,1,0)|0;d=E;e=5248;c[e>>2]=b;c[e+4>>2]=d;e=Vd(b|0,d|0,33)|0;i=a;return e|0}function $c(a,b){a=+a;b=+b;var d=0,e=0,f=0,g=0;d=i;h[k>>3]=a;e=c[k>>2]|0;f=c[k+4>>2]|0;h[k>>3]=b;g=c[k+4>>2]&-2147483648|f&2147483647;c[k>>2]=e;c[k+4>>2]=g;b=+h[k>>3];i=d;return +b}function ad(b){b=b|0;a[k>>0]=a[b>>0];a[k+1>>0]=a[b+1>>0];a[k+2>>0]=a[b+2>>0];a[k+3>>0]=a[b+3>>0];a[k+4>>0]=a[b+4>>0];a[k+5>>0]=a[b+5>>0];a[k+6>>0]=a[b+6>>0];a[k+7>>0]=a[b+7>>0]}function jd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;f=d>>>2;if(!f){i=e;return}else g=0;do{ie(a+(g<<2)|0,c[b+(g<<2)>>2]|0);g=g+1|0}while(g>>>0<f>>>0);i=e;return}function nd(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;e=i;if(!d){i=e;return}else f=0;do{g=b+f|0;a[g>>0]=a[g>>0]^a[c+f>>0];f=f+1|0}while((f|0)!=(d|0));i=e;return}function ld(a){a=+a;var b=0,d=0,e=0,f=0;b=i;d=(g[k>>2]=a,c[k>>2]|0);e=d>>>23&255;if((e|0)==255)f=(d&8388607|0)==0&1;else if(!e)f=(d&2147483647|0)!=0?3:2;else f=4;i=b;return f|0}function id(a){a=a|0;var b=0,e=0,f=0;b=i;i=i+16|0;e=b;if((c[a+8>>2]|0)==0?(vc(a)|0)!=0:0)f=-1;else if((Wa[c[a+32>>2]&1](a,e,1)|0)==1)f=d[e>>0]|0;else f=-1;i=b;return f|0}function td(a){a=a|0;b[2616]=b[a+0>>1]|0;b[2617]=b[a+2>>1]|0;b[2618]=b[a+4>>1]|0;b[2619]=b[a+6>>1]|0;b[2620]=b[a+8>>1]|0;b[2621]=b[a+10>>1]|0;b[2622]=b[a+12>>1]|0;return}function ud(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0;e=i;if(!d){i=e;return}else f=0;do{a[b+f>>0]=a[c+f>>0]|0;f=f+1|0}while((f|0)!=(d|0));i=e;return}function zd(a){a=+a;var b=0,c=0.0;b=i;c=+bd(a);E=+P(c)>=1.0?(c>0.0?(da(+O(c/4294967296.0),4294967295.0)|0)>>>0:~~+$((c-+(~~c>>>0))/4294967296.0)>>>0):0;i=b;return ~~c>>>0|0}function yd(a){a=+a;var b=0,c=0.0;b=i;c=+hc(a);E=+P(c)>=1.0?(c>0.0?(da(+O(c/4294967296.0),4294967295.0)|0)>>>0:~~+$((c-+(~~c>>>0))/4294967296.0)>>>0):0;i=b;return ~~c>>>0|0}function xd(a){a=+a;var b=0,c=0.0;b=i;c=+jc(a);E=+P(c)>=1.0?(c>0.0?(da(+O(c/4294967296.0),4294967295.0)|0)>>>0:~~+$((c-+(~~c>>>0))/4294967296.0)>>>0):0;i=b;return ~~c>>>0|0}function wd(a){a=+a;var b=0,c=0.0;b=i;c=+Ye(a);E=+P(c)>=1.0?(c>0.0?(da(+O(c/4294967296.0),4294967295.0)|0)>>>0:~~+$((c-+(~~c>>>0))/4294967296.0)>>>0):0;i=b;return ~~c>>>0|0}function Ad(a){a=+a;var b=0,c=0.0;b=i;c=+Vc(a);E=+P(c)>=1.0?(c>0.0?(da(+O(c/4294967296.0),4294967295.0)|0)>>>0:~~+$((c-+(~~c>>>0))/4294967296.0)>>>0):0;i=b;return ~~c>>>0|0}function vd(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+16|0;d=b;jd(d,a+32|0,8);e=(c[a+36>>2]|0)>>>3&63;Ob(a,8,(e>>>0<56?56:120)-e|0);Ob(a,d,8);i=b;return}function Id(a){a=a|0;var b=0;b=(aa(c[a>>2]|0,1103515245)|0)+12345|0;c[a>>2]=b;a=b>>>11^b;b=a<<7&-1658038656^a;a=b<<15&-272236544^b;return (a>>>18^a)>>>1|0}function rd(a){a=a|0;var b=0,d=0,e=0.0;b=i;d=Bc(a,5238|0)|0;a=Td(d|0,E|0,4)|0;d=E|1072693248;c[k>>2]=a;c[k+4>>2]=d;e=+h[k>>3]+-1.0;i=b;return +e}function sd(){var a=0,b=0,d=0,e=0.0;a=i;b=Bc(5232,5238|0)|0;d=Td(b|0,E|0,4)|0;b=E|1072693248;c[k>>2]=d;c[k+4>>2]=b;e=+h[k>>3]+-1.0;i=a;return +e}function qd(a,b){a=+a;b=+b;var d=0,e=0;d=i;e=(g[k>>2]=a,c[k>>2]|0);a=(c[k>>2]=(g[k>>2]=b,c[k>>2]|0)&-2147483648|e&2147483647,+g[k>>2]);i=d;return +a}function Cd(a){a=a|0;var b=0,d=0,e=0;b=i;if((a|0)!=0?(d=c[a+-4>>2]|0,a=d&3,(a|0)!=1):0)e=(d&-8)-((a|0)==0?8:4)|0;else e=0;i=b;return e|0}function Bd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+8|0;g=f|0;fb(a,b,d,e,g)|0;i=f;return (E=c[g+4>>2]|0,c[g>>2]|0)|0}function Dd(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;a=c;c=gd(e,a)|0;f=E;return (E=(aa(b,a)|0)+(aa(d,e)|0)+f|f&0,c|0|0)|0}function Ed(b,c){b=b|0;c=c|0;var d=0;d=i;vd(c);jd(b,c,32);b=c+0|0;c=b+104|0;do{a[b>>0]=0;b=b+1|0}while((b|0)<(c|0));i=d;return}function Fd(a){a=a|0;b[2712]=b[2616]|0;b[2713]=b[2617]|0;b[2714]=b[2618]|0;b[2616]=b[a+0>>1]|0;b[2617]=b[a+2>>1]|0;b[2618]=b[a+4>>1]|0;return 5424}function Kd(){}function Ld(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=b-d>>>0;e=b-d-(c>>>0>a>>>0|0)>>>0;return (E=e,a-c>>>0|0)|0}function Qd(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){E=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}E=(b|0)<0?-1:0;return b>>c-32|0}function Hd(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;e=0;do{c[a+(e<<2)>>2]=ne(b+(e<<2)|0)|0;e=e+1|0}while((e|0)!=16);i=d;return}function Jd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+16|0;g=f;c[g>>2]=e;e=Nb(a,b,d,g)|0;i=f;return e|0}function Td(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){E=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}E=a<<c-32;return 0}function Od(a){a=+a;var b=0,d=0;b=i;h[k>>3]=a;d=c[k+4>>2]&2146435072;i=b;return (d>>>0<2146435072|(d|0)==2146435072&0<0)&1|0}function Vd(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){E=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}E=0;return b>>>c-32|0}function Pd(a){a=a|0;var c=0,d=0;c=i;i=i+16|0;d=c;b[d>>1]=13070;b[d+2>>1]=a;b[d+4>>1]=a>>>16;Fd(d)|0;i=c;return}function Md(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;i=i+16|0;f=e;c[f>>2]=b;b=jb(a,f,3,d)|0;i=e;return b|0}function Gd(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=i;i=i+32|0;d=c;Ed(d,b);e=b+104|0;Ob(e,d,32);Ed(a,e);i=c;return}function Rd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;i=i+16|0;f=e;c[f>>2]=d;d=de(a,b,f)|0;i=e;return d|0}function _d(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=a+c>>>0;return (E=b+d+(e>>>0<a>>>0|0)>>>0,e|0)|0}function Ud(a,b){a=+a;b=b|0;var c=0,d=0,e=0.0;c=i;i=i+16|0;d=c;e=+Eb(a,d);h[b>>3]=+h[d>>3];i=c;return +e}function Yd(a){a=a|0;var b=0,d=0;if((a|0)==-1)b=0;else{d=c[138]|0;b=a+-1+d&0-d}c[128]=b;return b|0}function le(a){a=+a;var b=0.0;b=+Z(+(a+-1416.0996898839683))*2247116418577894884661631.0e283*2247116418577894884661631.0e283;return +b}function oe(a){a=+a;var b=0.0;b=+Z(+(a+-162.88958740234375))*1661534994731144841129758.0e11*1661534994731144841129758.0e11;return +b}function Xd(a){a=+a;var b=0,d=0;b=i;d=((g[k>>2]=a,c[k>>2]|0)&2139095040)>>>0<2139095040&1;i=b;return d|0}function Wd(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;if(a>>>0<9)d=Ya(b)|0;else d=tb(a,b)|0;i=c;return d|0}function ie(b,c){b=b|0;c=c|0;a[b+3>>0]=c;a[b+2>>0]=c>>>8;a[b+1>>0]=c>>>16;a[b>>0]=c>>>24;return}function he(b,c){b=b|0;c=c|0;a[b>>0]=c;a[b+1>>0]=c>>>8;a[b+2>>0]=c>>>16;a[b+3>>0]=c>>>24;return}function Nd(b){b=b|0;a[k>>0]=a[b>>0];a[k+1>>0]=a[b+1>>0];a[k+2>>0]=a[b+2>>0];a[k+3>>0]=a[b+3>>0]}function de(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=Nb(a,2147483647,b,c)|0;i=d;return e|0}function Sd(a){a=+a;var b=0,d=0;b=i;h[k>>3]=a;d=Vd(c[k>>2]|0,c[k+4>>2]|0,63)|0;i=b;return d|0}function ne(a){a=a|0;return (d[a+2>>0]|0)<<8|(d[a+3>>0]|0)|(d[a+1>>0]|0)<<16|(d[a>>0]|0)<<24|0}function me(a){a=a|0;return (d[a+1>>0]|0)<<8|(d[a>>0]|0)|(d[a+2>>0]|0)<<16|(d[a+3>>0]|0)<<24|0}function pe(a){a=a|0;var b=0;if((a+-48|0)>>>0<10)b=1;else b=((a|32)+-97|0)>>>0<6;return b&1|0}function ae(a){a=a|0;var b=0,c=0;b=i;c=Bc(a,5238|0)|0;a=Vd(c|0,E|0,16)|0;i=b;return a|0}function Zd(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;if(!a)d=0;else d=Vb(a,b,0)|0;i=c;return d|0}function $d(a){a=a|0;var b=0,c=0;b=i;c=Bc(a,5238|0)|0;a=Vd(c|0,E|0,17)|0;i=b;return a|0}function ee(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=jb(a,b,0,c)|0;i=d;return e|0}function ke(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;d=kc(a+((b<<7)+-64)|0)|0;i=c;return d|0}function ce(){var a=0,b=0,c=0;a=i;b=Bc(5232,5238|0)|0;c=Vd(b|0,E|0,17)|0;i=a;return c|0}function be(){var a=0,b=0,c=0;a=i;b=Bc(5232,5238|0)|0;c=Vd(b|0,E|0,16)|0;i=a;return c|0}function re(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=fb(a,b,c,d,0)|0;return e|0}function je(a,b){a=+a;b=+b;var c=0,d=0.0;c=i;i=i+16|0;d=+wa(+a,+b,c|0);i=c;return +d}function ge(a,b){a=+a;b=+b;var c=0,d=0.0;c=i;i=i+16|0;d=+ma(+a,+b,c|0);i=c;return +d}function se(a,b,c){a=+a;b=+b;c=+c;var d=0,e=0.0;d=i;e=+Da(+a,+b,+c);i=d;return +e}function fe(a){a=+a;var b=0,d=0;b=i;d=(g[k>>2]=a,c[k>>2]|0)>>>31;i=b;return d|0}function Ce(a){a=a|0;var b=0;if((a|0)==32)b=1;else b=(a+-9|0)>>>0<5;return b&1|0}function te(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return Wa[a&1](b|0,c|0,d|0)|0}function xe(a){a=a|0;var b=0,c=0;b=i;c=(nf(a)|0)==0;i=b;return (c?a:a|32)|0}function ve(a){a=+a;var b=0,c=0,d=0.0;b=i;c=vf(32)|0;d=+Vc(a);i=b;return ~~d|0}function we(a){a=+a;var b=0,c=0,d=0.0;b=i;c=vf(32)|0;d=+Vc(a);i=b;return +d}function ue(a){a=+a;var b=0,c=0,d=0.0;b=i;c=vf(32)|0;d=+bd(a);i=b;return +d}function qe(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=i;Ob(a,b,c);i=d;return}function ze(a,b,c){a=+a;b=b|0;c=c|0;g[b>>2]=+T(+a);g[c>>2]=+S(+a);return}function ye(a,b,c){a=+a;b=b|0;c=c|0;h[b>>3]=+T(+a);h[c>>3]=+S(+a);return}function Ae(a,b,c){a=+a;b=b|0;c=c|0;h[b>>3]=+T(+a);h[c>>3]=+S(+a);return}function Me(b){b=b|0;var c=0;c=b;while(a[c>>0]|0)c=c+1|0;return c-b|0}function Ge(a,b){a=+a;b=b|0;var c=0,d=0.0;c=i;d=+gc(a,b);i=c;return +d}function Fe(a,b){a=+a;b=b|0;var c=0,d=0.0;c=i;d=+_b(a,b);i=c;return +d}function Ue(a){a=a|0;var b=0;b=5248;c[b>>2]=a+-1;c[b+4>>2]=0;return}function Le(a,b){a=+a;b=+b;var c=0,d=0.0;c=i;d=+Hc(a,b);i=c;return +d}function Ke(a,b){a=+a;b=+b;var c=0,d=0.0;c=i;d=+bc(a,b);i=c;return +d}function Je(a,b){a=+a;b=+b;var c=0,d=0.0;c=i;d=+ac(a,b);i=c;return +d}function Ie(a,b){a=+a;b=+b;var c=0,d=0.0;c=i;d=+eb(a,b);i=c;return +d}function He(a,b){a=+a;b=+b;var c=0,d=0.0;c=i;d=+ub(a,b);i=c;return +d}function Ee(a,b){a=+a;b=+b;var c=0,d=0.0;c=i;d=+$c(a,b);i=c;return +d}function De(a,b){a=+a;b=+b;var c=0,d=0.0;c=i;d=+je(a,b);i=c;return +d}function Be(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+15&-16;return b|0}function Te(a){a=a|0;var b=0,c=0.0;b=i;c=+zc(a,0);i=b;return +c}function Se(a){a=+a;var b=0,c=0;b=i;c=ve(a)|0;i=b;return c|0}function Oe(a){a=+a;var b=0,c=0;b=i;c=Ad(a)|0;i=b;return c|0}function We(a){a=+a;var b=0,c=0;b=i;c=~~+bd(a);i=b;return c|0}function Ve(a){a=+a;var b=0,c=0;b=i;c=~~+hc(a);i=b;return c|0}function Qe(a){a=+a;var b=0,c=0;b=i;c=~~+jc(a);i=b;return c|0}function Pe(a){a=+a;var b=0,c=0;b=i;c=~~+Ye(a);i=b;return c|0}function kf(a){a=+a;var b=0,c=0.0;b=i;c=+yb(a);i=b;return +c}function jf(a){a=+a;var b=0,c=0.0;b=i;c=+ic(a);i=b;return +c}function hf(a){a=+a;var b=0,c=0.0;b=i;c=+Ab(a);i=b;return +c}function gf(a){a=+a;var b=0,c=0.0;b=i;c=+rb(a);i=b;return +c}function ff(a){a=+a;var b=0,c=0.0;b=i;c=+Vc(a);i=b;return +c}function ef(a){a=+a;var b=0,c=0.0;b=i;c=+yc(a);i=b;return +c}function df(a){a=+a;var b=0,c=0.0;b=i;c=+Xb(a);i=b;return +c}function cf(a){a=+a;var b=0,c=0.0;b=i;c=+Oc(a);i=b;return +c}function bf(a){a=+a;var b=0,c=0.0;b=i;c=+Sb(a);i=b;return +c}function af(a){a=+a;var b=0,c=0.0;b=i;c=+ec(a);i=b;return +c}function _e(a){a=+a;var b=0,c=0.0;b=i;c=+ob(a);i=b;return +c}function Ze(a){a=+a;var b=0,c=0.0;b=i;c=+qb(a);i=b;return +c}function Ye(a){a=+a;var b=0,c=0.0;b=i;c=+hc(a);i=b;return +c}function Xe(a){a=+a;var b=0,c=0.0;b=i;c=+lc(a);i=b;return +c}function Ne(a){a=+a;var b=0,c=0.0;b=i;c=+we(a);i=b;return +c}function $e(a){a=+a;var b=0,c=0.0;b=i;c=+hb(a);i=b;return +c}function lf(){var a=0;a=c[128]|0;return ((a|0)==0?-1:a)|0}function mf(a,b,c){a=a|0;b=b|0;c=c|0;ba(0);return 0}function Re(a,b){a=a|0;b=b|0;if(!p){p=a;q=b}}function of(a){a=a|0;return (a+-48|0)>>>0<10|0}function nf(a){a=a|0;return (a+-65|0)>>>0<26|0}function zf(a){a=a|0;return +t}function Bf(a){a=a|0;return +t}function Af(a){a=a|0;return +t}function yf(a){a=a|0;return 0}function xf(a){a=a|0;return 0}function wf(a){a=a|0;return 0}function vf(a){a=a|0;return 0}function uf(a){a=a|0;return 0}function tf(a){a=a|0;return 0}function rf(a){a=a|0;E=a}function qf(a){a=a|0;i=a}function sf(){return c[126]|0}function pf(){return c[127]|0}function Df(){return i|0}function Cf(){return E|0}function Ef(){return 0}

// EMSCRIPTEN_END_FUNCS

 var Wa = [ mf, md ];
 return {
  _crypto_scrypt: sb,
  _i64Subtract: Ld,
  _free: $a,
  _realloc: nc,
  _i64Add: _d,
  _strlen: Me,
  _memset: Xc,
  _malloc: Ya,
  _memcpy: Kc,
  _bitshift64Lshr: Vd,
  _calloc: Zc,
  _bitshift64Shl: Td,
  runPostSets: Kd,
  stackAlloc: Be,
  stackSave: Df,
  stackRestore: qf,
  setThrew: Re,
  setTempRet0: rf,
  getTempRet0: Cf,
  dynCall_iiii: te
 };
})


// EMSCRIPTEN_END_ASM
(u.Sd, u.Td, P);
u._crypto_scrypt = W._crypto_scrypt;
var ob = u._i64Subtract = W._i64Subtract, Ja = u._free = W._free;
u._realloc = W._realloc;
var ac = u._i64Add = W._i64Add, Xb = u._strlen = W._strlen, qb = u._memset = W._memset, Ha = u._malloc = W._malloc, Bc = u._memcpy = W._memcpy, Ac = u._bitshift64Lshr = W._bitshift64Lshr;
u._calloc = W._calloc;
var ub = u._bitshift64Shl = W._bitshift64Shl;
u.runPostSets = W.runPostSets;
u.dynCall_iiii = W.dynCall_iiii;
A.Lb = W.stackAlloc;
A.Nb = W.stackSave;
A.Mb = W.stackRestore;
A.$e = W.setTempRet0;
A.te = W.getTempRet0;
var $b;
function X(a, b) {
  a != l && ("number" == typeof a ? this.Z(a) : b == l && "string" != typeof a ? this.P(a, 256) : this.P(a, b))
}
function Fc() {
  return new X(l)
}
function Gc(a, b) {
  var c = Hc[a.charCodeAt(b)];
  return c == l ? -1 : c
}
function Ic(a) {
  var b = Fc();
  b.sa(a);
  return b
}
function Jc(a) {
  var b = 1, c;
  if(0 != (c = a >>> 16)) {
    a = c, b += 16
  }
  if(0 != (c = a >> 8)) {
    a = c, b += 8
  }
  if(0 != (c = a >> 4)) {
    a = c, b += 4
  }
  if(0 != (c = a >> 2)) {
    a = c, b += 2
  }
  0 != a >> 1 && (b += 1);
  return b
}
function Y(a, b) {
  this.C = a | 0;
  this.K = b | 0
}
Y.Fc = {};
Y.sa = function(a) {
  if(-128 <= a && 128 > a) {
    var b = Y.Fc[a];
    if(b) {
      return b
    }
  }
  b = new Y(a | 0, 0 > a ? -1 : 0);
  -128 <= a && 128 > a && (Y.Fc[a] = b);
  return b
};
Y.Z = function(a) {
  return isNaN(a) || !isFinite(a) ? Y.ZERO : a <= -Y.Hc ? Y.MIN_VALUE : a + 1 >= Y.Hc ? Y.MAX_VALUE : 0 > a ? Y.Z(-a).I() : new Y(a % Y.qa | 0, a / Y.qa | 0)
};
Y.la = function(a, b) {
  return new Y(a, b)
};
Y.P = function(a, b) {
  0 == a.length && e(Error("number format error: empty string"));
  var c = b || 10;
  (2 > c || 36 < c) && e(Error("radix out of range: " + c));
  if("-" == a.charAt(0)) {
    return Y.P(a.substring(1), c).I()
  }
  0 <= a.indexOf("-") && e(Error('number format error: interior "-" character: ' + a));
  for(var d = Y.Z(Math.pow(c, 8)), f = Y.ZERO, g = 0;g < a.length;g += 8) {
    var i = Math.min(8, a.length - g), j = parseInt(a.substring(g, g + i), c);
    8 > i ? (i = Y.Z(Math.pow(c, i)), f = f.multiply(i).add(Y.Z(j))) : (f = f.multiply(d), f = f.add(Y.Z(j)))
  }
  return f
};
Y.Sb = 65536;
Y.Vg = 16777216;
Y.qa = Y.Sb * Y.Sb;
Y.Wg = Y.qa / 2;
Y.Xg = Y.qa * Y.Sb;
Y.Md = Y.qa * Y.qa;
Y.Hc = Y.Md / 2;
Y.ZERO = Y.sa(0);
Y.ONE = Y.sa(1);
Y.Gc = Y.sa(-1);
Y.MAX_VALUE = Y.la(-1, 2147483647);
Y.MIN_VALUE = Y.la(0, -2147483648);
Y.Ld = Y.sa(16777216);
r = Y.prototype;
r.Ob = function() {
  return this.K * Y.qa + this.re()
};
r.toString = function(a) {
  a = a || 10;
  (2 > a || 36 < a) && e(Error("radix out of range: " + a));
  if(this.Da()) {
    return"0"
  }
  if(this.T()) {
    if(this.Y(Y.MIN_VALUE)) {
      var b = Y.Z(a), c = this.Aa(b), b = c.multiply(b).ib(this);
      return c.toString(a) + b.C.toString(a)
    }
    return"-" + this.I().toString(a)
  }
  for(var c = Y.Z(Math.pow(a, 6)), b = this, d = "";;) {
    var f = b.Aa(c), g = b.ib(f.multiply(c)).C.toString(a), b = f;
    if(b.Da()) {
      return g + d
    }
    for(;6 > g.length;) {
      g = "0" + g
    }
    d = "" + g + d
  }
};
r.re = function() {
  return 0 <= this.C ? this.C : Y.qa + this.C
};
r.Da = function() {
  return 0 == this.K && 0 == this.C
};
r.T = function() {
  return 0 > this.K
};
r.ld = function() {
  return 1 == (this.C & 1)
};
r.Y = function(a) {
  return this.K == a.K && this.C == a.C
};
r.nd = function() {
  return 0 > this.Zb(Y.Ld)
};
r.ve = function(a) {
  return 0 < this.Zb(a)
};
r.we = function(a) {
  return 0 <= this.Zb(a)
};
r.Zb = function(a) {
  if(this.Y(a)) {
    return 0
  }
  var b = this.T(), c = a.T();
  return b && !c ? -1 : !b && c ? 1 : this.ib(a).T() ? -1 : 1
};
r.I = function() {
  return this.Y(Y.MIN_VALUE) ? Y.MIN_VALUE : this.Le().add(Y.ONE)
};
r.add = function(a) {
  var b = this.K >>> 16, c = this.K & 65535, d = this.C >>> 16, f = a.K >>> 16, g = a.K & 65535, i = a.C >>> 16, j;
  j = 0 + ((this.C & 65535) + (a.C & 65535));
  a = 0 + (j >>> 16);
  a += d + i;
  d = 0 + (a >>> 16);
  d += c + g;
  c = 0 + (d >>> 16);
  c = c + (b + f) & 65535;
  return Y.la((a & 65535) << 16 | j & 65535, c << 16 | d & 65535)
};
r.ib = function(a) {
  return this.add(a.I())
};
r.multiply = function(a) {
  if(this.Da() || a.Da()) {
    return Y.ZERO
  }
  if(this.Y(Y.MIN_VALUE)) {
    return a.ld() ? Y.MIN_VALUE : Y.ZERO
  }
  if(a.Y(Y.MIN_VALUE)) {
    return this.ld() ? Y.MIN_VALUE : Y.ZERO
  }
  if(this.T()) {
    return a.T() ? this.I().multiply(a.I()) : this.I().multiply(a).I()
  }
  if(a.T()) {
    return this.multiply(a.I()).I()
  }
  if(this.nd() && a.nd()) {
    return Y.Z(this.Ob() * a.Ob())
  }
  var b = this.K >>> 16, c = this.K & 65535, d = this.C >>> 16, f = this.C & 65535, g = a.K >>> 16, i = a.K & 65535, j = a.C >>> 16, a = a.C & 65535, p, t, y, m;
  m = 0 + f * a;
  y = 0 + (m >>> 16);
  y += d * a;
  t = 0 + (y >>> 16);
  y = (y & 65535) + f * j;
  t += y >>> 16;
  y &= 65535;
  t += c * a;
  p = 0 + (t >>> 16);
  t = (t & 65535) + d * j;
  p += t >>> 16;
  t &= 65535;
  t += f * i;
  p += t >>> 16;
  t &= 65535;
  p = p + (b * a + c * j + d * i + f * g) & 65535;
  return Y.la(y << 16 | m & 65535, p << 16 | t)
};
r.Aa = function(a) {
  a.Da() && e(Error("division by zero"));
  if(this.Da()) {
    return Y.ZERO
  }
  if(this.Y(Y.MIN_VALUE)) {
    if(a.Y(Y.ONE) || a.Y(Y.Gc)) {
      return Y.MIN_VALUE
    }
    if(a.Y(Y.MIN_VALUE)) {
      return Y.ONE
    }
    var b = this.af().Aa(a).shiftLeft(1);
    if(b.Y(Y.ZERO)) {
      return a.T() ? Y.ONE : Y.Gc
    }
    var c = this.ib(a.multiply(b));
    return b.add(c.Aa(a))
  }
  if(a.Y(Y.MIN_VALUE)) {
    return Y.ZERO
  }
  if(this.T()) {
    return a.T() ? this.I().Aa(a.I()) : this.I().Aa(a).I()
  }
  if(a.T()) {
    return this.Aa(a.I()).I()
  }
  for(var d = Y.ZERO, c = this;c.we(a);) {
    for(var b = Math.max(1, Math.floor(c.Ob() / a.Ob())), f = Math.ceil(Math.log(b) / Math.LN2), f = 48 >= f ? 1 : Math.pow(2, f - 48), g = Y.Z(b), i = g.multiply(a);i.T() || i.ve(c);) {
      b -= f, g = Y.Z(b), i = g.multiply(a)
    }
    g.Da() && (g = Y.ONE);
    d = d.add(g);
    c = c.ib(i)
  }
  return d
};
r.Le = function() {
  return Y.la(~this.C, ~this.K)
};
r.shiftLeft = function(a) {
  a &= 63;
  if(0 == a) {
    return this
  }
  var b = this.C;
  return 32 > a ? Y.la(b << a, this.K << a | b >>> 32 - a) : Y.la(0, b << a - 32)
};
r.af = function() {
  var a;
  a = 1;
  if(0 == a) {
    return this
  }
  var b = this.K;
  return 32 > a ? Y.la(this.C >>> a | b << 32 - a, b >> a) : Y.la(b >> a - 32, 0 <= b ? 0 : -1)
};
r = X.prototype;
r.Wb = function(a, b, c, d) {
  for(var f = 0, g = 0;0 <= --d;) {
    var i = a * this[f++] + b[c] + g, g = Math.floor(i / 67108864);
    b[c++] = i & 67108863
  }
  return g
};
r.A = 26;
r.fa = 67108863;
r.Ua = 67108864;
r.Id = Math.pow(2, 52);
r.Dc = 26;
r.Ec = 0;
var Hc = [], Kc, Z;
Kc = 48;
for(Z = 0;9 >= Z;++Z) {
  Hc[Kc++] = Z
}
Kc = 97;
for(Z = 10;36 > Z;++Z) {
  Hc[Kc++] = Z
}
Kc = 65;
for(Z = 10;36 > Z;++Z) {
  Hc[Kc++] = Z
}
r = X.prototype;
r.copyTo = function(a) {
  for(var b = this.g - 1;0 <= b;--b) {
    a[b] = this[b]
  }
  a.g = this.g;
  a.u = this.u
};
r.sa = function(a) {
  this.g = 1;
  this.u = 0 > a ? -1 : 0;
  0 < a ? this[0] = a : -1 > a ? this[0] = a + DV : this.g = 0
};
r.P = function(a, b) {
  var c;
  if(16 == b) {
    c = 4
  }else {
    if(8 == b) {
      c = 3
    }else {
      if(256 == b) {
        c = 8
      }else {
        if(2 == b) {
          c = 1
        }else {
          if(32 == b) {
            c = 5
          }else {
            if(4 == b) {
              c = 2
            }else {
              this.oe(a, b);
              return
            }
          }
        }
      }
    }
  }
  this.u = this.g = 0;
  for(var d = a.length, f = n, g = 0;0 <= --d;) {
    var i = 8 == c ? a[d] & 255 : Gc(a, d);
    0 > i ? "-" == a.charAt(d) && (f = k) : (f = n, 0 == g ? this[this.g++] = i : g + c > this.A ? (this[this.g - 1] |= (i & (1 << this.A - g) - 1) << g, this[this.g++] = i >> this.A - g) : this[this.g - 1] |= i << g, g += c, g >= this.A && (g -= this.A))
  }
  8 == c && 0 != (a[0] & 128) && (this.u = -1, 0 < g && (this[this.g - 1] |= (1 << this.A - g) - 1 << g));
  this.ra();
  f && X.ZERO.ea(this, this)
};
r.ra = function() {
  for(var a = this.u & this.fa;0 < this.g && this[this.g - 1] == a;) {
    --this.g
  }
};
r.cc = function(a, b) {
  var c;
  for(c = this.g - 1;0 <= c;--c) {
    b[c + a] = this[c]
  }
  for(c = a - 1;0 <= c;--c) {
    b[c] = 0
  }
  b.g = this.g + a;
  b.u = this.u
};
r.ie = function(a, b) {
  for(var c = a;c < this.g;++c) {
    b[c - a] = this[c]
  }
  b.g = Math.max(this.g - a, 0);
  b.u = this.u
};
r.md = function(a, b) {
  var c = a % this.A, d = this.A - c, f = (1 << d) - 1, g = Math.floor(a / this.A), i = this.u << c & this.fa, j;
  for(j = this.g - 1;0 <= j;--j) {
    b[j + g + 1] = this[j] >> d | i, i = (this[j] & f) << c
  }
  for(j = g - 1;0 <= j;--j) {
    b[j] = 0
  }
  b[g] = i;
  b.g = this.g + g + 1;
  b.u = this.u;
  b.ra()
};
r.Se = function(a, b) {
  b.u = this.u;
  var c = Math.floor(a / this.A);
  if(c >= this.g) {
    b.g = 0
  }else {
    var d = a % this.A, f = this.A - d, g = (1 << d) - 1;
    b[0] = this[c] >> d;
    for(var i = c + 1;i < this.g;++i) {
      b[i - c - 1] |= (this[i] & g) << f, b[i - c] = this[i] >> d
    }
    0 < d && (b[this.g - c - 1] |= (this.u & g) << f);
    b.g = this.g - c;
    b.ra()
  }
};
r.ea = function(a, b) {
  for(var c = 0, d = 0, f = Math.min(a.g, this.g);c < f;) {
    d += this[c] - a[c], b[c++] = d & this.fa, d >>= this.A
  }
  if(a.g < this.g) {
    for(d -= a.u;c < this.g;) {
      d += this[c], b[c++] = d & this.fa, d >>= this.A
    }
    d += this.u
  }else {
    for(d += this.u;c < a.g;) {
      d -= a[c], b[c++] = d & this.fa, d >>= this.A
    }
    d -= a.u
  }
  b.u = 0 > d ? -1 : 0;
  -1 > d ? b[c++] = this.Ua + d : 0 < d && (b[c++] = d);
  b.g = c;
  b.ra()
};
r.Ie = function(a) {
  var b = $.yd, c = this.abs(), d = b.abs(), f = c.g;
  for(a.g = f + d.g;0 <= --f;) {
    a[f] = 0
  }
  for(f = 0;f < d.g;++f) {
    a[f + c.g] = c.Wb(d[f], a, f, c.g)
  }
  a.u = 0;
  a.ra();
  this.u != b.u && X.ZERO.ea(a, a)
};
r.Uc = function(a, b, c) {
  var d = a.abs();
  if(!(0 >= d.g)) {
    var f = this.abs();
    if(f.g < d.g) {
      b != l && b.sa(0), c != l && this.copyTo(c)
    }else {
      c == l && (c = Fc());
      var g = Fc(), i = this.u, a = a.u, j = this.A - Jc(d[d.g - 1]);
      0 < j ? (d.md(j, g), f.md(j, c)) : (d.copyTo(g), f.copyTo(c));
      d = g.g;
      f = g[d - 1];
      if(0 != f) {
        var p = f * (1 << this.Dc) + (1 < d ? g[d - 2] >> this.Ec : 0), t = this.Id / p, p = (1 << this.Dc) / p, y = 1 << this.Ec, m = c.g, x = m - d, G = b == l ? Fc() : b;
        g.cc(x, G);
        0 <= c.vb(G) && (c[c.g++] = 1, c.ea(G, c));
        X.ONE.cc(d, G);
        for(G.ea(g, g);g.g < d;) {
          g[g.g++] = 0
        }
        for(;0 <= --x;) {
          var L = c[--m] == f ? this.fa : Math.floor(c[m] * t + (c[m - 1] + y) * p);
          if((c[m] += g.Wb(L, c, x, d)) < L) {
            g.cc(x, G);
            for(c.ea(G, c);c[m] < --L;) {
              c.ea(G, c)
            }
          }
        }
        b != l && (c.ie(d, b), i != a && X.ZERO.ea(b, b));
        c.g = d;
        c.ra();
        0 < j && c.Se(j, c);
        0 > i && X.ZERO.ea(c, c)
      }
    }
  }
};
r.exp = function(a, b) {
  if(4294967295 < a || 1 > a) {
    return X.ONE
  }
  var c = Fc(), d = Fc(), f = b.lh(this), g = Jc(a) - 1;
  for(f.copyTo(c);0 <= --g;) {
    if(b.$h(c, d), 0 < (a & 1 << g)) {
      b.Rh(d, f, c)
    }else {
      var i = c, c = d, d = i
    }
  }
  return b.Xh(c)
};
r.toString = function(a) {
  if(0 > this.u) {
    return"-" + this.I().toString(a)
  }
  if(16 == a) {
    a = 4
  }else {
    if(8 == a) {
      a = 3
    }else {
      if(2 == a) {
        a = 1
      }else {
        if(32 == a) {
          a = 5
        }else {
          if(4 == a) {
            a = 2
          }else {
            return this.cf(a)
          }
        }
      }
    }
  }
  var b = (1 << a) - 1, c, d = n, f = "", g = this.g, i = this.A - g * this.A % a;
  if(0 < g--) {
    if(i < this.A && 0 < (c = this[g] >> i)) {
      d = k, f = "0123456789abcdefghijklmnopqrstuvwxyz".charAt(c)
    }
    for(;0 <= g;) {
      i < a ? (c = (this[g] & (1 << i) - 1) << a - i, c |= this[--g] >> (i += this.A - a)) : (c = this[g] >> (i -= a) & b, 0 >= i && (i += this.A, --g)), 0 < c && (d = k), d && (f += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(c))
    }
  }
  return d ? f : "0"
};
r.I = function() {
  var a = Fc();
  X.ZERO.ea(this, a);
  return a
};
r.abs = function() {
  return 0 > this.u ? this.I() : this
};
r.vb = function(a) {
  var b = this.u - a.u;
  if(0 != b) {
    return b
  }
  var c = this.g, b = c - a.g;
  if(0 != b) {
    return 0 > this.u ? -b : b
  }
  for(;0 <= --c;) {
    if(0 != (b = this[c] - a[c])) {
      return b
    }
  }
  return 0
};
X.ZERO = Ic(0);
X.ONE = Ic(1);
r = X.prototype;
r.oe = function(a, b) {
  this.sa(0);
  b == l && (b = 10);
  for(var c = this.tb(b), d = Math.pow(b, c), f = n, g = 0, i = 0, j = 0;j < a.length;++j) {
    var p = Gc(a, j);
    0 > p ? "-" == a.charAt(j) && 0 == this.vc() && (f = k) : (i = b * i + p, ++g >= c && (this.Sc(d), this.Rc(i), i = g = 0))
  }
  0 < g && (this.Sc(Math.pow(b, g)), this.Rc(i));
  f && X.ZERO.ea(this, this)
};
r.tb = function(a) {
  return Math.floor(Math.LN2 * this.A / Math.log(a))
};
r.vc = function() {
  return 0 > this.u ? -1 : 0 >= this.g || 1 == this.g && 0 >= this[0] ? 0 : 1
};
r.Sc = function(a) {
  this[this.g] = this.Wb(a - 1, this, 0, this.g);
  ++this.g;
  this.ra()
};
r.Rc = function(a) {
  var b = 0;
  if(0 != a) {
    for(;this.g <= b;) {
      this[this.g++] = 0
    }
    for(this[b] += a;this[b] >= this.Ua;) {
      this[b] -= this.Ua, ++b >= this.g && (this[this.g++] = 0), ++this[b]
    }
  }
};
r.cf = function(a) {
  a == l && (a = 10);
  if(0 == this.vc() || 2 > a || 36 < a) {
    return"0"
  }
  var b = this.tb(a), b = Math.pow(a, b), c = Ic(b), d = Fc(), f = Fc(), g = "";
  for(this.Uc(c, d, f);0 < d.vc();) {
    g = (b + f.kd()).toString(a).substr(1) + g, d.Uc(c, d, f)
  }
  return f.kd().toString(a) + g
};
r.kd = function() {
  if(0 > this.u) {
    if(1 == this.g) {
      return this[0] - this.Ua
    }
    if(0 == this.g) {
      return-1
    }
  }else {
    if(1 == this.g) {
      return this[0]
    }
    if(0 == this.g) {
      return 0
    }
  }
  return(this[1] & (1 << 32 - this.A) - 1) << this.A | this[0]
};
r.Ub = function(a, b) {
  for(var c = 0, d = 0, f = Math.min(a.g, this.g);c < f;) {
    d += this[c] + a[c], b[c++] = d & this.fa, d >>= this.A
  }
  if(a.g < this.g) {
    for(d += a.u;c < this.g;) {
      d += this[c], b[c++] = d & this.fa, d >>= this.A
    }
    d += this.u
  }else {
    for(d += this.u;c < a.g;) {
      d += a[c], b[c++] = d & this.fa, d >>= this.A
    }
    d += a.u
  }
  b.u = 0 > d ? -1 : 0;
  0 < d ? b[c++] = d : -1 > d && (b[c++] = this.Ua + d);
  b.g = c;
  b.ra()
};
var $ = {abs:function(a, b) {
  var c = new Y(a, b), c = c.T() ? c.I() : c;
  I[R >> 2] = c.C;
  I[R + 4 >> 2] = c.K
}, Wc:function() {
  $.je || ($.je = k, $.yd = new X, $.yd.P("4294967296", 10), $.wc = new X, $.wc.P("18446744073709551616", 10), $.bi = new X, $.ci = new X)
}, Mh:function(a, b) {
  var c = new X;
  c.P(b.toString(), 10);
  var d = new X;
  c.Ie(d);
  c = new X;
  c.P(a.toString(), 10);
  var f = new X;
  c.Ub(d, f);
  return f
}, stringify:function(a, b, c) {
  a = (new Y(a, b)).toString();
  c && "-" == a[0] && ($.Wc(), c = new X, c.P(a, 10), a = new X, $.wc.Ub(c, a), a = a.toString(10));
  return a
}, P:function(a, b, c, d, f) {
  $.Wc();
  var g = new X;
  g.P(a, b);
  a = new X;
  a.P(c, 10);
  c = new X;
  c.P(d, 10);
  f && 0 > g.vb(X.ZERO) && (d = new X, g.Ub($.wc, d), g = d);
  d = n;
  0 > g.vb(a) ? (g = a, d = k) : 0 < g.vb(c) && (g = c, d = k);
  g = Y.P(g.toString());
  I[R >> 2] = g.C;
  I[R + 4 >> 2] = g.K;
  d && e("range error")
}};
$b = $;
if(Q) {
  if("function" === typeof u.locateFile ? Q = u.locateFile(Q) : u.memoryInitializerPrefixURL && (Q = u.memoryInitializerPrefixURL + Q), v || fa) {
    var Lc = u.readBinary(Q);
    M.set(Lc, Na)
  }else {
    mb(), Sb(Q, function(a) {
      M.set(a, Na);
      nb()
    }, function() {
      e("could not load memory initializer " + Q)
    })
  }
}
function ja(a) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + a + ")";
  this.status = a
}
ja.prototype = Error();
var Mc, Nc = l, lb = function Oc() {
  !u.calledRun && Pc && Qc();
  u.calledRun || (lb = Oc)
};
u.callMain = u.ih = function(a) {
  function b() {
    for(var a = 0;3 > a;a++) {
      d.push(0)
    }
  }
  w(0 == jb, "cannot call main when async dependencies remain! (listen on __ATMAIN__)");
  w(0 == Ta.length, "cannot call main when preRun functions remain to be called");
  a = a || [];
  Ya || (Ya = k, Sa(Ua));
  var c = a.length + 1, d = [J(ab(u.thisProgram), "i8", 0)];
  b();
  for(var f = 0;f < c - 1;f += 1) {
    d.push(J(ab(a[f]), "i8", 0)), b()
  }
  d.push(0);
  d = J(d, "i32", 0);
  Mc = z;
  try {
    var g = u._main(c, d, 0);
    Rc(g)
  }catch(i) {
    i instanceof ja || ("SimulateInfiniteLoop" == i ? u.noExitRuntime = k : (i && ("object" === typeof i && i.stack) && u.va("exception thrown: " + [i, i.stack]), e(i)))
  }finally {
  }
};
function Qc(a) {
  function b() {
    if(!u.calledRun && (u.calledRun = k, !oa)) {
      Ya || (Ya = k, Sa(Ua));
      Sa(Va);
      da && Nc !== l && u.va("pre-main prep time: " + (Date.now() - Nc) + " ms");
      if(u.onRuntimeInitialized) {
        u.onRuntimeInitialized()
      }
      u._main && Pc && u.callMain(a);
      if(u.postRun) {
        for("function" == typeof u.postRun && (u.postRun = [u.postRun]);u.postRun.length;) {
          $a(u.postRun.shift())
        }
      }
      Sa(Xa)
    }
  }
  a = a || u.arguments;
  Nc === l && (Nc = Date.now());
  if(!(0 < jb)) {
    if(u.preRun) {
      for("function" == typeof u.preRun && (u.preRun = [u.preRun]);u.preRun.length;) {
        Za(u.preRun.shift())
      }
    }
    Sa(Ta);
    !(0 < jb) && !u.calledRun && (u.setStatus ? (u.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        u.setStatus("")
      }, 1);
      b()
    }, 1)) : b())
  }
}
u.run = u.Yh = Qc;
function Rc(a) {
  u.noExitRuntime || (oa = k, z = Mc, Sa(Wa), v ? (process.stdout.once("drain", function() {
    process.exit(a)
  }), console.log(" "), setTimeout(function() {
    process.exit(a)
  }, 500)) : fa && "function" === typeof quit && quit(a), e(new ja(a)))
}
u.exit = u.qh = Rc;
function D(a) {
  a && (u.print(a), u.va(a));
  oa = k;
  e("abort() at " + Ka() + "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.")
}
u.abort = u.abort = D;
if(u.preInit) {
  for("function" == typeof u.preInit && (u.preInit = [u.preInit]);0 < u.preInit.length;) {
    u.preInit.pop()()
  }
}
var Pc = k;
u.noInitialRun && (Pc = n);
Qc();




var scrypt = (function () {
    var exports = {};

    //---------------------------------------------------------------------------
    // Horrifying UTF-8 and hex codecs

    function encode_utf8(s) {
	return encode_latin1(unescape(encodeURIComponent(s)));
    }

    function encode_latin1(s) {
	var result = new Uint8Array(s.length);
	for (var i = 0; i < s.length; i++) {
	    var c = s.charCodeAt(i);
	    if ((c & 0xff) !== c) throw {message: "Cannot encode string in Latin1", str: s};
	    result[i] = (c & 0xff);
	}
	return result;
    }

    function decode_utf8(bs) {
	return decodeURIComponent(escape(decode_latin1(bs)));
    }

    function decode_latin1(bs) {
	var encoded = [];
	for (var i = 0; i < bs.length; i++) {
	    encoded.push(String.fromCharCode(bs[i]));
	}
	return encoded.join('');
    }

    function to_hex(bs) {
	var encoded = [];
	for (var i = 0; i < bs.length; i++) {
	    encoded.push("0123456789abcdef"[(bs[i] >> 4) & 15]);
	    encoded.push("0123456789abcdef"[bs[i] & 15]);
	}
	return encoded.join('');
    }

    //---------------------------------------------------------------------------

    function injectBytes(bs, leftPadding) {
	var p = leftPadding || 0;
	var address = scrypt_raw._malloc(bs.length + p);
	scrypt_raw.HEAPU8.set(bs, address + p);
	for (var i = address; i < address + p; i++) {
	    scrypt_raw.HEAPU8[i] = 0;
	}
	return address;
    }

    function check_injectBytes(function_name, what, thing, expected_length, leftPadding) {
	check_length(function_name, what, thing, expected_length);
	return injectBytes(thing, leftPadding);
    }

    function extractBytes(address, length) {
	var result = new Uint8Array(length);
	result.set(scrypt_raw.HEAPU8.subarray(address, address + length));
	return result;
    }

    //---------------------------------------------------------------------------

    function check(function_name, result) {
	if (result !== 0) {
	    throw {message: "scrypt_raw." + function_name + " signalled an error"};
	}
    }

    function check_length(function_name, what, thing, expected_length) {
	if (thing.length !== expected_length) {
	    throw {message: "scrypt." + function_name + " expected " +
	           expected_length + "-byte " + what + " but got length " + thing.length};
	}
    }

    function Target(length) {
	this.length = length;
	this.address = scrypt_raw._malloc(length);
    }

    Target.prototype.extractBytes = function (offset) {
	var result = extractBytes(this.address + (offset || 0), this.length - (offset || 0));
	scrypt_raw._free(this.address);
	this.address = null;
	return result;
    };

    function free_all(addresses) {
	for (var i = 0; i < addresses.length; i++) {
	    scrypt_raw._free(addresses[i]);
	}
    }

    //---------------------------------------------------------------------------

    function random_bytes(count) {
	var bs = new Uint8Array(count);
	if(typeof(window.crypto) !== "undefined") {
	    if(typeof(window.crypto.getRandomValues) !== "undefined") {
	    	window.crypto.getRandomValues(bs);
	    	return bs;
	    }
	}
	if(typeof(window.msCrypto) !== "undefined") {
	    if(typeof(window.msCrypto.getRandomValues) !== "undefined") {
	    	window.msCrypto.getRandomValues(bs);
	    	return bs;
	    }
	}
	throw { message: "No suitable random number generator found!"};
    }

    function crypto_scrypt(passwd, salt, n, r, p, buflen) {
	var buf = new Target(buflen);
	var pa = injectBytes(passwd);
	var sa = injectBytes(salt);
	check("_crypto_scrypt",
	      scrypt_raw._crypto_scrypt(pa, passwd.length,
					sa, salt.length,
					n, 0, // 64 bits; zero upper half
					r,
					p,
					buf.address, buf.length));
	free_all([pa, sa]);
	return buf.extractBytes();
    }

    //---------------------------------------------------------------------------

    exports.encode_utf8 = encode_utf8;
    exports.encode_latin1 = encode_latin1;
    exports.decode_utf8 = decode_utf8;
    exports.decode_latin1 = decode_latin1;
    exports.to_hex = to_hex;

    exports.random_bytes = random_bytes;
    exports.crypto_scrypt = crypto_scrypt;

    return exports;
})();
    return scrypt;
});