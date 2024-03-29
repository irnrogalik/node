import { DB_MYSQL, DB_REDIS } from '../interfaces/DB';

export const initApp: { port: number, host: string } = {
  port: 3000,
  host: 'localhost'
};

export const dbConnection: DB_MYSQL = {
  host: 'db',
  port: 3306,
  user: 'test',
  password: 'test',
  database: 'test_task'
};

export const redis: DB_REDIS = {
  port: 6379,
  host: 'redis'
};
