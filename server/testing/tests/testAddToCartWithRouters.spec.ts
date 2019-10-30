import chai from 'chai';
import supertest from 'supertest';
import app from '../../src/app';
import { it, describe } from 'mocha';

chai.should();

describe('Test to router', () => {
  describe('Add first order', () => {
    it('Order price should be equal 126.98 and sales taxes should be equal 10.00', async () => {
      const bodyData: { [ key: number ]: number } = { 1: 1, 2: 1, 3: 1 };

      const { res } = await supertest(app)
        .post('/cart/order')
        .send(bodyData);

      res.text.should.be.a('string');
      const result = JSON.parse(res.text);

      result.should.have.property('status');
      result.status.should.be.eql(200);

      result.should.have.property('orderList');
      result.orderList.should.have.property('order');
      result.orderList.order.totalTax.should.be.eql(10.00);
      result.orderList.order.total.should.be.eql(126.98);
    });
  });

  describe('Add second order', () => {
    it('Order price should be equal 17262.99 and sales taxes should be equal 2250.74', async () => {
      const bodyData: { [ key: number ]: number } = { 4: 1, 5: 1 };

      const { res } = await supertest(app)
        .post('/cart/order')
        .send(bodyData);

      res.text.should.be.a('string');
      const result = JSON.parse(res.text);

      result.should.have.property('status');
      result.status.should.be.eql(200);

      result.should.have.property('orderList');
      result.orderList.should.have.property('order');
      result.orderList.order.totalTax.should.be.eql(2250.74);
      result.orderList.order.total.should.be.eql(17262.99);
    });
  });

  describe('Add third order', () => {
    it('Order price should be equal 1149.78 and sales taxes should be equal 10.80', async () => {
      const bodyData: { [ key: number ]: number } = { 6: 1, 7: 1, 8: 1, 9: 1 };
      const { res } = await supertest(app)
        .post('/cart/order')
        .send(bodyData);

      res.text.should.be.a('string');
      const result = JSON.parse(res.text);

      result.should.have.property('status');
      result.status.should.be.eql(200);

      result.should.have.property('orderList');
      result.orderList.should.have.property('order');
      result.orderList.order.totalTax.should.be.eql(10.80);
      result.orderList.order.total.should.be.eql(1149.78);
    });
  });
});
