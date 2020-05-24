
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import authHeader from '../services/auth-header';
import Carousel from 'react-elastic-carousel';
import { Link} from "react-router-dom";

const AllBooksUser=(props)=>  {
    
    const API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/`;
    const [books, setBooks] = useState([]);
    
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
        books.length > 0 ?
        (<Carousel style={{marginTop: "120px"}} className="container justify-content-center" itemsToShow={3} itemsToScroll={3}>
            {
                books.map(book => {
                    return(
                        <div className="card mb-2 mr-3" style={{width: "18rem", height:"25rem"}} key={book._id}>
                            <Link to={`/books/${book._id}`}><img className="card-img-top" style= {{maxHeight:"20rem"}} src={book.image_path ? process.env.PUBLIC_URL + "/books-covers/" + book.image_path : "/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"} alt="Book Cover"></img></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to={`/books/${book._id}`}>{book.name}</Link></h5>
                                <p className="card-text"><a href="#">{`${book.author.firstName} ${book.author.lastName}`}</a></p>
                            </div>
                        </div>
                    )
                })
            }
        </Carousel>)
        : 
        <div className="container d-flex justify-content-center mt-5">
            <h3>No Books Yet.</h3>
        </div>

    );
    
}

export default AllBooksUser