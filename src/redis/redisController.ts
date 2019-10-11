'use strict';
import express from 'express';
import { getFormatDate } from '../lib/functions';
import { RedisModelServices } from './RedisModelServices';

const router = express.Router();
const redisModelServices = new RedisModelServices(6379);

router.route('/').get(async (req, res) => {
  const logs_ = await redisModelServices.get();
  const logs = [];

  for (const date in logs_) {
    logs.push({
      date: getFormatDate(new Date(Number(date))),
      log: logs_[date]
    });
  }
  res.render('log', { logs });
});

router.route('/get').get(async (req, res) => {
  const result = await redisModelServices.get();
  res.send(result);
});

router.route('/flush').get((req, res) => {
  const resultOfFlush = redisModelServices.flush();
  res.render('log', {
    result_flush: resultOfFlush ? 'Log is empty' : 'Something wrong. Try again'
  });
});
export = router;
