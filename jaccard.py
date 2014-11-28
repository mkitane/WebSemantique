#!/usr/bin/python
import re
import json
import sys
import urllib2
import random
import ast
import os
import fnmatch
import string


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
	matrix = []

	for i in range(len(a)):
		line = ""
		for j in a[i]:
			line = line +  str(j) + ";"

		matrix.append(line[:-1])
	return matrix




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

if __name__ == '__main__':
	jsonArg = sys.stdin.read()  
	jsonArg = ast.literal_eval(jsonArg)


	path = createFolder()
	saveN3Files(jsonArg, path)


	n3Files = [path + n3file for n3file in fnmatch.filter(os.listdir( path ),"*.n3")]
	nbFiles = len(n3Files)

	matriceJaccard=[["1" for i in range(nbFiles)] for j in range(nbFiles)]
	for i in range(0,nbFiles): 
		for j in range(i+1,nbFiles):
			firstFile = n3Files[i]
			secondFile = n3Files[j]
			concordance = compareFiles(firstFile, secondFile)
			matriceJaccard[i][j] = concordance
			matriceJaccard[j][i] = concordance

	#print matriceJaccard

	if (sys.argv[1] == "--csv") : 
		#Output handling
		#     ; url1 ; url2 
		#url1 ;  0   ;  X
		#url2 ;  X   ;  0 

		matrixHeader = ";"
		for i,result  in enumerate(jsonArg) :
			matrixHeader = matrixHeader + result["url"] + ";"
		matrixHeader = matrixHeader + "\n"
		
		
		matrix = printMatrix(matriceJaccard)
		for i, n3File in enumerate(n3Files) : 
			matrix[i] = jsonArg[i]["url"] + ";" + matrix[i]
		
		
		print matrixHeader + "\n".join(matrix)
		
		
		
		##Two diferent files
		nodes_header = "Nodes,Id,Label\n"
		nodes_content = ""
		for i,result  in enumerate(jsonArg) :
			nodes_content = nodes_content + result["url"] + "," + str(i) + "," +result["url"] + "\n"
		
		nodes = nodes_header + nodes_content
		file = open("noeuds_graph.csv", "w")
		file.write(nodes)
		file.close()


		links_header = "Source,Target,Type,Id,Label,Weight\n"
		links_content = ""
		
		identifiant = 0
		for i in range(0,nbFiles): 
			for j in range(i+1,nbFiles):
				links_content = links_content + str(i) + "," + str(j) + ",Nondirected," +  str(identifiant) + "," + str(matriceJaccard[i][j]) + "\n"
				identifiant = identifiant + 1 
				
		links = links_header + links_content
		file = open("lien_graph.csv", "w")
		file.write(links)
		file.close()

		
		sys.exit(0)

	if (sys.argv[1] == "--seuil") : 
		seuil = 0.08
		urlAGarder = []
		for i in range(0,nbFiles): 
			for j in range(i+1,nbFiles):
				if matriceJaccard[i][j] > seuil : 
					urlAGarder.append( jsonArg[i]["url"] )
					urlAGarder.append( jsonArg[j]["url"] )
				
		json.dump(list(set(urlAGarder)), sys.stdout, sort_keys = False, indent = 4)
		sys.exit(0)

	
	