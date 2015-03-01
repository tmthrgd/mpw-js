/*! by Tom Thorogood <me@tomthorogood.co.uk> */
/*! This work is licensed under the Creative Commons Attribution 4.0
International License. To view a copy of this license, visit
http://creativecommons.org/licenses/by/4.0/ or see LICENSE. */

window.ghcallback = function ghcallback(response) {
	var error = document.querySelector(".error");
	
	if (response.meta.status != 200) {
		console.warn && console.warn(response.meta);
		error.textContent = response.data.message;
		return;
	}
	
	console.log && console.log(response.meta);
	
	var data = response.data.encoding === "base64" ? decodeURIComponent(escape(window.atob(response.data.content.replace(/\n/g, "")))) : response.data.content;
	
	try {
		var xml = (new window.DOMParser).parseFromString(data, "text/xml");
	} catch (err) {
		error.textContent = err.message;
		return;
	}
	
	if (!xml || xml.getElementsByTagName("parsererror").length) {
		error.textContent = xml.getElementsByTagName("parsererror")[0].textContent;
		return;
	}
	
	var cases = { };
	
	for (var testCase = xml.querySelector("case"); !!testCase; testCase = testCase.nextElementSibling) {
		var parent = testCase.getAttribute("parent");
		
		cases[testCase.id] = parent in cases ? Object.create(cases[parent]) : { };
		cases[testCase.id].testID = testCase.id;
		
		for (var node = testCase.firstChild; !!node; node = node.nextElementSibling) {
			cases[testCase.id][node.nodeName] = node.textContent;
		}
	}
	
	var tests = Object.keys(cases).filter(function alg(testCase) {
		return cases[testCase].algorithm && cases[testCase].result;
	});
	
	var passed = document.querySelector(".num.passed");
	var failed = document.querySelector(".num.failed");
	var skipped = document.querySelector(".num.skipped");
	var completed = document.querySelector(".num.completed");
	
	passed.dataset.total = failed.dataset.total = skipped.dataset.total = completed.dataset.total = tests.length;
	
	var testsDiv = document.querySelector(".tests");
	
	var mpws = { };
	
	Promise.all(tests.map(function runTest(testCase) {
		testCase = cases[testCase];
		
		var test = document.createElement("div");
		test.classList.add("test");
		test.textContent = "Test " + testCase.testID + " Running";
		testsDiv.appendChild(test);
		
		var mpwKey = ["v" + testCase.algorithm, testCase.fullName.length, testCase.fullName, testCase.masterPassword.length, testCase.masterPassword].join("$");
		var mpw = mpws[mpwKey] || (mpws[mpwKey] = new MPW(testCase.fullName, testCase.masterPassword, testCase.algorithm));
		
		var template = testCase.siteType.replace(/^Generated/, "").toLowerCase();
		
		if (testCase.siteVariant === "Answer") {
			var value = mpw.generateAnswer(testCase.siteName, Number.parseInt(testCase.siteCounter), testCase.siteContext, template);
		} else {
			var value = mpw["generate" + testCase.siteVariant](testCase.siteName, Number.parseInt(testCase.siteCounter), template);
		}
		
		return value.then(function (pass) {
			return pass === testCase.result
				? Promise.resolve()
				: Promise.reject("Invalid result; expected: " + testCase.result + "; got: " + pass);
		}).then(function () {
			test.classList.add("completed", "success");
			test.textContent = "Test " + testCase.testID + " Passed";
			
			passed.textContent = ++passed.textContent;
			completed.textContent = ++completed.textContent;
			
			return Promise.resolve();
		}, function (err) {
			test.classList.add("completed", "failure");
			test.textContent = "Test " + testCase.testID + " Failed; " + err;
			
			failed.textContent = ++failed.textContent;
			completed.textContent = ++completed.textContent;
			
			return Promise.resolve();
		});
	})).catch(function(err) {
		error.textContent = err;
		console.error(err);
	});
};