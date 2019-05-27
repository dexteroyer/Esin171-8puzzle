from api import server
from flask import render_template, jsonify
from api.controller import *
import numpy as np  # for storing the digits in an array
from api.astar import 

@server.route('/', methods=['GET', 'POST'])
def index():
	return render_template('index.html')

@server.route('/solve/<string:lists>', methods=['GET', 'POST'])
def solve(lists):
	# Final Running of the Code
	lists = lists.split(",")
	print(lists)
	# Uncomment the line below this line to run it for a fixed data input and comment the line below it.
	# k = np.array([[1, 2, 5], [3, 4, 8], [6, 0, 7]])
	initial_state = np.zeros(9)
	for i, x in enumerate(lists):
		initial_state[i] = np.array(x)
	k = np.reshape(initial_state, (3, 3))



	check_correct_input(k)
	check_solvable(k)

	root = Node(0, k, None, None, 0)

	# BFS implementation call
	goal, s, v = exploring_nodes(root)

	if goal is None and s is None and v is None:
	    print("The goal state cannot be reached. I'm sorry.")
	else:
	    # Print and write the final output.
	    # print_states(path(goal))
	    z = print_states(path(goal))
	    print(z)
	return jsonify({'message':z})

@server.route('/solve/astar/<string:lists>', methods=['GET', 'POST'])
def solve_astar(lists):
	lists = lists.split(",")
	lists = [ int(x) for x in lists ]
	print(lists)
	z = astar_solver(lists)
	return jsonify({'message':z})