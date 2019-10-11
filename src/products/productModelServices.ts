'user strict';
import mysql from 'mysql2';
import { RedisModelServices } from '../redis/RedisModelServices';
const redisModelServices = new RedisModelServices(6379);

class ProductModelServices {
  private connection: mysql.Socket;

  constructor(connectionConfig: Object) {
    this.connection = mysql.createPool(connectionConfig);
    this.connection = this.connection.promise();
  }

  async getListProducts() {
    // const query = `SELECT Products.Id, Products.Name, Products.Price, GROUP_CONCAT(Categories.Name) as CategoryName FROM Products
    // LEFT JOIN ProductCategory ON Products.Id = ProductCategory.ProductId
    // LEFT JOIN Categories on ProductCategory.CategoryId = Categories.Id
    // GROUP BY Products.Id, Products.Name, Products.Price;`;
    const query = 'CALL getProductsList()';
    try {
      let [productList] = await this.connection.query(query);
      productList = productList[0];
      return productList;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getListCategories() {
    const query = 'SELECT * FROM Categories';
    try {
      const [categories] = await this.connection.query(query);
      return categories;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProduct(newProduct: any[]) {
    /**
     * *** не добавляет товар с пустой категорией
     * 
     */
    const query = 'INSERT INTO Products (Name, Price) VALUES (?,?)';
    try {
      const [insertProduct] = await this.connection.query(query, newProduct);
      const insertId = insertProduct.insertId;
      redisModelServices.set({
        [Date.now()]: `Product with id ${insertId} was added`
      });
      return insertId;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProductCategory(newProductCategory) {
    const query = 'INSERT INTO ProductCategory (ProductId, CategoryId) VALUES ?';
    try {
      return await this.connection.query(query, newProductCategory);
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteProduct(productId: number) {
    const query = 'DELETE FROM Products WHERE id=?';
    try {
      await this.connection.query(query, productId);
      redisModelServices.set({
        [Date.now()]: `Product with id ${productId} was deleted`
      });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default ProductModelServices;
