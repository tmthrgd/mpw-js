/*! by Tom Thorogood <me@tomthorogood.co.uk> */
/*! This work is licensed under the Creative Commons Attribution 4.0
International License. To view a copy of this license, visit
http://creativecommons.org/licenses/by/4.0/ or see LICENSE. */

// https://bugzilla.mozilla.org/show_bug.cgi?id=554827
window.pbkdf2 = function () {
	// https://github.com/golang/crypto/blob/master/pbkdf2/pbkdf2.go
	function pbkdf2_js(password, salt, iter, keyLen, hash) {
		let hashLen;
		
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
		
		let numBlocks = ((keyLen + hashLen - 1) / hashLen) | 0;
		
		let data     = new Uint8Array(salt.length + 4/*sizeof(uint32)*/);
		let dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
		
		data.set(salt);
		
		return window.crypto.subtle.importKey("raw", password, {
				name: "HMAC",
				hash: hash
			}, false/*not extractable*/, [ "sign" ]).then(function (key) {
				let dk = new Uint8Array(numBlocks * hashLen);
				let x = Promise.resolve();
				
				for (let block = 1, dki = 0; block <= numBlocks; block++, dki += hashLen) {
					x = x.then(() => dataView.setUint32(salt.length, block, false/*big-endian*/))
						.then(() => window.crypto.subtle.sign({
							name: "HMAC",
							hash: hash
						}, key, data))
						.then(pdk => (dk.set(new Uint8Array(pdk), dki), pdk));
					
					for (let n = 2; n <= iter; n++) {
						x = x.then(U => window.crypto.subtle.sign({
								name: "HMAC",
								hash: hash
							}, key, U)).then(function (U) {
								let Ux = new Uint8Array(U);
								
								for (let i = 0; i < Ux.length; i++) {
									dk[dki + i] ^= Ux[i];
								}
								
								return U;
							});
					}
				}
				
				return x.then(() => dk.subarray(0, keyLen));
			});
	}
	
	if (window.crypto.subtle) {
		return function (password, salt, iter, keyLen, hash) {
			let self = this;
			let args = arguments;
			
			return window.crypto.subtle.importKey("raw", password, {
					name: "PBKDF2",
					hash: hash
				}, false/*not extractable*/, [ "deriveBits" ])
				.then(key => window.crypto.subtle.deriveBits({
					name: "PBKDF2",
					salt: salt,
					iterations: iter,
					hash: hash
				}, key, keyLen * 8))
				.catch(err => (err.name === "OperationError")
					? (window.pbkdf2 = pbkdf2_js).apply(self, args)
					: Promise.reject(err));
		};
	} else {
		return function (password, salt, iter, keyLen, hash) {
			let hashAlg = CryptoJS.algo[hash.name || hash] || CryptoJS.algo[(hash.name || hash).replace("-", "")];
			
			if (!hashAlg) {
				return Promise.reject(new Error("Invalid argument hash"));
			}
			
			return new Promise(function (resolve, reject) {
				// setImmediate (a 0-delay setTimeout of sorts) is needed
				// here so that this code is asynchronous and will not block
				// the UI thread
				window.setImmediate(function () {
					// Create crypto-js WordArrays from Uint8Arrays password and salt
					password = CryptoJS.lib.WordArray.create(password);
					salt     = CryptoJS.lib.WordArray.create(salt);
					
					// Derive key using PBKDF2 w/ password and salt
					let Ckey = CryptoJS.PBKDF2(password, salt, {
						keySize: keyLen*8/32,
						iterations: iter,
						hasher: hashAlg
					});
					
					// Create key array and a DataView representing it
					let key     = new Uint8Array(Ckey.words.length * 4/*sizeof(int32)*/);
					let keyView = new DataView(key.buffer, key.byteOffset, key.byteLength);
					
					// Loop over Ckey.words which are INT32
					for (let i = 0; i < Ckey.words.length; i++) {
						// Set key[i*4,i*4+4] to Ckey.words[i] INT32 in big-endian form
						keyView.setInt32(i * 4/*sizeof(int32)*/, Ckey.words[i], false/*big-endian*/);
					}
					
					// Return the key Uint8Array
					resolve(key);
				});
			});
		};
	}
}();