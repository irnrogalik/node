import { Cart } from '../interfaces/Cart';
import { Product } from '../interfaces/Product';

export function getFinalOrderListInCart(products: Product[]): Cart {
  const orderListInCart: Cart = {
    products: [],
    order: {
      total: 0,
      totalTax: 0
    }
  };

  for (const product of products) {
    const price = Number(product.price || 0);
    const taxValue = product.taxValue ? product.taxValue.split(',') : [];
    let priceTax = 0;
    let totalPrice = 0;

    if (Array.isArray(taxValue) && taxValue.length > 0) {
      taxValue.map(val =>
        (priceTax += Number((Math.ceil((price * (Number(val) / 100)) * 20) / 20).toFixed(2)))
      );
    }

    totalPrice = price + priceTax;
    product.price = Number(totalPrice.toFixed(2));

    orderListInCart.order.total += totalPrice;
    orderListInCart.order.totalTax += priceTax;
    orderListInCart.products.push(product);
  }

  orderListInCart.order.total = Number(orderListInCart.order.total.toFixed(2));
  orderListInCart.order.totalTax = Number(orderListInCart.order.totalTax.toFixed(2));

  return orderListInCart;
}
