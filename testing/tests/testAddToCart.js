'use strict';
const { describe, it, before } = require('mocha');
const expect = require('chai').expect;
const config = require('../../dist/config/config').default;
const productsConfig = require('../config/products');
const CartClass = require('../../dist/cart/cartModelServices');
let Cart,
  productsInCart,
  outputOrder,
  outputProducts;

for (const setId in productsConfig) {
  const inputOrderList = {};
  const outputOrderList = productsConfig[setId];

  Object.keys(productsConfig[setId].products).forEach(productId => { inputOrderList[productId] = 1; }); // create cart object with product id & quantity

  describe(`Check ${setId}`, async () => {
    before(async () => {
      Cart = new CartClass(config.dbConnection);
      productsInCart = await Cart.getListProductsInCart(inputOrderList);
    });

    it('Result have list of products', () => {
      expect(productsInCart).to.have.property('products');
      outputProducts = productsInCart.products;
    });

    it('Result have order', () => {
      expect(productsInCart).to.have.property('order');
      outputOrder = productsInCart.order;
    });

    it('check count position in order', () => {
      expect(outputProducts.length).to.equal(Object.keys(outputOrderList.products).length);
    });

    describe(`Check name and price of products in ${setId}`, () => {
      const { products } = outputOrderList;

      for (const productId in products) {
        const product = products[productId];
        const { name: productName, price: productPrice } = product;

        describe(`Product name should be equal ${productName} and  price should be equal ${productPrice}`, () => {
          it(`Product name should be equal ${productName}`, () => {
            const productOutput = productsInCart.products.find(x => x.Id === Number(productId));
            expect(productOutput.Name).to.equal(productName);
          });

          it(`Product price should be equal ${productPrice}`, () => {
            const productOutput = productsInCart.products.find(x => x.Id === Number(productId));
            expect(Number(productOutput.Price)).to.equal(productPrice);
          });
        });
      }
    });

    describe(`Check order value in ${setId}`, () => {
      const { order } = outputOrderList;

      it(`Order sales taxes should be ${order.salesTaxes}`, () => {
        expect(outputOrder.totalTax).to.equal(order.salesTaxes);
      });

      it(`Order total should be ${order.total}`, () => {
        expect(outputOrder.total).to.equal(order.total);
      });
    });
  });
}
