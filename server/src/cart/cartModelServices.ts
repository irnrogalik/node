import mysql from 'mysql2';
import { redis } from '../config/config';
import { Cart, Order, OrderResult, ProductsForCart } from '../interfaces/Cart';
import { getFormatDate } from '../lib/functions';
import { RedisModelServices } from '../redis/RedisModelServices';
import { ResultQuery } from '../interfaces/DB';
import { Product } from '../interfaces/Product';
import { getFinalOrderListInCart } from './cartServices';

const redisModelServices: RedisModelServices = new RedisModelServices(redis);

export class CartModelServices {
  private connection: mysql.Socket;
  private query: string;
  private message: string;
  private orderListInCart: Cart;
  private orderList: Order[];
  private products: Product[];

  constructor(connectionConfig: Object) {
    this.connection = mysql.createConnection(connectionConfig); this.connection = this.connection.promise();
  }

  async getListProductsInCart(orderListCart: ProductsForCart[]): Promise<Cart> {
    try {
      this.query = `CALL getProductsListInCart('${ orderListCart.map(product => product.id) }')`;
      [ [ this.products ] ] = await this.connection.query(this.query);
      this.orderListInCart = getFinalOrderListInCart(this.products);
      return this.orderListInCart;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addOrder(orderListCart: ProductsForCart[]): Promise<OrderResult> {
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
          message: `Order #${ newOrderId }  completed`,
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

  async addOrderList(newOrderId: number, orderListCart: ProductsForCart[]): Promise<void> {
    try {
      const orderList = [];
      orderListCart.map(product => orderList.push([ newOrderId, product.id, product.quantity ]));
      this.query = 'INSERT INTO orderList (orderId, productId, quantity) VALUES ?';
      this.connection.query(this.query, [ orderList ]);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getOrderList(): Promise<Order[]> {
    try {
      this.query = 'SELECT * FROM orders';
      [ this.orderList ] = await this.connection.query(this.query);
      this.orderList.map(order => (order.displayDate = getFormatDate(order.date)));
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
