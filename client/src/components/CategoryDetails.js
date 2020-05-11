import React, { useEffect , useState} from 'react';
import axios from "axios";

import CategoryDetailsDummy from './CategoryDetailsDummy.js';
import Pagination from './pagination';

import  { Redirect, useParams } from "react-router-dom";



function CategoryDetails(){    
    const {categoryname, id} = useParams();
    const [data, setData] = useState( []);
    const [Loading, setLoading] = useState(true);
    const [totalBooks, settotalBooks] = useState(0);  
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(1);

    let url = `${process.env.REACT_APP_API_URL}/categories/${id}`;
    
    
    useEffect(()=>{
        axios.get(url).then( res=>{
            setData(res.data[0]);
            setLoading(false);
            settotalBooks( parseInt(res.data[1]));
        }).catch(e=>{
            console.log(e);
            setData([{category: {name:"Some error happend"}}]);
        });
    }, [] );

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = data.slice(indexOfFirstBook, indexOfLastBook);
    
    function setPage(pageNumber) {
        setCurrentPage(pageNumber)
    }
    
    return localStorage.user ? (
        <div className="d-flex flex-column flex-wrap justify-content-between align-items-center">
            <h1 className="h-75">{categoryname}</h1>
            <CategoryDetailsDummy data={currentBooks} loading={Loading} total={totalBooks}/>
            <Pagination booksPerPage={booksPerPage} totalBooks={totalBooks} paginate={setPage}/>
        </div>
    ) : 
    <Redirect to='/login' />    

}

export default CategoryDetails;