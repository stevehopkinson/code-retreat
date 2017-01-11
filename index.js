function arrToWorld(arr) {
  return arr.map(str => {
    var [x, y] = str.split(':').map(str => parseInt(str));
    return new Coord (x, y);
  })
}

function worldToArray(world) {
  return keys(world);
}

function Coord (x, y) {
  this.x = x;
  this.y = y;
}

Coord.prototype.toString = function() {
  return `${this.x}:${this.y}`;
}

function keys (obj) {
  return Object.keys(obj);
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

function tick (arr) {
  var world = arrToWorld(arr);
  var intermediate = getIntermediate(world);
  var nextTick = processIntermediate(intermediate);
  return worldToArray(nextTick);
}
