import { Request, Response } from 'express';
import { dbConnection } from '../config/config';
import { Cart, Order, OrderResult, ProductsForCart } from '../interfaces/Cart';
import { setResponse, setResponseError } from '../lib/functions';
import { CartModelServices } from './cartModelServices';
import { ResponseServer } from '../interfaces/ResponseServer';

const cartModelServices: CartModelServices = new CartModelServices(dbConnection);

export class CartController {
  async getListProductsInCart(req: Request, res: Response): Promise<void> {
    const orderListCart: ProductsForCart[] = req.body;
    if (orderListCart) {
      try {
        const products: Cart = await cartModelServices.getListProductsInCart(orderListCart);
        res.json(products);
      } catch (e) {
        res.json(setResponseError(e));
      }
    } else {
      const response:ResponseServer = setResponse('cart is empty');
      res.json(response);
    }
  }

  async addOrder(req: Request, res: Response): Promise<void> {
    if (!req.body) res.json(setResponse('no data', 400));
    const orderListCart: ProductsForCart[] = req.body;
    try {
      const orderResult: OrderResult = await cartModelServices.addOrder(orderListCart);
      res.json(orderResult);
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async getOrderList(req: Request, res: Response): Promise<void> {
    try {
      const orderList: Order[] = await cartModelServices.getOrderList();
      res.json(orderList);
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    const orderId: Order[ 'id' ] = Number(req.params.id);
    try {
      const response:ResponseServer = setResponse(await cartModelServices.deleteOrder(orderId));
      res.json(response);
    } catch (e) {
      res.json(setResponseError(e));
    }
  }
}
