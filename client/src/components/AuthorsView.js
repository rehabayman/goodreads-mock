import React, { useEffect , useState} from 'react';
import axios from "axios";
import authHeader from '../services/auth-header';
import Carousel from 'react-elastic-carousel';
import { Link} from "react-router-dom";

const AuthorsView = (props)=>{
    const API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/`;
    const [authors, setAuthors] = useState([]);
    useEffect(()=>{   
        axios.get(API_URL, {headers: authHeader()})                                                                 
        .then(response => {
            console.log(response.data.authors);
            setAuthors(response.data.authors)
        }).catch(err => {
            if(err.response) {
                if(err.response.status === 404) {
                    setAuthors([]);
                }
            }
        })
    }, []);

    return(
        authors.length > 0 ?
        (<Carousel style={{marginTop: "120px"}} className="container justify-content-center" itemsToShow={3} itemsToScroll={3}>
        {
            authors.map(author => {
                return(
                    <div className="card mb-2 mr-3" style={{width: "18rem", height:"25rem"}} key={author.id}>
                        <Link to={`/authors/${author._id}`}><img className="card-img-top" style= {{maxHeight:"20rem"}} src={author.image_path} alt="Author is missing"></img></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to={`/authors/${author._id}`}>Author's name:{author.firstName} {author.lastName}</Link></h5>
                        </div>
                    </div>
                )
            })
        }
    </Carousel>)
    :
    <div className="container d-flex justify-content-center mt-5">
    <h3>No Authors Yet.</h3>
    </div>
    );
}
export default AuthorsView;