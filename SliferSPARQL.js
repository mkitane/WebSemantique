var request = require("superagent");
process.stdin.setEncoding('utf8');
process.stdin.on('readable',function() {
	
	var buffer = process.stdin.read();
	var URLIs = JSON.parse(buffer);
	var query = 'SELECT * WHERE { ?s ?p ?o. FILTER(?s in (';
	buffer.forEach(function(tab){
		tab.ressources.forEach(function(uri){
			query = query + '<' + uri + '>,';
		}
	});
	query = query.slice(0,-1);
	query = query + ')) }';
	request
		.get('http://dbpedia.org/sparql'),
		.query({
			query : query,
			default-graph-uri : 'http://dbpedia.org',
			format : 'JSON',
			timeout : '30000',
		}),
		.end(
			function(res){
					console.log(res.body);
						}
		);
	});