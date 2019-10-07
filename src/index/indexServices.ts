'use strict';
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';

class IndexServices {
  // eslint-disable-next-line no-useless-constructor
  constructor () {

  }

  getHomePage (req: Request, res: Response) {
    res.render('index', { title: 'Express' });
  }
}

export default IndexServices;
