const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME,
//   port: process.env.RDS_PORT,
//   database: process.env.RDS_DB_NAME,
//   user: process.env.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD,
// });

// connection.connect();

const getPhotos = (restaurantID, dataSend) => {
  // connection.query(`SELECT id, url FROM cavatable_photos WHERE restaurant_id = ${restaurantID}`, (err, results) => {
  //   if (err) {
  //     dataSend(err, null);
  //   } else {
  //     dataSend(null, results);
  //   }
  // });
};

module.exports = {
  getPhotos,
};
