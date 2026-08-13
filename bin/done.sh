#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: bin/done.sh <task-number>"
  exit 1
fi

mv docs/tasks/$1*.md docs/tasks/completed
