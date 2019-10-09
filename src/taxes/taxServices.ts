'use strict';
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import config from '../config/config';
import TaxModelServicesClass from './taxModelServices';
const TaxModel = new TaxModelServicesClass(config.dbConnection);

class TaxServices {
  // eslint-disable-next-line no-useless-constructor
  constructor () {

  }

  async getListTax (req: Request, res: Response) {
    try {
      const taxes = await TaxModel.getListTax();
      res.render('listTax', {
        title: 'List taxes',
        taxes: taxes
      });
    } catch (e) {
      res.send(e);
    }
  }

  showAddTaxPage (req: Request, res: Response) {
    res.render('addTax.hbs');
  }

  async addTax (req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);
    const { name, value, description } = req.body;
    try {
      await TaxModel.addTax([name, value, description]);
      res.redirect('/taxes');
    } catch (e) {
      res.send(e);
    }
  }

  async deleteTax (req: Request, res: Response) {
    const taxId = Number(req.params.id);
    try {
      await TaxModel.deleteTax(taxId);
      res.redirect('/taxes');
    } catch (e) {
      res.send(e);
    }
  }
}

export default TaxServices;
