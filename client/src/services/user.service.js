import axios from 'axios'
import authHeader from './auth-header'
const API_URL = 'http://localhost:8000/api/test/'
const userBooksUrl='http://localhost:8000/home/userbooks'

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
      console.log("hereee")
      return axios.get(userBooksUrl,{headers:authHeader()})
    }
  })
}

export default new UserService();
