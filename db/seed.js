/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
const faker = require('faker');
const checkout = require('./connection.js');

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
    let values = [];
    values = [];
    for (let i = 0; i < 10000; i++) {
      const reviews = numReviews();
      const totalStars = (Math.random() * 5) * reviews;
      const newData = {
        type: "product",
        product_id: currentSize + i,
        name: faker.commerce.productName(),
        price: faker.finance.amount(0.01, 50.00, 2),
        size: randomSize(),
        color: randomColor(),
        numOfRatings: reviews,
        totalNumStars: totalStars,
        inventory: "Fill me in"
      };
      const newDataString = JSON.stringify(newData);
      values.push(newData);
    }
    // const stringValues = JSON.stringify(values);
    checkout.bulk({ docs: values }).then(() => {
      console.log(`Number of records inserted: ${10000} ${currentSize}`);
      currentSize += 10000;
      if (currentSize < targetSize) {
        values = [];
        console.log(`Calling again: ${currentSize}`);
        seedDataHelper();
      } else {
        console.log("Done!!!!");
      }
    });
    // db.connect.query(sql, [values], function (err, result) {
    //   if (err) throw err;
    //   console.log(`Number of records inserted: ${result.affectedRows} ${currentSize}`);
    //   currentSize += result.affectedRows;
    //   if (currentSize < targetSize) {
    //     values = [];
    //     console.log(`Calling again: ${currentSize}`);
    //     seedDataHelper();
    //   } else {
    //     console.log("Done!!!!");
    //   }
    // });
  };

  seedDataHelper();

};

seedData();
