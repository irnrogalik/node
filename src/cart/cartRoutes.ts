import express from 'express';
import { CartServices } from './cartController';

const cartServices: CartServices = new CartServices();
const router: express.Router = express.Router();

router.route('/')
  .post(cartServices.getListProductsInCart);

router.route('/order')
  .post(cartServices.addOrder);

router.route('/delete/:id')
  .get(cartServices.deleteOrder);

router.route('/orderList')
  .get(cartServices.getOrderList);

export = router;
