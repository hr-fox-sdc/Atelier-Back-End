import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import Product from './Product.jsx';
import axios from 'axios';
const { useState, useEffect } = React;

const Overview = ({ currentProductID, styles, selectedStyle, changeStyle }) => {
  //States
  const [currentProduct, setCurrentProduct] = useState({});
  const [metaReviews, setMetaReviews] = useState({});
  //grabs all product info for current product
  const fetchProductInfo = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/products',
      params: {
        specificURL: `products/${currentProductID}`
      }
    })
      .then(response => {
        setCurrentProduct(response.data);
      })
      .catch(err => {
        console.log('ignore this, it works', err);
      })
  }

  const metaRequest = () => {
    axios.get('http://localhost:3000/products', { params: { specificURL: `reviews/meta?product_id=${currentProductID}` } }).then((reviewData) => {
      // console.log('gotten', reviewData.data)
      setMetaReviews(reviewData.data)
    }).catch(err => {
      console.log('error getting', err)
    })
  }

  useEffect(() => {
    fetchProductInfo();
    metaRequest();
  }, [currentProductID]);

  return (
    <div className='overview-container'>
      {selectedStyle && Object.keys(selectedStyle).length !== 0 && <ImageGallery selectedStyle={selectedStyle} />}
      {selectedStyle && <Product metaReviews={metaReviews} styles={styles} selectedStyle={selectedStyle} changeStyle={changeStyle} currentProduct={currentProduct} />}
    </div>
  )
}

export default Overview;