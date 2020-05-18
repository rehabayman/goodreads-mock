import axios from 'axios'
import authHeader from './auth-header'
const API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/`

function BooksService() {

  return({

    getBookDetails: (bookId) => {
      return axios.get(API_URL + bookId, { headers: authHeader() });
    },

    getAllBooks: () => {
      return axios.get(API_URL + 'books');
    },

  })
}

export default new BooksService();
