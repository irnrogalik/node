'user strict';
import mysql from 'mysql2';

class CartModelServices {
    private connection: mysql.Socket;

    constructor (connectionConfig: Object) {
      this.connection = mysql.createConnection(connectionConfig);
      this.connection = this.connection.promise();
    }

    async getListProductsInCart (orderListCart: any[]): Promise<object> {
      try {
        const query = 'SELECT Products.Id, Products.Name, Products.Price, SUM(Products.Price * (Taxes.Value / 100)) as ProductTax From Products ' +
                'left join ProductTaxes on Products.Id = ProductTaxes.ProductId ' +
                'left join Taxes on ProductTaxes.TaxId = Taxes.Id ' +
                'WHERE Products.Id IN (' + Object.keys(orderListCart).join(',') + ')' +
                'group by Products.Id, Products.Name, Products.Price';

        const [result] = await this.connection.query(query);
        const orderList = {
          products: [],
          order: {
            total: 0,
            totalTax: 0
          }
        };

        for (const product of result) {
          const prod = { Id: '', Name: '', Price: '' };
          const price = Number(product.Price || 0);
          const priceTax = Number(product.ProductTax || 0);
          const totalPrice = (price + priceTax).toFixed(2);

          prod.Id = product.Id;
          prod.Name = product.Name;
          prod.Price = totalPrice;

          orderList.order.total += Number(totalPrice);
          orderList.order.totalTax += Number(priceTax);

          orderList.products.push(prod);
        }

        orderList.order.total = Number(orderList.order.total.toFixed(2));
        orderList.order.totalTax = Number(orderList.order.totalTax.toFixed(2));
        return orderList;
      } catch (e) {
        throw new Error(e);
      }
    }

    async addOrder (orderListCart: any[]) {
      try {
        const orderList:any = await this.getListProductsInCart(orderListCart);

        const query = `INSERT INTO Orders(SalesTaxes, Total) VALUES (${orderList.order.totalTax}, ${orderList.order.total})`;
        const [resultInsert] = await this.connection.query(query);
        const newOrderId = resultInsert.insertId;
        try {
          await this.addOrderList(newOrderId, orderListCart);
          return orderList;
        } catch (e) {
          throw new Error(e);
        }
      } catch (e) {
        throw new Error(e);
      }
    }

    async addOrderList (newOrderId, orderListCart) {
      try {
        const orderListId = [];
        for (const productId in orderListCart) {
          orderListId.push([newOrderId, productId, orderListCart[productId]]);
        }
        const query = 'INSERT INTO OrderList (OrderId, ProductId, Quantity) VALUES ?';
        return await this.connection.query(query, [orderListId]);
      } catch (e) {
        throw new Error(e);
      }
    }

    async getOrderList (): Promise<object> {
      try {
        const query = 'SELECT * FROM Orders';
        const [orderList] = await this.connection.query(query);
        for (let i = 0; i < orderList.length; i++) {
          orderList[i].Date = getFormatDate(orderList[i].Date);
        }
        return orderList;
      } catch (e) {
        throw new Error(e);
      }
    }

    async deleteOrder (OrderId: number): Promise<number> {
      try {
        const query = 'DELETE FROM Orders WHERE id=?';
        return await this.connection.query(query, OrderId);
      } catch (e) {
        throw new Error(e);
      }
    }
}

function getFormatDate (date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export = CartModelServices;
