import express from 'express';
import { TaxController } from './taxController';

const router: express.Router = express.Router();
const taxController: TaxController = new TaxController();

router.route('/')
  .get(taxController.getTaxesList);

router.route('/get')
  .get(taxController.getOnlyTaxesList);

router.route('/add')
  .post(taxController.addTax);

router.route('/delete/:id')
  .get(taxController.deleteTax);

export default router;
