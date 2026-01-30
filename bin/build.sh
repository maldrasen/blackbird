#!/bin/bash

# Prebuild Clean
cd $BLACKBIRD_HOME
rm -rf ./dist/*

# Electron Builder
npm run dist
