m ?= "commit"

gt:
	git add .
	git commit -m "$(m)"
	git push origin

gtc:
	git pull --no-ff
	make gt

gm:
	git checkout main
	git pull

gmc:
	make gm
	git checkout -
