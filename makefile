default: compile run

run:
	node --harmony dist

compile:
	tsc

publish: compile
	npm publish