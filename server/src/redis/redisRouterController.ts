import express from 'express';
import { redis } from '../config/config';
import { DisplayRedisObject, RedisObject } from '../interfaces/DB';
import { getFormatDate } from '../lib/functions';
import { RedisModelServices } from './RedisModelServices';

const router: express.Router = express.Router();
const redisModelServices: RedisModelServices = new RedisModelServices(redis);

router.route('/').get(async (req: express.Request, res: express.Response) => {
  const logs_: RedisObject<string>[] = await redisModelServices.get();
  const logs: DisplayRedisObject[] = [];
  for (const date in logs_) {
    logs.push({ date: getFormatDate(new Date(Number(date))), descriptionLog: logs_[ date ] });
  }
  res.json(logs);
});

router.route('/flush').get((req: express.Request, res: express.Response) => {
  const resultOfFlush: Promise<Boolean> = redisModelServices.flush();
  const response: { resultFlush: string } = { resultFlush: resultOfFlush ? 'Log was deleted' : 'Something wrong. Try again' };
  res.json(response);
});

export default router;
