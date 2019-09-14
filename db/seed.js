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
const numReviews = function() {
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
    const sql = "INSERT INTO product (name, price, size, color, numOfRatings, totalNumStars) VALUES ?";
    let values = [
    ];
    values = [];
    for (let i = 0; i < 10000; i++) {
      const reviews = numReviews();
      const totalStars = (Math.random() * 5) * reviews;
      values.push([
        faker.commerce.productName(),
        faker.finance.amount(0.01, 50.00, 2),
        randomSize(),
        randomColor(),
        reviews,
        totalStars
      ]);
    }
    db.query(sql, [values], function (err, result) {
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

  seedDataHelper();
};

seedData();

const sqlStore = "INSERT INTO stores (streetAddress, city, zipCode) VALUES ?";
const storeData = [
  ['123 main st', 'city1', 95043],
  ['23456 fjdfj', 'sdd', 48909]
];
db.query(sqlStore, [storeData], function (err, result) {
  if (err) throw err;
  console.log("Number of records inserted: " + result.affectedRows);
});

const sqlInventory = "INSERT INTO inventory (store_Id, product_Id, quantity, size, color) VALUES ?";
const storeInventory = [
  [1, 1, 55, 'L', 'Blue'],
  [2, 2, 34, 'S', 'Orange']
];
db.query(sqlInventory, [storeInventory], function (err, result) {
  if (err) throw err;
  console.log("Number of records inserted: " + result.affectedRows);
});

// /*
//   Create Reviews
// */
// const createReviews = (products) => new Promise((resolve, reject) => {
//   const updatedReviews = [];

//   //  For each Product
//   for (let i = 0; i < products.length; i += 1) {
//     const product = products[i];
//     //  Generate random number of reviews (max 100)
//     const numOfReviews = faker.random.number({ min: 1, max: 100 });
//     for (let j = 0; j < numOfReviews; j += 1) {
//       //  create n reviews
//       //  rating: random # out of 5
//       const rating = faker.random.number({ min: 1, max: 5 });
//       product.reviews.push({ rating });
//     }
//     const query = product.save();
//     updatedReviews.push(query);
//   }

//   Promise.all(updatedReviews)
//     .then(() => {
//       resolve('Reviews Created');
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });

// /*
//   Seed Location Collection
// */
// //  Create two locations
// const seedLocationCollection = () => new Promise((resolve, reject) => {
//   const createdLocations = [];
//   for (let i = 1; i <= 2; i += 1) {
//     const location = {
//       storeId: i,
//       streetAddress: faker.address.streetAddress(),
//       city: faker.address.city(),
//       state: faker.address.stateAbbr(),
//       zipCode: faker.address.zipCode('#####'),
//     };

//     createdLocations.push(Locations.create(location));
//   }

//   Promise.all(createdLocations)
//     .then((locations) => {
//       resolve(locations);
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });

// /*
//  Seed Inventory Collection
// */
// const seedInventoryCollection = (products, locations) => {
//   const createdInventory = [];

//   return new Promise((resolve, reject) => {
//     //  ForEach Product Id
//     products.forEach((product) => {
//       //  ForEach Size
//       product.size.forEach((size) => {
//         //  ForEach Color
//         product.color.forEach((color) => {
//           //  ForEach Location
//           locations.forEach((storeId) => {
//             //  Create Record with random number (max 15)
//             const quantity = faker.random.number({ min: 0, max: 15 });
//             const item = {
//               productId: product.productId,
//               size,
//               color: color.color,
//               storeId: storeId.storeId,
//               quantity,
//             };

//             createdInventory.push(Inventory.create(item));
//           });
//         });
//       });
//     });

//     Promise.all(createdInventory)
//       .then((results) => {
//         resolve(results);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };


// /*
//   Run Promise Chain to Seed DB
//  */
// removeExistingItems()
//   .then(() => seedProductCollection())
//   .then(() => seedLocationCollection())
//   .then(() => {
//     Products.find({})
//       .then((products) => {
//         createReviews(products)
//           .then(() => {
//             Locations.find({})
//               .then((locations) => seedInventoryCollection(products, locations))
//               .then(() => {
//                 db.connection.close();
//               });
//           });
//       });
//   })
//   .catch((err) => {
//     // eslint-disable-next-line no-console
//     console.log('Error: ', err);
//   });
