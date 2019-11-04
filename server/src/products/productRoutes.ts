import express from 'express';
import { ProductController } from './productController';

const productController: ProductController = new ProductController();
const router: express.Router = express.Router();

router.route('/')
  .get(productController.getListProducts);

router.route('/add')
  .post(productController.addProduct);

router.route('/delete/:id')
  .post(productController.deleteProduct);

export = router;
