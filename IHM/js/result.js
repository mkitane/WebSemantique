data_input=[
{"url" : "www.google.com",
"Desc" : "Blabla"
},
{"url" : "www.google5.com",
"Desc" : "Blabla"
},
{"url" : "www.google6.com",
"Desc" : "Blabla"
}
];

function func()
{
    var table = document.getElementById("DS");
	table.innerHTML = "";
	data_input.forEach(function(datum,i)
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
}