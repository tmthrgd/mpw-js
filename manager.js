let mpw, fullname, masterpassword, sitename, counter, template, password, error, id = 0;

function updateMPW() {
	error.textContent = password.value = "";
	
	if (!fullname.value ||
		!masterpassword.value ||
	    !fullname.validity.valid ||
		!masterpassword.validity.valid) {
		return mpw = null;
	}
	
	mpw = new MPW(fullname.value, masterpassword.value);
	
	updatePassword();
}

function updatePassword() {
	error.textContent = password.value = "";
	
	if (!mpw || !sitename.value ||
		!sitename.validity.valid ||
		!counter.validity.valid ||
		!template.validity.valid) {
		return;
	}
	
	let cid = ++id;
	
	mpw.generate(sitename.value, counter.valueAsNumber, template.value).then(function (pass) {
		if (cid === id) {
			password.value = pass;
		}
	}, function (err) {
		if (cid === id) {
			error.textContent = err.message;
		}
		
		console.error(err);
	});
}

window.addEventListener("load", function () {
	fullname       = document.querySelector("[name=fullname]");
	masterpassword = document.querySelector("[name=masterpassword]");
	sitename       = document.querySelector("[name=site]");
	counter        = document.querySelector("[name=counter]");
	template       = document.querySelector("[name=template]");
	password       = document.querySelector(".password");
	error          = document.querySelector(".error");
	
	if (!window.crypto || !window.crypto.subtle) {
		error.innerText = error.textContent = "Your current browser does not support the Web Cryptography API! This page will not work.";
		return;
	}
	
	fullname.disabled = masterpassword.disabled = sitename.disabled = counter.disabled = template.disabled = password.disabled = false;
	
	updateMPW();
	
	fullname.addEventListener("input", updateMPW, false);
	masterpassword.addEventListener("input", updateMPW, false);
	
	sitename.addEventListener("input", updatePassword, false);
	counter.addEventListener("input", updatePassword, false);
	template.addEventListener("change", updatePassword, false);
}, false);