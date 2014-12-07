#!/usr/bin/python
import re
import json
import sys
import ast
import urllib2


def get_text_from_alchemyApi(url): 
	baseURL = "http://access.alchemyapi.com/"
	endpoint = "calls/url/URLGetText"

	options = {
		"apikey" : "9b976fd04d3f3e3e43dbd7c25b89913f53d39606",
		"url" : url,
		"outputMode" : "json"
	}
	

	urlRequest = baseURL + endpoint + "?"
	for key in options : 
		urlRequest = urlRequest + key + "=" + options[key] + "&"

	urlRequest = urlRequest[:-1]

	response = urllib2.urlopen( urlRequest )
	html = response.read()

	json_result = json.loads(html)
	return json_result['text']
	


if __name__ == '__main__':
	jsonArg = sys.stdin.read()  
	
	jsonArg = ast.literal_eval(jsonArg)
	tab = []

	for item in jsonArg : 
		url = item["url"]
		item["text"] = get_text_from_alchemyApi(url)
		tab.append(item)

	json.dump(tab, sys.stdout, sort_keys = False, indent = 4)
