#!/bin/bash

# Check for Aptitude
which apt > /dev/null
if [ "$?" != 0 ]; then
  echo "Missing apt. Are you on a debian-based Linux distribution?"
  exit
fi

# Install dependencies
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt-get install -y \
  python3.8 \
  python3.8-venv \
  automake \
  autoconf \
  sox \
  libtool \
  wget

