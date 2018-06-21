const fs = require('file-system');
const data = require('./data.js');

const bool = [true, false];
var chunk = '';

const genCuisine = function() {
  return data.cuisines[Math.floor((Math.random() * 42))];
};

const genCity = function() {
  return data.cities[Math.floor((Math.random() * 101))];
};

const genBool = function() {
  return bool[Math.floor((Math.random() * 2))];
};

const genData = function() {
  return data.restaurants[Math.floor((Math.random() * 1550))];
};

const writeRestaurantChunk = function(n, x) {
  if (n === 0) {
    return;
  }
  
  chunk = '';
  console.time('chunk');
  for (var i = 0; i < 1000000; i++) {
    chunk +=genData() + '|' + genCuisine() + '|' + genCity() + '|' + genBool() + '\n';
  }
  fs.appendFile('data.txt', chunk, () => {
    console.log(x + 1);
    console.timeEnd('chunk');
    writeRestaurantChunk(n - 1, x + 1);
  });
};

writeRestaurantChunk(10, 0);

module.exports.writeRestaurantChunk = writeRestaurantChunk;
