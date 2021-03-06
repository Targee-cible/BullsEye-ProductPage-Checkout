/* eslint-disable no-const-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
require('newrelic');


const express = require('express');
const bodyParser = require('body-parser');
const LRU = require('lru-cache');

const options = { max: 100
  , length: function (n, key) { return n * 2 + key.length }
  , dispose: function (key, n) { n.close() }
  , maxAge: 1000 * 60 * 60
};
const cache = new LRU(options);
const otherCache = new LRU(50);

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
  const cacheProduct = cache.get(productId);
  if (cacheProduct !== undefined) {
    res.status(200).send(cacheProduct);
  } else {
    db.getProduct(productId)
      .then((product) => {
        const parseColors = JSON.parse(product.colors);
        product.colors = parseColors;
        const parseSizes = JSON.parse(product.size);
        product.size = parseSizes;
        cache.set(productId, product);
        res.status(200).json(product);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }

});

app.get('/api/checkout/quantity/:productId&:color&:size&:storeId', (req, res) => {
  // eslint-disable-next-line object-curly-newline

  const { productId, color, size, storeId } = req.params;
  const cacheId = `${productId}, ${color}, ${size}, ${storeId}`;
  const cacheProduct = cache.get(cacheId);
  if (cacheProduct !== undefined) {
    res.status(200).send(cacheProduct);
  } else {
    db.getQuantity(productId, color, size, storeId)
      .then((quantity) => {
        const cacheId = `${productId}, ${color}, ${size}, ${storeId}`;
        cache.set(cacheId, quantity.toString());
        res.status(200).send(quantity.toString());
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }

});

app.get('/api/checkout/location/:storeId', (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { storeId } = req.params;
  const cacheStore = cache.get(JSON.stringify({ store: storeId }));
  if (cacheStore !== undefined) {
    res.status(200).send(cacheStore);
  } else {
    db.getLocation(storeId)
      .then((location) => {
        cache.set(JSON.stringify({ store: storeId }), location);
        res.status(200).send(location);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }

});

app.get('/api/checkout/locationZip/:zipCode', (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { zipCode } = req.params;
  const cacheZip = cache.get(JSON.stringify({ cacheZipCode: zipCode }));
  if (cacheZip !== undefined) {
    res.status(200).send(cacheZip);
  } else {
    db.getLocationZip(zipCode)
      .then((location) => {
        cache.set(JSON.stringify({ cacheZipCode: zipCode }), location);
        res.status(200).send(location);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }

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
