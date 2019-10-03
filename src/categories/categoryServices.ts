'use strict';
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import config from '../config/config';

import CategoryModelClass from './categoryModelServices';
const CategoryModel = new CategoryModelClass(config.dbConnection);

class CategoryServices {
  // eslint-disable-next-line no-useless-constructor
  constructor () {

  }

  async getListCategories (req: Request, res: Response) {
    try {
      const categories = await CategoryModel.getListCategories();
      res.render('listCategory', {
        title: 'Categories',
        categories: categories
      });
    } catch (e) {
      res.send(e);
    }
  }

  async showAddCategoryPage (req: Request, res: Response) {
    try {
      const taxes = await CategoryModel.getListTaxes();
      res.render('addCategory', {
        title: 'Add category',
        taxes: taxes
      });
    } catch (e) {
      res.send(e);
    }
  }

  async addCategory (req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);
    const name = req.body.name;
    const taxId = req.body.tax || null;
    try {
      await CategoryModel.addCategory([name, taxId]);
      res.redirect('/categories');
    } catch (e) {
      res.send(e);
    }
  }

  async deleteCategory (req: Request, res: Response) {
    const categoryId = Number(req.params.id);
    try {
      await CategoryModel.deleteCategory(categoryId);
      res.redirect('/categories');
    } catch (e) {
      res.send(e);
    }
  }
}

export default CategoryServices;
