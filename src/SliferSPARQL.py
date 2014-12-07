#!/usr/bin/python
import re
import json
import sys
import ast
import urllib2
import urllib
import unicodedata
import re 

def clean(data) : 
	data =  data.replace("\U","")
	data = data.replace("\u", "")
	return data


def filterData(data):
	if "wikiPage" in data : 
		return True

	return False

def enrichissement(output):
	seuil = 50
	if len(output) > 50 :
		return False

	req = []


	for elem in output : 
		url = elem['url']
		results = elem['results']

		resources = []
		for triplet in results : 
			resources.append(triplet['o'])

		finalParsed = {
			"url" : url,
			"resources" : resources
		}
		req.append(finalParsed) 


def parseData(data):
	res = json.loads(data)
	output = []

	for elt in res["results"]["bindings"]:
		if elt["o"]["type"] != 'uri' : 
			continue

		if filterData(elt["p"]["value"]):
			continue

		myelem = {
			"s" : elt["s"]["value"],
			"p" : elt["p"]["value"],
			"o" : elt["o"]["value"]
			}

		output.append(myelem)

	return output


def lancerRequete(jsonArg) :
	final = []
	for item in jsonArg: 
		url = item['url'];
		resources = item['resources']
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
			"desc" : item["desc"],
            "title" : item["title"],
			"results" : parsed
		}
		final.append( finalParsed )

	return final 
if __name__ == '__main__':
	jsonArg = sys.stdin.read()  
	jsonArg = ast.literal_eval(jsonArg)


	final = lancerRequete(jsonArg)
	

	enrichi = enrichissement(final)


	if enrichi : 
		enrichi = lancerRequete(enrichi)
		final = final + enrichi 

	json.dump(final, sys.stdout, sort_keys = False, indent = 4)




