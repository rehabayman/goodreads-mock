import React, { useEffect , useState} from 'react';
import axios from "axios";
import authHeader from '../services/auth-header';
import { Card, CardText, CardBody, CardTitle, CardImg } from "reactstrap";

const AuthorDetails = ({ match: { params: { id: authorId } } })=>{
    const [author,setAuthor] = useState({});
    const [books,setBooks] = useState([]);
    const [loading,setLoading] = useState(false);
    const API_author_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/${authorId}`;

    useEffect( ()=>{
        setLoading(true)
        const fetchData =async ()=>{
            await axios.get(API_author_URL,{ headers: authHeader() }).then(response=>{
                // console.log(response.data.books.length);
                // console.log(response.data.books[0].ratings);
                setAuthor( response.data );
                setBooks(response.data.books);
            })
        }
        fetchData();
        setLoading(false)
    },[])
    if(loading){
        return <h1>Loading</h1>
    }
    return(
        <div>
            <Card key={author._id} style={{ width: "18rem" }} >
            <CardImg top width="100%" src={author.image_path } alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  Author's name:{author.firstName} {author.lastName}
                </CardTitle>
                <CardText>
                  Birthdate:{author.birthdate}
                </CardText>
              </CardBody>
            </Card>
            {
            books.map(book=>{
                return (<div>
                <h2>Author's Books</h2>
                <Card key={book._id} style={{ width: "18rem" }} >
                <CardImg top width="100%" src={book.image_path } alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  Book's name:{book.name}
                </CardTitle>
                <CardText>
                  Book's ratings:{book.ratings}
                </CardText>
                <CardText>
                  Book's reviews:{book.reviews}
                </CardText>
              </CardBody>
            </Card>
            </div>
                );
            })
        }
        </div>
    );
   
}
export default AuthorDetails;