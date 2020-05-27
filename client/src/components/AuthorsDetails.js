import React, { useEffect, useState } from 'react';
import axios from "axios";
import authHeader from '../services/auth-header';
import { Card, CardText, CardBody, CardTitle, CardImg } from "reactstrap";
import BookShelve from './BookShelves';
import RateBook from './RateBook';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

const AuthorDetails = ({ match: { params: { id: authorId } } }) => {
  const [author, setAuthor] = useState({});
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_books_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/${authorId}/books`;
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      await axios.get(API_books_URL, { headers: authHeader() }).then(response => {
        setAuthor(response.data.books[0].author);
        setBooks(response.data.books);
      })
    }
    fetchData();
    setLoading(false)
  }, [])

  let rate = 0;
  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <div classname="container" >
      <Card key={author._id} style={{ width: "20rem", marginLeft: "22rem", marginTop: "2rem" }} >
        <CardImg top width="100%" src={author.image_path} alt="Card image cap" />
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

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {books.map(book => {
          return (
            <Card key={book._id} style={{ width: "18rem", marginBottom: "1rem", marginRight: "1rem" }} >
              <CardImg top width="100%" style={{ height: "20rem" }} src={process.env.PUBLIC_URL + "/books-covers/" + book.image_path} alt="Card image cap" />
              <CardBody>
                <CardTitle style={{fontSize: "22px"}}>
                  <Link to={`/books/${book._id}`}>{book.name}</Link>
                </CardTitle>
                <CardText>
                  {
                    book.ratings.map((rating) => {
                      if(rate > 0) rate = 0
                      rate += rating.rating
                    })
                  }
                  <span style={{marginRight: "0.5rem"}}>
                    <StarRatings 
                      rating={(rate / book.ratings.length >= 0 && rate / book.ratings.length <= 5) ? rate / book.ratings.length : 0}
                      starRatedColor="goldenrod"
                      numberOfStars={5}
                      name='rating'
                      starDimension="25px"
                      starSpacing="3px"
                      />
                  </span>
                  <span style={{marginTop: "1rem"}}>
                    {(rate / book.ratings.length >= 0 && rate / book.ratings.length <= 5) ? rate / book.ratings.length : 0} - {book.ratings.length} {book.ratings.length <= 1 ? "rating" : "ratings"}
                  </span>
                </CardText>
                    <hr></hr>
                <div style={{marginLeft: "2rem"}}>
                  <RateBook key={book.id} bookId={book.id} rate={0} />
                  <BookShelve bookId={book.id} state={book.shelf} width={"8.5rem"} height={"2rem"}/>

                </div>
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