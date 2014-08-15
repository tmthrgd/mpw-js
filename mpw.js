const txtencoder = new TextEncoder;

// JS Web Crypto implementation of http://masterpasswordapp.com/algorithm.html
class MPW {
	constructor(name, password) {
		this.name = name;
		
		this.key = MPW.calculateKey(name, password);
	}
	
	// ~ 1450.000ms
	static calculateKey(name, password) {
		if (!name) {
			return Promise.reject(new Error("Argument name not present"));
		}
		
		if (!password) {
			return Promise.reject(new Error("Argument password not present"));
		}
		
		try {
			password = txtencoder.encode(password);
			
			name = txtencoder.encode(name);
			
			let NS = txtencoder.encode(MPW.NS);
			
			var salt     = new Uint8Array(NS.length + 4/*sizeof(uint32)*/ + name.length);
			let saltView = new DataView(salt.buffer);
			let i = 0;
			
			salt.set(NS, i); i += NS.length;
			saltView.setUint32(i, name.length, false/*big-endian*/); i += 4/*sizeof(uint32)*/;
			salt.set(name, i); i += name.length;
		} catch (e) {
			return Promise.reject(e);
		}
		
		// why is buflen 64*8==512 and not 32*8==256 ?
		return window.scrypt(password, salt, 32768, 8, 2, 64).then(
			key => window.crypto.subtle.importKey("raw", key, {
				name: "HMAC",
				hash: {
					name: "SHA-256"
				}
			}, false/*not extractable*/, [ "sign" ])/*= key*/
		);
	}
	
	// ~ 3.000ms + calculateKey (once)
	calculateSeed(site, counter = 0) {
		if (!site) {
			return Promise.reject(new Error("Argument site not present"));
		}
		
		if (counter < 0 || counter > 2147483647/*Math.pow(2, 31) - 1*/) {
			return Promise.reject(new Error("Argument counter out of range"));
		}
		
		try {
			site = txtencoder.encode(site);
			
			let NS = txtencoder.encode(MPW.NS);
			
			var data     = new Uint8Array(NS.length + 4/*sizeof(uint32)*/ + site.length + 4/*sizeof(uint32)*/);
			let dataView = new DataView(data.buffer);
			let i = 0;
			
			data.set(NS, i); i += NS.length;
			dataView.setUint32(i, site.length, false/*big-endian*/); i += 4/*sizeof(uint32)*/;
			data.set(site, i); i += site.length;
			dataView.setUint32(i, counter, false/*big-endian*/); i += 4/*sizeof(uint32)*/;	
		} catch (e) {
			return Promise.reject(e);
		}
		
		return this.key.then(
			key => window.crypto.subtle.sign({
				name: "HMAC",
				hash: {
					name: "SHA-256"
				}
			}, key, data)/*= seed*/
		);
	}
	
	// ~ 0.200ms + calculateSeed
	generate(site, counter = 0, template = "long") {
		if (!(template in MPW.templates)) {
			return Promise.reject(new Error("Argument template invalid"));
		}
		
		return this.calculateSeed(site, counter).then(function (seed) {
			seed = new Uint8Array(seed);
			
			template = MPW.templates[template];
			template = template[seed[0] % template.length];
			
			return template.split("").map(function (c, i) {
				let chars = MPW.passchars[c];
				return chars[seed[i + 1] % chars.length];
			}).join("");
		})/*= password*/;
	}
	
	invalidate() {
		this.key = Promise.reject(new Error("invalid state"));
	}
}

MPW.NS = "com.lyndir.masterpassword";

MPW.templates = {
	maximum: [
		"anoxxxxxxxxxxxxxxxxx",
		"axxxxxxxxxxxxxxxxxno"
	],
	long: [
		"CvcvnoCvcvCvcv",
		"CvcvCvcvnoCvcv",
		"CvcvCvcvCvcvno",
		"CvccnoCvcvCvcv",
		"CvccCvcvnoCvcv",
		"CvccCvcvCvcvno",
		"CvcvnoCvccCvcv",
		"CvcvCvccnoCvcv",
		"CvcvCvccCvcvno",
		"CvcvnoCvcvCvcc",
		"CvcvCvcvnoCvcc",
		"CvcvCvcvCvccno",
		"CvccnoCvccCvcv",
		"CvccCvccnoCvcv",
		"CvccCvccCvcvno",
		"CvcvnoCvccCvcc",
		"CvcvCvccnoCvcc",
		"CvcvCvccCvccno",
		"CvccnoCvcvCvcc",
		"CvccCvcvnoCvcc",
		"CvccCvcvCvccno"
	],
	medium: [
		"CvcnoCvc",
		"CvcCvcno"
	],
	short: [
		"Cvcn"
	],
	basic: [
		"aaanaaan",
		"aannaaan",
		"aaannaaa"
	],
	pin: [
		"nnnn"
	]
};

MPW.passchars = {
	V: "AEIOU",
	C: "BCDFGHJKLMNPQRSTVWXYZ",
	v: "aeiou",
	c: "bcdfghjklmnpqrstvwxyz",
	A: "AEIOUBCDFGHJKLMNPQRSTVWXYZ",
	a: "AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz",
	n: "0123456789",
	o: "@&%?,=[]_:-+*$#!'^~;()/.",
	x: "AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz0123456789@&%?,=[]_:-+*$#!'^~;()/."
};