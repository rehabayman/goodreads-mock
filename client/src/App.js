import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/privateRoute"
import Login from "./components/login.component";
import Home from "./pages/user/homepage";
import Profile from "./components/Profile";
// import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import Register from "./components/Register";
import NavBar from "./components/navbar";
import Category from './components/Category.js';
import BooksUser from './components/AllBooksUser';
import BooksAdmin from './components/AllBooksAdmin';
import CategoryList from './components/Categorylist.js';
import CategoryDetails from './components/CategoryDetails.js';
import BookDetails from './components/bookDetails'
import SearchBook from './components/SearchBook';
import SearchResult from './components/searchresults';
import Results from './components/Results';
function App() {

 
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
              <PrivateRoute path="/admin" component={BoardAdmin} />
              <PrivateRoute exact path="/categories"  component={Category} />

              <PrivateRoute exact path="/categories/all" component={CategoryList} />
              <PrivateRoute exact path="/categories/:categoryname/:id" component={CategoryDetails} />
              <PrivateRoute exact path="/books/all" component={BooksUser}/>
              <PrivateRoute exact path="/books/:id" component={BookDetails}/>
              <PrivateRoute exact path="/SearchResult" component={SearchResult} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/search" component={SearchBook} />
              <PrivateRoute exact path="/books/all/admin" component={BooksAdmin}/>
              <PrivateRoute exact path="/Results" component={Results} />

              {/* <Route path="/user" component={BoardUser} /> */}
{/*               
              <Route path="/admin" component={BoardAdmin} />
              <Route exact path="/categories" component={Category} />
              <Route exact path="/categories/all" component={CategoryList} />
              <Route exact path="/categories/:categoryname/:id" component={CategoryDetails} />
              <Route exact path="/books/all" component={BooksUser}/>
              <Route exact path="/books/all/admin" component={BooksAdmin}/>
              <Route exact path="/books/:id" component={BookDetails}/>
              */}
            </Switch>
          </div>
        </div>
      </Router>
    );

  }

export default App;
