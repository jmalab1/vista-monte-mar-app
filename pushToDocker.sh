#!/bin/bash
npm install
npm run build

docker build -t jmalab24/vista-monte-mar-app:latest .
docker push jmalab24/vista-monte-mar-app:latest