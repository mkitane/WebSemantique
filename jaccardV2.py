#!/usr/bin/python
import sys
import ast
import jaccard_utils
import json

def jaccard_index(set_a, set_b):
	intersection = 0
	num_lines_a = len(set_a)
	num_lines_b = len(set_b)
	for elem_a in set_a:
		for elem_b in set_b:
			if elem_a == elem_b: 
				intersection += 1
	union = num_lines_a + num_lines_b - intersection
	return float(intersection)/float(union) 

def url_sets(jsonArg):
	url_sets = []
	for result in jsonArg : 
		url_sets.append(result["url"])
	return url_sets

def create_sets(jsonArg): 
	sets = []
	for result  in (jsonArg) :
		set_a = []
		for triplet in result["results"]:
			string = ""
			for attribute, value in triplet.iteritems():
				string +=  value + " "
			set_a.append(string)
		sets.append(set_a)
	return sets

def printMatrix(a):
	matrix = []

	for i in range(len(a)):
		line = ""
		for j in a[i]:
			line = line +  str(j) + ";"

		matrix.append(line[:-1])
	return matrix

if __name__ == '__main__':
	jsonArg = sys.stdin.read()  
	jsonArg = ast.literal_eval(jsonArg)
	#path = jaccard_utils.createFolder()
	#jaccard_utils.saveN3Files(jsonArg, path)

	sets = create_sets(jsonArg)
	url_sets = url_sets(jsonArg)
	len_sets = len(sets)

	url_sets = url_sets
	sets = sets
	len_sets = len(sets)
	#print url_sets

	matriceJaccard=[[1 for i in range(len_sets)] for j in range(len_sets)]
	for i in range(0,len_sets): 
		for j in range(i+1,len_sets):
			concordance = jaccard_index(sets[i], sets[j])
			matriceJaccard[i][j] = concordance
			matriceJaccard[j][i] = concordance
	#print matriceJaccard
	

	if (sys.argv[1] == "--seuil") : 
		seuil = 0.08
		dragon = []
		for i in range(0,len_sets): 
			for j in range(i+1,len_sets):
				if matriceJaccard[i][j] > seuil : 
					objeti = {"url": jsonArg[i]["url"],"title" : jsonArg[i]["title"],"desc" : jsonArg[i]["desc"]}
					objetj = {"url": jsonArg[j]["url"],"title" : jsonArg[j]["title"],"desc" : jsonArg[j]["desc"]}
					if objeti not in dragon:
						dragon.append(objeti)
					if objetj not in dragon:
						dragon.append(objetj)				


		google = []
		for item in jsonArg : 
			google.append(
				{
					"url": item["url"],
					"title": item["title"],
					"desc": item["desc"]
				})


		jsondump = { "google" : google , "dragon" : dragon}
		json.dump(jsondump, sys.stdout, sort_keys = False, indent = 4)
		sys.exit(0)



def cluster(): 
	print "---"
	m = []
	for i in range(0,len_sets): 
		for j in range(i+1,len_sets):
			m.append([i,j])
	print m
	print "----"
	matrice_clusters = list(matriceJaccard)
	for f in range(0,2) : 
		moy_seuil = 0
		compteur = 0 
		for i in range(0,len_sets): 
			for j in range(i+1,len_sets):
				if matrice_clusters[i][j] != 0 : 
					moy_seuil += matrice_clusters[i][j]
					compteur += 1

		moy_seuil = float(moy_seuil) / float(compteur)
		print moy_seuil

		matrice_clusters = list(matrice_clusters)
		for i in range(0,len_sets): 
			for j in range(i+1,len_sets):
				if matrice_clusters[i][j] < moy_seuil : 
					matrice_clusters[i][j] = 0
					matrice_clusters[j][i] = 0

		print matrice_clusters

	clusters = []
	clustersUrl = []
	for i in range(0,len_sets): 
		for j in range(i+1,len_sets):
			if matrice_clusters[i][j] != 0 :
				clusters.append([i,j])
				clustersUrl.append([url_sets[i], url_sets[j]])
	print clusters
	print clustersUrl


# coordinates = []
# coordinates.append((0,1))

# import math
# a = (0,1)
# hyp = 4.3
# x = math.sqrt( hyp**2 - a[1]**2 )
# b = (x,0)

# coordinates.append(b)



# 	##Convert to coordinates
# import matplotlib.pyplot as plt
# import networkx as nx
# G=nx.Graph()
# G.add_node(1)
# G.add_node(2)
# G.add_node(3)
# G.add_edge(1,2,weight=0.043)
# G.add_edge(1,3,weight=0.094)
# G.add_edge(2,3,weight=0.151)
# nx.clustering(G, weight="weight")

# import numpy
# M = numpy.mat(numpy.zeros((3,3)))
# M[0,0] = 1
# M[1,1] = 1
# M[2,2] = 1
# M[0,1] = 0.043
# M[1,0] = 0.043
# M[0,2] = 0.094
# M[2,0] = 0.094
# M[1,2] = 0.151
# M[2,1] = 0.151
