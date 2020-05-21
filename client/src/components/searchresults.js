
import React, {useState, useEffect,Component,Header} from 'react'
import './starStyle.css'
import axios from 'axios';
import authHeader from '../services/auth-header'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Carousel from 'react-elastic-carousel';

function searchResult(props) {
    return(
        <>
         <div>  
                         
            <div className='container-fluid' >  
            <Carousel itemsToShow={3} itemsToScroll={3}>  
            {
                Object.values(props.location.state.filteredBooks).map(book=>
                    {return(
        
                        <div className="card mb-2 mr-3" style={{width: "18rem", height:"25rem"}} key={book._id}>
                            <Link to={`/books/${book._id}`}><img className="card-img-top" src={book.cover ? book.cover : "/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"} alt="Book Cover"></img></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to={`/books/${book._id}`}>{book.name}</Link></h5>
                                <p className="card-text"><Link to={`/authors/${book.author._id}`}>{`${book.author.firstName} ${book.author.lastName}`}</Link></p>
                            </div>
                        </div>)
                    
                        
                    }       
                )
            }
    
            </Carousel>  
            </div>  
        </div>  
        {console.log(Object.values(props.location.state.filteredBooks).map(book=>book.name))}
       
        </>

    )
}
    export default searchResult
 
