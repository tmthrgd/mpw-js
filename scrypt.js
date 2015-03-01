/*! by Tom Thorogood <me@tomthorogood.co.uk> */
/*! This work is licensed under the Creative Commons Attribution 4.0
International License. To view a copy of this license, visit
http://creativecommons.org/licenses/by/4.0/ or see LICENSE. */

window.scrypt = function () {
	// 512MiB, the default 32MiB caused errors for unknown reasons
	const SCRYPT_MEMORY = 512 * 1024 * 1024;
	
	if (window.Worker) {
		// Get all the <script> tags the latest one is used to resolve
		// scrypt-asm.js, it will be the currently executing <script> tag,
		// so long as defer and async were NOT used
		let scripts = document.getElementsByTagName("script");
		
		// The src of the worker
		let wrkrsrc =
`// Import scrypt-asm.js which is scrypt.c compiled w/ Emscripten
importScripts("${window.SCRYPTASM_PATH || `${scripts[scripts.length - 1].src}/../scrypt-asm.js`}");

// Create the Emscripten factory
var scrypt_module = scrypt_module_factory(${SCRYPT_MEMORY});

// Wait for incoming messages
// Pull out the needed values from the e argument
this.addEventListener("message", function (e) {
	try {
		// Invoke the Emscripten compiled crypto_scrypt routine
		var data = scrypt_module.crypto_scrypt(e.data.passwd, e.data.salt, e.data.n, e.data.r, e.data.p, e.data.buflen);
		
		// Send the data back to the DOM transferring ownership
		// of data to the DOM
		this.postMessage({
			id: e.data.id,
			
			data: data
		}, [ data.buffer ]);
	} catch(err) {
		// Send the error back to the DOM
		this.postMessage({
			id: e.data.id,
			
			err: err
		});
	}
}, false);`;
		
		if (window.URL && window.Blob) {
			// Create a blob: url to contain wrkrsrc
			var url = URL.createObjectURL(new Blob([ wrkrsrc ], { type: "application/javascript" }));
		} else {
			// Create a data: url to contain wrkrsrc
			var url = `data:application/javascript;charset=utf-8,${encodeURIComponent(wrkrsrc)}`;
		}
		
		// Create a WebWorker using a blob: url
		let scryptWorker = new Worker(url);
		
		// The numeric identifier of the next dispatched scrypt call
		let scryptID = 1;
		
		// The Promise callbacks, indexed by numeric identifier
		let scryptcbs = { };
		
		// A unique id prefix to ensure that ONLY valid messages are accepted
		let messageName = `scrypt-${Math.random()}`.replace("0.", "");
		
		// Add a message event listener for worker responses
		// Pull out the needed values from the e argument
		scryptWorker.addEventListener("message", function ({data: {id, data, err}}) {
			// Split the identifier into the name and numeric id
			let [name, scryptID] = id.split("$");
			
			// Check the name is valid, if it's not we didn't send it
			if (name === messageName) {
				// Retrieve the resolve and reject callbacks for the promise
				let [resolve, reject] = scryptcbs[scryptID];
				
				// If we were sent data it didn't throw an error, if not...
				data ? resolve(data) : reject(err);
				
				// Delete references to the callbacks now we've used them
				delete scryptcbs[scryptID];
			}
		});
		
		// This is the scrypt function
		// It returns a promise which will resolve when the worker responds
		return (passwd, salt, n, r, p, buflen) => new Promise(function (resolve, reject) {
			// Store the callbacks
			// These will be invoked from the worker message handler
			scryptcbs[scryptID] = [resolve, reject];
			
			// Send the worker a message w/ a unique id and all arguments,
			// transferring ownership of passwd and salt to the worker
			scryptWorker.postMessage({
				id: [messageName, scryptID++].join("$"),
				
				passwd: passwd,
				salt: salt,
				n: n,
				r: r,
				p: p,
				buflen: buflen
			}, [ passwd.buffer, salt.buffer ]);
		});
	} else {
		// This will hold the Emscripten factory
		let scrypt_module = null;
		
		// Create a new async script tag to add to the DOM
		// This will 'import' scrypt_module_factory
		let script = document.createElement("script");
		script.src = window.SCRYPTASM_PATH || "scrypt-asm.js", script.async = true;
		
		// Add an event handler to the script load event to
		// create the factory as soon as we possibly can
		script.addEventListener("load", function () {
			// Only if it hasn't already been created
			if (!scrypt_module) {
				// Create the factory
				scrypt_module = scrypt_module_factory(SCRYPT_MEMORY);
			}
		}, false);
		
		// Add the script tag to the DOM
		// This begins loading scrypt-asm.js
		document.body.appendChild(script);
		
		// This is the scrypt function
		// It returns a promise which will resolve asynchronously
		return (passwd, salt, n, r, p, buflen) => new Promise(function (resolve, reject) {
			// setImmediate (a 0-delay setTimeout of sorts) is needed
			// here so that this code is asynchronous and will not block
			// the UI thread
			window.setImmediate(function () {
				// If the factory hasn't been created yet (the load event didn't fire)
				// we create it here, if it has loaded that is
				if (!scrypt_module) {
					// Has scrypt-asm.js been loaded yet?
					if (!window.scrypt_module_factory) {
						return reject(new Error("scrypt-asm.js not loaded"));
					}
					
					// Create the factory
					scrypt_module = scrypt_module_factory(SCRYPT_MEMORY);
				}
				
				// Invoke the Emscripten compiled crypto_scrypt routine
				// resolving the promise w/ the result
				resolve(scrypt_module.crypto_scrypt(passwd, salt, n, r, p, buflen));
			});
		});
	}
}();