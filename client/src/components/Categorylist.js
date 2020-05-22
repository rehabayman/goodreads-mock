import React, { useEffect , useState} from 'react';
import axios from "axios";

import  { Redirect, Link } from "react-router-dom";

import authHeader from '../services/auth-header';

const CategoryList=()=>{
    const block={
        height: "500px",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent:"flex-start ",
        alignItems:"flex-start"       
    }
    const list={
        width:"25%",
    }
    const link={
        color:" #00635D",
        // textDecoration: "none",
        // textDecorationLine: "none",
        textDecorationStyle: "solid",
        textDecorationColor: "currentcolor",
        textDecorationThickness: "auto",
    }
    let url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/categories/all`;
    const [categories, setCategories] = useState([{name:"Loading...", err: true}])
    useEffect(() => {
        
        axios.get(url,  {headers: authHeader()} ).then(res =>{
            setCategories(res.data);
            console.log(res.data);
        }).catch(e => {
            console.log(e);
            setCategories([{name:"Some error happend", err: true}]);
        });

    }, []);

    let data = categories.map( category=>{
        if (category.err){
            return <h1>{category.name}</h1>;
        } else {
            return (
            <div style={list}>
                <Link style={link} key={category.id} to={`/categories/${category.name}/${category._id}`}>
                    <h1>
                        {category.name}
                    </h1>
                </Link>
              
            </div>)
        }
    });
    
    

    return localStorage.user ? ( 
        <div style={block}>
         {/* <div className="d-flex m-3 flex-column flex-wrap justify-content:flex-start align-items:flex-start"> */}
            {data} 
        </div>
    ) : 
    <Redirect to='/login' />    
}

export default CategoryList;