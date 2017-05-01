#!/bin/bash
ionic build browser --prod
rm -rf ../invisibox-service/docker/nginx/www 
rm platforms/browser/www/index.html
cp scripts/browser/index.html platforms/browser/www/index.html
cp -R platforms/browser/www ../invisibox-service/docker/nginx/www
docker rmi -f invisibox-ui 
docker build -t invisibox-ui ../invisibox-service/docker/nginx
