cd dist
git init
git add .
git commit -m 'update'
git push -f git@github.com:TOMGOU/threejs-demo.git master:gh-pages
cd ../

git push origin `git subtree split --prefix dist master`:gh-pages --force 
