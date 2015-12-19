#!/usr/bin/env bash

DIR=/vagrant/platform
BIN=$DIR/server.js
LOG=/var/log/reedsy.node.log
PROFILE=/home/vagrant/.profile
APP=reedsy
GUI_APP=reedsy.db.gui
GUI=/vagrant/node_modules/mongo-express/app.js

echo "***************"
echo "Configuring npm"
echo "***************"
mkdir /home/vagrant/.npm-packages
npm config set prefix /home/vagrant/.npm-packages
npm install -g gulp grunt grunt-cli bower jshint forever
ls -la /vagrant/.env
sudo cp /vagrant/.env/node/.foreverignore /
echo "export PATH=/home/vagrant/.npm-packages/bin:/home/vagrant/.npm-packages/lib:$PATH" >> $PROFILE

cat <<< "
alias server.stop=\"forever stop $APP\"
alias server.restart=\"forever restart $APP\"
alias server.log=\"tail -f $LOG\"
alias server.start=\"forever --uid $APP -o $LOG -e $LOG -a -w --watchDirectory $DIR  start $BIN\"
" >> $PROFILE

source /home/vagrant/.profile
cd $DIR && npm install --no-bin-links && cd ~/
sudo chmod -R 777 /var/log
server.start
forever list
