import React from 'react';
import { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import authHeader from '../services/auth-header';
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

const Category = (props) => {

  const [categories, setCategories] = useState([]);
  let [input, setInput] = useState('');
  const [modal, setModal] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');
  let [successMessage, setSuccessMessage] = useState('');
  let [id, setId] = useState('');
let [modalName,setmodalName]=useState('Add new');
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
    setInput('');
  }
  const handleChange = (e) => {
    const { target: { value } } = e;
    setInput(value);

  }
  const handleAdd = (newCat) => {
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
      if (updateCategory[0] !== null && id !== "") {
        if (input === oldCategory[0]) {
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
      else {
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
  const handleUpdate = (category) => {
    let isexistCategory = categories.filter((cat) => (cat.name === category)).map(filtered => { return filtered.name; })
    if (isexistCategory.length === 0 && category !== null) {
      axios.patch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/categories/` + id, { name: category }, { headers: authHeader() })
        .then((res) => {
          console.log(res);
          setErrorMessage('');
          setSuccessMessage('Category updated successfully');
          setCategories(
            categories.map(el => (el._id === res.data._id ? Object.assign({}, el, { name: res.data.name }) : el))
          );
        })
        .catch(err => {
          console.log(err);
          setSuccessMessage('');
          setErrorMessage(err.message);
        });
    }
    setId('');
    setmodalName('')
  }
  const handleEdit = (id) => {
    setId(id);
    let oldCategory = categories.filter((cat) => (cat._id === id)).map(filtered => { return filtered.name; })
    modalOpen();
    setmodalName("Update");
    if (input === "" && id !== null)
      setInput(oldCategory[0]);

  }
  const styleModal = {
    fontSize: 20,
    color: "#4a54f1",
    textAlign: "center",
    display: 'none', /* Hidden by default */
    position: 'fixed', /* Stay in place */
  }

  const modalBody = { padding: '2px 16px' }

  return (

    <div className="App">

      <button style={buttonStyle} onClick={e=>{modalOpen();setmodalName('Add new')}} className="bg-dark text-white"> 
        <FontAwesomeIcon icon={faPlusCircle} />
      </button>

      <div className="error mt-3" style={{ backgroundColor: '#FFD2D2', color: '#D8000', width:"350px", fontSize: "20px", marginLeft: "23rem" }}> {errorMessage} </div>
      <div className="success mt-3" style={{ backgroundColor: '#DFF2BF', color: '##4F8A10', width:"350px", fontSize: "20px", marginLeft: "23rem" }}> {successMessage} </div>
      
      <Modal show={modal} onHide={modalClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title" style={styleModal} className="text-dark">
        <Modal.Header className="bg-dark text-white">
          <Modal.Title id="example-custom-modal-styling-title">{modalName} Category</Modal.Title>
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
        <Modal.Footer className="bg-dark text-white">
          <div className="form-group">
            <button variant="secondary" onClick={handleSubmit} type="button">
              Save
            </button>
            <button variant="secondary" onClick={e=>{modalClose();}}>
              Close
          </button>
          </div>
        </Modal.Footer>
      </Modal>
      <div>
        <table className="table">
          <thead className="thead-dark">
            <tr >
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
                  <td>
                    <button type="button" onClick={() => handleEdit(cat._id) } className="btn btn-warning">
                      Edit
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDelete(cat._id) } className="btn btn-danger">
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

