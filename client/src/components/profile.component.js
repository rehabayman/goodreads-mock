
import React, { useState, useEffect } from "react";
// import AuthService from "../services/auth.service";
import authHeader from '../services/auth-header';
import axios from "axios";

const Profile=()=>{

        const[currentUser,setCurrentUser] = useState({})

        useEffect(() => {
          axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/users/profile`, {headers: authHeader()})
          .then(response => {
            setCurrentUser(response.data)
          })
          .catch(error => {
            console.log(error);
          });
        }, []);
        
        return (
          <div className="container">
            <header className="jumbotron" style={{display:"flex", flexDirection:"row"}}>
              <img src={process.env.PUBLIC_URL+"/users-profile-pics/"+currentUser.image_path} alt="User Profile" 
                  style={{height:"200px", width:"200px"}}/>
              <h1 style={{marginLeft:"2rem", marginTop:"3rem"}}>
                <strong>{currentUser.firstName} {currentUser.lastName}</strong>
              </h1>
            </header>
            <h4>
              <strong>First Name:</strong>{" "}
              {currentUser.firstName}
            </h4>
            <h4>
              <strong>Last Name:</strong>{" "}
              {currentUser.lastName}
            </h4>
            <h4>
              <strong>Email:</strong>{" "}
              {currentUser.email}
            </h4>
            <h4>
              <strong>Username:</strong>{" "}
              {currentUser.username}
            </h4>
          </div>
        );
}
export default Profile
