import React, { useEffect , useState} from 'react';
import axios from "axios";

import  { Redirect, Link } from "react-router-dom";

function CategoryList(){
    let url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/categories/all`;
    const [categories, setCategories] = useState([{name:"Loading...", err: true}])
    useEffect(() => {
        
        axios.get(url).then(res =>{
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
            return <Link key={category.id} to={`/categories/${category.name}/${category._id}`}><h1>{category.name}</h1></Link>;
        }
    });
    
    

    return localStorage.user ? ( 
        <div className="d-flex m-3 flex-row flex-wrap justify-content-around align-items-center">
            {data} 
        </div>
    ) : 
    <Redirect to='/login' />    
}

export default CategoryList;