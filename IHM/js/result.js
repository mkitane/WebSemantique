function testloading()
{
      setTimeout(function(){resultLoading()}, 3000);
}

function sendRequest()
{
	console.log("YO");
	$.ajax({
	  url: "http://localhost:1234/api/"+getQueryVariable("searchTerm"),
	  success: function(res) {
		  resultLoading(JSON.parse(res));
	  },
	});
}

function resultLoading(data)
{
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
	 var imageHolder = document.getElementById("imageHolder");
	 var jumbo = document.createElement("div");
	 jumbo.className ="jumbotron";
	 var image = document.createElement("img");
	 image.src="images/weighted_graph.png"
	 jumbo.appendChild(image);
	 imageHolder.appendChild(jumbo);
	 
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