import React from 'react';
import { format, parseISO } from "date-fns";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import StarAverage from './StarAverage.js'
import {findAverage, helpfulPerc, findTotal, findRatio} from './helperFuncs'
const axios = require('axios');
const { useState, useEffect } = React;

const RatingBreakdown = ({metaReviews}) => {
  const [rating, setRating] = useState()
  const [ratingTotal, setRatingTotal] = useState()
  const [helpfulAverage, setHelpfulAverage] = useState()

  useEffect(() => {
    setHelpfulAverage(helpfulPerc(metaReviews.recommended))
    setRating(findAverage(metaReviews.ratings))
    setRatingTotal(findTotal(metaReviews.ratings))
  }, [metaReviews])


  return (
    <div id="breakdown-container">
      <h3>Ratings and Reviews</h3>
      {metaReviews.ratings && <p>{helpfulAverage} % of reviews recommend this product</p>}
      <div id="rating-breakdown-num">
      <h1 id="average-rating">{metaReviews.ratings && rating}</h1>
      {!isNaN(rating) && <StarAverage rating={rating}/>}
      </div>
      {ratingTotal && Object.keys(metaReviews.ratings).reverse().map(starNum => {
        let ratio = findRatio(ratingTotal, metaReviews.ratings[starNum])
        let ratioTotal = 300 - ratio;
        return <table>
        <tr width="300px">
        <u>{starNum} stars</u> <td style={{background: "gray", width: ratio, height:25}}></td><td style={{background: "black", width: ratioTotal, height:25}}></td>
        </tr>
        </table>
      })}
      {metaReviews.characteristics && Object.keys(metaReviews.characteristics).map(key => {
        return (
          <div class="slidecontainer">{key}
          <input type="range" min="10" max="50" value={Math.round(metaReviews.characteristics[key]["value"] * 100) / 10} class="slider" id="myRange">
          </input></div>
        )
      })}
    </div>
  )
}

export default RatingBreakdown;

