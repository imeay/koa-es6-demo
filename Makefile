install:
	@npm instal
test:
	@mocha --compilers js:babel-register --harmony --reporter mochawesome --require co-mocha */test.js
dev:
	@babel-node ./src/app.js
start:
	@node ./lib/app.js
build:
	@babel ./src --out-dir  ./lib
lint:
	@eslint ./src/app.js


.PHONY: test
