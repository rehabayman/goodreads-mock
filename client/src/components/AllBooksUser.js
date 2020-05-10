
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import authHeader from '../services/auth-header';
import Carousel from 'react-elastic-carousel';

const AllBooksUser=(props)=>  {
    
    const API_URL = "http://localhost:8000/books/";
    const [books, setBooks] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
      }
    
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
        setTotalItemsCount(books.length);

    }, []);

    
    return (
        <div className="container">
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
        </div>
    );
    
}

export default AllBooksUser