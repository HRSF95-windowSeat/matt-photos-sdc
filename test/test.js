const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const server = require('../server/index.js');

const assert = chai.assert;

chai.use(chaiHttp);

describe('endpoint', () => {
  it('should return status code 200', (done) => {
    chai.request(server)
      .get('/restaurant/22/photos')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return restaurant ids', (done) => {
    chai.request(server)
      .get('/restaurant/22/photos')
      .end((err, res) => {
        expect(typeof res.body.rows[0].restaurantid).to.equal('number');
        done();
      });
  });

  it('should return restaurant urls', (done) => { // returning titles during testing
    chai.request(server)
      .get('/restaurant/22/photos')
      .end((err, res) => {
        expect(typeof res.body.rows[0].title).to.equal('string');
        done();
      });
  });
});
