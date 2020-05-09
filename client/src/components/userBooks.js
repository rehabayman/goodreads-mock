import React, { useState, useEffect } from "react"
import UserService from "../services/user.service"
import Carousel from 'react-elastic-carousel';
import BookShelve from './BookShelves'
import RateBook from './RateBook'

const UserBooks = () => {

    const [userBooks, setUserBooks] = useState([])
    const [readMode, setReadMode] = useState("All")
    useEffect(() => {
        UserService.getUserBooks().then((resp) => {
            let books
            if (resp.data) {
                books = resp.data[0].filter((book) => {
                    return book.shelf
                })
            }
            setUserBooks(books)

        }).catch((err) => {
            console.log(err)
        })

    }, [])

    const changeBookState = (id, state) => {
        
        books = userBooks.map(book => {
            if (book.book._id === id) {
                return { ...book, shelf: state }

            }
            return book
        })

        setUserBooks(books)
    }
    const changeBookRate = (id, rate) => {
        console.log(id)
        books = userBooks.map(book => {
            if (book.book._id === id) {                
                book.book.ratings.forEach(rat => {
                    if (rat.user == JSON.parse(localStorage.getItem('user')).id) {
                        rat.rating = rate
                        return { ...book, [rat.rating]: rate}
                    }
                })
            }
            return book
        })       
        setUserBooks(books)
    }

    let books = []
    if (readMode == "read") {
        if (userBooks) {
            books = userBooks.filter((book) => {
                return book.shelf == "read"
            })
        }
    }
    else if (readMode == "reading") {
        books = userBooks.filter((book) => {
            return book.shelf == "reading"
        })
    }
    else if (readMode == "want to read") {
        books = userBooks.filter((book) => {
            return book.shelf == "want to read"
        })
    }
    else {
        console.log(userBooks)
        if (userBooks) {
            books = userBooks.filter((book) => {
                return book.shelf
            })
        }
    }
    let rate = 0
    
    return (



        <div className="home">
            <div className="side">
                <ul>
                    <li>
                        <button type="button" onClick={() => { setReadMode("All") }} class="btn btn-light">All</button>

                    </li>
                    <li>
                        <button type="button" class="btn btn-light" onClick={() => { setReadMode("read") }} >Read</button>

                    </li>
                    <li>
                        <button type="button" class="btn btn-light" onClick={() => { setReadMode("reading") }} > Currently Reading</button>


                    </li>
                    <li>
                        <button type="button" class="btn btn-light" onClick={() => { setReadMode("want to read") }} > Want to read</button>
                    </li>

                </ul>
            </div>

            <div className="books">



                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Cover</th>
                            <th scope="col">Name</th>
                            <th scope="col">Author</th>
                            <th scope="col">Average Rate</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Shelve</th>
                        </tr>
                    </thead>
                    <tbody>

                        {books.length > 0 ?


                            books.map(book =>

                                <tr>

                                    <td>  {book.book.image_path ? <img src={book.book.image_path} /> : "image"}</td>
                                    <td>{book.book.name}</td>
                                    <td> {` ${book.book.author.firstName}  ${book.book.author.lastName}`}</td>
                                    <td> {book.book.ratings.reduce((a, { rating }) => a + rating, 0) / book.book.ratings.length ||0}</td>
                                    <td>
                                        {rate = book.book.ratings.forEach(rat => {
                                            if (rat.user == JSON.parse(localStorage.getItem('user')).id) {                                                
                                                rate = rat.rating
                                            }
                                            
                                        })
                                    }                                    
                                    <RateBook changeBookRate={changeBookRate} bookId={book.book._id} rate={rate} />

                                    </td>
                                    <td> <BookShelve changeBookState={changeBookState} bookId={book.book._id} state={book.shelf} /></td>
                                </tr>


                            )

                            : ""}

                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default UserBooks