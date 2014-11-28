#!/bin/sh

./SliferSearch.py $1 > outputs/SliferSearch.json
cat outputs/SliferSearch.json | ./textURL.py > outputs/textURL.json
cat outputs/textURL.json | node spotlight.js > outputs/spotlight.json
cat outputs/spotlight.json | ./SliferSPARQL.py > outputs/SliferSPARQL.json
cat outputs/SliferSPARQL.json | ./jaccard.py --seuil