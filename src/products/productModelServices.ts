'user strict';
import mysql from 'mysql2';

class ProductModelServices {
  private connection: mysql.Socket;

  constructor (connectionConfig: Object) {
    this.connection = mysql.createPool(connectionConfig);
    this.connection = this.connection.promise();
  }

  async getListProducts () {
    const query = `SELECT Products.Id, Products.Name, Products.Price, GROUP_CONCAT(Categories.Name) as CategoryName FROM Products 
    LEFT JOIN ProductCategory ON Products.Id = ProductCategory.ProductId
    LEFT JOIN Categories on ProductCategory.CategoryId = Categories.Id 
    GROUP BY Products.Id, Products.Name, Products.Price;`;
    try {
      const [productList] = await this.connection.query(query);
      return productList;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getListCategories () {
    const query = 'SELECT * FROM Categories';
    try {
      const [categories] = await this.connection.query(query);
      return categories;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProduct (newProduct: any[]) {
    const query = 'INSERT INTO Products (Name, Price) VALUES (?,?)';
    try {
      const [insertProduct] = await this.connection.query(query, newProduct);
      return insertProduct.insertId;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProductCategory (newProductCategory) {
    const query = 'INSERT INTO ProductCategory (ProductId, CategoryId) VALUES ?';
    try {
      return await this.connection.query(query, newProductCategory);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getTaxForProductFromCategory (category) {
    const categories = category.join(',');
    const query = `SELECT DISTINCT(Categories.TaxId) FROM Categories WHERE Categories.Id IN (${categories}) AND Categories.TaxId IS NOT NULL`;
    try {
      const [taxes] = await this.connection.query(query);
      return taxes;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteProduct (productId: number) {
    const query = 'DELETE FROM Products WHERE id=?';
    try {
      return await this.connection.query(query, productId);
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default ProductModelServices;
