'user strict';
import mysql from 'mysql2';

class TaxModelServices {
    private connection: mysql.Socket;

    constructor (connectionConfig: Object) {
      this.connection = mysql.createPool(connectionConfig);
      this.connection = this.connection.promise();
    }

    async getListTax (): Promise<object> {
      const query = 'SELECT * FROM Taxes';
      try {
        const result = await this.connection.query(query);
        return result[0]; // list of rows
      } catch (e) {
        throw new Error(e);
      }
    }

    async addTax (newTax: any[]): Promise<boolean> {
      const query = 'INSERT INTO Taxes (name, value) VALUES (?,?)';
      try {
        return await this.connection.query(query, newTax);
      } catch (e) {
        throw new Error(e);
      }
    }

    async deleteTax (taxId: number): Promise<boolean> {
      const query = 'DELETE FROM Taxes WHERE id=?';
      try {
        return await this.connection.query(query, taxId);
      } catch (e) {
        throw new Error(e);
      }
    }
}

export default TaxModelServices;
