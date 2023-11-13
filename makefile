# type make gt in your terminal to trigger your commit
# no need to make named commit at this step

gt:
	git add .
	git commit -m "commit"
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
