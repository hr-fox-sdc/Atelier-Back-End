import React from 'react';
import './Modal.css';
const { useState, useEffect } = React;
import axios from 'axios';

const Feature = ({feature, comparedProductFeatures, currProductFeatures})=>{
  const [comparedValue, setComparedValue] = useState('');
  const [currValue, setCurrValue] = useState('');
console.log('hey, look, it got in Feature.jsx!')
  const fetchValues = ()=> {
  comparedProductFeatures.forEach(featureObj => {
    if (featureObj.feature === feature){
      if (featureObj.value !== null) {
        setComparedValue(featureObj.value);
      }
    }
  })

  currProductFeatures.forEach(featureObj => {
    if (featureObj.feature === feature){
      if (featureObj.value !== null) {
        setCurrValue(featureObj.value)
      }
    }
  })

  }

  useEffect(()=>{
    fetchValues();
  }, [feature])

  return (
    <tr>
    <td>{currValue}</td>
    <td>{feature}</td>
    <td>{comparedValue}</td>
   </tr>
  )
}

export default Feature;