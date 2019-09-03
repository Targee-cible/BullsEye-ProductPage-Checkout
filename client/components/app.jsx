/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './header/Header';
import Details from './details/Details';
import Checkout from './checkout/Checkout';
import helper from '../helper';

const Widget = styled.div`
  min-width: 290px;
  max-width: 290px;
  padding: 10px;
`;

const App = () => {
  const [productId, setProductId] = useState(1);
  const [storeId, setStoreId] = useState(1);
  const [price, setPrice] = useState(0);
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState('');
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState('L');
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewAverage, setReviewAverage] = useState(0);
  const [location, setLocation] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [requestedQuantity, setRequestedQuantity] = useState(1);

  useEffect(() => {
    setProductId(helper.getProductId());
  }, []);

  useEffect(() => {
    helper.getProductInfo(productId)
      .then((products) => {
        const product = products.data;
        setColors(product.color);
        setPrice(product.price / 100);
        setTotalReviews(product.reviews.length);
        setReviewAverage(helper.calcAverageRating(product.reviews));
        setSizes(product.size);
      });
  }, [productId]);

  useEffect(() => {
    if (colors.length !== 0) {
      setColor(colors[0].color);
    }
  }, [colors]);

  useEffect(() => {
    helper.getLocationInfo(storeId)
      .then((locations) => {
        setLocation(locations.data);
      });
  }, [storeId]);

  useEffect(() => {
    if (size !== '' && color !== '' && storeId !== '') {
      helper.getInventoryInfo(productId, color, size, storeId)
        .then((quantity) => {
          setAvailableQuantity(parseInt(quantity.data, 10));
        });
    }
  }, [size, color, storeId, productId]);

  return (
    <Widget>
      <Header
        price={price}
        numOfReviews={totalReviews}
        reviewAverage={reviewAverage}
      />
      <hr />
      <Details
        colors={colors}
        color={color}
        colorClickHandler={setColor}
        sizes={sizes}
        size={size}
        sizeClickHandler={setSize}
      />
      <Checkout
        availableQuantity={availableQuantity}
        streetAddress={location.streetAddress}
        city={location.city}
        state={location.state}
        zip={location.zipCode}
      />
    </Widget>
  );
};

export default App;
