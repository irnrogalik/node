import { Request, Response } from 'express';
import { dbConnection } from '../config/config';
import { Cart, Order, OrderResult, ProductsForCart } from '../interfaces/Cart';
import { setResponse, setResponseError } from '../lib/functions';
import { CartModelServices } from './cartModelServices';

const cartModelServices: CartModelServices = new CartModelServices(dbConnection);

export class CartServices {
  constructor() { }

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
      res.json(setResponse('cart is empty'));
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
      res.json(await cartModelServices.getOrderList());
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    const orderId: Order[ 'id' ] = Number(req.params.id);
    try {
      res.json(setResponse(await cartModelServices.deleteOrder(orderId)));
    } catch (e) {
      res.json(setResponseError(e));
    }
  }
}
