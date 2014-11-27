function testloading()
{
      setTimeout(function(){resultLoading()}, 3000);
}

function sendRequest()
{
	$.ajax({
	  url: "http://localhost:1234/"+getQueryVariable("searchTerm"),
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
		header.className="panel-heading";
		header.innerHTML = datum.url;
		
		var element_desc = document.createElement("div");
		element_desc.innerHTML = datum.desc;
		element_desc.class="panel-body";
		
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
			header.className="panel-heading";
			header.innerHTML = datum.url;
	
			var element_desc = document.createElement("div");
			element_desc.innerHTML = datum.desc;
			element_desc.class="panel-body";
	
			container.appendChild(header);
			container.appendChild(element_desc);
	
			table.appendChild(container);
	  });
	
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