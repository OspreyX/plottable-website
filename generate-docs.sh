#!/bin/bash

version="$1"

if [[ "$version" == "" ]]; then
    echo "Must provide tag or branch name as argument, e.g. 'v0.23.2'"
    exit 1
fi

git clone git@github.com:palantir/plottable.git _plottable
cd _plottable

git checkout "$version" -- plottable.d.ts typings/

cp plottable.d.ts ../.
mkdir -p ../typings/d3
cp typings/d3/d3.d.ts ../typings/d3/d3.d.ts

cd ..

grunt

./node_modules/typedoc/bin/typedoc --readme none --name Plottable --includeDeclarations typings/d3/d3.d.ts plottable.d.ts --theme _typedoc/themes/plottable --exclude plottable-website --out docs/

# remove BOM, since node adds it and Jekyll hates it
grunt bom

rm -rf _plottable
rm -r typings
rm plottable.d.ts
