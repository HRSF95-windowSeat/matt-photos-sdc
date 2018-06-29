const fs = require('file-system');
const data = require('./data.js');
const photos = require('./photos.js');
const uuidv4 = require('uuid/v4');
const faker = require('faker');

const genId = (id, i, lines) => (id * lines) + i;
const genName = () => data.restaurants[Math.floor((Math.random() * 1550))];
const genCuisine = () => data.cuisines[Math.floor((Math.random() * 41))];
const genCity = () => data.cities[Math.floor((Math.random() * 100))];
const genFeatured = () => data.bool[Math.floor((Math.random() * 2))];
const genTitle = () => data.titles[Math.floor((Math.random() * 494))];
const genCaption = () => data.captions[Math.floor((Math.random() * 500))];
const genUser = () => data.userNames[Math.floor((Math.random() * 696))];
const genRestaurant = () => `${genName()}|${genCuisine()}|${genCity()}|${genFeatured()}\n`;
const genRestaurantPhotos = i => `${genTitle()}|${genUser()}|${genCaption()}\n`;
const genNumInRange = (min, max) => Math.floor((Math.random() * (max - min)) + min);
const addZeros = (i) => {
  if (i < 10) { return `00${i}`; }
  if (i < 100) { return `0${i}`; }
  return i;
};
const genURL = () => `https://s3-us-west-1.amazonaws.com/sdcot/photos/pic_${addZeros(genNumInRange())}.jpg`;
const genPhotoNumbers = () => {
  const storage = [];
  for (let i = 0; i < genNumInRange(5, 10); i += 1) {
    storage.push(genNumInRange(1, 700));
  }
  return storage;
};

// const writePhotosChunk = (lines, writes, id, callback, file, start = new Date()) => {
//   if (writes === 0) {
//     console.log('total time ', new Date() - start);
//     return;
//   }
//   console.log(writes);
//   let chunk = '';
//   for (let i = 1; i <= lines; i += 1) {
//     const photoNums = genPhotoNumbers();
//     for (let j = 0; j < photoNums.length; j += 1) {
//       chunk += `${uuidv4()}|${genId(id, i, lines)}|${callback(photoNums[j])}|${genRestaurant()}`;
//     }
//   }

//   fs.appendFile(file, chunk, () => {
//     writePhotosChunk(lines, writes - 1, id + 1, callback, file, start);
//   });
// };

const writePhotosChunk = (lines, writes, id, callback, file, start = new Date()) => {
  if (writes === 0) {
    console.log('total time ', new Date() - start);
    return;
  }
  console.log(writes);
  let chunk = '';
  for (let i = 1; i <= lines; i += 1) {
    const photoNums = genNumInRange(5, 10);
    for (let j = 0; j < photoNums; j += 1) {
      chunk += `${genId(id, i, lines)}|${faker.image.imageUrl()}|${genRestaurantPhotos()}`;
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
  console.log(writes);
  let chunk = '';
  for (let i = 1; i <= lines; i += 1) {
    chunk += `${callback()}`;
  }

  fs.appendFile(file, chunk, () => {
    writeChunk(lines, writes - 1, id + 1, callback, file, start);
  });
};

writePhotosChunk(10000, 1000, 0, genRestaurantPhotos, 'data.txt');
// writeChunk(10, 10, 0, genRestaurant, 'data.txt');
