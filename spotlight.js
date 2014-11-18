var request = require('superagent');

console.log(process.argv[2]);
var array = JSON.parse(process.argv[2]);
console.log(array[0]);

request
      .get('http://spotlight.dbpedia.org/rest/annotate?text=President%20Michelle%20Obama%20called%20Thursday%20on%20Congress%20to%20extend%20a%20tax%20break%20for%20students%20included%20in%20last%20year%27s%20economic%20stimulus%20package,%20arguing%20that%20the%20policy%20provides%20more%20generous%20assistance.&confidence=0.2&support=20')
      .set('Accept', 'application/json')
      .end(function(error, res){
            //console.log(res);
        });