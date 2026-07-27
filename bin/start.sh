#!/bin/bash

rm -f debug/*.json

bin/compile-style.sh
bin/compile-manifest.sh

node bin/run-tests.js
npm run start
