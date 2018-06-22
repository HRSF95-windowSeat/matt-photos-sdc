const fs = require('file-system');
const data = require('./data.js');

const bool = [true, false];
let chunk = '';

const genCuisine = () => data.cuisines[Math.floor((Math.random() * 42))];
const genCity = () => data.cities[Math.floor((Math.random() * 101))];
const genBool = () => bool[Math.floor((Math.random() * 2))];
const genData = () => data.restaurants[Math.floor((Math.random() * 1550))];

const genRestaurant = () => `${genData()}|${genCuisine()}|${genCity()}|${genBool()}\n`;

const writeRestaurantChunk = (n, counter) => {
  if (n === 0) {
    return;
  }

  chunk = '';
  console.time('chunk');
  for (var i = 0; i < 100; i++) {
    chunk += genRestaurant();
  }
  fs.appendFile('data.txt', chunk, () => {
    console.log(counter + 1);
    console.timeEnd('chunk');
    writeRestaurantChunk(n - 1, counter + 1);
  });
};

module.exports.writeRestaurantChunk = writeRestaurantChunk;
module.exports.genRestaurant = genRestaurant;
