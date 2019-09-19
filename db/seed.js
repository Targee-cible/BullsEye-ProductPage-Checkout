/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */

const faker = require('faker');
const db = require('./mysql.js');

//  Create Size Array
const sizes = ['S', 'M', 'L', 'XL', '2XL'];

//  Create Color Array with object {name, url}
//  URL will have default value until i am able to upload my own swatches
const colors = ['Red', 'Blue', 'Green', 'Orange', 'Black', 'Purple'];
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
const seedData = function () {
  const targetSize = 10000000;
  let currentSize = 0;

  const seedDataHelper = function () {
    const sql = "INSERT INTO product (name, price, numOfRatings, totalNumStars) VALUES ?";
    let values = [
    ];
    values = [];
    for (let i = 0; i < 10000; i++) {
      const reviews = numReviews();
      const totalStars = (Math.random() * 5) * reviews;
      values.push([
        faker.commerce.productName(),
        faker.finance.amount(0.01, 50.00, 2),
        reviews,
        totalStars
      ]);
    }
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

  const sqlInventory = "INSERT INTO inventory (store_Id, product_Id, quantity, size, color) VALUES ?";
  const storeInventory = [
    [1, 1, 55, 'L', 'Blue'],
    [2, 2, 34, 'S', 'Orange']
  ];
  db.connect.query(sqlInventory, [storeInventory], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
};

seedData();

