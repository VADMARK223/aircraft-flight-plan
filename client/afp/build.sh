#!/usr/bin/env bash

rm -rf ./build

npm install
npm run build

docker build -t ghcr.io/fondorg/aircraft-flight-plan-client:latest .
