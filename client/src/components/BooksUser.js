
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import authHeader from '../services/auth-header'

const BookShelves=(props)=>  {
    
    const API_URL = "http://localhost:8000/books/";
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);
    
    useEffect(()=>{    // get all books
        axios.get(API_URL, {headers: authHeader()})                                                                 
        .then(response => {
            setBooks(response.data)
        })
        .catch(err => {
            if(err.response) {
                if(err.response.status === 404) {
                    setBooks([]);
                }
            }
        })

    }, []);

    
    return (
        <div className="container d-flex flex-row flex-wrap justify-content-center mt-5">
            {
                books.map(book => {
                    return (
                    <div className="card mb-2 mr-3" style={{width: "18rem"}} key={book._id}>
                        <a href="#"><img className="card-img-top" src={book.cover} alt="Book Cover"></img></a>
                        <div className="card-body">
                            <h5 className="card-title"><a href="#">{book.name}</a></h5>
                            <p className="card-text"><a href="#">{`${book.author.firstName} ${book.author.lastName}`}</a></p>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    );
    
}

export default BookShelves