import axios from 'axios'
import authHeader from './auth-header'
const API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/users/auth/`
const userBooksUrl=`http://localhost:${process.env.REACT_APP_SERVER_PORT}/home/userbooks`


function UserService() {

  return ({

    getPublicContent: () => {
      return axios.get(API_URL + 'all');
    },

    getUserBoard: () => {

      return axios.get(API_URL + 'user', { headers: authHeader() });
    },


    getAdminBoard: () => {
      return axios.get(API_URL + 'admin', { headers: authHeader() });
    },
    getUserBooks:()=>{      
      return axios.get(userBooksUrl,{headers:authHeader()})
    }
  })
}

export default new UserService();
