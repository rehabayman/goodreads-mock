import React, { useState, useEffect } from "react"
import UserService from "../services/user.service"
import BookShelve from './BookShelves'
import RateBook from './RateBook'
import { MDBDataTable } from 'mdbreact';
import { Link} from "react-router-dom";


const UserBooks = () => {
   
    const [userBooks, setUserBooks] = useState({})
    const [shelf, setShelf] = useState("All")
    const [booksShelf,setBookShelf]= useState({})

    let convertedBooks={}
    let filteredBooks={}

    useEffect(() => {
        UserService.getUserBooks().then((resp) => {
            let books
            
            if (resp.data) {
                books = resp.data[0].filter((book) => {
                    return book.shelf
                })
                convertedBooks['rows']= books.map((book)=>{
                    return{
                        id: book.book._id,
                        cover: book.book.image_path ? <img src={book.book.image_path} /> : "No image",
                        author:` ${book.book.author.firstName}  ${book.book.author.lastName}`,
                        name:<Link to={`/books/${book.book._id}`}>{book.book.name}</Link>,
                        shelve:<BookShelve changeBookState={changeBookState} bookId={book.book._id} state={book.shelf} />,
                        ratings: book.book.ratings,
                        rating: book.book.ratings.length ? book.book.ratings.map(rat => {
                                if (rat.user === JSON.parse(localStorage.getItem('user')).id) {    
                                    return <RateBook key={book.book._id} changeBookRate={changeBookRate} bookId={book.book._id} rate={rat.rating} />    
                                }
                            }) : <RateBook key={book.book._id} changeBookRate={changeBookRate} bookId={book.book._id} rate={0} />,
                        average: book.book.ratings.reduce((a, { rating }) => a + rating, 0) / book.book.ratings.length || 0
                    }
                })

                convertedBooks["columns"]=[
                   
                        {
                        label: 'Cover',
                        field: 'cover',
                        sort: 'asc',
                        width: 270
                        },
                        {
                          label: 'Name',
                          field: 'name',
                          sort: 'asc',
                          width: 150
                        },
                        {
                          label: 'Author',
                          field: 'author',
                          sort: 'asc',
                          width: 200
                        },
                        {
                          label: 'Average',
                          field: 'average',
                          sort: 'asc',
                          width: 100
                        },
                        {
                          label: 'Rating',
                          field: 'rating',
                          sort: 'asc',
                          width: 150
                        },
                        {
                          label: 'Shelve',
                          field: 'shelve',
                          sort: 'asc',
                          width: 100
                        }
                ]
                
    
                setUserBooks(convertedBooks)
                filteredBooks= {"columns": convertedBooks["columns"],"rows": convertedBooks["rows"]}
                setBookShelf({"columns": convertedBooks["columns"],"rows": convertedBooks["rows"]})
               
            }

           

        }).catch((err) => {
            console.log(err)
        })

    }, [])


    useEffect(()=>{
      
        filteredBooks={"columns": userBooks["columns"] , "rows": userBooks["rows"]}


        if (shelf == "read") {
            if (userBooks["rows"]) {
                filteredBooks["rows"] = filteredBooks["rows"].filter((book) => {
                    return book.shelve.props.state == "read"
                })
                setBookShelf({"columns": filteredBooks["columns"],"rows": filteredBooks["rows"]})
            }
        }
        else if (shelf == "reading") {
            filteredBooks["rows"] = filteredBooks["rows"].filter((book) => {
                return book.shelve.props.state== "reading"
            })
            setBookShelf({"columns": filteredBooks["columns"],"rows": filteredBooks["rows"]})

        }
        else if (shelf == "want to read") {
            filteredBooks["rows"]= filteredBooks["rows"].filter((book) => {
                return book.shelve.props.state== "want to read"
            })
            setBookShelf({"columns": filteredBooks["columns"],"rows": filteredBooks["rows"]})

        }
        else{
            setBookShelf({"columns": filteredBooks["columns"],"rows": filteredBooks["rows"]})
        }

       
    },[shelf])

    const changeBookState = (id, bookState) => {
        
        if(convertedBooks["rows"]){     
            let books=convertedBooks
            books["rows"] = convertedBooks["rows"].map(book => {                
                if (book.id == id) {                    
                    return { ...book, shelve: <BookShelve changeBookState={changeBookState} bookId={book.id} state={bookState} /> }
                    
                }
                return book
            }) 
            setUserBooks({"columns":books["columns"],"rows":books["rows"]})            

        }

        let books={"columns": filteredBooks["columns"] , "rows": filteredBooks["rows"]}


        if(books["rows"]){     
            
            books["rows"] = books["rows"].map(book => {
                
                if (book.id == id) {                    
                    return { ...book, shelve: <BookShelve changeBookState={changeBookState} bookId={book.id} state={bookState} /> }
                    
                }
                return book
            })                     
            

            setBookShelf({"columns": books["columns"],"rows": books["rows"]})
        }


            
    }


    const changeBookRate = (id, rate) => {
        let sum=0
        let books=convertedBooks
        books["rows"] = convertedBooks["rows"].map(book => {
            if (book.id === id) {                
                book.ratings.forEach(rat => {                   
                    if (rat.user == JSON.parse(localStorage.getItem('user')).id) {       
                        rat.rating= parseInt(rate )           
                        book.rating[0]=<RateBook key={book.id} changeBookRate={changeBookRate} bookId={book.id} rate={rate} />     
                        sum+= rat.rating                   
                        return { ...book}
                    }                 
                    sum+= rat.rating

                })                  
                sum !=0 ? book.average= sum/book.ratings.length : book.average=rate
             
           
            }
            return book
        })
        setBookShelf({"columns":books["columns"],"rows":books["rows"]})
    }

    console.log(booksShelf)
    
    return (

        <div className="home">
            <div className="side">
                <ul>
                    <li>
                        <button type="button" onClick={() => { setShelf("All") }} className="btn btn-light">All</button>

                    </li>
                    <li>
                        <button type="button" className="btn btn-light" onClick={() => { setShelf("read") }} >Read</button>

                    </li>
                    <li>
                        <button type="button" className="btn btn-light" onClick={() => { setShelf("reading") }} > Currently Reading</button>


                    </li>
                    <li>
                        <button type="button" className="btn btn-light" onClick={() => { setShelf("want to read") }} > Want to read</button>
                    </li>

                </ul>
            </div>

            <div className="books">

            <MDBDataTable
                striped
                bordered
                small
                hover
                data={booksShelf}
                color="#1C2331"
            />
            
            </div>
        </div>

    )
}

export default UserBooks