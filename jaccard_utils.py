#!/usr/bin/python
import os
import string
import random
#----------------------N3Files-------------------#
def createN3File(jsonArray):
	N3File = ""

	for triplet in jsonArray: 
		string = ""
		for attribute, value in triplet.iteritems():
			string +=  value + " "

		N3File += string + "\n"


	return N3File

def saveN3File(N3File, path, name): 
	name = path + name
	name = name + ".n3"
	file = open(name, "w")
	file.write(N3File)
	file.close()


def saveN3Files(jsonArg, path):
	for i,result  in enumerate(jsonArg) :
		urlName = str(i) 
		saveN3File(createN3File(result["results"]), path, urlName)


def createFolder():
	path = "n3Files/" + ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(30)) + "/"
	os.makedirs(path)
	return path