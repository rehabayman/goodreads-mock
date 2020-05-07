import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login.component";
// import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import Register from "./components/register.component";
import NavBar from "./components/navbar"
import Category from './components/Category.js';

function App() {

  return (
    <Router>
      <div>
        <NavBar/>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/admin" component={BoardAdmin} />
              <Route exact path="/categories" component={Category} />

            </Switch>
          </div>
        </div>
      </Router>
    );

  }

export default App;
