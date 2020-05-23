import React, { useState, useEffect } from 'react'
import axios from 'axios';
import authHeader from '../services/auth-header';
import { Link } from "react-router-dom";
import  { Input }  from "reactstrap";
import Modal from 'react-bootstrap/Modal';

const AllBooksAdmin = (props) => {
    const API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/`;
    const API_auth_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/`;
    const API_cat_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/categories/`
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState(false);
    // const [input, setInput] = useState('');
    const [name, setNameInput] = useState('');
    const [author, setAuthorInput] = useState('');
    const [category, setCategoryInput] = useState('');
    const [image_path, setImageInput] = useState(null);
    const [authorErr,setAuthorErr]=useState('')
    const [categoryErr,setCategoryErr]=useState('')
    const [nameErr,setNameErr]=useState('')
    const [imageErr,setImageErr]=useState('')
    console.log("books admin")
    console.log(modal)
   
    const modalOpen = () => {
        setModal(true);
        // setValue(arg)
    }
    const modalClose = () => {
        setModal(false);
      }    
    const nameChange = (e) => {
        const { target: { value } } = e;
        setNameInput(value);  
      }
    const authorChange = (e) => {
        const { target: { value } } = e;
        if (!(value === "1"))
            setAuthorInput(value);
    }
    const categoryChange = (e) => {
        const { target: { value } } = e;
        if (!(value === "1"))
            setCategoryInput(value);
    }
    const imageChange = (e) => {
        // const { target: { value } } = e;
        setImageInput(e.target.files[0]);
        // console.log(typeof value,value)
        
    }
    useEffect(() => {    // get all books
        axios.get(API_URL, { headers: authHeader() })
            .then(response => {
                setBooks(response.data)
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 404) {
                        setBooks([]);
                    }
                }
            })
  //get all authors
        axios.get(API_auth_URL, { headers: authHeader() })
            .then(response => {
                let data = [{firstName: "Choose ", lastName: "Author", _id: 1}];
                data = data.concat(response.data.authors);
                console.log("author", response.data)
                setAuthors(data)
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 404) {
                        setAuthors([]);
                    }
                }
            })
     //get all categories
        axios.get(API_cat_URL, { headers: authHeader() })
            .then(response => {
                let data = [{name: "Choose Category", _id: 1}];
                data = data.concat(response.data);
                // console.log("data", data);
                setCategories(data)
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 404) {
                        setCategories([]);
                    }
                }
            })
    }, [modal]);
    const styleModal = {
        fontSize: 20,
        color: "#4a54f1",
        textAlign: "center",
        display: 'none', /* Hidden by default */
        position: 'fixed', /* Stay in place */
        // overflow: 'auto' 
      }
    const modalHeader = {
        padding: '2px 16px',
        backgroundColor: '#5cb85c',
        color: 'white'
      }
    
      const modalBody = { padding: '2px 16px' }
    
      const modalFooter = {
        padding: '2px 16px',
        backgroundColor: '#5cb85c',
        color: 'white'
      }


    const handleDelete = (id) => {
        axios.delete(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/` + id, { headers: authHeader() })
            .then((res) => {
                console.log(res);
                console.log(authHeader());
                setBooks(books.filter(book => book._id !== id));
            })
            .catch(err => {
                console.log(err);
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // switch(value){
        // case "add":
        if(!author||!category||!name||!image_path){
            author? setAuthorErr(""):setAuthorErr("Please choose an author");
            category? setCategoryErr(""):setCategoryErr("Please choose a category");
            name? setNameErr(""): setNameErr("Please enter a name");
            image_path? setImageErr(""): setImageErr("Please choose a cover for the book");
            return
        }
        else{
            setAuthorErr("")
            setCategoryErr("")
            setNameErr("")
            let form = new FormData();
            let config = {
                headers: authHeader()
            }
            config['content-type'] = 'multipart/form-data';
            form.append('name', name);
            form.append('image_path', image_path);
            form.append('author', author);
            form.append('category', category);

            axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/add`, form, config)
            .then((res) => {
                setBooks([...books, res.data]);
                resetAll();
            })
            .catch((err) => {
                console.log("test",err)
            });

        }
        // break;
        // case "edit":
        //     axios.patch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/`
    }

    const resetAll=()=>{
        setModal(false)
        setNameInput("")
        setAuthorInput("")
        setCategoryInput("")
        setImageInput("")
        setAuthors([])
        setCategories([])
        modalClose();
    }

    const categoiresView = categories.length ? categories.map(category =>
        <option key={category._id} value={category._id}>{category.name}</option>
    ) : null;
    const authorView = authors.length ? authors.map(author =>
        <option key={author._id} value={author._id}>{author.firstName} {author.lastName}</option>
    ) : null;

   
    return (
        books.length > 0 ?
        (
            <div>
                <button onClick={() => modalOpen("add")}>
                        Add New Book
                </button>
                <Modal show={modal} onHide={() => modalClose()}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title" style={styleModal}>

                    <Modal.Header closeButton style={modalHeader}>
                        <Modal.Title id="example-custom-modal-styling-title">Add New Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={modalBody}>
                        <div className="form-group">
                            <label>Book Name</label>
                            <Input
                                type="text"
                                value={name}
                                name="modalInputName"
                                onChange={nameChange}
                                className="form-control"
                                size="30" placeholder="Name"
                            />
                            <p style={{color:"red",fontSize:'12px'}}>{nameErr}</p>

                            <label>Author</label>
                            <Input
                                type="select"
                                name="author"
                                onClick={authorChange}
                                className="form-control"
                            >
                                {authorView}
                            </Input>
                            <p style={{color:"red",fontSize:'12px'}}>{authorErr}</p>
                            <label>Category</label>
                            <Input
                                type="select"
                                name="category"
                                onClick={categoryChange}
                                className="form-control"
                            >
                                {categoiresView}                  
                            </Input>
                            <p style={{color:"red",fontSize:'12px'}}>{categoryErr}</p>
                            <label>Image</label>
                            <Input type="file"
                                    name = "image_path"
                                    onChange={imageChange}
                                    className="form-control"
                            />
                            <p style={{color:"red",fontSize:'12px'}}>{imageErr}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={modalFooter}>
                        <div className="form-group">
                            <button variant="secondary" onClick={handleSubmit} type="button">
                                Save
                            </button>
                            <button variant="secondary" onClick={() => modalClose()}>
                                Close
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Book Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Author</th>
                            <th scope="col">Book Cover</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book =>
                            <tr key={book._id}>
                                <td><Link to={`/books/${book._id}`}>{book.name}</Link></td>
                                <td>{book.category.name}</td>
                                <td>{book.author.firstName + " " + book.author.lastName}</td>
                                <td>
                                    <Link to={`/books/${book._id}`}>
                                        <img className="card-img-top" src={book.image_path ? process.env.PUBLIC_URL + "/books-covers/" + book.image_path : "/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"} alt="Book Cover" style={{width:"100px", height:"100px"}}/>
                                    </Link>
                                </td>
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

            <button variant="primary" onClick={() => modalOpen("add")}>
                    Add New Book
            </button>
                <h3>No Books Yet.</h3>
            </div>
    )
}

export default AllBooksAdmin;