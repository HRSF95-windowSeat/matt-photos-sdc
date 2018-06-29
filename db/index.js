const { Pool, Client } = require('pg');
const client = new Client();

const pool = new Pool({ host: 'localhost', user: 'strom', database: 'ot' });

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const getPhotos = (restaurantID, dataSend) => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(`SELECT restaurantid, title FROM photos WHERE restaurantid = ${restaurantID}`, (err, res) => {
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
};
