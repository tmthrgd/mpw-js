NODE_PREFIX=$(shell npm config get prefix)

build: mkdir-es5 traceur-runtime.js es5/scrypt.js es5/mpw.js

traceur-runtime.js: ${NODE_PREFIX}/lib/node_modules/traceur/bin/traceur-runtime.js
	cp $< $@

mkdir-es5:
	mkdir -p es5

es5/%: $*
	traceur --out $@ --script $* --experimental --source-maps file

clean:
	rm -rf es5 2>/dev/null