#!/usr/bin/env bash

if [ $# -ne 2 ]
then
  echo "Missing the two files to compare"
  exit 1
fi

SCRIPT_PATH="$(cd -- "$(dirname "$0")" >/dev/null 2>&1; pwd -P)"
XSL_PATH=$SCRIPT_PATH/standardize.xsl

TMP_DIR=$(mktemp -d)
FIRST_FILE=$TMP_DIR/first.xml
SECOND_FILE=$TMP_DIR/second.xml

set -e
xsltproc $XSL_PATH $1 > $FIRST_FILE
xsltproc $XSL_PATH $2 > $SECOND_FILE
set +e
diff $FIRST_FILE $SECOND_FILE && echo "OK"
rm -r $TMP_DIR
