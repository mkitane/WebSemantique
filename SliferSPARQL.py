#!/usr/bin/python
import re
import json
import sys
import ast
import urllib2
import urllib
import unicodedata
import re 

final = []
def clean(data) : 
	data =  data.replace("\U","")
	return data

def parseData(data):
	res = json.loads(data)
	output = []

	for elt in res["results"]["bindings"]:
		if elt["o"]["type"] != 'uri' : 
			continue
		myelem = {
			"s" : elt["s"]["value"],
			"p" : elt["p"]["value"],
			"o" : elt["o"]["value"]
			}

		output.append(myelem)

	return output

if __name__ == '__main__':
	final = []


	jsonArg = sys.stdin.read()  
	
	jsonArg = ast.literal_eval(jsonArg)


	for URI in jsonArg: 
		url = URI['url'];
		resources = URI['resources']
		#print url
		#print resources

		d = 'SELECT * WHERE { ?s ?p ?o. FILTER(?s in ('
		for resource in resources : 
			d = d + '<' + resource + '>,'
		d = d[:-1]
		d = d + ')) }'

		values = {
			"default-graph-uri" : "http://dbpedia.org",
			"format" : "json",
			"timeout" : "30000", 
			"query" : d
		}
		header = { "Accept" : "*" }

		urlReq = "http://dbpedia.org/sparql"
		data = urllib.urlencode(values)
		req = urllib2.Request(urlReq,data,header)
		response = urllib2.urlopen(req)
		html = response.read()

		html =  clean(html)
		parsed = parseData(html)
		finalParsed = {
			"url" : url,
			"results" : parsed
		}
		final.append( finalParsed )

	json.dump(final, sys.stdout, sort_keys = False, indent = 4)




