ci: test

test: node_modules lint
	npm $@

lint:
	npm run $@

clean:
	rm -rf node_modules

node_modules: package.json
	npm install

.PHONY: clean
