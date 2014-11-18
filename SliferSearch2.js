var request = require("superagent");

request
   .get('https://www.googleapis.com/customsearch/v1')
   .query({
		key : '',
		cx : ' ',
		q : process.argv[2],
   })
   .end(function(res){
     if (res.ok) {
       console.log;
     } else {
       alert('Oh no! error ' + res.text);
     }
   });