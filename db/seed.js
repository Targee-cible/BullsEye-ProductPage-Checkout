/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
const nano = require('nano')('http://localhost:5984');
const checkout = nano.db.use('sdccheckout');

// checkout.insert({ type: 'product', name: 'pants', price: 43.25, color: 'Black', numOfRatings: 0, totalNumStars: 0, inventory: 'TBD' }).then((body) => {
//   console.log(body);
// });




// "value": {
//   "type": "product",
//   "name": "shoes",
//   "price": "133.45",
//   "size": "L",
//   "color": "Blue",
//   "numOfRatings": "30",
//   "totalNumStars": "150",
//   "inventory": "Fill me in",

const faker = require('faker');

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
    for (let i = 0; i < 10; i++) {
      const reviews = numReviews();
      const totalStars = (Math.random() * 5) * reviews;
      values.push({
        "type": "product",
        "name": "shoes",
        "price": "133.45",
        "size": "L",
        "color": "Blue",
        "numOfRatings": "30",
        "totalNumStars": "150",
        "inventory": "Fill me in",
      });
    }

    // console.log(values);
    checkout.bulk({ docs: values }).then((body) => {
      console.log(body);
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
