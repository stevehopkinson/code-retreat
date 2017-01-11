var start = {
  0: {0: true, 1: true},
  1: {0: true, 1: true}
}

function keys (obj) {
  return Object.keys(obj);
}

function getNeighbours (x, y) {
    return [
      {x: x-1, y: y-1},
      {x: x-1, y:   y},
      {x: x-1, y: y+1},
      {x:   x, y: y-1},
      {x:   x, y: y+1},
      {x: x+1, y: y-1},
      {x: x+1, y:   y},
      {x: x+1, y: y+1},
    ]
}

function getCells (world) {
  var cells = [];

  keys(world).forEach(
    x => keys(world[x]).forEach(
      y => {
        cells.push({x, y});
      }
    )
  )

  return cells;
}

function ifExists (cell, world) {
  return world[cell.x] && world[cell.x][cell.y];
}

function getIntermediate (world) {
  var intermediate = {};

  getCells(world).forEach(cell => {
    ifExists(cell);
  });
}

getIntermediate(start);
