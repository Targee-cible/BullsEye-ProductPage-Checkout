/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */

const faker = require('faker');
const db = require('./mysql.js');

//  Create Size Array
const realSizes = ['S', 'M', 'L', 'XL', '2XL'];
const sizes = JSON.stringify(realSizes);
//  Create Color Array with object {name, url}
//  URL will have default value until i am able to upload my own swatches
const realColors = [
  {
    color: 'Red',
  },
  {
    color: 'Blue',
  },
  {
    color: 'Green',
  },
  {
    color: 'Orange',
  },
  {
    color: 'Black',
  },
  {
    color: 'Purple',
  },
];
const colors = JSON.stringify(realColors);
const numReviews = function () {
  return Math.round(Math.random() * 40);
}

const randomSize = function () {
  const index = Math.round(Math.random() * 4);
  return sizes[index];
}
const randomColor = function () {
  const index = Math.round(Math.random() * 5);
  return colors[index];
}
const sqlStore = "INSERT INTO stores (streetAddress, city, state, zipCode) VALUES ?";
const storeData = [
  ['123 Main st', 'San Jose', 'CA', 95043],
  ['23456 Broadway Ave.', 'Los Angeles', 'CA', 48909],
  ['12234 MLK Blvd.', 'Austin', 'TX', 12345]
];
db.connect.query(sqlStore, [storeData], function (err, result) {
  if (err) throw err;
  console.log("Number of records inserted: " + result.affectedRows);
});

const seedData = function () {
  const targetSize = 10000000;
  let currentSize = 0;

  const seedDataHelper = function () {
    const sql = "INSERT INTO product (name, price, colors, size, numOfRatings, totalNumStars) VALUES ?";
    let values = [
    ];
    values = [];
    for (let i = 0; i < 10000; i++) {
      const reviews = numReviews();
      const totalStars = (Math.random() * 5) * reviews;
      values.push([
        faker.commerce.productName(),
        faker.finance.amount(0.01, 50.00, 2),
        colors,
        sizes,
        totalStars,
        reviews
      ]);
    }
    // const firstTen = values.slice(0, 10);
    // let inventoryArr = [];
    // for (let i = 0; i < firstTen.length; i++) {

    // }
    db.connect.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log(`Number of records inserted: ${result.affectedRows} ${currentSize}`);
      currentSize += result.affectedRows;
      if (currentSize < targetSize) {
        values = [];
        console.log(`Calling again: ${currentSize}`);
        seedDataHelper();
      } else {
        console.log("Done!!!!");
      }
    });
  };

  seedDataHelper()

  const sqlInventory = "INSERT INTO inventory (store_Id, product_Id, quantity, size, color) VALUES ?";
  const storeInventory = [];
  for (let productId = 1; productId <= 100; productId++) {
    for (let storeId = 1; storeId <= 3; storeId++) {
      for (let sizeIndex = 0; sizeIndex < realSizes.length; sizeIndex++) {
        for (let colorIndex = 0; colorIndex < realColors.length; colorIndex++) {
          const inventory = [storeId, productId, faker.random.number({ min: 0, max: 15 }), realSizes[sizeIndex], realColors[colorIndex]];
          storeInventory.push(inventory);
        }
      }
    }
  }
  db.connect.query(sqlInventory, [storeInventory], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
};

seedData();
