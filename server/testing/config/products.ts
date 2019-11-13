import { OrderAmount } from '../../src/interfaces/Cart';
import { Product } from '../../src/interfaces/Product';

interface CartForTest {
  [ key: string ]: CartContent
}

export interface CartContent {
  products: {
    [ key: number ]: Product
  },
  order: OrderAmount
}

export const productsConfig: CartForTest = {
  set1: {
    products: {
      // Product with id = 1 and starting finalPrice 16.00
      1: {
        price: 16.00,
        finalPrice: 16.00,
        name: '16lb bag of Skittles',
        taxValue: null
      },
      // Product with id = 2 and starting finalPrice 99.99
      2: {
        price: 99.99,
        finalPrice: 109.99,
        name: 'Walkman',
        taxValue: '10'
      },
      // Product with id = 3 and starting finalPrice 0.99
      3: {
        price: 0.99,
        finalPrice: 0.99,
        name: 'Popcorn',
        taxValue: null
      }
    },
    order: {
      totalTax: 10.00,
      total: 126.98
    }
  },
  set2: {
    products: {
      // Product with id = 4 and starting finalPrice 11.00
      4: {
        price: 11.00,
        finalPrice: 11.55,
        name: 'Vanilla-Hazelnut Coffee',
        taxValue: '5'
      },
      // Product with id = 5 and starting finalPrice 15 001.25
      5: {
        price: 15001.25,
        finalPrice: 17251.5,
        name: 'Vespa',
        taxValue: '10, 5'
      }
    },
    order: {
      totalTax: 2250.80,
      total: 17263.05
    }
  },
  set3: {
    products: {
      // Product with id = 6 and starting finalPrice 75.99
      6: {
        price: 75.99,
        finalPrice: 79.79,
        name: 'crate of Almond Snickers',
        taxValue: '5'
      },
      // Product with id = 7 and starting finalPrice 55.00
      7: {
        price: 55.00,
        finalPrice: 60.5,
        name: 'Discman',
        taxValue: '10'
      },
      // Product with id = 8 and starting finalPrice 10.00
      8: {
        price: 10.00,
        finalPrice: 11.5,
        name: 'Bottle of Wine',
        taxValue: '10, 5'
      },
      // Product with id = 9 and starting finalPrice 997.99
      9: {
        price: 997.99,
        finalPrice: 997.99,
        name: '300# bag of Fair-Trade Coffee',
        taxValue: null
      }
    },
    order: {
      totalTax: 10.8,
      total: 1149.78
    }
  }
};
