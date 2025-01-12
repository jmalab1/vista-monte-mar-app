#!/bin/bash
npm install
npm run build

docker buildx create --use
docker buildx build --platform linux/amd64 -t jmalab24/vista-monte-mar-app:dev --push .