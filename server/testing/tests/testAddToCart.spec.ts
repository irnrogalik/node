import { Cart, OrderAmount, ProductsForCart } from '../../src/interfaces/Cart';
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { dbConnection } from '../../src/config/config';
import { productsConfig, CartContent } from '../config/products';
import { CartModelServices } from '../../src/cart/cartModelServices';
import { Product } from '../../src/interfaces/Product';

let cart: Cart, outputOrder: OrderAmount, outputProducts: Product[];

for (const setId in productsConfig) {
  const inputOrderList: ProductsForCart[] = [];
  const outputOrderList: CartContent = productsConfig[ setId ];

  Object.keys(productsConfig[ setId ].products).forEach((productId) => {
    inputOrderList.push({ id: Number(productId), quantity: 1 });
  });

  describe(`Check ${ setId }`, async () => {
    before(async () => {
      const Cart: CartModelServices = new CartModelServices(dbConnection);
      cart = await Cart.getListProductsInCart(inputOrderList);
    });

    it('Result have list of products', () => {
      expect(cart).to.have.property('products');
      expect(cart.products).to.have.length((Object.keys(outputOrderList.products)).length);
      outputProducts = cart.products;
    });

    it('Result have order', () => {
      expect(cart).to.have.property('order');
      expect(Object.keys(cart.order)).to.have.length(2);
      outputOrder = cart.order;
    });

    it('check count position in order', () => {
      expect(outputProducts.length).to.equal(
        Object.keys(outputOrderList.products).length
      );
    });

    describe(`Check name and price of products in ${ setId }`, () => {
      const { products } = outputOrderList;

      for (const productId in products) {
        const product: Product = products[ productId ];
        const { name: productName, finalPrice: productPrice } = product;

        describe(`Product name should be equal ${ productName } and price should be equal ${ productPrice }`, () => {
          it(`Product name should be equal ${ productName }`, () => {
            const productOutput: Product = cart.products.find(
              (product: Product) => product.id === Number(productId)
            );
            expect(productOutput.name).to.equal(productName);
          });

          it(`Product price should be equal ${ productPrice }`, () => {
            const productOutput: Product = cart.products.find(
              (product: Product) => product.id === Number(productId)
            );
            expect(Number(productOutput.price)).to.equal(productPrice);
          });
        });
      }
    });

    describe(`Check order value in ${ setId }`, () => {
      const { order } = outputOrderList;

      it(`Order sales taxes should be ${ order.totalTax }`, () => {
        expect(outputOrder.totalTax).to.equal(order.totalTax);
      });

      it(`Order total should be ${ order.total }`, () => {
        expect(outputOrder.total).to.equal(order.total);
      });
    });
  });
}
