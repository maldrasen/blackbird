#!/bin/bash

bin/compile-style.sh
bin/compile-manifest.sh

cd $BLACKBIRD_HOME
npm run start
