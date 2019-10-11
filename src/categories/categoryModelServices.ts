'use strict';
import mysql from 'mysql2';
import { RedisModelServices } from '../redis/RedisModelServices';
const redisModelServices = new RedisModelServices(6379);

class CategoryModelServices {
  private connection: mysql.Socket;

  constructor(connectionConfig: Object) {
    this.connection = mysql.createPool(connectionConfig);
    this.connection = this.connection.promise();
  }

  async getListCategories() {
    try {
      const query = `SELECT Categories.Id, Categories.Name, Taxes.Name as TaxName FROM Categories 
      LEFT JOIN Taxes ON Categories.TaxId = Taxes.Id 
      ORDER BY Categories.Id`;
      const [categories] = await this.connection.query(query);
      return categories;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getListTaxes() {
    try {
      const query = 'SELECT * FROM getTaxes';
      const [taxes] = await this.connection.query(query);
      return taxes;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addCategory(newCategory: any[]) {
    try {
      const query = 'INSERT INTO Categories (name, taxId) VALUES (?,?)';
      const insertCategory = await this.connection.query(query, newCategory);
      const insertCategoryId = insertCategory.insertId;
      redisModelServices.set({
        [Date.now()]: `Category with id ${insertCategoryId} was added`
      });
      return insertCategoryId;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteCategory(categotyId: number) {
    try {
      const query = 'DELETE FROM Categories WHERE id=?';
      redisModelServices.set({
        [Date.now()]: `Category with id ${categotyId} was deleted`
      });
      return await this.connection.query(query, categotyId);
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default CategoryModelServices;
