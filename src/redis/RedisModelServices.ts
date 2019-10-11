'use strict';
// eslint-disable-next-line no-unused-vars
import asyncRedis from 'async-redis';

export class RedisModelServices {
  private client: asyncRedis;

  constructor(post) {
    this.client = asyncRedis.createClient(post);
  }

  async set(valueObject: Object) {
    this.client.hmset("events", valueObject);
  }

  async get(): Promise<Object> {
    return await this.client.hgetall("events");
  }

  async flush(): Promise<Boolean> {
    return await this.client.flushall();
  }

}