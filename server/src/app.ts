import cookieParser from 'cookie-parser';
import express from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';
import cartRouter from './cart/cartRoutes';
import categoriesRouter from './categories/categoryRoutes';
import { initApp } from './config/config';
import productsRouter from './products/productRoutes';
import redisRouter from './redis/redisRouterController';
import taxesRouter from './taxes/taxRoutes';

const app = express();

const headers: object = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json'
};

app.use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.set(headers);
  next();
});

app.use('/taxes', taxesRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/log', redisRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (e, req, res, next) {
  res.locals.message = e.message;
  res.locals.error = req.app.get('env') === 'development' ? e : {};

  res.status(e.status || 500);
  res.render('error');
});

app.listen(initApp.port, initApp.host, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${ initApp.port } `);
});

export = app;
