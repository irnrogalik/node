import { Request, Response } from 'express';
import { dbConnection } from '../config/config';
import { TaxModelServices } from './taxModelServices';
import { setResponse, setResponseError } from '../lib/functions';
import { Tax } from '../interfaces/Tax';

const TaxModel: TaxModelServices = new TaxModelServices(dbConnection);

export class TaxServices {
  constructor() { }

  async getTaxesList(req: Request, res: Response): Promise<void> {
    try {
      res.json(await TaxModel.getTaxesList());
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async getOnlyTaxesList(req: Request, res: Response): Promise<void> {
    try {
      res.json(await TaxModel.getOnlyTaxesList());
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async addTax(req: Request, res: Response): Promise<void> {
    if (!req.body) res.json(setResponse('no data', 400));
    const newTax: Tax = req.body;
    try {
      res.json(setResponse(await TaxModel.addTax(newTax)));
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async deleteTax(req: Request, res: Response): Promise<void> {
    const taxId: Tax[ 'id' ] = Number(req.params.id);
    try {
      res.json(setResponse(await TaxModel.deleteTax(taxId)));
    } catch (e) {
      res.json(setResponseError(e));
    }
  }
}
