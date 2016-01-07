#!/usr/bin/env bash
version=`cat package.json | json version`
cat extension/manifest.json | json -j -e "this.version = \"$version\"" > extension/manifest_new.json
rm extension/manifest.json
mv extension/manifest_new.json extension/manifest.json