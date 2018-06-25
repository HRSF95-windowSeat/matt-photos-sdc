const fs = require('file-system');
const data = require('./data.js');
const photos = require('./photos.js');
const faker = require('faker');

const genId = (id, i, lines) => (id * lines) + i;
const genName = () => data.restaurants[Math.floor((Math.random() * 1550))];
const genCuisine = () => data.cuisines[Math.floor((Math.random() * 42))];
const genCity = () => data.cities[Math.floor((Math.random() * 101))];
const genFeatured = () => data.bool[Math.floor((Math.random() * 2))];
const genTitle = () => data.titles[Math.floor((Math.random() * 495))];
const genCaption = () => data.captions[Math.floor((Math.random() * 500))];
const genUserName = () => data.userNames[Math.floor((Math.random() * 696))];
const genRestaurant = () => `${genName()}|${genCuisine()}|${genCity()}|${genFeatured()}\n`;
const genRestaurantPhotos = i => `${photos[i]}|${genTitle()}|${genUserName()}|${genCaption()}\n`;
const cassandra = i => `${genName()}|${genTitle()}|${genUserName()}|${genCaption()}\n`;
const genNumInRange = (min, max) => Math.floor((Math.random() * (max - min)) + min);
const addZeros = (i) => {
  if (i < 10) { return `00${i}`; }
  if (i < 100) { return `0${i}`; }
  return i;
};
const genURL = () => `https://s3-us-west-1.amazonaws.com/sdcot/photos/pic_${addZeros(genNumInRange())}.jpg\n`;

const genPhotoNumbers = () => {
  const storage = [];
  for (let i = 0; i < genNumInRange(7, 14); i += 1) {
    storage.push(genNumInRange(1, 700));
  }
  return storage;
};
const writeCassandraChunk = (lines, writes, id, file, start = new Date()) => {
  if (writes === 0) {
    console.log('total time ', new Date() - start);
    return;
  }
  
  fs.appendFile(file, chunk, () => {
    writePhotosChunk(lines, writes - 1, id + 1, file, start);
  });
};

const writePhotosChunk = (lines, writes, id, callback, file, start = new Date()) => {
  if (writes === 0) {
    console.log('total time ', new Date() - start);
    return;
  }

  let chunk = '';
  for (let i = 1; i <= lines; i += 1) {
    const photoNums = genPhotoNumbers();
    for (let j = 0; j < photoNums.length; j += 1) {
      chunk += `${genId(id, i, lines)}|${callback(photoNums[j])}`;
    }
  }

  fs.appendFile(file, chunk, () => {
    writePhotosChunk(lines, writes - 1, id + 1, callback, file, start);
  });
};

const writeChunk = (lines, writes, id, callback, file, start = new Date()) => {
  if (writes === 0) {
    console.log('total time ', new Date() - start);
    return;
  }

  let chunk = '';
  for (let i = 1; i <= lines; i += 1) {
    chunk += `${callback()}`;
  }

  fs.appendFile(file, chunk, () => {
    writeChunk(lines, writes - 1, id + 1, callback, file, start);
  });
};

// console.log(data.userNames.length);

writePhotosChunk(10000, 1000, 0, genRestaurantPhotos, 'data.txt');
// writeChunk(500, 1, 0, genRestaurant, 'data.txt');
