import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link , Redirect} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login.component";
// import Register from "./components/register.component";
import Home from "./pages/user/homepage";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import Register from "./components/register.component";
import NavBar from "./components/navbar"
import Category from './components/Category.js';
import BooksUser from './components/AllBooksUser';
import CategoryList from './components/Categorylist.js';
import CategoryDetails from './components/CategoryDetails.js';
import BookDetails from './components/bookDetails'
import authHeader from './services/auth-header'
import axios from 'axios'
import PrivateRoute from './components/privateRoute'


function App() {

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}`, {headers: authHeader()})                                                                 
    .then(response => {
       console.log(response)
    })
    .catch(err => {
        console.log(err.message)
    })
  })

  return (
    <Router>
      <div>
        <NavBar/>

          <div className="container">
            <Switch>              
              <Route exact path={"/"} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute path="/user" component={BoardUser} />
              <PrivateRoute path="/admin" component={BoardAdmin} />
              <PrivateRoute path="/categories"  component={Category} />

              <PrivateRoute exact path="/categories/all" component={CategoryList} />
              <PrivateRoute exact path="/categories/:categoryname/:id" component={CategoryDetails} />
              <PrivateRoute exact path="/books" component={BooksUser}/>
              <PrivateRoute exact path="/books/:id" component={BookDetails}/>
            </Switch>
          </div>
        </div>
      </Router>
    );

  }

export default App;
