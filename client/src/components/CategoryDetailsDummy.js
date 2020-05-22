import React from 'react';
import  { Link } from "react-router-dom";
import Loading from './loadingComponent';

function CategoryDetailsDummy(props){

    let datatoDisplay = props.data.map( book => {
        return (
            <div className="m-3 d-flex flex-column flex-wrap justify-content-between align-items-center">
            <img src={book.image_path} />
                <Link to={`/books/${book._id}`}><h3>{book.name}</h3></Link>
                
                <Link to={`/authors/${book.author._id}`}>{`${book.author.firstName} ${book.author.lastName}`}</Link>
            </div>
        )
    });

    if(props.loading){
        return <Loading />
    }

    if(props.total === 0){
        return <h1>No details found</h1>;
    }

    return (
        <div className="h-75 d-flex flex-row flex-wrap justify-content-between align-items-center">
            {datatoDisplay}            
        </div>
    )
}

export default CategoryDetailsDummy;