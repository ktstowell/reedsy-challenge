#!/usr/bin/env bash

npm install -g mongo-express
nohup mongo-express -u reedsy -p "i<3books" -d reedsy &>/dev/null &
