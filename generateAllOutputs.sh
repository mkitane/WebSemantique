#!/bin/sh

./src/SliferSearch.py $1 > outputs/SliferSearch.json
cat outputs/SliferSearch.json | ./src/textURL.py > outputs/textURL.json
cat outputs/textURL.json | node src/spotlight.js > outputs/spotlight.json
cat outputs/spotlight.json | ./src/SliferSPARQL.py > outputs/SliferSPARQL.json
