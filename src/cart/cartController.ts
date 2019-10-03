'use strict';
import express from 'express';
import CartServicesClass from './cartServices';

const CartServices = new CartServicesClass();
const router = express.Router();

router.route('/')
  .get(CartServices.getListProductsInCart);

router.route('/order')
  .post(CartServices.addOrder);

router.route('/delete/:id')
  .post(CartServices.deleteOrder);

router.route('/orderList')
  .get(CartServices.getOrderList);

export = router;
