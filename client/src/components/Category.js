
import React from 'react';
import { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import authHeader from '../services/auth-header'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Modal } from 'react-bootstrap'
// import ModalHeader from 'react-bootstrap/ModalHeader';
// import ModalTitle from 'react-bootstrap/ModalTitle';
// import ModalBody from 'react-bootstrap/ModalBody';
// import ModalFooter from 'react-bootstrap/ModalFooter';



const Category = (props) => {

  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState('');
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {

    axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/categories`, { headers: authHeader() }).then((res) => {
      setCategories(res.data);
      // console.log(res.data);
      res.data.map(msg => {
        // console.log(msg);
        categories.push(msg);
        setSuccessMessage('');

      });
    }).catch(err => {
      console.log(err);
      setSuccessMessage('');
      setErrorMessage(err.message);

    });
  }, []);

  const modalOpen = () => {
    setModal(true);
  }

  const modalClose = () => {
    setModal(false);
  }
  const handleChange = (e) => {
    const { target: { value } } = e;
    setInput(value);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // let errors = {};
    if (input.match(/^[a-zA-Z]+$/)) {
      let oldCategory = categories.filter((cat) => (cat.name === input)).map(filtered => { return filtered.name; })

      if (oldCategory.length <= 0) {
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/categories`, { name: input }, { headers: authHeader() })
        .then((res) => {
          setInput('');
          setErrorMessage('');
          setCategories(categories.concat(res.data));
          setSuccessMessage('Category added successfully'); 
        })
        .catch(err => {
          console.log(err);
          setSuccessMessage('');
          setErrorMessage(err.message);
        });
      }
      else if (oldCategory) {
        console.log('Category already exists');
        setSuccessMessage('');
        setErrorMessage('Category already exists');
      }

    }
    else {
      setErrorMessage('Category name is invalid, Cannot be empty please enter characters only.');
    }
    modalClose();
  }

  const handleDelete = (id) => {

    axios.delete(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/categories/` + id, { headers: authHeader() })
    .then((res) => {
      console.log(res);
      setErrorMessage('');
      setCategories(categories.filter(cat => cat._id !== id));
    })
    .catch(err => {
      console.log(err);
      setSuccessMessage('');
      setErrorMessage(err.message);
    });
    setSuccessMessage('Category deleted successfully '); 
  }

  const handleEdit = (id) => {

    let oldCategory = categories.filter((cat) => (cat._id === id)).map(filtered => { return filtered.name; })
    let category = prompt('edit category', oldCategory);
    let isexistCategory = categories.filter((cat) => (cat.name === category)).map(filtered => { return filtered.name; })

    if (category === oldCategory[0]) {
      setSuccessMessage("You Haven't Edited the Category");
    }
    else if (category === null || category === "") {
      setErrorMessage('Category name is invalid, Cannot be empty please enter characters only.');
    }
    else if (isexistCategory.length === 0 && category !== null) {
      if (category.match(/^[a-zA-Z]+$/)) {
        axios.patch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/categories/` + id, { name: category }, { headers: authHeader() })
        .then((res) => {
          console.log(res);
          setErrorMessage('');
          setSuccessMessage('Category updated successfully');
          setCategories(
            categories.map(el => (el._id === res.data._id ? Object.assign({}, el, {name: res.data.name}) : el))
          );
        })
        .catch(err => {
          console.log(err);
          setSuccessMessage('');
          setErrorMessage(err.message);
        });
      }
      else {
        setErrorMessage('Category name is invalid,Cannot be empty please enter characters only');
      }

    }
    else {
      setSuccessMessage('');
      setErrorMessage('Category name already exists ');
      console.log('Category already exists');
    }


  }
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
  return (

    <div className="App">
      {/* <p>
        <strong>ADD New Category</strong>
      </p>
       */}

      <button variant="primary" onClick={() => modalOpen()}>
        Add New Category
      </button>

      <div className="error" style={{ backgroundColor: '#FFD2D2', color: '#D8000' }}> {errorMessage} </div>

      <div className="error" style={{ backgroundColor: '#DFF2BF', color: '##4F8A10' }}> {successMessage} </div>
      <Modal show={modal} onHide={() => modalClose()}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title" style={styleModal}>
        <Modal.Header closeButton style={modalHeader}>
          <Modal.Title id="example-custom-modal-styling-title">Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalBody}>
          <div className="form-group">
            <label>Enter Category:</label>
            <input
              type="text"
              value={input}
              name="modalInputName"
              onChange={e => handleChange(e)}
              className="form-control"
              size="30" placeholder="Name"
            />
          </div>
        </Modal.Body>
        <Modal.Footer style={modalFooter}>
          <div className="form-group">
            <button variant="secondary" onClick={e => handleSubmit(e)} type="button">
              Save
            </button>
            <button variant="secondary" onClick={() => modalClose()}>
              Close
          </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* <form id="form" onSubmit={handleSubmit}>
        <input type="text" name="content" onChange={handleChange} value={input} />
        <button type="submit">Send</button>
      </form> */}
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Category Index</th>
              <th scope="col">Category Name</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map((cat, index) =>
                <tr key={cat._id}>
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>
                  <td><button type="button" onClick={() => { handleEdit(cat._id) }} className="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
                    Edit
                      </button>
                  </td>
                  <td><button type="button" onClick={() => { handleDelete(cat._id) }} className="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
                    Delete
                      </button>
                  </td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;


