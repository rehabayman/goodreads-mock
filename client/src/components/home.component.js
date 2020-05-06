import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import Populars from "./popular-live.component.js";
import Footer from "./footer.js";

const Home=()=> {
  
  const [content,setContent]=useState("")

  useEffect(()=>{
    UserService.getPublicContent().then(
        response => {
         
           setContent(response.data)
         
        },
        error => {
          
           setContent(
              (error.response && error.response.data) ||
              error.message ||
              error.toString()
           )
         
        }
      );
  },[])

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <main>
        <Populars />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
export default Home