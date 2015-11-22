#!/usr/bin/env bash

echo "***************"
echo "Configuring npm"
echo "***************"
mkdir /home/vagrant/.npm-packages
npm config set prefix /home/vagrant/.npm-packages
npm install -g gulp grunt grunt-cli bower jshint
echo "export PATH=/home/vagrant/.npm-packages/bin:/home/vagrant/.npm-packages/lib:$PATH" >> /home/vagrant/.profile
source /home/vagrant/.profile