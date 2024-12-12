#!/usr/bin/env bash

./gradlew :clean bootJar

docker build -t ghcr.io/fondorg/aircraft-flight-plan-api:latest .
