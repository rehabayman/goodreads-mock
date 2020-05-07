
import React from 'react';
import { useState, useEffect, Component } from "react";
import logo from '../logo.svg';
import '../App.css';
import "../App.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
const PORT = 5000;//server port
const DB_HOST = "localhost";



const Category = () => {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  useEffect(() => {
    setInterval(() => axios.get(`http://${DB_HOST}:${PORT}/categories`).then((res) => {
      setMessages(res.data);
      console.log(res.data);
      res.data.map(msg => {
        console.log(msg);
        messages.push(msg);
      });
    }), 5 * 1000);



  }
    , []);

  const handleChange = (e) => {
    const { target: { value } } = e;
    setInput(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let params = {
    //   id: 6,
    //   name: 'Fred'

    // }
    let res = await axios.post(`http://${DB_HOST}:${PORT}/categories`, { name: input }

    ).then(() => { setInput(''); });

    // console.log(res.data);
  }

  const handleDelete = async (id) => {

    let res = await axios.delete(`http://${DB_HOST}:${PORT}/categories/`+id);

    // console.log(res.data);
  }
  const handleEdit = async (id) => {
        // alert('Double Clicked');
    let category=prompt('edit category','');
    if (category !== null || category !== "") {
      let res = await axios.patch(`http://${DB_HOST}:${PORT}/categories/`+id,{name:category});
  }
    // console.log(res.data);
  }

  return (

    <div className="App">

      <p>
        <strong>ADD New Category</strong>
      </p>
      <form id="form" onSubmit={handleSubmit}>
        <input type="text" name="content" onChange={handleChange} value={input} />
        <button type="submit">Send</button>
      </form>
      <div>
        <table>
          <tr>
            <th scope="col">Category Index</th>
            <th scope="col">Category Name</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>

          </tr>

          {
            messages.map((message, index) => <tr key={message._id}><td>{index + 1}</td> <td>{message.name}</td>
              <td><button type="button" onClick={()=>{handleEdit(message._id)}}   class="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
                Edit
              </button>
              </td>
              <td>
              <button type="button" onClick={()=>{handleDelete(message._id)}} class="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
                  Delete
              </button>
                </td>
  
            </tr>)
          }

        </table>
      </div>


    </div>
  );
}


export default Category;

