#!/usr/bin/env bash
rm extension.zip
version=`cat package.json | json version`
cat extension/manifest.json | json -j -e "this.version = \"$version\"" > extension/manifest_new.json
rm extension/manifest.json
mv extension/manifest_new.json extension/manifest.json

bower install
bower-installer
zip -r extension.zip extension