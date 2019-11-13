import express from 'express';
import { CartController } from './cartController';

const cartController: CartController = new CartController();
const router: express.Router = express.Router();

router.route('/')
  .post(cartController.getListProductsInCart);

router.route('/order')
  .post(cartController.addOrder);

router.route('/delete/:id')
  .get(cartController.deleteOrder);

router.route('/orderList')
  .get(cartController.getOrderList);

export default router;
