'use strict';
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import config from '../config/config';
import ProductModelServicesClass from './productModelServices';

const ProductModelServices = new ProductModelServicesClass(config.dbConnection);

class ProductServices {
  // eslint-disable-next-line no-useless-constructor
  constructor() {

  }

  async getListProducts(req: Request, res: Response) {
    try {
      const products = await ProductModelServices.getListProducts();
      res.render('listProducts', {
        title: 'Products',
        products: products
      });
    } catch (e) {
      res.send(e);
    }
  }

  async showAddProductPage(req: Request, res: Response) {
    try {
      const categories = await ProductModelServices.getListCategories();
      res.render('addProduct', {
        title: 'Add product',
        categories: categories
      });
    } catch (e) {
      res.send(e);
    }
  }

  async addProduct(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);
    let { name, price, category } = req.body || null;

    console.log('category   _____ ', category);

    if (category != null && !Array.isArray(category)) {
      category = [category];
    }
    try {
      const insertProductId = Number(await ProductModelServices.addProduct([name, price]));
      if (category && insertProductId) {
        const categoryProduct = [];
        for (let i = 0; i < category.length; i++) {
          if (!category[i]) continue;
          categoryProduct.push([insertProductId, +category[i]]);
        }
        try {
          await ProductModelServices.addProductCategory([categoryProduct]);
          res.redirect('/products');
        } finally {
          res.redirect('/products');
        }
      } else {
        res.redirect('/products');
      }
    } catch (e) {
      res.send(e);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const categoryId = Number(req.params.id);
    try {
      await ProductModelServices.deleteProduct(categoryId);
      res.redirect('/products');
    } catch (e) {
      res.send(e);
    }
  }

  addToCart(req: Request, res: Response) {
    const id = req.params.id;
    req.session.orderList = req.session.orderList || {};
    req.session.orderList[id] = req.session.orderList[id] ? req.session.orderList[id] + 1 : 1;
    res.send('Ok');
  }
}

export default ProductServices;
