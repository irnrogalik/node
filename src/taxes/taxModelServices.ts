import mysql from 'mysql2';
import { redis } from '../config/config';
import { DB_MYSQL, ResultQuery } from '../interfaces/DB';
import { Tax } from '../interfaces/Tax';
import { RedisModelServices } from '../redis/RedisModelServices';

const redisModelServices: RedisModelServices = new RedisModelServices(redis);

export class TaxModelServices {
  private connection: mysql.Socket;
  query: string;
  message: string;
  taxes: Tax[];

  constructor(connectionConfig: DB_MYSQL) {
    this.connection = mysql.createPool(connectionConfig).promise();
  }

  async getTaxesList(): Promise<Tax[]> {
    this.query = 'SELECT * FROM taxes';
    try {
      [ this.taxes ] = await this.connection.query(this.query);
      return this.taxes;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getOnlyTaxesList(): Promise<Tax[]> {
    try {
      this.query = 'SELECT * FROM getTaxes';
      [ this.taxes ] = await this.connection.query(this.query);
      return this.taxes;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addTax(newTax: Tax): Promise<string> {
    this.query = 'INSERT INTO taxes (name, value, description) VALUES (?,?,?)';
    try {
      const insertTax: ResultQuery = await this.connection.query(this.query, [ newTax.name, newTax.value, newTax.description ]);
      this.message = `Tax with id ${ insertTax[ 0 ].insertId } was added`;
      redisModelServices.set({ [ Date.now() ]: this.message });
      return this.message;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteTax(taxId: Tax[ 'id' ]): Promise<string> {
    this.query = 'DELETE FROM taxes WHERE id=?';
    try {
      await this.connection.query(this.query, taxId);
      this.message = `Tax with id ${ taxId } was deleted`;
      redisModelServices.set({ [ Date.now() ]: this.message });
      return this.message;
    } catch (e) {
      throw new Error(e);
    }
  }
}
