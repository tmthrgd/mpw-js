NODE_PREFIX=$(shell npm config get prefix)

build: traceur-runtime.js mkdir-es5 es5/lib/pbkdf2.js es5/lib/scrypt.js es5/lib/mpw.js es5/setImmediate-polyfill.js

traceur-runtime.js: ${NODE_PREFIX}/lib/node_modules/traceur/bin/traceur-runtime.js
	cp $< $@

mkdir-es5:
	mkdir -p es5
	mkdir -p es5/lib

es5/%: $*
	traceur --out $@ --script $* --experimental --source-maps file

clean:
	rm -rf es5 2>/dev/null

update:
	git submodule update --init --recursive
	git submodule foreach git pull origin master