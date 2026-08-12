#!/bin/bash

rm -f debug/*.json

bin/compile-manifest.sh

node bin/run-tests.js "$@"
