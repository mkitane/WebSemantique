#!/usr/bin/python
import re
import requests
import json
import sys

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

    r = requests.get( urlRequest)

    json_result = json.loads(r.text)
    items = json_result["items"]
    tab = []
		
    for item in items : 
        tab.append(item["link"])

    return tab


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('Usage: '+sys.argv[0]+' <JSON_File>')
    else:
        print get_URL_SSearch(sys.argv[1])

