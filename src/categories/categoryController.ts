'use strict';
import express from 'express';
import CategoryControllerClass from './categoryServices';

const CategoryController = new CategoryControllerClass();
const router = express.Router();

router.route('/')
  .get(CategoryController.getListCategories);

router.route('/add')
  .get(CategoryController.showAddCategoryPage)
  .post(CategoryController.addCategory);

router.route('/delete/:id')
  .post(CategoryController.deleteCategory);

export = router;
