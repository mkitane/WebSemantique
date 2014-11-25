var http = require('http');
var Router = require('node-simple-router');

var router = Router(); // may also be router = new Router();


router.get("/hello", function(request, response) {response.end("Hello, World!");});

router.get('/api/:query', function(req, res) {

	var query = request.params.query;


	var exec = require('child_process').exec;

	var child = exec("./SliferSearch.py " + query + " | ./textURL.py | node spotlight.js | node SliferSPARQL.js | ./jaccard.py --seuil");



});





var server = http.createServer(router);
server.listen(1234);
console.log('Server running at localhost:1234/');