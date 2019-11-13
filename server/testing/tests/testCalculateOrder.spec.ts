import chai from 'chai';
import { it, describe } from 'mocha';
import { getFinalOrderListInCart } from '../../src/cart/cartServices';
import { Product } from '../../src/interfaces/Product';
import { productsConfig } from '../config/products';

chai.should();

describe('Test to calculate function', () => {
  for (const setId in productsConfig) {
    describe(`Calculate order №${ setId.replace('set', '') }`, () => {
      const products: Product[] = [];
      const set = productsConfig[ setId ];
      const needProducts = set.products;

      for (const key in needProducts) {
        const product = needProducts[ key ];
        products.push(product);
      }

      const orderListInCart = getFinalOrderListInCart(products);
      describe('Check order price and sales taxes', () => {
        it(`Order price should be equal ${ set.order.total } `, async () => {
          orderListInCart.order.total.should.be.eql(set.order.total);
        });
        it(`Order price sales taxes should be equal ${ set.order.totalTax }`, async () => {
          orderListInCart.order.totalTax.should.be.eql(set.order.totalTax);
        });
      });
    });
  }
});
