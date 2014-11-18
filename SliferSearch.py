#!/usr/bin/python
import re
import json
import sys
import urllib2

def get_URL_SSearch(query): 
    baseURL = "https://www.googleapis.com/customsearch/"
    endpoint = "v1"

    options = {
        "key" : "AIzaSyCftZVPGOGCUitzwR9LyalIDSw2JFbJeGU",
        "q" : query,
        "cx" : "015219983740983411771%3Ad8srlihskhy",
        "num" : "10"
    }
        

    urlRequest = baseURL + endpoint + "?"
    for key in options : 
        urlRequest = urlRequest + key + "=" + options[key] + "&"

    urlRequest = urlRequest[:-1]

    response = urllib2.urlopen( urlRequest )
    html = response.read()

    json_result = json.loads(html)
    items = json_result["items"]
    tab = []
		
    for item in items : 
        tab.append(item["link"])

    return tab


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('Usage: '+sys.argv[0]+' <JSON_File>')
    else:
        tab = get_URL_SSearch(sys.argv[1])
        json.dump(tab, sys.stdout, sort_keys = False, indent = 4)
        sys.exit(0)


