import React, { useEffect , useState} from 'react';
import axios from "axios";

import  { Redirect, Link } from "react-router-dom";

import authHeader from '../services/auth-header';

const CategoryList=()=>{
    const block={
        height: "600px",
        // display: "flex",
        // flexDirection: "column",
        // flexWrap: "wrap",
        // justifyContent:"flex-start",
        // marginTop: "2rem",
        border: "solid #424242 2px",
        borderRadius: "20px",
        // width: "300px",
        paddingLeft: "2rem",
        paddingTop: "2rem"
    }
    const list={
        width:"25%",
    }
    const link={
        color:" #424242",
        textDecorationStyle: "solid",
        textDecorationColor: "currentcolor",
        textDecorationThickness: "auto",
        fontSize: "24px",
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
                    <p>
                        {category.name}
                    </p>
                </Link>
              
            </div>)
        }
    });

    return localStorage.user ? (
        <>
            <p className="mt-3" style={{color: "#424242", fontSize:"40px", marginLeft: "22rem"}}>Categories List</p>
            {/* <div style={block}> */}
            <div className="d-flex m-3 flex-column flex-wrap justify-content:flex-start align-items:flex-start" style={block}>
                {data}
            </div>
        </>
    ) : 
    <Redirect to='/login' />    
}

export default CategoryList;