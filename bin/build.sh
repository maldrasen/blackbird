#!/bin/bash

# Prebuild Clean
cd $BLACKBIRD_HOME
rm -rf ./dist/*

# Electron Builder
npm run dist

# Postbuild Clean
rm -rf ./dist/win-unpacked
rm ./dist/*.yml
rm ./dist/*.yaml
