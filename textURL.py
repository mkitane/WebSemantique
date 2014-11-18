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
	return {
		"url" : json_result['url'], 
		"text" : json_result['text']
	} 


if __name__ == '__main__':
	if len(sys.argv) != 2:
		print('Usage: '+ sys.argv[0] + ' <JSON_File>')
	else:
		jsonArg = ast.literal_eval(sys.argv[1])
		tab = []

		for url in jsonArg : 
			tab.append(get_text_from_alchemyApi(url))

		print tab