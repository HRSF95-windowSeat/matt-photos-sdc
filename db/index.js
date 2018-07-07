const { Pool, Client } = require('pg');
const client = new Client();

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER || 'postgres',
  database: process.env.PG_DATA || 'ot',
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const getPhotos = (restaurantID, dataSend) => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(`SELECT restaurantid, url FROM photos WHERE restaurantid = ${restaurantID}`, (err, res) => {
      done();
      if (err) {
        dataSend(err, null);
      } else {
        // console.log(res);
        dataSend(null, res);
      }
    });
  });
};

const addPhotos = (restaurantID, dataSend) => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(`Insert into photos (restaurantid, title, caption, source, url) values (${restaurantID}, 'rhubarb', 'yum', 'rooting4u', 'http://www.rhubarb.com/veg.jpg');`, (err, res) => {
      done();
      if (err) {
        dataSend(err, null);
      } else {
        // console.log(res);
        dataSend(null, res);
      }
    });
  });
};

const updatePhotos = (restaurantID, dataSend) => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(`update photos set title = 'asparagus' WHERE restaurantid = ${restaurantID}`, (err, res) => {
      done();
      if (err) {
        dataSend(err, null);
      } else {
        // console.log(res);
        dataSend(null, res);
      }
    });
  });
};

const deletePhotos = (restaurantID, dataSend) => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(`DELETE from photos WHERE restaurantid = ${restaurantID}`, (err, res) => {
      done();
      if (err) {
        dataSend(err, null);
      } else {
        // console.log(res);
        dataSend(null, res);
      }
    });
  });
};

module.exports = {
  getPhotos,
  addPhotos,
  updatePhotos,
  deletePhotos,
};
