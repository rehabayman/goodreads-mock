
import React, { useState, useEffect } from 'react'
import './starStyle.css'
import axios from 'axios';
import authHeader from '../services/auth-header'

const RateBook = (props) => {

    const API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/rate/`
    const [rating, setRating] = useState(props.rate);

    /**
     * YOU CAN CHANGE props.bookId WITH A STATIC book id FOR TESTING
     */

    useEffect(() => {    // get the rating of the book if exists 
        axios.get(API_URL + props.bookId, { headers: authHeader() })
            .then(response => {
                setRating(parseInt(response.data.rating))
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 404) {
                        setRating(0);
                    }
                }
            })

    });

    const handleRatingChange = (e) => {

        if(changeBookRate)
         changeBookRate(bookId, e.target.value)
        setRating(parseInt(e.target.value));
        const data = { rating: parseInt(e.target.value) }
        axios.post(API_URL + bookId, data, { headers: authHeader() })
            .then(response => {
                console.log(response); // Book Rating Object
            })
            .catch(err => {
                console.log(err)
            })
    }

    const { bookId, changeBookRate } = props

    return (
        <div className="container">
            <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet"></link>
            <fieldset className="rating">
                <input type="radio" id={props.bookId + "star1"} value="5" checked={rating === 5} onChange={handleRatingChange} /><label className="full" htmlFor={props.bookId + "star1"} title="Awesome - 5 stars"></label>
                <input type="radio" id={props.bookId + "star2"} value="4" checked={rating === 4} onChange={handleRatingChange} /><label className="full" htmlFor={props.bookId + "star2"} title="Pretty good - 4 stars"></label>
                <input type="radio" id={props.bookId + "star3"} value="3" checked={rating === 3} onChange={handleRatingChange} /><label className="full" htmlFor={props.bookId + "star3"} title="Meh - 3 stars"></label>
                <input type="radio" id={props.bookId + "star4"} value="2" checked={rating === 2} onChange={handleRatingChange} /><label className="full" htmlFor={props.bookId + "star4"} title="Kinda bad - 2 stars"></label>
                <input type="radio" id={props.bookId + "star5"} value="1" checked={rating === 1} onChange={handleRatingChange} /><label className="full" htmlFor={props.bookId + "star5"} title="Sucks big time - 1 star"></label>
            </fieldset>
        </div>
    );

}

export default RateBook