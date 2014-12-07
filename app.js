var http = require('http');
var Router = require('node-simple-router');

var router = Router(); // may also be router = new Router();


router.get("/hello", function(request, response) {response.end("Hello, World!");});

router.get('/api/:query', function(req, res) {

	var query = req.params.query;
	var query = query.toLowerCase();

	var exec = require('child_process').exec;

	console.log("Beggining Exec");



	var child = exec("./SliferSearch.py " + query + " | ./textURL.py | node spotlight.js | ./SliferSPARQL.py | ./jaccardV2.py --seuil", function(error, stdout, stderr) {
		console.log("Ending Exec");
		console.log(stdout);
		res.end( JSON.stringify( stdout ));
	});
	

});


function findDescription(jsonGoogle, url)
{
	for(var i=0; i<jsonGoogle.length; i++)
	{
		if(jsonGoogle[i].url == url)
		{
			return { desc : jsonGoogle[i].desc,
					title : jsonGoogle[i].title
				}
		}
	}

	return "";
}


var server = http.createServer(router);
server.listen(1234);
console.log('Server running at localhost:1234/');