#!/bin/bash
npm install
npm run build

docker build -t jmalab24/costa-rica-condo-app:latest .
docker push jmalab24/costa-rica-condo-app:latest