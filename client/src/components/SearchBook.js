
import React, {useState, useEffect} from 'react'
import './starStyle.css'
import axios from 'axios';
import authHeader from '../services/auth-header'
import SearchResult from './searchresults';
// import {Router, Route, Link}from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const PORT = 8000;
const DB_HOST = "localhost";

const SearchBook=(props)=>  {
    
    const API_URL = `http://${DB_HOST}:${PORT}/books`
    const [input, setInput] = useState('');
    const [books, setBooks]=useState([]);  
    const [filteredBooks,setfilteredBooks]=useState([]);
    const [show,setShow]=useState(false);
    let currentBooks= [];
    // const [dropdownOpen,setDropdownOpen]=useState({display:"none"});
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

    const handleChange = (e) => {
        const { target: { value } } = e;
        setInput(value);     
        let  newFilteredBooks=[];
        newFilteredBooks = books.filter(item => {
        const lc = item.name.toString().toLowerCase();
        const filter = e.target.value.toString().toLowerCase();
        return lc.includes(filter);
            })
        setfilteredBooks(newFilteredBooks);
      
         
    }
    const handleSubmit=(e)=>{        
        e.preventDefault();
        let  newFilteredBooks=[];
        if (input !=""){
        newFilteredBooks = books.filter(item => {
        const lc = item.name.toString().toLowerCase();
        const filter = input.toString().toLowerCase();
        return lc.includes(filter);
            })
            setfilteredBooks(newFilteredBooks)
            setInput('')
            filteredBooks.map(i=>console.log(i.name)
            )
        console.log(filteredBooks);

        }
    }
   const handleShowMore=()=> {
        setShowBooks(        
           showBooks >= filteredBooks.length ? showBooks : showBooks + 1//showBooks + 2
        )
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
        minWidth: "160px",
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
        // zIndex: 1,
      }
 

    return (
        <div className="dropdown" style={dropdownStyle}>
            
            <form onSubmit={handleSubmit}>
                <input type="text" className="input" value={input} onClick={e=>{setShow(true);console.log(filteredBooks);}
                } style={inputStyle} onChange={e => handleChange(e)} placeholder="Search..." />
            </form >
            <div onClick={e=>setShow(false)} >
            <datalist className="dropdownContent" style={dropdownContent} >
            {filteredBooks.length ? filteredBooks.slice(0,showBooks).map((i,index) => 
                <li key={index}>
                   <Link to={`/books/${i._id}`}  >{i.name}</Link>
                </li>

                ):<></>}
                 {filteredBooks.length ? 
                <>
                {/* <li>
                     <a href={handleShowMore} > 
                        Show More!
                    </a>
                </li> */}
              
                <li>
             
                    <Link
                        to={{
                        pathname: `/SearchResult`,
                        state: {  filteredBooks},
                        params:{filteredBooks}
                        }}
                    >Show All</Link>
                </li>
                </>
                : <></>}
               
            </datalist>
            </div>

            <div onClick={e=>setShow(false)}>
            <div>Hello</div>
            <div>Hello2</div>
            <div>Hell04</div>
            {/* <div className="todo-items">
            {filteredBooks.map((item,index) => (
                <div key=
                {index}>
                <SearchResult
                searchresults={item}
                index={index}
                />
                </div>
            ))}
            </div> */}
            
            </div>
        </div>
    );
    
}

export default SearchBook