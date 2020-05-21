import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/users/auth/`
// const SIGNUP_URL = "http://localhost:8000/users/auth/signup"


function AuthService ()  {
  return ({
    login: (username, password)=> {
      return axios
        .post(API_URL + "signin", {
          username,
          password
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }

          return response.data;
        });
    },

    logout: ()=>{
      localStorage.removeItem("user");
    },

    getCurrentUser: () =>{
      return JSON.parse(localStorage.getItem('user'));;
    },

    register: (username, email, password, firstname, lastname, image) => {
      let form = new FormData();
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      form.append('firstName', firstname);
      form.append('lastName', lastname);
      form.append('username', username);
      form.append('email', email);
      form.append('password', password);
      form.append('image', image);
      return (
        axios.post(API_URL+"signup", form, config)
      )
    },

    update: (email, password, firstName, lastName, image) => {
      let config = {
        headers: authHeader()
      }
      config['content-type'] = 'multipart/form-data';
      let form = new FormData();
      if(firstName) form.append('firstName', firstName);
      if(lastName) form.append('lastName', lastName);
      if(email) form.append('email', email);
      if(password) form.append('password', password);
      if(image) form.append('image', image);
      return (
        axios.patch(API_URL+"update", form, config)
      )
    }
  })
}
export default new AuthService();

