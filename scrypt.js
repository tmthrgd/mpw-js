/*! by Tom Thorogood <me@tomthorogood.co.uk> */
/*! This work is licensed under the Creative Commons Attribution 4.0
International License. To view a copy of this license, visit
http://creativecommons.org/licenses/by/4.0/ or see LICENSE. */

window.scrypt = function () {
	// https://github.com/golang/crypto/blob/master/scrypt/scrypt.go
	function salsaXOR(tmp, inp, out) {
		let w = [ ];
		let x = [ ];
		
		for (let i = 0; i < 16; i++) {
			x[i] = w[i] = tmp[i] ^ inp[i];
		}
		
		for (let i = 0, u; i < 8; i += 2) {
			u = x[0]  + x[12]; x[4]  ^= (u << 7)  | (u >>> (32 - 7));
			u = x[4]  + x[0];  x[8]  ^= (u << 9)  | (u >>> (32 - 9));
			u = x[8]  + x[4];  x[12] ^= (u << 13) | (u >>> (32 - 13));
			u = x[12] + x[8];  x[0]  ^= (u << 18) | (u >>> (32 - 18));
			
			u = x[5]  + x[1];  x[9]  ^= (u << 7)  | (u >>> (32 - 7));
			u = x[9]  + x[5];  x[13] ^= (u << 9)  | (u >>> (32 - 9));
			u = x[13] + x[9];  x[1]  ^= (u << 13) | (u >>> (32 - 13));
			u = x[1]  + x[13]; x[5]  ^= (u << 18) | (u >>> (32 - 18));
			
			u = x[10] + x[6];  x[14] ^= (u << 7)  | (u >>> (32 - 7));
			u = x[14] + x[10]; x[2]  ^= (u << 9)  | (u >>> (32 - 9));
			u = x[2]  + x[14]; x[6]  ^= (u << 13) | (u >>> (32 - 13));
			u = x[6]  + x[2];  x[10] ^= (u << 18) | (u >>> (32 - 18));
			
			u = x[15] + x[11]; x[3]  ^= (u << 7)  | (u >>> (32 - 7));
			u = x[3]  + x[15]; x[7]  ^= (u << 9)  | (u >>> (32 - 9));
			u = x[7]  + x[3];  x[11] ^= (u << 13) | (u >>> (32 - 13));
			u = x[11] + x[7];  x[15] ^= (u << 18) | (u >>> (32 - 18));
			
			u = x[0] + x[3]; x[1] ^= (u << 7)  | (u >>> (32 - 7));
			u = x[1] + x[0]; x[2] ^= (u << 9)  | (u >>> (32 - 9));
			u = x[2] + x[1]; x[3] ^= (u << 13) | (u >>> (32 - 13));
			u = x[3] + x[2]; x[0] ^= (u << 18) | (u >>> (32 - 18));
			
			u = x[5] + x[4]; x[6] ^= (u << 7)  | (u >>> (32 - 7));
			u = x[6] + x[5]; x[7] ^= (u << 9)  | (u >>> (32 - 9));
			u = x[7] + x[6]; x[4] ^= (u << 13) | (u >>> (32 - 13));
			u = x[4] + x[7]; x[5] ^= (u << 18) | (u >>> (32 - 18));
			
			u = x[10] + x[9];  x[11] ^= (u << 7)  | (u >>> (32 - 7));
			u = x[11] + x[10]; x[8]  ^= (u << 9)  | (u >>> (32 - 9));
			u = x[8]  + x[11]; x[9]  ^= (u << 13) | (u >>> (32 - 13));
			u = x[9]  + x[8];  x[10] ^= (u << 18) | (u >>> (32 - 18));
			
			u = x[15] + x[14]; x[12] ^= (u << 7)  | (u >>> (32 - 7));
			u = x[12] + x[15]; x[13] ^= (u << 9)  | (u >>> (32 - 9));
			u = x[13] + x[12]; x[14] ^= (u << 13) | (u >>> (32 - 13));
			u = x[14] + x[13]; x[15] ^= (u << 18) | (u >>> (32 - 18));
		}
		
		for (let i = 0; i < 16; i++) {
			out[i] = tmp[i] = x[i] + w[i];
		}
	}
	
	function blockMix(inp, out, r) {
		let tmp = inp.slice((2 * r - 1) * 16, (2 * r) * 16);
		
		for (let i = 0; i < 2 * r; i += 2) {
			salsaXOR(tmp, inp.subarray(i * 16), out.subarray(i * 8));
			salsaXOR(tmp, inp.subarray((i + 1) * 16), out.subarray((i + 2 * r) * 8));
		}
	}
	
	function smix(b, r, N, v, x, y) {
		let bView = new DataView(b.buffer, b.byteOffset, b.byteLength);
		
		for (let i = 0, j = 0; i < x.length; i++, j += 4) {
			x[i] = bView.getUint32(j, true/*little-endian*/);
		}
		
		for (let i = 0; i < N; i += 2) {
			v.set(x, i * 32 * r);
			blockMix(x, y, r);
			
			v.set(y, (i + 1) * 32 * r);
			blockMix(y, x, r);
		}
		
		for (let i = 0, j, sh32 = Math.pow(2, 32); i < N; i += 2) {
			j = (x[(2 * r - 1) * 16] | (x[(2 * r - 1) * 16 + 1] * sh32)) & (N - 1);
			
			for (let k = 0; k < x.length; k++) {
				x[k] ^= v[j * 32 * r + k];
			}
			
			blockMix(x, y, r);
			
			j = (y[(2 * r - 1) * 16] | (y[(2 * r - 1) * 16 + 1] * sh32)) & (N - 1);
			
			for (let k = 0; k < y.length; k++) {
				y[k] ^= v[j * 32 * r + k];
			}
			
			blockMix(y, x, r);
		}
		
		for (let i = 0, j = 0; i < x.length; i++, j += 4) {
			bView.setUint32(j, x[i], true/*little-endian*/);
		}
	}
	
	// This is the scrypt function
	// It returns a promise which will resolve asynchronously
	return function (passphrase, salt, N, r, p, keyLen) {
		// Check that p and r are not too large
		if (r * p >= Math.pow(2, 30)) {
			return Promise.reject(new Error("Parameters r and p are too large"));
		}
		
		// Check that N is a power of 2 greater than 1 and that we can safely work on it in JS
		if (N < 2 || N & (N - 1) != 0 || N > Number.MAX_SAFE_INTEGER) {
			return Promise.reject(new Error("Argument N is invalid; N must be > 1, a power of 2 and less than 2^53"));
		}
		
		let x = new Uint32Array(32 * r);
		let y = new Uint32Array(32 * r);
		let v = new Uint32Array(32 * N * r);
		
		let b = pbkdf2(passphrase, salt, 1, p * 128 * r, "SHA-256");
		
		for (let i = 0; i < p; i++) {
			// setImmediate (a 0-delay setTimeout of sorts) is needed
			// here so that this code is asynchronous and will not block
			// the UI thread
			b = b.then(b => new Promise((resolve, reject) => window.setImmediate(() => (smix(b.subarray(i * 128 * r), r, N, v, x, y), resolve(b)))));
		}
		
		return b.then(b => pbkdf2(passphrase, b, 1, keyLen, "SHA-256"));
	};
}();