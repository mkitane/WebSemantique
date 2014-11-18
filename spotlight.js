var request = require('superagent');

//var urls = JSON.parse(process.argv[2]);

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null)
  {
    var urls = JSON.parse(chunk);
    
    urls.forEach(function(url, i)
    {
          request
                .get('http://spotlight.dbpedia.org/rest/annotate?confidence=0.2&support=20')
                .query({
                            text: url.text
                })
                .set('Accept', 'application/json')
                .end(function(res){
                      if (res.ok) {
                            res.body.Resources.forEach(function(resource, i) {
                                  console.log(resource['@URI']);
                            });
                      }
                });      
    });
    
  }
});
