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
  let [input, setInput] = useState('');
  const [modal, setModal] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');
  let [successMessage, setSuccessMessage] = useState('');
  let [id, setId] = useState('');

  useEffect(() => {

    axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/categories`, { headers: authHeader() }).then((res) => {
      setCategories(res.data);
      res.data.map(msg => {
        categories.push(msg);
        setSuccessMessage('');
      });
    }).catch(err => {
      console.log(err.message);
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
const handleAdd=(newCat)=>{
  axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/categories`, { name: newCat }, { headers: authHeader() })
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.match(/^[A-Za-z ]+$/)) {
      let oldCategory = categories.filter((cat) => (cat.name === input)).map(filtered => { return filtered.name; })
      let updateCategory = categories.filter((cat) => (cat._id === id)).map(filtered => { return filtered.name; })
      if(updateCategory[0]!==null && id!==""){
        if(input===oldCategory[0])
        {
          setSuccessMessage('');
          setErrorMessage("Category already exists");
        }
        else
            handleUpdate(input);
            setId('');
      }
      else if (oldCategory.length <= 0) {
       handleAdd(input);
      }
      else  {
        console.log('Category already exists');
        setSuccessMessage('');
        setErrorMessage('Category already exists');
      }

    }
    else {
      setSuccessMessage('');
      setErrorMessage('Category name is invalid, Cannot be empty please enter characters only.');
    }
    setInput('');
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
    setId('');
  }
  const handleUpdate=(category)=>{
      let isexistCategory = categories.filter((cat) => (cat.name === category)).map(filtered => { return filtered.name; })
      if (isexistCategory.length === 0 && category !== null) {
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
      setId('');
  }
  const handleEdit = (id) => {
    setId(id);
    let oldCategory = categories.filter((cat) => (cat._id === id)).map(filtered => { return filtered.name; })
    modalOpen();
 
    if(input==="" && id!==null)
    setInput(oldCategory[0]);

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
  const categoriesStyle ={
    fontFamily: "Trebuchet MS, Arial, Helvetica, sans-serif",
    borderCollapse: "collapse",
    width: "100%",
    "&:lastChild": {
      borderRight: "solid 1px #cccccc"
    } ,
   " nthChild(even)":
    {backgroundColor:" #f2f2f2"}
  }
  const categoriesindexStyle ={
    border: "1px solid #ddd",
    padding: "8px",
    width: "10%",
  }
  const categoriesDataStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    '&:hover': {
      backgroundColor: '#DDEEEE',
    },
    "&:lastChild": {
      borderRight: "solid 1px #cccccc"
    } ,
   " nthChild(even)":
    {backgroundColor:" #f2f2f2"}
  }
 
  const categoriesHeaderStyle= {
    paddingTop: "12px",
    paddingBottom: "12px",
    textAlign: "center",
    backgroundColor: "#A9A9A9",
    color: "white",
    border: "1px solid #ddd",
    padding: "8px",
  }
  return (

    <div className="App">

      <button variant="primary" className="btn-btn-primary" onClick={() => modalOpen()} type="button">
        Add New Category
      </button>

      <div className="error" style={{ backgroundColor: '#FFD2D2', color: '#D8000' }}> {errorMessage} </div>

      <div className="error" style={{ backgroundColor: '#DFF2BF', color: '##4F8A10' }}> {successMessage} </div>
      <Modal show={modal} onHide={() => modalClose()}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title" style={styleModal}>
        <Modal.Header closeButton style={modalHeader}>
          <Modal.Title id="example-custom-modal-styling-title">Add/update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalBody}>
          <div className="form-group">
            <label></label>
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
        <table style={categoriesStyle}>
          <thead >
            <tr >
              <th scope="col" style={categoriesHeaderStyle}>Category Index</th>
              <th scope="col" style={categoriesHeaderStyle}>Category Name</th>
              <th scope="col" style={categoriesHeaderStyle}>Edit</th>
              <th scope="col" style={categoriesHeaderStyle}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map((cat, index) =>
                <tr key={cat._id}>
                  <td style={categoriesindexStyle}>{index + 1}</td>
                  <td style={categoriesDataStyle}>{cat.name}</td>
                  <td style={categoriesDataStyle}><button type="button" onClick={() => { handleEdit(cat._id) }} className="btn btn-info">
                    Edit
                      </button>
                  </td>
                  <td style={categoriesDataStyle}><button type="button" onClick={() => { handleDelete(cat._id) }} className="btn btn-danger">
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

