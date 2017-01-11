function Coord(x, y) {
  this.x = x;
  this.y = y;
}

Coord.prototype.toString = function() {
  return `x${this.x}y${this.y}`;
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
  Object.keys(world).forEach(
    key => {
      let coord = world[key];
      intermediateWorld[coord] = intermediateWorld[coord] || { count: 0, coord };
      intermediateWorld[coord].alive = true;
      let neighbours = getNeighbours(coord);
      neighbours.forEach(
        neighbourCoord => {
          intermediateWorld[neighbourCoord] = intermediateWorld[neighbourCoord] || { count: 0 };
          intermediateWorld[neighbourCoord].count++;
        }
      )
    }
  )
  return intermediateWorld;
}

function getNextTick (intermediateWorld) {
  var nextTick = {};
  Object.keys(intermediateWorld)
}

module.exports = {Coord, getNeighbours};
