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
    var table = document.getElementById("table-javascript");

	data_input.forEach(function(datum,i)
	{
		var rowCount = table.rows.length;
		var row = table.insertRow(rowCount);
		
		var cell = row.insertCell(0);
		var element_url = document.createElement("h3");
		element_url.innerHTML = datum.url;
		cell.appendChild(element_url);
		
		var element_desc = document.createElement("p");
		element_desc.innerHTML = datum.Desc;
		cell.appendChild(element_desc);
	});
}