import React,{useState, useEffect} from "react"
import UserService from "../services/user.service"
import Carousel from 'react-elastic-carousel';
import BookShelve from './BookShelves'
const UserBooks=()=>{

    const[userBooks,setUserBooks]= useState([])
    const [readMode,setReadMode]= useState("All")
    useEffect(()=>{
        UserService.getUserBooks().then((resp)=>{
            setUserBooks(resp.data)
            
         
        }).catch((err)=>{
            console.log(err)
        })

    },[])
    
    let books=[]
    if(readMode=="read"){
      if(userBooks[0]) { 
      books= userBooks[0].filter((book)=>{        
        return book.shelf=="read"
      })}
    }
    else if(readMode=="reading"){
        books= userBooks[0].filter((book)=>{          
          return book.shelf=="reading"
        })
    }    
    else if(readMode=="want to read"){
        books= userBooks[0].filter((book)=>{            
          return book.shelf=="want to read"
        })
    }
    else{
        if(userBooks[0]) { 
        books= userBooks[0].filter((book)=>{            
            return book.shelf
          })
        }
    }
    let rate=0
    console.log(books)
    return(
        
        
        
        <div className="home">
            <div className="side">
                <ul>
                    <li>
                    <button type="button" onClick={()=>{setReadMode("All")}} class="btn btn-light">All</button>

                    </li>
                    <li>
                    <button type="button"  class="btn btn-light"  onClick={()=>{setReadMode("read")}} >Read</button>
                   
                    </li>
                    <li>
                    <button type="button" class="btn btn-light" onClick={()=>{setReadMode("reading")}} > Currently Reading</button>

                   
                    </li>
                    <li>
                    <button type="button" class="btn btn-light" onClick={()=>{setReadMode("want to read")}} > Want to read</button>                    
                    </li>

                </ul>
            </div>

        <div className="books">

        
     
             <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Cover</th>
                    <th scope="col">Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Average Rate</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Shelve</th>
                    </tr>
                </thead>
                <tbody>
        {books.length>0? 
        
        
        books.map(book =>     
          
            <tr>
            
            <td>  {book.book.image_path? <img src={book.book.image_path} />:"image"}</td>
            <td>{book.book.name}</td>
            <td> {` ${book.book.author.firstName }  ${book.book.author.lastName}`}</td>
            <td> {book.book.ratings.reduce((a, {rating}) => a + rating, 0) / book.book.ratings.length}</td>
            <td>                  
                {rate=book.book.ratings.forEach(rat => {                    
                    if(rat.user==JSON.parse(localStorage.getItem('user')).id){    
                        console.log(rat.rating)               
                        return rat.rating
                    }
                  
                })
                } 1               
            </td>
            <td> <BookShelve bookId={book.book._id}/></td>
            {/* <td> {book.shelf}</td> */}
            </tr>
        
        
        )

      :""}
      
      </tbody>
      </table>
      </div>
      </div>
     
    )
}

export default UserBooks