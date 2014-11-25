#!/usr/bin/python
import re
import json
import sys
import urllib2
import random
import ast
import os
import fnmatch

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

			#print "comparing ", line[:-1], "and : ", line2[:-1]
			if line == line2 :
				#print "comparing ", line[:-1], "and : ", line2[:-1], "are same"
				compteur += 1
		input_file2.close()

	union = num_lines + num_lines2 - compteur

	#print "Conrdance" , compteur, "/", union
	concordance =  float(compteur)/float(union)
	#print concordance
	return concordance

def printMatrix(a):
	matrix = ""

	for i in range(len(a)):
		line = ""
		for j in a[i]:
			line = line +  str(j) + ";"

		matrix =  matrix + line + "\n"
	return matrix[:-1]

if __name__ == '__main__':
	jsonArg = sys.stdin.read()  
	jsonArg = ast.literal_eval(jsonArg)

	for i,result  in enumerate(jsonArg) :
		urlName = str(i) 
		saveN3File(createN3File(result["results"]), urlName)


	n3Files = fnmatch.filter(os.listdir("n3Files"),"*.n3")
	nbFiles = len(n3Files)

	matriceJaccard=[["0" for i in range(nbFiles)] for j in range(nbFiles)]

	for i in range(0,nbFiles): 
		for j in range(i+1,nbFiles):
			firstFile = "n3Files/" + n3Files[i]
			secondFile = "n3Files/" + n3Files[j]
			concordance = compareFiles(firstFile, secondFile)
			matriceJaccard[i][j] = concordance
			matriceJaccard[j][i] = concordance

	print printMatrix(matriceJaccard)


	
	