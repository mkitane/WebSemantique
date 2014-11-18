var request = require("superagent");

request
   .get('https://www.googleapis.com/customsearch/v1')
   .query({
		key : 'AIzaSyCftZVPGOGCUitzwR9LyalIDSw2JFbJeGU',
		cx : '015219983740983411771:d8srlihskhy',
		q : process.argv[2]
   })
   .end(function(res){
     if (res.ok) {
       console.log(res);
     }
   });