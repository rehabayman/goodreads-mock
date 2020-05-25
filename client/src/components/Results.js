
import React, {useState, useEffect} from 'react'
import './starStyle.css'
import axios from 'axios';
import authHeader from '../services/auth-header'
// import "netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css";
import SearchResult from './searchresults';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { browserHistory } from 'react-router';
import {createBrowserHistory} from 'history';

const Results = (props) => {
   
    const dropdownContent = {
        display: props.show ? "block" : "none",
        position: "absolute",
        backgroundColor: "#f1f1f1",
        minWidth: "260px",
        maxWidth: "265px",
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
        zIndex: 1,
      }
      const searchItem={
            border: "0",
            padding: "10px",
            minHeight: "25px",
            backgroundColor: "#fff",
            boxShadow: "none",
            borderRadius: "3px",
            position: "relative",
            maxHeight: "60px",
            borderBottom: "2px solid #ccc",
            transition: "maxHeight 0.5s ease",
          
      }
     const row={
          display:"flex",
      }
     const title={

        margin: "0 15px 5px",
        color: "#333",
        }
     const author={ 
        margin: "0 15px 5px",
        fontSize: "12px",
        color: "#333",
    }
    return(
    <div id="results" className="search-results">
        <datalist className="dropdownContent" style={dropdownContent} id="myList">
            {props.filteredBooks.length ? props.filteredBooks.slice(0,props.showBooks).map((book,index) => 
                   <li key={index}>
                       <div className="searchItem" style={searchItem}>
                            <div className="row">
                                <Link to={`/books/${book._id}`} style={row} onClick={e=>props.show?(props.setShow(false)):<></>}>
                                    <div className="col-xs-6 col-sm-3 col-md-3 col-lg-2">
                                    <img className="img-responsive" style= {{width:"50px",height:"50px"}} src={book.image_path ? process.env.PUBLIC_URL + "/books-covers/" + book.image_path : "https://via.placeholder.com/50x50"} alt=""/>
                                    </div>
                                    <div className="col-xs-6 col-sm-9 col-md-9 col-lg-10">
                                        <h5 style={title}>{book.name} </h5>
                                        <p style={author}>by {book.author.firstName} {book.author.lastName}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                   </li>
                   
                ):
                <></>}
                 {props.filteredBooks.length ? 
                    <Link
                        to={{
                        pathname: `/SearchResult`,
                        state: {filteredBooks:props.filteredBooks},
                        }} onClick={e=>props.show?(props.setShow(false)):<></>}
                    >Show all results</Link>
                : <></>}
               
            </datalist>   
    </div>
    );
}
export default Results
  