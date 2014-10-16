TRACEFLAGS=--experimental --source-maps file
NODE_PREFIX=$(shell npm config get prefix)

all: traceur-runtime.js setImmediate-polyfill.es5.js scrypt.es5.js mpw.es5.js manager.es5.js

traceur-runtime.js: ${NODE_PREFIX}/lib/node_modules/traceur/bin/traceur-runtime.js
	cp $< $@

setImmediate-polyfill.es5.js: setImmediate-polyfill.js
	traceur --out $@ --script $< ${TRACEFLAGS}

scrypt.es5.js: scrypt.js
	traceur --out $@ --script $< ${TRACEFLAGS}

mpw.es5.js: mpw.js
	traceur --out $@ --script $< ${TRACEFLAGS}

manager.es5.js: manager.js
	traceur --out $@ --script $< ${TRACEFLAGS}

remove:
	rm traceur-runtime.js *.es5.js *.es5.map 2>/dev/null