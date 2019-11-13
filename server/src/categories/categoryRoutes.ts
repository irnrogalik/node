import express from 'express';
import { CategoryController } from './categoryController';

const categoryController: CategoryController = new CategoryController();
const router: express.Router = express.Router();

router.route('/')
  .get(categoryController.getCategoriesList);

router.route('/get')
  .get(categoryController.getOnlyCategoriesList);

router.route('/add')
  .post(categoryController.addCategory);

router.route('/delete/:id')
  .post(categoryController.deleteCategory);

export default router;
