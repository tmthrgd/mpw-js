let mpw, fullname, masterpassword, sitename, counter, template, type, resulttype, password, error, id = 0;

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
		!template.validity.valid ||
		!type.validity.valid) {
		return;
	}
	
	let cid = ++id;
	
	let Type = type.value[0].toUpperCase() + type.value.slice(1).toLowerCase();
	
	mpw["generate" + Type](sitename.value, counter.valueAsNumber, template.value).then(function (pass) {
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

function updateType() {
	resulttype.textContent = type.selectedOptions[0].textContent;
}

window.addEventListener("load", function () {
	fullname       = document.querySelector("[name=fullname]");
	masterpassword = document.querySelector("[name=masterpassword]");
	calculatekey   = document.querySelector("[name=calculatekey]");
	sitename       = document.querySelector("[name=site]");
	counter        = document.querySelector("[name=counter]");
	template       = document.querySelector("[name=template]");
	type           = document.querySelector("[name=type]");
	resulttype     = document.querySelector(".resulttype");
	password       = document.querySelector(".password");
	error          = document.querySelector(".error");
	
	if (!window.crypto || !(window.crypto.subtle || (window.crypto.subtle = window.crypto.webkitSubtle))) {
		error.innerText = error.textContent = "Your current browser does not support the Web Cryptography API! This page will not work.";
		return;
	}
	
	fullname.disabled = masterpassword.disabled = calculatekey.disabled = sitename.disabled = counter.disabled = template.disabled = type.disabled = password.disabled = false;
	
	updateMPW();
	calculatekey.addEventListener("click", updateMPW, false);
	
	sitename.addEventListener("input", updatePassword, false);
	counter.addEventListener("input", updatePassword, false);
	template.addEventListener("change", updatePassword, false);
	type.addEventListener("change", updatePassword, false);
	
	updateType();
	type.addEventListener("change", updateType, false);
	
	MPW.test().catch(function (err) {
		console.error(err);
		error.textContent = err.toString();
	});
}, false);