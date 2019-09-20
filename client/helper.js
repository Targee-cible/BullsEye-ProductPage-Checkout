import axios from 'axios';

const helper = {
  getProductId: () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('productId') || 1;
  },

  getProductInfo: (productId) => axios.get(`/api/checkout/product/${productId}`),

  getLocationInfo: (storeId) => axios.get(`api/checkout/location/${storeId}`),

  getLocationZipInfo: (zipCode) => axios.get(`api/checkout/locationZip/${zipCode}`),

  getInventoryInfo: (productId, color, size, storeId) => axios.get(`/api/checkout/quantity/${productId}&${color}&${size}&${storeId}`),

  calcAverageRating: (ratings, numOfStars) => {
    return Math.floor(ratings / numOfStars);
  },
 
  getShippingDate: () => {
    const shippingDate = new Date();
    shippingDate.setDate(shippingDate.getDate() + 2);

    const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(shippingDate);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(shippingDate);
    const date = shippingDate.getDate();

    return `${day}, ${month} ${date}`;
  },
};

export default helper;
