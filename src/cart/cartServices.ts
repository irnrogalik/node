'use strict';
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import config from '../config/config';
import CartClass from './cartModelServices';

const CartModel = new CartClass(config.dbConnection);

class CartServices {
  // eslint-disable-next-line no-useless-constructor
  constructor () {

  }

  async getListProductsInCart (req: Request, res: Response) {
    const orderListCart = req.session.orderList;
    if (orderListCart) {
      try {
        const products = await CartModel.getListProductsInCart(orderListCart);
        res.render('cart', {
          orderList: products
        });
      } catch (e) {
        res.send(e);
      }
    } else {
      res.render('cart', {
        title: 'Cart'
      });
    }
  }

  async addOrder (req: Request, res: Response) {
    const orderListCart = req.session.orderList || req.body.orderList;
    if (!orderListCart) {
      res.redirect('/cart');
      return;
    }
    const test = !!(req.body.test && req.body.test === 'y');

    try {
      const orderList = await CartModel.addOrder(orderListCart);
      delete req.session.orderList;
      if (test) {
        res.json(orderList);
      } else {
        res.render('cart', {
          title: 'Thank you',
          thank: 'Order completed',
          orderList: orderList
        });
      }
    } catch (e) {
      res.send(e);
    }
  }

  async getOrderList (req: Request, res: Response) {
    try {
      const orderList = await CartModel.getOrderList();
      res.render('ordersList', {
        title: 'Order List',
        orderList: orderList
      });
    } catch (e) {
      res.send(e);
    }
  }

  async deleteOrder (req: Request, res: Response) {
    const orderId = +req.params.id;
    try {
      await CartModel.deleteOrder(orderId);
      res.redirect('/cart/orderList');
    } catch (e) {
      res.send(e);
    }
  }
}

export = CartServices;
