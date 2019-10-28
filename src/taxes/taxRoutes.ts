import express from 'express';
import { TaxServices } from './taxController';

const router: express.Router = express.Router();
const taxServices: TaxServices = new TaxServices();

router.route('/')
  .get(taxServices.getTaxesList);

router.route('/get')
  .get(taxServices.getOnlyTaxesList);

router.route('/add')
  .post(taxServices.addTax);

router.route('/delete/:id')
  .get(taxServices.deleteTax);

export = router;
