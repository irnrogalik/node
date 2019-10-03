const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const chai = require('chai');
const supertest = require('supertest');
const app = require('../../dist/app');

chai.should();
describe('test to router', () => {
  describe('add first order', () => {
    it('Post. Order price should be equal 126.98 and sales taxes should be equal 10', async () => {
      const bodyData = { //
        orderList: { 1: 1, 2: 1, 3: 1 }, //
        test: 'y'
      };

      const { res } = await supertest(app)
        .post('/cart/order')
        .send(bodyData);
      res.text.should.be.a('string');
      const text = JSON.parse(res.text);
      text.should.have.property('order');
      text.order.totalTax.should.be.eql(10);
      text.order.total.should.be.eql(126.98);
    });
  });

  describe('add second order', () => {
    it('Post. Order price should be equal 17262.99 and sales taxes should be equal 2250.74', async () => {
      const bodyData = {
        orderList: { 4: 1, 5: 1 },
        test: 'y'
      };

      const { res } = await supertest(app)
        .post('/cart/order')
        .send(bodyData);
      res.text.should.be.a('string');
      const text = JSON.parse(res.text);
      text.should.have.property('order');
      text.order.totalTax.should.be.eql(2250.74);
      text.order.total.should.be.eql(17262.99);
    });
  });

  describe('add third order', () => {
    it('Post. Order price should be equal 1149.78 and sales taxes should be equal 10.80', async () => {
      const bodyData = {
        orderList: { 6: 1, 7: 1, 8: 1, 9: 1 },
        test: 'y'
      };

      const { res } = await supertest(app)
        .post('/cart/order')
        .send(bodyData);
      res.text.should.be.a('string');
      const text = JSON.parse(res.text);
      text.should.have.property('order');
      text.order.totalTax.should.be.eql(10.80);
      text.order.total.should.be.eql(1149.78);
    });
  });
});
