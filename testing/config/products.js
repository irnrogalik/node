'use strict';

const productsConfig = {
  set1: {
    products: {
      // Product with id = 1 and starting price 16.00
      1: {
        price: 16.00,
        name: '16lb bag of Skittles'
      },
      // Product with id = 2 and starting price 99.99
      2: {
        price: 109.99,
        name: 'Walkman'
      },
      // Product with id = 3 and starting price 0.99
      3: {
        price: 0.99,
        name: 'Popcorn'
      }
    },
    order: {
      salesTaxes: 10.00,
      total: 126.98
    }
  },
  set2: {
    products: {
      // Product with id = 4 and starting price 11.00
      4: {
        price: 11.55,
        name: 'Vanilla-Hazelnut Coffee'
      },
      // Product with id = 5 and starting price 15 001.25
      5: {
        price: 17251.44,
        name: 'Vespa'
      }
    },
    order: {
      salesTaxes: 2250.74,
      total: 17262.99
    }
  },
  set3: {
    products: {
      // Product with id = 6 and starting price 75.99
      6: {
        price: 79.79,
        name: 'crate of Almond Snickers'
      },
      // Product with id = 7 and starting price 55.00
      7: {
        price: 60.5,
        name: 'Discman'
      },
      // Product with id = 8 and starting price 10.00
      8: {
        price: 11.5,
        name: 'Bottle of Wine'
      },
      // Product with id = 9 and starting price 997.99
      9: {
        price: 997.99,
        name: '300# bag of Fair-Trade Coffee'
      }
    },
    order: {
      salesTaxes: 10.8,
      total: 1149.78
    }
  }

};

module.exports = productsConfig;
