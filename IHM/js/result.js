function testloading()
{
      setTimeout(function(){resultLoading()}, 3000);
}

function resultLoading()
{
      var data_DS = loadJSON('js/data.json');
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
		element_desc.innerHTML = datum.Desc;
		element_desc.class="panel-body";
		
		container.appendChild(header);
		container.appendChild(element_desc);
		
		table.appendChild(container);
	});
	var data_GS =loadJSON('js/data.json');
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
	            element_desc.innerHTML = datum.Desc;
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