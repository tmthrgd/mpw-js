window.setImmediate || !function (global) {
	let attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	attachTo && attachTo.setTimeout || (attachTo = global);
	
	if (global.msSetImmediate) {
		return attachTo.setImmediate = global.msSetImmediate, attachTo.clearImmediate = global.msClearImmediate;
	}
	
	// https://github.com/YuzuJS/setImmediate/blob/master/setImmediate.js
	if (global.process && Object.prototype.toString(global.process) === "[object process]") {
	// if is Node.js {
		let timers = global.require("timers");
		
		if (timers && timers.setImmediate) {
			return attachTo.setImmediate = timers.setImmediate, attachTo.clearImmediate = timers.clearImmediate;
		}
		
		if (global.process.nextTick) {
			return attachTo.setImmediate = function (func, ...params) {
				global.process.nextTick(() => func(...params));
			}, attachTo.clearImmediate = function (immediateID) {
				throw new Error("clearImmediate not implemented");
			};
		}
	}
	
	// http://dbaron.org/log/20100309-faster-timeouts
	// https://github.com/YuzuJS/setImmediate/blob/master/setImmediate.js
	// https://github.com/kriskowal/q/blob/0428c15d2ffc8e874b4be3a50e92884ef8701a6f/q.js#L125-141
	if (global.MessageChannel || global.postMessage && !global.importScripts && (function () {
		let postMessageIsAsynchronous = true;
		let oldOnMessage = global.onmessage;
		global.onmessage = function () { postMessageIsAsynchronous = false; };
		global.postMessage("", "*");
		global.onmessage = oldOnMessage;
		return postMessageIsAsynchronous;
	})()) {
		let messageName = ("setImmediate-polyfill-" + Math.random()).replace("0.", "");
		
		let immediateID = 1;
		let timeouts = { };
		
		let channel = global.MessageChannel && new global.MessageChannel();
		channel && channel.port1.start();
		
		(channel && channel.port1 || global).addEventListener("message", function (event) {
			let [name, immediateID] = event.data.split("$");
			
			if (!channel && event.source !== global || name !== messageName) {
				return;
			}
			
			event.stopPropagation();
			
			let [func, params] = timeouts[immediateID] || [ ];
			func && func(...params);
			func = params = null;
			delete timeouts[immediateID];
		}, false);
		
		// Like setTimeout, but fires without delay.  There's
		// no time argument (always zero).
		return attachTo.setImmediate = function (func, ...params) {
			timeouts[immediateID] = [func, params];
			(channel && channel.port2 || global).postMessage([messageName, immediateID].join("$"), ...(channel ? [ ] : ["*"]));
			return immediateID++;
		}, attachTo.clearImmediate = function (immediateID) {
			delete timeouts[immediateID];
		};
	}
	
	attachTo.setImmediate = global.requestAnimationFrame || global.mozRequestAnimationFrame || global.webkitRequestAnimationFrame || global.msRequestAnimationFrame;
	
	if (attachTo.setImmediate) {
		return attachTo.clearImmediate = global.cancelAnimationFrame || global.mozCancelAnimationFrame || global.webkitCancelAnimationFrame || global.msCancelAnimationFrame || global.webkitCancelRequestAnimationFrame;
	}
	
	// https://github.com/YuzuJS/setImmediate/blob/master/setImmediate.js
	if (global.document && "onreadystatechange" in global.document.getElementsByTagName("script")[0]) {
		let immediateID = 1;
		let timeouts = { };
		
		return attachTo.setImmediate = function (func, ...params) {
			timeouts[immediateID] = true;
			
			let script = global.document.createElement("script");
			script.onreadystatechange = function () {
				timeouts[immediateID] && func(...params);
				delete timeouts[immediateID];
				
				script.onreadystatechange = null;
				global.document.body.removeChild(script);
				script = null;
			};
			global.document.body.appendChild(script);
			
			return immediateID++;
		}, attachTo.clearImmediate = function (immediateID) {
			delete timeouts[immediateID];
		};
	}
	
	attachTo.setImmediate = (func, ...params) => global.setTimeout(func, 0, ...params);
	attachTo.clearImmediate = global.clearTimeout;
	
	global.setTimeout(function (arg) {
		arg || (attachTo.setImmediate = (func, ...params) => global.setTimeout(() => func(...params), 0));
	}, 0, true);
}(this);