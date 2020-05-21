
import React, {useState, useEffect} from 'react'
import './starStyle.css'
import axios from 'axios';
import authHeader from '../services/auth-header'
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
    const [show,setShow]=useState(false);
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
        // display: "block",
        display: show ? "block" : "none",
        position: "absolute",
        backgroundColor: "#f1f1f1",
        minWidth: "260px",
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
        // zIndex: 1,
      }
 

    return (
        <div className="dropdown" style={dropdownStyle}>
            
            <form onSubmit={handleSubmit}>
                <input type="text" className="input" value={input} onClick={e=>{setShow(true);console.log(filteredBooks);}
                } style={inputStyle} onChange={e => {handleChange(e);}} placeholder="Search..." />
            </form >
            <div onClick={e=>{setShow(false);setfilteredBooks([])}} >
            <datalist className="dropdownContent" style={dropdownContent} >
            {filteredBooks.length ? filteredBooks.slice(0,showBooks).map((i,index) => 
                   <li key={index}>
                   <Link to={`/books/${i._id}`}  >{i.name} <br/><span>by {i.author.firstName} {i.author.lastName}</span></Link><br/>
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

            <div onClick={e=>{setShow(false);setfilteredBooks([])}}>
          
            
            </div>
        </div>
    );
    
}

export default SearchBook