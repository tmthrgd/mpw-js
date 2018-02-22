build: mkdir-es5 es5/lib/pbkdf2.js es5/lib/scrypt.js es5/lib/mpw.js es5/setImmediate-polyfill.js

mkdir-es5:
	mkdir -p es5
	mkdir -p es5/lib

es5/%: $*
	babel $* -o $@ --presets env --source-maps

clean:
	rm -rf es5 2>/dev/null

update:
	git submodule update --init --recursive
	git submodule foreach git pull origin master