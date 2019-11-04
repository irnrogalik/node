import { ResponseServer } from './../interfaces/ResponseServer';
import { Request, Response } from 'express';
import { dbConnection } from '../config/config';
import { TaxModelServices } from './taxModelServices';
import { setResponse, setResponseError } from '../lib/functions';
import { Tax } from '../interfaces/Tax';

const TaxModel: TaxModelServices = new TaxModelServices(dbConnection);

export class TaxController {
  async getTaxesList(req: Request, res: Response): Promise<void> {
    try {
      const taxes:Tax[] = await TaxModel.getTaxesList();
      res.json(taxes);
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async getOnlyTaxesList(req: Request, res: Response): Promise<void> {
    try {
      const taxes: Tax[] = await TaxModel.getOnlyTaxesList();
      res.json(taxes);
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async addTax(req: Request, res: Response): Promise<void> {
    if (!req.body) res.json(setResponse('no data', 400));
    const newTax: Tax = req.body;
    try {
      const response:ResponseServer = setResponse(await TaxModel.addTax(newTax));
      res.json(response);
    } catch (e) {
      res.json(setResponseError(e));
    }
  }

  async deleteTax(req: Request, res: Response): Promise<void> {
    const taxId: Tax[ 'id' ] = Number(req.params.id);
    try {
      const response: ResponseServer = setResponse(await TaxModel.deleteTax(taxId));
      res.json(response);
    } catch (e) {
      res.json(setResponseError(e));
    }
  }
}
