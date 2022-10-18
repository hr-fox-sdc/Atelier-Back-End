import React from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import '../assets/related.css';
import Modal from './Modal.jsx';


const { useState, useEffect } = React;

const RelatedItemsAndComparison = () => {

  const [openModal, setOpenModal] = useState(false);
  const dummyProductID = 37311;
  //   const [relatedProducts, setRelatedProducts] = useState([]);
  //   const [relatedProductsID, setRelatedProductsID] = useState([]);
  //   const [currentProductID, setCurrentProductID] = useState(Number);

  const [relatedProductsID, setRelatedProductsID] = useState([]);

  useEffect(() => {
    const temp = [];
    const fetchAllRelatedProductsID = () => {
      axios.get('http://localhost:3000/comparison', { params: { specificURL: `products/${dummyProductID}/related` } })
        .then((response) => {
          console.log('response.data from calling API/products: ', response.data);
          //do the forEach below to filter out 37312 because it has no images
          response.data.forEach(id => {
            if (id !== 37312) {
              temp.push(id);
            }
          })
          console.log('temp: ', temp);//[37313, 37318, 37317]
          setRelatedProductsID(temp);
        })
        .catch(err => {
          console.log('client failed to retrieve all products ids: ', err);
        })
    };
    fetchAllRelatedProductsID();
  }, [])



  useEffect(() => {
    console.log('relatedProductsID', relatedProductsID)
  }
  , [relatedProductsID])

 const handleModal = (event) => {
  setOpenModal(true);
 }


// useEffect(()=>{
//    console.log('relatedProducts: ', relatedProducts);
// }, [relatedProducts])


  return (
    <div>
      <h2 className='YouMightAlsoLike'>YOU MIGHT ALSO LIKE</h2>
      <RelatedProducts relatedProductsID={relatedProductsID} handleModal={handleModal}></RelatedProducts>
      {openModal && <Modal />}
      <h3 className='CompleteYourOutfit'>COMPLETE YOUR OUTFIT</h3>
      <YourOutfit></YourOutfit>
    </div>
  );
};

export default RelatedItemsAndComparison;