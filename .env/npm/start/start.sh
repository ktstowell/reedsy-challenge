#!/usr/bin/env bash

echo "Starting Vagrant VM. If this is your first time it will take a while (~10mins)"
vagrant up

vagrant ssh --command "cd /home/vagrant/reedsy && sudo npm install --no-bin-links && gulp develop"
