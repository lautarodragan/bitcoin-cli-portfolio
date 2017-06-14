default: compile run

run:
	node dist

compile:
	tsc

publish: compile
	npm publish