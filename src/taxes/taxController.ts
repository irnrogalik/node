'use strict';
import express from 'express';
import TaxServicesClass from './taxServices';

const router = express.Router();
const TaxServices = new TaxServicesClass();

router.route('/')
  .get(TaxServices.getListTax);

router.route('/add')
  .get(TaxServices.showAddTaxPage)
  .post(TaxServices.addTax);

router.route('/delete/:id')
  .post(TaxServices.deleteTax);

export = router;
