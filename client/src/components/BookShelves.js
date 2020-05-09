
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import authHeader from '../services/auth-header'

const BookShelves=(props)=>  {
    console.log(props.bookId)
    
    const API_URL = "http://localhost:8000/books/shelves/"
    const [shelves,setShelves]= useState([]);
    const [selectedItem, setSelectedItem] = useState("want to read");

    useEffect(()=>{    // get the books' shelves
        axios.get(API_URL, {headers: authHeader()})                                                                 
        .then(response => {
            console.log(response)
            let shelvesFromApi = response.data.map(item => {
                return {value: item, display: item}
            });
            setShelves(shelvesFromApi);
        })
        .catch(err => {
            if(err.response) {
                if(err.response.status === 404) {
                    setShelves([]);                   
                }
            }
        })

    }, []);

    /**
     * YOU CAN CHANGE props.bookId WITH A STATIC book id FOR TESTING
     */
    const handleShelfChange = (e) => {
        setSelectedItem(e.target.value);
        const data = {shelf: e.target.value}
        axios.post(API_URL+props.bookId, data, {headers: authHeader()})
        .then(response => {
            console.log(response); // Book Shelf Object
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    return (
        <div className="container">
            <select value={selectedItem} onChange={handleShelfChange}>
                {
                    shelves.map(shelf => <option key={shelf.value} value={shelf.value}>{shelf.display}</option>)
                }
            </select>
        </div>
    );
    
}

export default BookShelves