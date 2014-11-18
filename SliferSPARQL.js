var request = require("superagent");
process.stdin.setEncoding('utf8');
process.stdin.on('readable',function() {
	
	var buffer = process.stdin.read();
	var URLIs = JSON.parse(buffer);
	
	
	var query_sparql = process.argv[2];

	request
		.get('http://dbpedia.org/sparql'),
		.query({
			query : '',
			default-graph-uri : 'http://dbpedia.org',
			format : 'JSON',
			timeout : '30000',
		}),
		.end(
			function(res){
						
						}
		)

	});
});
