import mysql from 'mysql2';
import { redis } from '../config/config';
import { RedisModelServices } from '../redis/RedisModelServices';
import { Category } from '../interfaces/Category';
import { DB_MYSQL, ResultQuery } from '../interfaces/DB';
import { Tax } from '../interfaces/Tax';

const redisModelServices: RedisModelServices = new RedisModelServices(redis);

export class CategoryModelServices {
  private connection: mysql.Socket;
  private categories: Category[];
  private query: string;
  private message: string;

  constructor(connectionConfig: DB_MYSQL) {
    this.connection = mysql.createPool(connectionConfig).promise();
  }

  async getCategoriesList(): Promise<Category[]> {
    try {
      this.query = `SELECT categories.id, categories.name, taxes.name as taxName FROM categories 
      LEFT JOIN taxes ON categories.taxId = taxes.Id 
      ORDER BY categories.id`;
      [ this.categories ] = await this.connection.query(this.query);
      return this.categories;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getOnlyCategoriesList(): Promise<Category[]> {
    this.query = 'SELECT * FROM categories';
    try {
      const [ categories ]: [ Category[] ] = await this.connection.query(this.query);
      return categories;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addCategory(newCategory: Category): Promise<string> {
    try {
      this.query = 'INSERT INTO categories (name, taxId) VALUES (?,?)';
      const insertCategory: ResultQuery = await this.connection.query(this.query, [ newCategory.name, newCategory.taxId ]);
      this.message = `Category with id ${ insertCategory[ 0 ].insertId } was added`;
      redisModelServices.set({ [ Date.now() ]: this.message });
      return this.message;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteCategory(categoryId: Category[ 'id' ]): Promise<string> {
    try {
      this.query = 'DELETE FROM categories WHERE id=?';
      await this.connection.query(this.query, categoryId);
      this.message = `Category with id ${ categoryId } was deleted`;
      redisModelServices.set({ [ Date.now() ]: this.message });
      return this.message;
    } catch (e) {
      throw new Error(e);
    }
  }
}
