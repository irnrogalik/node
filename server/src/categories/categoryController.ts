import { ResponseServer } from './../interfaces/ResponseServer';
import { Category } from '../interfaces/Category';
import { Request, Response } from 'express';
import { dbConnection } from '../config/config';
import { CategoryModelServices } from './categoryModelServices';
import { setResponse, setResponseError } from '../lib/functions';

const CategoryModel: CategoryModelServices = new CategoryModelServices(dbConnection);

export class CategoryController {
  async getCategoriesList(req: Request, res: Response): Promise<void> {
    try {
      const categories: Category[] = await CategoryModel.getCategoriesList();
      res.json(categories);
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async getOnlyCategoriesList(req: Request, res: Response): Promise<void> {
    try {
      const categories: Category[] = await CategoryModel.getOnlyCategoriesList();
      res.json(categories);
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async addCategory(req: Request, res: Response): Promise<void> {
    if (!req.body) res.json(setResponse('no data', 400));
    const newCategory: Category = req.body;
    try {
      const response: ResponseServer = setResponse(await CategoryModel.addCategory(newCategory));
      res.json(response);
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    const categoryId: Category[ 'id' ] = Number(req.params.id);
    try {
      const response: ResponseServer = setResponse(await CategoryModel.deleteCategory(categoryId));
      res.json(response);
    } catch (e) {
      res.json(setResponseError(e));
    }
  }
}
