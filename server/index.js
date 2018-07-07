// require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/index');

const app = express();
const port = process.env.PORT || 3004;

app.use(bodyParser.json());
app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public/index.html')));
app.use('/photosBundle', express.static(path.join(__dirname, '../public/dist/bundle.js')));
app.use('/photosBundleCSS', express.static(path.join(__dirname, '../public/style/main.css')));

// app.use('/', function(req,res,next) {
//   console.log(req.url);
//   next();
// });

app.get('/photos/restaurant/:restaurantId/photos', (req, res) => {
  console.log('get was hit');
  const restaurantId = parseInt(req.params.restaurantId, 10);
  if (typeof restaurantId !== 'number') {
    res.status(400).send('Bad input, must be a valid ID number.');
  } else {
    db.getPhotos(restaurantId, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error: could not retrieve data from db.');
      } else {
        console.log(data);
        res.status(200).send(data);
      }
    });
  }
});

app.post('/restaurant/:restaurantId/photos', (req, res) => {
  console.log('post was hit');
  const restaurantId = parseInt(req.params.restaurantId, 10);
  if (typeof restaurantId !== 'number') {
    res.status(400).send('Bad input, must be a valid ID number.');
  } else {
    db.addPhotos(restaurantId, (err, data) => {
      if (err) {
        res.status(500).send('Error: could not retrieve data from db.');
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

app.put('/restaurant/:restaurantId/photos', (req, res) => {
  console.log('put was hit');
  const restaurantId = parseInt(req.params.restaurantId, 10);
  if (typeof restaurantId !== 'number') {
    res.status(400).send('Bad input, must be a valid ID number.');
  } else {
    db.updatePhotos(restaurantId, (err, data) => {
      if (err) {
        res.status(500).send('Error: could not retrieve data from db.');
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

app.delete('/restaurant/:restaurantId/photos', (req, res) => {
  console.log('delete was hit');
  const restaurantId = parseInt(req.params.restaurantId, 10);
  if (typeof restaurantId !== 'number') {
    res.status(400).send('Bad input, must be a valid ID number.');
  } else {
    db.deletePhotos(restaurantId, (err, data) => {
      if (err) {
        res.status(500).send('Error: could not retrieve data from db.');
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

// app.listen(port, console.log(`Listening on ${port}`));

app.listen(port, console.log(`Listening on ${port}`));

module.exports = app;
