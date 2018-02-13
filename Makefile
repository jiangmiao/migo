all: lib/migo.js bin/migo-cli.js

lib/%.js: lib/%.toffee
	toffee -c -o lib $<

bin/%.js: bin/%.toffee
	toffee -c -o bin $<

test:
	cd examples && \
	echo 'migrate all' && \
	node ../bin/migo.js test.migo

test-redo:
	cd examples && \
	echo 'migrate to zero' && \
	node ../bin/migo.js test.migo 0 && \
	echo 'migrate all' && \
	node ../bin/migo.js test.migo
