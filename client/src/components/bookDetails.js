import React, { useEffect, useState } from 'react'
import axios from "axios"
import BooksServices from "../services/booksServices"
import BookShelve from './BookShelves'
import RateBook from './RateBook'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import AddBookReview from './AddBookReview';

const BookDetails = ({ match: { params: { id: bookId } } }) => {
    console.log("hiii")
    const [book, setBook] = useState([])
    const [shelf, setShelf] = useState("")
    const [reviewAdded, setReviewAdded]= useState(false)
    useEffect(() => {
        BooksServices.getBookDetails(bookId).then((res) => {
            setBook(res.data)
            setShelf(res.data.shelf ? res.data.shelf.shelf : "read")
        })
    }, [])

    useEffect(() => {
        BooksServices.getBookDetails(bookId).then((res) => {
            setBook(res.data)
            setShelf(res.data.shelf ? res.data.shelf.shelf : "read")
        })
    }, [reviewAdded])


    const changeBookRate = (id, rateValue) => {
        let tempBook = { ...bookDetails }
        tempBook.ratings = bookDetails.ratings.map((rate) => {

            if (rate.user === JSON.parse(localStorage.getItem('user')).id) {
                return { ...rate, rating: rateValue }
            }
            return rate
        })
        setBook(({ book: tempBook }))
    }
    const changeBookState = (bookId, shelf) => {
        setShelf(shelf)
    }

    let { book: bookDetails } = book

    return (
        <>
            {bookDetails &&
                <>
                    <div className="book-info">
                        <div className="book-info-left">
                            <img className="book-image" src={bookDetails.image_path ? bookDetails.image_path : "/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"} />
                            <BookShelve changeBookState={changeBookState} bookId={bookDetails._id} state={shelf} />
                            <RateBook changeBookRate={changeBookRate} key={bookDetails._id} bookId={bookDetails._id} rate={0} />
                        </div>
                        <div className="book-data">
                            <h2>{bookDetails.name}</h2>
                            <h4><Link to={`/authors/${bookDetails.author._id}`}>{`${bookDetails.author.firstName} ${bookDetails.author.lastName}`}</Link></h4>
                            <h4><Link to={`/authors/${bookDetails.category._id}`}>{bookDetails && bookDetails.category.name}</Link></h4>

                            <div className="book-rating">
                                <StarRatings
                                    rating={bookDetails.ratings.reduce((a, { rating }) => a + rating, 0) / bookDetails.ratings.length || 0}
                                    starRatedColor="goldenrod"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="25px"
                                    starSpacing="3px"
                                />
                                <p>
                                    {bookDetails.ratings.reduce((a, { rating }) => a + rating, 0) / bookDetails.ratings.length || 0} - {bookDetails.ratings.length} {bookDetails.ratings.length <= 1 ? "rating" : "ratings"}
                                </p>
                            </div>
                        </div>
                    </div>
                   
                        <AddBookReview 
                            bookId={bookId} 
                            user={localStorage.getItem('user') }
                            setReviewAdded={setReviewAdded}
                        />
                    <br/>
                    <br/>
                    <div className="reviews">
                        <h4>Reviews</h4>
                        {bookDetails.reviews.length > 0 ?
                            bookDetails.reviews.map((review) => {
                                return (

                                    <div className="card" style={{ width: "80%" }} key={review._id}>
                                        <div className="card-body">
                                            <div className="ratein-review">

                                                <h5 className="card-title">{review.user.username}  </h5>
                                                {
                                                    bookDetails.ratings.map((rating) => {

                                                        if (rating.user === review.user._id) {
                                                            return (
                                                                <>
                                                                    <p className="ratedit">rated it</p>
                                                                    <StarRatings
                                                                        rating={parseInt(rating.rating)}
                                                                        starRatedColor="goldenrod"
                                                                        numberOfStars={5}
                                                                        name='rating'
                                                                        starDimension="15px"
                                                                        starSpacing="1px"
                                                                    />
                                                                </>
                                                            )
                                                        }
                                                    })

                                                }
                                            </div>
                                            <p className="card-text">{review.review}</p>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            "No reviews found"

                        }
                    </div>
                </>
            }
        </>






    )
}

export default BookDetails