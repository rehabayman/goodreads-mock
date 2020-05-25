import React, { useState, useEffect } from 'react'
import axios from 'axios';
import authHeader from '../services/auth-header';
import { Link } from "react-router-dom";
import { Input } from "reactstrap";
import Modal from 'react-bootstrap/Modal';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const buttonStyle = {
    border: "none",
    padding: "5px",
    cursor: "pointer",
    width: "auto",
    marginTop: "1rem",
    marginBottom: "1rem",
    fontSize: "1.5rem",
    float: "right",
    borderRadius: "8px"
}

const AllBooksAdmin = () => {
    const API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/`;
    const API_auth_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/`;
    const API_cat_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/categories/`
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [name, setNameInput] = useState('');
    const [author, setAuthorInput] = useState('');
    const [category, setCategoryInput] = useState('');
    const [image_path, setImageInput] = useState(null);
    const [authorErr, setAuthorErr] = useState('')
    const [categoryErr, setCategoryErr] = useState('')
    const [nameErr, setNameErr] = useState('')
    const [ide, setIde] = useState('')
    const [imageErr, setImageErr] = useState('')

    const modalOpen1 = () => {
        setModal1(true);
    }
    const modalClose1 = () => {
        setModal1(false);
    }
    const modalOpen2 = (ide) => {
        setIde(ide);
        setModal2(true);

    }
    const modalClose2 = () => {
        setModal2(false);
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
        setImageInput(e.target.files[0]);
    }
    useEffect(() => {
        //////////// get all books //////////
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
        //////////// get all authors //////////////
        axios.get(API_auth_URL, { headers: authHeader() })
            .then(response => {
                let data = [{ firstName: "Choose ", lastName: "Author", _id: 1 }];
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
        ///////////////// get all categories /////////////////
        axios.get(API_cat_URL, { headers: authHeader() })
            .then(response => {
                let data = [{ name: "Choose Category", _id: 1 }];
                data = data.concat(response.data);
                setCategories(data)
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 404) {
                        setCategories([]);
                    }
                }
            })
    }, []);
    const styleModal = {
        fontSize: 20,
        textAlign: "center",
        display: 'none', /* Hidden by default */
        position: 'fixed', /* Stay in place */
        // overflow: 'auto' 
    }

    const modalBody = { padding: '2px 16px' }

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
        if (!author || !category || !name || !image_path) {
            author ? setAuthorErr("") : setAuthorErr("Please choose an author");
            category ? setCategoryErr("") : setCategoryErr("Please choose a category");
            name ? setNameErr("") : setNameErr("Please enter a name");
            image_path ? setImageErr("") : setImageErr("Please choose a cover for the book");
            return
        }
        else {
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
                    modalClose1();
                    resetAll();
                })
                .catch((err) => {
                    console.log("test", err)
                });

        }
    }
    const handleEditSubmit = (e) => {
        e.preventDefault();
        let form = new FormData();
        let config = {
            headers: authHeader()
        }
        config['content-type'] = 'multipart/form-data';
        form.append('name', name);
        form.append('image_path', image_path);
        form.append('author', author);
        form.append('category', category);
        config['content-type'] = 'multipart/form-data';
        axios.patch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/` + ide, form, config)
            .then((res) => {
                console.log(res);
                setBooks(
                    books.map(el => (el._id === res.data._id ? Object.assign({}, el, { name: res.data.name, category: res.data.category, author: res.data.author, image_path: res.data.image_path }) : el))
                );
                modalClose2();
            })
            .catch(err => {
                console.log(err);
            });
    }


    const resetAll = () => {
        setModal1(false)
        setNameInput("")
        setAuthorInput("")
        setCategoryInput("")
        setImageInput("")
        // setAuthors([])
        // setCategories([])
        modalClose1();
    }

    let categoiresView = categories.length ? categories.map(category =>
        <option key={category._id} value={category._id}>{category.name}</option>
    ) : null;
    let authorView = authors.length ? authors.map(author =>
        <option key={author._id} value={author._id}>{author.firstName} {author.lastName}</option>
    ) : null;


    return (
        books.length > 0 ?
            (
                <div>
                    <button style={buttonStyle} onClick={() => modalOpen1()} className="bg-dark text-white"> 
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </button>
                    
                    <Modal show={modal1} onHide={modalClose1}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title" style={styleModal} className="text-dark">

                        <Modal.Header closeButton className="bg-dark text-white">
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
                                <p style={{ color: "red", fontSize: '12px' }}>{nameErr}</p>

                                <label>Author</label>
                                <Input
                                    type="select"
                                    name="author"
                                    onClick={authorChange}
                                    className="form-control"
                                >
                                    {authorView}
                                </Input>
                                <p style={{ color: "red", fontSize: '12px' }}>{authorErr}</p>
                                <label>Category</label>
                                <Input
                                    type="select"
                                    name="category"
                                    onClick={categoryChange}
                                    className="form-control"
                                >
                                    {categoiresView}
                                </Input>
                                <p style={{ color: "red", fontSize: '12px' }}>{categoryErr}</p>
                                <label>Image</label>
                                <Input type="file"
                                    name="image_path"
                                    onChange={imageChange}
                                    className="form-control"
                                />
                                <p style={{ color: "red", fontSize: '12px' }}>{imageErr}</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="bg-dark text-white">
                            <div className="form-group">
                                <button variant="secondary" onClick={handleSubmit} type="button">
                                    Save
                                </button>
                                <button variant="secondary" onClick={modalClose1}>
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
                                            <img className="card-img-top" src={book.image_path ? process.env.PUBLIC_URL + "/books-covers/" + book.image_path : "/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"} alt="Book Cover" style={{ width: "100px", height: "100px" }} />
                                        </Link>
                                    </td>
                                    <td><button type="button" onClick={() => modalOpen2(book._id)} className="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
                                        Edit
                                    </button>
                                    </td>
                                    <Modal show={modal2} onHide={modalClose2}
                                        dialogClassName="modal-90w"
                                        aria-labelledby="example-custom-modal-styling-title" style={styleModal} className="text-dark">
                                        <Modal.Header closeButton className="bg-dark text-white">
                                            <Modal.Title id="example-custom-modal-styling-title">Edit Book</Modal.Title>
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
                                                <label>Author</label>
                                                <Input
                                                    type="select"
                                                    name="author"
                                                    onClick={authorChange}
                                                    className="form-control"
                                                >
                                                    {authorView}
                                                </Input>
                                                <label>Category</label>
                                                <Input
                                                    type="select"
                                                    name="category"
                                                    onClick={categoryChange}
                                                    className="form-control"
                                                >
                                                    {categoiresView}
                                                </Input>
                                                <label>Image</label>
                                                <Input type="file"
                                                    name="image_path"
                                                    onChange={imageChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer className="bg-dark text-white">
                                            <div className="form-group">

                                                <button variant="secondary" onClick={handleEditSubmit} type="button">
                                                    Edit
                                                </button>
                                                <button variant="secondary" onClick={modalClose2}>
                                                    Close
                                                </button>
                                            </div>
                                        </Modal.Footer>
                                    </Modal>

                                    <td><button type="button" onClick={() => { handleDelete(book._id) }} className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
                                        Delete
                                    </button>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>)
            :
            <div key="container_empty" className="container d-flex flex-column justify-content-center align-items-center mt-5">
                <h3>No Books Yet.</h3>
                <button className="btn btn-dark" onClick={() => modalOpen1("add")} style={{width:"150px"}}>
                    Add New Book
                </button>
                <Modal show={modal1} onHide={modalClose1}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title" style={styleModal} className="text-dark">

                    <Modal.Header closeButton className="bg-dark text-white">
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
                            <p style={{ color: "red", fontSize: '12px' }}>{nameErr}</p>

                            <label>Author</label>
                            <Input
                                type="select"
                                name="author"
                                onClick={authorChange}
                                className="form-control"
                            >
                                {authorView}
                            </Input>
                            <p style={{ color: "red", fontSize: '12px' }}>{authorErr}</p>
                            <label>Category</label>
                            <Input
                                type="select"
                                name="category"
                                onClick={categoryChange}
                                className="form-control"
                            >
                                {categoiresView}
                            </Input>
                            <p style={{ color: "red", fontSize: '12px' }}>{categoryErr}</p>
                            <label>Image</label>
                            <Input type="file"
                                name="image_path"
                                onChange={imageChange}
                                className="form-control"
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="bg-dark text-white">
                        <div className="form-group">
                            <button variant="secondary" onClick={handleSubmit} type="button">
                                Save
                            </button>
                            <button variant="secondary" onClick={modalClose1}>
                                Close
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>


            </div>
    )
}

export default AllBooksAdmin;