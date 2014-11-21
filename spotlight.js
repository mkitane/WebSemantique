var request = require('superagent'),
    stdin = require('stdin'),
    async = require('async');

stdin(function(chunk){
  analyzeData(chunk);
});

var outputArray = [];

function analyzeData(chunk)
{
  var urlsAndText = JSON.parse(chunk);

  // Array that will contain requests to dbpedia spotlight API for each search result
  var requests = [];

  // Preparing requests functions
  urlsAndText.forEach(function(urlAndText, i)
  {
    var requestFunction = (function(urlAndText) {
        return function(callback)
        {
            var uriObject = {
                url: urlAndText.url,
                resources: []
            };
            if (urlAndText.text != "") {
                request
                .post('http://spotlight.dbpedia.org/rest/annotate')
                .send('confidence=0.2')
                .send('support=20')
                .send('text='+encodeURI(urlAndText.text))
                .set('Accept', 'application/json')
                .end(function(res){
                      if (res.ok) {
                            var resourcesArray = [];
                            res.body.Resources.forEach(function(resource, i) {
                                  resourcesArray.push(resource['@URI']);
                            });
                            uriObject.resources = resourcesArray;
                            callback(null, uriObject);
                      }
                      else {
                            callback(true, null);
                      }
                });

            }
            else {
                callback(null, uriObject);
            }
        }
    })(urlAndText);
  
    requests.push(requestFunction);
  });
  
  // Running requests in parallel
  async.parallel(requests, function(err, uris)
  {
      console.log(uris);
  });
}