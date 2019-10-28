import { Category } from '../interfaces/Category';
import { Request, Response } from 'express';
import { dbConnection } from '../config/config';
import { CategoryModelServices } from './categoryModelServices';
import { setResponse, setResponseError } from '../lib/functions';

const CategoryModel: CategoryModelServices = new CategoryModelServices(dbConnection);

export class CategoryServices {
  constructor() { }

  async getCategoriesList(req: Request, res: Response): Promise<void> {
    try {
      res.json(await CategoryModel.getCategoriesList());
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async getOnlyCategoriesList(req: Request, res: Response): Promise<void> {
    try {
      res.json(await CategoryModel.getOnlyCategoriesList());
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async addCategory(req: Request, res: Response): Promise<void> {
    if (!req.body) res.json(setResponse('no data', 400));
    const newCategory: Category = req.body;
    try {
      res.json(setResponse(await CategoryModel.addCategory(newCategory)));
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    const categoryId: Category[ 'id' ] = Number(req.params.id);
    try {
      res.json(setResponse(await CategoryModel.deleteCategory(categoryId)));
    } catch (e) {
      res.json(setResponseError(e));
    }
  }
}
