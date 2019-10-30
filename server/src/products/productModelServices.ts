import { Category } from '../interfaces/Category';
import { DB_MYSQL, ResultQuery } from '../interfaces/DB';
import { Product } from '../interfaces/Product';
import mysql from 'mysql2';
import { RedisModelServices } from '../redis/RedisModelServices';
import { redis } from '../config/config';

const redisModelServices = new RedisModelServices(redis);

export class ProductModelServices {
  private connection: mysql.Socket;
  private products: Product[];
  private query: string;
  private message: string;

  constructor(connectionConfig: DB_MYSQL) {
    this.connection = mysql.createPool(connectionConfig).promise();
  }

  async getProductsList(): Promise<Product[]> {
    this.query = 'CALL getProductsList()';
    try {
      [ [ this.products ] ] = await this.connection.query(this.query);
      return this.products;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProduct(newProduct: Product): Promise<{ message: string, insertId: number }> {
    this.query = 'INSERT INTO products (name, price) VALUES (?,?)';
    try {
      const insertProduct: ResultQuery = await this.connection.query(this.query, [ newProduct.name, newProduct.price ]);
      const insertId = insertProduct[ 0 ].insertId;
      this.message = `Product with id ${ insertId } was added`;
      redisModelServices.set({ [ Date.now() ]: this.message });
      return { message: this.message, insertId };
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProductCategory(newProductCategory: [ [ number, number ][] ]) {
    this.query = 'INSERT INTO productCategory (productId, categoryId) VALUES ?';
    try {
      return await this.connection.query(this.query, newProductCategory);
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteProduct(productId: Product[ 'id' ]): Promise<string> {
    this.query = 'DELETE FROM products WHERE id=?';
    try {
      await this.connection.query(this.query, productId);
      this.message = `Product with id ${ productId } was deleted`;
      redisModelServices.set({ [ Date.now() ]: this.message });
      return this.message;
    } catch (e) {
      throw new Error(e);
    }
  }
}
