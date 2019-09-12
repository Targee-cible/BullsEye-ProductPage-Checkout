# Bullseye - Item Checkout Service

> Bullseye is a recreation of the Target Item Product Page.  This service renders the checkout component on the Bullseye site.  The checkout component contains the following information for the product:
>  - Price
>  - Overall Review Rating
>  - Total Number of Reviews
>  - Color Selector
>  - Quantity Dropdown
>  - In Store Pick Up Section
>  - Delivery Section

## CRUD API Examples
> GET Store based on ID
> http://localhost:3002/api/checkout/location/1

> Response:
{
    "_id": "5d785944adab6509e69f4fba",
    "storeId": 1,
    "streetAddress": "39802 Heidenreich Shore",
    "city": "Darionland",
    "state": "OR",
    "zipCode": 4337,
    "__v": 0
}

> GET product based on ID

> Response:
{
    "size": [
        "S",
        "M",
        "L",
        "XL",
        "2XL"
    ],
    "_id": "5d785944adab6509e69f4f56",
    "productId": 1,
    "name": "Refined Wooden Sausages",
    "price": 2520,
    "color": [
        {
            "color": "Blue"
        },
        {
            "color": "Purple"
        },
        {
            "color": "Red"
        },
        {
            "color": "Green"
        },
        {
            "color": "Orange"
        },
        {
            "color": "Black"
        }
    ],
    "reviews": [
        {
            "_id": "5d785944adab6509e69f5009",
            "rating": 1
        },
        {
            "_id": "5d785944adab6509e69f500a",
            "rating": 3
        },
        {
            "_id": "5d785944adab6509e69f500b",
            "rating": 5
        },
        {
            "_id": "5d785944adab6509e69f500c",
            "rating": 3
        }
    ],
    "__v": 1
}

GET Location based on Zip Code
Reponse:
{
    "_id": "5d785944adab6509e69f4fba",
    "storeId": 1,
    "streetAddress": "39802 Heidenreich Shore",
    "city": "Darionland",
    "state": "OR",
    "zipCode": 4337,
    "__v": 0
}

POST new store location
http://localhost:3002/api/checkout/location/
Response:
store post working

DELETE Store based on ID
http://localhost:3002/api/checkout/location/1
Response:
store deleted

DELETE Product based on ID
http://localhost:3002/api/checkout/product/1
Response:
product deleted

POST Product
http://localhost:3002/api/checkout/product/
Response:
product post working

PUT Product
http://localhost:3002/api/checkout/product/1
Response:
product updated


## Related Projects

  - https://github.com/hrr40-fec1/item-checkout
  - https://github.com/hrr40-fec1/item-reviews
  - https://github.com/hrr40-fec1/item-details
  - https://github.com/hrr40-fec1/Images

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- MongoDB 4.2

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Seeding the Database

From within the root directory:

```sh
npm run seed
```

### Build Webpack

From within the root directory:

```sh
npm run build
```
