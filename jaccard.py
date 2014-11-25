#!/usr/bin/python
import re
import json
import sys
import urllib2
import random



def createN3File(jsonArray):

	N3File = ""

	for triplet in jsonArray: 
		string = ""
		for attribute, value in triplet.iteritems():
			string +=  value + " "

		N3File += string + "\n"


	return N3File

def saveN3File(N3File, name): 

	name = "n3Files/" + name
	name = name + ".n3"
	file = open(name, "w")
	file.write(N3File)
	file.close()

def compareFiles(iFile,iFile2):

	compteur = 0 
	num_lines = sum(1 for line in open(iFile))
	num_lines2 = sum(1 for line in open(iFile2))

	input_file = open(iFile,'r')
	for i, line in enumerate(input_file):
		input_file2 =  open(iFile2, 'r') 
		for j, line2 in enumerate(input_file2): 

			print "comparing ", line[:-1], "and : ", line2[:-1]
			if line == line2 :
				print "comparing ", line[:-1], "and : ", line2[:-1], "are same"
				compteur += 1
		input_file2.close()

	union = num_lines + num_lines2 - compteur

	print "Conrdance" , compteur, "/", union
	concordance =  float(compteur)/float(union)
	print concordance
	return concordance

def printMatrix(a):
	for i in range(len(a)):
		line = " "
		for j in a[i]:
			line = line +  str(j) + " "

		print line

if __name__ == '__main__':

	jsonArray = [
	{
		"s": "okS",
		"p" : "okP",
		"o" : "okO"
	},
	{
		"s": "okS1",
		"p" : "okP1",
		"o" : "okO1"
	}
	]


	nbFiles = 5 

	matriceJaccard=[["0" for i in range(nbFiles)] for j in range(nbFiles)]

	for i in range(0,nbFiles): 
		for j in range(i+1,nbFiles):
			concordance = random.randint(0,300)
			matriceJaccard[i][j] = concordance
			matriceJaccard[j][i] = concordance

	#printMatrix(matriceJaccard)


	compareFiles("jackard1.n3", "jackard2.n3")
	#saveN3File(createN3File(jsonArray), "test2039")
	