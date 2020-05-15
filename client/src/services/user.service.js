import axios from 'axios'
import authHeader from './auth-header'
const API_URL = `${process.env.REACT_APP_API_URL}/users/auth/`
const userBooksUrl=`${process.env.REACT_APP_API_URL}/home/userbooks`

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
