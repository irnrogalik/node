import express from 'express';
import { CategoryServices } from './categoryController';

const CategoryController: CategoryServices = new CategoryServices();
const router: express.Router = express.Router();

router.route('/')
  .get(CategoryController.getCategoriesList);

router.route('/get')
  .get(CategoryController.getOnlyCategoriesList);

router.route('/add')
  .post(CategoryController.addCategory);

router.route('/delete/:id')
  .post(CategoryController.deleteCategory);

export = router;
