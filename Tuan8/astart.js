class Node {
  constructor(x, y, traversable) {
    this.x = x;
    this.y = y;
    this.traversable = traversable;
    this.g = 0; // Cost from start node to current node
    this.h = 0; // Heuristic cost from current node to destination node
    this.f = 0; // Total cost (g + h)
    this.parent = null; // Parent node
  }
}

function astar(start, destination, grid) {
  const openSet = [start];
  const closedSet = [];

  while (openSet.length > 0) {
    // Find the node with the lowest f cost in the open set
    let lowestFIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestFIndex].f) {
        lowestFIndex = i;
      }
    }

    const current = openSet[lowestFIndex];

    // Check if the current node is the destination
    if (current === destination) {
      const path = [];
      let temp = current;
      while (temp !== null) {
        path.push(temp);
        temp = temp.parent;
      }
      return path.reverse();
    }

    // Move current node from open set to closed set
    openSet.splice(lowestFIndex, 1);
    closedSet.push(current);

    // Get the neighboring nodes
    const neighbors = getNeighbors(current, grid);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      // Skip if the neighbor is already in the closed set or not traversable
      if (closedSet.includes(neighbor) || !neighbor.traversable) {
        continue;
      }

      // Calculate the tentative g score
      const tentativeG = current.g + 1;

      // Check if the neighbor is already in the open set
      const inOpenSet = openSet.includes(neighbor);

      if (!inOpenSet || tentativeG < neighbor.g) {
        // Update the neighbor's properties
        neighbor.g = tentativeG;
        neighbor.h = heuristic(neighbor, destination);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = current;

        if (!inOpenSet) {
          openSet.push(neighbor);
        }
      }
    }
  }

  // No path found
  return null;
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { x, y } = node;

  // Check top neighbor
  if (y > 0) {
    neighbors.push(grid[y - 1][x]);
  }

  // Check right neighbor
  if (x < grid[0].length - 1) {
    neighbors.push(grid[y][x + 1]);
  }

  // Check bottom neighbor
  if (y < grid.length - 1) {
    neighbors.push(grid[y + 1][x]);
  }

  // Check left neighbor
  if (x > 0) {
    neighbors.push(grid[y][x - 1]);
  }

  return neighbors;
}

function heuristic(node, destination) {
  // Manhattan distance heuristic
  return Math.abs(node.x - destination.x) + Math.abs(node.y - destination.y);
}



// // Example usage

// // Create the grid
// const grid = [
//   [new Node(0, 0, true), new Node(1, 0, true), new Node(2, 0, false)],
//   [new Node(0, 1, true), new Node(1, 1, false), new Node(2, 1, true)],
//   [new Node(0, 2, true), new Node(1, 2, true), new Node(2, 2, true)],
// ];

// // Set the start and destination nodes
// const startNode = grid[0][0];
// const destinationNode = grid[2][2];

// // Find the path using A*
// const path = astar(startNode, destinationNode, grid);

// if (path !== null) {
//   // Path found
//   console.log("Path:", path);
// } else {
//   // No path found
//   console.log("No path found.");
// }


const maze = document.getElementById('maze');
        const grid = [
            [new Node(0, 0, true), new Node(1, 0, true), new Node(2, 0, false)],
            [new Node(0, 1, true), new Node(1, 1, false), new Node(2, 1, true)],
            [new Node(0, 2, true), new Node(1, 2, true), new Node(2, 2, true)],
        ];
        const startNode = grid[0][0];
        const endNode = grid[2][2];

        function drawMaze() {
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[y].length; x++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    if (grid[y][x] === startNode) {
                        cell.classList.add('start');
                    } else if (grid[y][x] === endNode) {
                        cell.classList.add('end');
                    } else if (!grid[y][x].traversable) {
                        cell.classList.add('wall');
                    }
                    maze.appendChild(cell);
                }
                maze.appendChild(document.createElement('br'));
            }
        }

        function start() {
            const path = astar(startNode, endNode, grid);
            if (path !== null) {
                for (let i = 0; i < path.length; i++) {
                    const { x, y } = path[i];
                    const cell = maze.children[y * (grid[0].length + 1) + x];
                    cell.classList.add('path');
                }
            } else {
                console.log("No path found.");
            }
        }

        function reset() {
          const cells = document.getElementsByClassName('cell');
          for (let i = 0; i < cells.length; i++) {
              cells[i].classList.remove('path');
          }
      }

        drawMaze();