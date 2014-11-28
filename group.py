#!/usr/bin/env python
"""
Draw a graph with matplotlib.
You must have matplotlib for this to work.
"""
import matplotlib.pyplot as plt
import networkx as nx
import sys 
import ast

matrix = sys.stdin.read()  
matrix = ast.literal_eval(matrix)


G=nx.Graph()

for i in range(0,len(matrix)):
	G.add_node(i)

for i in range(0,len(matrix)): 
		for j in range(i+1,len(matrix)):
			G.add_edge(i,j,weight=matrix[i][j])


elarge=[(u,v) for (u,v,d) in G.edges(data=True) if d['weight'] > 0.1]
#esmall=[(u,v) for (u,v,d) in G.edges(data=True) if d['weight'] > 0.02]
print elarge

final = []
for noeud in G.nodes():
	group = []
	alreadyInGroup = False 
	#check if the node is alreay in a group
	#then add it to this group not in a another one

	for groupB in final : 
		if noeud in groupB: 
			for (u,v) in elarge:
				if noeud == u:
					groupB.append(v)
				if noeud == v : 
					groupB.append(u)
			alreadyInGroup = True
			break


	if alreadyInGroup == False : 
		group.append(noeud)
		for (u,v) in elarge:
			if noeud == u:
				group.append(v)
			if noeud == v : 
				group.append(u)
		final.append(group)

for i,group in enumerate(final): 
	final[i] = list(set(final[i]))


print final

pos=nx.spring_layout(G) # positions for all nodes

# nodes
nx.draw_networkx_nodes(G,pos,node_size=700)

# edges
nx.draw_networkx_edges(G,pos,edgelist=elarge, width=6)
#nx.draw_networkx_edges(G,pos,edgelist=esmall, width=6,alpha=0.5,edge_color='b',style='dashed')

# labels
nx.draw_networkx_labels(G,pos,font_size=20,font_family='sans-serif')

plt.axis('off')
plt.savefig("IHM/images/weighted_graph.png") # save as png
#plt.show() # display
