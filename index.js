// Pass in a game of life board (a 2D array of 1s and 0s) and return the state after n ticks

function getGeneration (arr, n) {
  var world = arrayToWorld(arr);
  for (var i = 0; i < n; i++) {
    world = getNextTick(world);
  }
  return worldToArray(world);
}

// Create the Coord class used in the world data structure

function Coord (x, y) {
  this.x = x;
  this.y = y;
}

Coord.prototype.toString = function() {
  return `${this.x} ${this.y}`;
}

// Helper function to retrieve an object's keys cleanly

function keys (obj) {
  return Object.keys(obj);
}

// Convert from a 2D array of 1s and 0s to a more workable data structure for intermediate processing

function arrayToWorld (array) {
  var world = {};
  array.forEach((row, y) => {
    row.forEach((alive, x) => {
      if (alive) {
        var coord = new Coord(x, y);
        world[coord] = coord;
      }
    })
  })
  return world;
}

// Generate the next 'tick' of the game

function getNextTick (world) {
  var intermediate = getIntermediate(world);
  return processIntermediate(intermediate);
}

// Create the intermediate object used to build the next tick

function getIntermediate (world) {
  var intermediateWorld = {};
  keys(world).forEach(key => {
    let coord = world[key];
    markAlive(intermediateWorld, coord);
    markNeighbours(intermediateWorld, coord);
  })
  return intermediateWorld;
}

function markAlive(world, coord) {
  world[coord] = world[coord] || { count: 0, coord };
  world[coord].alive = true;
  return world;
}

function markNeighbours(world, coord) {
  let neighbours = getNeighbours(coord);
  neighbours.forEach(neighbourCoord => {
    world[neighbourCoord] = world[neighbourCoord] || { count: 0, coord: neighbourCoord };
    world[neighbourCoord].count++;
  })
  return world;
}

function getNeighbours (coord) {
  var {x, y} = coord;
  var neighbours = [
    {x: x-1, y: y-1},
    {x:   x, y: y-1},
    {x: x+1, y: y-1},
    {x: x-1, y:   y},
    {x: x+1, y:   y},
    {x: x-1, y: y+1},
    {x:   x, y: y+1},
    {x: x+1, y: y+1}
  ];
  return neighbours.map(item => new Coord(item.x, item.y));
}

// Create next world state from intermediate object

function processIntermediate (intermediateWorld) {
  var nextTick = {};
  keys(intermediateWorld)
    .map(key => intermediateWorld[key])
    .filter(isAlive)
    .forEach(cell => nextTick[cell.coord] = cell.coord);
  return nextTick;
}

function isAlive(cell) {
  return cell.count === 3 || (cell.alive && cell.count === 2);
}

// Convert world back to original array format

function worldToArray (world) {
  var values = keys(world).map(str => str.split(' ').map(char => Number(char)));
  var {xMax, xMin, yMax, yMin} = getMinMax(values);
  var width = (xMax - xMin) + 1, height = (yMax - yMin) + 1;
  return buildArray(width, height, xMin, yMin, values);
}

function getMinMax (values) {
  var xs = values.map(arr => arr[0]), ys = values.map(arr => arr[1]);
  var xMax = Math.max.apply(null, xs), xMin = Math.min.apply(null, xs);
  var yMax = Math.max.apply(null, ys), yMin = Math.min.apply(null, ys);
  return {xMax, xMin, yMax, yMin};
}

function buildArray(width, height, xMin, yMin, values) {
  for (var i = 0, result = []; i < height; i++) {
    result.push(Array(width).fill(0));
  }
  values.forEach(value => result[value[1] - yMin][value[0] - xMin] = 1);
  return result;
}

module.exports = getGeneration;
