'use strict';
import express from 'express';
import ProductServicesClass from './productServices';

const ProductServices = new ProductServicesClass();
const router = express.Router();

router.route('/')
  .get(ProductServices.getListProducts);

router.route('/add')
  .get(ProductServices.showAddProductPage)
  .post(ProductServices.addProduct);

router.route('/delete/:id')
  .post(ProductServices.deleteProduct);

router.route('/addToCart/:id')
  .post(ProductServices.addToCart);

export = router;
