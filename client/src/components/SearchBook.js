
import React, {useState, useEffect} from 'react'
import './starStyle.css'
import axios from 'axios';
import authHeader from '../services/auth-header'
// import "netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css";
import SearchResult from './searchresults';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { browserHistory } from 'react-router';
import {createBrowserHistory} from 'history';

const browserHistory = createBrowserHistory();

const SearchBook=(props)=>  {
    
    const API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books`
    let [input, setInput] = useState('');
    const [books, setBooks]=useState([]);  
    const [filteredBooks,setfilteredBooks]=useState([]);
    let [show,setShow]=useState(false);
    let currentBooks= [];
    const [showBooks,setShowBooks]=useState(2);

    useEffect(()=>{    
        axios.get(API_URL, { headers: authHeader() })                                                                 
        .then(response => {
            setBooks(response.data);
            response.data.map(book => {
                books.push(book);})
                // console.log(books);              
                currentBooks=books;
                // console.log(currentBooks);
        }
        )
    
        .catch(err => {
            console.log(err)
            if(err.response) {
                console.log(err.response)
            }
        })

    }, []);

    
    const handleSubmit=  (e)=>{        
        e.preventDefault();
        let  newFilteredBooks=[];
        if (input !=""){
        newFilteredBooks = books.filter(item => {
        const lc = item.name.toString().toLowerCase();
        const filter = input.toString().toLowerCase();
        return lc.includes(filter);
            })
            setfilteredBooks(newFilteredBooks)
            // setInput('')
            filteredBooks.map(i=>console.log(i.name)
            )
        console.log(filteredBooks);

        }
        props.history.push({ 
            //browserHistory.push should also work here
            pathname: '/SearchResult',
            state: {filteredBooks}
          }); 
    }
    const handleChange = (e) => {
        const { target: { value } } = e;
        setInput(value);     
        let  newFilteredBooks=[];
        if(value!=""){
        newFilteredBooks = books.filter(item => {
        const lc = item.name.toString().toLowerCase();
        const filter = e.target.value.toString().toLowerCase();
        return lc.includes(filter);
            })
        setfilteredBooks(newFilteredBooks);
        }
        else{
            setfilteredBooks([]);
        }
         
    }
    
    const inputStyle ={
       
            boxSizing: "borderBox",
            backgroundPosition: "14px 12px",
            fontSize: "16px",
            padding: "14px 20px 12px 45px",
            border: "none",
            borderBottom: "1px solid #ddd",
    }
    const dropdownStyle={
            position: "relative",
            display: "inline-block",
          
        
    }
    const dropdownContent = {
        display: show ? "block" : "none",
        position: "absolute",
        backgroundColor: "#f1f1f1",
        minWidth: "260px",
        maxWidth: "265px",
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
        // zIndex: 1,
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
 

    return (
        <div className="dropdown" style={dropdownStyle}>
            
            <form onSubmit={handleSubmit}>
                <input type="text" className="input" value={input} onFocus={e=>{!show?setShow(true):setShow(false);console.log(filteredBooks);}
                }onBlur={e=>{show?setShow(false):setShow(true)}} style={inputStyle} onChange={e => {handleChange(e);}} placeholder="Search..." />
            </form >
            <div>
            <datalist className="dropdownContent" style={dropdownContent} >
            {filteredBooks.length ? filteredBooks.slice(0,showBooks).map((i,index) => 
                   <li key={index}>
                       <div className="searchItem" style={searchItem}>
                            <div className="row">
                                <Link to={`/books/${i._id}`} style={row}>
                                    <div className="col-xs-6 col-sm-3 col-md-3 col-lg-2">
                                        <img className="img-responsive" src="https://via.placeholder.com/50x50" alt=""/>
                                    </div>
                                    <div className="col-xs-6 col-sm-9 col-md-9 col-lg-10">
                                        <h5 style={title}>{i.name} </h5>
                                        <p style={author}>by {i.author.firstName} {i.author.lastName}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                   </li>
                   
                ):
                <></>}
                 {filteredBooks.length ? 
                    <Link
                        to={{
                        pathname: `/SearchResult`,
                        state: {  filteredBooks},
                        params:{filteredBooks}
                        }}
                    >Show all results</Link>
                : <></>}
               
            </datalist>
            </div>

  
        </div>
    );
    
}

export default SearchBook
