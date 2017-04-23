#!/bin/bash
rm -rf ../invisibox-service/docker/nginx/www 
cp -R platforms/browser/www ../invisibox-service/docker/nginx/www
docker rmi -f invisibox-ui 
docker build -t invisibox-ui ../invisibox-service/docker/nginx
