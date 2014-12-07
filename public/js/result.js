function testloading()
{
      setTimeout(function(){resultLoading()}, 100000000);
}

function sendRequest()
{
	console.log("YO");
	$.ajax({
	  url: "http://localhost:1234/api/"+getQueryVariable("searchTerm"),
	  success: function(res) {
		  resultLoading(res);
	  },
	  timeout: 100000000
	});
}

function resultLoading(data)
{
	data = JSON.parse(data);
	data = JSON.parse(data);
	
    var data_DS = data.dragon;
    var table = document.getElementById("DS");
	table.innerHTML = "";
	data_DS.forEach(function(datum,i)
	{
		var container = document.createElement("div");
		container.className="panel panel-default";

		var header = document.createElement("div");
		var link = document.createElement("a");
		link.href = datum.url;
		link.innerHTML = datum.title;
		header.className="panel-heading";
		header.appendChild(link);
		
		var element_desc = document.createElement("div");
		element_desc.innerHTML = datum.desc;
		element_desc.className="panel-body";
		
		container.appendChild(header);
		container.appendChild(element_desc);
		
		table.appendChild(container);
	});
	
	var data_GS = data.google;
	var table = document.getElementById("GS");
	  table.innerHTML = "";
	  data_GS.forEach(function(datum,i)
	  {
			var container = document.createElement("div");
			container.className="panel panel-default";
	
			var header = document.createElement("div");
			var link = document.createElement("a");
			link.href = datum.url;
			link.innerHTML = datum.title;
			header.className="panel-heading";
			header.appendChild(link);
	
			var element_desc = document.createElement("div");
			element_desc.innerHTML = datum.desc;
			element_desc.className="panel-body";
	
			container.appendChild(header);
			container.appendChild(element_desc);
	
			table.appendChild(container);
	  }); 

	  var jaccardHeader = data.jaccardHeader;
	  var jaccard = data.jaccard; 
	  main(jaccardHeader,jaccard);
		// Supprimer le loader
		document.getElementById("containerloader").parentNode.removeChild(document.getElementById("containerloader"));
}

function loadJSON(filePath) {
  // Load json file;
  var json = loadTextFileAjaxSync(filePath, "application/json");
  // Parse json
  return JSON.parse(json);
}   

// Load text with Ajax synchronously: takes path to file and optional MIME type
function loadTextFileAjaxSync(filePath, mimeType)
{
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET",filePath,false);
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }
  xmlhttp.send();
  if (xmlhttp.responseText != null)
  {
    return xmlhttp.responseText;
  }
  else {
    // TODO Throw exception
    return null;
  }
}

function getQueryVariable(variable)
{
	   var query = window.location.search.substring(1);
	   var vars = query.split("&");
	   for (var i=0;i<vars.length;i++) {
			   var pair = vars[i].split("=");
			   if(pair[0] == variable){return pair[1];}
	   }
	   return(false);
}



//-- relative au graph
	function main (headers, jaccard) {
            var graph = Viva.Graph.graph();
            
            for(var i=0; i<jaccard.length; i++)
            {
            	for(var j=(i+1) ; j<jaccard[i].length ; j++)
            	{
            		if(jaccard[i][j] > 0.08)
            		{
            			graph.addLink(headers[i], headers[j], {weight: jaccard[i][j]*50});	
            		}
            	}
            }
          
            
            generateGraph(graph);
        
        }



        function generateGraph(graph)
        {
            var graphics = Viva.Graph.View.svgGraphics();
            var nodeSize = 10;
            graphics.node(function(node) {
              // This time it's a group of elements: http://www.w3.org/TR/SVG/struct.html#Groups
              var ui = Viva.Graph.svg('g'),
                  // Create SVG text element with user id as content
                  svgText = Viva.Graph.svg('text').attr('y', '-4px').text(node.id),
                  img = Viva.Graph.svg('rect')
                     .attr('width', nodeSize)
                     .attr('height', nodeSize);
              ui.append(svgText);
              ui.append(img);
              return ui;
            }).placeNode(function(nodeUI, pos) {
                // 'g' element doesn't have convenient (x,y) attributes, instead
                // we have to deal with transforms: http://www.w3.org/TR/SVG/coords.html#SVGGlobalTransformAttribute
                nodeUI.attr('transform',
                            'translate(' +
                                  (pos.x - nodeSize/2) + ',' + (pos.y - nodeSize/2) +
                            ')');
            });



            graphics.link(function(link){
                return Viva.Graph.svg('path')
                           .attr('stroke', 'black')
                           .attr('stroke-width', link.weight);
            }).placeLink(function(linkUI, fromPos, toPos) {
                // linkUI - is the object returend from link() callback above.
                var data = 'M' + fromPos.x + ',' + fromPos.y +
                           'L' + toPos.x + ',' + toPos.y;
                // 'Path data' (http://www.w3.org/TR/SVG/paths.html#DAttribute )
                // is a common way of rendering paths in SVG:
                linkUI.attr("d", data);
            });


            // Render the graph
           // Render the graph
            var renderer = Viva.Graph.View.renderer(graph, {
                    graphics : graphics,
                    container  : document.getElementById('graphDiv')
                });
            renderer.run();
        }
