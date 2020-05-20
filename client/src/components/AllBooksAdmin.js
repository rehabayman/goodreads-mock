import React, {useState, useEffect} from 'react'
import axios from 'axios';
import authHeader from '../services/auth-header';
import { Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

const AllBooksAdmin=(props)=>  {
    
    const API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/`;
    const [books, setBooks] = useState([]);
    const [modal, setModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const modalOpen = () => {
        setModal(true);
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

    }, []);
    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/` + id, { headers: authHeader() })
        .then((res) => {
        console.log(res);
        console.log(authHeader());
        setErrorMessage('');
        setBooks(books.filter(book => book._id !== id));
        })
        .catch(err => {
        console.log(err);
        setSuccessMessage('');
        setErrorMessage(err.message);
        });
        setSuccessMessage('Book deleted successfully '); 
      }

    return (
        books.length > 0 ?
        (<div>
            <button variant="primary" onClick={() => modalOpen()}>
                Add New Book
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Book Cover</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
              {books.map(book =>   
              <tr key={book._id}>
                <td><Link to={`/books/${book._id}`}>{book.name}</Link></td>
                <td>{book.category.name}</td>
                <td>{book.author.firstName}</td>
                <td><Link to={`/books/${book._id}`}><img className="card-img-top" src={book.image_path ? book.image_path : "/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"} alt="Book Cover"></img></Link></td>
                <td><button type="button" className="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
                    Edit
                    </button>
                </td>
                <td><button type="button" onClick={() => { handleDelete(book._id) }} className="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
                Delete
                </button>
                </td>
            </tr>
          )}

                </tbody>
            </table>
        </div>)
    :
    <div key="container_empty" className="container d-flex justify-content-center mt-5">
            <button variant="primary" onClick={() => modalOpen()}>
                Add New Book
            </button>
            <h3>No Books Yet.</h3>
    </div>
    )}             

export default AllBooksAdmin;