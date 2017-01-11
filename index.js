function Coord (x, y) {
  this.x = x;
  this.y = y;
}

Coord.prototype.toString = function() {
  return `x${this.x}y${this.y}`;
}

function keys (obj) {
  return Object.keys(obj);
}

var start = {
  'x0y0' : new Coord(0, 0),
  'x1y0' : new Coord(1, 0),
  'x0y1' : new Coord(0, 1),
  'x1y1' : new Coord(1, 1)
};

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
  return world
}

function processIntermediate (intermediateWorld) {
  var nextTick = {};
  keys(intermediateWorld).forEach(key => {
    var cell = intermediateWorld[key];
    if (cell.count === 3 || (cell.alive && cell.count === 2)) {
      nextTick[cell.coord] = cell.coord;
    }
  })
  return nextTick;
}

function getNextTick (world) {
  var intermediate = getIntermediate(world);
  return processIntermediate(intermediate);
}
