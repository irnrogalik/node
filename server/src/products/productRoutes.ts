import express from 'express';
import { ProductServices } from './productController';

const productServices: ProductServices = new ProductServices();
const router: express.Router = express.Router();

router.route('/')
  .get(productServices.getListProducts);

router.route('/add')
  .post(productServices.addProduct);

router.route('/delete/:id')
  .post(productServices.deleteProduct);

export = router;
