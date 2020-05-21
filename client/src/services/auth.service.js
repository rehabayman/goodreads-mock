import axios from 'axios'

const API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/users/auth/`
// const SIGNUP_URL = "http://localhost:8000/users/auth/signup"

console.log(API_URL)
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
    }
  })
}
export default new AuthService();

