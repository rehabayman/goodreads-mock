
import React, { useState, useEffect } from "react";
import authHeader from '../services/auth-header';
import axios from "axios";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserUpdateForm from "./UserUpdateForm";
import AuthService from '../services/auth.service';

const buttonStyle = {
  border: "none",
  padding: 0,
  color: "#069",
  textDecoration: "underline",
  cursor: "pointer",
  background: "none",
  width: "110px"
}

const Profile = () => {

  const [currentUser, setCurrentUser] = useState({});
  const [editStatus, setEditStatus] = useState(false);


  const onChangeEditStatus = () => {
    setEditStatus(!editStatus);
  }
  
  useEffect(() => {
    // console.log(currentUser.roles.includes('ROLE_ADMIN'), typeof currentUser.roles.includes('ROLE_ADMIN'));
    axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/users/profile`, { headers: authHeader() })
      .then(response => {
        setCurrentUser(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    editStatus ?
      (<UserUpdateForm
        firstName={currentUser.firstName}
        lastName={currentUser.lastName}
        email={currentUser.email}
        image={currentUser.image_path}
        editProfile={true}
        onChangeEditStatus={onChangeEditStatus}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
      />) :

      (<div className="container">
        <header className="jumbotron" style={{ display: "flex", flexDirection: "row" }}>
          <img src={currentUser.image_path ? process.env.PUBLIC_URL + "/users-profile-pics/" + currentUser.image_path : "//ssl.gstatic.com/accounts/ui/avatar_2x.png"} alt="User Profile"
            style={{ height: "200px", width: "200px" }} />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "2rem", marginTop: "3rem" }}>
            <h1>
              <strong>{currentUser.firstName} {currentUser.lastName}</strong>
            </h1>
            {
              !AuthService.getCurrentUser().roles.includes('ROLE_ADMIN') && 
              <button style={buttonStyle} onClick={onChangeEditStatus}>
                <FontAwesomeIcon icon={faEdit} style={{ marginRight: "0.5rem" }} />
                    Edit Profile
              </button>
              
            }
            
          </div>
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
      </div>)
  );
}
export default Profile
