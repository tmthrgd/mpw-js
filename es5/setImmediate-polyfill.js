"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*! by Tom Thorogood <me@tomthorogood.co.uk> */
/*! This work is licensed under the Creative Commons Attribution 4.0
International License. To view a copy of this license, visit
http://creativecommons.org/licenses/by/4.0/ or see LICENSE. */

// setImmediate is a 0-delay setTimeout of sorts introduced
// by MS and wrongly held back by other browsers
window.setImmediate || !(function (global) {
	// Get the global prototype to attach setImmediate to
	var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);

	// If we couldn't get the prototype or setTimeout wasn't attached
	// to the prototype we just attach to global
	attachTo && attachTo.setTimeout || (attachTo = global);

	// If the MS prefixed implementation exists, use it
	if (global.msSetImmediate) {
		return attachTo.setImmediate = global.msSetImmediate, attachTo.clearImmediate = global.msClearImmediate;
	}

	// https://github.com/YuzuJS/setImmediate/blob/master/setImmediate.js
	// This checks if the current environment is Node.js
	if (global.process && Object.prototype.toString(global.process) === "[object process]") {
		// If it is we might be able to use timers
		var timers = global.require("timers");

		// If it implements setImmediate we use it
		if (timers && timers.setImmediate) {
			return attachTo.setImmediate = timers.setImmediate, attachTo.clearImmediate = timers.clearImmediate;
		}

		// If it isn't we polyfill with nextTick which is
		// sufficiently similar
		if (global.process.nextTick) {
			return attachTo.setImmediate = function (func) {
				for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					params[_key - 1] = arguments[_key];
				}

				// Invoke func with the params as passed into setImmediate
				global.process.nextTick(function () {
					return func.apply(undefined, params);
				});
			}, attachTo.clearImmediate = function (immediateID) {
				// There is no id or way to stop nextTick
				throw new Error("clearImmediate not implemented");
			};
		}
	}

	// http://dbaron.org/log/20100309-faster-timeouts
	// https://github.com/YuzuJS/setImmediate/blob/master/setImmediate.js
	// https://github.com/kriskowal/q/blob/0428c15d2ffc8e874b4be3a50e92884ef8701a6f/q.js#L125-141
	// If we have messaging channels, or we have postMessage and this
	// isn't a WebWorker, we can use messaging
	if (global.MessageChannel || global.postMessage && !global.importScripts && (function () {
		// This checks if global.postMessage is asynchronous,
		// it has been known to be buggy and synchronous in
		// some browsers
		var postMessageIsAsynchronous = true;
		var oldOnMessage = global.onmessage;
		global.onmessage = function () {
			postMessageIsAsynchronous = false;
		};
		global.postMessage("", "*");
		global.onmessage = oldOnMessage;
		return postMessageIsAsynchronous;
	})()) {
		var _ret = (function () {
			// A unique id prefix to ensure that ONLY valid messages are accepted
			var messageName = ("setImmediate-polyfill-" + Math.random()).replace("0.", "");

			// The numeric identifier of the next dispatched scrypt call
			var immediateID = 1;

			// The timeout function and arguments, indexed by numeric identifier
			var timeouts = {};

			// If a MessageChannel exists we can use it to avoid sending
			// messages to the browser which could cause interoperability
			// issues
			var channel = global.MessageChannel && new global.MessageChannel();

			// We need to start port1 in order to receive messages sent
			// from port2
			channel && channel.port1.start();

			// Add a handler to the message event of either the message
			// channel, if it exists, or global if it does not
			(channel && channel.port1 || global).addEventListener("message", function (event) {
				// If event data is not a string, i.e. doesn't implement split,
				// we didn't send it
				if (!event.data || !event.data.split) {
					return;
				}

				// Split the identifier into the name and numeric id

				var _event$data$split = event.data.split("$");

				var _event$data$split2 = _slicedToArray(_event$data$split, 2);

				var name = _event$data$split2[0];
				var immediateID = _event$data$split2[1];

				// If we are not using a MessageChannel check that the source
				// of the event was this window, also check the name is valid,
				// if either of these are not true, we didn't send it

				if (!channel && event.source !== global || name !== messageName) {
					return;
				}

				// Prevent the event from propagating further
				event.stopPropagation();

				// Retrieve the function and the arguments we will invoke
				// leaving func and params as null if the immediateID
				// does not exist in timeouts (because clearImmediate has
				// been called before we got here)

				var _ref = timeouts[immediateID] || [];

				var _ref2 = _slicedToArray(_ref, 2);

				var func = _ref2[0];
				var params = _ref2[1];

				// Invoke the func with the appropriate parameters

				func && func.apply(undefined, _toConsumableArray(params));

				// Clear func and params for GC
				func = params = null;

				// Remove key:immediateID from timeouts to ensure it's only
				// called once and to allow for GC
				delete timeouts[immediateID];
			}, false);

			return {
				v: (attachTo.setImmediate = function (func) {
					var _ref3;

					for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
						params[_key2 - 1] = arguments[_key2];
					}

					// Store the function and it's arguments in timeouts
					timeouts[immediateID] = [func, params];

					// Post the message either using port2 of the MessageChannel
					// or on global if it's not available w/ the unique id
					// If the message is sent on global we dispatch it w/ a
					// targetOrigin of "*" (indicating no preference)
					(_ref3 = channel && channel.port2 || global).postMessage.apply(_ref3, [[messageName, immediateID].join("$")].concat(_toConsumableArray(channel ? [] : ["*"])));

					// We return a unique numeric id to identify the call
					// to setImmediate, this allows it to be cancelled
					return immediateID++;
				}, attachTo.clearImmediate = function (immediateID) {
					// Delete the function and arguments associated
					// w/ identifier of immediateID
					delete timeouts[immediateID];
				})
			};
		})();

		if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	}

	// Set setImmediate to prefixed or non-prefixed requestAnimationFrame
	// requestAnimationFrame dispatches at a later point in the event cycle
	attachTo.setImmediate = global.requestAnimationFrame || global.mozRequestAnimationFrame || global.webkitRequestAnimationFrame || global.msRequestAnimationFrame;

	// If requestAnimationFrame existed we end, setting clearImmediate
	// to cancelAnimationFrame
	if (attachTo.setImmediate) {
		return attachTo.clearImmediate = global.cancelAnimationFrame || global.mozCancelAnimationFrame || global.webkitCancelAnimationFrame || global.msCancelAnimationFrame || global.webkitCancelRequestAnimationFrame;
	}

	// https://github.com/YuzuJS/setImmediate/blob/master/setImmediate.js
	// We can use a script tag and the readystatechange event on IE(?)
	if (global.document && "onreadystatechange" in global.document.getElementsByTagName("script")[0]) {
		var _ret2 = (function () {
			// The numeric identifier of the next dispatched scrypt call
			var immediateID = 1;

			// A boolean value to allow clearImmediate to work,
			// indexed by numeric identifier
			var timeouts = {};

			return {
				v: (attachTo.setImmediate = function (func) {
					for (var _len3 = arguments.length, params = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
						params[_key3 - 1] = arguments[_key3];
					}

					// Set true in timeouts for immediateID to indicate the func
					// should be invoked
					timeouts[immediateID] = true;

					// Create a script tag that will be added to the DOM
					var script = global.document.createElement("script");

					// Add a handler for onreadystatechange
					script.onreadystatechange = function () {
						// If the timeout has not been cancelled, call the func
						// w/ the arguments specified
						timeouts[immediateID] && func.apply(undefined, params);

						// Remove key:immediateID from timeouts to ensure it's only called once
						delete timeouts[immediateID];

						// Remove the handler to allow GC
						script.onreadystatechange = null;

						// Remove the script tag from the DOM to ensure GC
						global.document.body.removeChild(script);

						// Nullify the script variable to allow GC
						script = null;
					};

					// Add the script tag to the DOM to which begins loading
					// the tag which will invoke the readystatechange event
					global.document.body.appendChild(script);

					// Return a unique numeric id to identify the call
					// to setImmediate, this allows it to be cancelled
					return immediateID++;
				}, attachTo.clearImmediate = function (immediateID) {
					// Remove key:immediateID from timeouts to prevent func from being called
					delete timeouts[immediateID];
				})
			};
		})();

		if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
	}

	// The worst fallback is setTimeout, although the delay is set to 0,
	// in reality this should have a ~20ms delay as this is an important
	// part of the spec
	attachTo.setImmediate = function (func) {
		for (var _len4 = arguments.length, params = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			params[_key4 - 1] = arguments[_key4];
		}

		return global.setTimeout.apply(global, [func, 0].concat(params));
	};
	attachTo.clearImmediate = global.clearTimeout;

	// Here we check if the arguments passed to setTimeout actually will be
	// passed to the callback, on older versions of IE(?) this check will fail
	global.setTimeout(function (arg) {
		// If the test fails, we wrap func in a closure that will invoke func w/
		// the arguments
		arg || (attachTo.setImmediate = function (func) {
			for (var _len5 = arguments.length, params = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
				params[_key5 - 1] = arguments[_key5];
			}

			return global.setTimeout(function () {
				return func.apply(undefined, params);
			}, 0);
		});
	}, 0, true);
})(undefined || window);

//# sourceMappingURL=setImmediate-polyfill.js.map