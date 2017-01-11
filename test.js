const test  = require('tape');
const getGeneration = require('./index.js');

test('Codewars example test', t => {
  var gliders = [
    [[1,0,0],
     [0,1,1],
     [1,1,0]],
    [[0,1,0],
     [0,0,1],
     [1,1,1]]
  ];
  t.deepEqual(getGeneration(gliders[0], 1), gliders[1]);
  t.end();
})
