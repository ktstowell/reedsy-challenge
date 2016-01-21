#!/usr/bin/env bash

echo "*****************"
echo "Configuring Nginx"
echo "*****************"

sudo cp /home/vagrant/reedsy/.env/nginx/site /etc/nginx/sites-available/reedsy.local
sudo ln -s /etc/nginx/sites-available/reedsy.local /etc/nginx/sites-enabled/
sudo service nginx restart