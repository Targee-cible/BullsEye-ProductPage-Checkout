const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');


const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}

app.use(allowCrossDomain);
app.use(express.static('public'));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started on Port ${port}`));

app.get('/api/checkout/product/:productId', (req, res) => {
  const { productId } = req.params;
  db.getProduct(productId)
    .then((product) => {
      console.log(product);
      // res.status(200).send(JSON.stringify(product));
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/api/checkout/quantity/:productId&:color&:size&:storeId', (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { productId, color, size, storeId } = req.params;
  db.getQuantity(productId, color, size, storeId)
    .then((quantity) => {
      res.status(200).send(quantity.toString());
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/api/checkout/location/:storeId', (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { storeId } = req.params;
  db.getLocation(storeId)
    .then((location) => {
      res.status(200).send(location);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/api/checkout/locationZip/:zipCode', (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { zipCode } = req.params;
  db.getLocationZip(zipCode)
    .then((location) => {
      res.status(200).send(location);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete('/api/checkout/location/:storeId', (req, res) => {
  const { storeId } = req.params;
  db.deleteStore(storeId)
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.delete('/api/checkout/product/:productId', (req, res) => {
  const { productId } = req.params;
  db.deleteProduct(productId)
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/api/checkout/location/', (req, res) => {
  // eslint-disable-next-line object-curly-newline
  db.newStore(req.body)
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/api/checkout/product/', (req, res) => {
  db.newProduct(req.body)
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.patch('/api/checkout/product/:productId', (req, res) => {
  const { productId } = req.params;
  db.updateProduct(productId, req.body)
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
})

module.exports = app;
