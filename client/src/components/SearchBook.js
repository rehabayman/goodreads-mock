
import React, { useState, useEffect } from 'react'
import './starStyle.css'
import axios from 'axios';
import authHeader from '../services/auth-header'
import { createBrowserHistory } from 'history';
import { withRouter } from 'react-router-dom';
import Results from './Results'
const browserHistory = createBrowserHistory();

const SearchBook = (props) => {
    
    const API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books`
    let [input, setInput] = useState('');
    const [books, setBooks] = useState([]);
    const [filteredBooks, setfilteredBooks] = useState([]);
    let [show, setShow] = useState(false);
    // let currentBooks = [];
    const [showBooks, setShowBooks] = useState(2);
    
    useEffect(() => {
        axios.get(API_URL, { headers: authHeader() })
        .then(response => {
                setBooks(response.data);
                response.data.map(book => {
                    books.push(book);
                })
                // console.log(books);              
                // currentBooks = books;
                // console.log(currentBooks);
            }
            )

            .catch(err => {
                console.log(err)
                if (err.response) {
                    console.log(err.response)
                }
            })

    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        let newFilteredBooks = [];
        if (input !== "") {
            newFilteredBooks = books.filter(item => {
                const lc = item.name.toString().toLowerCase();
                const filter = input.toString().toLowerCase();
                return lc.includes(filter);
            })
            setfilteredBooks(newFilteredBooks)
            // setInput('')
            filteredBooks.map(i => console.log(i.name)
            )
            console.log(filteredBooks);

        }
        props.history.push({
            //browserHistory.push should also work here
            pathname: '/SearchResult',
            state: { filteredBooks }
        });
    }
    const handleChange = (e) => {
        const { target: { value } } = e;
        setInput(value);
        let newFilteredBooks = [];
        if (value !== "") {
            newFilteredBooks = books.filter(item => {
                const lc = item.name.toString().toLowerCase();
                const filter = e.target.value.toString().toLowerCase();
                return lc.includes(filter);
            })
            setfilteredBooks(newFilteredBooks);
        }
        else {
            setfilteredBooks([]);
        }

    }

    const inputStyle = {
        boxSizing: "borderBox",
        backgroundPosition: "14px 12px",
        fontSize: "16px",
        padding: "5px 10px",
        border: "none",
        borderBottom: "1px solid #ddd",
        width: "300px",
        marginRight: "1.5rem"
    }
    const dropdownStyle = {
        position: "relative",
        display: "inline-block",


    }

    // const onClick = () => setShow(true)
    const toggle = () => {
        setShow(show => !show);
    }
    return (
        <div className="dropdown" style={dropdownStyle}>

            <form onSubmit={handleSubmit}>
                <input type="text" id="myInput" className="input" value={input}
                    onFocus={e => !show ? setShow(true) : <></>}
                    style={inputStyle} onChange={e => { handleChange(e); }}
                    onClick={toggle}
                    placeholder="Search by book title..." />
                {show ? <Results show={show} setShow={setShow} setInput={setInput} showBooks={showBooks} filteredBooks={filteredBooks} setfilteredBooks={setfilteredBooks} /> : null}

            </form >

            {/* <div style={{"height" : "600px", "width" : "900px"}} onClick={e=>show?setShow(false):<></>}>
            </div> */}


        </div>
    );

}

export default withRouter(SearchBook);

