#!/bin/sh

<<<<<<< HEAD
./SliferSearch.py bordeaux > outputs/SliferSearch.json
=======
./SliferSearch.py $1 > outputs/SliferSearch.json
>>>>>>> 0fc25d0748a612cb5d628dbae874669641a119d4
cat outputs/SliferSearch.json | ./textURL.py > outputs/textURL.json
cat outputs/textURL.json | node spotlight.js > outputs/spotlight.json
cat outputs/spotlight.json | ./SliferSPARQL.py > outputs/SliferSPARQL.json
