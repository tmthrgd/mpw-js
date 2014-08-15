window.scrypt = function () {
	const SCRYPT_MEMORY = 1024 * 1024 * 1024;
	
	try {
		let scripts = document.getElementsByTagName("script");
		
		let scryptwrkr = new Worker(URL.createObjectURL(new Blob([ ("!" + function () {
			const SCRYPT_MEMORY = 1024 * 1024 * 1024;
			
			importScripts("{{scrypt-asm.js}}");
			
			let scrypt = scrypt_module_factory(SCRYPT_MEMORY);
			
			/* Rather than import traceur-runtime with importScripts just polyfill it, yuck. */
			const $traceurRuntime = { assertObject: a => a };
			
			this.addEventListener("message", function ({data: {id, passwd, salt, n, r, p, buflen}}) {
				try {
					let data = scrypt.crypto_scrypt(passwd, salt, n, r, p, buflen);
					
					this.postMessage({
						id: id,
						
						data: data
					}, [ data.buffer ]);
				} catch(err) {
					this.postMessage({
						id: id,
						
						err: err
					});
				}
			}, false);
		} + "()").replace("{{scrypt-asm.js}}", scripts[scripts.length - 1].src + "/../scrypt-asm.js") ], { type: "application/javascript" })));
		//let scryptwrkr = new Worker("scrypt-worker.js");
		
		let scryptID = 1;
		let scryptcbs = { };
		
		let messageName = ("scrypt-" + Math.random()).replace("0.", "");
		
		scryptwrkr.addEventListener("message", function ({data: {id, data, err}}) {
			let [name, scryptID] = id.split("$");
			
			if (name === messageName) {
				let [resolve, reject] = scryptcbs[scryptID];
				data ? resolve(data) : reject(err);
				delete scryptcbs[scryptID];
			}
		});
		
		return (passwd, salt, n, r, p, buflen) => new Promise(function (resolve, reject) {
			scryptcbs[scryptID] = [resolve, reject];
			
			scryptwrkr.postMessage({
				id: [messageName, scryptID++].join("$"),
				
				passwd: passwd,
				salt: salt,
				n: n,
				r: r,
				p: p,
				buflen: buflen
			}, [ passwd.buffer, salt.buffer ]);
		});
	} catch(e) {
		console.error(e);
		
		let scrypt_module = null;
		
		let script = document.createElement("script");
		script.src = "scrypt-asm.js", script.async = true;
		
		script.addEventListener("load", function () {
			scrypt_module = scrypt_module_factory(SCRYPT_MEMORY);
		}, false);
		
		document.body.appendChild(script);
		
		return (passwd, salt, n, r, p, buflen) => new Promise(function (resolve, reject) {
			window.setImmediate(function () {
				if (!scrypt_module) {
					if (!window.scrypt_module_factory) {
						return reject(new Error("scrypt-asm.js not loaded"));
					}
					
					scrypt_module = scrypt_module_factory(SCRYPT_MEMORY);
				}
				
				resolve(scrypt_module.crypto_scrypt(passwd, salt, n, r, p, buflen));
			});
		});
	}
}();