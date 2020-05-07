import React, { useState, useEffect } from "react";
import axios from "axios";

import PopularDummyBooks from "./popular-dummy.component";
import PopularDummyAuthors from "./popular-dummy.component";
import PopularDummyCategories from "./popular-dummy.component";


function PopularLive(){
    
    let urlHomePopular = "http://localhost:5000/home/popular";

    const [books, setBooks] = useState([{book: {name:"Loading..."}}]);
    const [authors, setAuthors] = useState([{book: {author: {firstName: "Loading...", lastName: ""}}}]);
    const [categories, setCategories] = useState([{book : {category: {name: "Loading..."}}}]);

    useEffect( () => {
        

        axios.get(urlHomePopular).then((res) => {
            setBooks( () => res.data );
            setAuthors(() => res.data);
            setCategories(() => res.data);
        }).catch((err)=>{
            console.log( err );
            setBooks([{book: {name: "Some error happend."}}]);
            setAuthors([{book: {author: {firstName: "Some error happend.", lastName: ""}}}]);
            setCategories([{book : {category: {name: "Some error happend."}}}]);
        })

    },[] );


    return (
        <div className="container">
            <h1>Welcome to good reads.</h1>
            <div className="w-50 d-flex flex-row flex-wrap justify-content-between align-items-start">
                <PopularDummyBooks title="Popular Books" data={books}/>
                <PopularDummyAuthors title="Popular Authors" data={authors}/>
                <PopularDummyCategories title="Popular Categories" data={categories}/>
            </div>
        
        </div>
    )
}

export default PopularLive; 