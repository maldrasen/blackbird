#!/bin/bash

rm -f debug/*.json

bin/compile-style.sh
bin/test.sh --quiet

npm run start
