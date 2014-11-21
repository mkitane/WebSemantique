var request = require("superagent"),
	stdin = require('stdin');


stdin(function(chunk){
  analyzeData(chunk);
});

function analyzeData(chunk)
{
	var URLIs = JSON.parse(chunk);
	
	URLIs.forEach(function(tab)
	{
		var query = 'SELECT * WHERE { ?s ?p ?o. FILTER(?s in (';
		
		tab.resources.forEach(function(uri){
			query = query + '<' + uri + '>,';
		});
		
		query = query.slice(0,-1);
		query = query + ')) }';
		
		request
			.post('http://dbpedia.org/sparql')
			.send('default-graph-uri='+encodeURI('http://dbpedia.org'))
			.send('query='+encodeURI(query))
			.send('format=json')
			.send('timeout=30000')
			.buffer(true)
			.set('Accept', '*')
			.end(function(res){
				console.log("1");
			});

	});
}