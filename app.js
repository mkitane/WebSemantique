var http = require('http');
var Router = require('node-simple-router');

var router = Router(); // may also be router = new Router();


router.get("/hello", function(request, response) {response.end("Hello, World!");});

router.get('/api/:query', function(req, res) {

	var query = req.params.query;
	var query = query.toLowerCase();

	var exec = require('child_process').exec;

	console.log("Beggining Exec");


	var commandLine = "./src/SliferSearch.py " + query + " | ./src/textURL.py | node src/spotlight.js | ./src/SliferSPARQL.py | ./src/jaccardV2.py --seuil"; 
	var child = exec( commandLine , function(error, stdout, stderr) {
		if(!error)
		{
			console.log("Ending Exec");
			console.log(stdout);
			res.end( JSON.stringify( stdout ));	
		}else
		{
			console.log("Error");
			console.log(stderr);
			res.end("ERROR");
		}

	});
	

});

var server = http.createServer(router);
server.listen(1234);
console.log('Server running at localhost:1234/');