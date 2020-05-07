
import React, {useState, useEffect} from 'react'
import UserService from '../services/user.service'
import RateBook from './RateBook'
import BookShelves from './BookShelves'

const BoardUser=()=>  {
    
    const [content,setContent]= useState("")

    useEffect(()=>{

        UserService.getUserBoard().then(
            response => {
            setContent(response.data)
            },
            error => {
            setContent( (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            );
            }
        )
        
    })

   
    return (
        <div className="container">
        <header className="jumbotron">
            <h3>{content}</h3>
            <RateBook />
            <BookShelves />
        </header>
        </div>
    );
    
}

export default BoardUser