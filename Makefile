build: mkdir-es5 es5/manager.js

mkdir-es5:
	mkdir -p es5

es5/%: $*
	traceur --out $@ --script $* --experimental --source-maps file

clean:
	rm -rf es5 2>/dev/null