#!/bin/bash

# Check for Homebrew
which brew > /dev/null
if [ "$?" != 0 ]; then
  echo "Missing Homebrew. See https://brew.sh for installation details."
  exit
fi

# Install dependencies
brew install \
  python@3.8 \
  automake \
  autoconf \
  sox \
  libtool \
  libomp \
  wget

