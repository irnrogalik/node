'use strict';
import express from 'express';
import createError from 'http-errors';
import session from 'express-session';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import taxesRouter from './taxes/taxController';
import categoriesRouter from './categories/categoryController';
import productsRouter from './products/productController';
import cartRouter from './cart/cartController';
// import indexRouter from './routes/index';

const port = 3010;
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, 'public')))
  .use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'test task'
  }));

app.use('/taxes', taxesRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);

app.get('/', (req, res) => {
  res.send('Index page');
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

export = app;
