import numpy as np
import time

class Nodes():
  def __init__(self,state,parent,action,depth,step_cost,path_cost,heuristic_cost):
    self.state = state 
    self.parent = parent # Parent Node
    self.action = action # Move up, Move left, Move down, Move right
    self.depth = depth # The depth of the node in the tree
    self.step_cost = step_cost # g(n) - It is the cost to take the step.
    self.path_cost = path_cost # accumulated g(n) - It is the cost to reach the current node.
    self.heuristic_cost = heuristic_cost # h(n), It is the cost to reach the goal state from the current node.
    
    # Children node
    self.move_up = None 
    self.move_left = None
    self.move_down = None
    self.move_right = None
    
    # Check if moving down is valid or not.
  def try_move_down(self):
    # Index of the empty tile
    zero_index=[i[0] for i in np.where(self.state==0)] 
    if zero_index[0] == 0:
      return False
    else:
      up_value = self.state[zero_index[0]-1,zero_index[1]] # The upper tile's value
      new_state = self.state.copy()
      new_state[zero_index[0],zero_index[1]] = up_value
      new_state[zero_index[0]-1,zero_index[1]] = 0
      return new_state,up_value
        
    # Check if moving right is valid or not.
  def try_move_right(self):
    zero_index=[i[0] for i in np.where(self.state==0)] 
    if zero_index[1] == 0:
      return False
    else:
      left_value = self.state[zero_index[0],zero_index[1]-1] # The left tile's value
      new_state = self.state.copy()
      new_state[zero_index[0],zero_index[1]] = left_value
      new_state[zero_index[0],zero_index[1]-1] = 0
      return new_state,left_value
        
    # Check if moving up is valid or not.
  def try_move_up(self):
    zero_index=[i[0] for i in np.where(self.state==0)] 
    if zero_index[0] == 2:
      return False
    else:
      lower_value = self.state[zero_index[0]+1,zero_index[1]] # The lower tile's value
      new_state = self.state.copy()
      new_state[zero_index[0],zero_index[1]] = lower_value
      new_state[zero_index[0]+1,zero_index[1]] = 0
      return new_state,lower_value
      
  # Check if moving left is valid or not.
  def try_move_left(self):
    zero_index=[i[0] for i in np.where(self.state==0)] 
    if zero_index[1] == 2:
      return False
    else:
      right_value = self.state[zero_index[0],zero_index[1]+1] # The right tile's value
      new_state = self.state.copy()
      new_state[zero_index[0],zero_index[1]] = right_value
      new_state[zero_index[0],zero_index[1]+1] = 0
      return new_state,right_value
  
  # This part is to return user specified heuristic cost.
  def get_h_cost(self,new_state,goal_state,heuristic_function,path_cost,depth):
    if heuristic_function == 'num_misplaced':
      return self.h_misplaced_cost(new_state,goal_state)
    elif heuristic_function == 'manhattan':
      return self.h_manhattan_cost(new_state,goal_state)
    # Setting the step cost as the value of the tile being moved made this game unfair. 
    # I made all the step cost as 1 so that the game will be fair.
    # I made it a best-first-search with manhattan heuristic function.
    elif heuristic_function == 'fair_manhattan':
      return self.h_manhattan_cost(new_state,goal_state) - path_cost + depth

  # This part is to return heuristic cost: number of misplaced tiles.
  def h_misplaced_cost(self,new_state,goal_state):
    cost = np.sum(new_state != goal_state)-1 # minus 1 so that the empty tile will be excluded
    if cost > 0:
      return cost
    else:
      return 0 # If all the tiles matches.
  
  # This part is to return heuristic cost: sum of Manhattan distance to reach the goal state.
  def h_manhattan_cost(self,new_state,goal_state):
    current = new_state
    # The digit and coordinates they are supposed to be.
    goal_position_dic = {0:(0,0),1:(0,1),2:(0,2),3:(1,0),4:(1,1),5:(1,2),6:(2,0),7:(2,1),8:(2,2)} 
    sum_manhattan = 0
    for i in range(3):
      for j in range(3):
        if current[i,j] != 0:
          sum_manhattan += sum(abs(a-b) for a,b in zip((i,j), goal_position_dic[current[i,j]]))
    return sum_manhattan
      
  # Once the goal node is found, trace back to the root node and print out the path
  def print_path(self):
    action_list = []
      # Create FILO stacks to place the trace.
    state_trace = [self.state]
    action_trace = [self.action]
    depth_trace = [self.depth]
    step_cost_trace = [self.step_cost]
    path_cost_trace = [self.path_cost]
    heuristic_cost_trace = [self.heuristic_cost]
    
    # Add the node information as tracing back up the tree.
    while self.parent:
      self = self.parent

      state_trace.append(self.state)
      action_trace.append(self.action)
      depth_trace.append(self.depth)
      step_cost_trace.append(self.step_cost)
      path_cost_trace.append(self.path_cost)
      heuristic_cost_trace.append(self.heuristic_cost)

    # Print out the path.
    step_counter = 0
    while state_trace:
      print ('step',step_counter)
      print (state_trace.pop())
      x = action_trace.pop()
      print ('action=',x,', depth=',str(depth_trace.pop()),\
      ', step cost=',str(step_cost_trace.pop()),', total_cost=',\
      str(path_cost_trace.pop() + heuristic_cost_trace.pop()),'\n')
      
      step_counter += 1
      action_list.append(x)
    return action_list

  # The search based on path cost + heuristic cost
  def a_star_search(self,goal_state,heuristic_function):
    start = time.time()
    action_list = []
    queue = [(self,0)] # The queue of (found but unvisited nodes, path cost+heuristic cost), ordered by the second element
    queue_num_nodes_popped = 0 # The number of nodes popped off the queue, measuring time performance
    queue_max_length = 1 # The max number of nodes in the queue, measuring space performance
    
    depth_queue = [(0,0)] # The queue of node depth, (depth, path_cost+heuristic cost)
    path_cost_queue = [(0,0)] # The queue for path cost, (path_cost, path_cost+heuristic cost)
    visited = set([]) # The function for recording visited states
    
    while queue:
      # The sort queue based on path_cost+heuristic cost, in ascending order.
      queue = sorted(queue, key=lambda x: x[1])
      depth_queue = sorted(depth_queue, key=lambda x: x[1])
      path_cost_queue = sorted(path_cost_queue, key=lambda x: x[1])
      
      # The function for updating the maximum length of the queue.
      if len(queue) > queue_max_length:
        queue_max_length = len(queue)
          
      current_node = queue.pop(0)[0] # Select and remove the first node in the queue.
     
      queue_num_nodes_popped += 1 
      current_depth = depth_queue.pop(0)[0] # Select and remove the depth for current node.
      current_path_cost = path_cost_queue.pop(0)[0] # # Select and remove the path cost for reaching the current node.
      visited.add(tuple(current_node.state.reshape(1,9)[0])) # Avoid the repeated state, that is represented as a tuple.
      
      # Trace back to the root node and print out the path if the goal state is found.
      if np.array_equal(current_node.state,goal_state):
        x = current_node.print_path()
        
        print ('Time performance:',str(queue_num_nodes_popped),'the nodes popped off the queue.')
        print ('Space performance:', str(queue_max_length),'the nodes in the queue at maximum.')
        print ('Time spent: %0.2fs' % (time.time()-start))
        return x
    
      else:     
        # Check if moving upper tile down is a valid move or not.
        if current_node.try_move_down():
          new_state,up_value = current_node.try_move_down()
          action_list.append('down')
          # Check if the resulting node is already visited or not yet.
          if tuple(new_state.reshape(1,9)[0]) not in visited:
            path_cost=current_path_cost+up_value
            depth = current_depth+1
            # Get the heuristic cost.
            h_cost = self.get_h_cost(new_state,goal_state,heuristic_function,path_cost,depth)
            # create a new child node.
            total_cost = path_cost+h_cost
            current_node.move_down = Nodes(state=new_state,parent=current_node,action='down',depth=depth,\
                                  step_cost=up_value,path_cost=path_cost,heuristic_cost=h_cost)
            queue.append((current_node.move_down, total_cost))
            depth_queue.append((depth, total_cost))
            path_cost_queue.append((path_cost, total_cost))
            action_list.append('down')
        
        # Check if moving left tile to the right is a valid move or not.
        if current_node.try_move_right():
          new_state,left_value = current_node.try_move_right()
          action_list.append('right')
          # Check if the resulting node is already visited or not yet.
          if tuple(new_state.reshape(1,9)[0]) not in visited:
            path_cost=current_path_cost+left_value
            depth = current_depth+1
            # Get the heuristic cost.
            h_cost = self.get_h_cost(new_state,goal_state,heuristic_function,path_cost,depth)
            # Create a new child node.
            total_cost = path_cost+h_cost
            current_node.move_right = Nodes(state=new_state,parent=current_node,action='right',depth=depth,\
                                  step_cost=left_value,path_cost=path_cost,heuristic_cost=h_cost)
            queue.append((current_node.move_right, total_cost))
            depth_queue.append((depth, total_cost))
            path_cost_queue.append((path_cost, total_cost))
            action_list.append('right')

        
        # Check if moving lower tile up is a valid move or not.
        if current_node.try_move_up():
          new_state,lower_value = current_node.try_move_up()
          action_list.append('up')
          # Check if the resulting node is already visited or not yet.
          if tuple(new_state.reshape(1,9)[0]) not in visited:
            path_cost=current_path_cost+lower_value
            depth = current_depth+1
            # Get the heuristic cost.
            h_cost = self.get_h_cost(new_state,goal_state,heuristic_function,path_cost,depth)
            # Create a new child node.
            total_cost = path_cost+h_cost
            current_node.move_up = Nodes(state=new_state,parent=current_node,action='up',depth=depth,\
                                  step_cost=lower_value,path_cost=path_cost,heuristic_cost=h_cost)
            queue.append((current_node.move_up, total_cost))
            depth_queue.append((depth, total_cost))
            path_cost_queue.append((path_cost, total_cost))
            action_list.append('up')


        # Check if moving right tile to the left is a valid move or not.
        if current_node.try_move_left():
          new_state,right_value = current_node.try_move_left()
          action_list.append('left')
          # Check if the resulting node is already visited or not yet.
          if tuple(new_state.reshape(1,9)[0]) not in visited:
            path_cost=current_path_cost+right_value
            depth = current_depth+1
            # Get the heuristic cost.
            h_cost = self.get_h_cost(new_state,goal_state,heuristic_function,path_cost,depth)
            # Create a new child node.
            total_cost = path_cost+h_cost
            current_node.move_left = Nodes(state=new_state,parent=current_node,action='left',depth=depth,\
                                  step_cost=right_value,path_cost=path_cost,heuristic_cost=h_cost)
            queue.append((current_node.move_left, total_cost))
            depth_queue.append((depth, total_cost))
            path_cost_queue.append((path_cost, total_cost))
            action_list.append('left')
    return action_list      

def astar_solver(data):
  test = np.array(data).reshape(3,3)
  initial_state = test
  goal_state = np.array([0,1,2,3,4,5,6,7,8]).reshape(3,3)
  print (initial_state,'\n')
  print (goal_state)

  root_node = Nodes(state=initial_state,parent=None,action=None,depth=0,step_cost=1,path_cost=0,heuristic_cost=0)

  # A*1 search is based on path cost+heuristic cost using the priority queue.
  x = root_node.a_star_search(goal_state, heuristic_function = 'num_misplaced')

  return x[1:]