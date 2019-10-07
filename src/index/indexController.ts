'use strict';
import express from 'express';
import IndexServicesClass from './indexServices';

const router = express.Router();
const IndexServices = new IndexServicesClass();

router.route('/')
  .get(IndexServices.getHomePage);

export = router;
