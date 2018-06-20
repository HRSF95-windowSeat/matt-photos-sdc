const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/index');

const app = express();

app.use(bodyParser.json());
app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public/index.html')));
app.use('/photosBundle', express.static(path.join(__dirname, '../public/dist/bundle.js')));
app.use('/photosBundleCSS', express.static(path.join(__dirname, '../public/style/main.css')));

app.get('/photos/restaurant/:restaurantId/photos', (req, res) => {
  const restaurantId = parseInt(req.params.restaurantId, 10);

  if (typeof restaurantId !== 'number') {
    res.status(400).send('Bad input, must be a valid ID number.');
  } else {
    db.getPhotos(restaurantId, (err, data) => {
      if (err) {
        res.status(500).send('Error: could not retrieve data from db.');
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

app.post('/photos/restaurant/:restaurantId/photos', (req, res) => {
  res.end();
});

app.put('/photos/restaurant/:restaurantId/photos', (req, res) => {
  res.end();
});

app.delete('/photos/restaurant/:restaurantId/photos', (req, res) => {
  res.end();
});

module.exports = app;
