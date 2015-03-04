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
mkdir -p ../typings/touch-events
cp typings/d3/d3.d.ts ../typings/d3/d3.d.ts
cp typings/touch-events/touch-events.d.ts ../typings/touch-events/touch-events.d.ts

cd ..

grunt

./node_modules/typedoc/bin/typedoc --mode file --includeDeclarations typings/d3/d3.d.ts typings/touch-events/touch-events.d.ts plottable.d.ts --theme _typedoc/themes/plottable --out docs/

rm -rf _plottable
rm -r typings
rm plottable.d.ts
