var http = require('http');
var Router = require('node-simple-router');

var router = Router(); // may also be router = new Router();


router.get("/hello", function(request, response) {response.end("Hello, World!");});

router.get('/api/:query', function(req, res) {

	var query = req.params.query;


	var exec = require('child_process').exec;

	console.log("Beggining Exec");

	var child = exec("node SliferSearch2.js " + query, function(error, stdout, stderr) {


		var child2 = exec("./SliferSearch.py " + query + " | ./textURL.py | node spotlight.js | ./SliferSPARQL.py | ./jaccard.py --seuil", function(error2, stdout2, stderr2) {
    		console.log("Ending Exec");

			console.log(stdout);
			console.log('------------------');
    		console.log(stdout2);

    		console.log("--------");

    		console.log(formatData(stdout, stdout2 ));
    		res.end( JSON.stringify( formatData(stdout, stdout2 )));
		});
	});
	

});


function formatData(stdout, stdout2)
{
	var finalARenvoyer = {
		"google" : [],
		"dragon" : []
	};
	var jsonGoogle = JSON.parse(stdout);
   	var jsonStdout2 = JSON.parse(stdout2);


   	var jsonDragon = [];
   	for(var i=0;i<jsonStdout2.length; i++)
   	{
   		var urlelem = jsonStdout2[i];
   		var descTitle = findDescription(jsonGoogle,urlelem);

   		var elem = { url : urlelem, 
   					 desc : descTitle.desc,
   					 title : descTitle.title 
   					};
   		jsonDragon.push(elem);
   	}

   	finalARenvoyer.google = jsonGoogle;
	finalARenvoyer.dragon = jsonDragon;

	return finalARenvoyer;
}

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