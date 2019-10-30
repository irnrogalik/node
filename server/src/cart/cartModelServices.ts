import mysql from 'mysql2';
import { redis } from '../config/config';
import { Cart, Order, OrderResult } from '../interfaces/Cart';
import { getFormatDate } from '../lib/functions';
import { RedisModelServices } from '../redis/RedisModelServices';
import { ResultQuery } from '../interfaces/DB';
import { Product } from '../interfaces/Product';

const redisModelServices: RedisModelServices = new RedisModelServices(redis);

export class CartModelServices {
  private connection: mysql.Socket;
  private query: string;
  private message: string;
  private orderListInCart: Cart;
  private orderList: Order[];
  private products: Product[];

  constructor(connectionConfig: Object) {
    this.connection = mysql.createConnection(connectionConfig).promise();
  }

  async getListProductsInCart(orderListCart: object): Promise<Cart> {
    try {
      this.query = `CALL getProductsListInCart('${ Object.keys(orderListCart).join(',') }')`;
      [ [ this.products ] ] = await this.connection.query(this.query);
      this.orderListInCart = {
        products: [],
        order: {
          total: 0,
          totalTax: 0
        }
      };

      for (const product of this.products) {
        const price = Number(product.price || 0);
        const priceTax = Number(product.productTax || 0);
        const totalPrice = Number((price + priceTax).toFixed(2));

        product.price = totalPrice;

        this.orderListInCart.order.total += totalPrice;
        this.orderListInCart.order.totalTax += priceTax;
        this.orderListInCart.products.push(product);
      }

      this.orderListInCart.order.total = Number(this.orderListInCart.order.total.toFixed(2));
      this.orderListInCart.order.totalTax = Number(this.orderListInCart.order.totalTax.toFixed(2));

      return this.orderListInCart;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addOrder(orderListCart: { [ key: number ]: number }): Promise<OrderResult> {
    try {
      const orderList: Cart = await this.getListProductsInCart(orderListCart);
      this.query = `INSERT INTO orders(salesTaxes, total) VALUES (${ orderList.order.totalTax }, ${ orderList.order.total })`;
      const [ resultInsert ]: ResultQuery[] = await this.connection.query(this.query);
      const newOrderId: ResultQuery[ 'insertId' ] = resultInsert.insertId;
      try {
        this.addOrderList(newOrderId, orderListCart);
        redisModelServices.set({ [ Date.now() ]: `Order with id ${ newOrderId } was added` });
        const orderResult: OrderResult = {
          status: 200,
          message: `Order #${ newOrderId }  completed 12`,
          orderList: orderList
        };
        return orderResult;
      } catch (e) {
        throw new Error(e);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async addOrderList(newOrderId: number, orderListCart: object): Promise<void> {
    try {
      const orderListId = [];
      for (const productId in orderListCart) {
        orderListId.push([ newOrderId, productId, orderListCart[ productId ] ]);
      }
      this.query = 'INSERT INTO orderList (orderId, productId, quantity) VALUES ?';
      this.connection.query(this.query, [ orderListId ]);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getOrderList(): Promise<object> {
    try {
      this.query = 'SELECT * FROM orders';
      [ this.orderList ] = await this.connection.query(this.query);
      for (let i = 0; i < this.orderList.length; i++) {
        this.orderList[ i ].displayDate = getFormatDate(this.orderList[ i ].date);
      }
      return this.orderList;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteOrder(OrderId: Order[ 'id' ]): Promise<string> {
    try {
      this.query = 'DELETE FROM orders WHERE id=?';
      await this.connection.query(this.query, OrderId);
      this.message = `Order with id ${ OrderId } was deleted`;
      redisModelServices.set({ [ Date.now() ]: this.message });
      return this.message;
    } catch (e) {
      throw new Error(e);
    }
  }
}
