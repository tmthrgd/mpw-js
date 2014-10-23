window.setImmediate || !function(global) {
  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
  attachTo && attachTo.setTimeout || (attachTo = global);
  if (global.msSetImmediate) {
    return attachTo.setImmediate = global.msSetImmediate, attachTo.clearImmediate = global.msClearImmediate;
  }
  if (global.process && Object.prototype.toString(global.process) === "[object process]") {
    var timers = global.require("timers");
    if (timers && timers.setImmediate) {
      return attachTo.setImmediate = timers.setImmediate, attachTo.clearImmediate = timers.clearImmediate;
    }
    if (global.process.nextTick) {
      return attachTo.setImmediate = function(func) {
        for (var params = [],
            $__0 = 1; $__0 < arguments.length; $__0++)
          params[$traceurRuntime.toProperty($__0 - 1)] = arguments[$traceurRuntime.toProperty($__0)];
        global.process.nextTick((function() {
          return func.apply(null, $traceurRuntime.spread(params));
        }));
      }, attachTo.clearImmediate = function(immediateID) {
        throw new Error("clearImmediate not implemented");
      };
    }
  }
  if (global.MessageChannel || global.postMessage && !global.importScripts && (function() {
    var postMessageIsAsynchronous = true;
    var oldOnMessage = global.onmessage;
    global.onmessage = function() {
      postMessageIsAsynchronous = false;
    };
    global.postMessage("", "*");
    global.onmessage = oldOnMessage;
    return postMessageIsAsynchronous;
  })()) {
    var messageName = ("setImmediate-polyfill-" + Math.random()).replace("0.", "");
    var immediateID = 1;
    var timeouts = {};
    var channel = global.MessageChannel && new global.MessageChannel();
    channel && channel.port1.start();
    (channel && channel.port1 || global).addEventListener("message", function(event) {
      var $__5 = event.data.split("$"),
          name = $__5[0],
          immediateID = $__5[1];
      if (!channel && event.source !== global || name !== messageName) {
        return;
      }
      event.stopPropagation();
      var $__6 = timeouts[$traceurRuntime.toProperty(immediateID)] || [],
          func = $__6[0],
          params = $__6[1];
      func && func.apply(null, $traceurRuntime.spread(params));
      func = params = null;
      delete timeouts[$traceurRuntime.toProperty(immediateID)];
    }, false);
    return attachTo.setImmediate = function(func) {
      var $__7;
      for (var params = [],
          $__1 = 1; $__1 < arguments.length; $__1++)
        params[$traceurRuntime.toProperty($__1 - 1)] = arguments[$traceurRuntime.toProperty($__1)];
      timeouts[$traceurRuntime.toProperty(immediateID)] = [func, params];
      ($__7 = (channel && channel.port2 || global)).postMessage.apply($__7, $traceurRuntime.spread([[messageName, immediateID].join("$")], (channel ? [] : ["*"])));
      return immediateID++;
    }, attachTo.clearImmediate = function(immediateID) {
      delete timeouts[$traceurRuntime.toProperty(immediateID)];
    };
  }
  attachTo.setImmediate = global.requestAnimationFrame || global.mozRequestAnimationFrame || global.webkitRequestAnimationFrame || global.msRequestAnimationFrame;
  if (attachTo.setImmediate) {
    return attachTo.clearImmediate = global.cancelAnimationFrame || global.mozCancelAnimationFrame || global.webkitCancelAnimationFrame || global.msCancelAnimationFrame || global.webkitCancelRequestAnimationFrame;
  }
  if (global.document && "onreadystatechange" in global.document.getElementsByTagName("script")[0]) {
    var immediateID$__8 = 1;
    var timeouts$__9 = {};
    return attachTo.setImmediate = function(func) {
      for (var params = [],
          $__2 = 1; $__2 < arguments.length; $__2++)
        params[$traceurRuntime.toProperty($__2 - 1)] = arguments[$traceurRuntime.toProperty($__2)];
      timeouts$__9[$traceurRuntime.toProperty(immediateID$__8)] = true;
      var script = global.document.createElement("script");
      script.onreadystatechange = function() {
        timeouts$__9[$traceurRuntime.toProperty(immediateID$__8)] && func.apply(null, $traceurRuntime.spread(params));
        delete timeouts$__9[$traceurRuntime.toProperty(immediateID$__8)];
        script.onreadystatechange = null;
        global.document.body.removeChild(script);
        script = null;
      };
      global.document.body.appendChild(script);
      return immediateID$__8++;
    }, attachTo.clearImmediate = function(immediateID) {
      delete timeouts$__9[$traceurRuntime.toProperty(immediateID)];
    };
  }
  attachTo.setImmediate = (function(func) {
    var $__7;
    for (var params = [],
        $__3 = 1; $__3 < arguments.length; $__3++)
      params[$traceurRuntime.toProperty($__3 - 1)] = arguments[$traceurRuntime.toProperty($__3)];
    return ($__7 = global).setTimeout.apply($__7, $traceurRuntime.spread([func, 0], params));
  });
  attachTo.clearImmediate = global.clearTimeout;
  global.setTimeout(function(arg) {
    arg || (attachTo.setImmediate = (function(func) {
      for (var params = [],
          $__4 = 1; $__4 < arguments.length; $__4++)
        params[$traceurRuntime.toProperty($__4 - 1)] = arguments[$traceurRuntime.toProperty($__4)];
      return global.setTimeout((function() {
        return func.apply(null, $traceurRuntime.spread(params));
      }), 0);
    }));
  }, 0, true);
}(this);

//# sourceMappingURL=setImmediate-polyfill.map
