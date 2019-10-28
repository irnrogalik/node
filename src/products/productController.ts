import { Product } from '../interfaces/Product';
import { Request, Response } from 'express';
import { dbConnection } from '../config/config';
import { ProductModelServices } from './productModelServices';
import { setResponseError, setResponse } from '../lib/functions';

const productModelServices: ProductModelServices = new ProductModelServices(dbConnection);

export class ProductServices {
  constructor() { }

  async getListProducts(req: Request, res: Response): Promise<void> {
    try {
      res.json(await productModelServices.getProductsList());
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async addProduct(req: Request, res: Response): Promise<void> {
    if (!req.body) res.json(setResponse('no data', 400));
    const newProduct: Product = req.body;
    try {
      const addResult: { message: string, insertId: number } = await productModelServices.addProduct(newProduct);
      if (newProduct.categories && newProduct.categories.length > 0) {
        const categoryProduct: [ number, number ][] = [];
        for (let i = 0; i < newProduct.categories.length; i++) {
          if (!newProduct.categories[ i ]) continue;
          categoryProduct.push([ addResult.insertId, newProduct.categories[ i ] ]);
        }
        try {
          productModelServices.addProductCategory([ categoryProduct ]);
        } catch (e) {
          res.json(setResponse('Something wrong with binding categories. Check the product', 400));
        }
      }
      res.json(setResponse(addResult.message));
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const productId: Product[ 'id' ] = Number(req.params.id);
    try {
      res.json(setResponse(await productModelServices.deleteProduct(productId)));
    } catch (e) {
      res.json(setResponseError(e));
    }
  }
}
