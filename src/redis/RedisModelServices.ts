import asyncRedis from 'async-redis';
import { DB_REDIS, RedisObject } from '../interfaces/DB';

export class RedisModelServices {
  private client: asyncRedis;

  constructor(option: DB_REDIS) {
    this.client = asyncRedis.createClient({ option });
  }

  async set(valueObject: RedisObject<string>): Promise<void> {
    this.client.hmset('events', valueObject);
  }

  async get(): Promise<RedisObject<string>[]> {
    return await this.client.hgetall('events');
  }

  async flush(): Promise<Boolean> {
    return await this.client.flushall();
  }
}
