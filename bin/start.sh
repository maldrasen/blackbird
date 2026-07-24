#!/bin/bash

rm -f debug/*.json

bin/compile-style.sh
bin/compile-manifest.sh

node bin/run-tests.js

cd $BLACKBIRD_HOME
npm run start
