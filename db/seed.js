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

const randomInventory = function () {
  return Math.round(Math.random() * 15);
}

const seedData = function () {
  const targetSize = 10;
  let currentSize = 0;

  const seedDataHelper = function () {
    let values = [];
    for (let i = 0; i < 10; i++) {
      const reviews = numReviews();
      const totalStars = Math.round((Math.random() * 5) * reviews);
      const newData = {
        type: "product",
        product_id: currentSize + i,
        name: faker.commerce.productName(),
        price: faker.finance.amount(0.01, 50.00, 2),
        size: sizes,
        color: colors,
        numOfRatings: reviews,
        totalNumStars: totalStars,
        inventory: [
          {
            store: 1,
            inventory: [{ size: "M", color: "Blue", amount: randomInventory() },
                        { size: "S", color: "Blue", amount: randomInventory() },
                        { size: "XL", color: "Red", amount: randomInventory() },
                        { size: "L", color: "Red", amount: randomInventory() },
                        { size: "2XL", color: "Green", amount: randomInventory() },
                        { size: "L", color: "Green", amount: randomInventory() },
                        { size: "S", color: "Orange", amount: randomInventory() },
                        { size: "L", color: "Orange", amount: randomInventory() },
                        { size: "M", color: "Black", amount: randomInventory() },
                        { size: "L", color: "Black", amount: randomInventory() },
                        { size: "XL", color: "Purple", amount: randomInventory() }
                      ]
          },
          {
            store: 2,
            inventory: [{ size: "L", color: "Blue", amount: randomInventory() },
                        { size: "S", color: "Blue", amount: randomInventory() },
                        { size: "M", color: "Red", amount: randomInventory() },
                        { size: "L", color: "Red", amount: randomInventory() },
                        { size: "XL", color: "Green", amount: randomInventory() },
                        { size: "L", color: "Green", amount: randomInventory() },
                        { size: "S", color: "Orange", amount: randomInventory() },
                        { size: "L", color: "Orange", amount: randomInventory() },
                        { size: "2XL", color: "Black", amount: randomInventory() },
                        { size: "L", color: "Black", amount: randomInventory() },
                        { size: "XL", color: "Purple", amount: randomInventory() }
                      ]
          },
          {
            store: 3,
            inventory: [{ size: "2XL", color: "Blue", amount: randomInventory() },
                        { size: "M", color: "Blue", amount: randomInventory() },
                        { size: "XL", color: "Red", amount: randomInventory() },
                        { size: "L", color: "Red", amount: randomInventory() },
                        { size: "S", color: "Green", amount: randomInventory() },
                        { size: "L", color: "Green", amount: randomInventory() },
                        { size: "XL", color: "Orange", amount: randomInventory() },
                        { size: "L", color: "Orange", amount: randomInventory() },
                        { size: "S", color: "Black", amount: randomInventory() },
                        { size: "S", color: "Black", amount: randomInventory() },
                        { size: "2XL", color: "Purple", amount: randomInventory() }
                      ]
          }

        ]
      };

      values.push(newData);
    }
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
  };

  seedDataHelper();
};
const seedStores = function () {
  const stores = [];
  for (let i = 1; i <= 3; i++) {
    const store = {
      store_Id: i,
      type: 'store',
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zipCode: faker.address.zipCode('#####'),
    };
    stores.push(store);
  }
  checkout.bulk({ docs: stores }).then(() => {
    console.log("stores seeded");
    seedData();
  });
};

seedStores();
