var request = require("superagent");

request
   .get('https://www.googleapis.com/customsearch/v1')
   .query({
		key : 'AIzaSyCftZVPGOGCUitzwR9LyalIDSw2JFbJeGU',
		cx : '015219983740983411771:d8srlihskhy',
		q : process.argv[2],
		num : "5"
   })
   .end(function(res){
     if (res.ok) {
        tab = [];
		    res.body.items.forEach(function(item,i){
		     tab.push(item.link);
		    })
        console.log(tab);
     }
   });