var http = require('http');
var Router = require('node-simple-router');

var router = Router(); // may also be router = new Router();


router.get("/hello", function(request, response) {response.end("Hello, World!");});

router.get('/api/:query', function(req, res) {

	var query = req.params.query;


	var exec = require('child_process').exec;

	console.log("Beggining Exec");
	var child = exec("./SliferSearch.py " + query + " | ./textURL.py | node spotlight.js | ./SliferSPARQL.py | ./jaccard.py --seuil", function(error, stdout, stderr) {
    	console.log("Ending Exec");
    	console.log(stdout);

    	res.send("NICE");
	});

});





var server = http.createServer(router);
server.listen(1234);
console.log('Server running at localhost:1234/');