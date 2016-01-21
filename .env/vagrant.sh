#!/usr/bin/env bash

# SYSTEM UPDATES
echo "***************"
echo "Updating System"
echo "***************"

sudo apt-get update
sudo apt-get install -y linux-headers-generic build-essential dkms curl wget

# VAGRANT USER
sudo su vagrant << EOF
# NODE JS
echo "**********************"
echo "Installing node.js 4.*"
echo "**********************"
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

# MONGO DB
echo "******************"
echo "Installing MongoDB"
echo "******************"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo rm /var/lib/mongodb/mongod.lock
sudo service mongod restart

# NGINX
echo "****************"
echo "Installing Nginx"
echo "****************"
sudo apt-key add nginx_signing.key
sudo deb http://nginx.org/packages/ubuntu/ precise nginx
sudo apt-get update
sudo apt-get install -y nginx
echo "Done!"

echo "*****************************"
echo "Running Configuration Scripts"
echo "*****************************"
. /home/vagrant/reedsy/.env/node/init.sh
. /home/vagrant/reedsy/.env/nginx/init.sh
. /home/vagrant/reedsy/.env/mongo/init.sh


echo "*****************************************************"
echo "ALL DONE - PLEASE SEE README FOR FURTHER INSTRUCTIONS"
echo "*****************************************************"
EOF
