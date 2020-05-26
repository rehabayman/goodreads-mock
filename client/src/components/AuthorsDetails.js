import React, { useEffect , useState} from 'react';
import axios from "axios";
import authHeader from '../services/auth-header';
import { Card, CardText, CardBody, CardTitle, CardImg } from "reactstrap";

const AuthorDetails = ({ match: { params: { id: authorId } } })=>{
    const [author,setAuthor] = useState({});
    const [books,setBooks] = useState([]);
    const [loading,setLoading] = useState(false);
    // const API_author_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/${authorId}`;
    const API_books_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/${authorId}/books`;
    useEffect( ()=>{
        setLoading(true)
        const fetchData =async ()=>{
            await axios.get(API_books_URL,{ headers: authHeader() }).then(response=>{
                console.log(response.data);
                // console.log(response.data.books[0].ratings);
                setAuthor( response.data.books[0].author );
                setBooks(response.data.books);
            })
        }
        fetchData();
        setLoading(false)
    },[])
  
    let rate = 0;
    if(loading){
        return <h1>Loading</h1>
    }
  
    return(
        <div>
            <Card key={author._id} style={{ width: "20rem", marginLeft: "22rem", marginTop: "2rem" }} >
            <CardImg top width="100%" src={author.image_path } alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  Author's name: {author.firstName} {author.lastName}
                </CardTitle>
                <CardText>
                  Birthdate: {author.birthdate ? author.birthdate.split('T')[0] : author.birthdate}
                </CardText>
              </CardBody>
            </Card>
            
            <h2>Author's Books</h2>
            
            <div style={{display: "flex", flexDirection:"row", flexWrap: "wrap"}}>
            {books.map(book=>{
                return (
                <Card key={book._id} style={{ width: "18rem", marginBottom: "1rem", marginRight: "1rem" }} >
                <CardImg top width="100%" src={ process.env.PUBLIC_URL + "/books-covers/" + book.image_path } alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  Book's name:{book.name}
                </CardTitle>
                <CardText>
                {
                    book.ratings.map((rating)=> {
                    rate += rating.rating
                    })
                }
                Average Book's Rating:{rate/book.ratings.length}
                </CardText>
                <CardText>
                {
                    book.reviews.map((review)=> {
                        return (<><small>Book's review :{review.review}</small><br></br> </>);
                    })
                }
                </CardText>
              </CardBody>
            </Card>
                );
              })
            }
            </div>
        </div>
    );
   
}
export default AuthorDetails;