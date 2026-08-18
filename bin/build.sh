#!/bin/bash

# Prebuild Clean
cd $BLACKBIRD_HOME
rm -rf ./dist/*

# Regenerate precalculated data
node ./bin/compile-essence-data.js

# Electron Builder
npm run dist
