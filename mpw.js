// A TextEncoder in UTF-8 to convert strings to `Uint8Array`s
const txtencoder = new TextEncoder;

// JS Web Crypto implementation of http://masterpasswordapp.com/algorithm.html
class MPW {
	constructor(name, password) {
		// Store name on the object, this is not used at all internally
		this.name = name;
		
		// Calculate the master key which will be used to calculate
		// the password seed
		this.key = MPW.calculateKey(name, password);
	}
	
	// calculateKey takes ~ 1450.000ms to complete
	static calculateKey(name, password) {
		if (!name) {
			return Promise.reject(new Error("Argument name not present"));
		}
		
		if (!password) {
			return Promise.reject(new Error("Argument password not present"));
		}
		
		try {
			// Convert password string to a Uint8Array w/ UTF-8
			password = txtencoder.encode(password);
			
			// Convert name string to a Uint8Array w/ UTF-8
			name = txtencoder.encode(name);
			
			// Convert MPW.NS string to a Uint8Array w/ UTF-8
			let NS = txtencoder.encode(MPW.NS);
			
			// Create salt array and a dataView representing it
			var salt     = new Uint8Array(NS.length + 4/*sizeof(uint32)*/ + name.length);
			let saltView = new DataView(salt.buffer);
			let i = 0;
			
			// Set salt[0,] to NS
			salt.set(NS, i); i += NS.length;
			
			// Set salt[i,i+4] to name.length UINT32 in big-endian form
			saltView.setUint32(i, name.length, false/*big-endian*/); i += 4/*sizeof(uint32)*/;
			
			// Set salt[i,] to name
			salt.set(name, i); i += name.length;
		} catch (e) {
			return Promise.reject(e);
		}
		
		// Derive the master key w/ scrypt
		// why is buflen 64*8==512 and not 32*8==256 ?
		return window.scrypt(password, salt, 32768/*= n*/, 8/*= r*/, 2/*= p*/, 64/*= buflen*/).then(
			// Import the key into WebCrypto to use later with sign while being non-extractable
			key => window.crypto.subtle.importKey("raw", key, {
				name: "HMAC",
				hash: {
					name: "SHA-256"
				}
			}, false/*not extractable*/, [ "sign" ])/*= key*/
		);
	}
	
	// calculateSeed takes ~ 3.000ms to complete + the time of calculateKey once
	calculateSeed(site, counter = 0, NS = MPW.NS) {
		if (!site) {
			return Promise.reject(new Error("Argument site not present"));
		}
		
		if (counter < 0 || counter > 2147483647/*Math.pow(2, 31) - 1*/) {
			return Promise.reject(new Error("Argument counter out of range"));
		}
		
		try {
			// Convert salt string to a Uint8Array w/ UTF-8
			site = txtencoder.encode(site);
			
			// Convert NS string to a Uint8Array w/ UTF-8
			NS = txtencoder.encode(NS);
			
			// Create data array and a dataView representing it
			var data     = new Uint8Array(NS.length + 4/*sizeof(uint32)*/ + site.length + 4/*sizeof(uint32)*/);
			let dataView = new DataView(data.buffer);
			let i = 0;
			
			// Set data[0,] to NS
			data.set(NS, i); i += NS.length;
			
			// Set data[i,i+4] to site.length UINT32 in big-endian form
			dataView.setUint32(i, site.length, false/*big-endian*/); i += 4/*sizeof(uint32)*/;
			
			// Set data[i,] to site
			data.set(site, i); i += site.length;
			
			// Set data[i,i+4] to counter UINT32 in big-endian form
			dataView.setUint32(i, counter, false/*big-endian*/); i += 4/*sizeof(uint32)*/;	
		} catch (e) {
			return Promise.reject(e);
		}
		
		return this.key.then(
			// Sign data using HMAC-SHA-256 w/ this.key
			key => window.crypto.subtle.sign({
				name: "HMAC",
				hash: {
					name: "SHA-256"
				}
			}, key, data)/*= seed*/
		);
	}
	
	// generate takes ~ 0.200ms to complete + the time of calculateSeed
	generate(site, counter = 0, template = "long", NS = MPW.NS) {
		// Does the requested template exist?
		if (!(template in MPW.templates)) {
			return Promise.reject(new Error("Argument template invalid"));
		}
		
		// Calculate the seed
		return this.calculateSeed(site, counter, NS).then(function (seed) {
			// Convert the seed to Uint8Array from ArrayBuffer
			seed = new Uint8Array(seed);
			
			// Find the selected template array
			template = MPW.templates[template];
			
			// Select the specific template based on seed[0]
			template = template[seed[0] % template.length];
			
			// Split the template string (e.g. xxx...xxx)
			return template.split("").map(function (c, i) {
				// Use MPW.passchars to map the template string (e.g. xxx...xxx)
				// to characters (e.g. c -> bcdfghjklmnpqrstvwxyz)
				let chars = MPW.passchars[c];
				
				// Select the character using seed[i + 1]
				return chars[seed[i + 1] % chars.length];
			}).join("");
		})/*= password*/;
	}
	
	// generate a password with the password namespace
	generatePassword(site, counter = 0, template = "long") {
		return this.generate(site, counter, template, MPW.PasswordNS);
	}
	
	// generate a username with the login namespace
	generateLogin(site, counter = 0, template = "long") {
		return this.generate(site, counter, template, MPW.LoginNS);
	}
	
	// generate a security answer with the answer namespace
	generateAnswer(site, counter = 0, template = "long") {
		return this.generate(site, counter, template, MPW.AnswerNS);
	}
	
	invalidate() {
		// Replace this.key w/ a Promise.reject
		// Preventing all future access
		this.key = Promise.reject(new Error("invalid state"));
	}
	
	static test() {
		// Pretty simple test here
		return new MPW("user", "password").generate("example.com", 0, "long").then(function (password) {
			console.assert(password === "KezpWado2+Fazo", "Self-test failed; expected: KezpWado2+Fazo; got: " + password);
			return password === "KezpWado2+Fazo"
				? Promise.resolve()
				: Promise.reject(new Error("Self-test failed; expected: KezpWado2+Fazo; got: " + password));
		});
	}
}

// The namespace used in calculateKey
MPW.NS = "com.lyndir.masterpassword";

// The namespaces used in calculateSeed
MPW.PasswordNS = "com.lyndir.masterpassword";
MPW.LoginNS = "com.lyndir.masterpassword.login";
MPW.AnswerNS = "com.lyndir.masterpassword.answer";

// The templates that passwords may be created from
// The characters map to MPW.passchars
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

// The password character mapping
// c in template becomes bcdfghjklmnpqrstvwxyz
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