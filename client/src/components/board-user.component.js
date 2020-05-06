
import React, {useState, useEffect} from 'react'
import UserService from '../services/user.service'
import RateBook from './rate-book.component'

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
        </header>
        </div>
    );
    
}

export default BoardUser