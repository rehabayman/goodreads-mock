import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import Populars from "../../components/popular-live.component";
import UserBooks from "../../components/userBooks";

import Footer from "../../components/footer.js";

const Home = () => {

  const [content, setContent] = useState("")

  useEffect(() => {
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
  }, [])


  return (
    <div style={{height: "41rem"}}>

      <main style={{height: "91.9%"}}>
        {
          JSON.parse(localStorage.getItem('user')) ?
            <UserBooks /> :
            <Populars />
        }
      </main>

      {/* <footer> */}
        {
          JSON.parse(localStorage.getItem('user')) ? "" :
            <Footer/>
        }
      {/* </footer> */}
    </div>
  );
}
export default Home