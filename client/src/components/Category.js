
import React from 'react';
import { useState, useEffect, Component } from "react";
import logo from '../logo.svg';
import '../App.css';
import "../App.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
// import { Modal } from 'react-bootstrap'

import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import authHeader from '../services/auth-header'

const PORT = 8000;
const DB_HOST = "localhost";



const Category = (props) => {

  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState('');
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage,setSuccessMessage]=useState('');

  useEffect(() => {

    setInterval(() => axios.get(`http://${DB_HOST}:${PORT}/categories`, { headers: authHeader() }).then((res) => {
      setCategories(res.data);
      // console.log(res.data);
      res.data.map(msg => {
        // console.log(msg);
        categories.push(msg);
        setSuccessMessage('');

      });
    }).catch(err => {
      console.log(err.message);
      setSuccessMessage('');
      setErrorMessage(err.message);

    }), 5 * 1000);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let errors = {};
    if (input.match(/^[a-zA-Z]+$/)) {
      let oldCategory = categories.filter((cat) => (cat.name === input)).map(filtered => { return filtered.name; })
      // console.log(oldCategory);

      if (oldCategory.length <= 0) {
        let res = await axios.post(`http://${DB_HOST}:${PORT}/categories`, { name: input }, { headers: authHeader() }

        ).then((res) => {
          setInput(''); console.log(res);
          setErrorMessage('');
        })
          .catch(err => {
            console.log(err);
            setSuccessMessage('');
            setErrorMessage({errorMessage: err.message});

          })

          // setSuccessMessage('Category added successfully '); 

      }
      else if (oldCategory)
        {console.log('Category already exists');
        setSuccessMessage('');
        setErrorMessage('Category already exists');}
          
    }
    else{
      setErrorMessage('Category name is invalid,Cannot be empty please enter characters only');
    }
    modalClose();
  }

  const handleDelete = async (id) => {

    let res = await axios.delete(`http://${DB_HOST}:${PORT}/categories/` + id, { headers: authHeader() }).
      then((res) => {
        console.log(res);
        setErrorMessage('');
      })
      .catch(err => {
        console.log(err);
        setSuccessMessage('');
        setErrorMessage({errorMessage: err.message});

      });
      // setSuccessMessage('Category deleted successfully '); 

    // console.log(res.data);
  }

  const handleEdit = async (id) => {

    let oldCategory = categories.filter((cat) => (cat._id === id)).map(filtered => { return filtered.name; })
    // console.log(oldCategory);
    let category = prompt('edit category', oldCategory);
    // console.log(category);
    let isexistCategory = categories.filter((cat) => (cat.name === category)).map(filtered => { return filtered.name; })
    // console.log(isexistCategory);

    if (category === oldCategory) {
      await axios.patch(`http://${DB_HOST}:${PORT}/categories/` + id, { name: category }, { headers: authHeader() })
        .then((res) => {
          console.log(res);
          setErrorMessage('');
        })
        .catch(err => {
          console.log(err);
          setSuccessMessage('');
          setErrorMessage({errorMessage: err.message});

        });

    }
    else if (category === null || category === "") {
      setErrorMessage('Category name is invalid,Cannot be empty please enter characters only');
      console.log('Can not  change to this category name');
    }

    else if (isexistCategory.length === 0 && category !== null) {
      if (category.match(/^[a-zA-Z]+$/)) {
        await axios.patch(`http://${DB_HOST}:${PORT}/categories/` + id, { name: category }, { headers: authHeader() })
          .then((res) => {
            console.log(res);
            setErrorMessage('');
          })
          .catch(err => {
            console.log(err);
            setSuccessMessage('');
            setErrorMessage({errorMessage: err.message});

          });
          // setSuccessMessage('Category updated successfully '); 
      }
      else{
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
      
        <div className="error" style={{backgroundColor:'#FFD2D2',color:'#D8000'}}> {errorMessage } </div> 
       
        <div className="error" style={{backgroundColor:'#DFF2BF',color:'##4F8A10'}}> {successMessage } </div> 
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

